<?php
class saleController extends controller{
	private $store;
	public function __construct(){
		parent::__construct();
		$this->store = new storeModel();
	}
	
	public function network(){
		$bgimg = array('upload/bgimgs/sale_network.png');
		
		$pagesize = 8 ;
		$page = isset($_GET['page']) ? intval($_GET['page']) : 1 ;
		$city = isset($_GET['city']) ? $_GET['city'] : false ;
		$where = array();
		if($city)
			$where['city'] = $city ;
		$count = $this->store->getCount($where);
		$totalpage = ceil($count / $pagesize);
		$list = array();
		if($page <= $totalpage){
			$list = $this->store->getList(($page-1)*$pagesize,$pagesize,$where);
		}
		
		$cityList = $this->store->getCityList();
		
		$this->view('sale_network',array('bgimg'=>$bgimg,'totalpage'=>$totalpage,'list'=>$list, 'page'=>$page, 'cityList'=>$cityList,'city'=>$city));
	}
	
	public function read(){
		$start = intval($_GET['start']) ? intval($_GET['start']) : 0;
		$limit = intval($_GET['limit']) ? intval($_GET['limit']) : 20;
		$store = new storeModel();
		$list = $store->getList($start,$limit);
		$count = $store->getCount();
		header('Content-type: application/json');
		echo json_encode(array(
				'total' => $count,
				'items' => $list
				)
			);
	}
	
	public function create(){
		$store = new storeModel();	
		$id = $store->create($this->_request);
		if($id){
			$this->_request['id'] = intval($id) ;
			$this->response(json_encode(array('success'=>true,'msg'=>'','items'=>$this->_request)),200);
		}else{
			$this->response(json_encode(array('success'=>false,'msg'=>'create failure', 'items'=>$this->_request)),200);
		}
	}
	
	public function delete(){
		if ($this->_request['_id']) {
			$store = new storeModel();	
			$store->delete($this->_request['_id']);
			$this->response(json_encode(array('success'=>true,'msg'=>'','items'=>$this->_request)),200);
		}else{
			$this->response(json_encode(array('success'=>false,'msg'=>'create failure', 'items'=>$this->_request)),200);
		}
	}
	
	public function update(){
		if($this->_request['id']){
			$store = new storeModel();
			$list = $store->update($this->_request);
			
			$this->response(json_encode(array('success'=>true,'msg'=>'','items'=>$this->_request)),200);
		}else{
			$this->response(json_encode(array('success'=>false,'msg'=>'params errors', 'items'=>$this->_request)),200);
		}
	}
}
?>