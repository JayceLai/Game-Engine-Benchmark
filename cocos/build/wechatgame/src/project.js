require=function n(a,i,c){function l(t,e){if(!i[t]){if(!a[t]){var r="function"==typeof require&&require;if(!e&&r)return r(t,!0);if(u)return u(t,!0);var s=new Error("Cannot find module '"+t+"'");throw s.code="MODULE_NOT_FOUND",s}var o=i[t]={exports:{}};a[t][0].call(o.exports,function(e){return l(a[t][1][e]||e)},o,o.exports,n,a,i,c)}return i[t].exports}for(var u="function"==typeof require&&require,e=0;e<c.length;e++)l(c[e]);return l}({"D:\\Project\\Laya\\benchmark\\cocos\\assets\\TS\\Add.ts":[function(e,t,r){"use strict";var s,o,n,a,i,c,l,u,d,p,b,h,f,g,_;t.exports={_dec:void 0,_dec2:void 0,_class:void 0,_class2:void 0,_descriptor:void 0,_temp:void 0},function(e,t){for(var r=e.setters,s=0;s<t.length;++s)r[s]&&r[s](t[s]);e.execute()}({setters:[],execute:function(){cc._RF.push(window.module||{},"d27bdDaEEBFAoGqvq6pTnro","Add"),c=cc,l=c._decorator,u=c.Component,d=c.LabelComponent,p=c.Prefab,b=c.math,h=c.instantiate,f=c.profiler,g=l.ccclass,_=l.property,t.exports.Add=(s=g("Add"),o=_({type:p}),s((a=function(e){function n(){var e,t;babelHelpers.classCallCheck(this,n);for(var r=arguments.length,s=new Array(r),o=0;o<r;o++)s[o]=arguments[o];return t=babelHelpers.possibleConstructorReturn(this,(e=babelHelpers.getPrototypeOf(n)).call.apply(e,[this].concat(s))),babelHelpers.initializerDefineProperty(t,"TestPrefab",i,babelHelpers.assertThisInitialized(t)),t._rangex=0,t._rangez=0,t._number=16,t._i=0,t._text=null,t}return babelHelpers.inherits(n,e),babelHelpers.createClass(n,[{key:"onLoad",value:function(){var e=this.node.scene.getChildByName("Canvas").getChildByName("number");this._text=e.getComponent(d)}},{key:"start",value:function(){for(this._i;this._i<16;this._i++)this._rangex=b.randomRange(-3,3),this._rangez=b.randomRange(0,20),this.PrefabTest();this._number=16,f.showStats()}},{key:"Addtest",value:function(){this._number++,this._text.string=this._number.toString(),this._rangex=b.randomRange(-3,3),this._rangez=b.randomRange(0,20),this.PrefabTest()}},{key:"subtracttest",value:function(){null!=this.node.scene.getChildByName("sintel@01")&&(this._number--,this._text.string=this._number.toString(),this.node.scene.getChildByName("sintel@01").destroy())}},{key:"PrefabTest",value:function(){var e=this.node.scene,t=h(this.TestPrefab);e.addChild(t),t.setPosition(this.node.getPosition().x-this._rangex,0,this.node.getPosition().z-this._rangez-5)}}]),n}(u),i=babelHelpers.applyDecoratedDescriptor(a.prototype,"TestPrefab",[o],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return null}}),n=a))||n),cc._RF.pop()}},[])},{}],"D:\\Project\\Laya\\benchmark\\cocos\\assets\\TS\\SubLoader.ts":[function(e,t,r){"use strict";var s,o,n,a,i;t.exports={_dec:void 0,_class:void 0},function(e,t){for(var r=e.setters,s=0;s<t.length;++s)r[s]&&r[s](t[s]);e.execute()}({setters:[],execute:function(){cc._RF.push(window.module||{},"9137atmLVtIzpj/pSTBOhs9","SubLoader"),o=cc,n=o._decorator,a=o.Component,i=n.ccclass,n.property,t.exports.SubLoader=i("SubLoader")(s=function(e){function t(){return babelHelpers.classCallCheck(this,t),babelHelpers.possibleConstructorReturn(this,babelHelpers.getPrototypeOf(t).apply(this,arguments))}return babelHelpers.inherits(t,e),babelHelpers.createClass(t,[{key:"start",value:function(){if(window.wx){var e=window.wx;e&&e.loadSubpackage&&e.loadSubpackage({name:"sintel",success:function(e){console.log("分包加载成功"),cc.director.loadScene("main")},fail:function(e){console.error("分包加载失败")}}).onProgressUpdate(function(e){console.log("下载进度",e.progress),console.log("已经下载的数据长度",e.totalBytesWritten),console.log("预期需要下载的数据总长度",e.totalBytesExpectedToWrite)})}else cc.director.loadScene("main")}}]),t}(a))||s,cc._RF.pop()}},[])},{}]},{},["D:\\Project\\Laya\\benchmark\\cocos\\assets\\TS\\Add.ts","D:\\Project\\Laya\\benchmark\\cocos\\assets\\TS\\SubLoader.ts"]);