<?php
class aboutusController extends controller{
	public function __contruct(){
		parent::__construct();
	}
	
	public function connect(){
		$bgimg = array('upload/bgimgs/aboutus_connect.png');
		$this->view('aboutus_connect',array('bgimg'=>$bgimg));
	}

	public function job(){
		$bgimg = array('upload/bgimgs/aboutus_connect.png');

		$job = new jobModel();
		
		$pagesize = 8 ;
		$page = isset($_GET['page']) ? intval($_GET['page']) : 1 ;

		$count = $job->getCount();
		$totalpage = ceil($count / $pagesize);
		$list = array();
		if($page <= $totalpage){
			$list = $job->getList(($page-1)*$pagesize,$pagesize);
		}
		
		$this->view('aboutus_job',array('bgimg'=>$bgimg,'totalpage'=>$totalpage,'list'=>$list, 'page'=>$page));
	}
	public function jobdesc(){
		$id = isset($_GET['id']) ? intval($_GET['id']) : 1;
		$bgimg = array('upload/bgimgs/aboutus_connect.png');
		
		$job = new jobModel();
		$detail = $job->getJobById($id);
		if(!$detail){
			header('Location:?action=aboutus_job');
		}
		$this->view('aboutus_jobdesc',array('bgimg'=>$bgimg, 'detail'=>$detail));
	}
	public function apply(){
		$id = isset($_GET['id']) ? intval($_GET['id']) : 1;
		$bgimg = array('upload/bgimgs/aboutus_connect.png');
		
		$job = new jobModel();
		$detail = $job->getJobById($id);
		if(!$detail){
			header('Location:?action=aboutus_job');
		}
		$this->view('aboutus_apply',array('bgimg'=>$bgimg, 'detail'=>$detail));
	}
	public function submit(){
		$ret = array('status'=>0);	
		if($_POST['jobid'] && $_POST['name'] && $_POST['phone'] && $_POST['email']){
			$apply = new applyModel();
			$id = $apply->create($_POST);
			if($id){
				$ret = array('status'=>1);
			}
		}
		header('Content-type: application/json');
		echo json_encode($ret);
	}
	
	public function map(){
		$bgimg = array('assets/images/honor_bg.png');
		$this->view('aboutus_map',array('bgimg'=>$bgimg));		
	}
	
}
?>