export const SITEMAP_EXCLUDED_PATHS=Object.freeze([
 '/contacto/','/aviso-legal/','/privacidad/','/cookies/','/solar/','/reformas/'
]);
export const isSitemapPage=(page)=>!SITEMAP_EXCLUDED_PATHS.some(path=>page.endsWith(path));
