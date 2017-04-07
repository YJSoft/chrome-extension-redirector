chrome.webRequest.onBeforeRequest.addListener(
    function(details) {
        var pattern,indexphp,documentsrl_from,documentsrl_to, middocumentsrl_from, middocumentsrl_to, mid_from, mid_to, redirectUrl, match, xefolder;

        //setting regex
        indexphp = "^http:\/\/f-planet\.co\.kr\/index\.php(.*)";
        documentsrl_from = "^http:\/\/f-planet\.co\.kr\/([0-9]+)(\/?)";
        documentsrl_to = "http://f-planet.co.kr/index.php?document_srl=$1";
        middocumentsrl_from = "^http:\/\/f-planet\.co\.kr\/([^\/]+)\/([^\/]+)";
        middocumentsrl_to = "http://f-planet.co.kr/index.php?mid=$1&document_srl=$2";
        mid_from = "^http:\/\/f-planet\.co\.kr\/([^\/]+)(\/?)";
        mid_to = "http://f-planet.co.kr/index.php?mid=$1";
        xefolder = "^http:\/\/f-planet\.co\.kr\/(addons|admin|classes|common|config|layouts|libs|m.layouts|modules|phpDoc|tests|tools|widgets|widgetstyles){1}(.*)";

        // compile regex
        indexphp = new RegExp(indexphp, 'ig');
        documentsrl_from = new RegExp(documentsrl_from, 'ig');
        middocumentsrl_from = new RegExp(middocumentsrl_from, 'ig');
        mid_from = new RegExp(mid_from, 'ig');
        xefolder = new RegExp(xefolder, 'ig');

        // if url include index.php(already fixed url)
        match = details.url.match(indexphp);
        if (match) {
            //continue
            return {};
        }

        // if url is xe folder
        match = details.url.match(xefolder);
        if (match) {
            //continue
            return {};
        }

        //if url format is /mid/document_srl
        match = details.url.match(middocumentsrl_from);
        if (match) {
            redirectUrl = details.url.replace(middocumentsrl_from, middocumentsrl_to);
            if (redirectUrl != details.url) {
                return {redirectUrl: redirectUrl};
            }
        }

        //if url format is /document_srl
        match = details.url.match(documentsrl_from);
        if (match) {
            redirectUrl = details.url.replace(documentsrl_from, documentsrl_to);
            if (redirectUrl != details.url) {
                return {redirectUrl: redirectUrl};
            }
        }

        //if url format is /mid
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
