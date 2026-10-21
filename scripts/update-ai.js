const fs = require('fs');
const path = require('path');

// 1. UPDATE AIAssistant.jsx font-mono and labels
const aiAssistantPath = path.join(__dirname, '..', 'src', 'components', 'dashboard', 'AIAssistant.jsx');
if (fs.existsSync(aiAssistantPath)) {
  let content = fs.readFileSync(aiAssistantPath, 'utf8');
  
  // Replace inline label pill
  content = content.replace(
    /className="inline-flex items-center px-1\.5 py-0\.2 mr-1\.5 rounded border border-\[#067CF9\]\/25 bg-\[#EFF6FF\] text-\[#067CF9\] font-mono font-bold text-\[10px\] uppercase tracking-wider"/g,
    'className="inline-flex items-center px-2 py-0.5 mr-1.5 rounded-md border border-[#067CF9]/20 bg-[#EFF6FF] text-[#067CF9] font-sans font-semibold text-[11px]"'
  );
  
  // Replace message session subtitle font-mono
  content = content.replace(
    /text-\[10px\] text-slate-400 font-mono mt-0\.5/g,
    'text-xs text-slate-500 font-sans mt-0.5'
  );

  // Replace quote font-mono
  content = content.replace(
    /font-mono text-\[#0F172A\] whitespace-pre-line/g,
    'font-sans text-[#0F172A] whitespace-pre-line'
  );

  fs.writeFileSync(aiAssistantPath, content, 'utf8');
  console.log('Updated AIAssistant.jsx');
}
