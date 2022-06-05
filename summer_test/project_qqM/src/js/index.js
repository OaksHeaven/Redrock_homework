//动态生成滑动块元素
writeMod = function (dataItem, docItem) {
    //首先重置该节点内容
    docItem.innerHTML = '';

    //在该节点下循环创建内容
    for (let i = 0; i < dataItem.length; i++) {
        docItem.innerHTML +=
            `<li>
            <div class="sliding_list_box">
                <div class="sliding_list_box_img">
                    <img src="${dataItem[i].cover}" alt="">
                    <div class="playlist_views">
                        <i class="iconfont icon-24gf-play"></i>
                        <span>${dataItem[i].views}</span>
                    </div>
                </div>
                <div class="sliding_list_box_info">
                    <p>${dataItem[i].title}</p>
                </div>
            </div>
        </li>`
    }
}

//“专区”板块不一样，动态生成“专区”
writeColumn = function (dataItem, docItem) {
    for (let i = 0; i < dataItem.length; i++) {
        docItem.innerHTML +=
            `<li>
            <div class="sliding_list_box">
                <div class="sliding_list_box_img">
                    <img src="${dataItem[i].background}" alt="">
                </div>
                <div class="sliding_list_box_info">
                    <p>${dataItem[i].title}</p>
                </div>
            </div>
        </li>`
    }
}

//添加触屏滑动X
slidingMoveX = function (Doct) {
    let startX = 0;
    let X = 0;
    Doct.addEventListener('touchstart', (e) => {
        startX = e.targetTouches[0].pageX;
        X = Doct.offsetLeft;
    })
    Doct.addEventListener('touchmove', (e) => {
        //得到手指移动距离
        let moveX = e.targetTouches[0].pageX - startX;

        // 计算可移动位置的大小， 保证元素不会超过可移动范围
        // 父元素的宽度减去子元素宽度
        let width = document.querySelector('.mod_scroll_box').clientWidth - Doct.clientWidth;
        //元素的真实左偏移量
        let trueX = moveX + X;

        // min方法让偏移不能大于0 max让偏移不能小于 “父元素欠子元素的宽度”
        trueX = Math.max(Math.min(0, trueX), width)

        //更新位置 移动滑块
        Doct.style.left = trueX + 'px';
        //阻止屏幕移动
        e.preventDefault();
    })
}

//设置默认请求地址
axios.defaults.baseURL = "http://124.221.249.219:8000/api"

//获取"推荐歌单" 立即执行
function getTuijian() {
    axios.get('/recommendations')
        .then(res => {
            let data = res.data;
            let sliding = document.querySelectorAll('.mod_scroll_sliding');
            writeMod(data.offical, sliding[0]);
            writeMod(data.tatsujin, sliding[1]);
            writeColumn(data.column, sliding[2]);
        }).then(res => {
            //获取mod滑块
            let scrollBoxes = document.querySelectorAll('.mod_scroll_sliding');
            for (let i = 0; i < scrollBoxes.length; i++) {
                slidingMoveX(scrollBoxes[i]);
            }
        })
}
getTuijian();

//获取“排行”和“推荐”标签
let tuijian = document.querySelector('.tuijian');
let paihang = document.querySelector('.paihang');
let tuijianBox = document.querySelector('.tuijian_box');
let paihangBox = document.querySelector('.paihang_box');

//推荐页、排行页相互切换
paihang.addEventListener('click', () => {
    tuijianBox.style.display = "none";
    tuijian.className = "tuijian";

    paihangBox.style.display = "block";
    paihang.className = "paihang head_tap_clicked";
})
tuijian.addEventListener('click', () => {
    tuijianBox.style.display = "block";
    tuijian.className = "tuijian head_tap_clicked";

    paihangBox.style.display = "none";
    paihang.className = "paihang";

    //触发“取消搜索”以返回初始主页“推荐页”
    searchCancel.click();
})

//点击后，申请“推荐页”内容
tuijian.addEventListener('click', function () {
    getTuijian();
})

//点击后，申请“排行页”内容
paihang.addEventListener('click', function () {
    //axios获取"排行榜"
    axios.get('/ranking')
        .then(res => {
            let data = res.data;
            //获取“排行榜列表”节点
            let rankUl = document.querySelector('.paihang_ul');
            //先重置该节点
            rankUl.innerHTML = '';

            //循环生成
            for (let i = 0; i < data.length; i++) {
                rankUl.innerHTML +=
                    `<li class="paihang_list">
                    <div class="paihang_list_info">
                        <p>${data[i].title}</p>
                        <ol>
                            <li>
                                <strong>1.</strong><span class="top3_name">${data[i].top3[0].title}-</span>
                                <span class="top3_artists">${data[i].top3[0].artist[0]}</span>
                            </li>
                            <li>
                                <strong>2.</strong><span class="top3_name">${data[i].top3[1].title}-</span>
                                <span class="top3_artists">${data[i].top3[1].artist[0]}</span>
                            </li>
                            <li>
                                <strong>3.</strong><span class="top3_name">${data[i].top3[2].title}-
                                </span><span class="top3_artists">${data[i].top3[2].artist[0]}</span>
                            </li>
                        </ol>
                    </div>
                    <div class="paihang_list_img">
                        <img src="${data[i].cover}" alt="">
                        <span class="rank_update_type">每${data[i].update_frequence}更新</span>
                        <div class="playlist_views">
                            <i class="iconfont icon-24gf-play"></i>
                            <span>${data[i].views}</span>
                        </div>
                    </div>
                </li>`
            }
        })
})

//搜索板块效果
let searchCancel = document.querySelector('.search_cancel_span');
let searchInput = document.querySelector('.search');
//获取‘推荐’下的“主内容”节点
let mainBox = document.querySelector('.main_box');
//获取‘推荐’下的“搜索提示内容”节点
let searchContent = document.querySelector('.search_content');

searchCancel.addEventListener('click', function () {
    searchInput.focus = false;
    this.style.display = "none";
    mainBox.style.display = "block";
    searchContent.style.display = "none"
})
searchInput.addEventListener('click', function () {
    searchCancel.style.display = "block";
    mainBox.style.display = "none";
    searchContent.style.display = "block";
})

//热门搜索
axios.get('/hot')
    .then(res => {
        //获取‘推荐’下的“搜索提示内容”下的‘内容’节点
        let content_item = document.querySelectorAll('.search_content_showInfo_item')[1];
        let data = res.data;
        for (let i = 0; i < data.length; i++) {
            content_item.innerHTML += `<a class="search_block">${data[i]}</a>`;
        }
        return res;
    }).then(res => {
        // 先得到所有的“热门搜索”小块(a标签)， 再添加点击“热门搜索”小块(a标签)进行搜索的功能
        clickBlockSearchHot();
    })

//搜索歌曲
//获取叉叉
let searchCancelI = document.querySelector('#search_cancel_i');
//点叉叉后取消搜索结果页返回搜索推荐页
searchCancelI.addEventListener('click', function (e) {
    //搜索结果页
    document.querySelector('#search_results').style.display = 'none';
    //搜索推荐页
    document.querySelector('#recommend_search').style.display = 'block';
    //隐藏叉叉
    this.style.display = 'none';
})

//方法：生成搜索结果页
let searchResultsCreate = function (searchText) {
    //显示叉叉
    searchCancelI.style.display = "block";
    axios.get('/search', {
            params: {
                keyword: searchText
            }
        })
        .then(res => {
            //获取“搜索提示内容”中的“推荐内容”
            let recommendSearch = document.querySelector('#recommend_search');
            //关闭“搜索提示内容”中的“推荐内容”
            recommendSearch.style.display = "none";

            //获取“搜索结果列表”
            let resultsUl = document.querySelector('.search_results_ul');

            //获取搜索结果页
            let searchResults = document.querySelector('#search_results');
            //先清除原来的结果
            resultsUl.innerHTML = '';
            //显示搜索结果页
            searchResults.style.display = 'block';

            let data = res.data;
            for (let i = 0; i < data.length; i++) {
                resultsUl.innerHTML +=
                    `<li>
                    <div class="search_results_li_box">
                        <p class="search_results_li_name">${data[i].title}</p>
                        <p class="search_results_li_artists"><span>${data[i].artist[0]}</span>/<span>${data[i].artist[1]}</span></p>
                    </div>
                </li>`
            }
        })
}

//绑定回车事件
searchInput.addEventListener('keyup', function (e, other) {
    let searchText = this.value;
    //键盘类型
    let keyCode = e.keyCode;
    //如果是回车键
    if (keyCode == 13 || other == true) {
        //生成搜素结果页
        searchResultsCreate(searchText);
        //当搜索后把搜索结果存入数组
        histPush(searchText);
        //先得到所有的“搜索推荐”小块(a标签)， 再添加点击“搜索推荐”小块(a标签)进行搜索的功能
        clickBlockSearchHist();

    }

})

//定义全局数组histSearchArr存储搜索历史 并生成搜素历史小块
let histSearchArr = [];
//搜索历史存入数组方法
let histPush = function (searchText) {
    histSearchArr.push(searchText);
    //数组去重
    histSearchArr = Array.from(new Set(histSearchArr));

    //根据数组长度，循环绘制“搜索历史”小块
    let history_item = document.querySelectorAll('.search_content_showInfo_item')[0];
    //先重置节点内容
    history_item.innerHTML = '';
    for (let i = 0; i < histSearchArr.length; i++) {
        history_item.innerHTML += `<a class="search_block">${histSearchArr[i]}</a>`;
    }

    //显示“搜索历史”板块
    document.querySelector('#history_search').style.display = "block";

}


//搜索历史的显示与隐藏
let history_search = document.querySelector('#history_search'); //搜索历史板块
let history_search_clean = history_search.querySelector('p').querySelector('span'); //板块中的删除图标
history_search_clean.addEventListener('click', function () {
    // 清空
    histSearchArr = [];
    let history_item = document.querySelectorAll('.search_content_showInfo_item')[0];
    //重置节点内容
    history_item.innerHTML = '';
    history_search.style.display = "none";
})

//先得到所有的“热门搜索”小块(a标签)， 再添加点击“热门搜索”小块(a标签)进行搜索的功能
let clickBlockSearchHot = function () {
    //获取“热门搜索”小块(a标签)
    let searchBlock = document.querySelector("#hot_search").querySelector(".search_content_showInfo_item")
        .querySelectorAll('.search_block');
    for (let i = 0; i < searchBlock.length; i++) {
        searchBlock[i].addEventListener('click', function () {
            searchInput.value = this.innerHTML;
            let searchText = this.innerHTML; //传入搜索词

            //生成搜素结果页
            searchResultsCreate(searchText);
            // 存储搜索历史 并生成搜素历史小块
            histPush(searchText);
            // 添加点击“搜索历史”小块(a标签)进行搜索的功能
            clickBlockSearchHist()
        })
    }
}
// 添加点击“搜索历史”小块(a标签)进行搜索的功能
let clickBlockSearchHist = function () {
    let searchBlock = document.querySelector("#history_search").querySelector(".search_content_showInfo_item")
        .querySelectorAll('.search_block');
    for (let i = 0; i < searchBlock.length; i++) {
        searchBlock[i].addEventListener('click', function () {
            searchInput.value = this.innerHTML;
            let searchText = this.innerHTML; //传入搜索词

            //生成搜素结果页
            searchResultsCreate(searchText);
        })
    }
}