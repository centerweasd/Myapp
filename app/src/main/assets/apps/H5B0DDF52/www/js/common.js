//var site_app = 'http://app.xmbytv.cn';
//var site_app = 'http://aiqu.f3322.net:99';
var site_app = 'http://ecs.711wan.com';
//var site_app = 'http://huanka.sdshengyixing.com';
/*判断输入是否为合法的手机号码*/
function isphone(inputString) {
	var partten = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
	var fl = false;
	if(partten.test(inputString)) {
		//alert('是手机号码');
		return true;
	} else {
		return false;
		//alert('不是手机号码');
	}
}

function getToken(){
	var token =  localStorage.getItem("token");//获取
	if(!token){ 
		mui.openWindow({
			url: "../login/login.html",
			id: "login",
			styles: {},
			extras: {},
			show: {
				autoShow: true //页面loaded事件发生后自动显示，默认为true
			},
			waiting: {
				autoShow: false, //自动显示等待框，默认为true
				title: '安全检测中，请等待' //等待对话框上显示的提示内容
			}
		})
	}
	return token;
}

Storage.prototype.setExpire = (key, value, expire) => {
    let obj = {
        data: value,
        time: Date.now(),
        expire: expire
    };
    //localStorage 设置的值不能为对象,转为json字符串
    localStorage.setItem(key, JSON.stringify(obj));
};

Storage.prototype.getExpire = key => {
    let val = localStorage.getItem(key);
    if (!val) {
        return val;
    }
    val = JSON.parse(val);
    if (Date.now() - val.time > val.expire) {
        localStorage.removeItem(key);
        return null;
    }
    return val.data;
};
