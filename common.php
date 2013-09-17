<?php
ini_set("display_errors", 1);
ini_set("track_errors", 1);
ini_set("html_errors", 1);
error_reporting(E_ALL);

date_default_timezone_set('Asia/Shanghai');

session_start();
include APP.'/libs/functions.php' ;

$config = parse_ini_file(ROOT.'/admin/config.ini',true);

$app = new stdClass();
$app->db = new Database($config['db']['host'],$config['db']['user'],$config['db']['pwd'],$config['db']['dbname']);

?>