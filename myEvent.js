/**
 * Created by cataway
 */

function on(ele,type,fn){ //负责“约定”，就把约定某事件的这些方法有序保存在数组里
    if(/^self/.test(type)){
        if(!ele["selfEvent"+type]){
            ele["selfEvent"+type]=[];
        }
        var a=ele["selfEvent"+type];
        for(var i=0;i< a.length;i++){
            if(a[i]==fn)return;
        }
        a.push(fn);
        return;
    }
    if(!ele["aEvent"+type]){
        ele["aEvent"+type]=[];
        //表示无论什么浏览器，都使用run方法来处理事件绑定
        if(ele.addEventListener){
            ele.addEventListener(type,run,false);
        }else{
            ele.attachEvent("on"+type,function(){run.call(ele);})
        }
    }
    var a=ele["aEvent"+type];
    //避免重复保存的一个循环判断
    for(var i=0;i< a.length;i++){
        if(a[i]==fn)return;
    }
    a.push(fn);
}
function run(e){ //当事件触发的时候，真正执行的是run方法，它负责按顺序去执行原先保存在数组里的那些方法（由on保存的）
    e=e||window.event;
    var a=this["aEvent"+ e.type];
    if(a){
        if(!e.pageX){
            e.target= e.srcElement;
            e.preventDefault=function(){e.returnValue=false;}
            e.stopPropagation=function(){e.cancelBubble=true;}
            e.pageX=(document.documentElement.scrollLeft||document.body.scrollLeft)+ e.clientX;
            e.pageY=(document.documentElement.scrollTop||document.body.scrollTop)+ e.clientY;
        }
        for(var i=0;i< a.length;i++){
            if(typeof a[i]=="function"){
                a[i].call(this,e);
            }
        }
    }
}

function selfRun(selfType,e){ //selfType是自定义的事件类型的标识符，e是系统事件对象
    var a=this["selfEvent"+selfType];
    if(a){
        for(var i=0;i< a.length;i++){
            if(typeof a[i]=="function"){
                a[i].call(this,e);
            }else{
                a.splice(i,1);
                i--;
            }
        }
    }
}

function off(ele,type,fn){
    if(/^self/.test(type)){
        var a=ele["selfEvent"+type];
        if(a){
            for(var i=0;i< a.length;i++){
                if(a[i]==fn){
                    a[i]=null;
                    return;
                }
            }
        }
    }

    var a=ele["aEvent"+type];
    if(a){
        for(var i=0;i< a.length;i++){
            if(a[i]==fn){
                a[i]=null;
                return;
            }
        }
    }
}
function processThis(obj,fn){
    return function (e) {
        fn.call(obj,e);
    }
}

