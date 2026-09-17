import React, { useEffect, useRef, useCallback } from "react";
import { cn } from "../../lib/utils";

// Helper to interpolate between two hex colors
function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
}

function lerpColor(color1, color2, t) {
  const c1 = hexToRgb(color1);
  const c2 = hexToRgb(color2);
  if (!c1 || !c2) return color1;

  const r = Math.round(c1.r + (c2.r - c1.r) * t);
  const g = Math.round(c1.g + (c2.g - c1.g) * t);
  const b = Math.round(c1.b + (c2.b - c1.b) * t);

  return `rgb(${r}, ${g}, ${b})`;
}

export function PixelCanvas({
  className,
  gap = 6,
  speed = 0.02,
  colors = ["#D1FE17", "#A3E635", "#38bdf8", "#22d3ee"],
  noFocus = false,
  variant = "glow",
  ...props
}) {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const pixelsRef = useRef([]);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const animationRef = useRef(0);
  const lastTimeRef = useRef(0);

  const getColorFromIntensity = useCallback(
    (intensity, phase) => {
      if (!colors || colors.length === 0) return "#D1FE17";
      if (colors.length === 1) return colors[0];

      const t = (phase + intensity) % 1;
      const index = Math.floor(t * (colors.length - 1));
      const nextIndex = Math.min(index + 1, colors.length - 1);
      const localT = (t * (colors.length - 1)) % 1;

      const color1 = colors[index];
      const color2 = colors[nextIndex];

      if (!color1) return "#D1FE17";
      if (!color2) return color1;

      return lerpColor(color1, color2, localT);
    },
    [colors]
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let cols = 0;
    let rows = 0;
    const pixelSize = Math.max(gap, 4);

    const initPixels = () => {
      const rect = container.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      ctx.scale(dpr, dpr);

      cols = Math.ceil(rect.width / pixelSize);
      rows = Math.ceil(rect.height / pixelSize);

      const newPixels = [];
      for (let i = 0; i < cols; i++) {
        const row = [];
        for (let j = 0; j < rows; j++) {
          const existing = pixelsRef.current[i]?.[j];
          row.push({
            x: i * pixelSize,
            y: j * pixelSize,
            size: pixelSize - 1,
            intensity: existing?.intensity ?? 0,
            targetIntensity: 0,
            colorPhase: Math.random(),
          });
        }
        newPixels.push(row);
      }
      pixelsRef.current = newPixels;
    };

    const draw = (timestamp) => {
      const deltaTime = timestamp - lastTimeRef.current;
      lastTimeRef.current = timestamp;

      const rect = container.getBoundingClientRect();
      ctx.clearRect(0, 0, rect.width, rect.height);

      const { x: mouseX, y: mouseY } = mouseRef.current;
      const pixels = pixelsRef.current;

      const radius = variant === "glow" ? 140 : 90;
      const glowPasses = variant === "glow" ? 2 : 1;

      for (let i = 0; i < cols; i++) {
        const col = pixels[i];
        if (!col) continue;

        for (let j = 0; j < rows; j++) {
          const pixel = col[j];
          if (!pixel) continue;

          const centerX = pixel.x + pixel.size / 2;
          const centerY = pixel.y + pixel.size / 2;
          const dx = mouseX - centerX;
          const dy = mouseY - centerY;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < radius) {
            const falloff = 1 - distance / radius;
            pixel.targetIntensity = Math.pow(falloff, 1.4);
          } else {
            pixel.targetIntensity = 0;
          }

          const lerpSpeed =
            pixel.targetIntensity > pixel.intensity ? 0.35 : speed;

          pixel.intensity += (pixel.targetIntensity - pixel.intensity) * lerpSpeed;
          pixel.colorPhase = (pixel.colorPhase + 0.0012 * (deltaTime / 16)) % 1;

          if (pixel.intensity > 0.01) {
            const color = getColorFromIntensity(pixel.intensity, pixel.colorPhase);

            if (variant === "glow" && pixel.intensity > 0.15) {
              for (let g = glowPasses; g > 0; g--) {
                const glowSize = pixel.size + g * 5;
                const glowOffset = (glowSize - pixel.size) / 2;
                ctx.globalAlpha = (pixel.intensity * 0.18) / g;
                ctx.fillStyle = color;
                ctx.fillRect(
                  pixel.x - glowOffset,
                  pixel.y - glowOffset,
                  glowSize,
                  glowSize
                );
              }
            }

            ctx.globalAlpha = Math.min(1, pixel.intensity * 0.95);
            ctx.fillStyle = color;

            if (variant === "trail") {
              const cornerRadius = pixel.size * 0.35;
              ctx.beginPath();
              if (ctx.roundRect) {
                ctx.roundRect(pixel.x, pixel.y, pixel.size, pixel.size, cornerRadius);
              } else {
                ctx.rect(pixel.x, pixel.y, pixel.size, pixel.size);
              }
              ctx.fill();
            } else {
              ctx.fillRect(pixel.x, pixel.y, pixel.size, pixel.size);
            }
          }
        }
      }

      ctx.globalAlpha = 1;
      animationRef.current = requestAnimationFrame(draw);
    };

    const handlePointer = (clientX, clientY) => {
      const rect = container.getBoundingClientRect();
      if (
        clientX >= rect.left &&
        clientX <= rect.right &&
        clientY >= rect.top &&
        clientY <= rect.bottom
      ) {
        mouseRef.current = {
          x: clientX - rect.left,
          y: clientY - rect.top,
        };
      } else {
        mouseRef.current = { x: -1000, y: -1000 };
      }
    };

    const onMouseMove = (e) => {
      handlePointer(e.clientX, e.clientY);
    };

    const onMouseLeave = () => {
      mouseRef.current = { x: -1000, y: -1000 };
    };

    const onTouchMove = (e) => {
      if (e.touches.length > 0 && e.touches[0]) {
        handlePointer(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    const onTouchEnd = () => {
      mouseRef.current = { x: -1000, y: -1000 };
    };

    initPixels();
    lastTimeRef.current = performance.now();
    animationRef.current = requestAnimationFrame(draw);

    window.addEventListener("resize", initPixels);
    if (!noFocus) {
      window.addEventListener("mousemove", onMouseMove);
      window.addEventListener("mouseleave", onMouseLeave);
      window.addEventListener("touchmove", onTouchMove, { passive: true });
      window.addEventListener("touchend", onTouchEnd);
    }

    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener("resize", initPixels);
      if (!noFocus) {
        window.removeEventListener("mousemove", onMouseMove);
        window.removeEventListener("mouseleave", onMouseLeave);
        window.removeEventListener("touchmove", onTouchMove);
        window.removeEventListener("touchend", onTouchEnd);
      }
    };
  }, [gap, speed, noFocus, variant, getColorFromIntensity]);

  return (
    <div
      ref={containerRef}
      className={cn("h-full w-full relative overflow-hidden", className)}
      {...props}
    >
      <canvas ref={canvasRef} className="block w-full h-full pointer-events-none" />
    </div>
  );
}

export default PixelCanvas;
