import React, { Fragment, useEffect, useRef, useState } from "react";
import axios from "axios";
import { Link, useNavigate, useSearchParams } from "react-router-dom";

import ChoosePage from "../ChoosePage";

import PersonPageCss from "./index.module.css";
import "../../icon_font/iconfont.css";

axios.defaults.withCredentials = true;

export default function index(props) {
  let [linkIndex, setLinkIndex] = useState(0);
  let [userInfo, setUserInfo] = useState({ profile: {} });
  let [ifChangeScroll, setScroll] = useState(false);

  let link1 = useRef();
  let link2 = useRef();
  let link3 = useRef();
  //样式相关ref
  let ContentRef = useRef();
  let ChooseBarRef = useRef();
  let headerRef = useRef();
  let ChoosePageRef = useRef();

  //拿到search参数uid
  let [searchs, setSearchs] = useSearchParams();
  let uid = searchs.get("uid");

  let cookie = encodeURIComponent(props.cookie);
  // console.log(cookie);

  let ClickChoose = index => {
    setLinkIndex(index);

    switch (index) {
      case 0: {
        link1.current.classList.add(PersonPageCss.clicked);
        link2.current.classList.remove(PersonPageCss.clicked);
        link3.current.classList.remove(PersonPageCss.clicked);
        return;
      }
      case 1: {
        link1.current.classList.remove(PersonPageCss.clicked);
        link2.current.classList.add(PersonPageCss.clicked);
        link3.current.classList.remove(PersonPageCss.clicked);
        return;
      }
      case 2: {
        link1.current.classList.remove(PersonPageCss.clicked);
        link2.current.classList.remove(PersonPageCss.clicked);
        link3.current.classList.add(PersonPageCss.clicked);
        return;
      }
    }
  };

  //请求用户信息
  useEffect(() => {
    axios.get(`/api/user/detail?uid=${uid}`).then(res => {
      //保存用户信息
      setUserInfo(res.data);

      console.log(res.data);
    });
  }, []);

  let ChangeScroll = e => {
    //如果下划到一定高度
    if (ContentRef.current.scrollTop > 372) {
      // height = ContentRef.current.scrollTop;
      //更改为2号滚动样式
      ChooseBarRef.current.classList.add(PersonPageCss.choose_barB);
      setScroll(true);
      //给choosePage传递信息
    } else {
      //移除2号滚动样式
      ChooseBarRef.current.classList.remove(PersonPageCss.choose_barB);
      setScroll(false);
    }
    //如果下划到一定高度
    if (ContentRef.current.scrollTop > 225) {
      // height = ContentRef.current.scrollTop;
      //更改为2号滚动样式
      headerRef.current.classList.add(PersonPageCss.headerB);
      //给choosePage传递信息
    } else {
      //移除2号滚动样式
      headerRef.current.classList.remove(PersonPageCss.headerB);
    }
  };

  // useEffect(() => {
  //   ContentRef.current.addEventListener("scroll", e => {
  //     console.log(e.scrollTop);
  //     if (ContentRef.current.scrollTop > 340) {
  //       height = ContentRef.current.scrollTop;
  //       ChooseBarRef.current.classList.add(PersonPageCss.scroll);
  //     } else {
  //       ChooseBarRef.current.classList.remove(PersonPageCss.scroll);
  //     }
  //   });
  // }, []);

  //使用Navigate
  let navigate = useNavigate();

  return (
    <div className={PersonPageCss.all_content} ref={ContentRef} onScroll={ChangeScroll}>
      {/* 头部 */}
      <div className={PersonPageCss.header} ref={headerRef}>
        <i
          onClick={() => {
            navigate(-1);
          }}
          className="iconfont icon-zuojiantou"
        ></i>
      </div>
      {/* 背景 */}
      <div className={PersonPageCss.back}>
        <div className={PersonPageCss.back_img}>
          <img src={userInfo.profile.backgroundUrl} alt="" />
        </div>
      </div>

      <div className={PersonPageCss.front}>
        <div className={PersonPageCss.user_box}>
          <img src={userInfo.profile.avatarUrl} alt="" />
          <p>{userInfo.profile.nickname}</p>
          <div>
            {userInfo.profile.follows}关注|{userInfo.profile.followeds}粉丝|Lv.{userInfo.level}
          </div>
          <div className={PersonPageCss.goto_info}>
            {/* 如果不是本人，就不显示编辑资料了 */}
            <Link to={`/SetInfo/${uid}`} style={{ display: uid == props.uid ? "block" : "none" }}>
              编辑资料
            </Link>
          </div>
        </div>
        <div className={PersonPageCss.choose_bar} ref={ChooseBarRef}>
          <div onClick={() => ClickChoose(0)} ref={link1} className={PersonPageCss.clicked}>
            主页
          </div>
          <div onClick={() => ClickChoose(1)} ref={link2}>
            动态
          </div>
          <div onClick={() => ClickChoose(2)} ref={link3}>
            播客
          </div>
        </div>
      </div>
      {/* 传入各种信息 */}
      <ChoosePage
        linkIndex={linkIndex}
        ClickChoose={ClickChoose}
        uid={props.uid}
        userInfo={userInfo}
        ContentRef={ContentRef}
        ref={ChoosePageRef}
        ifChangeScroll={ifChangeScroll}
      />
    </div>
  );
}
