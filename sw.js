// Self-destruct: unregister and clear all caches, then reload clients fresh.
self.addEventListener('install', function(){ self.skipWaiting(); });
self.addEventListener('activate', function(e){
  e.waitUntil((async function(){
    try{ var ks = await caches.keys(); await Promise.all(ks.map(function(k){return caches.delete(k);})); }catch(e){}
    try{ await self.registration.unregister(); }catch(e){}
    try{ var cs = await self.clients.matchAll(); cs.forEach(function(c){ c.navigate(c.url); }); }catch(e){}
  })());
});
