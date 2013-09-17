<?php
class imageController extends controller{
	private $image;
	public function __construct(){
		parent::__construct();
		$this->image = new imageModel();
	}
	
	public function read(){
		$start = intval($_GET['start']) ? intval($_GET['start']) : 0;
		$limit = intval($_GET['limit']) ? intval($_GET['limit']) : 20;
		$module = $this->_request['module'] ;
		$pid = $this->_request['pid'] ;
		$where = array('module'=>$module, 'pid'=>$pid);
		$list = $this->image->getList($start,$limit,$where);
		$count = $this->image->getCount($where);
		header('Content-type: application/json');
		echo json_encode(array(
				'total' => $count,
				'items' => $list
				)
			);
	}
	
	public function delete(){
		if ($this->_request['_id']) {
			$this->image->delete($this->_request['_id']);
			$this->response(json_encode(array('success'=>true,'msg'=>'','items'=>$this->_request)),200);
		}else{
			$this->response(json_encode(array('success'=>false,'msg'=>'create failure', 'items'=>$this->_request)),200);
		}
	}
	
	public function create(){
		$data = array('pid'=>0,'fid'=>0,'module'=>'online_index');
		$id = $this->image->create($data);
		if($id){
			$this->_request['id'] = intval($id) ;
			$this->response(json_encode(array('success'=>true,'msg'=>'','items'=>$this->_request)),200);
		}else{
			$this->response(json_encode(array('success'=>false,'msg'=>'create failure', 'items'=>$this->_request)),200);
		}
	}	
	
	public function update(){
		if($this->_request['id']){
			$data = array(
				'id' => $this->_request['id'],
				'title' => $this->_request['title'],
				'desc' => $this->_request['desc'],				
			);
			$list = $this->image->update($data);			
			$this->response(json_encode(array('success'=>true,'msg'=>'','items'=>$this->_request)),200);
		}else{
			$this->response(json_encode(array('success'=>false,'msg'=>'params errors', 'items'=>$this->_request)),200);
		}
	}	
	
	public function upload(){
		$module = isset($_POST['module']) ? trim($_POST['module']) : '';
		$pid = isset($_POST['pid']) ? trim($_POST['pid']) : 0;
		$upload = new Upload(ROOT);
		
		if ($module == 'bg') {
			$fid = $upload->upload('imageupload','bgimgs/',$pid);
			$this->response(json_encode(array('success'=>true)),200);
			exit();
		}
		
		$fid = $upload->upload('imageupload','images/');
		
		if ($fid) {
			if($module == 'online_index'){
				$this->image->update(array('id'=>$pid,'fid'=>$fid));
				$id = $fid ;
			}else{
				$id = $this->image->create(array('module'=>$module,'fid'=>$fid,'pid'=>intval($pid)));
			}
			$record = $this->image->getById($id);
			$this->response(json_encode(array('success'=>true, 'items'=>$record)),200);
		}else{
			$this->response(json_encode(array('success'=>false,'error'=>$upload->error())),200);
		}		
	}
}
?>