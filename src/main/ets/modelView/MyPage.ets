import { CommonConstants } from "../common/CommonConstants"
import { UserBean } from "../model/UserBean"
import { http } from "@kit.NetworkKit";
import router from "@ohos.router";

interface Setting{
  title:string,
  img:Resource,
  onClick?: () => void
}
@Component
export struct MyPage{
  @State userBean:UserBean=new UserBean();
  @StorageLink("userId")
  userId:string=""
  @StorageLink("token")
  token:string=""
  arr:Array<Setting>=[{
      title:"账号设置",
      img:$r("app.media.setting"),
      onClick: () => { router.pushUrl({ url: 'pages/AccountSettingPage' }) }
    },{
      title:"门禁设置",
      img:$r("app.media.damen"),
      onClick: () => { router.pushUrl({ url: 'pages/DoorSettingPage' }) }
    },{
      title:"消息通知",
      img:$r("app.media.notice"),
      onClick: () => { router.pushUrl({ url: 'pages/NotificationPage' }) }
    }]
  aboutToAppear(): void {
    let httpRequest:http.HttpRequest = http.createHttp();
    httpRequest.request(
      "https://iam.myhuaweicloud.com/v3.0/OS-USER/users/"+this.userId,
      {
        method:http.RequestMethod.GET,
        header:{
          'X-Auth-Token': this.token
        },
        extraData: ""
      }
    ).then((data)=>{
      console.info("httpRequest device message success:" +
      JSON.stringify(data.result))
      let result:ESObject = JSON.parse(`${data.result}`);
      this.userBean = result?.user;
    }).catch((err:Object)=>{
      console.info("httpRequest queryDev err:" +
      JSON.stringify(err));
    })
  }

  build() {
    Column({space:15}) {
      // 头像
      Column() {
        Image($r('app.media.touxiang')).width(100).height(100).borderRadius(60).margin({top:15})
        Column({space:10}){
          Text(this.userBean.name).fontSize(20).fontWeight(FontWeight.Bold)
          Text(this.userBean.phone)
          Text(this.userBean.email)
        }.alignItems(HorizontalAlign.Center)
      }
      .width(CommonConstants.CONTENT_SIZE)
      .height(200)
      .backgroundColor('#FFF6E6')
      .borderRadius(16)
      // 列表
      Column(){
        // 列表
        List(){
          ForEach(this.arr,(value:Setting)=>{
            ListItem(){
              Flex({justifyContent:FlexAlign.SpaceBetween}){
                Row({space:15}){
                  Image(value.img).width(32).fillColor('#666666')
                  Text(value.title).fontSize(20).fontWeight(FontWeight.Bold)
                }
                Image($r('app.media.more')).width(30).fillColor('#666666')
              }.margin({top:20,bottom:20})
            }
            .onClick(value.onClick ? value.onClick : undefined)
          })
        }.comStyle()
        .divider({strokeWidth:1,color:'#E8E8E8',startMargin:10,endMargin:10})
        Button('退出登录',{type:ButtonType.Normal})
          .fontSize(20)
          .height(60)
          .borderRadius(8)
          .width(CommonConstants.CONTENT_SIZE)
          .margin({top:50})
          .onClick(()=>{
            AppStorage.setOrCreate("token","");
            AppStorage.setOrCreate("userId","");
            router.pushUrl({
              url:"pages/LoginPage"
            })
          })

      }
    }
    .width('100%')
    .height('100%')
    .backgroundColor('#FFF9F0')
  }
}
@Styles function comStyle(){
  .width(CommonConstants.CONTENT_SIZE)
  .backgroundColor('#FFF6E6')
  .borderRadius(16)
  .padding(20)
}