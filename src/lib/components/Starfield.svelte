<script lang="ts">
	let canvas = $state<HTMLCanvasElement | undefined>(undefined);

	$effect(() => {
		if (!canvas) return;
		const el = canvas;
		const ctx = el.getContext('2d');
		if (!ctx) return;

		const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

		type Star = {
			x: number;
			y: number;
			r: number;
			base: number;
			speed: number;
			phase: number;
		};
		type Meteor = { x: number; y: number; vx: number; vy: number; life: number; max: number };

		let stars: Star[] = [];
		let meteors: Meteor[] = [];
		let w = 0;
		let h = 0;
		let raf = 0;
		let nextMeteor = performance.now() + 2500;

		const resize = () => {
			const dpr = Math.min(window.devicePixelRatio || 1, 2);
			w = window.innerWidth;
			h = window.innerHeight;
			el.width = Math.floor(w * dpr);
			el.height = Math.floor(h * dpr);
			el.style.width = `${w}px`;
			el.style.height = `${h}px`;
			ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

			const count = Math.min(320, Math.floor((w * h) / 5500));
			stars = Array.from({ length: count }, () => ({
				x: Math.random() * w,
				y: Math.random() * h,
				r: Math.random() * 1.4 + 0.3,
				base: Math.random() * 0.55 + 0.35,
				speed: Math.random() * 1.6 + 0.4,
				phase: Math.random() * Math.PI * 2
			}));
		};

		const draw = (t: number) => {
			ctx.clearRect(0, 0, w, h);

			for (const s of stars) {
				const tw = reduced ? 1 : 0.6 + 0.4 * Math.sin(s.phase + (t / 1000) * s.speed);
				ctx.globalAlpha = Math.max(0, s.base * tw);
				ctx.fillStyle = '#ffffff';
				ctx.beginPath();
				ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
				ctx.fill();
			}
			ctx.globalAlpha = 1;

			// Occasional shooting star
			if (!reduced && t > nextMeteor) {
				nextMeteor = t + 3500 + Math.random() * 5000;
				const sx = Math.random() * w * 0.7 + w * 0.2;
				meteors.push({ x: sx, y: Math.random() * h * 0.3, vx: -7, vy: 3.5, life: 0, max: 60 });
			}
			meteors = meteors.filter((m) => m.life < m.max);
			for (const m of meteors) {
				m.x += m.vx;
				m.y += m.vy;
				m.life++;
				const fade = 1 - m.life / m.max;
				const grad = ctx.createLinearGradient(m.x, m.y, m.x + 70, m.y - 35);
				grad.addColorStop(0, `rgba(255,255,255,${0.9 * fade})`);
				grad.addColorStop(1, 'rgba(255,255,255,0)');
				ctx.strokeStyle = grad;
				ctx.lineWidth = 1.6;
				ctx.beginPath();
				ctx.moveTo(m.x, m.y);
				ctx.lineTo(m.x + 70, m.y - 35);
				ctx.stroke();
			}

			raf = requestAnimationFrame(draw);
		};

		resize();
		if (reduced) {
			draw(0);
			cancelAnimationFrame(raf);
		} else {
			raf = requestAnimationFrame(draw);
		}

		window.addEventListener('resize', resize);
		return () => {
			cancelAnimationFrame(raf);
			window.removeEventListener('resize', resize);
		};
	});
</script>

<canvas bind:this={canvas} class="absolute inset-0" aria-hidden="true"></canvas>
