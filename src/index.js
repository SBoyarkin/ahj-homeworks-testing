import "./css/style.css";
import { Widget } from "./js/widget";
import "./js/app";

// TODO: write your code in app.js
const PAY = ["visa", "mir", "mastercard"];


const wg = new Widget();

const mountPoint = document.querySelector("body");
mountPoint.append(wg.appendVidget(PAY));
