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

ob_start();
require_once('./user-profile.php');
ob_end_clean();

$ret = ['success'=>false];
if (!isset($_FILES) || !(count($_FILES) >0)){
    $ret['error'] = 'no file';
    echo json_encode($ret);
    return;
}
$ret['getimagesize'] = getimagesize($_FILES[0]["tmp_name"]);
if ($ret['getimagesize'] === false){
    $ret['error'] = 'wrong file type';
    echo json_encode($ret);
    return;
}

$json = json_decode($_SESSION["settingsuser"], true);
$json['avatar'] = 'https://www.w3schools.com/html/img_girl.jpg';
$_SESSION["settingsuser"] = json_encode($json);

$ret['success'] = true;
$ret['avatar'] = $json['avatar'];
echo json_encode($ret);
return;
