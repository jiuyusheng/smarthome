if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface FunctionPage_Params {
    sensors?: SensorItem[];
}
import { CommonConstants } from "@normalized:N&&&entry/src/main/ets/common/CommonConstants&";
interface SensorItem {
    name: string;
    icon: Resource;
    status: string;
}
export class FunctionPage extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__sensors = new ObservedPropertyObjectPU([
            {
                name: '温度传感器',
                icon: { "id": 16777257, "type": 20000, params: [], "bundleName": "com.xzgc.myapplication", "moduleName": "entry" },
                status: '正常'
            },
            {
                name: '湿度传感器',
                icon: { "id": 16777250, "type": 20000, params: [], "bundleName": "com.xzgc.myapplication", "moduleName": "entry" },
                status: '正常'
            },
            {
                name: '人体感应传感器',
                icon: { "id": 16777239, "type": 20000, params: [], "bundleName": "com.xzgc.myapplication", "moduleName": "entry" },
                status: '正常'
            },
            {
                name: '加速度计传感器',
                icon: { "id": 16777264, "type": 20000, params: [], "bundleName": "com.xzgc.myapplication", "moduleName": "entry" },
                status: '正常'
            },
            {
                name: '气体传感器',
                icon: { "id": 16777265, "type": 20000, params: [], "bundleName": "com.xzgc.myapplication", "moduleName": "entry" },
                status: '正常'
            },
            {
                name: '光照强度传感器',
                icon: { "id": 16777240, "type": 20000, params: [], "bundleName": "com.xzgc.myapplication", "moduleName": "entry" },
                status: '正常'
            }
        ], this, "sensors");
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: FunctionPage_Params) {
        if (params.sensors !== undefined) {
            this.sensors = params.sensors;
        }
    }
    updateStateVars(params: FunctionPage_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__sensors.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__sensors.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __sensors: ObservedPropertyObjectPU<SensorItem[]>;
    get sensors() {
        return this.__sensors.get();
    }
    set sensors(newValue: SensorItem[]) {
        this.__sensors.set(newValue);
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('100%');
            Column.height('100%');
            Column.backgroundColor('#FFF9F0');
            Column.alignItems(HorizontalAlign.Center);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('传感器功能');
            Text.fontSize(24);
            Text.fontWeight(FontWeight.Bold);
            Text.margin({ top: 50, bottom: 30 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            List.create();
            List.width(CommonConstants.CONTENT_SIZE);
            List.margin({ top: 12 });
        }, List);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            ForEach.create();
            const forEachItemGenFunction = _item => {
                const item = _item;
                {
                    const itemCreation = (elmtId, isInitialRender) => {
                        ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                        itemCreation2(elmtId, isInitialRender);
                        if (!isInitialRender) {
                            ListItem.pop();
                        }
                        ViewStackProcessor.StopGetAccessRecording();
                    };
                    const itemCreation2 = (elmtId, isInitialRender) => {
                        ListItem.create(deepRenderFunction, true);
                        ListItem.margin({ bottom: 12 });
                    };
                    const deepRenderFunction = (elmtId, isInitialRender) => {
                        itemCreation(elmtId, isInitialRender);
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Row.create();
                            Row.width('100%');
                            Row.height(50);
                            Row.justifyContent(FlexAlign.SpaceBetween);
                            Row.padding({ left: 16, right: 16 });
                            Row.backgroundColor('#FFFFFF');
                            Row.borderRadius(8);
                        }, Row);
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Row.create({ space: 12 });
                        }, Row);
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Image.create(item.icon);
                            Image.width(24);
                            Image.height(24);
                            Image.objectFit(ImageFit.Contain);
                        }, Image);
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Text.create(item.name);
                            Text.fontSize(16);
                            Text.fontWeight(FontWeight.Medium);
                        }, Text);
                        Text.pop();
                        Row.pop();
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Text.create(item.status);
                            Text.fontSize(14);
                            Text.fontColor('#666666');
                        }, Text);
                        Text.pop();
                        Row.pop();
                        ListItem.pop();
                    };
                    this.observeComponentCreation2(itemCreation2, ListItem);
                    ListItem.pop();
                }
            };
            this.forEachUpdateFunction(elmtId, this.sensors, forEachItemGenFunction, (item: SensorItem) => item.name, false, false);
        }, ForEach);
        ForEach.pop();
        List.pop();
        Column.pop();
        Column.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
