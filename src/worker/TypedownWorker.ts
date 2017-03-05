let CACHE_NAME = "typedown-cache-v1";
let urlsToCache = [
    "/index.html",
    "/dist/styles.css",
    "/#/view/all"
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

/**
 * Source: https://developers.google.com/web/fundamentals/getting-started/primers/service-workers
 */
self.addEventListener("fetch", function (event: FetchEvent)
{
    event.respondWith(
        self.caches.match(event.request)
            .then(function (response)
            {
                // Cache hit - return response without making a new request
                if (response)
                {
                    return response;
                }
                /**
                 * Request is from type Stream and can be consumed only one.
                 * One time by cache and by the actual application.
                 */
                let fetchRequest = event.request.clone();

                // start fetch request
                return fetch(fetchRequest).then((response) =>
                {
                    /**
                     * Check if the response is valid. The 'basic' type indicates it is coming from our origin.
                     */
                    if (!response || response.status !== 200 || response.type !== "basic")
                    {
                        return response;
                    }

                    /**
                     * Response is from type Stream and can be consumed only one.
                     * One time by cache and by the actual application.
                     */
                    let responseToCache = response.clone();
                    self.caches.open(CACHE_NAME).then((cache) =>
                    {
                        // put ressource to ache
                        cache.put(event.request, responseToCache);
                    });

                    return response;
                });
            })
    );
});