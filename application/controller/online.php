<?php
class onlineController extends controller{
	public function __contruct(){
		parent::__construct();
	}
	
	public function index(){
		$image = new imageModel();
		$list = $image->getList(0,1000,array('module'=>'online_index'));
		$bgimg = array();
		$tmp = array();
		foreach($list as $item){
			$bgimg[] = '.'.$item['path'] . $item['name'];
			$tmp['.'.$item['path']. $item['name']] = array('name'=>$item['title'],'desc'=>$item['desc']);
		}
		$this->view('online_index',array('bgimg'=>$bgimg,'scroll'=>true,'items'=>json_encode($tmp)));
	}
}
?>