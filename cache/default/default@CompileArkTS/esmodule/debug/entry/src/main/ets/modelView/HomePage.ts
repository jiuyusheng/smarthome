if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface HomePage_Params {
    smartHome?: SmartHome;
    token?: string;
}
import { CommonConstants } from "@normalized:N&&&entry/src/main/ets/common/CommonConstants&";
import type { SmartHome } from "../model/SmartHome";
import http from "@ohos:net.http";
export class HomePage extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__smartHome = this.initializeConsume("smartHome", "smartHome");
        this.__token = this.createStorageLink("token", "", "token");
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: HomePage_Params) {
    }
    updateStateVars(params: HomePage_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__smartHome.purgeDependencyOnElmtId(rmElmtId);
        this.__token.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__smartHome.aboutToBeDeleted();
        this.__token.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __smartHome: ObservedPropertyAbstractPU<SmartHome>;
    get smartHome() {
        return this.__smartHome.get();
    }
    set smartHome(newValue: SmartHome) {
        this.__smartHome.set(newValue);
    }
    private __token: ObservedPropertyAbstractPU<string>;
    get token() {
        return this.__token.get();
    }
    set token(newValue: string) {
        this.__token.set(newValue);
    }
    aboutToAppear(): void {
        this.getDeviceMessage();
    }
    getDeviceMessage() {
        let httpRequest: http.HttpRequest = http.createHttp();
        httpRequest.request(CommonConstants.SHADOW_DEVICE, {
            method: http.RequestMethod.GET,
            header: {
                'Content-Type': 'application/json',
                'X-Auth-Token': this.token,
                'Instance-Id': CommonConstants.Instance_Id
            },
            extraData: ""
        }).then((data) => {
            console.info("httpRequest device message success:" + JSON.stringify(data.result));
            let result: any = JSON.parse(`${data.result}`);
            this.smartHome = result?.shadow[0].reported?.properties;
        }).catch((err: Object) => {
            console.info("httpRequest queryDev err:" + JSON.stringify(err));
        });
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('100%');
            Column.height('100%');
            Column.backgroundColor('#FFF9F0');
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('100%');
            Column.height(180);
            Column.backgroundImage({ "id": 16777232, "type": 20000, params: [], "bundleName": "com.xzgc.myapplication", "moduleName": "entry" });
            Column.backgroundImageSize(ImageSize.Cover);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('环境监测与人体感应系统');
            Text.fontColor('#FFFFFF');
            Text.fontSize(32);
            Text.fontWeight(FontWeight.Bold);
        }, Text);
        Text.pop();
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width(CommonConstants.CONTENT_SIZE);
            Row.justifyContent(FlexAlign.SpaceBetween);
            Row.height(100);
            Row.margin({ top: 20, bottom: 20 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create({ space: 3 });
            Column.backgroundColor('#FFF6E6');
            Column.padding(12);
            Column.borderRadius(12);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create({ "id": 16777240, "type": 20000, params: [], "bundleName": "com.xzgc.myapplication", "moduleName": "entry" });
            Image.width(50);
        }, Image);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('光照');
            Text.fontWeight(FontWeight.Bold);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.smartHome?.illumination ? this.smartHome.illumination : "--");
            Text.fontWeight(FontWeight.Bold);
        }, Text);
        Text.pop();
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 温度
            Column.create({ space: 3 });
            // 温度
            Column.backgroundColor('#FFF6E6');
            // 温度
            Column.padding(12);
            // 温度
            Column.borderRadius(12);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create({ "id": 16777257, "type": 20000, params: [], "bundleName": "com.xzgc.myapplication", "moduleName": "entry" });
            Image.width(50);
        }, Image);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('温度');
            Text.fontWeight(FontWeight.Bold);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.smartHome?.temperature ? this.smartHome.temperature : "--");
            Text.fontWeight(FontWeight.Bold);
        }, Text);
        Text.pop();
        // 温度
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 湿度
            Column.create({ space: 3 });
            // 湿度
            Column.backgroundColor('#FFF6E6');
            // 湿度
            Column.padding(12);
            // 湿度
            Column.borderRadius(12);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create({ "id": 16777250, "type": 20000, params: [], "bundleName": "com.xzgc.myapplication", "moduleName": "entry" });
            Image.width(50);
        }, Image);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('湿度');
            Text.fontWeight(FontWeight.Bold);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.smartHome?.humidity ? this.smartHome.humidity : "--");
            Text.fontWeight(FontWeight.Bold);
        }, Text);
        Text.pop();
        // 湿度
        Column.pop();
        Row.pop();
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 设备状态模块
            Column.create();
            // 设备状态模块
            Column.width(CommonConstants.CONTENT_SIZE);
            // 设备状态模块
            Column.margin({ top: 20 });
            // 设备状态模块
            Column.alignItems(HorizontalAlign.Start);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('设备状态');
            Text.fontSize(32);
            Text.fontWeight(FontWeight.Bold);
            Text.margin({ bottom: 10 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Grid.create();
            Grid.columnsTemplate('1fr 1fr');
            Grid.rowsTemplate('1fr 1fr');
            Grid.columnsGap(10);
            Grid.rowsGap(10);
            Grid.width('100%');
            Grid.height(300);
        }, Grid);
        {
            const itemCreation2 = (elmtId, isInitialRender) => {
                GridItem.create(() => { }, false);
                GridItem.width('100%');
                GridItem.height(120);
                GridItem.backgroundColor('#FFF6E6');
                GridItem.borderRadius(10);
            };
            const observedDeepRender = () => {
                this.observeComponentCreation2(itemCreation2, GridItem);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    // 教室灯
                    Column.create({ space: 10 });
                }, Column);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Row.create();
                    __Row__rowBgStyle();
                }, Row);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Image.create(this.smartHome?.lightStatus == "ON" ? { "id": 16777238, "type": 20000, params: [], "bundleName": "com.xzgc.myapplication", "moduleName": "entry" } : { "id": 16777237, "type": 20000, params: [], "bundleName": "com.xzgc.myapplication", "moduleName": "entry" });
                }, Image);
                Row.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Text.create();
                }, Text);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Span.create('教室灯：');
                }, Span);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    If.create();
                    if (this.smartHome?.lightStatus == "ON") {
                        this.ifElseBranchUpdateFunction(0, () => {
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                Span.create("已打开");
                                Span.fontColor(Color.Red);
                            }, Span);
                        });
                    }
                    else {
                        this.ifElseBranchUpdateFunction(1, () => {
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                Span.create("已关闭");
                            }, Span);
                        });
                    }
                }, If);
                If.pop();
                Text.pop();
                // 教室灯
                Column.pop();
                GridItem.pop();
            };
            observedDeepRender();
        }
        {
            const itemCreation2 = (elmtId, isInitialRender) => {
                GridItem.create(() => { }, false);
                GridItem.width('100%');
                GridItem.height(120);
                GridItem.backgroundColor('#FFF6E6');
                GridItem.borderRadius(10);
            };
            const observedDeepRender = () => {
                this.observeComponentCreation2(itemCreation2, GridItem);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    // 投影仪
                    Column.create({ space: 10 });
                }, Column);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Row.create();
                    __Row__rowBgStyle();
                }, Row);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Image.create(this.smartHome?.motorStatus == "ON" ? { "id": 16777255, "type": 20000, params: [], "bundleName": "com.xzgc.myapplication", "moduleName": "entry" } : { "id": 16777254, "type": 20000, params: [], "bundleName": "com.xzgc.myapplication", "moduleName": "entry" });
                }, Image);
                Row.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Text.create();
                }, Text);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Span.create('投影仪：');
                }, Span);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    If.create();
                    if (this.smartHome?.motorStatus == "ON") {
                        this.ifElseBranchUpdateFunction(0, () => {
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                Span.create("已启动");
                                Span.fontColor(Color.Red);
                            }, Span);
                        });
                    }
                    else {
                        this.ifElseBranchUpdateFunction(1, () => {
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                Span.create("已关机");
                            }, Span);
                        });
                    }
                }, If);
                If.pop();
                Text.pop();
                // 投影仪
                Column.pop();
                GridItem.pop();
            };
            observedDeepRender();
        }
        {
            const itemCreation2 = (elmtId, isInitialRender) => {
                GridItem.create(() => { }, false);
                GridItem.width('100%');
                GridItem.height(120);
                GridItem.backgroundColor('#FFF6E6');
                GridItem.borderRadius(10);
            };
            const observedDeepRender = () => {
                this.observeComponentCreation2(itemCreation2, GridItem);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    // 人体感应：有人、无人
                    Column.create({ space: 10 });
                }, Column);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Row.create();
                    __Row__rowBgStyle();
                }, Row);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Image.create({ "id": 16777239, "type": 20000, params: [], "bundleName": "com.xzgc.myapplication", "moduleName": "entry" });
                }, Image);
                Row.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Text.create();
                }, Text);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Span.create('门口：');
                }, Span);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    If.create();
                    if (this.smartHome?.bodyState == "ON") {
                        this.ifElseBranchUpdateFunction(0, () => {
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                Span.create("有人");
                                Span.fontColor(Color.Red);
                            }, Span);
                        });
                    }
                    else {
                        this.ifElseBranchUpdateFunction(1, () => {
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                Span.create("无人");
                            }, Span);
                        });
                    }
                }, If);
                If.pop();
                Text.pop();
                // 人体感应：有人、无人
                Column.pop();
                GridItem.pop();
            };
            observedDeepRender();
        }
        {
            const itemCreation2 = (elmtId, isInitialRender) => {
                GridItem.create(() => { }, false);
                GridItem.width('100%');
                GridItem.height(120);
                GridItem.backgroundColor('#FFF6E6');
                GridItem.borderRadius(10);
            };
            const observedDeepRender = () => {
                this.observeComponentCreation2(itemCreation2, GridItem);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    // 报警器
                    Column.create({ space: 10 });
                }, Column);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Row.create();
                    __Row__rowBgStyle();
                }, Row);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Image.create({ "id": 16777247, "type": 20000, params: [], "bundleName": "com.xzgc.myapplication", "moduleName": "entry" });
                }, Image);
                Row.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Text.create();
                }, Text);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Span.create('报警器：');
                }, Span);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    If.create();
                    if (this.smartHome?.alarmLightState == "ON") {
                        this.ifElseBranchUpdateFunction(0, () => {
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                Span.create("已启动");
                                Span.fontColor(Color.Red);
                            }, Span);
                        });
                    }
                    else {
                        this.ifElseBranchUpdateFunction(1, () => {
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                Span.create("未启动");
                            }, Span);
                        });
                    }
                }, If);
                If.pop();
                Text.pop();
                // 报警器
                Column.pop();
                GridItem.pop();
            };
            observedDeepRender();
        }
        Grid.pop();
        // 设备状态模块
        Column.pop();
        Column.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
// 图标白色圆背景
function __Row__rowBgStyle(): void {
    Row.width(60);
    Row.height(60);
    Row.borderRadius(30);
    Row.backgroundColor('#FFE4CC');
    Row.justifyContent(FlexAlign.Center);
}
