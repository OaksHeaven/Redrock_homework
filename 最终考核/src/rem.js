function getRem(design_w, unit) {
  var html = document.getElementsByTagName("html")[0];
  var real_w = document.documentElement.clientWidth;
  html.style.fontSize = (real_w / design_w) * unit + "px";
  console.log(design_w);
}
getRem(750, 100);
window.addEventListener("resize", getRem);
window.onresize = function () {
  getRem(750, 100);
  console.log("yes");
};
