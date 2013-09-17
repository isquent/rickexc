<div class="aboutus jobdesc">
	<div class="title"><span class="name"><?php echo $data['detail']['name']; ?></span><span class="t2">职位的详细信息</span></div>
	<div class="content">
		<div class="table" style="width:386px;margin-right:35px">
			<ul class="tr clearfix"><li class="key">工作地点</li><li class="value"><?php echo $data['detail']['city']; ?></li></ul>
			<ul class="tr clearfix"><li class="key">薪酬待遇</li><li class="value"><?php echo $data['detail']['salary']; ?></li></ul>
			<ul class="clearfix"><li class="key">招聘单位</li><li class="value"><?php echo $data['detail']['enterprise']; ?></li></ul>					
			<ul class="clearfix"><li class="key">联系电话</li><li class="value"><?php echo $data['detail']['phone']; ?></li></ul>
			<ul class="clearfix"><li class="key">招聘人数</li><li class="value"><?php echo $data['detail']['num']; ?></li></ul>		
			<ul class="clearfix"><li class="key">有效时间</li><li class="value"><?php echo $data['detail']['date']; ?></li></ul>	
			<ul class="clearfix"><li class="key">联系人</li><li class="value"><?php echo $data['detail']['connact']; ?></li></ul>									
			<ul class="clearfix"><li class="key">电子邮箱</li><li class="value"><?php echo $data['detail']['email']; ?></li></ul>			
			<ul class="clearfix"><li class="key">详细地址</li><li class="value"><?php echo $data['detail']['address']; ?></li></ul>			
		</div>
		<div class="table" style="width:470px;">
			<ul class="clearfix"><li class="key">工作职责</li><li class="value article"><?php echo str_replace("\n",'<br />',$data['detail']['duty']); ?></li></ul>
			<ul class="clearfix"><li class="key">职位要求</li><li class="value article"><?php echo str_replace("\n",'<br />',$data['detail']['requirement']); ?></li></ul>
			<ul class="clearfix"><li class="applyvalue" style="background-color:none;width:470px"><a href="?action=aboutus_apply&id=<?php echo $data['detail']['id']; ?>" style="margin-left:80px"><img src="assets/images/apply.png" /></a></li></ul>
			
		</div>		
	</div>
</div>	