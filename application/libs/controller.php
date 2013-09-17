<?php
class controller extends Rest{
	private $db ;
	protected $products;
    public function __construct()
    {
		parent::__construct();		
    }
    protected function view($view,$data=array()){
		$class = new classModel();
		$tree = $class->getTree();
		
		if(isset($data['class'])){			
			$data['class'] = $this->getFamily($tree,$data['class']);
		}
		
		$this->products = $tree;
    	include APP.'/view/header.php';
    	include APP.'/view/'.$view.'.php';
    	include APP.'/view/footer.php';
    }
	
	protected function json($arr,$ret=false){
		if($ret){
			return json_encode($arr);
		}else{
			echo json_encode($arr);
		}
	}
}
?>