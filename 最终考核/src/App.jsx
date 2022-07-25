import { useState } from "react";
import "./App.css";
import { BrowserRouter, useRoutes, Routes, Route, Navigate } from "react-router-dom";

import Login from "./components/Login"; //登录
import StartContent from "./components/StartContent"; //起始内容
import PersonPage from "./components/PersonPage"; //个人主页
import SongList from "./components/SongList"; //歌单页
import SetInfo from "./components/SetInfo"; //编辑资料

function App() {
  // let routerElements = useRoutes(RouterRules);

  //保存uid
  let [uid, setUid] = useState();

  //临时保存cookie
  let [cookie, setCooie] = useState("");
  let StoreInfo = (cookie, uid) => {
    setCooie(cookie);
    setUid(uid);
  };

  const [count, setCount] = useState(0);

  const [hasLogin, setHasLogin] = useState(false);

  let handleHasLogin = data => {
    setHasLogin(data);
  };

  return (
    <BrowserRouter>
      <div className="App">
        {/* <StartContent /> */}
        <div style={{ display: hasLogin ? "block" : "none", height: "100%" }}>
          <Routes>
            <Route path="/StartContent" element={<StartContent handleHasLogin={handleHasLogin} uid={uid} />} />
            <Route path="/PersonPage" element={<PersonPage cookie={cookie} uid={uid} />} />
            <Route path="/SongList/:id" element={<SongList />} />
            <Route path="/SetInfo/:uid" element={<SetInfo />} uid={uid} />
            <Route path="/" element={<Navigate to="/StartContent" />} />
          </Routes>
        </div>
        <Login handleHasLogin={handleHasLogin} StoreInfo={StoreInfo} />
      </div>
    </BrowserRouter>
  );
}

export default App;
