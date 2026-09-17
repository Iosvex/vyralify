import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'motion/react';

/**
 * MagneticDockItem - Individual macOS-style dock icon with spring scaling physics
 */
function DockItemButton({
  item,
  mouseX,
  iconSize = 56,
  maxScale = 1.5,
  magneticDistance = 150,
  showLabels = true,
  position = "bottom",
}) {
  const ref = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  // Calculate distance from mouse to center of this icon
  const distance = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - (bounds.x + bounds.width / 2);
  });

  // Calculate target scale factor based on proximity
  const targetScale = useTransform(distance, (dist) => {
    if (dist === Infinity || Math.abs(dist) > magneticDistance) {
      return 1;
    }
    // Cosine smoothing curve for natural apple-dock magnification
    const factor = Math.cos((dist / magneticDistance) * (Math.PI / 2));
    return 1 + (maxScale - 1) * Math.max(0, factor);
  });

  // Spring physics for butter-smooth magnification
  const scale = useSpring(targetScale, { mass: 0.1, stiffness: 180, damping: 14 });
  const size = useTransform(scale, (s) => s * iconSize);

  return (
    <motion.button
      ref={ref}
      type="button"
      onClick={item.onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        width: size,
        height: size,
      }}
      className={`relative flex items-center justify-center rounded-2xl transition-colors duration-200 focus:outline-none select-none group shrink-0 ${
        item.isActive ? 'bg-[#1F1F23]' : 'hover:bg-[#1A1A1E]'
      }`}
      aria-label={item.label}
    >
      {/* Tooltip Label */}
      {showLabels && (
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, y: position === "top" ? -4 : 4, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: position === "top" ? -4 : 4, scale: 0.95 }}
              transition={{ duration: 0.15 }}
              className={`absolute left-1/2 -translate-x-1/2 px-2.5 py-1 rounded-md text-xs font-medium text-white bg-black/95 border border-[#262626] shadow-2xl backdrop-blur-md whitespace-nowrap pointer-events-none z-50 ${
                position === "top" ? "top-full mt-2" : "bottom-full mb-2"
              }`}
            >
              <div className="flex items-center gap-1.5">
                <span>{item.label}</span>
                {item.tag && (
                  <span className="text-[9px] px-1 py-0.2 rounded bg-[#D1FE17]/15 text-[#D1FE17] font-semibold">
                    {item.tag}
                  </span>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      )}

      {/* Inner Icon Card with Subtle Gradient and Border */}
      <div 
        className={`relative w-full h-full rounded-2xl overflow-hidden bg-gradient-to-b from-[#18181B] to-[#0D0D0E] border transition-colors duration-200 flex items-center justify-center shadow-lg shadow-black/60 ${
          item.isActive 
            ? 'border-[#D1FE17]/60 shadow-[0_0_15px_rgba(209,254,23,0.15)]' 
            : 'border-[#27272A] group-hover:border-[#3F3F46]'
        }`}
      >
        <div className="w-[55%] h-[55%] flex items-center justify-center text-neutral-200 group-hover:text-white transition-colors">
          {item.icon}
        </div>

        {/* Subtle glass reflection highlight */}
        <div 
          className="absolute inset-0 pointer-events-none opacity-40" 
          style={{
            background: 'linear-gradient(135deg, rgba(255,255,255,0.2) 0%, transparent 60%)'
          }} 
        />
      </div>

      {/* Notification Badge */}
      {item.badge !== undefined && item.badge !== null && (
        <span className="absolute -top-1.5 -right-1.5 min-w-[20px] h-5 px-1 rounded-full bg-[#D1FE17] text-black text-[11px] font-bold flex items-center justify-center border-2 border-black shadow-lg pointer-events-none">
          {item.badge}
        </span>
      )}

      {/* Active Indicator Dot */}
      {item.isActive && (
        <span 
          className={`absolute w-1.5 h-1.5 rounded-full bg-[#D1FE17] pointer-events-none shadow-[0_0_8px_#D1FE17] ${
            position === "top" ? "-top-2" : "-bottom-2"
          }`} 
        />
      )}
    </motion.button>
  );
}

/**
 * MagneticDock Component
 * macOS-style magnetic dock powered by Motion spring physics
 */
export function MagneticDock({
  items = [],
  iconSize = 56,
  maxScale = 1.45,
  magneticDistance = 140,
  showLabels = true,
  position = "bottom",
  variant = "glass",
  className = "",
}) {
  const mouseX = useMotionValue(Infinity);

  const variantStyles = {
    glass: "bg-[#0A0A0C]/85 backdrop-blur-2xl border border-[#222226] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.9)]",
    solid: "bg-[#101014] border border-[#222226] shadow-2xl",
    transparent: "bg-transparent border-none shadow-none",
  };

  return (
    <div
      onMouseMove={(e) => mouseX.set(e.pageX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      className={`inline-flex items-end gap-2.5 p-3 rounded-3xl ${variantStyles[variant] || variantStyles.glass} ${className}`}
    >
      {items.map((item) => (
        <DockItemButton
          key={item.id}
          item={item}
          mouseX={mouseX}
          iconSize={iconSize}
          maxScale={maxScale}
          magneticDistance={magneticDistance}
          showLabels={showLabels}
          position={position}
        />
      ))}
    </div>
  );
}

export default MagneticDock;
