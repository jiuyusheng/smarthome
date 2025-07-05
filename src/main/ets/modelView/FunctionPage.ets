import { CommonConstants } from "../common/CommonConstants"

interface SensorItem {
  name: string
  icon: Resource
  status: string
}

@Component
export struct FunctionPage {
  @State private sensors: SensorItem[] = [
    { 
      name: '温度传感器', 
      icon: $r('app.media.wendu'), 
      status: '正常' 
    },
    { 
      name: '湿度传感器', 
      icon: $r('app.media.shidu'), 
      status: '正常' 
    },
    { 
      name: '人体感应传感器', 
      icon: $r('app.media.door'), 
      status: '正常' 
    },
    { 
      name: '加速度计传感器', 
      icon: $r('app.media.speedometer'), 
      status: '正常' 
    },
    { 
      name: '气体传感器', 
      icon: $r('app.media.gas_sensor'), 
      status: '正常' 
    },
    { 
      name: '光照强度传感器', 
      icon: $r('app.media.guangzhao'), 
      status: '正常' 
    }
  ]

  build() {
    Column() {
      Column() {
        Text('传感器功能')
          .fontSize(24)
          .fontWeight(FontWeight.Bold)
          .margin({ top: 50, bottom: 30 })

        List() {
          ForEach(this.sensors, (item: SensorItem) => {
            ListItem() {
              Row() {
                Row({ space: 12 }) {
                  Image(item.icon)
                    .width(24)
                    .height(24)
                    .objectFit(ImageFit.Contain)
                  Text(item.name)
                    .fontSize(16)
                    .fontWeight(FontWeight.Medium)
                }
                Text(item.status)
                  .fontSize(14)
                  .fontColor('#666666')
              }
              .width('100%')
              .height(50)
              .justifyContent(FlexAlign.SpaceBetween)
              .padding({ left: 16, right: 16 })
              .backgroundColor('#FFFFFF')
              .borderRadius(8)
            }
            .margin({ bottom: 12 })
          }, (item: SensorItem) => item.name)
        }
        .width(CommonConstants.CONTENT_SIZE)
        .margin({ top: 12 })
      }
      .width('100%')
      .height('100%')
      .backgroundColor('#FFF9F0')
      .alignItems(HorizontalAlign.Center)
    }
  }
} 