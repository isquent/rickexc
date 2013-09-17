<?php
class classController extends controller{
	private $class;
	public function __construct(){
		parent::__construct();
		$this->class = new classModel();
	}
	
	public function read(){
		$pid = $this->_request['pid'];
		$where = array('pid'=>$pid);
		$list = $this->class->getList($where);
		header('Content-type: application/json');
		echo json_encode(array(
				'total' => count($list),
				'items' => $list
				)
			);
	}
	
	public function create(){
		unset($this->_request['imgpath']);
		unset($this->_request['bgimgpath']);		
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
			unset($this->_request['imgpath']);
			unset($this->_request['bgimgpath']);
			$list = $this->class->update($this->_request);			
			$this->response(json_encode(array('success'=>true,'msg'=>'','items'=>$this->_request)),200);
		}else{
			$this->response(json_encode(array('success'=>false,'msg'=>'params errors', 'items'=>$this->_request)),200);
		}
	}
}
?>