<?php if($data['adurl']) { ?>
<div class="ad">
	<a href="<?php echo $data['adurl']; ?>" target="_blank"><img src="upload/bgimgs/ad.png" /></a>
	<a class="close">×</a>
</div>
<?php } ?>
<script type="text/javascript" charset="utf-8">
$(function(){
	$(".arrow a[data-type='updown']").click();
	setTimeout(function(){
		$(".arrow a[data-type='updown']").click();
	},3000);
})
</script>