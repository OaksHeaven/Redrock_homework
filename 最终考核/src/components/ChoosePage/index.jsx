import axios from "axios";
import React, { useRef, useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

import Events from "../Events"; //引入“动态”页面
import ChoosePageCss from "./index.module.css";

export default function index(props) {
  let chooseBox = useRef();

  //拿到search参数uid
  let [searchs, setSearchs] = useSearchParams();
  let uid = searchs.get("uid");

  let startX;
  let offsetX;
  let moveX;
  let trueX;
  let elemWidth = document.body.clientWidth;
  let page = 0; //初始化显示页

  let startY;
  let moveY;

  let ifMoveY; //判断是否左右移动

  //保存用户歌单信息
  const [userPlayL, setUserplayL] = useState([]);
  //保存用户动态信息
  const [userEvents, setUserEvents] = useState([]);

  // useEffect(() => {
  //   console.log(props.ifChangeScroll);
  //   if (props.ifChangeScroll) {
  //     chooseBox.current.classList.add(ChoosePageCss.choose_boxB);
  //   } else {
  //     chooseBox.current.classList.remove(ChoosePageCss.choose_boxB);
  //   }
  // }, [props.ifChangeScroll]);

  //请求数据
  useEffect(() => {
    //得到用户歌单
    axios.get(`/api/user/playlist?uid=${uid}`).then(res => {
      setUserplayL(res.data.playlist);
    });
  }, []);

  //阻止默认拖动
  useEffect(() => {
    page = props.linkIndex; //初始化显示页
    chooseBox.current.style.left = -page * elemWidth + "px";

    // //移动
    // chooseBox.current.addEventListener("touchmove", function move(e) {
    //   moveX = e.targetTouches[0].pageX - startX;
    //   trueX = moveX + offsetX;

    //   moveY = e.targetTouches[0].pageY - startY;

    //   if (Math.abs(moveY) > Math.abs(moveX)) {
    //     ifMoveY = true;
    //     return;
    //   } else if (Math.abs(moveY) < Math.abs(moveX)) {
    //     e.preventDefault();
    //     ifMoveY = false;
    //   }

    //   //如果是边界，不行动
    //   if (page == 0 && moveX > 0) {
    //     return;
    //   } else if (page == 2 && moveX < 0) {
    //     return;
    //   }

    //   //跟随移动逻辑
    //   chooseBox.current.style.left = trueX + "px";
    // });

    // //触碰
    // chooseBox.current.addEventListener("touchstart", function touchSt(e) {
    //   //起始x
    //   startX = e.targetTouches[0].pageX;
    //   //起始y
    //   startY = e.targetTouches[0].pageY;

    //   offsetX = chooseBox.current.offsetLeft;

    //   console.log(page);
    // });

    // //结束触碰
    // chooseBox.current.addEventListener("touchend", function touchEd(e) {
    //   //如果判断用户是上下移动，什么也不做
    //   if (ifMoveY) {
    //     chooseBox.current.style.left = -page * elemWidth + "px";
    //     return;
    //   }
    //   //如果是边界，不行动
    //   if (page == 0 && moveX > 0) {
    //     chooseBox.current.style.left = -page * elemWidth + "px";

    //     return;
    //   } else if (page == 2 && moveX < 0) {
    //     chooseBox.current.style.left = -page * elemWidth + "px";

    //     return;
    //   }

    //   //超过一半才切换，否则回弹
    //   if (Math.abs(moveX) > 150) {
    //     if (moveX < 0) {
    //       page++;
    //       chooseBox.current.style.left = -elemWidth * page + "px";
    //       props.ClickChoose(page);
    //     } else if (moveX > 0) {
    //       page--;
    //       chooseBox.current.style.left = -elemWidth * page + "px";
    //       props.ClickChoose(page);
    //     }
    //   } else {
    //     chooseBox.current.style.left = -page * elemWidth + "px";
    //   }
    // });
  }, [props.linkIndex]);

  // chooseBox.current.style.left = -page * elemWidth + "px";

  let TouchSide = e => {
    //起始x
    startX = e.targetTouches[0].pageX;
    //起始y
    startY = e.targetTouches[0].pageY;
    offsetX = chooseBox.current.offsetLeft;
  };

  let MoveSide = e => {
    moveX = e.targetTouches[0].pageX - startX;
    trueX = moveX + offsetX;

    moveY = e.targetTouches[0].pageY - startY;

    if (Math.abs(moveY) > Math.abs(moveX)) {
      ifMoveY = true;
      return;
    } else if (Math.abs(moveY) < Math.abs(moveX)) {
      ifMoveY = false;
    }

    //如果是边界，不行动
    if (page == 0 && moveX > 0) {
      return;
    } else if (page == 2 && moveX < 0) {
      return;
    }

    //跟随移动逻辑
    chooseBox.current.style.left = trueX + "px";
    console.log(page);
  };

  let EndTouch = e => {
    //如果判断用户是上下移动，什么也不做
    if (ifMoveY) {
      chooseBox.current.style.left = -page * elemWidth + "px";
      return;
    }
    //如果是边界，不行动
    if (page == 0 && moveX > 0) {
      chooseBox.current.style.left = -page * elemWidth + "px";
      return;
    } else if (page == 2 && moveX < 0) {
      chooseBox.current.style.left = -page * elemWidth + "px";
      return;
    }
    //超过一半才切换，否则回弹
    if (Math.abs(moveX) > 150) {
      if (moveX < 0) {
        page++;
        chooseBox.current.style.left = -elemWidth * page + "px";
        props.ClickChoose(page);
      } else if (moveX > 0) {
        page--;
        chooseBox.current.style.left = -elemWidth * page + "px";
        props.ClickChoose(page);
      }
    } else {
      chooseBox.current.style.left = -page * elemWidth + "px";
    }
  };

  return (
    <div
      className={ChoosePageCss.choose_box}
      ref={chooseBox}
      onTouchStart={TouchSide}
      onTouchMove={MoveSide}
      onTouchEnd={EndTouch}
    >
      {/* 主页 */}
      <div id={ChoosePageCss.main_page}>
        <div className={ChoosePageCss.item_box}>
          <p>基本信息</p>
          <div className={ChoosePageCss.base_info}>
            <p>村龄</p>
            <p>地区</p>
          </div>
        </div>
        <div className={ChoosePageCss.item_box}>
          <p>音乐品味</p>
          <li>
            <img src="../../../text.png" alt="" />
            <div className={ChoosePageCss.item_text}>
              <p>name</p>
              <p>count</p>
            </div>
          </li>
        </div>
        <div className={ChoosePageCss.item_box}>
          <p>创建的歌单</p>
          {userPlayL.map((item, index) => {
            //返回用户创建的
            return item.creator.userId == props.uid ? (
              <Link to={`/SongList/${item.id}`} state={{ item }} key={item.id}>
                <li>
                  <img src={item.coverImgUrl} alt="" />
                  <div className={ChoosePageCss.item_text}>
                    <p>{item.name}</p>
                    <p>{item.trackCount}</p>
                  </div>
                </li>
              </Link>
            ) : (
              ""
            );
          })}
        </div>

        <div className={ChoosePageCss.item_box}>
          <p>收藏的歌单</p>
          {userPlayL.map((item, index) => {
            //返回用户收藏的
            return item.creator.userId !== props.uid ? (
              <Link to={`/SongList/${item.id}`} state={{ item }} key={item.id}>
                <li>
                  <img src={item.coverImgUrl} alt="" />
                  <div className={ChoosePageCss.item_text}>
                    <p>{item.name}</p>
                    <p>{item.trackCount}</p>
                  </div>
                </li>
              </Link>
            ) : (
              ""
            );
          })}
        </div>
      </div>

      {/* 动态 */}
      <div id={ChoosePageCss.events}>
        {/* 用props传入动态，用户信息*/}
        <Events userInfo={props.userInfo} uid={uid} />
      </div>
      <div id={ChoosePageCss.players}>
        <div className={ChoosePageCss.item_box}>播客</div>
      </div>
    </div>
  );
}
