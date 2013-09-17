<!doctype html5>
<html>
<head>
<meta charset='utf-8'>
<title>依丽兰</title>
<link rel="stylesheet" href="assets/css/base.css" type="text/css" />
<script src="assets/js/jquery.js"></script>
<script src="assets/js/jquery.mousewheel.min.js"></script>
<script src="http://code.jquery.com/jquery-migrate-1.1.1.js"></script>
<script src="assets/js/common.js"></script>
<!--[if lt IE 9]>
<script src="assets/js/html5shiv.js"></script>
<script src="assets/js/jquery.pngFix.js"></script>
<script type="text/javascript"> 
    $(document).ready(function(){
        $(".header").pngFix();
        $(".arrow").pngFix();
		if($(".scroll").length) 
			$(".scroll").pngFix();
		if($(".story").length)
			$(".story").pngFix();
		if($(".honorbox").length)
			$(".honorbox").pngFix();
		if($(".culturebox").length)
			$(".culturebox").pngFix();
		if($(".search").length)
			$(".search").pngFix({sizingMethod:'image'});
		if($(".pagination a").length)
			$(".pagination a").pngFix();
		if($(".prelevel a").length)
			$(".prelevel a").pngFix();
		if($(".applyvalue a").length)
			$(".applyvalue a").pngFix();
		if($(".submit").length)
			$(".submit").pngFix();
		$("header").css('margin-bottom','40px');
    }); 
</script>
<![endif]-->
<style>

</style>
</head>
<body>
<header class="header">
	<a href="index.php" class="logo"></a>
<nav>
<div class=slogan></div>
</nav>
<ul class="menu clearfix">
	<li class="fli"><a class="current" href="###">关于依丽兰</a>
		<div class="submenu">
		<dl>
			<dd><a href="index.php">首页</a></dd>
			<dd><a href="?action=index_about">企业概况</a></dd>
			<dd><a href="?action=index_honor">企业荣誉</a></dd>
			<dd><a href="?action=index_culture">企业文化</a></dd>			
			<dd><a href="?action=index_history">煇煌历程</a></dd>
			<dd><a href="?action=index_story">品牌故事</a></dd>
		</dl>
		</div>
	</li>
	<li class="fli"><a href="###">品牌产品</a>
		<div class="submenu brand">
			<div style="text-align:left;padding:10px 10px 0px 10px"><a href="?action=brand_index">商品选单</a></div>
			<?php foreach($tree as $family) { ?>
		<dl><dt><?php echo $family['name']; ?></dt>
			<?php foreach($family['children'] as $item) { ?>
			<dd><a href="?action=brand_family&class=<?php echo $item['id']; ?>"><?php echo $item['name']; ?></a></dd>
			<?php } ?>
		</dl>
		<?php } ?>					
		</div>	
	</li>	
	<li class="fli"><a href="###">线上展示</a>
		<div class="submenu">
		<dl>
			<dd><a href="?action=online_index">精选组合</a></dd>
		</dl>
		</div>		
	</li>
	<li class="fli"><a href="###">销售网络</a>
		<div class="submenu" style="width: 138px;">
		<dl>
			<dd><a href="?action=sale_network">全国销售点查询</a></dd>
		</dl>
		</div>		
	</li>
	<li class="fli"><a href="###">联系我们</a>
		<div class="submenu">
		<dl>
			<dd><a href="?action=aboutus_connect">加盟依丽兰</a></dd>
			<dd><a href="?action=aboutus_job">招贤纳士</a></dd>
		</dl>
		</div>	
	</li>
	<li class="fli"><a href="http://www.enleen.com.cn">怀念旧版</a></li>
	<li class="fli"><a href="en/">-ENGLISH-</a></li><div class="clear"></div>
</ul>
</header>

<div class="bgbox"><div class="bgcontainer">
	<?php foreach($data['bgimg'] as $img) {?>
	<img class="bgitem" src="<?php echo $img; ?>" />
	<?php } ?>
</div></div>

<?php if(count($data['bgimg']) > 1) {?>
<div class="page">
	<?php for($i=0; $i<count($data['bgimg']); $i++) { ?>
	<span class="<?php if($i==0) echo 'active'; else echo ''; ?>" data-index=<?php echo $i; ?>></span>
	<?php } ?>
</div>
<?php if(count($data['bgimg']) > 1) {?>
<div class="scroll scroll_left" data-dir="left"><img src="assets/images/arrow_large_left.png" /></div>
<div class="scroll scroll_right" data-dir="right"><img src="assets/images/arrow_large_right.png" /></div>
<?php } ?>
<?php } ?>

<div class="fnav">
	<div class="arrow btnshow"><a data-dir="up" data-type="updown"><img src="assets/images/arrow_up.png" class="arrow_img" /></a></div>
	<div class="content clearfix">
		<div class="gallery clearfix">
			<div class="arrow"><a data-dir="left" data-type="leftright"><img src="assets/images/arrow_left.png" /></a></div>
			<div class="cbox">
				<div class="items clearfix" data-shownum=2>
					<?php foreach($tree as $family) { ?>
						<?php foreach($family['children'] as $item) { ?>
					<div class="item">
						<a href="?action=brand_family&&class=<?php echo $item['id']; ?>"><img src=".<?php echo $item['imgpath']; ?>" /></a>
						<div class="label"><?php echo $item['name']; ?></div>
						<div class="desc">
							<h1><?php echo $item['name']; ?></h1>
							<div><?php echo mb_substr($item['desc'],0,160,'UTF-8'); ?>...</div>
						</div>
					</div>
						<?php } ?>
					<?php } ?>
					<div class="clear"></div>		
				</div>
			</div>
			<div class="arrow"><a data-dir="right" data-type="leftright"><img src="assets/images/arrow_right.png" /></a></div>
		</div>
		<div class="desc">
			<h1>依丽兰  系列产品</h1>
			<div>依丽兰品牌著重于居室生活的品质与消费者的生活品味，设计了13个系列产品，提供多风格的产品供消费者选择，我们的设计、研发团队，不段的自我要求与创新，期望让每个使用依丽兰产品的家庭。</div>
		</div>
	</div>
</div>