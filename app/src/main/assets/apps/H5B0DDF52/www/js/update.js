var aniShow = {};
mui.plusReady(function() {
	//mui初始化
	mui.init({
		hardwareAccelerated: true
	});
	plus.navigator.setStatusBarStyle('light');
	// plus.navigator.setStatusBarBackground('#FA625F');
    plus.navigator.setStatusBarBackground('#555555');
	var launchFlag_ = plus.storage.getItem("launchFlag");
	if(launchFlag_ != "true") {
		mui.openWindow({
			url: 'html/index/banner.html',
			id: 'banner',
			show: {
				aniShow: 'fade-in',
				duration: '300'
			},
			//屏蔽转场动画的等待圈圈
			waiting: {
				autoShow: false
			}
		});
	} else {
		plus.navigator.closeSplashscreen();
		var subpages = ['html/index/home.html', 'html/find/shop_mall.html', 'html/user/share_code.html', 'html/user/user.html'];
		var subpage_style = {　　
			top: '0',
			bottom: '50px',
			hardwareAccelerated: true, //开启硬件加速
            cachemode: 'cacheElseNetwork'
		};
//		plus.nativeUI.showWaiting("安全检测中，请等待");
		var self = plus.webview.currentWebview();
		for(var i = 0; i < 1; i++) { //这里的4或者3改成1，只加载第一个页面
			var sub = plus.webview.create(subpages[i], subpages[i], subpage_style);
			if(i > 0) {
				sub.hide();
			}
			self.append(sub);
		}
		//选项卡点击事件
		var activeTab = subpages[0];　
		mui('.mui-bar-tab').on('tap', 'a', function(e) {
			var n = $(this).index();
			if(n == '0') {
				$('.a1 img').attr('src', 'img/nav_1-1.png');
				$('.a2 img').attr('src', 'img/nav_2-2.png');
				$('.a3 img').attr('src', 'img/nav_3-2.png');
				$('.a4 img').attr('src', 'img/nav_4-2.png');
			} else if(n == '1') {
				$('.a1 img').attr('src', 'img/nav_1-2.png');
				$('.a2 img').attr('src', 'img/nav_2-2.png');
				$('.a3 img').attr('src', 'img/nav_3-1.png');
				$('.a4 img').attr('src', 'img/nav_4-2.png');
			} else if(n == '2') {
				$('.a1 img').attr('src', 'img/nav_1-2.png');
				$('.a2 img').attr('src', 'img/nav_2-1.png');
				$('.a3 img').attr('src', 'img/nav_3-2.png');
				$('.a4 img').attr('src', 'img/nav_4-2.png');
			} else if(n == '3') {
				$('.a1 img').attr('src', 'img/nav_1-2.png');
				$('.a2 img').attr('src', 'img/nav_2-2.png');
				$('.a3 img').attr('src', 'img/nav_3-2.png');
				$('.a4 img').attr('src', 'img/nav_4-1.png');
			}
			var targetTab = this.getAttribute('href');
			if(targetTab == activeTab) {
				return;
			}
			//显示目标选项卡
			// plus.nativeUI.showWaiting("安全检测中，请等待");
			var self = plus.webview.currentWebview();
			var sub = plus.webview.create(targetTab, targetTab, subpage_style);
			self.append(sub);
			//隐藏当前;
			plus.webview.hide(activeTab);
			//更改当前活跃的选项卡
			activeTab = targetTab;
		});
	}
});

//禁用安卓返回键
var first;
mui.back = function() {
	//首次按键，提示‘再按一次退出应用’
	if(!first) {
		first = new Date().getTime();
		mui.toast('再按一次退出应用');
		setTimeout(function() {
			first = null;
		}, 1000);
	} else {
		if(new Date().getTime() - first < 1000) {
			plus.runtime.quit();
			localStorage.removeItem("sj");
		}
	}
};

