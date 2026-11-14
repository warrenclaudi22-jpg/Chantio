// Service worker de Chantio : ouverture rapide et fonctionnement de base hors connexion.
// Les données de l'utilisateur ne sont jamais mises en cache ici (elles passent par Supabase).
const CACHE = 'chantio-v21';
const SHELL = ['./', 'index.html', 'config.js', 'manifest.webmanifest', 'icon.svg', 'icon-192.png', 'icon-512.png', 'apple-touch-icon.png', 'mentions-legales.html', 'confidentialite.html', 'legal.js'];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => Promise.allSettled(SHELL.map((u) => c.add(u)))).then(() => self.skipWaiting()));
});
self.addEventListener('activate', (e) => {
  e.waitUntil(caches.keys().then((ks) => Promise.all(ks.filter((k) => k !== CACHE).map((k) => caches.delete(k)))).then(() => self.clients.claim()));
});
const keep = (req, res) => { if (res && (res.ok || res.type === 'opaque')) { const copy = res.clone(); caches.open(CACHE).then((c) => c.put(req, copy)); } return res; };
self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (/supabase\.(co|in)$/.test(url.hostname)) return;
  if (url.origin === location.origin) {
    e.respondWith(fetch(req, { cache: 'no-cache' }).then((res) => keep(req, res)).catch(() => caches.match(req).then((r) => r || caches.match('index.html'))));
  } else if (/(jsdelivr|cdnjs|googleapis|gstatic)/.test(url.hostname)) {
    e.respondWith(caches.match(req).then((hit) => {
      const net = fetch(req).then((res) => keep(req, res)).catch(() => hit);
      return hit || net;
    }));
  }
});

// Notifications push (rappels de rendez-vous envoyés par le serveur)
self.addEventListener('push', (e) => {
  let d = {};
  try { d = e.data ? e.data.json() : {}; } catch (x) { d = { title: 'Chantio', body: e.data ? e.data.text() : '' }; }
  e.waitUntil(self.registration.showNotification(d.title || 'Chantio', {
    body: d.body || '', tag: d.tag || 'chantio', icon: 'icon-192.png', badge: 'icon-192.png', data: { url: d.url || './#agenda' }
  }));
});
self.addEventListener('notificationclick', (e) => {
  e.notification.close();
  const target = new URL((e.notification.data && e.notification.data.url) || './#agenda', self.registration.scope).href;
  e.waitUntil(self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((cs) => {
    for (const c of cs) { if (c.url.startsWith(self.registration.scope) && 'focus' in c) { if ('navigate' in c) c.navigate(target).catch(() => {}); return c.focus(); } }
    return self.clients.openWindow(target);
  }));
});
