if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface Index_Params {
    username?: string;
    password?: string;
    isSelect?: boolean;
    token?: string;
}
import http from "@ohos:net.http";
import promptAction from "@ohos:promptAction";
import router from "@ohos:router";
import { CommonConstants } from "@normalized:N&&&entry/src/main/ets/common/CommonConstants&";
class Index extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__username = new ObservedPropertySimplePU("huaweiyun", this, "username");
        this.__password = new ObservedPropertySimplePU("Hwy1023174147", this, "password");
        this.__isSelect = new ObservedPropertySimplePU(false, this, "isSelect");
        this.__token = this.createStorageLink("token", "", "token");
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: Index_Params) {
        if (params.username !== undefined) {
            this.username = params.username;
        }
        if (params.password !== undefined) {
            this.password = params.password;
        }
        if (params.isSelect !== undefined) {
            this.isSelect = params.isSelect;
        }
    }
    updateStateVars(params: Index_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__username.purgeDependencyOnElmtId(rmElmtId);
        this.__password.purgeDependencyOnElmtId(rmElmtId);
        this.__isSelect.purgeDependencyOnElmtId(rmElmtId);
        this.__token.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__username.aboutToBeDeleted();
        this.__password.aboutToBeDeleted();
        this.__isSelect.aboutToBeDeleted();
        this.__token.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __username: ObservedPropertySimplePU<string>; //分配用户
    get username() {
        return this.__username.get();
    }
    set username(newValue: string) {
        this.__username.set(newValue);
    }
    private __password: ObservedPropertySimplePU<string>; //用户密码
    get password() {
        return this.__password.get();
    }
    set password(newValue: string) {
        this.__password.set(newValue);
    }
    private __isSelect: ObservedPropertySimplePU<boolean>;
    get isSelect() {
        return this.__isSelect.get();
    }
    set isSelect(newValue: boolean) {
        this.__isSelect.set(newValue);
    }
    private __token: ObservedPropertyAbstractPU<string>;
    get token() {
        return this.__token.get();
    }
    set token(newValue: string) {
        this.__token.set(newValue);
    }
    onPageShow(): void {
        if (this.token != undefined && this.token != "") {
            router.pushUrl({
                url: "pages/MainPage"
            });
        }
    }
    loginMsg() {
        let httpRequest: http.HttpRequest = http.createHttp();
        httpRequest.request(CommonConstants.AUTH_TOKEN, {
            method: http.RequestMethod.POST,
            header: {
                'Content-Type': 'application/json'
            },
            extraData: {
                "auth": {
                    "identity": {
                        "methods": [
                            "password"
                        ],
                        "password": {
                            "user": {
                                "name": this.username,
                                "password": this.password,
                                "domain": {
                                    "name": CommonConstants.IAM_DOMAIN
                                }
                            }
                        }
                    },
                    "scope": {
                        "project": {
                            "name": CommonConstants.REGION
                        }
                    }
                }
            }
        }).then((data) => {
            console.info("httpRequest login:" + JSON.stringify(data));
            if (data.responseCode == 201) {
                console.log("token:" + data.header["x-subject-token"]);
                let token: string = data.header["x-subject-token"];
                let result: any = JSON.parse(`${data.result}`);
                let user: object = result.token.user;
                console.log("result user:" + user);
                AppStorage.setOrCreate("token", token);
                AppStorage.setOrCreate("userId", result.token.user.id);
                promptAction.showToast({ message: "获取权限成功" });
                router.pushUrl({
                    url: "pages/MainPage"
                });
            }
            else {
                promptAction.showToast({ message: "获取权限失败" });
            }
        }).catch((err: Object) => {
            console.info("httpRequest err:" + JSON.stringify(err));
            promptAction.showToast({ message: "获取失败" });
        });
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 最外层布局设置背景图片
            Column.create();
            // 最外层布局设置背景图片
            Column.backgroundImage({ "id": 16777233, "type": 20000, params: [], "bundleName": "com.xzgc.myapplication", "moduleName": "entry" });
            // 最外层布局设置背景图片
            Column.backgroundImageSize(ImageSize.Cover);
            // 最外层布局设置背景图片
            Column.width('100%');
            // 最外层布局设置背景图片
            Column.height('100%');
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width(CommonConstants.CONTENT_SIZE);
            Column.height('100%');
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 设置 logo 图标
            Column.create();
            // 设置 logo 图标
            Column.width(100);
            // 设置 logo 图标
            Column.height(100);
            // 设置 logo 图标
            Column.borderRadius(50);
            // 设置 logo 图标
            Column.backgroundColor(Color.White);
            // 设置 logo 图标
            Column.justifyContent(FlexAlign.Center);
            // 设置 logo 图标
            Column.margin({ top: 100, bottom: 30 });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create({ "id": 16777243, "type": 20000, params: [], "bundleName": "com.xzgc.myapplication", "moduleName": "entry" });
            Image.width(60);
        }, Image);
        // 设置 logo 图标
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 文本标题
            Text.create(CommonConstants.APP_TITLE);
            // 文本标题
            Text.fontSize(24);
            // 文本标题
            Text.fontWeight(FontWeight.Bold);
            // 文本标题
            Text.fontColor(Color.White);
            // 文本标题
            Text.align(Alignment.Center);
            // 文本标题
            Text.maxLines(1);
        }, Text);
        // 文本标题
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 用户名和密码
            Column.create({ space: 30 });
            // 用户名和密码
            Column.margin({ top: 80, bottom: 40 });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 用户名
            Row.create();
            // 用户名
            Row.width('100%');
            // 用户名
            Row.height(40);
            // 用户名
            Row.borderWidth({ bottom: 1 });
            // 用户名
            Row.borderColor(Color.White);
            // 用户名
            Row.padding({ bottom: 5 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create({ "id": 16777256, "type": 20000, params: [], "bundleName": "com.xzgc.myapplication", "moduleName": "entry" });
            Image.width(24);
            Image.fillColor(Color.White);
        }, Image);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            TextInput.create({ text: this.username, placeholder: '请输入用户名' });
            __TextInput__textInputStyle();
            TextInput.onChange((value: string) => {
                this.username = value;
            });
        }, TextInput);
        // 用户名
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 密码
            Row.create();
            // 密码
            Row.width('100%');
            // 密码
            Row.height(40);
            // 密码
            Row.borderWidth({ bottom: 1 });
            // 密码
            Row.borderColor(Color.White);
            // 密码
            Row.padding({ bottom: 5 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create({ "id": 16777248, "type": 20000, params: [], "bundleName": "com.xzgc.myapplication", "moduleName": "entry" });
            Image.width(24);
            Image.fillColor(Color.White);
        }, Image);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            TextInput.create({ text: this.password, placeholder: '请输入密码' });
            TextInput.type(InputType.Password);
            TextInput.showPasswordIcon(false);
            __TextInput__textInputStyle();
            TextInput.onChange((value: string) => {
                this.password = value;
            });
        }, TextInput);
        // 密码
        Row.pop();
        // 用户名和密码
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 登录按钮
            Button.createWithLabel('登录');
            // 登录按钮
            Button.type(ButtonType.Normal);
            // 登录按钮
            Button.width('100%');
            // 登录按钮
            Button.borderRadius(8);
            // 登录按钮
            Button.backgroundColor(Color.White);
            // 登录按钮
            Button.fontColor({ "id": 16777227, "type": 10001, params: [], "bundleName": "com.xzgc.myapplication", "moduleName": "entry" });
            // 登录按钮
            Button.fontSize(20);
            // 登录按钮
            Button.fontWeight(FontWeight.Bold);
            // 登录按钮
            Button.onClick(() => {
                if (!this.isSelect) {
                    AlertDialog.show({
                        title: '提示',
                        message: '请选勾选隐私协议',
                        autoCancel: true
                    });
                    return;
                }
                this.loginMsg();
            });
        }, Button);
        // 登录按钮
        Button.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel('注册');
            Button.type(ButtonType.Normal);
            Button.width('100%');
            Button.borderRadius(8);
            Button.backgroundColor('#90C2FF');
            Button.fontColor(Color.White);
            Button.fontSize(20);
            Button.fontWeight(FontWeight.Bold);
            Button.margin({ top: 10 });
            Button.onClick(() => {
                router.pushUrl({ url: 'pages/RegisterPage' });
            });
        }, Button);
        Button.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 勾选隐私协议、忘记密码
            Row.create();
            // 勾选隐私协议、忘记密码
            Row.width('100%');
            // 勾选隐私协议、忘记密码
            Row.justifyContent(FlexAlign.Center);
            // 勾选隐私协议、忘记密码
            Row.margin({ top: 15 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Checkbox.create();
            Checkbox.width(20);
            Checkbox.height(20);
            Checkbox.select(this.isSelect);
            Checkbox.onChange((value: boolean) => {
                this.isSelect = value;
            });
        }, Checkbox);
        Checkbox.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('勾选隐私协议');
            Text.fontColor(Color.White);
        }, Text);
        Text.pop();
        // 勾选隐私协议、忘记密码
        Row.pop();
        Column.pop();
        // 最外层布局设置背景图片
        Column.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
    static getEntryName(): string {
        return "Index";
    }
}
// 输入框样式，设置输入框距离左侧图标的间距、提示文本字体颜色、输入字体颜色、输入框透明背景
function __TextInput__textInputStyle(): void {
    TextInput.margin({ left: 10 });
    TextInput.placeholderColor(Color.White);
    TextInput.fontColor(Color.White);
    TextInput.backgroundColor(Color.Transparent);
    TextInput.width('90%');
}
registerNamedRoute(() => new Index(undefined, {}), "", { bundleName: "com.xzgc.myapplication", moduleName: "entry", pagePath: "pages/LoginPage", pageFullPath: "entry/src/main/ets/pages/LoginPage", integratedHsp: "false", moduleType: "followWithHap" });
