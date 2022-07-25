import React, { Fragment, useEffect, useRef, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import axios from "axios";

import "./index.css";
import "../../icon_font/iconfont.css";

export default function index(props) {
  let sideBarRef = useRef(props);

  let startX;
  let offsetX;
  let moveX;
  let trueX;
  let elemWidth;
  let page = 0; //初始化显示页

  let [userName, setUserName] = useState("");

  useEffect(() => {
    sideBarRef.current.addEventListener("touchmove", function (e) {
      e.preventDefault();
    });
  }, []);

  //请求数据
  useEffect(() => {
    axios.get("/api/user/account").then(res => {
      console.log(res);
      let { data } = res;

      //渲染数据
      userImg.current.src = data.profile.avatarUrl;
      setUserName(data.profile.nickname);
    });
  }, []);

  let userImg = useRef("");

  console.log(props.maskClicked);
  //如果点击了mask
  if (props.maskClicked) {
    //移动
    sideBarRef.current.style.left = -311.9 + "px";
    page = 1;

    //重设
    props.handleMask(false);
  }

  let TouchSide = e => {
    startX = e.targetTouches[0].pageX;
    offsetX = sideBarRef.current.offsetLeft;
    elemWidth = e.targetTouches[0].clientWidth;
    console.log("offsetX");
    console.log(elemWidth);
  };

  let MoveSide = e => {
    moveX = e.targetTouches[0].pageX - startX;
    trueX = moveX + offsetX;
    sideBarRef.current.style.left = trueX + "px";
    console.log(moveX);
  };

  let EndTouch = e => {
    if (Math.abs(moveX) > 150) {
      if (moveX < 0) {
        //移动
        sideBarRef.current.style.left = -311.9 + "px";
        page = 1;

        //设置mask状态
        props.handleMask(true);
      } else if (moveX > 0) {
        //移动
        sideBarRef.current.style.left = 0 + "px";
        page = 0;

        //设置mask状态
        props.handleMask(false);
      }
    } else {
      sideBarRef.current.style.left = page * -311.9 + "px";
      props.handleMask(true);
    }
  };
  return (
    <Fragment>
      <div className="sidebar" ref={sideBarRef} onTouchStart={TouchSide} onTouchMove={MoveSide} onTouchEnd={EndTouch}>
        <div className="side_header">
          <div>
            <img src="" alt="poto" ref={userImg} />
          </div>
          {/* 去个人页面 */}
          <Link to={`/PersonPage?uid=${props.uid}`}>{userName}</Link>
          <i className="iconfont icon-youjiantou"></i>
        </div>
        <div className="side_items">其他功能。。。</div>
      </div>
    </Fragment>
  );
}
