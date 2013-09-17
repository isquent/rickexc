<?php
class menuController extends controller{
	public function __contruct(){
		parent::__construct();
	}
	
	public function menulist(){
		//this->json();
		$menu = array();
		if(isset($_SESSION['UserName'])){
			$menu = array(
				array(
					'text'	=> '关于依丽兰',
					'id'	=> '1',
					'children'	=> array(
						array(
							'text'	=> '首页',
							'id'	=> '1_0',
							'leaf'	=> true
						),
						array(
							'text'	=> '企业文化',
							'id'	=> '1_1',
							'leaf'	=> true
						),
						array(
							'text'	=> '企业荣誉',
							'id'	=> '1_2',
							'leaf'	=> true
						),
						array(
							'text'	=> '煇煌历程',
							'id'	=> '1_3',
							'leaf'	=> true
						),
						array(
							'text'	=> '品牌故事',
							'id'	=> '1_4',
							'leaf'	=> true
						),
						array(
							'text'	=> '广告',
							'id'	=> '1_5',
							'leaf'	=> true
						)																	
					)
				),
				array(
					'text'	=> '线上展示',
					'id'	=> '2',
					'leaf'	=> true
				),
				array(
					'text'	=> '品牌产品',
					'id'	=> '3',
					'children'	=> array(
						array(
							'text'	=>	'系列',
							'id'	=>	'3_1',
							'leaf'	=>	true
						),
						array(
							'text'	=>	'单品',
							'id'	=>	'3_2',
							'leaf'	=>	true							
						)
					)
				),
				array(
					'text'	=> '销售网络',
					'id'	=> '4',
					'leaf'	=> true
				),
				array(
					'text'	=> '联系我们',
					'id'	=> '5',
					'children'	=> array(
						array(
							'text' 	=> '招聘职位',
							'id'	=> '5_1',
							'leaf'	=> true,
						),
						array(
							'text' 	=> '求职者',
							'id'	=> '5_2',
							'leaf'	=> true,
						)		
					)
				
				),
				array(
					'text'	=> '网上商城',
					'id'	=> '6',
					'leaf'	=> true					
				),
				array(
					'text'	=> '背景',
					'id'	=> '7',
					'leaf'	=> true
				)		
			);
		}
		header('Content-type: application/json');
		echo json_encode($menu);
	}
}
?>