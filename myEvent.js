/**
 * Created by cataway on 2015/9/9.
 */

function on(ele,type,fn){
    //�Զ����¼�
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
    //ϵͳ�¼�
    if(!ele["aEvent"+type]){
        ele["aEvent"+type]=[];
        if(ele.addEventListener){
            ele.addEventListener(type,run,false);
        }else{
            ele.attachEvent("on"+type,function(){run.call(ele);})
        }
    }
    var a=ele["aEvent"+type];
    for(var i=0;i< a.length;i++){
        if(a[i]==fn)return;
    }
    a.push(fn);
}
function run(e){
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

function selfRun(selfType,e){//selfType���Զ����¼����ͱ�ʶ��
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

