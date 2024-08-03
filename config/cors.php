<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Paths
    |--------------------------------------------------------------------------
    |
    | Define the paths for which CORS is enabled. This can be an array of
    | paths, or use wildcard characters to apply the CORS configuration to
    | multiple routes.
    |
    */

    'paths' => ['api/*', 'graphql'],

    /*
    |--------------------------------------------------------------------------
    | Allowed Methods
    |--------------------------------------------------------------------------
    |
    | Specify which HTTP methods are allowed for CORS requests. You can list
    | the methods you want to allow or use `'*'` to allow all methods.
    |
    */

    'allowed_methods' => ['*'], // Options: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'] or ['*']

    /*
    |--------------------------------------------------------------------------
    | Allowed Origins
    |--------------------------------------------------------------------------
    |
    | Specify the origins that are allowed to make requests. You can list
    | specific origins or use `'*'` to allow all origins. For better security,
    | you might want to specify your frontend URL.
    |
    */

    'allowed_origins' => [
        'http://localhost:3000', // Add your frontend origin(s) here
        // 'http://example.com',
    ],

    /*
    |--------------------------------------------------------------------------
    | Allowed Origins Patterns
    |--------------------------------------------------------------------------
    |
    | Define patterns for allowed origins using regular expressions. This
    | is useful if you want to allow multiple domains that match a specific
    | pattern.
    |
    */

    'allowed_origins_patterns' => [],

    /*
    |--------------------------------------------------------------------------
    | Allowed Headers
    |--------------------------------------------------------------------------
    |
    | Define which headers can be used in requests. You can list specific headers
    | or use `'*'` to allow all headers.
    |
    */

    'allowed_headers' => ['*'], // Options: ['Content-Type', 'Authorization', 'X-Requested-With'] or ['*']

    /*
    |--------------------------------------------------------------------------
    | Exposed Headers
    |--------------------------------------------------------------------------
    |
    | Define which headers can be exposed to the client. You can list specific
    | headers or use `'*'` to expose all headers.
    |
    */

    'exposed_headers' => [],

    /*
    |--------------------------------------------------------------------------
    | Max Age
    |--------------------------------------------------------------------------
    |
    | Specify the maximum time (in seconds) that the results of a preflight
    | request can be cached by the client. Set to `0` to disable caching.
    |
    */

    'max_age' => 0,

    /*
    |--------------------------------------------------------------------------
    | Supports Credentials
    |--------------------------------------------------------------------------
    |
    | Specify if credentials (like cookies, authorization headers) are supported
    | in the request. Set to `true` to allow credentials, otherwise `false`.
    |
    */

    'supports_credentials' => false,
];
