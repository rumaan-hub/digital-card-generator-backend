const http = require('http');

const API = 'http://localhost:5000';
let passed = 0, failed = 0;

function req(method, path, body, token) {
  return new Promise((resolve, reject) => {
    const url = new URL(path, API);
    const opts = { hostname: url.hostname, port: url.port, path: url.pathname, method, headers: { 'Content-Type': 'application/json' } };
    if (token) opts.headers['Authorization'] = `Bearer ${token}`;
    const r = http.request(opts, res => {
      let d = '';
      res.on('data', c => d += c);
      res.on('end', () => {
        try { resolve({ s: res.statusCode, b: JSON.parse(d), raw: d }); }
        catch { resolve({ s: res.statusCode, b: null, raw: d }); }
      });
    });
    r.on('error', reject);
    if (body) r.write(JSON.stringify(body));
    r.end();
  });
}

function ok(name, cond, detail) {
  if (cond) { console.log(`  PASS  ${name}${detail ? ' -- ' + detail : ''}`); passed++; }
  else { console.log(`  FAIL  ${name}${detail ? ' -- ' + detail : ''}`); failed++; }
}

async function run() {
  console.log('=== FRONTEND <-> BACKEND INTEGRATION TEST ===\n');

  // Simulate: User opens app, clicks Sign Up
  console.log('--- User Registration Flow ---');
  const reg = await req('POST', '/auth/register', { email: 'alice@demo.com', password: 'alice123' });
  const token = reg.b?.token;
  const userId = reg.b?.user?.id;
  ok('Register new user', token && userId, `user=${userId}`);

  // Simulate: User fills form and saves card
  console.log('\n--- Create Card Flow ---');
  const cardData = {
    name: 'Alice Wonder',
    jobTitle: 'UX Lead',
    company: 'Wonderland Inc',
    bio: 'Designing magical experiences',
    phone: '+1999888777',
    email: 'alice@wonderland.com',
    whatsapp: '+1999888777',
    website: 'https://alice.design',
    address: 'London, UK',
    theme: { id: 'gradient-ocean', name: 'Ocean Gradient', primaryColor: '#06b6d4', secondaryColor: '#3b82f6', backgroundColor: '#ecfeff', textColor: '#1e293b', accentColor: '#06b6d4', cardBackground: '#ffffff', gradientFrom: '#06b6d4', gradientTo: '#3b82f6', gradientVia: '#0ea5e9' },
    socialLinks: [
      { platform: 'linkedin', url: 'https://linkedin.com/in/alice' },
      { platform: 'instagram', url: 'https://instagram.com/alice' },
      { platform: 'github', url: 'https://github.com/alice' },
    ],
    customButtons: [
      { label: 'My Portfolio', url: 'https://alice.design/work' },
      { label: 'Book Meeting', url: 'https://cal.com/alice' },
    ],
  };
  const create = await req('POST', '/cards', cardData, token);
  const cardId = create.b?.id;
  const slug = create.b?.slug;
  ok('Create card', slug === 'alice-wonder', `slug=${slug}, id=${cardId}`);
  ok('Social links saved', create.b?.socialLinks?.length === 3, `count=${create.b?.socialLinks?.length}`);
  ok('Custom buttons saved', create.b?.customButtons?.length === 2, `count=${create.b?.customButtons?.length}`);
  ok('Theme saved as JSON', create.b?.theme?.id === 'gradient-ocean', `theme=${create.b?.theme?.id}`);

  // Simulate: User edits card and saves again (update)
  console.log('\n--- Update Card Flow ---');
  const upd = await req('PUT', `/cards/${cardId}`, {
    bio: 'Award-winning UX designer',
    phone: '+1111222333',
    socialLinks: [
      { platform: 'linkedin', url: 'https://linkedin.com/in/alice' },
      { platform: 'dribbble', url: 'https://dribbble.com/alice' },
    ],
  }, token);
  ok('Update bio', upd.b?.bio === 'Award-winning UX designer');
  ok('Update phone', upd.b?.phone === '+1111222333');
  ok('Social links replaced', upd.b?.socialLinks?.length === 2, `new count=${upd.b?.socialLinks?.length}`);
  ok('Name unchanged', upd.b?.name === 'Alice Wonder');

  // Simulate: Someone visits /card/alice-wonder (public, no auth)
  console.log('\n--- Public Card View ---');
  const pub = await req('GET', '/cards/alice-wonder');
  ok('Fetch public card', pub.s === 200 && pub.b?.name === 'Alice Wonder');
  ok('Has updated bio', pub.b?.bio === 'Award-winning UX designer');
  ok('Full theme object', pub.b?.theme?.gradientFrom === '#06b6d4');
  ok('Social links included', pub.b?.socialLinks?.length === 2);
  ok('Custom buttons included', pub.b?.customButtons?.length === 2);

  // Simulate: vCard download from public page
  console.log('\n--- vCard Download ---');
  const vcf = await req('GET', '/cards/alice-wonder/vcard');
  ok('vCard response', vcf.raw.includes('BEGIN:VCARD'));
  ok('vCard has name', vcf.raw.includes('FN:Alice Wonder'));
  ok('vCard has company', vcf.raw.includes('ORG:Wonderland Inc'));
  ok('vCard has updated phone', vcf.raw.includes('+1111222333'));

  // Simulate: User creates second card
  console.log('\n--- Multiple Cards ---');
  const card2 = await req('POST', '/cards', { name: 'Alice Wonder', jobTitle: 'Speaker' }, token);
  ok('Second card slug incremented', card2.b?.slug === 'alice-wonder-1');

  // Simulate: Dashboard loads user cards
  const list = await req('GET', `/cards/user/${userId}`, null, token);
  ok('User has 2 cards', Array.isArray(list.b) && list.b.length === 2);

  // Simulate: User deletes second card
  console.log('\n--- Delete Flow ---');
  await req('DELETE', `/cards/${card2.b?.id}`, null, token);
  const list2 = await req('GET', `/cards/user/${userId}`, null, token);
  ok('After delete, 1 card remains', list2.b?.length === 1);

  // Simulate: Login from another session
  console.log('\n--- Login Flow ---');
  const login = await req('POST', '/auth/login', { email: 'alice@demo.com', password: 'alice123' });
  ok('Login returns token', !!login.b?.token);
  const list3 = await req('GET', `/cards/user/${userId}`, null, login.b?.token);
  ok('Cards persist after re-login', list3.b?.length === 1 && list3.b[0]?.slug === 'alice-wonder');

  console.log(`\n=== RESULTS: ${passed} PASSED / ${failed} FAILED (of ${passed + failed}) ===`);
  process.exit(failed > 0 ? 1 : 0);
}

run().catch(e => { console.error(e); process.exit(1); });
