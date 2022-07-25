import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams, useLocation } from "react-router-dom";
import axios from "axios";

import "../../icon_font/iconfont.css";
import SongListCss from "./index.module.css";

export default function index() {
  //使用Navigate
  let navigate = useNavigate();
  //接收state参数
  let { state } = useLocation();

  //
  let backRef = useRef();
  let contentRef = useRef();
  let headerRef = useRef();
  let listsRef = useRef();

  //接收params参数
  let { id } = useParams();

  //stae保存歌曲
  let [songs, setSongs] = useState([]);

  //执行请求
  useEffect(() => {
    axios.get(`/api/playlist/track/all?id=${id}`).then(res => {
      console.log(res);
      setSongs(res.data.songs);
    });

    //保存歌曲
  }, []);

  //下划到一定高度改变样式
  let ChangeScroll = e => {
    if (e.target.scrollTop >= 174) {
      //更改为2号滚动样式
      headerRef.current.classList.add(SongListCss.headerB);
      // listsRef.current.classList.add(SongListCss.listsB);
    } else {
      //移除2号滚动样式
      headerRef.current.classList.remove(SongListCss.headerB);
      // listsRef.current.classList.remove(SongListCss.listsB);
    }
  };

  return (
    <div id={SongListCss.all_content} ref={contentRef} onScroll={ChangeScroll}>
      {/* 头部 */}
      <div className={SongListCss.header} ref={headerRef}>
        <i onClick={() => navigate(-1)} className="iconfont icon-zuojiantou"></i>歌单
      </div>

      {/* 背景 */}
      <div className={SongListCss.back} ref={backRef}>
        <img src={state.item.coverImgUrl} alt="" />
        <div className={SongListCss.info}>
          <p>{state.item.name}</p>
          <Link to={`/PersonPage?uid=${state.item.creator.userId}`}>
            <div className={SongListCss.page_link}>
              <img src={state.item.creator.avatarUrl} />
              <p>{state.item.creator.nickname}</p>
              <i className="iconfont icon-youjiantou"></i>
            </div>
          </Link>
        </div>
      </div>

      {/* 歌曲列表 */}
      <div id="lists" className={SongListCss.lists} ref={listsRef}>
        {songs.map((item, index) => {
          return (
            <li key={item.id}>
              <span>{index + 1}</span>
              <div>
                <p>{item.name}</p>
                <p>
                  {item.ar[0].name} - {item.alia[0]}
                </p>
              </div>
            </li>
          );
        })}
      </div>
    </div>
  );
}
