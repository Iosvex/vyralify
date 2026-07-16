"use client";

export default function TopStrip() {
  const message =
    "🚀 1,000+ Creators Already Scaling With Vyralify · Join the #1 AI-Powered Platform for Instagram Creators · 50% Lifetime Recurring Commissions";

  return (
    <div className="relative bg-blue-600 text-white py-2 overflow-hidden">
      <div
        className="flex whitespace-nowrap"
        style={{
          animation: "marquee 30s linear infinite",
        }}
      >
        {/* Duplicate the message several times for seamless loop */}
        {Array.from({ length: 6 }).map((_, i) => (
          <span
            key={i}
            className="text-xs font-medium mx-8 inline-block shrink-0"
          >
            {message}
          </span>
        ))}
      </div>

      {/* Inline keyframes for the marquee animation */}
      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </div>
  );
}
