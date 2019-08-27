import { _decorator, Component, Node, loader } from "cc";
const { ccclass, property } = _decorator;

@ccclass("SubLoader")
export class SubLoader extends Component {
    /* class member could be defined like this */
    // dummy = '';

    /* use `property` decorator if your want the member to be serializable */
    // @property
    // serializableDummy = 0;

    start () {
        // Your initialization goes here.
        if (window.wx) {
            let _wx = window.wx as any;
            let that = this;
            if (_wx && _wx.loadSubpackage) {
                const loadTask = _wx.loadSubpackage({
                    name: 'sintel', // name 可以填 name 或者 root
                    success: function (res) {
                        // 分包加载成功后通过 success 回调
                        console.log('分包加载成功');
                        cc.director.loadScene('main');
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
            cc.director.loadScene('main');
        }
    }

}
