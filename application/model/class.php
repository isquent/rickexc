<?php
class classModel extends Model
{
	private $tablename;
	public function __construct(){
		parent::__construct();
		$this->tablename = 'family';
	}
	
	public function getTree(){
		$tree = array();
		$sql = 'SELECT family.id,family.name,family.pid,family.`desc`,concat(file.path,file.name) as imgpath FROM '.$this->tablename.' left join image on family.imgid=image.id left join file on image.fid = file.id order by family.id asc ' ;
		
		$list = $this->db->query($sql)->fetchAll(PDO::FETCH_ASSOC);
		
		foreach($list as $p){
			if ($p['pid'] == 0) {
				if (!isset($tree[$p['id']])) {
					$tree[$p['id']] = array('id'=>$p['id'], 'name'=>$p['name'], 'children'=>array());
				}else{
					$tree[$p['id']]['id'] = $p['id'];
					$tree[$p['id']]['name'] = $p['name'];
				}
			}else{
				if (!isset($tree[$p['pid']])) {
					$tree[$p['pid']] = array('children'=>array('id'=>$p));
				}else{
					$tree[$p['pid']]['children'][$p['id']] = $p ;
				}
			}
		}
		
		return $tree;
	}	
	
	public function getCount($where=array()){
		$tmp = ' 1=1 ';
		if(!empty($where)){
			foreach($where as $k => $v){
				if($k == $pid && $v === ''){
					$tmp .= ' AND '.$k.'!=0 ';
				}else{
					$tmp .= ' AND '.$k.'="'.$v.'"';
				}
			}
		}
		$sql = 'SELECT count(*) as count FROM '.$this->tablename.' WHERE '.$tmp ;
		$re = $this->db->query($sql)->fetchAll(PDO::FETCH_ASSOC);
		return empty($re) ? 0 : $re[0]['count'];		
	}
	
	public function getList($where=array()){
		$tmp = ' 1=1 ';
		if(!empty($where)){
			foreach($where as $k => $v){
				if($k == 'pid' && $v === ''){
					$tmp .= ' AND family.'.$k.'!=0 ';
				}else{
					$tmp .= ' AND family.'.$k.'="'.$v.'"';
				}
			}
		}		
		$sql = 'SELECT family.*,concat(file.path,file.name) as imgpath,concat(bgfile.path,bgfile.name) as bgimgpath FROM '.$this->tablename.' left join image on family.imgid=image.id left join file on image.fid=file.id left join image as bgimg on family.bgimgid=bgimg.id left join file as bgfile on bgimg.fid=bgfile.id WHERE '.$tmp.' order by id desc' ;
		$list = $this->db->query($sql)->fetchAll(PDO::FETCH_ASSOC);
		return $list;
	}
	
	public function update($data){
		if(isset($data['id'])){
			$id = $data['id'];
			unset($data['id']);
			
			$set = '';
			foreach($data as $key=>$value){
				$set .= '`'.$key.'` = "' .$value .'",';
			}			
			$set = substr($set,0,-1);			
			$sql = 'UPDATE '.$this->tablename.' SET '. $set .' WHERE id='.$id ;
			$this->db->exec($sql);
			return true ;
		}else{
			return false;
		}
	}
	
	public function create($data){
		unset($data['id']);
		$data['timestamp'] = date('Y-m-d H:m:s',time());
		$k = array_keys($data);
		$v = array_values($data);
		$k = implode('`,`',$k);
		$k = '`' . $k . '`' ;
		$v = implode('","',$v);
		$v = '"' . $v . '"' ;//die('INSERT INTO ' . $this->tablename . ' ( '.$k.' ) VALUES ('.$v.' )');
		$sql = 'INSERT INTO ' . $this->tablename . ' ( '.$k.' ) VALUES ('.$v.' )' ;
		$this->db->exec($sql);
		return $this->db->lastInsertId();
	}
	
	public function delete($id){
		$sql = 'DELETE FROM ' . $this->tablename . ' WHERE id=' . $id ;
		return $this->db->exec($sql);		
	}
}
?>