import type { APIRoute } from 'astro';
import { tools } from '../lib/catalog.mjs';
export const GET: APIRoute = ({ site }) => {
 const paths=['/','/calculadoras/','/calculadoras/energia/','/calculadoras/climatizacion/','/sobre-nosotros/','/metodologia/','/fuentes/','/politica-editorial/',...tools.map(t=>`/${t.path}/`)];
 const escape=(s:string)=>s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/"/g,'&quot;');
 return new Response(`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${site ? paths.map(path=>`<url><loc>${escape(new URL(path,site).href)}</loc></url>`).join('') : ''}</urlset>`,{headers:{'Content-Type':'application/xml; charset=utf-8'}});
};
