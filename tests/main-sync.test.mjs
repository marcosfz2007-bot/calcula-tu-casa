import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,readdirSync,statSync} from 'node:fs';
import {join} from 'node:path';
import {fileURLToPath} from 'node:url';
import {SITEMAP_EXCLUDED_PATHS,isSitemapPage} from '../src/lib/seo.mjs';
import {tools,categories} from '../src/lib/catalog.mjs';

const root=fileURLToPath(new URL('../',import.meta.url));
const read=(path)=>readFileSync(join(root,path),'utf8');
const walk=(dir)=>{
  const out=[];
  for(const name of readdirSync(dir)){
    const path=join(dir,name);
    if(statSync(path).isDirectory())out.push(...walk(path));
    else out.push(path);
  }
  return out;
};

test('Sincronización main · catálogo e indexación se conservan',()=>{
  assert.equal(tools.length,39);
  assert.equal(categories.find(c=>c.slug==='solar')?.indexable,true);
  assert.equal(categories.find(c=>c.slug==='reformas')?.indexable,true);
});

test('Sincronización main · páginas legales siguen fuera del sitemap',()=>{
  for(const path of ['/contacto/','/aviso-legal/','/privacidad/','/cookies/']){
    assert.ok(SITEMAP_EXCLUDED_PATHS.includes(path),path+' debe estar excluida');
    assert.equal(isSitemapPage('https://calcula-tu-casa.pages.dev'+path),false);
  }
  assert.equal(isSitemapPage('https://calcula-tu-casa.pages.dev/solar/'),true);
  assert.equal(isSitemapPage('https://calcula-tu-casa.pages.dev/reformas/'),true);
});

test('Sincronización main · meta de verificación AdSense permanece en head',()=>{
  const base=read('src/layouts/Base.astro');
  assert.match(base,/<meta name="google-adsense-account" content="ca-pub-[0-9]+"\/>/);
});

test('Sincronización main · páginas legales usan variables de entorno actuales',()=>{
  const info=read('src/pages/[info].astro');
  for(const variable of ['PUBLIC_CONTACT_EMAIL','LEGAL_OWNER_NAME','LEGAL_NIF','LEGAL_ADDRESS','SITE_URL']){
    assert.ok(info.includes('import.meta.env.'+variable),'Falta '+variable);
  }
});

test('Sincronización main · no reaparecen placeholders legales en src',()=>{
  const placeholders=['[NOMBRE_TITULAR]','[NIF]','[DOMICILIO]','[EMAIL_CONTACTO]','[DOMINIO]'];
  const source=walk(join(root,'src')).filter(path=>/\.(?:astro|mjs|js|ts|css)$/.test(path)).map(path=>readFileSync(path,'utf8')).join('\n');
  for(const placeholder of placeholders) assert.ok(!source.includes(placeholder),'Placeholder encontrado: '+placeholder);
});

test('Sincronización main · no se activan scripts AdSense Analytics ni CMP',()=>{
  const source=walk(join(root,'src')).filter(path=>/\.(?:astro|mjs|js|ts)$/.test(path)).map(path=>readFileSync(path,'utf8')).join('\n');
  assert.doesNotMatch(source,/pagead2\.googlesyndication\.com|adsbygoogle/i);
  assert.doesNotMatch(source,/googletagmanager\.com\/gtag\/js|google-analytics\.com/i);
  assert.doesNotMatch(source,/quantcast\.mgr|didomi|consentmanager|cookiebot/i);
});

test('Sincronización main · ads.txt y verificación Search Console permanecen',()=>{
  assert.match(read('public/ads.txt'),/^google\.com, pub-[0-9]+, DIRECT, f08c47fec0942fa0/m);
  assert.match(read('public/google16f16c402ad0eb27.html'),/google-site-verification:/);
});

test('Cierre PR4 · env.example documenta variables legales vacías',()=>{
  const env=read('.env.example');
  assert.match(env,/^SITE_URL=/m);
  assert.match(env,/^PUBLIC_CONTACT_EMAIL=$/m);
  assert.match(env,/^LEGAL_OWNER_NAME=$/m);
  assert.match(env,/^LEGAL_NIF=$/m);
  assert.match(env,/^LEGAL_ADDRESS=$/m);
});

test('Cierre PR4 · batería aclara que el excedente se comprueba para un solo día',()=>{
  const catalog=read('src/lib/catalog.mjs');
  const ui=read('src/lib/calculator-ui.mjs');
  assert.match(catalog,/excedente solar disponible en un día/i);
  assert.match(catalog,/No simula varios días/i);
  assert.match(ui,/excedente de un día cargaría completamente la batería dimensionada, considerando pérdidas/i);
  assert.match(ui,/no simula varios días/i);
});
