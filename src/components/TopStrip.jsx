import React, { useState } from 'react';
import { X, ArrowRight } from 'lucide-react';

export default function TopStrip() {
  return (
    <div className="relative z-50 bg-black text-[13px] text-neutral-300 py-2.5 px-4 text-center transition-colors">
      <span className="font-medium">
        🔥 New features live: Accelerated Payouts and Creator Bounty Hunt 🚀
      </span>
    </div>
  );
}
