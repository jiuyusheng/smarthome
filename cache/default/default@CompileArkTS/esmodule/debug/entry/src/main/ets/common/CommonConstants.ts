export class CommonConstants {
    static readonly IAM_DOMAIN = "hid_r3z6any_2f5ut__"; //IAM 账户信息，登录后右上角显示的账户名
    static readonly REGION = "cn-north-4"; //项目名
    static readonly ENDPOINT = "15be918d86.st1.iotda-app.cn-north-4.myhuaweicloud.com"; // ip IoT 实例->接入信息（https 接入地址）
    static readonly project_id: string = "bd0d502c33d84b86803a3c2ea8f0a2ed"; //项目 id：用户->统一身份认证->项目：华北-北京四->查看
    static readonly device_id: string = "685cf05dd582f20018353edd_txsmart001"; //设备id IoT 实例->所有设备->找到对应设备
    static readonly service_id: string = "smartHome"; //设备服务名
    static readonly Instance_Id = "dbaceca3-58c4-4169-b472-db61c3d3fd04"; //实例 id：IoT 实例->总览->实例 ID
    //授权地址
    static readonly AUTH_TOKEN = "https://iam.myhuaweicloud.com/v3/auth/tokens";
    //获取设备上报数据
    static readonly SHADOW_DEVICE = "https://" + CommonConstants.ENDPOINT + "/v5/iot/" +
        CommonConstants.project_id + "/devices/" +
        CommonConstants.device_id + "/shadow?service_id=" +
        CommonConstants.service_id;
    //控制设备-同步下发设备命令
    static readonly CONTROL_DEVICE = "https://" + CommonConstants.ENDPOINT + "/v5/iot/" +
        CommonConstants.project_id + "/devices/" +
        CommonConstants.device_id + "/commands";
    static readonly FULL_SIZE: string = '100%';
    static readonly HALF_SIZE: string = '50%';
    static readonly CONTENT_SIZE: string = '90%';
    static readonly APP_TITLE: string = '环境监测与人体感应系统';
    static readonly amqpHost = "ws://192.168.71.249:8083/";
}
