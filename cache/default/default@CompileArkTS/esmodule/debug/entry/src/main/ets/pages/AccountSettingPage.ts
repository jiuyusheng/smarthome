if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface AccountSettingPage_Params {
    avatar?: string;
    nickname?: string;
    phone?: string;
    gender?: string;
    region?: string;
    signature?: string;
}
import router from "@ohos:router";
import promptAction from "@ohos:promptAction";
interface GenderOption {
    value: string;
    label: string;
}
const genderOptions: GenderOption[] = [
    { value: '男', label: '男' },
    { value: '女', label: '女' },
    { value: '保密', label: '保密' }
];
class AccountSettingPage extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__avatar = new ObservedPropertySimplePU('', this, "avatar");
        this.__nickname = new ObservedPropertySimplePU('羽笙凤籁队', this, "nickname");
        this.__phone = new ObservedPropertySimplePU('13856025327', this, "phone");
        this.__gender = new ObservedPropertySimplePU('保密', this, "gender");
        this.__region = new ObservedPropertySimplePU('中国', this, "region");
        this.__signature = new ObservedPropertySimplePU('加油ヾ(◍°∇°◍)ﾉﾞ', this, "signature");
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: AccountSettingPage_Params) {
        if (params.avatar !== undefined) {
            this.avatar = params.avatar;
        }
        if (params.nickname !== undefined) {
            this.nickname = params.nickname;
        }
        if (params.phone !== undefined) {
            this.phone = params.phone;
        }
        if (params.gender !== undefined) {
            this.gender = params.gender;
        }
        if (params.region !== undefined) {
            this.region = params.region;
        }
        if (params.signature !== undefined) {
            this.signature = params.signature;
        }
    }
    updateStateVars(params: AccountSettingPage_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__avatar.purgeDependencyOnElmtId(rmElmtId);
        this.__nickname.purgeDependencyOnElmtId(rmElmtId);
        this.__phone.purgeDependencyOnElmtId(rmElmtId);
        this.__gender.purgeDependencyOnElmtId(rmElmtId);
        this.__region.purgeDependencyOnElmtId(rmElmtId);
        this.__signature.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__avatar.aboutToBeDeleted();
        this.__nickname.aboutToBeDeleted();
        this.__phone.aboutToBeDeleted();
        this.__gender.aboutToBeDeleted();
        this.__region.aboutToBeDeleted();
        this.__signature.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __avatar: ObservedPropertySimplePU<string>;
    get avatar() {
        return this.__avatar.get();
    }
    set avatar(newValue: string) {
        this.__avatar.set(newValue);
    }
    private __nickname: ObservedPropertySimplePU<string>;
    get nickname() {
        return this.__nickname.get();
    }
    set nickname(newValue: string) {
        this.__nickname.set(newValue);
    }
    private __phone: ObservedPropertySimplePU<string>;
    get phone() {
        return this.__phone.get();
    }
    set phone(newValue: string) {
        this.__phone.set(newValue);
    }
    private __gender: ObservedPropertySimplePU<string>;
    get gender() {
        return this.__gender.get();
    }
    set gender(newValue: string) {
        this.__gender.set(newValue);
    }
    private __region: ObservedPropertySimplePU<string>;
    get region() {
        return this.__region.get();
    }
    set region(newValue: string) {
        this.__region.set(newValue);
    }
    private __signature: ObservedPropertySimplePU<string>;
    get signature() {
        return this.__signature.get();
    }
    set signature(newValue: string) {
        this.__signature.set(newValue);
    }
    saveInfo() {
        promptAction.showToast({ message: '保存成功' });
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create({ space: 24 });
            Column.width('100%');
            Column.alignItems(HorizontalAlign.Center);
            Column.justifyContent(FlexAlign.Center);
            Column.height('100%');
            Column.backgroundColor('#fff');
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('账号设置');
            Text.fontSize(24);
            Text.fontWeight(FontWeight.Bold);
            Text.align(Alignment.Center);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 头像、昵称分组
            Row.create();
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create(this.avatar ? this.avatar : { "id": 16777252, "type": 20000, params: [], "bundleName": "com.xzgc.myapplication", "moduleName": "entry" });
            Image.width(70);
            Image.height(70);
            Image.borderRadius(35);
            Image.onClick(() => { promptAction.showToast({ message: '请选择图片功能待开发/当前SDK不支持' }); });
        }, Image);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create({ space: 8 });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('昵称:');
            Text.fontWeight(FontWeight.Bold);
            Text.width(80);
            Text.textAlign(TextAlign.Start);
            Text.height(40);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            TextInput.create({ text: this.nickname, placeholder: '请输入昵称' });
            TextInput.width(180);
            TextInput.height(40);
            TextInput.onChange((v: string) => { this.nickname = v; });
        }, TextInput);
        Row.pop();
        Column.pop();
        // 头像、昵称分组
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Divider.create();
            Divider.strokeWidth(1);
            Divider.color('#e0e0e0');
        }, Divider);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 联系方式分组
            Row.create();
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('手机号:');
            Text.fontWeight(FontWeight.Bold);
            Text.width(80);
            Text.textAlign(TextAlign.Start);
            Text.height(40);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            TextInput.create({ text: this.phone, placeholder: '请输入手机号' });
            TextInput.width(180);
            TextInput.height(40);
            TextInput.onChange((v: string) => { this.phone = v; });
        }, TextInput);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel('更换');
            Button.margin({ left: 8 });
            Button.height(40);
            Button.onClick(() => { promptAction.showToast({ message: '更换手机号功能待开发' }); });
        }, Button);
        Button.pop();
        // 联系方式分组
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Divider.create();
            Divider.strokeWidth(1);
            Divider.color('#e0e0e0');
        }, Divider);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 个人信息分组
            Row.create();
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('性别:');
            Text.fontWeight(FontWeight.Bold);
            Text.width(80);
            Text.textAlign(TextAlign.Start);
            Text.height(40);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Select.create(genderOptions);
            Select.width(180);
            Select.height(40);
            Select.onSelect((index: number) => { this.gender = genderOptions[index].value; });
        }, Select);
        Select.pop();
        // 个人信息分组
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('地区:');
            Text.fontWeight(FontWeight.Bold);
            Text.width(80);
            Text.textAlign(TextAlign.Start);
            Text.height(40);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            TextInput.create({ text: this.region, placeholder: '请输入地区' });
            TextInput.width(180);
            TextInput.height(40);
            TextInput.onChange((v: string) => { this.region = v; });
        }, TextInput);
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('个性签名:');
            Text.fontWeight(FontWeight.Bold);
            Text.width(80);
            Text.textAlign(TextAlign.Start);
            Text.height(40);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            TextInput.create({ text: this.signature, placeholder: '请输入个性签名' });
            TextInput.width(180);
            TextInput.height(40);
            TextInput.onChange((v: string) => { this.signature = v; });
        }, TextInput);
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Divider.create();
            Divider.strokeWidth(1);
            Divider.color('#e0e0e0');
        }, Divider);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 安全设置分组
            Button.createWithLabel('安全设置');
            // 安全设置分组
            Button.type(ButtonType.Normal);
            // 安全设置分组
            Button.width('80%');
            // 安全设置分组
            Button.onClick(() => { promptAction.showToast({ message: '安全设置功能待开发' }); });
        }, Button);
        // 安全设置分组
        Button.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 保存分组
            Button.createWithLabel('保存');
            // 保存分组
            Button.type(ButtonType.Normal);
            // 保存分组
            Button.width('80%');
            // 保存分组
            Button.fontColor('#fff');
            // 保存分组
            Button.backgroundColor('#1677FF');
            // 保存分组
            Button.onClick(() => { this.saveInfo(); });
        }, Button);
        // 保存分组
        Button.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel('返回');
            Button.type(ButtonType.Normal);
            Button.width('80%');
            Button.onClick(() => { router.pushUrl({ url: 'pages/MainPage' }); });
        }, Button);
        Button.pop();
        Column.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
    static getEntryName(): string {
        return "AccountSettingPage";
    }
}
registerNamedRoute(() => new AccountSettingPage(undefined, {}), "", { bundleName: "com.xzgc.myapplication", moduleName: "entry", pagePath: "pages/AccountSettingPage", pageFullPath: "entry/src/main/ets/pages/AccountSettingPage", integratedHsp: "false", moduleType: "followWithHap" });
