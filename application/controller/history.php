<?php
class historyController extends controller{
	private $class;
	public function __construct(){
		parent::__construct();
		$this->class = new historyModel();
	}
	
	public function read(){
		$start = $this->_request['start'];
		$limit = $this->_request['limit'];
		$limit = $start.','.$limit;
		$where = array();
		
		$list = $this->class->getList($where,$limit);
		$count = $this->class->getCount($where);
		
		if(!get_magic_quotes_gpc()){
			foreach($list as $key => $value){
				$list[$key]['code'] = stripslashes($value['code']);
			}
		}
		header('Content-type: application/json');
		echo json_encode(array(
				'total' => $count,
				'items' => $list
				)
			);
	}
	
	public function create(){
		$id = $this->class->create($this->_request);
		if($id){
			$this->_request['id'] = intval($id) ;
			$this->response(json_encode(array('success'=>true,'msg'=>'','items'=>$this->_request)),200);
		}else{
			$this->response(json_encode(array('success'=>false,'msg'=>'create failure', 'items'=>$this->_request)),200);
		}
	}
	
	public function delete(){
		if ($this->_request['_id']) {
			$this->class->delete($this->_request['_id']);
			$this->response(json_encode(array('success'=>true,'msg'=>'','items'=>$this->_request)),200);
		}else{
			$this->response(json_encode(array('success'=>false,'msg'=>'create failure', 'items'=>$this->_request)),200);
		}
	}
	
	public function update(){
		if($this->_request['id']){
			$list = $this->class->update($this->_request);
			$this->response(json_encode(array('success'=>true,'msg'=>'','items'=>$this->_request)),200);
		}else{
			$this->response(json_encode(array('success'=>false,'msg'=>'params errors', 'items'=>$this->_request)),200);
		}
	}
}
?>