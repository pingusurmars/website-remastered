import type { Action } from 'svelte/action';

export interface FitTextOptions {
	/** lower bound for the computed font-size, any CSS length (default `1.25rem`) */
	min?: string;
}

/**
 * Keeps a single line of text inside its box: grows/shrinks `font-size` so the
 * rendered text never overflows, bounded by the size the stylesheet asks for
 * (e.g. `text-5xl sm:text-6xl`) and by `min`.
 *
 * The text is measured with a Range instead of the element's own box, so the
 * result stays correct no matter how the element is laid out (flex, grid,
 * block…) — a shrinkable flex item otherwise reports its content width and
 * would never appear to overflow.
 *
 * It re-measures on resize and again after `document.fonts.ready`, because web
 * glyph metrics only settle once the font has loaded. Both the element and its
 * parent are observed: an element that only takes its content width (a flex
 * item without `flex-1`) shrinks with the text and would never report that its
 * container grew again.
 */
export const fitText: Action<HTMLElement, FitTextOptions | undefined> = (node, options) => {
	// resolve `min` (any CSS length) to px, using the user's root font-size
	const probe = document.createElement('span');
	probe.style.cssText = `position:absolute;visibility:hidden;white-space:nowrap;font-size:${options?.min ?? '1.25rem'}`;
	document.body.append(probe);
	const minPx = parseFloat(getComputedStyle(probe).fontSize) || 16;
	probe.remove();

	const range = document.createRange();
	range.selectNodeContents(node);
	node.style.whiteSpace = 'nowrap';

	const measure = () => {
		// the stylesheet size is the cap, so read it without our own override
		const override = node.style.fontSize;
		node.style.fontSize = '';
		const maxPx = parseFloat(getComputedStyle(node).fontSize);
		node.style.fontSize = override;
		if (!maxPx) return;

		const available = node.clientWidth;
		if (available <= 0) return;

		// first guess: scale linearly from the current size, then correct
		const current = parseFloat(getComputedStyle(node).fontSize);
		const natural = range.getBoundingClientRect().width;
		if (!natural) return;
		let size = Math.max(minPx, Math.min(maxPx, current * (available / natural)));

		for (let i = 0; i < 3; i++) {
			node.style.fontSize = `${size}px`;
			const width = range.getBoundingClientRect().width;
			if (width <= available || size <= minPx) break;
			size = Math.max(minPx, size * (available / width));
		}
		node.style.fontSize = `${size}px`;
	};

	const observer = new ResizeObserver(measure);
	observer.observe(node);
	if (node.parentElement) observer.observe(node.parentElement);
	document.fonts.ready.then(measure);

	return {
		destroy() {
			observer.disconnect();
			node.style.fontSize = '';
			node.style.whiteSpace = '';
		}
	};
};