if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface ControlPage_Params {
    smartHome?: SmartHome;
    token?: string;
}
import { CommonConstants } from "@normalized:N&&&entry/src/main/ets/common/CommonConstants&";
import type { SmartHome } from "../model/SmartHome";
import http from "@ohos:net.http";
import promptAction from "@ohos:promptAction";
export class ControlPage extends ViewPU {
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
    setInitiallyProvidedValue(params: ControlPage_Params) {
    }
    updateStateVars(params: ControlPage_Params) {
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
    controll_device(commonName: string, switchName: string) {
        let httpRequest: http.HttpRequest = http.createHttp();
        httpRequest.request(CommonConstants.CONTROL_DEVICE, {
            method: http.RequestMethod.POST,
            header: {
                'Content-Type': 'application/json',
                'X-Auth-Token': this.token,
                'Instance-Id': CommonConstants.Instance_Id
            },
            connectTimeout: 30000,
            readTimeout: 40000,
            extraData: {
                "service_id": "smartHome",
                "command_name": commonName,
                "paras": {
                    "switch": switchName
                }
            }
        }).then((data) => {
            console.info("httpRequest httpCommons success:" +
                JSON.stringify(data));
            let response: any = JSON.parse(`${data.result}`);
            if (response.command_id != null) {
                if (commonName == "light_control") {
                    this.smartHome.lightStatus = switchName;
                }
                else if (commonName == "motor_control") {
                    this.smartHome.motorStatus = switchName;
                }
            }
            else if (response.error_msg != null) {
                promptAction.showToast({
                    message: "设备响应失败：" + response.error_msg
                });
            }
        })
            .catch((err: Object) => {
            console.info("httpRequest httpCommons:" +
                JSON.stringify(err));
            promptAction.showDialog({
                message: "设备连接失败：" + JSON.stringify(err)
            });
        });
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            RelativeContainer.create();
            RelativeContainer.height('100%');
            RelativeContainer.width('100%');
            RelativeContainer.backgroundColor('#FFF9F0');
        }, RelativeContainer);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create({ space: 10 });
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
            Text.create('设备控制');
            Text.fontSize(32);
            Text.fontWeight(FontWeight.Bold);
            Text.margin({ bottom: 10 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create({ space: 20 });
            Column.width(CommonConstants.CONTENT_SIZE);
            Column.height(400);
            Column.backgroundColor('#FFF6E6');
            Column.borderRadius(10);
            Column.justifyContent(FlexAlign.SpaceAround);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width("100%");
            Row.justifyContent(FlexAlign.SpaceAround);
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create(this.smartHome?.lightStatus == "ON" ? { "id": 16777238, "type": 20000, params: [], "bundleName": "com.xzgc.myapplication", "moduleName": "entry" } : { "id": 16777237, "type": 20000, params: [], "bundleName": "com.xzgc.myapplication", "moduleName": "entry" });
            Image.width(100);
            Image.height(100);
        }, Image);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel(this.smartHome?.lightStatus == "ON" ? '关灯' :
                '开灯', { type: ButtonType.Capsule, stateEffect: false });
            Button.backgroundColor(this.smartHome?.lightStatus ==
                "ON" ? '#FF9966' : '#FFE4CC');
            Button.fontColor(this.smartHome?.lightStatus == "ON" ? '#FFFFFF' : '#666666');
            Button.width(80);
            Button.height(30);
            Button.margin({ top: 10 });
            Button.onClick(() => {
                if (this.smartHome?.lightStatus == "ON") {
                    this.controll_device("light_control", "OFF");
                }
                else {
                    this.controll_device("light_control", "ON");
                }
            });
        }, Button);
        Button.pop();
        Column.pop();
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create(this.smartHome?.motorStatus == "ON" ? { "id": 16777255, "type": 20000, params: [], "bundleName": "com.xzgc.myapplication", "moduleName": "entry" } : { "id": 16777254, "type": 20000, params: [], "bundleName": "com.xzgc.myapplication", "moduleName": "entry" });
            Image.width(100);
            Image.height(100);
        }, Image);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel(this.smartHome?.motorStatus == "ON" ? '关闭投影仪' : '打开投影仪', { type: ButtonType.Capsule, stateEffect: false });
            Button.backgroundColor(this.smartHome?.motorStatus ==
                "ON" ? '#FF9966' : '#FFE4CC');
            Button.fontColor(this.smartHome?.motorStatus == "ON" ? '#FFFFFF' : '#666666');
            Button.width(120);
            Button.height(30);
            Button.margin({ top: 10 });
            Button.onClick(() => {
                if (this.smartHome?.motorStatus == "ON") {
                    this.controll_device("motor_control", "OFF");
                }
                else {
                    this.controll_device("motor_control", "ON");
                }
            });
        }, Button);
        Button.pop();
        Column.pop();
        Column.pop();
        Column.pop();
        RelativeContainer.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
