import GameConfig from "./GameConfig";
import { ui } from "./ui/layaMaxUI";
class Main {

	private skeletonPrefab: Laya.Sprite3D = null;
	private skeletonScene: Laya.Scene3D = null;
	private maxZ: number = 30;
	private maxX: number = 6;
	private initAmount: number = 30;

	private testViewUI: ui.TestViewUI = null;

	constructor() {
		//根据IDE设置初始化引擎		
		if (window["Laya3D"]) Laya3D.init(GameConfig.width, GameConfig.height);
		else Laya.init(GameConfig.width, GameConfig.height, Laya["WebGL"]);
		Laya["Physics"] && Laya["Physics"].enable();
		Laya["DebugPanel"] && Laya["DebugPanel"].enable();
		Laya.stage.scaleMode = GameConfig.scaleMode;
		Laya.stage.screenMode = GameConfig.screenMode;
		Laya.stage.alignV = GameConfig.alignV;
		Laya.stage.alignH = GameConfig.alignH;
		Laya.stage.screenMode = Laya.Stage.SCREEN_HORIZONTAL
		Laya.stage.useRetinalCanvas = true;
		//兼容微信不支持加载scene后缀场景
		Laya.URL.exportSceneToJson = GameConfig.exportSceneToJson;

		//打开调试面板（通过IDE设置调试模式，或者url地址增加debug=true参数，均可打开调试面板）
		if (GameConfig.debug || Laya.Utils.getQueryString("debug") == "true") Laya.enableDebugPanel();
		if (GameConfig.physicsDebug && Laya["PhysicsDebugDraw"]) Laya["PhysicsDebugDraw"].enable();
		if (GameConfig.stat) Laya.Stat.show();
		Laya.alertGlobalError = true;

		//激活资源版本控制，version.json由IDE发布功能自动生成，如果没有也不影响后续流程
		Laya.ResourceVersion.enable("version.json", Laya.Handler.create(this, this.onVersionLoaded), Laya.ResourceVersion.FILENAME_VERSION);
	}

	onVersionLoaded(): void {
		//激活大小图映射，加载小图的时候，如果发现小图在大图合集里面，则优先加载大图合集，而不是小图
		Laya.AtlasInfoManager.enable("fileconfig.json", Laya.Handler.create(this, this.onConfigLoaded));
	}

	onConfigLoaded(): void {
		//加载IDE指定的场景
		//GameConfig.startScene && Laya.Scene.open(GameConfig.startScene);

		if (window['wx']) {
			let _wx = wx as any;
			let that = this;
			if (_wx && _wx.loadSubpackage) {
				const loadTask = _wx.loadSubpackage({
					name: 'LayaScene_main', // name 可以填 name 或者 root
					success: function (res) {
						// 分包加载成功后通过 success 回调
						console.log('分包加载成功');
						Laya.loader.create('LayaScene_main/Conventional/main.ls', Laya.Handler.create(that, that.onCompelt));
						Laya.Stat.show(0, 0);
					},
					fail: function (res) {
						// 分包加载失败通过 fail 回调
						console.error('分包加载失败');
					}
				})

				loadTask.onProgressUpdate(res => {
					console.log('下载进度', res.progress)
					console.log('已经下载的数据长度', res.totalBytesWritten)
					console.log('预期需要下载的数据总长度', res.totalBytesExpectedToWrite)
				})
			}
		} else {
			Laya.loader.create('LayaScene_main/Conventional/main.ls', Laya.Handler.create(this, this.onCompelt));
			Laya.Stat.show(0, 0);
		}
	}

	onCompelt(scene: Laya.Scene3D) {
		Laya.stage.addChild(scene);
		this.skeletonScene = scene;
		this.skeletonPrefab = scene._children[1] as Laya.Sprite3D;
		for (let i = 0; i < this.initAmount - 1; i++) {
			let clone = Laya.Sprite3D.instantiate(this.skeletonPrefab) as Laya.Sprite3D;
			if (i == 0) {
				clone.transform.position = new Laya.Vector3(0, 0, -this.maxZ);
			} else if (i == 1) {
				clone.transform.position = new Laya.Vector3(this.maxX / 2, 0, 0);
			} else {
				clone.transform.position = new Laya.Vector3(this.getRandomInt(this.maxX) - this.maxX / 2, 0, -this.getRandomInt(this.maxZ));
			}
			scene.addChild(clone);
		}

		this.testViewUI = new ui.TestViewUI();
		this.testViewUI.y = Laya.stage.height - this.testViewUI.height;
		this.testViewUI.plusBtn.on(Laya.Event.CLICK, this, this.onClickPlus);
		this.testViewUI.minusBtn.on(Laya.Event.CLICK, this, this.onClickMinus);
		this.testViewUI.amountText.text = (this.skeletonScene.numChildren - 1).toString();
		Laya.stage.addChild(this.testViewUI);
	}

	onClickPlus() {
		let clone = Laya.Sprite3D.instantiate(this.skeletonPrefab) as Laya.Sprite3D;
		clone.transform.position = new Laya.Vector3(this.getRandomInt(this.maxX) - this.maxX / 2, 0, -this.getRandomInt(this.maxZ));
		this.skeletonScene.addChild(clone);

		this.testViewUI.amountText.text = (this.skeletonScene.numChildren - 1).toString();
	}

	onClickMinus() {
		if (this.skeletonScene.numChildren == 1)
			return;

		this.skeletonScene.removeChildAt(this.getRandomInt(this.skeletonScene.numChildren - 1) + 1);

		this.testViewUI.amountText.text = (this.skeletonScene.numChildren - 1).toString();
	}

	getRandomInt(max: number) {
		return Math.floor(Math.random() * Math.floor(max));
	}
}
//激活启动类
new Main();
