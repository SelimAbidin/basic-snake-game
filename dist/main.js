!function(t){var e={};function i(s){if(e[s])return e[s].exports;var o=e[s]={i:s,l:!1,exports:{}};return t[s].call(o.exports,o,o.exports,i),o.l=!0,o.exports}i.m=t,i.c=e,i.d=function(t,e,s){i.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:s})},i.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},i.t=function(t,e){if(1&e&&(t=i(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var s=Object.create(null);if(i.r(s),Object.defineProperty(s,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)i.d(s,o,function(e){return t[e]}.bind(null,o));return s},i.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return i.d(e,"a",e),e},i.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},i.p="",i(i.s=0)}([function(t,e){const i=Object.freeze({NOT_STARTED:"NOT_STARTED",PLAYING:"PLAYING"});function s(t){const e=document.getElementById(t);this._context=e.getContext("2d"),this._canvas=e,this._xSize=20,this._ySize=20,this.reset(),this.setEvents()}Object.assign(s.prototype,{constructor:s,setEvents:function(){const t=this._canvas;this.startGame=this.startGame.bind(this),this.onUpdate=this.onUpdate.bind(this),this.onKeyDown=this.onKeyDown.bind(this),t.addEventListener("click",this.startGame),this.startGame()},reset(){this._snake=[{x:10,y:10},{x:10,y:10},{x:10,y:10}],this._food=null,this._vX=0,this._vY=0,this._gameState=i.NOT_STARTED},setGameState:function(t){this._gameState=t},startGame:function(){this._gameState!==i.PLAYING&&(this.setGameState(i.PLAYING),document.addEventListener("keydown",this.onKeyDown),this.addFood(),this.onUpdate())},addFood(){let t,e,i,s=this._snake;for(;;){t=Math.floor(Math.random()*this._xSize),e=Math.floor(Math.random()*this._xSize);let o=!1;for(let n=0;n<s.length;n++)if((i=s[n]).x===t&&i.y===e){o=!0;break}if(!o){this._food={x:t,y:e};break}}},onKeyDown(t){this._gameState===i.NOT_STARTED&&32===t.keyCode&&this.startGame(),38===t.keyCode&&1!==this._vY?(this._vX=0,this._vY=-1):40===t.keyCode&&-1!==this._vY?(this._vX=0,this._vY=1):39===t.keyCode&&-1!==this._vX?(this._vX=1,this._vY=0):37===t.keyCode&&1!==this._vX&&(this._vX=-1,this._vY=0)},getGridPosition:(t,e)=>({x:25*t,y:25*e}),onUpdate:function(){const t=this._food,e=this._snake,s=e.length;let o;for(let t=s-1;t>0;t--){o=e[t];const i=e[t-1];o.x=i.x,o.y=i.y}const n=e[0];if(n.x+=this._vX,n.y+=this._vY,n.x>=this._xSize||n.y>=this._ySize)return this.reset(),void console.log("GAME OVER");if(n.x<0||n.y<0)return this.reset(),void console.log("GAME OVER");if(0!==this._vX||0!==this._vY)for(let t=1;t<s;t++)if((o=e[t]).x===n.x&&o.y===n.y)return this.reset(),void console.log("GAME OVER");const r=this._context;if(r.clearRect(0,0,this._canvas.width,this._canvas.height),r.beginPath(),t){if(n.x===t.x&&n.y===t.y){let t=e[s-1];e.push(Object.assign({},t)),this.addFood()}r.fillStyle="#ffff00",r.lineWidth=1;let i=this.getGridPosition(t.x,t.y);r.rect(i.x+2,i.y+2,21,21),r.stroke(),r.fill()}r.closePath(),r.beginPath(),r.fillStyle="#ff0000",r.lineWidth=1;for(let t=1;t<s;t++){o=e[t];let i=this.getGridPosition(o.x,o.y);r.rect(i.x+2,i.y+2,21,21),r.stroke(),r.fill()}r.closePath(),r.beginPath(),r.fillStyle="#00ff00",r.lineWidth=1;let h=this.getGridPosition(n.x,n.y);r.rect(h.x+2,h.y+2,21,21),r.stroke(),r.fill(),r.closePath(),this._gameState===i.PLAYING&&setTimeout(this.onUpdate,150)}}),new s("area")}]);