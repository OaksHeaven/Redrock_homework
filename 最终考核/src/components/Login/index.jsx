import React, { useRef, useState } from "react";
import axios from "axios";

import LoginCss from "./index.module.css";

axios.defaults.baseURL = "http://127.0.0.1:5173/";

export default function index(props) {
  let [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  let styleRef = useRef();

  let handUp = e => {
    e.preventDefault();
    axios.get(`/api/login?email=${username}&password=${password}`).then(res => {
      //保存cookie,uid
      props.StoreInfo(res.data.cookie, res.data.profile.userId);

      console.log(res);

      //改为已登录
      props.handleHasLogin(true);

      if (res.statusText == "OK") {
        styleRef.current.style.display = "none";
      }
    });
  };

  return (
    <div id={LoginCss.login} style={{ display: "block" }} ref={styleRef}>
      <div className="email_login">
        <div className={LoginCss.header}>网易邮箱账号登录</div>
      </div>
      <div className={LoginCss.input_box}>
        <form action="" onSubmit={handUp}>
          <input type="text" placeholder="请输入邮箱" onChange={e => setUsername(e.target.value)} />
          <input type="password" placeholder="请输入密码" onChange={e => setPassword(e.target.value)} />
          <button>登录</button>
        </form>
      </div>
    </div>
  );
}
