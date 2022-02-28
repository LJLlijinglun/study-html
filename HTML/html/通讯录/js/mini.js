//获取input的dom
let inputDom = document.getElementById('filterInput');
//给dom添加事件 鼠标键入时触发事件
inputDom.addEventListener('keyup',inputNames);
function inputNames(){
    //获取输入的value
    let filterValue = document.getElementById("filterInput").value
    let ul = document.getElementById("names");
    let li = ul.querySelectorAll('li.collection-item');//获取文档中 class="collection-item" 的所有元素:
    for (let i = 0;i<li.length;i++){
        let a = li[i].getElementsByTagName('a')[0];//添加下标为0，获取到我们需要的标签
        //检索我们输入的值是否存在，下标大于-1 为存在，存在设置样式未显示，否则隐藏
        if (a.innerHTML.indexOf(filterValue) > -1){
            li[i].style.display = ""
        }else {
            li[i].style.display = "none"
        }
    }
}

