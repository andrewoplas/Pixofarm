<?php
header("Access-Control-Allow-Origin: " . $_SERVER['HTTP_ORIGIN']);
header('Content-Type: application/json');
header("X-Content-Type-Options: nosniff");
header('Access-Control-Allow-Headers: Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, Authorization, pragma, cache-control');
header('Access-Control-Allow-Methods: POST,GET,HEAD,OPTIONS,PUT,DELETE');
header("Cache-Control: no-store, no-cache, must-revalidate");
header("Cache-Control: post-check=0, pre-check=0", false);
header("Pragma: no-cache");
header("Access-Control-Allow-Credentials: true");
header("Expires: Mon, 17 Jul 1989 05:00:00 GMT");
header("Last-Modified: " . gmdate("D, d M Y H:i:s") . " GMT");

if (!isset($_SESSION)) {
    session_start();
}
$input = file_get_contents("php://input");
$json = json_decode($input, true);
if (isset($json['userId']) && intval($json['userId']) > 0){
    $_SESSION["settingsuser"] = json_encode($json);
    echo $_SESSION["settingsuser"];
}