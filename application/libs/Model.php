<?php
class Model 
{
	protected $db;
	protected $app;
	public function __construct(){
		global $app;
		$this->app = &$app;
		$this->db = $app->db;
	}
	
	public function getById($id=1){
		$sql = 'SELECT * FROM '.$this->tablename.' WHERE id='.$id ;
		$list = $this->db->query($sql)->fetchAll(PDO::FETCH_ASSOC);
		return empty($list) ? false : $list[0];		
	}	
	
	public function delete($id){
		$sql = 'DELETE FROM ' . $this->tablename . ' WHERE id=' . $id ;
		return $this->db->exec($sql);
	}	
}
	
?>