<?php
class imageModel extends Model
{
	private $tablename;
	public function __construct(){
		parent::__construct();
		$this->tablename = 'image';
	}
	
	public function getCount($where=array()){
		$tmp = ' 1=1 ';
		if(!empty($where)){
			foreach($where as $k => $v){
				$tmp .= ' AND '.$k.'="'.$v.'"';
			}
		}
		$sql = 'SELECT count(*) as count FROM '.$this->tablename.' WHERE '.$tmp ;
		$re = $this->db->query($sql)->fetchAll(PDO::FETCH_ASSOC);
		return empty($re) ? 0 : $re[0]['count'];		
	}
	
	public function getList($start=0,$limit=200,$where=array()){
		$tmp = ' 1=1 ';
		if(!empty($where)){
			foreach($where as $k => $v){
				$tmp .= ' AND '.$k.'="'.$v.'"';
			}
		}		
		$sql = 'SELECT i.*,f.path,f.name,f.oldname FROM '.$this->tablename.' as i left join file as f on i.fid=f.id WHERE '.$tmp.' order by i.id desc limit '.$start.', '.$limit ;
		$list = $this->db->query($sql)->fetchAll(PDO::FETCH_ASSOC);
		return $list;
	}
	
	public function getById($id=1){
		$sql = 'SELECT i.*,f.path,f.name,f.oldname FROM '.$this->tablename.' as i left join file as f on i.fid=f.id WHERE i.id='.$id ;
		$list = $this->db->query($sql)->fetchAll(PDO::FETCH_ASSOC);		
		return empty($list) ? false : $list[0];
	}
	
	public function update($data){
		if(isset($data['id'])){
			$id = $data['id'];
			unset($data['id']);
			$set = '';
			foreach($data as $key=>$value){
				$set .= '`'.$key.'` = " ' .$value .'",';
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
		$v = implode('","',$v);
		$k = '`'.$k.'`';
		$v = '"' . $v . '"' ;
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