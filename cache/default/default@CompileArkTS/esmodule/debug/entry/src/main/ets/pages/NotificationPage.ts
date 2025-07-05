if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface NotificationPage_Params {
    messages?: Message[];
}
import router from "@ohos:router";
import promptAction from "@ohos:promptAction";
class Message {
    title: string;
    content: string;
    read: boolean;
    constructor(title: string, content: string, read: boolean) {
        this.title = title;
        this.content = content;
        this.read = read;
    }
}
class NotificationPage extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__messages = new ObservedPropertyObjectPU([
            new Message('门禁异常', '2024-06-01 18:30 门禁异常报警', false),
            new Message('开门成功', '2024-06-01 08:00 远程开门成功', true)
        ], this, "messages");
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: NotificationPage_Params) {
        if (params.messages !== undefined) {
            this.messages = params.messages;
        }
    }
    updateStateVars(params: NotificationPage_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__messages.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__messages.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __messages: ObservedPropertyObjectPU<Message[]>;
    get messages() {
        return this.__messages.get();
    }
    set messages(newValue: Message[]) {
        this.__messages.set(newValue);
    }
    markAllRead() {
        this.messages = this.messages.map((msg: Message) => new Message(msg.title, msg.content, true));
        promptAction.showToast({ message: '全部已读' });
    }
    clearAll() {
        this.messages = [];
        promptAction.showToast({ message: '消息已清空' });
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('100%');
            Column.height('100%');
            Column.backgroundColor('#f5f5f5');
            Column.alignItems(HorizontalAlign.Center);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('消息通知');
            Text.fontSize(24);
            Text.fontWeight(FontWeight.Bold);
            Text.margin({ top: 50, bottom: 30 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width('90%');
            Row.justifyContent(FlexAlign.SpaceBetween);
            Row.margin({ bottom: 20 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel('全部已读', { type: ButtonType.Normal });
            Button.backgroundColor('#1677FF');
            Button.fontColor(Color.White);
            Button.width(120);
            Button.height(40);
            Button.onClick(() => this.markAllRead());
        }, Button);
        Button.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel('清空', { type: ButtonType.Normal });
            Button.backgroundColor('#FF4759');
            Button.fontColor(Color.White);
            Button.width(120);
            Button.height(40);
            Button.onClick(() => this.clearAll());
        }, Button);
        Button.pop();
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            List.create({ space: 12 });
            List.width('90%');
            List.layoutWeight(1);
            List.backgroundColor('#f5f5f5');
        }, List);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            ForEach.create();
            const forEachItemGenFunction = _item => {
                const msg = _item;
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
                    };
                    const deepRenderFunction = (elmtId, isInitialRender) => {
                        itemCreation(elmtId, isInitialRender);
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Column.create();
                            Column.backgroundColor(Color.White);
                            Column.padding(16);
                            Column.borderRadius(8);
                            Column.width('100%');
                        }, Column);
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Row.create();
                            Row.width('100%');
                            Row.margin({ bottom: 4 });
                        }, Row);
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Text.create(msg.title);
                            Text.fontSize(16);
                            Text.fontWeight(msg.read ? FontWeight.Normal : FontWeight.Bold);
                        }, Text);
                        Text.pop();
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            If.create();
                            if (!msg.read) {
                                this.ifElseBranchUpdateFunction(0, () => {
                                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                                        Text.create('未读');
                                        Text.fontSize(12);
                                        Text.fontColor('#FF4759');
                                        Text.margin({ left: 8 });
                                    }, Text);
                                    Text.pop();
                                });
                            }
                            else {
                                this.ifElseBranchUpdateFunction(1, () => {
                                });
                            }
                        }, If);
                        If.pop();
                        Row.pop();
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Text.create(msg.content);
                            Text.fontSize(14);
                            Text.fontColor('#666');
                            Text.width('100%');
                        }, Text);
                        Text.pop();
                        Column.pop();
                        ListItem.pop();
                    };
                    this.observeComponentCreation2(itemCreation2, ListItem);
                    ListItem.pop();
                }
            };
            this.forEachUpdateFunction(elmtId, this.messages, forEachItemGenFunction);
        }, ForEach);
        ForEach.pop();
        List.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel('返回', { type: ButtonType.Normal });
            Button.width('90%');
            Button.height(40);
            Button.backgroundColor('#1677FF');
            Button.fontColor(Color.White);
            Button.margin({ bottom: 30 });
            Button.onClick(() => router.pushUrl({ url: 'pages/MainPage' }));
        }, Button);
        Button.pop();
        Column.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
    static getEntryName(): string {
        return "NotificationPage";
    }
}
registerNamedRoute(() => new NotificationPage(undefined, {}), "", { bundleName: "com.xzgc.myapplication", moduleName: "entry", pagePath: "pages/NotificationPage", pageFullPath: "entry/src/main/ets/pages/NotificationPage", integratedHsp: "false", moduleType: "followWithHap" });
