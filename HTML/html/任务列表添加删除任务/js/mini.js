//获取dom节点
let inputDom = document.getElementById('inputvalue');//添加任务输入节点
let submitButton = document.getElementById('submit');//提交节点
let filterDom = document.querySelector('#filterInput');//过滤输入节点
let taskList = document.querySelector('.collection');//无序ul节点
let clearDom = document.querySelector('.clear-tasks');//删除节点
//submitButton向文档添加事件三个参数
// 1、event(必需。描述事件名称的字符串)
// 2、function(必需。描述了事件触发后执行的函数)
// 3、useCapture(可选。布尔值，指定事件是否 在捕获或冒泡阶段执行。)
//加载所有事件监听
loadEventListenner();

function loadEventListenner() {
    //DOMContentLoaded为dom内容加载完毕执行
    document.addEventListener('DOMContentLoaded', getTasks);
    submitButton.addEventListener('click', addTask);
    taskList.addEventListener('click', deletTtask);
    clearDom.addEventListener('click', clearAll);
    filterDom.addEventListener('keyup', filterValue);
};

//获取本地存储任务
function getTasks() {
    let tasks;
    //获取添加的所有任务值
    if (localStorage.getItem('tasks') == null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'))
    }
    //渲染本地存储
    for (let e = 0; e < tasks.length; e++) {
        //创建li标签
        const li = document.createElement('li');
        //    添加li类名
        li.className = "collection-item";
        //    创建文本节点，插入li中
        //创一个a标签
        const i = document.createElement('i');
        i.className = "collection-value"
        i.innerHTML = tasks[e];
        li.appendChild(i);
        //    创建a标签
        const link = document.createElement('a');
        //    添加a标签的类名
        link.className = 'delete-item secondary-content';
        //    添加字体图标
        link.innerHTML = '<i class="fa fa-items" id="delete">删除</i>'
        //    将a标签插入li中
        li.appendChild(link);
        //    将li插入ul中
        taskList.appendChild(li);
    }
}

//    添加任务事件
function addTask(e) {
    if (inputDom.value === "") {
        alert("请添加任务内容！")
    } else {
        //创建li标签
        const li = document.createElement('li');
        //    添加li类名
        li.className = "collection-item";
        //    创建文本节点，插入li中
        //创一个a标签
        const i = document.createElement('i');
        i.className = "collection-value"
        i.innerHTML = inputDom.value;
        li.appendChild(i);
        //    创建a标签
        const link = document.createElement('a');
        //    添加a标签的类名
        link.className = 'delete-item secondary-content';
        //    添加字体图标
        link.innerHTML = '<i class="fa fa-items" id="delete">删除</i>'
        //    将a标签插入li中
        li.appendChild(link);
        //    将li插入ul中
        taskList.appendChild(li);
        //    将添加的任务值进行本地存储
        storageLoadTasksData(inputDom.value);
        //    清除inputvalue
        inputDom.value = "";
    }
    e.preventDefault()
}

function deletTtask(e) {
    //判断li标签父元素a是否存在类名delete-item
    if (e.target.parentElement.classList.contains('delete-item')) {
        //添加移除方法
        if (confirm('你确定删除吗？')) e.target.parentElement.parentElement.remove();
    }
    //删除本地任务数据
    deleteLoadData(e.target.parentElement.parentElement);
}

//设置删除本地任务
function deleteLoadData(val) {
    let deletevalue = val.querySelector('.collection-value').textContent;
    let tasks;
    //获取添加的所有任务值
    if (localStorage.getItem('tasks') == null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'))
    }
    tasks.forEach(function (task, index){
        if (deletevalue == task){
            tasks.splice(index,1);//从e位置开始删除1个元素
        }
    });
    localStorage.setItem('tasks',JSON.stringify(tasks))
}

//清除所有
function clearAll(e) {
    if (document.querySelectorAll('.collection-item').length > 0) {
        let dd = document.querySelector('.collection');
        dd.innerHTML = "";
    } else {
        alert('暂时无数据')
    }
    //清除所有本地任务
    let tasks = [];
    localStorage.setItem('tasks',JSON.stringify(tasks))
}

//模糊搜索
function filterValue(e) {
    console.log(e)
    let listitem = document.querySelectorAll('li.collection-item');
    let listvalue = document.querySelectorAll('i.collection-value');
    for (let a = 0; a < listitem.length; a++) {
        for (let i = 0; i < listvalue.length; i++) {
            if (a == i) {
                if (listvalue[i].innerHTML.indexOf(filterDom.value) > -1) {
                    listitem[a].style.display = ""
                } else {
                    listitem[a].style.display = "none"
                }
            }

        }
    }

}

//localstorage本地存储
function storageLoadTasksData(task) {
    let tasks;
    //获取添加的所有任务值
    if (localStorage.getItem('tasks') == null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'))
    }
    //把所有添加的任务值push到数组里面
    tasks.push(task);
//    存储到localstorage
    localStorage.setItem('tasks', JSON.stringify(tasks));

}
