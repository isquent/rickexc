<?php
define('ROOT',dirname(__FILE__));
define('APP',ROOT.'/application');

include 'common.php' ;

$action = isset($_GET['action']) ? $_GET['action'] : 'index_index';
$action = explode('_',$action);

$module = $action[0] . 'Controller';
$method = $action[1] ;
if(class_exists($module) && method_exists($module,$method)){
	$module = new $module();
	call_user_func(array($module,$method));
}else
	die("error");
?>