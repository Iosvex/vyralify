import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// Currency Formatter that respects user's selected currency (INR, USD, EUR, GBP)
export function formatCurrency(amountNumeric, currency = 'INR') {
  if (typeof amountNumeric !== 'number') {
    amountNumeric = parseFloat(String(amountNumeric).replace(/[^0-9.]/g, '')) || 0;
  }
  
  if (currency === 'USD') {
    const usd = (amountNumeric / 85).toFixed(2);
    return `$${Number(usd).toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 2 })}`;
  }
  if (currency === 'EUR') {
    const eur = (amountNumeric / 92).toFixed(2);
    return `€${Number(eur).toLocaleString('de-DE', { minimumFractionDigits: 0, maximumFractionDigits: 2 })}`;
  }
  if (currency === 'GBP') {
    const gbp = (amountNumeric / 108).toFixed(2);
    return `£${Number(gbp).toLocaleString('en-GB', { minimumFractionDigits: 0, maximumFractionDigits: 2 })}`;
  }
  
  // Default INR
  return `₹${Math.round(amountNumeric).toLocaleString('en-IN')}`;
}

