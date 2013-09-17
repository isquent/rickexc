<div class="sale_info">
	<div class="search clearfix">
		<span class="addr"><span><?php echo $data['city'] ? $data['city'] : '所有'; ?></span>
			<ul>
				<li data-addr="所有"><a href="?action=sale_network">所有</a></li>
				<?php foreach($data['cityList'] as $v) {
					echo '<li data-addr="'.$v['city'].'"><a href="?action=sale_network&city='.$v['city'].'">'.$v['city'].'</a></li>';
				 } ?>
			</ul>
		</span>
		<div class="clear"></div>
	</div>
	<div class="clear"></div>
	<div class="table">
		<ul class="theader clearfix">
			<li class="name"><span>专卖店</span></li><li class="address"><span>地址</span></li><li class="category"><span>主营产品</span></li><div class="clear"></div></ul>
			<?php foreach($data['list'] as $item) { ?>
		<ul class="tr clearfix"><li class="name"><span><?php echo $item['name']; ?> </span></li><li class="address"><span><?php echo $item['address']; ?></span></li><li class="category"><span><?php echo $item['category']; ?></span></li><div class="clear"></div></ul>
		<?php } ?>
	</div>
	<div class="pagination">
		<?php if($data['page'] >1) { ?>
		<a class="pre" href="?action=sale_network<?php echo $data['city'] ? '&city='.$data['city'] : ''; ?>&page=<?php echo $data['page']-1; ?>" data-page=1 data-dir="pre" data-totalpage=<?php echo $data['totalpage']; ?>><img src="assets/images/pre.png" class="pag_img" /></a>
		<?php } if($data['page'] < $data['totalpage']) { ?>
		<a class="next" href="?action=sale_network<?php echo $data['city'] ? '&city='.$data['city'] : ''; ?>&page=<?php echo $data['page']+1; ?>" data-dir="next"><img src="assets/images/next.png" class="pag_img" /></a>
		<?php } ?>
	</div>		
</div>