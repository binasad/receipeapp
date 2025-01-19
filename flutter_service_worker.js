'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';

const RESOURCES = {"assets/AssetManifest.bin": "3770db83ea5636d26e2664244cbad0bd",
"assets/AssetManifest.bin.json": "4c2950c4bf13a67c37fafdc4a46270a5",
"assets/AssetManifest.json": "bb73306c8f076681d76fccd035655d4a",
"assets/assets/Images/American.png": "5651f61303d25853ec742c0bf9cbfbc5",
"assets/assets/Images/AmericanDishes/1.png": "73069382cd1ce4be21e531f8d9dbeeb8",
"assets/assets/Images/AmericanDishes/10.png": "1ac34e5f8b0d6d3110bf1ed6f37ee728",
"assets/assets/Images/AmericanDishes/2.png": "f4259943c0679ae0ddc74352a6c8fd83",
"assets/assets/Images/AmericanDishes/3.png": "19de8ee04bfbe136271c2c6051796e9b",
"assets/assets/Images/AmericanDishes/4.png": "09405d214c7015bd62b0c2178d6cde96",
"assets/assets/Images/AmericanDishes/5.png": "84406c0d7cf0c65d9f63b9cca6830849",
"assets/assets/Images/AmericanDishes/6.png": "cd2640c8fbc42371a2ef83c45b6c362f",
"assets/assets/Images/AmericanDishes/7.png": "337b803f390a4d56bf867dbf61edf7c4",
"assets/assets/Images/AmericanDishes/8.png": "a453886948e97e045482c79bbe61522b",
"assets/assets/Images/AmericanDishes/9.png": "53b431a100c9111307916db82b11da66",
"assets/assets/Images/Chineese.png": "3e56218a5e82ffdd474b0f4f05bb8f25",
"assets/assets/Images/ChineseDishes/1.png": "63f6fb74151dcbadd05edfa78f7c27c3",
"assets/assets/Images/ChineseDishes/10.png": "dc37a4125613509a5101e4e6a2a8c37f",
"assets/assets/Images/ChineseDishes/2.png": "3acfe980e60041b35ee85dd1e3a86aba",
"assets/assets/Images/ChineseDishes/3.png": "9999e3bf2f162d2e927ea9591abda030",
"assets/assets/Images/ChineseDishes/4.png": "04315b84c3a2d19edc50df32ab763246",
"assets/assets/Images/ChineseDishes/5.png": "22dd2f87a61cbfb3922cc48246355339",
"assets/assets/Images/ChineseDishes/6.png": "9f2e59b2077a30c9284c861691442509",
"assets/assets/Images/ChineseDishes/7.png": "7a4709c5a9db9f981702510006d6ab00",
"assets/assets/Images/ChineseDishes/8.png": "5fb70dfc10b6c5f8ed3d21f38e149764",
"assets/assets/Images/ChineseDishes/9.png": "2f749185a701e8203e88571e108e3e44",
"assets/assets/Images/Indian.png": "58020d60a2cfabe73e2700da55bd400f",
"assets/assets/Images/IndianDishes/1.png": "018cc388700b6b7d4d5f3f08fea81f9f",
"assets/assets/Images/IndianDishes/10.png": "f7558f89fc478a6965e0765273bbdefe",
"assets/assets/Images/IndianDishes/2.png": "b091403ef24a71233f403d7d13c32879",
"assets/assets/Images/IndianDishes/3.png": "6479a31d747bd2b33fe388f22540e6b1",
"assets/assets/Images/IndianDishes/4.png": "7a8d0bd939915a9743c5c3cf8439fcf9",
"assets/assets/Images/IndianDishes/5.png": "82776043c83a951b967320f8df05b613",
"assets/assets/Images/IndianDishes/6.png": "3d529e8de7106f2d9b58d0dcd2a47b4d",
"assets/assets/Images/IndianDishes/7.png": "63e5f90943313c62a57ca3a966fa57a7",
"assets/assets/Images/IndianDishes/8.png": "92608fa2b8edbfd3bdcfced5ab8e5ccb",
"assets/assets/Images/IndianDishes/9.png": "04613004dc6035087e1c915529f543a6",
"assets/assets/Images/Italian.png": "bc286b1193fc6b1a0a2714bc72bd23d7",
"assets/assets/Images/ItalianDishes/1.png": "cb67ad78a2bfbb5284acc9f61f0cf46a",
"assets/assets/Images/ItalianDishes/10.png": "4516031b49295a77bc24cbad30560b41",
"assets/assets/Images/ItalianDishes/2.png": "935334da7adb4865fb7b3c9634f15116",
"assets/assets/Images/ItalianDishes/3.png": "bbfef2271c14cdcc2c28f551ec13ce2a",
"assets/assets/Images/ItalianDishes/4.png": "06bb38f73ad3eb1b5a6a39a59237fce0",
"assets/assets/Images/ItalianDishes/5.png": "1da6e24aaaff7778716c4d3f23d46da2",
"assets/assets/Images/ItalianDishes/6.png": "8d35cba87d910652fb84f472a071d88c",
"assets/assets/Images/ItalianDishes/7.png": "83eca3c184c6030d3593e15dafc45a64",
"assets/assets/Images/ItalianDishes/8.png": "6b0680a5d31d949b5e13a8a8cf7c599a",
"assets/assets/Images/ItalianDishes/9.png": "4d8b50d80408fdc498505345b7bd0e60",
"assets/assets/Images/RecipeVerse.png": "b9ec66e52f4573aa95fc0cf508ec17fc",
"assets/FontManifest.json": "dc3d03800ccca4601324923c0b1d6d57",
"assets/fonts/MaterialIcons-Regular.otf": "f93ca8496b18b1ec89b2fa0ebb159055",
"assets/NOTICES": "0685138daa808a19b85df861b03c57db",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "e986ebe42ef785b27164c36a9abc7818",
"assets/shaders/ink_sparkle.frag": "ecc85a2e95f5e9f53123dcaf8cb9b6ce",
"canvaskit/canvaskit.js": "26eef3024dbc64886b7f48e1b6fb05cf",
"canvaskit/canvaskit.js.symbols": "efc2cd87d1ff6c586b7d4c7083063a40",
"canvaskit/canvaskit.wasm": "e7602c687313cfac5f495c5eac2fb324",
"canvaskit/chromium/canvaskit.js": "b7ba6d908089f706772b2007c37e6da4",
"canvaskit/chromium/canvaskit.js.symbols": "e115ddcfad5f5b98a90e389433606502",
"canvaskit/chromium/canvaskit.wasm": "ea5ab288728f7200f398f60089048b48",
"canvaskit/skwasm.js": "ac0f73826b925320a1e9b0d3fd7da61c",
"canvaskit/skwasm.js.symbols": "96263e00e3c9bd9cd878ead867c04f3c",
"canvaskit/skwasm.wasm": "828c26a0b1cc8eb1adacbdd0c5e8bcfa",
"canvaskit/skwasm.worker.js": "89990e8c92bcb123999aa81f7e203b1c",
"favicon.png": "5dcef449791fa27946b3d35ad8803796",
"flutter.js": "4b2350e14c6650ba82871f60906437ea",
"flutter_bootstrap.js": "209ded6d9726c37a3466599f974bc11a",
"icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1",
"icons/Icon-512.png": "96e752610906ba2a93c65f8abe1645f1",
"icons/Icon-maskable-192.png": "c457ef57daa1d16f64b27b786ec2ea3c",
"icons/Icon-maskable-512.png": "301a7604d45b3e739efc881eb04896ea",
"index.html": "3794e2f6bd433b1af896911ed364b8d1",
"/": "3794e2f6bd433b1af896911ed364b8d1",
"main.dart.js": "0700bbcfcd14718d53b4c7a707b49946",
"manifest.json": "7a6a9b9c4380a9ee80a06c9b600e0c28",
"version.json": "576b29847b370372d82ce919c7c15dce"};
// The application shell files that are downloaded before a service worker can
// start.
const CORE = ["main.dart.js",
"index.html",
"flutter_bootstrap.js",
"assets/AssetManifest.bin.json",
"assets/FontManifest.json"];

// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});
// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        // Claim client to enable caching on first launch
        self.clients.claim();
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      // Claim client to enable caching on first launch
      self.clients.claim();
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});
// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache only if the resource was successfully fetched.
        return response || fetch(event.request).then((response) => {
          if (response && Boolean(response.ok)) {
            cache.put(event.request, response.clone());
          }
          return response;
        });
      })
    })
  );
});
self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});
// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}
// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
