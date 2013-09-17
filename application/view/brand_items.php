<div class="story">
	<div class="desc">
		<?php echo $data['data'][$_GET['id']]['desc']; ?>
	</div>
	<h2><?php echo $data['data'][$_GET['id']]['name']; ?></h2>
	<div class="display_left display" data-status="open"><img src="assets/images/display_left.png" class="arrow_img" /></div>
</div>
<div class="prelevel"><a class="pre" href="?action=brand_family&&class=<?php echo $_GET['class']; ?>" ><img src="assets/images/pre.png" class="pag_img" /></a></div>
<script type="text/javascript">
var items = <?php echo $data['items'] ?>;
var pos = <?php echo $data['pos']; ?>;
if(pos > 0) {	 
	$(function(){
		$(".page").attr('data-type','timer');
		$(".page span").eq(pos).click();
	})
}
</script>