<div class="story">
	<h1> </h1>
	<div class="desc">
		
	</div>
	<div class="display_left display" data-status="open"><img src="assets/images/display_left.png" class="arrow_img" /></div>
</div>

<script>
	var items = <?php echo $data['items'] ?>;
	for(var k in items){
		$(".story h1").text(items[k]['name']);
		$(".story .desc").text(items[k]['desc']);		
		break;
	}
</script>
