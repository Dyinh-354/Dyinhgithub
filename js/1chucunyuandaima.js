// (function() {


	$(".close").click(function() {
		$(this).parent(".mask").fadeOut(1000);
		// $(".mask").fadeOut(1000);效果相同
	})
	// 当刷新图片时，使第一张蒙版淡入，要达到这个效果，要先使蒙版在刷新的一瞬间完全淡出屏幕）
	$(".mask").eq(0).fadeOut(0).fadeIn(3000);
	


	// 设置小圆点和大图片对应的点击事件
	// 获取小圆点元素，调用小圆点的点击事件
	var $circles = $("#circles ol li");
	var $carousel = $("#carousel");
	var $imgs = $("#imgs ul li")



// 先创建猫腻图容器，用于存放所有的碎图
	// var $maoni = $("<div class='maoni'></div>")appendTo($imgs)
	// 不能放在每个li标签下面，因为每次变化都是以li标签整体变化的，在li的子级就没有效果，应该将其放置在
	// 每一个li标签的后面，于是是添加到（#imgs ul）的节点的子级，
	var $maoni = $("<li class='maoni'></li>").appendTo($("#imgs ul"));
	 // 获取拼图
	 // 创建一个函数表达式，使这个函数的返回值为一个数组,将所有的拼图放在一个数组中,
	 // 现在函数内定义一个空数组temp，裁剪大图获得小图片，将这些小图片最后放在空数组中，最后返回这个数组
	 // 那么这个函数的返回值就是一个装了碎图的数组temp
	 var arr = (function() {
	 	// 定义一个数组
	 	var temp = [];
	 	// 裁剪大图
	 	for(var i = 0; i < 3; i ++) {
	 		for(var j = 0; j <6; j ++) {
	 			// console.log($("<div></div>"));
	 			// temp.push($("<div></div>").css({}).appendTo($maoni));
	 			temp.push($("<div></div>").css({
	 				"width": 0,
	 				"height": 0,
	 				"background": "url(images/slider-img1.jpg)" + " " + j * -138.33 + "px" + " " + i * -143.66 + "px",
	 				"position": "absolute",
	 				"left": j * 138.33,
	 				"top": i * 143.66
	 			}).appendTo($maoni));
	 		}
	 	}
	 	return temp;
	 })()

	// 小圆点的点击事件
	/*
	*1、令自定义变量和小圆点点击事件对应的索引值（则自定义变量（信号量）有了实际应用含义）
	*2、当小圆点点击事件发生时，即信号量的含义和值确定时，改变大图的信号量，使两者相同
	*3、令其淡出（给这个信号量对应的大图片的节点元素加上active类（就是使大图出现的代码编辑：
	*类为active的节点元素有最大的自定义压盖值，就会提升到最上面上来，
	*而移除了类名的其他兄弟节点，就不再有这样的样式表现了，并且显示也变成了none））
	*
	*高阶版本：
	小圆点点击事件触发的现象：1、当前小圆点背景变黑（加上类名）/2、蒙版消失/3、碎图出现
	*
	*
	*
	*/
	// 声明变量，代表小圆点和大图片的索引值，这样的变量实为信号量（定义信号量）
	var small_idx = 0;
	var big_idx = 0;

	// 要使一个点击事件发生时，没有其他事件发生和干扰，定义锁，使之后的点击事件在这个事件完成之前不会执行
	// 而当前点击事件结束后，要使之后的点击事件能继续执行，也就是是说要开锁，因此要设置一个延时器将开锁语句放在延时器中

	// 定义锁
	var lock = true;



	// 根据demo需求，设置一个定时器，给整个点击事件
	var timer = setInterval(function() {
		// 定时器的轮换根据小圆点点击事件的时间变化而变换
		small_idx++;
		// 边界判断
		if(small_idx > $circles.length - 1) {
			small_idx = 0;
		}
		// 执行change方法
		change.call($circles.eq(small_idx));
	}, 7000);




	// 调用小圆点点击事件，设置回调函数名为change
	$circles.click(change);
	// 定义change函数，用于小圆点事件
	function change() {
		// 先节流：在第一次点击事件开始设置函数节流
		if(!lock) {
			return;
		}
		// 当函数第一次执行时，关闭锁（节流）
		lock = false;
		
		// 改变小圆点的信号量（获取触发事件的序号）
		// 需要调用index()方法函数的返回值，而不是使用这个函数做参数所以语法为$.index();
		// 使自定义变量（信号量）small_index与事件对应的索引值对应
		small_idx = $(this).index();
		// 这句语句需放在判断语句之前？

		// 当小圆点的信号量和大图的信号量一样时，不让任何大图和小图有关的事件发生
		//不就锁死了？为了不锁死，就在锁死之前开锁，开锁之后，点击事件依然有效
		if(small_idx === big_idx) {
			lock = true;
			return;
		}
		

		// 对应信号量的小圆点的元素加上cur：改变其背景图标
		$(this).addClass("cur").siblings().removeClass("cur");
		console.log(this);
		// 蒙版图要消失
		$(".mask").eq(big_idx).fadeOut(1000);

		// 碎图（猫腻图）出现：猫腻图要和其他大图出现时一样形成压盖效果
		// 已经将猫腻图添加到ul的子级中，li标签的后面，所以可直接使用.active的样式（继承其压盖效果）
		$maoni.addClass("active");
		// 当前li标签的active不取消吗？不取消，需求没说奥取消，就不取消，用覆盖和压盖的效果，达到目的

		// 点击新的小圆点时，要让小圆点对应的碎图出现，轮换图片,(对应的碎图)
		$.each(arr, function(index, value) {

			value.css("backgroundImage", "url(images/slider-img" + (small_idx + 1) + ".jpg)").animate({
				"width": 138.33,
				"height": 143.66
			}, 300 + Math.random() * 3000);
		})

		// 碎图出现完毕，要让真图出现
		// 为了确保每一个动画完成，开启一个延时器，延时器的时间最短为3300，延时结束后，开锁，使下一次点击能顺利进行
		setTimeout(function() {
			// 真图出现，使搜优碎图的容器宽高变零，则碎图不可见了，第一张大图出现
			$.each(arr, function(index, value) {
				value.css({
					"width": 0,
					"height": 0
				})
			})
		

		// 我们要的不是第一张大图，而是与之对应的那张真的大图，使大图的信号量和当前小圆点的信号量相等
		big_idx = small_idx;
		// 从所有的li节点中调用eq()方法找到在兄弟元素的对应索引值排名的节点元素
		// big_idx就是对应索引值、信号量、排名
		// 给目标节点元素加上类名，同时找到它的其他全部兄弟元素（sibilings()方法），给他们移除类名（removeClass（）方法）
		$imgs.eq(big_idx).addClass("active").siblings().removeClass("active");
		// 对应的大图的蒙版淡入(先立即淡出再慢慢淡入)
		$(".mask").eq(big_idx).fadeOut(0).fadeIn(2000);

		// 这些都是发生在锁了之后设定的延时时间内发生的

		// 当所有的时间完成后,解锁
		lock = true;

		}, 3310)


	}







	




// })()


	
















// })