<?php
class adController extends controller{
	public function __construct(){
		parent::__construct();
	}
	
	public function read(){
		$info = parse_ini_file(ROOT.'/ad.ini');
		header('Content-type: application/json');
		echo json_encode($info);
	}
	
	public function upload(){
		$upload = new Upload(ROOT);

		$fid = $upload->upload('pic','bgimgs/','ad.png');
		
		$url = $_POST['url'];
		$isshow = isset($_POST['isshow']) ? $_POST['isshow'] : 'false';

		file_put_contents('ad.ini','url='.$url."\r\nisshow=".$isshow);
		
		$this->response(json_encode(array('success'=>true,'msg'=>'success')),200);
		exit();	
	}
}
?>