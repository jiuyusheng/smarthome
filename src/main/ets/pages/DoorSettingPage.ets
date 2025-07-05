import { router, promptAction } from '@kit.ArkUI';

@Entry
@Component
struct DoorSettingPage {
  @State doorOpen: boolean = false;
  @State notifyEnabled: boolean = true;

  build() {
    Column() {
      Column() {
        Text('门禁设置')
          .fontSize(24)
          .fontWeight(FontWeight.Bold)
          .margin({ top: 50, bottom: 30 })

        Row() {
          Text('远程开门:')
            .fontWeight(FontWeight.Bold)
            .width(80)
            .textAlign(TextAlign.End)
          Button(this.doorOpen ? '关门' : '开门')
            .type(ButtonType.Normal)
            .width(100)
            .margin({ left: 20 })
            .onClick(() => {
              this.doorOpen = !this.doorOpen
              promptAction.showToast({ message: this.doorOpen ? '门已打开' : '门已关闭' })
            })
        }
        .alignItems(VerticalAlign.Center)
        .margin({ bottom: 16 })

        Row() {
          Text('门禁通知:')
            .fontWeight(FontWeight.Bold)
            .width(80)
            .textAlign(TextAlign.End)
          Row() {
            Checkbox()
              .select(this.notifyEnabled)
              .onChange((v: boolean) => {
                this.notifyEnabled = v
                promptAction.showToast({ message: v ? '已开启通知' : '已关闭通知' })
              })
            Text(this.notifyEnabled ? '已开启' : '已关闭')
              .fontColor('#1677FF')
              .margin({ left: 10 })
          }
          .margin({ left: 20 })
        }
        .alignItems(VerticalAlign.Center)
        .margin({ bottom: 16 })

        Text('门禁记录').fontWeight(FontWeight.Bold).margin({ top: 20, bottom: 10 })
        Text('2024-06-01 08:00 远程开门').margin({ bottom: 2 }).align(Alignment.Center)
        Text('2024-05-31 18:30 门禁异常报警').align(Alignment.Center)

        Blank()

        Button('返回')
          .type(ButtonType.Normal)
          .width('80%')
          .margin({ bottom: 30, top: 30 })
          .onClick(() => { router.pushUrl({ url: 'pages/MainPage' }) })
      }
      .width('100%')
      .height('100%')
      .backgroundColor('#fff')
      .alignItems(HorizontalAlign.Center)
    }
  }
} 