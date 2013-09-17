<?php
class userController extends controller{
	public function __contruct(){
		parent::__construct();
	}
	
	public function login(){
		$md5pwd = file_get_contents(ROOT.'/pwd.ini');
		$menu = array();
		if(isset($_POST['UserName']) && $_POST['UserName'] == 'admin' && isset($_POST['PassWord']) && md5($_POST['PassWord']) == $md5pwd){
			$_SESSION['UserName'] = "admin";
			setcookie('UserName','admin');
			$menu = array(
				'success'	=> true
			);
		}else{
			if(isset($_SESSION['UserName'])) {
				unset($_SESSION['UserName']);
				setcookie('UserName','',time() - 3600);
			}
			$menu = array(
				'success'	=> false,
				'errors'	=> array(
					'errorno'	=> 1,
					'msg'		=> 'username or password wrong'
				)
			);			
		}
		header('Content-type: application/json');
		echo json_encode($menu);
	}
	public function logout(){
		unset($_SESSION['UserName']);
		setcookie('UserName','',time() - 3600);
		header('Location:admin/admin.html');
	}
	public function pwd(){
		$ret = array('success'=>false,'errors' => array('errorno'=>1,'msg'=>'params errors'));
		$pwd = isset($_POST['PassWord']) ? trim($_POST['PassWord']) : false;
		if($pwd){
			file_put_contents(ROOT.'/pwd.ini',md5($pwd));
			$ret['success'] = true ;
			$ret['errors'] = array('errorno'=>2,'msg'=>'success');
		}
		header('Content-type: application/json');
		echo json_encode($ret);		
	}
}
?>