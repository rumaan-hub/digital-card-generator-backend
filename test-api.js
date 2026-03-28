const http = require('http');

const BASE = 'http://localhost:5000';
let TOKEN = '';
let USER_ID = '';
let CARD_ID = '';
let CARD2_ID = '';
let passed = 0;
let failed = 0;

function request(method, path, body, token) {
  return new Promise((resolve, reject) => {
    const url = new URL(path, BASE);
    const options = {
      hostname: url.hostname,
      port: url.port,
      path: url.pathname,
      method,
      headers: { 'Content-Type': 'application/json' },
    };
    if (token) options.headers['Authorization'] = `Bearer ${token}`;

    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => (data += chunk));
      res.on('end', () => {
        const headers = res.headers;
        try {
          resolve({ status: res.statusCode, body: JSON.parse(data), raw: data, headers });
        } catch {
          resolve({ status: res.statusCode, body: null, raw: data, headers });
        }
      });
    });
    req.on('error', reject);
    if (body) req.write(JSON.stringify(body));
    req.end();
  });
}

function check(name, condition, detail) {
  if (condition) {
    console.log(`   PASS  ${name}${detail ? ' — ' + detail : ''}`);
    passed++;
  } else {
    console.log(`   FAIL  ${name}${detail ? ' — ' + detail : ''}`);
    failed++;
  }
}

async function run() {
  console.log('============================================');
  console.log('   CARDFORGE BACKEND — FULL API TEST SUITE');
  console.log('============================================\n');

  // 1. Register
  const r1 = await request('POST', '/auth/register', { email: 'john@test.com', password: 'secret123' });
  TOKEN = r1.body?.token;
  USER_ID = r1.body?.user?.id;
  check('1.  POST /auth/register', r1.status === 201 || (r1.status === 200 && TOKEN), `userId=${USER_ID}`);

  // 2. Duplicate register
  const r2 = await request('POST', '/auth/register', { email: 'john@test.com', password: 'secret123' });
  check('2.  POST /auth/register (dup)', r2.status === 409, `${r2.status} ${r2.body?.message}`);

  // 3. Login
  const r3 = await request('POST', '/auth/login', { email: 'john@test.com', password: 'secret123' });
  check('3.  POST /auth/login', r3.body?.token?.length > 0, 'JWT received');

  // 4. Wrong password
  const r4 = await request('POST', '/auth/login', { email: 'john@test.com', password: 'wrong' });
  check('4.  POST /auth/login (wrong pw)', r4.status === 401, `${r4.status} ${r4.body?.message}`);

  // 5. Validation
  const r5 = await request('POST', '/auth/register', { email: 'x@x.com', password: 'ab' });
  check('5.  POST /auth/register (validation)', r5.status === 400, `${r5.body?.message}`);

  // 6. Create card
  const r6 = await request('POST', '/cards', {
    name: 'Jane Smith',
    jobTitle: 'Product Designer',
    company: 'DesignCo',
    bio: 'Crafting digital experiences',
    phone: '+1555123456',
    email: 'jane@designco.com',
    whatsapp: '+1555123456',
    website: 'https://janesmith.design',
    address: 'New York, NY',
    theme: { id: 'dark', name: 'Dark', primaryColor: '#8b5cf6' },
    socialLinks: [
      { platform: 'linkedin', url: 'https://linkedin.com/in/janesmith' },
      { platform: 'dribbble', url: 'https://dribbble.com/janesmith' },
    ],
    customButtons: [{ label: 'Book a Call', url: 'https://cal.com/janesmith' }],
  }, TOKEN);
  CARD_ID = r6.body?.id;
  check('6.  POST /cards (create)', r6.body?.slug === 'jane-smith',
    `slug=${r6.body?.slug}, socialLinks=${r6.body?.socialLinks?.length}, customButtons=${r6.body?.customButtons?.length}`);

  // 7. No auth
  const r7 = await request('POST', '/cards', { name: 'Hack' });
  check('7.  POST /cards (no auth)', r7.status === 401, `${r7.status} Unauthorized`);

  // 8. Slug uniqueness
  const r8 = await request('POST', '/cards', { name: 'Jane Smith', jobTitle: 'Engineer' }, TOKEN);
  CARD2_ID = r8.body?.id;
  check('8.  POST /cards (slug unique)', r8.body?.slug === 'jane-smith-1', `slug=${r8.body?.slug}`);

  // 9. Get card by slug (public)
  const r9 = await request('GET', '/cards/jane-smith');
  check('9.  GET /cards/:slug (public)', r9.body?.name === 'Jane Smith' && r9.body?.socialLinks?.length === 2,
    `name=${r9.body?.name}, links=${r9.body?.socialLinks?.length}, buttons=${r9.body?.customButtons?.length}`);

  // 10. Not found
  const r10 = await request('GET', '/cards/does-not-exist');
  check('10. GET /cards/:slug (404)', r10.status === 404, `${r10.status} ${r10.body?.message}`);

  // 11. Get user cards
  const r11 = await request('GET', `/cards/user/${USER_ID}`, null, TOKEN);
  check('11. GET /cards/user/:id', Array.isArray(r11.body) && r11.body.length === 2, `${r11.body?.length} cards`);

  // 12. vCard
  const r12 = await request('GET', '/cards/jane-smith/vcard');
  check('12. GET /cards/:slug/vcard', r12.raw.includes('BEGIN:VCARD') && r12.raw.includes('FN:Jane Smith') && r12.raw.includes('ORG:DesignCo'),
    'Valid .vcf with name, company, phone');

  // 13. Update
  const r13 = await request('PUT', `/cards/${CARD_ID}`, {
    bio: 'Award-winning designer',
    socialLinks: [
      { platform: 'linkedin', url: 'https://linkedin.com/in/janesmith' },
      { platform: 'instagram', url: 'https://instagram.com/janesmith' },
    ],
  }, TOKEN);
  check('13. PUT /cards/:id (update)', r13.body?.bio === 'Award-winning designer' && r13.body?.socialLinks?.length === 2,
    `bio="${r13.body?.bio}", socialLinks=${r13.body?.socialLinks?.length}`);

  // 14. Delete
  const r14 = await request('DELETE', `/cards/${CARD2_ID}`, null, TOKEN);
  check('14. DELETE /cards/:id', r14.body?.message?.includes('deleted'), r14.body?.message);

  // 15. Verify deleted
  const r15 = await request('GET', '/cards/jane-smith-1');
  check('15. GET deleted card (404)', r15.status === 404, `${r15.status} confirmed gone`);

  console.log('\n============================================');
  console.log(`   RESULTS: ${passed} PASSED / ${failed} FAILED (of 15)`);
  console.log('============================================');

  process.exit(failed > 0 ? 1 : 0);
}

run().catch((e) => { console.error(e); process.exit(1); });
