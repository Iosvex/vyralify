async function testMirrors() {
  const handle = 'pop.culture...memes.daily'; // or a normal handle like 'mrbeast'
  const testHandle = 'mrbeast';

  const targets = [
    `https://www.picuki.com/profile/${testHandle}`,
    `https://imginn.com/${testHandle}/`,
    `https://dumpor.io/v/${testHandle}`
  ];

  for (const url of targets) {
    try {
      console.log('Fetching:', url);
      const res = await fetch(url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
        }
      });
      console.log(url, 'Status:', res.status);
      const html = await res.text();
      console.log('HTML length:', html.length);
      if (res.status === 200 && html.length > 1000) {
        console.log('Sample:', html.slice(0, 300));
        // Check for follower or bio text
        const titleMatch = html.match(/<title>(.*?)<\/title>/i);
        console.log('Title:', titleMatch ? titleMatch[1] : 'none');
      }
    } catch (e) {
      console.log(url, 'Err:', e.message);
    }
  }
}
testMirrors();
