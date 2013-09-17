hello world!
<?php
ini_set("display_errors", 1);
ini_set("track_errors", 1);
ini_set("html_errors", 1);
error_reporting(E_ALL);

$host = "localhost"; 
$user = "root"; 
$pass = "111111"; 

$r = mysql_connect($host, $user, $pass);

if (!$r) {
    echo "Could not connect to server\n";
    trigger_error(mysql_error(), E_USER_ERROR);
} else {
    echo "Connection established\n"; 
}

echo mysql_get_server_info() . "\n"; 

if (@mysql_query("CREATE DATABASE lll",$con)){
    echo "创建数据库成功！";
} else {
    echo "创建数据库失败：" . mysql_error();
}

mysql_close();
	
?>
