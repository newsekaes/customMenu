/**
 * Created by zhanglin on 2016/12/14. depend on D3.js
 */
function CustomMenu(opt) {
    this.item = [];
    this.children = [];
    this.parent = opt.parent;
    var _this = this;
    var target;// 点击触发的目标
    this.bind = null;// 必选
    this.create = null;
    this.structure = null;
    this.target = target;
    this.append = null;
    this.hide = null;
    this.show = null;
    this.delete = null;
    this.menu = null;// 定义menu本身
    this.setData = null;
    var menu = d3.select("body").append("div").attr("class","customMenu hide");
    var ul = menu.append("ul").attr("class","menuUl");
    this.bindFunObj = {
            elem: [],
            fun: []
    };
    this.menu = menu;
    function item(data) {
        var description = data.text;// 描述
        var imgUrl = data.img;// 图像的url
        var callback = data.callback;// 点击该项的回调函数
        var children = data.children;
        var li = ul.append("li").attr("class","menuItem");// 定义li本身
        var image;
        if(imgUrl)image = li.append("img").attr("class","menuItemImg").attr("href",data.img);
        
        var text = li.append("span").attr("class","menuItemText").html(description);
        li[0][0].addEventListener('mouseover', function () {
            hideChild(_this);
        });
        if(children){
            var childCustomMenu = new CustomMenu({parent: this});
            childCustomMenu.bind(li[0][0], null);
            
            children.forEach(function(child){
                childCustomMenu.append(child);
            });
            this.children.push(childCustomMenu);
        } else{
            li[0][0].addEventListener("click",function(e){
                e.preventDefault();
                e.stopPropagation();
                _this.hide();
                hideParent(_this);
                if(typeof callback == "function")callback.call(_this);// _this 为 item
            },false);
        }
        return this
    }
    this.append = item;
    this.setData = function (data) {
        this.structure = data;
    };
    this.create = function () {
        for(var i = 0, len = this.structure.length;i < len;i++){
           var dataLi = this.structure[i];
            this.append(dataLi);
        }
    };
    this.hide = function () {
        menu.classed("hide",true);
    };
    this.show = function (x,y) {
        menu.classed("hide",false);
        if(arguments.length > 0 ){
            menu.style("left",x+"px");
            menu.style("top",y+"px");
        }
    };
    /* 提供了强大的callback回调函数 */
    this.bind = function (elem,callback) {
        this.bindFunObj.elem.push(elem);
        this.bindFunObj.fun.push(callback);
        var event = this.parent ? "mouseover" : "contextmenu";
        elem.addEventListener(event, bindFun, false);
       
    };
    this.unbind = function(elem, callback){
        var index = _this.bindFunObj.elem.indexOf(this);
        _this.bindFunObj.fun.splice(index, 1);
        var event = this.parent ? "mouseover" : "contextmenu";
        elem.removeEventListener(event, bindFun, false);
    }
    document.addEventListener("click",function (e) {
        e.stopPropagation();
        _this.hide();
    },false);
    menu[0][0].addEventListener("click",function (e) {
         e.preventDefault();
    });
    function bindFun(e) {
        e.stopPropagation();
        var index = _this.bindFunObj.elem.indexOf(this);
        var fun = _this.bindFunObj.fun[index];
        e.preventDefault();
        // console.log(e);
        if(e.type === 'contextmenu'){
            if(e.button == 2){
                d3.selectAll(".customMenu").classed("hide", true);
                _this.show(e.clientX,e.clientY);
            }
            _this.target = e.target;
        } else {//mouseover
            var rect = this.getBoundingClientRect();
            hideChild(_this.parent);
            _this.show(rect.left + rect.width, rect.top);
        }
        if(typeof fun == "function"){
            fun.call(_this);// 借用this可大肆修改封装文件的构成和信息
        }
        return false; 
    }
    function hideChild(parent) {
        parent.children.forEach(function(child){
            child.hide();
            if(child.children.length > 0){
                hideChild(child);
            }
        });
    }
    function hideParent(child) {
        child.parent.hide();
        if(child.parent.parent){hideParent(child.parent)}
    }
}