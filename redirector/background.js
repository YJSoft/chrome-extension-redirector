chrome.webRequest.onBeforeRequest.addListener(
    function(details) {
        var pattern,indexphp, middocumentsrl_from, middocumentsrl_to, mid_from, mid_to, redirectUrl, match, xefolder;

        console.log(details);
        
        //setting regex
        indexphp = "^http:\/\/f-planet\.co\.kr\/index\.php(.*)";
        middocumentsrl_from = "^http:\/\/f-planet\.co\.kr\/([^\/]+)\/([^\/]+)";
        middocumentsrl_to = "http://f-planet.co.kr/index.php?mid=$1&document_srl=$2";
        mid_from = "^http:\/\/f-planet\.co\.kr\/([^\/]+)";
        mid_to = "http://f-planet.co.kr/index.php?mid=$1";
        xefolder = "(addons|admin|classes|common|config|layouts|libs|m.layouts|modules|phpDoc|tests|tools|widgets|widgetstyles)";

        // compile regex
        indexphp = new RegExp(indexphp, 'ig');
        middocumentsrl_from = new RegExp(middocumentsrl_from, 'ig');
        mid_from = new RegExp(mid_from, 'ig');
        xefolder = new RegExp(xefolder, 'ig');

        // if url include index.php(already fixed url)
        match = details.url.match(indexphp);
        if (match) {
            //continue
            return {};
        }

        //if url format is mid/document_srl
        match = details.url.match(middocumentsrl_from);
        if (match) {
            //if xe common folder url, continue
            if(typeof match[1] != "undefined" && match[1].match(xefolder)) {
                return {};
            }

            //else, redirect
            redirectUrl = details.url.replace(middocumentsrl_from, middocumentsrl_to);
            if (redirectUrl != details.url) {
                return {redirectUrl: redirectUrl};
            }
        }

        //if url format is mid
        match = details.url.match(mid_from);
        if (match) {
            redirectUrl = details.url.replace(mid_from, mid_to);
            if (redirectUrl != details.url) {
                return {redirectUrl: redirectUrl};
            }
        }
        return {};
    },
    {
        urls: [
            "<all_urls>",
        ],
        types: ["main_frame"]
    },
    ["blocking"]
);
