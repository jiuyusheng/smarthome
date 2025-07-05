if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface MainPage_Params {
    currentIndex?: number;
    tabController?: TabsController;
    smartHome?: SmartHome;
    ws?: webSocket.WebSocket;
}
import { MyPage } from "@normalized:N&&&entry/src/main/ets/modelView/MyPage&";
import { ControlPage } from "@normalized:N&&&entry/src/main/ets/modelView/ControlPage&";
import { HomePage } from "@normalized:N&&&entry/src/main/ets/modelView/HomePage&";
import { FunctionPage } from "@normalized:N&&&entry/src/main/ets/modelView/FunctionPage&";
import webSocket from "@ohos:net.webSocket";
import { CommonConstants } from "@normalized:N&&&entry/src/main/ets/common/CommonConstants&";
import type { BusinessError as BusinessError } from "@ohos:base";
import { SmartHome } from "@normalized:N&&&entry/src/main/ets/model/SmartHome&";
class MainPage extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__currentIndex = new ObservedPropertySimplePU(0, this, "currentIndex");
        this.tabController = new TabsController();
        this.__smartHome = new ObservedPropertyObjectPU(new SmartHome(), this, "smartHome");
        this.addProvidedVar("smartHome", this.__smartHome, false);
        this.ws = webSocket.createWebSocket();
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: MainPage_Params) {
        if (params.currentIndex !== undefined) {
            this.currentIndex = params.currentIndex;
        }
        if (params.tabController !== undefined) {
            this.tabController = params.tabController;
        }
        if (params.smartHome !== undefined) {
            this.smartHome = params.smartHome;
        }
        if (params.ws !== undefined) {
            this.ws = params.ws;
        }
    }
    updateStateVars(params: MainPage_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__currentIndex.purgeDependencyOnElmtId(rmElmtId);
        this.__smartHome.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__currentIndex.aboutToBeDeleted();
        this.__smartHome.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    // 当前的索引值
    private __currentIndex: ObservedPropertySimplePU<number>;
    get currentIndex() {
        return this.__currentIndex.get();
    }
    set currentIndex(newValue: number) {
        this.__currentIndex.set(newValue);
    }
    private tabController: TabsController;
    // 自定义函数组件,传递 4 个参数，分别为：页签文字、当前的索引，选中时的图片路径、未选中时的图片路径
    TabBuilder(title: string, index: number, selectImg: Resource, norImg: Resource, parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create({ space: 5 });
            Column.onClick(() => {
                this.currentIndex = index;
                // 通过 TabsController 的 changeIndex 方法来实现跳转至指定索引值对应的 TabContent 内容
                this.tabController.changeIndex(index);
            });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create(this.currentIndex == index ? selectImg : norImg);
            Image.width(30);
        }, Image);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(title);
            Text.fontColor(this.currentIndex == index ? { "id": 16777227, "type": 10001, params: [], "bundleName": "com.xzgc.myapplication", "moduleName": "entry" } : Color.Black);
        }, Text);
        Text.pop();
        Column.pop();
    }
    private __smartHome: ObservedPropertyObjectPU<SmartHome>;
    get smartHome() {
        return this.__smartHome.get();
    }
    set smartHome(newValue: SmartHome) {
        this.__smartHome.set(newValue);
    }
    private ws: webSocket.WebSocket;
    aboutToAppear() {
        let defaultIpAddress = CommonConstants.amqpHost;
        this.ws.on('open', (err: BusinessError, value: Object) => {
            console.log("wsConnectServer open, status:" +
                JSON.stringify(value));
        });
        this.ws.on('message', (err: BusinessError, value: string | ArrayBuffer) => {
            console.log("wsConnectServer message, message:" + value);
            if (!err && typeof value === 'string') {
                console.log("wsConnectServer 收到数据:", value);
                const data: any = JSON.parse(`${value}`);
                console.log("wsConnectServer deviceId:", data.deviceId);
                this.smartHome = data.data[0].properties;
                console.log("wsConnectServer 设备属性:", this.smartHome);
                console.log("wsConnectServer 设备属性:", this.smartHome.lightStatus == "ON");
            }
        });
        this.ws.on('close', (err: BusinessError, value: webSocket.CloseResult) => {
            console.log("wsConnectServer close, code is " + value.code +
                ", reason is " + value.reason);
        });
        this.ws.on('error', (err: BusinessError) => {
            console.log("wsConnectServer error, error:" +
                JSON.stringify(err));
        });
        this.ws.connect(defaultIpAddress, (err: BusinessError, value) => {
            if (!err) {
                console.log("wsConnectServer Connected successfully");
            }
            else {
                console.log("wsConnectServer Connection failed. Err:" +
                    JSON.stringify(err));
            }
        });
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Tabs.create({ barPosition: BarPosition.End, controller: this.tabController });
            Tabs.onChange((index) => {
                this.currentIndex = index;
            });
        }, Tabs);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            TabContent.create(() => {
                {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        if (isInitialRender) {
                            let componentCall = new HomePage(this, {}, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/MainPage.ets", line: 74, col: 9 });
                            ViewPU.create(componentCall);
                            let paramsLambda = () => {
                                return {};
                            };
                            componentCall.paramsGenerator_ = paramsLambda;
                        }
                        else {
                            this.updateStateVarsOfChildByElmtId(elmtId, {});
                        }
                    }, { name: "HomePage" });
                }
            });
            TabContent.backgroundColor("#f1f3f5");
            TabContent.tabBar({ builder: () => {
                    this.TabBuilder.call(this, "首页", 0, { "id": 16777241, "type": 20000, params: [], "bundleName": "com.xzgc.myapplication", "moduleName": "entry" }, { "id": 16777242, "type": 20000, params: [], "bundleName": "com.xzgc.myapplication", "moduleName": "entry" });
                } });
        }, TabContent);
        TabContent.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            TabContent.create(() => {
                {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        if (isInitialRender) {
                            let componentCall = new ControlPage(this, {}, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/MainPage.ets", line: 80, col: 9 });
                            ViewPU.create(componentCall);
                            let paramsLambda = () => {
                                return {};
                            };
                            componentCall.paramsGenerator_ = paramsLambda;
                        }
                        else {
                            this.updateStateVarsOfChildByElmtId(elmtId, {});
                        }
                    }, { name: "ControlPage" });
                }
            });
            TabContent.backgroundColor("#f1f3f5");
            TabContent.tabBar({ builder: () => {
                    this.TabBuilder.call(this, "控制", 1, { "id": 16777234, "type": 20000, params: [], "bundleName": "com.xzgc.myapplication", "moduleName": "entry" }, { "id": 16777235, "type": 20000, params: [], "bundleName": "com.xzgc.myapplication", "moduleName": "entry" });
                } });
        }, TabContent);
        TabContent.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            TabContent.create(() => {
                {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        if (isInitialRender) {
                            let componentCall = new FunctionPage(this, {}, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/MainPage.ets", line: 85, col: 9 });
                            ViewPU.create(componentCall);
                            let paramsLambda = () => {
                                return {};
                            };
                            componentCall.paramsGenerator_ = paramsLambda;
                        }
                        else {
                            this.updateStateVarsOfChildByElmtId(elmtId, {});
                        }
                    }, { name: "FunctionPage" });
                }
            });
            TabContent.backgroundColor("#f1f3f5");
            TabContent.tabBar({ builder: () => {
                    this.TabBuilder.call(this, "功能", 2, { "id": 16777258, "type": 20000, params: [], "bundleName": "com.xzgc.myapplication", "moduleName": "entry" }, { "id": 16777263, "type": 20000, params: [], "bundleName": "com.xzgc.myapplication", "moduleName": "entry" });
                } });
        }, TabContent);
        TabContent.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            TabContent.create(() => {
                {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        if (isInitialRender) {
                            let componentCall = new MyPage(this, {}, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/MainPage.ets", line: 90, col: 9 });
                            ViewPU.create(componentCall);
                            let paramsLambda = () => {
                                return {};
                            };
                            componentCall.paramsGenerator_ = paramsLambda;
                        }
                        else {
                            this.updateStateVarsOfChildByElmtId(elmtId, {});
                        }
                    }, { name: "MyPage" });
                }
            });
            TabContent.backgroundColor("#f1f3f5");
            TabContent.tabBar({ builder: () => {
                    this.TabBuilder.call(this, "我的", 3, { "id": 16777245, "type": 20000, params: [], "bundleName": "com.xzgc.myapplication", "moduleName": "entry" }, { "id": 16777246, "type": 20000, params: [], "bundleName": "com.xzgc.myapplication", "moduleName": "entry" });
                } });
        }, TabContent);
        TabContent.pop();
        Tabs.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
    static getEntryName(): string {
        return "MainPage";
    }
}
registerNamedRoute(() => new MainPage(undefined, {}), "", { bundleName: "com.xzgc.myapplication", moduleName: "entry", pagePath: "pages/MainPage", pageFullPath: "entry/src/main/ets/pages/MainPage", integratedHsp: "false", moduleType: "followWithHap" });
