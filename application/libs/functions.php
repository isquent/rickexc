<?php
/*
spl_autoload_register(function($class){
	if(preg_match('/Controller$/',$class) && is_file(APP.'/controller/' . preg_replace('/Controller$/','',$class) . '.php')){
		include APP.'/controller/' . preg_replace('/Controller$/','',$class) . '.php';
	}elseif(preg_match('/Model$/',$class) && is_file(APP.'/model/' . preg_replace('/Model$/','',$class) . '.php')){
		include APP.'/model/' . preg_replace('/Model$/','',$class) . '.php';
	}elseif(is_file(APP.'/libs/' . $class . '.php')){
		include APP.'/libs/' . $class . '.php';
	}else{
		throw new Exception('Cannot find class ' . $class);
	}
});
*/
function __autoload($class){
	if(preg_match('/Controller$/',$class) && is_file(APP.'/controller/' . preg_replace('/Controller$/','',$class) . '.php')){
		include APP.'/controller/' . preg_replace('/Controller$/','',$class) . '.php';
	}elseif(preg_match('/Model$/',$class) && is_file(APP.'/model/' . preg_replace('/Model$/','',$class) . '.php')){
		include APP.'/model/' . preg_replace('/Model$/','',$class) . '.php';
	}elseif(is_file(APP.'/libs/' . $class . '.php')){
		include APP.'/libs/' . $class . '.php';
	}else{
		throw new Exception('Cannot find class ' . $class);
	}	
}

?>