<?php
class applyModel extends Model
{
	private $tablename;
	public function __construct(){
		parent::__construct();
		$this->tablename = 'apply';
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
				$tmp .= ' AND apply.'.$k.'="'.$v.'"';
			}
		}		
		$sql = 'SELECT apply.*,job.name as jobname FROM '.$this->tablename.' left join job on apply.jobid=job.id WHERE '.$tmp.' order by id desc' ;
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