export class SmartHome {
    illumination?: string = ""; //光照
    temperature?: string = ""; //温度
    humidity?: string = ""; //湿度
    smoke?: string = ""; //烟雾浓度
    motorStatus?: string = ""; //投影仪状态：ON：已打开，OFF：已关闭
    lightStatus?: string = ""; //灯：ON：已打开，OFF：已关闭
    alarmLightState?: string = ""; //报警灯状态：ON:已启动，OFF:已关闭
    bodyState?: string = ""; //人体感应：ON:有人 OFF:无人
}
