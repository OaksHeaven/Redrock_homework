import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import axios from "axios";

import SetInfoCss from "./index.module.css";

export default function index() {
  //保存状态
  let [userInfo, setUserInfo] = useState({ profile: {} });
  //拿到uid
  let { uid } = useParams();

  //请求数据
  useEffect(() => {
    axios.get(`/api/user/detail?uid=${uid}`).then(res => {
      console.log(res);

      //拿到信息
      setUserInfo(res.data);
    });
  }, []);
  //使用Navigate
  let navigate = useNavigate();

  return (
    <div className={SetInfoCss.all_content}>
      <div
        className={SetInfoCss.header}
        onClick={() => {
          navigate(-1);
        }}
      >
        《--
      </div>
      <div className={SetInfoCss.groups}>
        <li>
          <p>头像</p> <img src={userInfo.profile.avatarUrl} alt="" />
        </li>
        <li>
          <p>昵称</p>
          <p>{userInfo.profile.nickname}</p>
        </li>
        <li>
          <p>性别</p>
        </li>
        <li>
          <p>二维码</p>
        </li>
      </div>
      <div className={SetInfoCss.groups}>
        <li>
          <p>生日</p>
          <p>未设置</p>
        </li>
        <li>
          <p>地区</p>
          <p>...</p>
        </li>
        <li>
          <p>大学</p>
          <p>...</p>
        </li>
        <li>
          <p>音乐标签</p>
          <p>...</p>
        </li>
        <li>
          <p>简介</p>
          <p>...</p>
        </li>
      </div>
      <div className={SetInfoCss.groups}>
        <li>
          <p>个人主页隐私设置</p>
        </li>
        <li>
          <p>主页模块顺序设置</p>
        </li>
      </div>
      <div className={SetInfoCss.groups}>
        <li>
          <p>账号和绑定设置</p>
        </li>
      </div>
    </div>
  );
}
