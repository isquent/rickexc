(function($){
	$(document)
		.bind("contextmenu", function(event) {
		return false;
	});
	$(function(){		
		var timer;
		var width = $(window).width();
		
		var brand_count = Math.floor((width - 80) / 190);
		$(".brand_nav .items").attr("data-shownum",brand_count).parent().css("width",190*brand_count);
		$(".brand_nav .gallery").css("width",190*brand_count+50);
		var fnav_count = Math.floor((width - 310 - 80) / 190);
		$(".fnav .items").attr("data-shownum",fnav_count).parent().css("width",190*fnav_count);		
		
		$(".menu >li").hover(function(){
			$(this).addClass("active");
			$(this).children(".submenu").stop().css("opacity","0.95").slideDown(100);
		},function(){
			$(this).removeClass("active").children(".submenu").stop().slideUp(200);
		});
		
		/*
		$(".menu >li").click(function(){
			$(this).siblings(".active").removeClass("active").children(".submenu").slideUp(200);
			$(this).addClass("active");
			$(this).children(".submenu").css("opacity","0.95").slideDown(100);
		});
		*/
		
	    function getImageDim($img) {
	        var w_w = $(window).width(),
				w_h = $(window).height(),
				r_w = w_h / w_w,
				i_w = $img.width(),
				i_h = $img.height(),
				r_i = i_h / i_w,
				new_w, new_h,
				new_left, new_top;
	        if (r_w > r_i) {
	            new_h = w_h;
	            new_w = w_h / r_i;
	        }else {
	            new_h = w_w * r_i;
	            new_w = w_w;
	        }
	        return {
	            width: new_w + 'px',
	            height: new_h + 'px',
	            left: (w_w - new_w) / 2 + 'px',
	            top: (w_h - new_h) / 2 + 'px'
	        };
	    }		
		
		function resize($img) {
			var w_w = $(window).width(),
				w_h = $(window).height(),
				i_w = $img.width(),
				i_h = $img.height(),
				r_i = i_h / i_w,
				new_w, new_h;
			if (i_w > i_h) {
				new_w = w_w;
				new_h = w_w * r_i;
				if (new_h > w_h) {
					new_h = w_h;
					new_w = w_h / r_i;
				}
			} else {
				new_h = w_w * r_i;
				new_w = w_w;
			}
			$img.animate({
				width: new_w + 'px',
				height: new_h + 'px',
				top: '0px',
				left: '0px'
			}, 350);
		}
		
		function setInterscroll(){
			timer = setInterval(function(){
				//$(".scroll:last").click()
				$(".page").attr('data-type','timer');
				if($(".page span.active").next().length)
					$(".page span.active").next().click();				
				else
					$(".page span").first().click();
				$(".page").attr('data-type','');					
			},5000);			
		}
		
		if($(".scroll").length){
			setInterscroll();
			/*
            $(document).mousewheel(function (e, delta) {
				var index = parseInt($(".page span.active").attr("data-index"));
				var dom = $(".bgcontainer img").eq(index);				
                if (dom.is(':animated'))
                    return false;
					console.log(e);
                if (delta < 0)
                    $(".scroll:first").click()
                else
                    $(".scroll:last").click()
                return false;
            });
			*/
            $(document).keydown(function (e) {
				var index = parseInt($(".page span.active").attr("data-index"));
				var dom = $(".bgcontainer img").eq(index);				
                if (dom.is(':animated'))
                    return false;

                switch (e.which) {
                    case 37:  //38 up  37 left
                        $(".scroll:first").click()
                        break;

                    case 39:  //40 down  39 right
                        $(".scroll:last").click()
                        break;
                }
            });			
		}		
		
		$(window).bind('resize', function() {
			if (timer) {
				clearInterval(timer);
			}
			if($(".page span.active").length){
				var index = parseInt($(".page span.active").attr("data-index"));
			}else{
				var index = 0 ;
			}	
			var dom = $(".bgcontainer img").eq(index);
			var dim = getImageDim(dom);
			dom.css({
				width: dim.width,
				height: dim.height,
				left: dim.left,
				top: dim.top
			}).fadeIn();
			setInterscroll();
		});		
		
		$(window).load(function() {
			if($(".page span.active").length){
				var index = parseInt($(".page span.active").attr("data-index"));
			}else{
				var index = 0 ;
			}			
			
			var dom = $(".bgcontainer img").eq(index);
			var dim = getImageDim(dom);
			dom.css({
				width: dim.width,
				height: dim.height,
				left: dim.left,
				top: dim.top
			}).fadeIn();
		})
		
		$(".page span").click(function(){
			if($(".page").attr('data-type') != 'timer')
				clearInterval(timer);
				var preindex = $(this).siblings(".active").attr("data-index");
			var index = parseInt($(this).attr("data-index"));
			$(this).addClass("active").siblings().removeClass("active");
			//$('.bgcontainer').animate({left: -width * index}, 'slow', function() {
			//$('.bgcontainer').animate({left: '-' + 100 * index + '%'}, 'slow', function() {
				var predom = $(".bgcontainer img").eq(preindex);
				var nextdom = $(".bgcontainer img").eq(index);
				var dim = getImageDim(nextdom);
				var left = (index>preindex) ? $(window).width() + 'px' : -parseFloat(dim.width, 10) + 'px';	
				var slideTo = (index>preindex) ? -predom.width() + 'px' : $(window).width() + 'px';			
				nextdom.css({
					width: dim.width,
					height: dim.height,
					left: left,
					top: dim.top
				}).show();				
				nextdom.animate({left: dim.left}, 1000,function(){});								
				predom.animate({left: slideTo}, 1000, function() {$(this).hide();});				
				
				if(window.items !== undefined){
					var src = $(".bgcontainer").children('.bgitem').eq(index).attr('src');
					if(window.items[src] !== undefined){
						$(".story .desc").html(window.items[src]['desc']);
						if($(".story h2").length)
							$(".story h2").text(window.items[src]['name']);
						if($(".story h1").length)
							$(".story h1").text(window.items[src]['name']);							
						if($(".page span.active").prev().length == 0){
							$(".scroll").eq(0).css("display","none");
							$(".scroll").eq(1).css("display","");							
						}else if($(".page span.active").next().length == 0){
							$(".scroll").eq(0).css("display","");
							$(".scroll").eq(1).css("display","none");
						}else{
							$(".scroll").eq(0).css("display","");
							$(".scroll").eq(1).css("display","");
						}
					}
				}
			//});
		});
		
		$(".scroll").click(function(){
			if(timer !== undefined)
				clearInterval(timer);
			var dir = $(this).attr("data-dir");
			if(dir == "left"){
				if($(".page span.active").prev().length)
					$(".page span.active").prev().click();
				else
					$(".page span").last().click();
			}else{
				if($(".page span.active").next().length)
					$(".page span.active").next().click();				
				else
					$(".page span").first().click();
			}
		})
		
		$(".vscroll").click(function(){
			var count = $(this).parent().attr("data-count");
			var current = parseInt($(this).parent().attr("data-current"));
			var dir = $(this).attr("data-dir");
			if(dir == "left"){
				if(current>0){
					$(".v_items").animate({left:'-'+(current-1)*415+'px'},'slow');
					$(this).parent().attr("data-current",current-1);
				}
			}else{
				if(count-current>2){
					$(".v_items").animate({left:'-'+(current+1)*415+'px'},'slow');
					$(this).parent().attr("data-current",current+1);
				}
			}
		})		
		
		$(".arrow a").click(function(){
			if($(this).attr("data-type") == "updown"){
				if($(this).attr("data-dir") == "up"){
					$(this).attr("data-dir","down");
					$(this).children("img").attr("src","assets/images/arrow_down.png");
					if($(this).find("span.arrow_img").length)
						$(this).find("span.arrow_img").css({'filter':'progid:DXImageTransform.Microsoft.AlphaImageLoader(src=\'assets/images/arrow_down.png\', sizingMethod=\'scale\');'});
					$(".fnav .content").slideDown();
				}else{
					$(this).attr("data-dir","up");
					$(".fnav .content").slideUp();
					$(this).children("img").attr("src","assets/images/arrow_up.png");
					if($(this).find("span.arrow_img").length)
						$(this).find("span.arrow_img").css({'filter':'progid:DXImageTransform.Microsoft.AlphaImageLoader(src=\'assets/images/arrow_up.png\', sizingMethod=\'scale\');'});					
				}
			}else{
				var parent = $(this).parents(".gallery");
				parent.find(".items").finish();
				var shownum = parent.find(".items").attr("data-shownum");
				var count = parent.find(".item").length;
				var left = parseInt(parent.find(".items").css("left"));
				var dlt = parent.find(".item").outerWidth(true);
				if($(this).attr("data-dir") == "left" && left < 0){
					parent.find(".items").animate({left:left+dlt*shownum},500);
				}else if($(this).attr("data-dir") == "right" && dlt*count + left > dlt * shownum){
					parent.find(".items").animate({left:left-dlt*shownum},500);
				}				
				/*
				var dlt = $(".fnav .item").innerWidth();
				if($(this).attr("data-dir") == "left"){
					var hiddens = $(".fnav .item:hidden");
					//$(".fnav .items").animate({left:left+dlt},500);
					if (hiddens.length > 0) {
						$(".fnav .item:visible").animate({ opacity: '0.1' }, 100, "swing", function() {hiddens.filter(":last").animate({ opacity: "show" }, 100, "swing"); }).animate({ opacity: '1' }, 100);
					}
				}else if($(this).attr("data-dir") == "right"){
					var visibles = $(".fnav .item:visible");
					//$(".fnav .items").animate({left:left-dlt},500);
			        if (visibles.length > 2) {
			            visibles.filter(":first").animate({ opacity: 'hide' }, 100, "swing", function() { });
			            //$(".fnav .item:visible").animate({ opacity: '0.1' }, 100).animate({ opacity: '1' }, 100);
			        }					
				}
				*/								
			}
		});
		
		$(".story .display").click(function(){
			var status = $(this).attr("data-status");
			if(status == "open"){
				$(this).attr("data-status","close");
				$(this).children("img").attr("src","assets/images/display_right.png");
				if($(this).find("span.arrow_img").length)
					$(this).find("span.arrow_img").css({'filter':'progid:DXImageTransform.Microsoft.AlphaImageLoader(src=\'assets/images/display_right.png\', sizingMethod=\'scale\');'});				
				$(this).parent().animate({"left":"-619px"},500);
			}else{
				$(this).attr("data-status","open");
				$(this).children("img").attr("src","assets/images/display_left.png");
				if($(this).find("span.arrow_img").length)
					$(this).find("span.arrow_img").css({'filter':'progid:DXImageTransform.Microsoft.AlphaImageLoader(src=\'assets/images/display_left.png\', sizingMethod=\'scale\');'});				
				$(this).parent().animate({"left":"0px"},500);				
			}
		})
		
		$(".gallery .item img").hover(function(){
			$(this).parents(".item").addClass("hover");
			if($(this).parents(".item").children(".desc").length){
				var pos = parseFloat($(this).parents(".items").css("left"))/190 + $(this).parents('.item').prevAll(".item").length + 1 ;
				if(pos == $(this).parents(".items").attr("data-shownum"))
					$(this).parents(".item").children(".desc").css("left","-190px");
				else
					$(this).parents(".item").children(".desc").css("left","180px");
			}
		},function(){
			$(this).parents(".item").removeClass("hover");
			//$(this).css("position","static");
		});
		
		$(".search .addr").hover(function(){
			$(this).children("ul").stop().css('display','none').slideDown();
		},function(){
			$(this).children("ul").stop().css('display','block').slideUp();
		})
		
		$(".search li").click(function(){
			var addr = $(this).attr("data-addr");
			$(this).parents(".addr").children("span").text(addr);
			//$(".search .btn").attr("data-href",$(this).children("a").attr("href"));
			$(this).parent().slideUp();
			location.href = $(this).children("a").attr("href");
		})
		
		$(".search .btn").click(function(){
			location.href = $(this).attr("data-href");
		})
		
		$(".job .tr:not(.th)").hover(function(){
			$(this).children('li').css('background-color','#000');
			$(this).children('li').css('color','#ffffff');
		},function(){
			$(this).children('li').css('background-color','');
			$(this).children('li').css('color','');
		})
		
		$(".job .tr").click(function(){
			if($(this).attr("data-href")){
				location.href = $(this).attr("data-href") ;
			}
		})
		
	
		$(".pagination a").hover(function(){
			var name = $(this).attr("data-dir");
			$(this).children("img").attr("src","assets/images/"+name+"_gray.png");
			$(this).find("span.pag_img").css({'filter':'progid:DXImageTransform.Microsoft.AlphaImageLoader(src=\'assets/images/'+name+'_gray.png\', sizingMethod=\'scale\');'})
		},function(){
			var name = $(this).attr("data-dir");
			$(this).children("img").attr("src","assets/images/"+name+".png");
			$(this).find("span.pag_img").
			css({'filter':'progid:DXImageTransform.Microsoft.AlphaImageLoader(src=\'assets/images/pre.png\', sizingMethod=\'scale\');'})
		});
		
		$(".prelevel a").hover(function(){
			$(this).children("img").attr("src","assets/images/pre_gray.png");
			$(this).find("span.pag_img").css({'filter':'progid:DXImageTransform.Microsoft.AlphaImageLoader(src=\'assets/images/pre_gray.png\', sizingMethod=\'scale\');'})
		},function(){
			$(this).children("img").attr("src","assets/images/pre.png");
			$(this).find("span.pag_img").
			css({'filter':'progid:DXImageTransform.Microsoft.AlphaImageLoader(src=\'assets/images/pre.png\', sizingMethod=\'scale\');'})
		});		
		
		//$(".ad").fadeIn("slow");
		$(".ad .close").click(function(){$(this).parent().slideUp()});
	});
})(jQuery)