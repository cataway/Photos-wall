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



function Drag(ele){ //实例识别和初始化实例的作用
    this.ele=ele; //this是指当前实例
    this.x=null;
    this.y=null;
    this.mx=null;
    this.my=null;
    this.DOWN=processThis(this,this.down);
    this.MOVE=processThis(this,this.move);
    this.UP=processThis(this,this.up);
    //this.DOWN是私有的，this.down是共享的
    on(this.ele,"mousedown",this.DOWN);
    //面向对象的编程的一些原则：类上的方法里的this指向当前实例

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
    //当前是给这个类的实例this添加自定义事件，而非给DOM对象添加自定事件。那就不会存在自定义事件和DOM系统事件冲突的问题
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
}
Drag.prototype.range=function(left,top,right,bottom){
    //自定义事件和原型模式相结合
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





