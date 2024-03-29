<?php

/**
 * Requires curl enabled in php.ini
 **/

$url = 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest';
$parameters = [
    'id' => '24991'
];

$headers = [
    'Accepts: application/json',
    'X-CMC_PRO_API_KEY:d53e064a-727d-4f62-82aa-f2c8c4029963'
];
$qs = http_build_query($parameters); // query string encode the parameters
$request = "{$url}?{$qs}"; // create the request URL


$curl = curl_init(); // Get cURL resource
// Set cURL options
curl_setopt_array($curl, array(
    CURLOPT_URL => $request,            // set the request URL
    CURLOPT_HTTPHEADER => $headers,     // set the headers
    CURLOPT_RETURNTRANSFER => 1         // ask for raw response instead of bool
));

$response = curl_exec($curl); // Send the request, save the response
$result = json_encode($response);
$file = 'result.json';

file_put_contents($file, $result);
curl_close($curl); // Close request
// require_once("index.html")
?>
//public
