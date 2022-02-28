//获取输入dom节点
let inputDom = document.getElementById('inputValue');
//添加输入事件函数inputFunction
inputDom.addEventListener('input',inputFunction);
function inputFunction(e){
    //获取输入的值
    let inputValue = e.target.value;
    //获取目标元素 innerHTML插入目标元素的内容
    document.getElementById('kgOutput').innerHTML = inputValue * 0.5;
    document.getElementById('lbOutput').innerHTML = inputValue * 0.5 * 2.20462262185;
    document.getElementById('ounceOutput').innerHTML = inputValue * 0.5 * 35.2739619496;
    console.log(inputValue)
}
