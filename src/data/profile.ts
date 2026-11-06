// 首页信息
export type ExternalProfileLinkType = "qq" | "music" | "github"
export type ProfileLinkType = ExternalProfileLinkType | "wechat"

export interface ExternalProfileLink {
  type: ExternalProfileLinkType
  name: string
  url: string
}

export interface QrProfileLink {
  type: "wechat"
  name: string
  qrImage: string
  qrAlt: string
  label: string
}

export type ProfileLink = ExternalProfileLink | QrProfileLink

export const profile: {
  name: string
  bio: string
  avatar: string
  links: ProfileLink[]
} = {
  name: "Chara",
  bio: "生命本身，就是没有意义的重复",
  avatar: "/Chara.png",
  links: [
    {
      type: "wechat",
      name: "WeChat",
      qrImage: "/images/contact/wechat-contact.png",
      qrAlt: "微信联系二维码",
      label: "扫码添加微信",
    },
    {
      type: "qq",
      name: "QQ",
      url: "https://qm.qq.com/q/Qm6VfZnWM0",
    },
    {
      type: "music",
      name: "NetEaseMusic",
      url: "https://music.163.com/#/user/home?id=1997803975",
    },
    {
      type: "github",
      name: "GitHub",
      url: "https://github.com/Lapis0x0",
    },
  ],
}
