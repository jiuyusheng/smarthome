import { CommonConstants } from "../common/CommonConstants"
import { SmartHome } from "../model/SmartHome"
import { http } from "@kit.NetworkKit";

@Component
export struct HomePage {
  @Consume smartHome: SmartHome;
  @StorageLink("token")
  token: string = ""

  aboutToAppear(): void {
    this.getDeviceMessage()
  }

  getDeviceMessage() {
    let httpRequest: http.HttpRequest = http.createHttp();
    httpRequest.request(
      CommonConstants.SHADOW_DEVICE,
      {
        method: http.RequestMethod.GET,
        header: {
          'Content-Type': 'application/json',
          'X-Auth-Token': this.token,
          'Instance-Id': CommonConstants.Instance_Id
        },
        extraData: ""
      }
    ).then((data) => {
      console.info("httpRequest device message success:" + JSON.stringify(data.result))
      let result: ESObject = JSON.parse(`${data.result}`);
      this.smartHome = result?.shadow[0].reported?.properties;
    }).catch((err: Object) => {
      console.info("httpRequest queryDev err:" + JSON.stringify(err));
    })
  }

  build() {
    Column() {
      Column() {
        Column() {
          Text('环境监测与人体感应系统')
            .fontColor('#FFFFFF')
            .fontSize(32)
            .fontWeight(FontWeight.Bold)
        }
        .width('100%')
        .height(180)
        .backgroundImage($r('app.media.banner'))
        .backgroundImageSize(ImageSize.Cover)

        Row() {
          Column({ space: 3 }) {
            Image($r('app.media.guangzhao')).width(50)
            Text('光照').fontWeight(FontWeight.Bold)
            Text(this.smartHome?.illumination ? this.smartHome.illumination : "--").fontWeight(FontWeight.Bold)
          }
          .backgroundColor('#FFF6E6')
          .padding(12)
          .borderRadius(12)
          // 温度
          Column({ space: 3 }) {
            Image($r('app.media.wendu')).width(50)
            Text('温度').fontWeight(FontWeight.Bold)
            Text(this.smartHome?.temperature ? this.smartHome.temperature : "--").fontWeight(FontWeight.Bold)
          }
          .backgroundColor('#FFF6E6')
          .padding(12)
          .borderRadius(12)
          // 湿度
          Column({ space: 3 }) {
            Image($r('app.media.shidu')).width(50)
            Text('湿度').fontWeight(FontWeight.Bold)
            Text(this.smartHome?.humidity ? this.smartHome.humidity : "--").fontWeight(FontWeight.Bold)
          }
          .backgroundColor('#FFF6E6')
          .padding(12)
          .borderRadius(12)
        }
        .width(CommonConstants.CONTENT_SIZE)
        .justifyContent(FlexAlign.SpaceBetween)
        .height(100)
        .margin({ top: 20, bottom: 20 })
      }

      // 设备状态模块
      Column() {
        Text('设备状态')
          .fontSize(32)
          .fontWeight(FontWeight.Bold)
          .margin({ bottom: 10 })

        Grid() {
          GridItem() {
            // 教室灯
            Column({ space: 10 }) {
              Row() {
                Image(this.smartHome?.lightStatus == "ON" ? $r("app.media.deng_on") : $r("app.media.deng_off"))
              }.rowBgStyle()
              Text() {
                Span('教室灯：')
                if (this.smartHome?.lightStatus == "ON") {
                  Span("已打开").fontColor(Color.Red)
                } else {
                  Span("已关闭")
                }
              }
            }
          }.gridStyle()

          GridItem() {
            // 投影仪
            Column({ space: 10 }) {
              Row() {
                Image(this.smartHome?.motorStatus == "ON" ? $r("app.media.touyingyi_on") : $r("app.media.touyingyi_off"))
              }.rowBgStyle()
              Text() {
                Span('投影仪：')
                if (this.smartHome?.motorStatus == "ON") {
                  Span("已启动").fontColor(Color.Red)
                } else {
                  Span("已关机")
                }
              }
            }
          }.gridStyle()

          GridItem() {
            // 人体感应：有人、无人
            Column({ space: 10 }) {
              Row() {
                Image($r("app.media.door"))
              }.rowBgStyle()
              Text() {
                Span('门口：')
                if (this.smartHome?.bodyState == "ON") {
                  Span("有人").fontColor(Color.Red)
                } else {
                  Span("无人")
                }
              }
            }
          }.gridStyle()

          GridItem() {
            // 报警器
            Column({ space: 10 }) {
              Row() {
                Image($r("app.media.notice"))
              }.rowBgStyle()
              Text() {
                Span('报警器：')
                if (this.smartHome?.alarmLightState == "ON") {
                  Span("已启动").fontColor(Color.Red)
                } else {
                  Span("未启动")
                }
              }
            }
          }.gridStyle()
        }
        // 定义两行两列的网格
        .columnsTemplate('1fr 1fr')
        .rowsTemplate('1fr 1fr')
        .columnsGap(10)
        .rowsGap(10)
        .width('100%')
        .height(300)
      }
      .width(CommonConstants.CONTENT_SIZE)
      .margin({ top: 20 })
      .alignItems(HorizontalAlign.Start)
    }
    .width('100%')
    .height('100%')
    .backgroundColor('#FFF9F0')  // 整体背景色改为温暖的米色
  }
}

// 网格白色背景
@Styles function gridStyle() {
  .width('100%')
  .height(120)
  .backgroundColor('#FFF6E6')  // 卡片背景色改为浅暖色
  .borderRadius(10)
}

// 图标白色圆背景
@Extend(Row) function rowBgStyle() {
  .width(60)
  .height(60)
  .borderRadius(30)
  .backgroundColor('#FFE4CC')  // 图标背景色改为暖橙色
  .justifyContent(FlexAlign.Center)
}