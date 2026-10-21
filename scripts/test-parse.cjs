async function parseDumpor() {
  const handle = 'mrbeast';
  const url = `https://dumpor.io/v/${handle}`;
  const res = await fetch(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
    }
  });
  const html = await res.text();
  
  // Find avatar img
  const imgMatch = html.match(/<img[^>]+src=["']([^"']+)["'][^>]*alt=["'][^"']*profile[^"']*["']/i) 
    || html.match(/<img[^>]*class=["'][^"']*rounded-full[^"']*["'][^>]+src=["']([^"']+)["']/i)
    || html.match(/https:\/\/[^"']+\.cdninstagram\.com\/[^"']+/i);
  console.log('Avatar match:', imgMatch ? imgMatch[0].slice(0, 150) : 'none');

  // Find followers / posts stats
  const statMatches = [...html.matchAll(/([0-9.,KMBkmb]+)\s*<\/[^>]+>\s*<[^>]+>\s*(followers|following|posts)/gi)];
  console.log('Stats matches:', statMatches.map(m => `${m[2]}: ${m[1]}`));

  // Search for bio
  const bioMatch = html.match(/<p[^>]*class=["'][^"']*(?:description|bio)[^"']*["'][^>]*>(.*?)<\/p>/is);
  console.log('Bio match:', bioMatch ? bioMatch[1].trim() : 'none');
}
parseDumpor();
