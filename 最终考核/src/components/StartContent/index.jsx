import React, { useRef, useState } from "react";

import MainBox from "../MainBox"; //侧边栏
import SideBar from "../SideBar"; //侧边栏

import StartCss from "./index.module.css";

export default function index(props) {
  let maskRef = useRef();

  let [maskClicked, setMaskClicked] = useState(false);

  let handleMask = data => {
    setMaskClicked(data);
    console.log(maskClicked);
    if (maskClicked) {
      maskRef.current.style.display = "none";
    } else {
      maskRef.current.style.display = "block";
    }
  };

  return (
    <div id="Content" style={{ display: "block" }}>
      <MainBox />
      <SideBar handleMask={handleMask} maskClicked={maskClicked} setMaskClicked={setMaskClicked} uid={props.uid} />
      <div
        className={StartCss.mask}
        ref={maskRef}
        onClick={() => {
          maskRef.current.style.display = "none";
          setMaskClicked(true);
        }}
      ></div>
    </div>
  );
}
