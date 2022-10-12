// Current cache version
const VERSION = 'v6.1';

// Static cache content to load
var staticAssets = [
	'/',
	'/index.asp',
	'/includes/forcessl.inc',
	'/pages/error.html',
	'/pages/privacy.html',
	'/pages/sent.html',
	'/pages/tandc.html',
	'/pages/trap.html',			
	'/favicon.ico',
	'/css/bootstrap_combo.min.css',
	'/css/custom_combo.min.css',
	'/css/fonts.min.css',
	'/css/smicons.min.css',	
	'/fa/css/all.min.css',
	'/fonts/source-sans-pro-v11-latin-regular.woff2',
	'/fonts/source-sans-pro-v11-latin-700.woff2',
	'/js/bootstrap.min.js',
	'/js/validate-me.js',
	'/res/badges/googlecloudplatformpartner.png',
	'/res/badges/mpbadge.png',
	'/res/badges/shopifypartnerlogo.png',
	'/res/icons/adobe_cc.png',
	'/res/icons/angular.png',
	'/res/icons/dotnetmvc.png',
	'/res/icons/express.png',
	'/res/icons/googleanalytics.png',
	'/res/icons/googlecloudplatform.png',
	'/res/icons/jquery.png',
	'/res/icons/mongodb.png',
	'/res/icons/msiis.png',	
	'/res/icons/nodejs.png',
	'/res/icons/shopify.png',
	'/res/icons/sqlserver.png',
	'/res/icons/vuejs.png',
	'/res/pdfs/gaiq/gaiq.pdf',	
	'/res/portfolio/aof.jpg',
	'/res/portfolio/bbb.jpg',
	'/res/portfolio/ff.jpg',
	'/res/portfolio/fn.jpg',
	'/res/portfolio/hbt.jpg',
	'/res/portfolio/js.jpg',
	'/res/portfolio/lld.jpg',	
	'/res/portfolio/squatters.jpg',
	'/res/portfolio/tdb.jpg',
	'/res/portfolio/th.jpg',
	'/res/portfolio/wwm.jpg',
	'/res/portfolio/wwt.jpg',	
	'/res/slideshow/ss1.jpg',
	'/res/slideshow/ss2.jpg',
	'/res/slideshow/ss3.jpg',
	'/res/slideshow/ss4.jpg',
	'/res/slideshow/ss5.jpg',
	'/res/slideshow/ss6.jpg',			
	'/res/cdround175x175.png',
	'/res/trans1x1.png',
	'/res/ukflag.png',
	'/res/phflag.png'
];

// Listen for the install event
self.addEventListener('install', event => event.waitUntil(installSW()));

// Install the SW and initialise the cache
async function installSW() {
	const cache = await caches.open(getCacheName());
	return cache.addAll(staticAssets);
}

// Listen for the activate event
self.addEventListener('activate', event => event.waitUntil(activateSW()));

// Activate the cache
async function activateSW() {
    const cacheKeys = await caches.keys();
    cacheKeys.forEach(cacheKey => {
		if (cacheKey !== getCacheName() ) {
			caches.delete(cacheKey);
        }
    });
}

// Listen for the fetch event
self.addEventListener('fetch', event => event.respondWith(cacheThenNetwork(event)));

// SW strategy, go to the cache then the network on fetch request
async function cacheThenNetwork(event) {
    const cache = await caches.open(getCacheName());
    const cachedResponse = await cache.match(event.request);
    if (cachedResponse) {
        return cachedResponse;
    }
    const networkResponse = await fetch(event.request);
    return networkResponse;
}

// Return the current cache name
function getCacheName() {
	return "cache-" + VERSION;
}