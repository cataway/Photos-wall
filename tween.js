var zhufengEffect = {
	//当前时间*变化量/持续时间+初始值
	zfLinear: function(t,b,c,d){ return c*t/d + b; },
	Quad: {//二次方的缓动（t^2）；
		easeIn: function(t,b,c,d){
			return c*(t/=d)*t + b;
		},
		easeOut: function(t,b,c,d){
			return -c *(t/=d)*(t-2) + b;
		},
		easeInOut: function(t,b,c,d){
			if ((t/=d/2) < 1) return c/2*t*t + b;
			return -c/2 * ((--t)*(t-2) - 1) + b;
		}
	},
	Cubic: {//三次方的缓动（t^3）
		easeIn: function(t,b,c,d){
			return c*(t/=d)*t*t + b;
		},
		easeOut: function(t,b,c,d){
			return c*((t=t/d-1)*t*t + 1) + b;
		},
		easeInOut: function(t,b,c,d){
			if ((t/=d/2) < 1) return c/2*t*t*t + b;
			return c/2*((t-=2)*t*t + 2) + b;
		}
	},
	Quart: {//四次方的缓动（t^4）；
		easeIn: function(t,b,c,d){
			return c*(t/=d)*t*t*t + b;
		},
		easeOut: function(t,b,c,d){
			return -c * ((t=t/d-1)*t*t*t - 1) + b;
		},
		easeInOut: function(t,b,c,d){
			if ((t/=d/2) < 1) return c/2*t*t*t*t + b;
			return -c/2 * ((t-=2)*t*t*t - 2) + b;
		}
	},
	Quint: {//5次方的缓动（t^5）；
		easeIn: function(t,b,c,d){
			return c*(t/=d)*t*t*t*t + b;
		},
		easeOut: function(t,b,c,d){
			return c*((t=t/d-1)*t*t*t*t + 1) + b;
		},
		easeInOut: function(t,b,c,d){
			if ((t/=d/2) < 1) return c/2*t*t*t*t*t + b;
			return c/2*((t-=2)*t*t*t*t + 2) + b;
		}
	},
	Sine: {//正弦曲线的缓动（sin(t)）
		easeIn: function(t,b,c,d){
			return -c * Math.cos(t/d * (Math.PI/2)) + c + b;
		},
		easeOut: function(t,b,c,d){
			return c * Math.sin(t/d * (Math.PI/2)) + b;
		},
		easeInOut: function(t,b,c,d){
			return -c/2 * (Math.cos(Math.PI*t/d) - 1) + b;
		}
	},
	Expo: {//指数曲线的缓动（2^t）；
		easeIn: function(t,b,c,d){
			return (t==0) ? b : c * Math.pow(2, 10 * (t/d - 1)) + b;
		},
		easeOut: function(t,b,c,d){
			return (t==d) ? b+c : c * (-Math.pow(2, -10 * t/d) + 1) + b;
		},
		easeInOut: function(t,b,c,d){
			if (t==0) return b;
			if (t==d) return b+c;
			if ((t/=d/2) < 1) return c/2 * Math.pow(2, 10 * (t - 1)) + b;
			return c/2 * (-Math.pow(2, -10 * --t) + 2) + b;
		}
	},
	Circ: {//圆形曲线的缓动（sqrt(1-t^2)）；
		easeIn: function(t,b,c,d){
			return -c * (Math.sqrt(1 - (t/=d)*t) - 1) + b;
		},
		easeOut: function(t,b,c,d){
			return c * Math.sqrt(1 - (t=t/d-1)*t) + b;
		},
		easeInOut: function(t,b,c,d){
			if ((t/=d/2) < 1) return -c/2 * (Math.sqrt(1 - t*t) - 1) + b;
			return c/2 * (Math.sqrt(1 - (t-=2)*t) + 1) + b;
		}
	},
	Elastic: {//指数衰减的正弦曲线缓动；
		easeIn: function(t,b,c,d,a,p){
			if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
			if (!a || a < Math.abs(c)) { a=c; var s=p/4; }
			else var s = p/(2*Math.PI) * Math.asin (c/a);
			return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
		},
		easeOut: function(t,b,c,d,a,p){
			if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
			if (!a || a < Math.abs(c)) { a=c; var s=p/4; }
			else var s = p/(2*Math.PI) * Math.asin (c/a);
			return (a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b);
		},
		easeInOut: function(t,b,c,d,a,p){
			if (t==0) return b;  if ((t/=d/2)==2) return b+c;  if (!p) p=d*(.3*1.5);
			if (!a || a < Math.abs(c)) { a=c; var s=p/4; }
			else var s = p/(2*Math.PI) * Math.asin (c/a);
			if (t < 1) return -.5*(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
			return a*Math.pow(2,-10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )*.5 + c + b;
		}
	},
	
	Back: {//超过范围的三次方缓动（(s+1)*t^3 - s*t^2）；
		easeIn: function(t,b,c,d,s){
			if (s == undefined) s = 1.70158;
			return c*(t/=d)*t*((s+1)*t - s) + b;
		},
		easeOut: function(t,b,c,d,s){
			if (s == undefined) s = 1.70158;
			return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
		},
		easeInOut: function(t,b,c,d,s){
			if (s == undefined) s = 1.70158; 
			if ((t/=d/2) < 1) return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
			return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
		}
	},
	zfBounce: {//指数衰减的反弹缓动。
		easeIn: function(t,b,c,d){
			return c - zhufengEffect.zfBounce.easeOut(d-t, 0, c, d) + b;
		},
		easeOut: function(t,b,c,d){
			if ((t/=d) < (1/2.75)) {
				return c*(7.5625*t*t) + b;
			} else if (t < (2/2.75)) {
				return c*(7.5625*(t-=(1.5/2.75))*t + .75) + b;
			} else if (t < (2.5/2.75)) {
				return c*(7.5625*(t-=(2.25/2.75))*t + .9375) + b;
			} else {
				return c*(7.5625*(t-=(2.625/2.75))*t + .984375) + b;
			}
		},
		easeInOut: function(t,b,c,d){
			if (t < d/2) return zhufengEffect.zfBounce.easeIn(t*2, 0, c, d) * .5 + b;
			else return zhufengEffect.zfBounce.easeOut(t*2-d, 0, c, d) * .5 + c*.5 + b;
		}
	}
}


function getCss(ele,attr){
	if(window.getComputedStyle){
		return parseFloat(getComputedStyle(ele,null)[attr]);
	}else{
		if(attr=="opacity"){
			var val=ele.currentStyle.filter;
			var reg=/alpha\(opacity=(\d+(\.\d+)?)\)/;
			if(reg.test(val)){				
				return RegExp.$1/100;//为了和标准浏览器采用相同的原则：0-1之间的一个浮点数
			}else{
				return 1;	
			}
		}else{
			return parseFloat(ele.currentStyle[attr]);
		}
	}
	
}
function setCss(ele,attr,val){
	switch(attr){
		case "width":
		case "height":
		case "top":
		case "left":
			ele.style[attr]=val+"px";
			break;
		case "float":
			//ele.style.float=val;
			ele.style.cssFloat=val;//标准浏览器的
			ele.style.styleFloat=val;
			break;
		case "opacity":
			ele.style.opacity=val;
			ele.style.filter="alpha(opacity="+val*100+ ")";
			break;
		default:
			ele.style[attr]=val;	
	}
	
}
//animaite(ele,obj,1000,fn);

function animate(ele,oTarget,duration,effect,fnCallback){
	//最后两个参数是可选的
	//如果第四个参数是function，则表示effect不表示是动画类型，而是回调方法
	//effect可以是数字，分别从0到4五种动画类型
	//0：减速，1：直线匀速，2:back,3:flex-Elastic,4:bounce
	var fnEffect=zhufengEffect.Expo.easeOut;//指明默认的动画类型是减速类型
/*	animate(ele,{left:600},1500,['Back','easeInOut'],callback)
	effect=['Back','easeInOut']
	effect[0];
	effect[1];
	zhufengEffect[effect[0]][effect[1]]
	zhufengEffect["Back"]["easeInOut"];
	zhufengEffect.Back.easeInOut*/
	if(typeof effect =="number"){
		switch(effect){
			case 0:
				break;
			case 1:
				fnEffect=zhufengEffect.zfLinear;
				break;
			case 2:
				fnEffect=zhufengEffect.Back.easeOut;
				break;
			case 3:
				fnEffect=zhufengEffect.Elastic.easeOut;
				break;
			case 4:
				fnEffect=zhufengEffect.zfBounce.easeOut;	
		}
	}else if(effect instanceof Array){
		if(effect.length==2)
			fnEffect=zhufengEffect[effect[0]][effect[1]];
		else if(effect.length===1){
			//fnEffect=zhufengEffect[effect[0]];	
		}
	}else if(typeof effect == "function"){
			fnCallback=effect;//如果第四个参数是个function,则把这个function当回调函数执行。
	}
	clearInterval(ele.timer);
	ele.timer=null;
	var oBegin={}
	var oChange={};
	
	var flag=0;//记数器，记录有效运动的方向有几个
	
	for(var attr in oTarget){
		var begin=getCss(ele,attr);//ele.offsetLeft;		
		var change=oTarget[attr]-begin;
		if(change){//如果运动的距离不为0，才保存它们（只保存有效值）
			oBegin[attr]=begin;
			oChange[attr]=change;
			flag++;//每增加一次有效方向，flag就累加一次
		}
	}
	
	if(flag===0)return;//如果没有有效运动的方向，则直接退出动画
	var times=0;
	var interval=15;	
	function step(){
		times+=interval;
		if(times<duration){
			for(var attr in oChange){
				var change=oChange[attr];
				var begin=oBegin[attr]
				//var val=times/duration*change+begin;
				//var val=zhufengEffect.Elastic.easeOut(times,begin,change,duration);
				var val=fnEffect(times,begin,change,duration);
				setCss(ele,attr,val);
			}
		}else{
			for(var attr in oTarget){
				var target =oTarget[attr];
				setCss(ele,attr,target);
			}
			window.clearInterval(ele.timer);
			ele.timer=null;//把保存定时器队列号的属性清空，表示动画已经停止
			if(typeof fnCallback=="function")fnCallback.call(ele);
		}
	}
	ele.timer=window.setInterval(step,interval);

}