<?php
class applyController extends controller{
	private $apply;
	public function __construct(){
		parent::__construct();
		$this->apply = new applyModel();
	}
	
	public function read(){
		$start = intval($_GET['start']) ? intval($_GET['start']) : 0;
		$limit = intval($_GET['limit']) ? intval($_GET['limit']) : 20;
		$list = $this->apply->getList($start,$limit);
		$count = $this->apply->getCount();
		header('Content-type: application/json');
		echo json_encode(array(
				'total' => $count,
				'items' => $list
				)
			);
	}
	
	public function delete(){
		if ($this->_request['_id']) {
			$this->apply->delete($this->_request['_id']);
			$this->response(json_encode(array('success'=>true,'msg'=>'','items'=>$this->_request)),200);
		}else{
			$this->response(json_encode(array('success'=>false,'msg'=>'create failure', 'items'=>$this->_request)),200);
		}
	}
	
	public function update(){
		if($this->_request['id']){
			unset($this->_request['jobname']);
			$list = $this->apply->update($this->_request);			
			$this->response(json_encode(array('success'=>true,'msg'=>'','items'=>$this->_request)),200);
		}else{
			$this->response(json_encode(array('success'=>false,'msg'=>'params errors', 'items'=>$this->_request)),200);
		}
	}
}
?>