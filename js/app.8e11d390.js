(function(t){function e(e){for(var r,c,s=e[0],i=e[1],u=e[2],d=0,f=[];d<s.length;d++)c=s[d],Object.prototype.hasOwnProperty.call(a,c)&&a[c]&&f.push(a[c][0]),a[c]=0;for(r in i)Object.prototype.hasOwnProperty.call(i,r)&&(t[r]=i[r]);l&&l(e);while(f.length)f.shift()();return o.push.apply(o,u||[]),n()}function n(){for(var t,e=0;e<o.length;e++){for(var n=o[e],r=!0,s=1;s<n.length;s++){var i=n[s];0!==a[i]&&(r=!1)}r&&(o.splice(e--,1),t=c(c.s=n[0]))}return t}var r={},a={app:0},o=[];function c(e){if(r[e])return r[e].exports;var n=r[e]={i:e,l:!1,exports:{}};return t[e].call(n.exports,n,n.exports,c),n.l=!0,n.exports}c.m=t,c.c=r,c.d=function(t,e,n){c.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},c.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},c.t=function(t,e){if(1&e&&(t=c(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(c.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var r in t)c.d(n,r,function(e){return t[e]}.bind(null,r));return n},c.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return c.d(e,"a",e),e},c.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},c.p="/";var s=window["webpackJsonp"]=window["webpackJsonp"]||[],i=s.push.bind(s);s.push=e,s=s.slice();for(var u=0;u<s.length;u++)e(s[u]);var l=i;o.push([0,"chunk-vendors"]),n()})({0:function(t,e,n){t.exports=n("56d7")},"20ed":function(t,e,n){},"56d7":function(t,e,n){"use strict";n.r(e);n("e260"),n("e6cf"),n("cca6"),n("a79d");var r=n("2b0e"),a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"app"}},[n("header"),n("div",{staticClass:"wrapper"},[n("div",{staticClass:"flex list-row"},t._l(Object.keys(t.columns),(function(e){return n("FriendList",{key:e,attrs:{colKey:e}},t._l(t.columns[e].cards,(function(t,r){return n("Friend",{key:t.id,attrs:{index:r,colKey:e,card:t}})})),1)})),1),n("div",{staticClass:"flex"},[t._m(0),t._l(t.otherCols,(function(e){return n("div",{key:e,staticClass:"button-ph"},[n("button",{attrs:{type:"button"},on:{click:function(n){return t.showLog(e)}}},[t._v(" Log "+t._s(t.columns[e].label)+" ")])])}))],2)]),n("footer")])},o=[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"button-ph"},[n("div",{attrs:{id:"vk_auth"}})])}],c=n("1da1"),s=n("5530"),i=(n("96cf"),n("4de4"),n("b64b"),n("d3b7"),n("159b"),n("99af"),n("2f62")),u=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"friendList",on:{dragover:function(t){t.preventDefault()},drop:function(e){return e.preventDefault(),t.drop(e)}}},[n("div",{staticClass:"label"},[t._v(" "+t._s(t.columns[t.colKey].label)+" ")]),n("ul",[t._t("default")],2)])},l=[],d={name:"FriendList",props:["colKey"],computed:Object(i["b"])(["columns"]),methods:{drop:function(t){var e=t.dataTransfer.getData("cardIndex"),n=t.dataTransfer.getData("colFromKey");this.$store.dispatch("transferCard",[n,this.colKey,e])}}},f=d,p=(n("814e"),n("2877")),h=Object(p["a"])(f,u,l,!1,null,"8ab12b3c",null),m=h.exports,v=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"friend-card",attrs:{draggable:"true"},on:{dragstart:t.dragStart}},[n("div",[n("img",{attrs:{src:t.card.photo_100,alt:"friend avatar",height:"50",width:"50",draggable:"false"}})]),n("div",{staticClass:"friend-meta"},[n("div",[t._v(t._s(t.card.first_name))]),n("div",[t._v(t._s(t.card.last_name))])])])},b=[],g={name:"Friend",props:["index","colKey","card"],methods:{dragStart:function(t){t.dataTransfer.setData("cardIndex",this.index),t.dataTransfer.setData("colFromKey",this.colKey)}}},_=g,y=(n("cc27"),Object(p["a"])(_,v,b,!1,null,"60277983",null)),w=y.exports,O={name:"App",components:{FriendList:m,Friend:w},computed:Object(s["a"])({otherCols:function(){return Object.keys(this.columns).filter((function(t){return"col1"!=t}))}},Object(i["b"])(["columns"])),methods:{authWidgetListener:function(){window.VK.init({apiId:7793585}),window.VK.Widgets.Auth("vk_auth",{width:"200px",onAuth:this.onLogIn})},onLogIn:function(){var t=this;this.callAPI("friends.get",{fields:"photo_100"}).then((function(e){t.$store.dispatch("clearData"),t.$store.dispatch("setColumn",["col1",e.items])})).catch((function(t){alert("Login error: "+t)}))},callAPI:function(t,e){return e.v=5.73,new Promise((function(n,r){window.VK.api(t,e,(function(t){t.error?r(t.error):n(t.response)}))}))},showLog:function(t){var e=[];this.columns[t].cards.forEach((function(t){e.push("".concat(t.first_name," ").concat(t.last_name))})),console.log(e)}},mounted:function(){var t=this;return Object(c["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:t.authWidgetListener();case 1:case"end":return e.stop()}}),e)})))()}},j=O,x=(n("5c0b"),Object(p["a"])(j,a,o,!1,null,null,null)),C=x.exports,k=n("3835"),K=(n("a434"),{state:{columns:{col1:{label:"All friends",cards:[]},col2:{label:"Selected friends",cards:[]}}},mutations:{},actions:{setColumn:function(t,e){var n=t.state,r=Object(k["a"])(e,2),a=r[0],o=r[1];n.columns[a].cards=o||[]},transferCard:function(t,e){var n=t.state,r=Object(k["a"])(e,3),a=r[0],o=r[1],c=r[2];n.columns[o].cards.push(n.columns[a].cards[c]),n.columns[a].cards.splice(c,1)},clearData:function(t){var e=t.state;Object.keys(e.columns).forEach((function(t){e.columns[t].cards=[]}))}},getters:{columns:function(t){return t.columns}}});r["a"].use(i["a"]);var L=new i["a"].Store({modules:{lists:K}});r["a"].config.productionTip=!1,new r["a"]({store:L,render:function(t){return t(C)}}).$mount("#app")},"5c0b":function(t,e,n){"use strict";n("9c0c")},"73d5":function(t,e,n){},"814e":function(t,e,n){"use strict";n("73d5")},"9c0c":function(t,e,n){},cc27:function(t,e,n){"use strict";n("20ed")}});
//# sourceMappingURL=app.8e11d390.js.map