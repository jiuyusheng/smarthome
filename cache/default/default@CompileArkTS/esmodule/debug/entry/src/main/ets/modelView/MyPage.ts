if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface MyPage_Params {
    userBean?: UserBean;
    userId?: string;
    token?: string;
    arr?: Array<Setting>;
}
import { CommonConstants } from "@normalized:N&&&entry/src/main/ets/common/CommonConstants&";
import { UserBean } from "@normalized:N&&&entry/src/main/ets/model/UserBean&";
import http from "@ohos:net.http";
import router from "@ohos:router";
interface Setting {
    title: string;
    img: Resource;
    onClick?: () => void;
}
export class MyPage extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__userBean = new ObservedPropertyObjectPU(new UserBean(), this, "userBean");
        this.__userId = this.createStorageLink("userId", "", "userId");
        this.__token = this.createStorageLink("token", "", "token");
        this.arr = [{
                title: "账号设置",
                img: { "id": 16777249, "type": 20000, params: [], "bundleName": "com.xzgc.myapplication", "moduleName": "entry" },
                onClick: () => { router.pushUrl({ url: 'pages/AccountSettingPage' }); }
            }, {
                title: "门禁设置",
                img: { "id": 16777236, "type": 20000, params: [], "bundleName": "com.xzgc.myapplication", "moduleName": "entry" },
                onClick: () => { router.pushUrl({ url: 'pages/DoorSettingPage' }); }
            }, {
                title: "消息通知",
                img: { "id": 16777247, "type": 20000, params: [], "bundleName": "com.xzgc.myapplication", "moduleName": "entry" },
                onClick: () => { router.pushUrl({ url: 'pages/NotificationPage' }); }
            }];
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: MyPage_Params) {
        if (params.userBean !== undefined) {
            this.userBean = params.userBean;
        }
        if (params.arr !== undefined) {
            this.arr = params.arr;
        }
    }
    updateStateVars(params: MyPage_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__userBean.purgeDependencyOnElmtId(rmElmtId);
        this.__userId.purgeDependencyOnElmtId(rmElmtId);
        this.__token.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__userBean.aboutToBeDeleted();
        this.__userId.aboutToBeDeleted();
        this.__token.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __userBean: ObservedPropertyObjectPU<UserBean>;
    get userBean() {
        return this.__userBean.get();
    }
    set userBean(newValue: UserBean) {
        this.__userBean.set(newValue);
    }
    private __userId: ObservedPropertyAbstractPU<string>;
    get userId() {
        return this.__userId.get();
    }
    set userId(newValue: string) {
        this.__userId.set(newValue);
    }
    private __token: ObservedPropertyAbstractPU<string>;
    get token() {
        return this.__token.get();
    }
    set token(newValue: string) {
        this.__token.set(newValue);
    }
    private arr: Array<Setting>;
    aboutToAppear(): void {
        let httpRequest: http.HttpRequest = http.createHttp();
        httpRequest.request("https://iam.myhuaweicloud.com/v3.0/OS-USER/users/" + this.userId, {
            method: http.RequestMethod.GET,
            header: {
                'X-Auth-Token': this.token
            },
            extraData: ""
        }).then((data) => {
            console.info("httpRequest device message success:" +
                JSON.stringify(data.result));
            let result: any = JSON.parse(`${data.result}`);
            this.userBean = result?.user;
        }).catch((err: Object) => {
            console.info("httpRequest queryDev err:" +
                JSON.stringify(err));
        });
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create({ space: 15 });
            Column.width('100%');
            Column.height('100%');
            Column.backgroundColor('#FFF9F0');
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 头像
            Column.create();
            // 头像
            Column.width(CommonConstants.CONTENT_SIZE);
            // 头像
            Column.height(200);
            // 头像
            Column.backgroundColor('#FFF6E6');
            // 头像
            Column.borderRadius(16);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create({ "id": 16777252, "type": 20000, params: [], "bundleName": "com.xzgc.myapplication", "moduleName": "entry" });
            Image.width(100);
            Image.height(100);
            Image.borderRadius(60);
            Image.margin({ top: 15 });
        }, Image);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create({ space: 10 });
            Column.alignItems(HorizontalAlign.Center);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.userBean.name);
            Text.fontSize(20);
            Text.fontWeight(FontWeight.Bold);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.userBean.phone);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.userBean.email);
        }, Text);
        Text.pop();
        Column.pop();
        // 头像
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 列表
            Column.create();
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 列表
            List.create();
            // 列表
            List.width(CommonConstants.CONTENT_SIZE);
            // 列表
            List.backgroundColor('#FFF6E6');
            // 列表
            List.borderRadius(16);
            // 列表
            List.padding(20);
            // 列表
            List.divider({ strokeWidth: 1, color: '#E8E8E8', startMargin: 10, endMargin: 10 });
        }, List);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            ForEach.create();
            const forEachItemGenFunction = _item => {
                const value = _item;
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
                        ListItem.onClick(value.onClick ? value.onClick : undefined);
                    };
                    const deepRenderFunction = (elmtId, isInitialRender) => {
                        itemCreation(elmtId, isInitialRender);
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Flex.create({ justifyContent: FlexAlign.SpaceBetween });
                            Flex.margin({ top: 20, bottom: 20 });
                        }, Flex);
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Row.create({ space: 15 });
                        }, Row);
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Image.create(value.img);
                            Image.width(32);
                            Image.fillColor('#666666');
                        }, Image);
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Text.create(value.title);
                            Text.fontSize(20);
                            Text.fontWeight(FontWeight.Bold);
                        }, Text);
                        Text.pop();
                        Row.pop();
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Image.create({ "id": 16777244, "type": 20000, params: [], "bundleName": "com.xzgc.myapplication", "moduleName": "entry" });
                            Image.width(30);
                            Image.fillColor('#666666');
                        }, Image);
                        Flex.pop();
                        ListItem.pop();
                    };
                    this.observeComponentCreation2(itemCreation2, ListItem);
                    ListItem.pop();
                }
            };
            this.forEachUpdateFunction(elmtId, this.arr, forEachItemGenFunction);
        }, ForEach);
        ForEach.pop();
        // 列表
        List.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel('退出登录', { type: ButtonType.Normal });
            Button.fontSize(20);
            Button.height(60);
            Button.borderRadius(8);
            Button.width(CommonConstants.CONTENT_SIZE);
            Button.margin({ top: 50 });
            Button.onClick(() => {
                AppStorage.setOrCreate("token", "");
                AppStorage.setOrCreate("userId", "");
                router.pushUrl({
                    url: "pages/LoginPage"
                });
            });
        }, Button);
        Button.pop();
        // 列表
        Column.pop();
        Column.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
