/*
    Hoodgail's Code
*/
import Dom from "./src/Dom.js";
import MainScene from "./src/MainScene.js";

const main = new MainScene({ parent: root });
main.init();
main.update();
window.main = main;
const welcomeButton = new Dom("div", {
    innerText: "Welcome"
})
console.dir(welcomeButton.element);
console.log(
    "%cSpecial thanks to Hoodgail for making the threejs effect gh: https://github.com/Hoodgail",
    "color:lightgreen;"
)