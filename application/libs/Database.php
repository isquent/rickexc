<?php
class Database extends PDO
{
    function __construct($host='localhost',$user='root',$password='111111',$dbname='lll')
    {
		try{
	        parent::__construct('mysql:dbname='.$dbname.';host='.$host, $user, $password);
			$this->exec("set names utf8");
	        //$this->setAttribute(PDO::ATTR_STATEMENT_CLASS, array('DBStatement', array($this)));
			$this->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
		}catch (PDOException $e) {
    		echo 'Connection failed: ' . $e->getMessage();
		}
    }
}
?>