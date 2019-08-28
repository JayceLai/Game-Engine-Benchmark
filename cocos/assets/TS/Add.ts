import { _decorator, Component, Node, LabelComponent, Prefab, math, instantiate, profiler } from "cc";
const { ccclass, property } = _decorator;

@ccclass('Add')
export class Add extends Component {

    @property({ type: Prefab })
    public TestPrefab: Prefab = null

    private _rangex = 0;
    private _rangez = 0;
    private _number = 30;

    private _i = 0;

    private _text: LabelComponent = null;

    // LIFE-CYCLE CALLBACKS:
    onLoad () {
        const canvas = this.node.scene.getChildByName('Canvas') as Node;
        const text = canvas.getChildByName('number') as Node;
        this._text = text.getComponent(LabelComponent);
    }

    start () {
        for (this._i; this._i < this._number; this._i++) {
            this._rangex = math.randomRange(-3, 3);
            this._rangez = math.randomRange(0, 20);
            this.PrefabTest();
        }
        
        this._text.string = this._number.toString();

        profiler.showStats();
    }

    Addtest () {
        this._number++;
        this._text.string = this._number.toString();
        this._rangex = math.randomRange(-3, 3);
        this._rangez = math.randomRange(0, 20);
        this.PrefabTest();
    }

    subtracttest () {
        if (this.node.scene.getChildByName('sintel@01') != null) {
            this._number--;
            this._text.string = this._number.toString();
            const test = this.node.scene.getChildByName('sintel@01');
            test.destroy();
        }
    }

    PrefabTest () {
        var scene = this.node.scene;
        var newTest = instantiate(this.TestPrefab);
        scene.addChild(newTest);
        newTest.setPosition(this.node.getPosition().x - this._rangex, 0, this.node.getPosition().z - this._rangez - 5);
    }
}