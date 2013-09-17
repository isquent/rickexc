<?php
class indexController extends controller{
	public function __contruct(){
		parent::__construct();
	}
	
	public function index(){
		$image = new imageModel();
		$list = $image->getList(0,1000,array('module'=>'index_index'));
		$bgimg = array();
		foreach($list as $item){
			$bgimg[] = '.'.$item['path'] . $item['name'];
		}		
	
		$info = parse_ini_file(ROOT.'/ad.ini');
		$adurl = $info['isshow'] ? $info['url'] : false ;
	
		$this->view('index_index',array('bgimg'=>$bgimg,'scroll'=>true,'adurl'=>$adurl));
	}
	public function culture(){
		$bgimg = array('upload/bgimgs/index_culture.png');
		$this->view('index_culture',array('bgimg'=>$bgimg));
	}
	public function honor(){
		$bgimg = array('upload/bgimgs/index_hornor.png');
		$this->view('index_honor',array('bgimg'=>$bgimg));
	}	
	public function history(){
		$bgimg = array('upload/bgimgs/index_history.png');
		$history = new historyModel();
		$list = $history->getList();
		
		$this->view('index_history',array('bgimg'=>$bgimg,'videos'=>$list));
	}
	public function story(){
		$image = new imageModel();
		$list = $image->getList(0,1000,array('module'=>'index_story'));
		$bgimg = array();
		foreach($list as $item){
			$bgimg[] = '.'.$item['path'] . $item['name'];
		}
		$this->view('index_story',array('bgimg'=>$bgimg,'scroll'=>true));		
	}	
	
	public function about(){
		$bgimg = array('upload/bgimgs/index_about.png');
		$this->view('index_about',array('bgimg'=>$bgimg));		
	}
	
}
?>