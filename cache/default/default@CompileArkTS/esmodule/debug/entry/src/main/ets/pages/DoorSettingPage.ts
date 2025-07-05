if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface DoorSettingPage_Params {
    doorOpen?: boolean;
    notifyEnabled?: boolean;
}
import router from "@ohos:router";
import promptAction from "@ohos:promptAction";
class DoorSettingPage extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__doorOpen = new ObservedPropertySimplePU(false, this, "doorOpen");
        this.__notifyEnabled = new ObservedPropertySimplePU(true, this, "notifyEnabled");
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: DoorSettingPage_Params) {
        if (params.doorOpen !== undefined) {
            this.doorOpen = params.doorOpen;
        }
        if (params.notifyEnabled !== undefined) {
            this.notifyEnabled = params.notifyEnabled;
        }
    }
    updateStateVars(params: DoorSettingPage_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__doorOpen.purgeDependencyOnElmtId(rmElmtId);
        this.__notifyEnabled.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__doorOpen.aboutToBeDeleted();
        this.__notifyEnabled.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __doorOpen: ObservedPropertySimplePU<boolean>;
    get doorOpen() {
        return this.__doorOpen.get();
    }
    set doorOpen(newValue: boolean) {
        this.__doorOpen.set(newValue);
    }
    private __notifyEnabled: ObservedPropertySimplePU<boolean>;
    get notifyEnabled() {
        return this.__notifyEnabled.get();
    }
    set notifyEnabled(newValue: boolean) {
        this.__notifyEnabled.set(newValue);
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('100%');
            Column.height('100%');
            Column.backgroundColor('#fff');
            Column.alignItems(HorizontalAlign.Center);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('门禁设置');
            Text.fontSize(24);
            Text.fontWeight(FontWeight.Bold);
            Text.margin({ top: 50, bottom: 30 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.alignItems(VerticalAlign.Center);
            Row.margin({ bottom: 16 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('远程开门:');
            Text.fontWeight(FontWeight.Bold);
            Text.width(80);
            Text.textAlign(TextAlign.End);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel(this.doorOpen ? '关门' : '开门');
            Button.type(ButtonType.Normal);
            Button.width(100);
            Button.margin({ left: 20 });
            Button.onClick(() => {
                this.doorOpen = !this.doorOpen;
                promptAction.showToast({ message: this.doorOpen ? '门已打开' : '门已关闭' });
            });
        }, Button);
        Button.pop();
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.alignItems(VerticalAlign.Center);
            Row.margin({ bottom: 16 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('门禁通知:');
            Text.fontWeight(FontWeight.Bold);
            Text.width(80);
            Text.textAlign(TextAlign.End);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.margin({ left: 20 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Checkbox.create();
            Checkbox.select(this.notifyEnabled);
            Checkbox.onChange((v: boolean) => {
                this.notifyEnabled = v;
                promptAction.showToast({ message: v ? '已开启通知' : '已关闭通知' });
            });
        }, Checkbox);
        Checkbox.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.notifyEnabled ? '已开启' : '已关闭');
            Text.fontColor('#1677FF');
            Text.margin({ left: 10 });
        }, Text);
        Text.pop();
        Row.pop();
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('门禁记录');
            Text.fontWeight(FontWeight.Bold);
            Text.margin({ top: 20, bottom: 10 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('2024-06-01 08:00 远程开门');
            Text.margin({ bottom: 2 });
            Text.align(Alignment.Center);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('2024-05-31 18:30 门禁异常报警');
            Text.align(Alignment.Center);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Blank.create();
        }, Blank);
        Blank.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel('返回');
            Button.type(ButtonType.Normal);
            Button.width('80%');
            Button.margin({ bottom: 30, top: 30 });
            Button.onClick(() => { router.pushUrl({ url: 'pages/MainPage' }); });
        }, Button);
        Button.pop();
        Column.pop();
        Column.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
    static getEntryName(): string {
        return "DoorSettingPage";
    }
}
registerNamedRoute(() => new DoorSettingPage(undefined, {}), "", { bundleName: "com.xzgc.myapplication", moduleName: "entry", pagePath: "pages/DoorSettingPage", pageFullPath: "entry/src/main/ets/pages/DoorSettingPage", integratedHsp: "false", moduleType: "followWithHap" });
