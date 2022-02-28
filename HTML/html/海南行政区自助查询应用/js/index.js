/*获取输入框dom节点*/
let searchDom = document.querySelector('#inputValue');
//获取接收过滤出来的数据dom节点
let contentDom = $('#content-data')[0];
//海南省简介DOM
let IntroductionDom = document.querySelector('#Introduction');
//获取state.json文件并进行过滤
const states = async stateText => {
    const data = await fetch("./data/state.json");
    const statesData = await data.json();//json的转化
    //匹配输入内容并进行过滤
    let matches = statesData.filter(state => {
        //匹配正则表达式的输入符号以及输入值，还有进行全局匹配 部分大小写
        const regex = new RegExp(`^${stateText}`, 'gi');
        //返回state的name以及它的等级level大小写
        //match方法可在字符串内检索指定的值regex，或找到一个或多个正则表达式的匹配
        return state.name.match(regex) || state.type.match(regex) || state.postalNum.match(regex) || state.carCode.match(regex);
    });
    if (stateText.length == 0) {
        matches = [];
    }
    outputHtml(matches,stateText);
}
//给outputHtml设置一个箭头函数
const outputHtml = (matches,stateText) => {
    if (matches.length > 0 && stateText.length>0) {
        const htmldata = matches.map(match =>
            `<div class="card card-body md-1" style="color: #333333;text-align: center;background: #e5e3e3;border-radius: 10px;box-shadow: 5px 5px 10px 5px ">
                <h2>${match.name}</h2>
                <h4>${match.nickname}</h4>
                <ul style="text-align: left">
                    <li>行政区类别:${match.type}</li>
                    <li>行政代码:${match.code}</li>
                    <li>下辖地区:${match.SubordinateArea}</li>
                    <li>政府驻地:${match.resident}</li>
                    <li>电话区号:${match.areaNum}</li>
                    <li>邮政区码:${match.postalNum}</li>
                    <li>车牌代码:${match.carCode}</li>
                    <li>著名景点:${match.Attractions}</li>
                    <li>火车站:${match.trainStation}</li>
                    <li>机场:${match.Airport}</li>
                </ul>
            </div>`
        ).join("");//方法用于把数组中的所有元素放入一个字符串
        contentDom.innerHTML = htmldata;
    } else if (matches.length == 0 && stateText.length>0){
        contentDom.innerHTML = `<div class="card card-body md-1" style="color: #333333;text-align: center;margin-top: 50px">
暂无查到 "${stateText}" 有关内容</div>`;
    }else{
        contentDom.innerHTML = "";
        contentDom.appendChild(IntroductionDom);//向列表中添加项目
    }
}
//给输入框添加键入事件 使用箭头函数
searchDom.addEventListener('keyup', () => states(searchDom.value));

