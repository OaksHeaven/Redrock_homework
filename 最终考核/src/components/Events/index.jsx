import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import EventsCss from "./index.module.css";

export default function index(props) {
  //接收传入的用户信息
  let userInfo = props.userInfo;
  //保存用户动态信息
  const [userEvents, setUserEvents] = useState([{}]);

  //保存json数据
  //   const [statejsonInfo, setJsonInfo] = useState([{ msg: "", resource: { mlogBaseData: { coverUrl: "" } } }]);
  let jsonInfo = [{ msg: "", resource: { mlogBaseData: { coverUrl: "" } } }];

  //函数 得到发布日期
  let Time;
  function getTime(time) {
    Time = new Date(time);
    return {
      year: Time.getFullYear().toString(),
      month: (Time.getMonth() + 1).toString(),
      day: Time.getDate().toString(),
    };
  }

  useEffect(() => {
    //得到用户动态
    axios.get(`/api/user/event?uid=${props.uid}`).then(res => {
      console.log(res);
      setUserEvents(res.data.events);
    });
  }, []);

  //   useEffect(() => {
  userEvents.map((item, index, arr) => {
    //如果json不为空
    if (item.json) {
      //jsonInfo置为空
      if (index == 0) {
        jsonInfo = [];
      }
      jsonInfo.push(JSON.parse(item.json));
    }
    //如果遍历完了，说明加载完成
    if (index == arr.length - 1) {
      //       setLoadOut(true);
      // console.log(jsonInfo);
    }
  });
  //   }, [userEvents]);

  return (
    <div className={EventsCss.events}>
      {userEvents.length == 0 ? (
        <div style={{ color: "rgba(0,0,0,.5)", textAlign: "center" }}>暂时还没有动态哦</div>
      ) : (
        userEvents.map((item, index, arr) => {
          return (
            <li key={item.discussId}>
              <img src={userInfo.profile.avatarUrl} className={EventsCss.userImg} alt="" />
              <div className={EventsCss.content}>
                <div className={EventsCss.title}>
                  <Link to={`/PersonPage?uid=${props.uid}`}>{userInfo.profile.nickname}</Link>{" "}
                  <span>
                    {jsonInfo[index].resource
                      ? "发布Mlog："
                      : jsonInfo[index].playlist
                      ? "分享歌单"
                      : jsonInfo[index].song
                      ? "分享单曲"
                      : "转发"}
                  </span>
                  <p>
                    {item.eventTime
                      ? getTime(item.eventTime).year +
                        "年" +
                        getTime(item.eventTime).month +
                        "月" +
                        getTime(item.eventTime).day +
                        "日"
                      : ""}
                  </p>
                </div>
                <div className={EventsCss.detail}>
                  <p>{jsonInfo[index].msg ? jsonInfo[index].msg : ""}</p>
                  <div className={EventsCss.detail_img}>
                    <img
                      src={
                        jsonInfo[index].resource
                          ? jsonInfo[index].resource.mlogBaseData.coverUrl
                          : jsonInfo[index].playlist
                          ? jsonInfo[index].playlist.coverImgUrl
                          : jsonInfo[index].song
                          ? jsonInfo[index].song.album.blurPicUrl
                          : ""
                      }
                    />
                  </div>
                  <div className={EventsCss.actions}></div>
                </div>
              </div>
            </li>
          );
        })
      )}
    </div>
  );
}
