let CACHE_NAME = "typedown-cache-v1";
let urlsToCache = [
    "/"
];

self.addEventListener("install", (event: InstallEvent) =>
{
    event.waitUntil(
        self.caches
            .open(CACHE_NAME)
            .then((cache: Cache) =>
            {
                console.log("Opened cache");
                return cache.addAll(urlsToCache);
            })
    );
});