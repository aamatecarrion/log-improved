if(!self.define){let e,i={};const n=(n,s)=>(n=new URL(n+".js",s).href,i[n]||new Promise((i=>{if("document"in self){const e=document.createElement("script");e.src=n,e.onload=i,document.head.appendChild(e)}else e=n,importScripts(n),i()})).then((()=>{let e=i[n];if(!e)throw new Error(`Module ${n} didn’t register its module`);return e})));self.define=(s,r)=>{const c=e||("document"in self?document.currentScript.src:"")||location.href;if(i[c])return;let o={};const t=e=>n(e,c),d={module:{uri:c},exports:o,require:t};i[c]=Promise.all(s.map((e=>d[e]||t(e)))).then((e=>(r(...e),o)))}}define(["./workbox-3e911b1d"],(function(e){"use strict";self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"404.html",revision:"b59b33711f7cdf74648f2ce73c84736d"},{url:"assets/index-BiLN2yzm.css",revision:null},{url:"assets/index-HSB2JT6U.js",revision:null},{url:"assets/workbox-window.prod.es5-D5gOYdM7.js",revision:null},{url:"index.html",revision:"c561895d7a939706979bc7f2ca1d110c"},{url:"favicon.png",revision:"084fd68b46ad178c7a4acf3367ccdde0"},{url:"robots.txt",revision:"b6216d61c03e6ce0c9aea6ca7808f7ca"},{url:"apple-touch-icon.png",revision:"eebbf618498c3956ebcebe9e0a25316b"},{url:"pwa-256x256.png",revision:"ecb328ae26c9b73fe4bb504dfbae974d"},{url:"pwa-512x512.png",revision:"084fd68b46ad178c7a4acf3367ccdde0"},{url:"manifest.webmanifest",revision:"8939dd9c9a27c0221104a8659866f25f"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html")))}));
