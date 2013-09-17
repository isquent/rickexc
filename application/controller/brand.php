<?php
class brandController extends controller{
	public function __contruct(){
		parent::__construct();
	}
	
	public function index(){
		$bgimg = array('assets/images/test/brand_bg.png');
		$this->view('brand_index',array('bgimg'=>$bgimg));
	}

	public function family(){
		$classid = isset($_GET['class']) ? $_GET['class'] : 1 ;
		//$class = $this->getFamily($classid);
		$items = $this->getItems($classid);
		$bgimg = $this->getbgimg($classid);
		$bgimg = $bgimg ? $bgimg : array('assets/images/test/brand_family_bg.png');
		$this->view('brand_family',array('bgimg'=>$bgimg, 'class'=>$classid, 'items'=>$items));
	}
	
	public function item(){
		$id = isset($_GET['id']) ? intval($_GET['id']) : 1 ;
		$data = $this->getitem($id);
		$bgimg = $this->getImages($id);
		$this->view('brand_item',array('bgimg'=>$bgimg,'data'=>$data));
	}
	
	public function items(){
		$classid = isset($_GET['class']) ? intval($_GET['class']) : 1 ;
		$id = isset($_GET['id']) ? intval($_GET['id']) : 1 ;
		$data = $this->getitems_2($classid);
		$bgimg = array();
		$tmp = array();
		$tmp2 = array();
		$pos = 0 ;
		foreach($data as $k=>$v){
			$v['desc'] = str_replace("\n",'<br />',$v['desc']);
			$bgimg[] = './'.$v['path'];
			$tmp[$v['id']] = $v;
			$tmp2['./'.$v['path']] = array('name'=>$v['name'],'desc'=>$v['desc']);
			if($v['id'] == $id)
				$pos = $k;
		}
		$this->view('brand_items',array('bgimg'=>$bgimg,'data'=>$tmp,'items'=>json_encode($tmp2),'pos'=>$pos));
	}
	
	protected function getFamily($products,$classid){
		foreach($products as $family){
			foreach($family['children'] as $key=>$class){
				if($classid == $key)
					return array('family'=>$family['name'],'class'=>$class);
			}
		}
		return false;
	}
	
	private function getItems($classid){
		$item = new itemModel();
		$list = $item->getItemsByPid($classid);
		return $list;
	}
	
	private function getItems_2($classid){
		$item = new itemModel();
		$list = $item->getItemsByPid_2($classid);
		return $list;
	}
	
	private function getItem($id){
		$item = new itemModel();
		$data = $item->getItemById($id);
		
		return $data;
	}
	private function getImages($pid){
		$bgimg = array();
		$image = new imageModel();
		$list = $image->getList(0,1000,array('module'=>'brand_item','pid'=>$pid));
		foreach($list as $item){
			$bgimg[] = './'.$item['path'] . $item['name'] ;
		}
		return $bgimg;
	}
	
	private function getBgimg($id){
		$bgimg = array();
		$image = new imageModel();
		$list = $image->getList(0,1,array('module'=>'brand_class_bg','pid'=>$id));
		foreach($list as $item){
			$bgimg[] = './'.$item['path'] . $item['name'] ;
		}
		return $bgimg;
	}
}
?>