import { router, promptAction } from '@kit.ArkUI';

interface GenderOption {
  value: string;
  label: string;
}
const genderOptions: GenderOption[] = [
  { value: '男', label: '男' },
  { value: '女', label: '女' },
  { value: '保密', label: '保密' }
];

@Entry
@Component
struct AccountSettingPage {
  @State avatar: string = '';
  @State nickname: string = '羽笙凤籁队';
  @State phone: string = '13856025327';
  @State gender: string = '保密';
  @State region: string = '中国';
  @State signature: string = '加油ヾ(◍°∇°◍)ﾉﾞ';

  saveInfo() {
    promptAction.showToast({ message: '保存成功' })
  }

  build() {
    Column({ space: 24 }) {
      Text('账号设置').fontSize(24).fontWeight(FontWeight.Bold).align(Alignment.Center)
      // 头像、昵称分组
      Row() {
        Image(this.avatar ? this.avatar : $r('app.media.touxiang')).width(70).height(70).borderRadius(35)
          .onClick(() => { promptAction.showToast({ message: '请选择图片功能待开发/当前SDK不支持' }) })
        Column({ space: 8 }) {
          Row().alignItems(VerticalAlign.Center) {
            Text('昵称:').fontWeight(FontWeight.Bold).width(80).textAlign(TextAlign.Start).height(40)
            TextInput({ text: this.nickname, placeholder: '请输入昵称' })
              .width(180).height(40)
              .onChange((v: string) => { this.nickname = v })
          }
        }
      }
      Divider().strokeWidth(1).color('#e0e0e0')
      // 联系方式分组
      Row().alignItems(VerticalAlign.Center) {
        Text('手机号:').fontWeight(FontWeight.Bold).width(80).textAlign(TextAlign.Start).height(40)
        TextInput({ text: this.phone, placeholder: '请输入手机号' })
          .width(180).height(40)
          .onChange((v: string) => { this.phone = v })
        Button('更换').margin({ left: 8 }).height(40).onClick(() => { promptAction.showToast({ message: '更换手机号功能待开发' }) })
      }
      Divider().strokeWidth(1).color('#e0e0e0')
      // 个人信息分组
      Row().alignItems(VerticalAlign.Center) {
        Text('性别:').fontWeight(FontWeight.Bold).width(80).textAlign(TextAlign.Start).height(40)
        Select(genderOptions).width(180).height(40)
          .onSelect((index: number) => { this.gender = genderOptions[index].value })
      }
      Row().alignItems(VerticalAlign.Center) {
        Text('地区:').fontWeight(FontWeight.Bold).width(80).textAlign(TextAlign.Start).height(40)
        TextInput({ text: this.region, placeholder: '请输入地区' })
          .width(180).height(40)
          .onChange((v: string) => { this.region = v })
      }
      Row().alignItems(VerticalAlign.Center) {
        Text('个性签名:').fontWeight(FontWeight.Bold).width(80).textAlign(TextAlign.Start).height(40)
        TextInput({ text: this.signature, placeholder: '请输入个性签名' })
          .width(180).height(40)
          .onChange((v: string) => { this.signature = v })
      }
      Divider().strokeWidth(1).color('#e0e0e0')
      // 安全设置分组
      Button('安全设置').type(ButtonType.Normal).width('80%')
        .onClick(() => { promptAction.showToast({ message: '安全设置功能待开发' }) })
      // 保存分组
      Button('保存').type(ButtonType.Normal).width('80%').fontColor('#fff').backgroundColor('#1677FF')
        .onClick(() => { this.saveInfo() })
      Button('返回').type(ButtonType.Normal).width('80%')
        .onClick(() => { router.pushUrl({ url: 'pages/MainPage' }) })
    }
    .width('100%')
    .alignItems(HorizontalAlign.Center)
    .justifyContent(FlexAlign.Center)
    .height('100%')
    .backgroundColor('#fff')
  }
} 