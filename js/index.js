
// // 使用IIFE（立即执行函数），可以有效的防止变量之间的污染
// (function() {
// // 1 获取元素
// 	var $carousel = $("#carousel");
// 	var $imgs = $("#imgs ul li");
// 	var $circles = $("#circles ol li");

// 	var $maoni = $("<li class='maoni'></li>").appendTo($("#imgs ul"));

	// $(".close").click(function() {
	// 	$(this).parent(".mask").fadeout(1000);
	// })
	// $(".mask").eq(0).fadeOut(0).fadeIn(1000);
	// 点击叉号让当前对应的蒙版消失
	$(".close").click(function() {
		$(this).parent(".mask").fadeOut(1000);
	})


	// 当页面刷新的时候 ，第一个蒙版有淡入的效果
	$(".mask").eq(0).fadeOut(0).fadeIn(1000);

// 	var arr = (function() {
// 		var temp = [];
	
// 		for (var i = 0; i < 3; i++) {
// 			for (var j = 0; j < 6; j++) {
// 				temp.push($("<div></div>").css({
// 					"width": 0,
// 					"height": 0,
// 					"background": "url(images/slider-img1.jpg) " + j * -138.33 + "px " + i * - 143.66 + "px",
// 					"position": "absolute",
// 					"left": j * 138.33,
// 					"top": i * 143.66
// 				}).appendTo($maoni));
// 			}
// 		}
		
// 		return temp;
// 	})()
	
// 	var small_idx = 0;
// 	var big_idx = 0;
// 	var lock = true;
// 	var timer = setInterval(function() {
// 		small_idx++;
// 		if (small_idx > $circles.length - 1) {
// 			small_idx = 0;
// 		}
// 		change.call($circles.eq(small_idx));
// 	}, 7000);



// 	$circles.click(change);
// 	function change() {
// 		if (!lock) {
// 			return;
// 		}
// 		lock = false;
// 		small_idx = $(this).index();
// 		if (small_idx === big_idx) {
// 			lock = true;
// 			return;
// 		}
// 		$(this).addClass("cur").siblings().removeClass("cur");
// 		$(".mask").eq(big_idx).fadeOut(1000);

// 		$maoni.addClass("active");

// 		$.each(arr, function(index, value) {
// 			value.css("backgroundImage", "url(images/slider-img" + (small_idx + 1) + ".jpg)").animate({
// 				"width": 138.33,
// 				"height": 143.66
// 			}, 300 + Math.random() * 3000);
// 		})

// 		setTimeout(function() {
// 			$.each(arr, function(index, value) {
// 				value.css({
// 					width: 0,
// 					height: 0
// 				})
// 			})
// 			big_idx = small_idx;
// 			$imgs.eq(big_idx).addClass("active").siblings().removeClass("active");
// 			$(".mask").eq(big_idx).fadeOut(0).fadeIn(1000);
// 			lock = true;
// 		}, 3310)
// 	}
// })()

