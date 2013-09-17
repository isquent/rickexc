<?php
class familyModel extends Model
{
	private $tablename;
	public function __construct(){
		parent::__construct();
		$this->tablename = 'family';
	}
	
	public function getTree(){
		$tree = array();
		$sql = 'SELECT id,name,pid,`desc` FROM '.$this->tablename.' order by id asc ' ;
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
}
?>