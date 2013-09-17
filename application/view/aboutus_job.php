<div class="aboutus job">
	<h1>招贤纳士</h1>
	<div class="table">
		<ul class="tr th clearfix">
			<li class="post"><span>职位名称</span></li><li class="unit"><span>招聘单位</span></li><li class="addr"><span>工作地点</span></li><li class="num"><span>招聘人数</span></li><li class="update"><span>更新时间</span></li>
		</ul>		
		<?php foreach($data['list'] as $v) { ?>
		<ul class="tr clearfix" data-href="?action=aboutus_jobdesc&id=<?php echo $v['id']; ?>">
			<li class="post"><span><?php echo $v['name']; ?></span></li><li class="unit"><span><?php echo $v['enterprise']; ?></span></li><li class="addr"><span><?php echo $v['city']; ?></span></li><li class="num"><span><?php echo $v['num']; ?></span></li><li class="update"><span><?php echo $v['date']; ?></span></li>
		</ul>		
		<?php } ?>
		</ul>		
	</div>
	<div class="pagination">
		<?php if($data['page'] >1) { ?>
		<a class="pre" href="?action=aboutus_job&page=<?php echo $data['page']-1; ?>" data-page=1 data-dir="pre" data-totalpage=<?php echo $data['totalpage']; ?>><img src="assets/images/pre.png" class="pag_img" /></a>
		<?php } if($data['page'] < $data['totalpage']) { ?>
		<a class="next" href="?action=aboutus_job&page=<?php echo $data['page']+1; ?>" data-dir="next"><img src="assets/images/next.png" class="pag_img" /></a>
		<?php } ?>
	</div>		
</div>	