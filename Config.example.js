module.exports = {
    "network": {
        "port": 5303, // The port to run Chocoflask on. This is 5303 by default.
        "interface": "0.0.0.0" // The interface to listen on. The default is all interfaces (0.0.0.0). Don't touch this unless if you know what you're doing.
    },
    "cde": {
        "enabled": true, // Determines if the Chocoflask CDE is to be enabled. On by default.
        "url": "https://example.com", // The URL to the Chocoflask CDE instance.
        "web": {
            "redirect": "https://example.com" // The redirect URL for requests that go to the root path.
        },
        "api": {
            "uploadLimit": 65536, // The CDE upload file size in MiB (mibibytes, or megabytes using multiples of 1024 instead of 1000). This is 64 gigabytes by default.
            "token": "example", // The CDE authentication token for uploading files and running dangerous actions.
            "generatedFileNameLength": 9, // The length of random file names (used for uploading images and videos using the API). This is 9 by default.
        }
    }
}