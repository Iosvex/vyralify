"use client";

export default function TopStrip() {
  const message =
    "🚀 1,000+ Creators Already Scaling With Vyralify · Join the premium AI operating system for modern Instagram brands · 50% lifetime recurring commissions";

  return (
    <div className="relative overflow-hidden bg-[linear-gradient(90deg,_#0f172a_0%,_#2563eb_50%,_#38bdf8_100%)] py-2 text-white">
      <div
        className="flex whitespace-nowrap"
        style={{
          animation: "marquee 30s linear infinite",
        }}
      >
        {Array.from({ length: 6 }).map((_, i) => (
          <span key={i} className="mx-8 inline-block shrink-0 text-xs font-medium">
            {message}
          </span>
        ))}
      </div>

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
