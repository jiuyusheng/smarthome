import { CommonConstants } from "../common/CommonConstants"
import { SmartHome } from "../model/SmartHome";
import { http } from "@kit.NetworkKit";
import { promptAction } from "@kit.ArkUI";

@Component
export struct ControlPage{
  @Consume smartHome:SmartHome;
  @StorageLink("token")
  token:string=""
  controll_device(commonName:string,switchName:string){
    let httpRequest:http.HttpRequest = http.createHttp();
    httpRequest.request(
      CommonConstants.CONTROL_DEVICE,
      {
        method:http.RequestMethod.POST,
        header:{
          'Content-Type': 'application/json',
          'X-Auth-Token': this.token,
          'Instance-Id': CommonConstants.Instance_Id
        },
        connectTimeout:30000,
        readTimeout:40000,
        extraData: {
          "service_id" : "smartHome",
          "command_name" : commonName,
          "paras" : {
            "switch" : switchName
          }
        }
      }
    ).then((data)=>{
      console.info("httpRequest httpCommons success:" +
      JSON.stringify(data))
      let response:ESObject = JSON.parse(`${data.result}`);
      if(response.command_id!=null){
        if(commonName=="light_control"){
          this.smartHome.lightStatus=switchName
        }else if(commonName=="motor_control") {
          this.smartHome.motorStatus = switchName
        }
      }else if(response.error_msg!=null){
        promptAction.showToast({
          message:"设备响应失败："+response.error_msg
        })
      }
    })
      .catch((err:Object)=>{
        console.info("httpRequest httpCommons:" +
        JSON.stringify(err));
        promptAction.showDialog({
          message:"设备连接失败："+JSON.stringify(err)
        })
      })
  }
  build() {
    RelativeContainer() {
      Column({space:10}){
        Column(){
          Text('环境监测与人体感应系统').fontColor('#FFFFFF').fontSize(32).fontWeight(FontWeight.Bold)
        }.width('100%')
        .height(180)
        .backgroundImage($r('app.media.banner'))
        .backgroundImageSize(ImageSize.Cover)
        Text('设备控制').fontSize(32).fontWeight(FontWeight.Bold).margin({bottom:10})
        Column({space:20}){
          Row() {
            Column() {
              Image(this.smartHome?.lightStatus == "ON" ?
              $r("app.media.deng_on") : $r("app.media.deng_off"))
                .width(100).height(100)
              Button(this.smartHome?.lightStatus == "ON" ? '关灯' :
                '开灯',
                { type: ButtonType.Capsule, stateEffect: false })
                .backgroundColor(this.smartHome?.lightStatus ==
                  "ON" ? '#FF9966' : '#FFE4CC')
                .fontColor(this.smartHome?.lightStatus == "ON" ? '#FFFFFF' : '#666666')
                .width(80)
                .height(30)
                .margin({ top: 10 })
                .onClick(() => {
                  if (this.smartHome?.lightStatus == "ON") {
                    this.controll_device("light_control", "OFF");
                  } else {
                    this.controll_device("light_control", "ON");
                  }
                })
            }
          }.width("100%")
          .justifyContent(FlexAlign.SpaceAround)
          Column(){
            Image(this.smartHome?.motorStatus == "ON" ?
            $r("app.media.touyingyi_on") : $r("app.media.touyingyi_off"))
              .width(100).height(100)
            Button(this.smartHome?.motorStatus == "ON" ? '关闭投影仪' : '打开投影仪',
            { type: ButtonType.Capsule, stateEffect: false })
            .backgroundColor(this.smartHome?.motorStatus ==
              "ON" ? '#FF9966' : '#FFE4CC')
            .fontColor(this.smartHome?.motorStatus == "ON" ? '#FFFFFF' : '#666666')
              .width(120)
              .height(30)
              .margin({ top: 10 })
              .onClick(() => {
                if (this.smartHome?.motorStatus == "ON") {
                  this.controll_device("motor_control", "OFF");
                } else {
                  this.controll_device("motor_control", "ON");
                }
              })
          }
        }
        .width(CommonConstants.CONTENT_SIZE)
        .height(400)
        .backgroundColor('#FFF6E6')
        .borderRadius(10)
        .justifyContent(FlexAlign.SpaceAround)
      }
    }
    .height('100%')
    .width('100%')
    .backgroundColor('#FFF9F0')
  }
}
