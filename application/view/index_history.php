<div class="historybox" data-count=<?php echo count($data['videos']); ?> data-current=0>
	<?php if(count($data['videos']) > 2) {?>
	<div class="scroll scroll_left vscroll" data-dir="left"><img src="assets/images/arrow_large_left.png" /></div>
	<div class="scroll scroll_right vscroll" data-dir="right"><img src="assets/images/arrow_large_right.png" /></div>
	<?php } ?>
	<div class="v_box">
		<div class="v_items clearfix">
			<?php foreach($data['videos'] as $video) { ?>
			<div class="v_item">
				<div class="v_player">
					<?php echo $video['code']; ?>				
				</div>
				<div class="v_title"><?php echo $video['title']; ?></div>
			</div>
			<?php } ?>
		</div>
	</div>
</div>
<script type="text/javascript">
	//var swf_width=385;
	//var swf_height=301;
	//var texts='首页宣传片';
	//var files='../../upload/videos/20100701170815417.flv';
	//var 	config='0:自动播放|1:连续播放|100:默认音量|0:控制栏位置|2:控制栏显示|0x000033:主体颜色|60:主体透明度|0x66ff00:光晕颜色|0xffffff:图标颜色|0xffffff:文字颜色|:logo文字|:logo地址|:结束swf地址';
	//document.write('<object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" codebase="http://fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,0,0" width="'+ swf_width +'" height="'+ swf_height +'">');
	//document.write('<param name="movie" value="images/vcastr2.swf"><param name="quality" value="high">');
	//document.write('<param name="menu" value="false"><param name=wmode value="opaque">');
	//document.write('<param name="FlashVars" value="vcastr_file='+files+'&vcastr_title='+texts+'&vcastr_config='+config+'">');		
	//document.write('<embed src="assets/images/vcastr2.swf" wmode="opaque" FlashVars="vcastr_file='+files+'&vcastr_title='+texts+'&vcastr_config='+config+'" menu="false" quality="high" width="'+ swf_width +'" height="'+ swf_height +'" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer" />'); 	document.write('</object>'); 
</script>