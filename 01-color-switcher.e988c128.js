!function(){var t={startBtn:document.querySelector("button[data-start]"),stopBtn:document.querySelector("button[data-stop]")},n={intervalId:null,isActive:!1,start:function(){this.isActive||(this.isActive=!0,this.intervalId=setInterval((function(){var t="#".concat(Math.floor(16777215*Math.random()).toString(16).padStart(6,0));document.body.style.backgroundColor=t}),1e3),this.toggleButtons())},stop:function(){clearInterval(this.intervalId),this.isActive=!1,this.toggleButtons()},toggleButtons:function(){t.startBtn.disabled=this.isActive,t.stopBtn.disabled=!this.isActive}};t.startBtn.addEventListener("click",(function(){n.start()})),t.stopBtn.addEventListener("click",(function(){n.stop()}))}();
//# sourceMappingURL=01-color-switcher.e988c128.js.map
