function EventEmitter(){

}
EventEmitter.prototype.on=function(type,fn){
    if(!this["emitter"+type]){
        this["emitter"+type]=[];
    }
    var a=this["emitter"+type];
    for(var i=0;i<a.length;i++){
        if(a[i]==fn)return;
    }
    a.push(fn);
}
EventEmitter.prototype.run=function(type,e){
    var a=this["emitter"+type];
    if(a)
        for(var i=0;i<a.length;i++){
            if(typeof a[i] == "function"){
                a[i].call(this,e);
            }else{
                a.splice(i,1);
                i--
            }
        }
}
EventEmitter.prototype.off=function(type,fn){
    var a=this["emitter"+type];
    if(a)
        for(var i=0;i<a.length;i++){
            if(a[i]==fn){
                a[i]=null;
                return;
            }
        }
}



function Drag(ele){//ʵ��ʶ��ͳ�ʼ��ʵ��������
    this.ele=ele;//this��ָ��ǰʵ����һ��Ҫ��ʶ��ʵ��������
    this.x=null;
    this.y=null;
    this.mx=null;
    this.my=null;
    this.DOWN=processThis(this,this.down);
    this.MOVE=processThis(this,this.move);
    this.UP=processThis(this,this.up);
    //this.DOWN��˽�еģ�this.down�ǹ����
    on(this.ele,"mousedown",this.DOWN);
    //�������ı�̵�һЩԭ�����ϵķ������thisָ��ǰʵ��

}
Drag.prototype=new EventEmitter;
Drag.prototype.down=function(e){
    this.x=this.ele.offsetLeft;
    this.y=this.ele.offsetTop;
    this.mx=e.pageX;
    this.my=e.pageY;
    if(this.ele.setCapture){
        this.ele.setCapture();
        on(this.ele,"mousemove",this.MOVE);
        on(this.ele,"mouseup",this.UP);
    }else{
        on(document,"mousemove",this.MOVE);
        on(document,"mouseup",this.UP);
    }
    e.preventDefault();
    this.run("dragStart",e);
    //��ǰ�Ǹ�������ʵ��this����Զ����¼������Ǹ�DOM��������Զ��¼����ǾͲ�������Զ����¼���DOMϵͳ�¼���ͻ������
}
Drag.prototype.move=function(e){
    this.ele.style.left=this.x+e.pageX-this.mx+"px";
    this.ele.style.top=this.y+e.pageY-this.my+"px";
    this.run("dragging",e);
}
Drag.prototype.up=function(e){
    if(this.ele.releaseCapture){
        this.ele.releaseCapture();
        off(this.ele,"mousemove",this.MOVE);
        off(this.ele,"mouseup",this.UP);
    }else{
        off(document,"mousemove",this.MOVE);
        off(document,"mouseup",this.UP);
    }

    this.run("dragEnd",e);
    //mouseup��dragEnd��û������
}
Drag.prototype.range=function(left,top,right,bottom){
    //�Զ����¼���ԭ��ģʽ����
    this.oRange={left:left,top:top,right:right,bottom:bottom}
    this.on("dragging",this.runRange);

}
Drag.prototype.runRange=function(e){
    var l=this.x+e.pageX-this.mx;
    var t=this.y+e.pageY-this.my;
    if(l>=this.oRange.right){
        this.ele.style.left=this.oRange.right+"px";
    }else if(l<=this.oRange.left){
        this.ele.style.left=this.oRange.left+"px";
    }else{
        this.ele.style.left=l+"px";
    }
    if(t>=this.oRange.bottom){
        this.ele.style.top=this.oRange.bottom+"px";
    }else if(t<=this.oRange.top){
        this.ele.style.top=this.oRange.top+"px";
    }else{
        this.ele.style.top=t+"px";
    }
}

Drag.prototype.addBorder=function(){
    this.ele.style.border="3px #fff0ac dashed";
}
Drag.prototype.removeBorder=function(){
    this.ele.style.border="";
}
Drag.prototype.border=function(){
        this.on("dragStart",this.addBorder);
        this.on("dragEnd",this.removeBorder);
    }





