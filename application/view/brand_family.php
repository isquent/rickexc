<div class="info">
	<div class="family"><?php echo $data['class']['family']; ?></div>
	<div class="name"><?php echo $data['class']['class']['name']; ?></div>
	<div class="desc">
		<?php echo str_replace("\n",'<br />',$data['class']['class']['desc']); ?>
	</div>
</div>

<div class="brand_nav">
	<div class="content clearfix">
		<div class="gallery clearfix">
			<div class="arrow"><a data-dir="left" data-type="leftright"><img src="assets/images/arrow_left.png" /></a></div>
			<div class="cbox">
				<div class="items clearfix" data-shownum=5>
					<?php foreach($data['items'] as $item) {?>
					<div class="item">
						<a href="?action=brand_items&class=<?php echo $_GET['class']; ?>&id=<?php echo $item['id']; ?>"><img src=".<?php echo $item['imgpath']; ?>" /></a>
						<div class="label"><?php echo $item['name']; ?></div>
					</div>
					<?php } ?>
				</div>
			</div>
			<div class="arrow"><a data-dir="right" data-type="leftright"><img src="assets/images/arrow_right.png" /></a></div>
			<div class="clear"></div>
		</div>
	</div>	
</div>

<div class="prelevel"><a class="pre" href="?action=brand_index" ><img src="assets/images/pre.png" class="pag_img" /></a></div>