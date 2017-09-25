## 1. 简介
轻小的自定义右键菜单工具。

可自定义多级子菜单。
## 2. 引用方法
```
<script src='d3.js'>
<script src='customMenu.js'></script>
```
## 3. example

HTML:
```
<html>
    <head>
        <script src='customMenu.js'></script>
    </head>
    <body>
        <div id='div'></div>
    </body>
</html>
```
JavaScript:
```
var div = document.querySelector('div');
var menu = new CustomMenu();
menu.append({
    text: '一级项1',
    img: '1.jpg',
    callback () {
        /*处理函数*/
    }
});
menu.append({
    text: '二级菜单',
    img: '2.jpg',
    children: [
        {
            text: '二级项1',
            img: '',
            callback () {
                /*处理函数*/
            }
        },
        {
            text: '二级项2',
            img: '',
            callback () {
                /*处理函数*/
            }
        },
        {
            text: '三级菜单',
            img: '2.jpg',
            children: [
                {
                    text: '三级项1',
                    img: '',
                    callback () {
                        /*处理函数*/
                    }
                }
            ]
        }
    ]
})
```