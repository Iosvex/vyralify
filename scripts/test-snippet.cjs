async function checkSnippets() {
  const handle = 'mrbeast';
  const url = `https://dumpor.io/v/${handle}`;
  const res = await fetch(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
    }
  });
  const html = await res.text();
  const idx = html.indexOf('Followers');
  if (idx !== -1) {
    console.log(html.slice(idx - 200, idx + 200));
  } else {
    console.log('Followers not found, searching for mrbeast');
    const idx2 = html.indexOf('@mrbeast');
    console.log(html.slice(idx2 - 100, idx2 + 300));
  }
}
checkSnippets();
