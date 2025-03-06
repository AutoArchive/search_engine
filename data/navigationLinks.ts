// Navigation links organized by content type with descriptions
const navigationLinks = [
  {
    category: "百科与基础知识",
    links: [
      { 
        name: "MtF.wiki", 
        url: "https://mtf.wiki/zh-cn/", 
        description: "关于女性倾向跨性别者(MtF)的综合性维基百科网站",
        tags: ["MtF"] 
      },
      { 
        name: "FtM.wiki", 
        url: "https://ftm.wiki", 
        description: "关于男性倾向跨性别者(FtM)的综合性维基百科网站",
        tags: ["FtM"] 
      },
      { 
        name: "RLE.wiki", 
        url: "https://rle.wiki", 
        description: "关于真实生活体验(RLE)的信息与指南",
        tags: ["MtF", "FtM"] 
      },
      { 
        name: "这就是性别烦躁，供参考", 
        url: "https://genderdysphoria.fyi/zh/", 
        description: "全面解析性别烦躁的中文指南",
        tags: ["MtF", "FtM"] 
      },
      { 
        name: "MtF.wiki TFSci", 
        url: "https://tfsci.mtf.wiki", 
        description: "女性倾向跨性别者科学”（Transfeminine Science）中文译本存档站",
        tags: ["MtF", "学术"] 
      },
      { 
        name: "awesome trans", 
        url: "https://awesometrans.github.io/awesometrans_zh/", 
        description: "跨性别相关资源的精选集合",
        tags: ["MtF", "FtM"] 
      },
      { 
        name: "跨性別資訊 - 臺北市政府", 
        url: "https://transgender.taipei", 
        description: "台北市政府提供的跨性别相关政策与资讯",
        tags: ["台湾", "政府", "官方"] 
      }
    ]
  },
  {
    category: "实用指南与教程",
    links: [
      { 
        name: "跨性别选校手册 (简体)", 
        url: "https://uniguide.transacademic.org/zh-hans/", 
        description: "为跨性别学生提供的高校选择指南",
        tags: ["大陆", "学术"] 
      },
      { 
        name: "跨性別選校手冊 (繁体)", 
        url: "https://uniguide.transacademic.org/zh-hant/", 
        description: "為跨性別學生提供的高校選擇指南",
        tags: ["台湾", "香港", "学术"] 
      },
      { 
        name: "Transman Helper", 
        url: "https://transmanhelper.com", 
        description: "专为FtM跨性别者设计的实用信息平台",
        tags: ["FtM", "指南"] 
      },
      { 
        name: "MtF 指南针", 
        url: "https://mtf.party", 
        description: "一个为MtF群体提供各种帮助指南的站点",
        tags: ["MtF", "指南"] 
      },
      { 
        name: "性別友善廁所地圖", 
        url: "https://vocus.cc/article/5f9f8d92fd89780001d14bd5", 
        description: "台湾地区性别友善厕所分布地图",
        tags: ["台湾", "RLE"] 
      }
    ]
  },
  {
    category: "社区与讨论平台",
    links: [
      { 
        name: "Project Trans Blog", 
        url: "https://blog.project-trans.org", 
        description: "Project Trans 的博客平台",
        tags: ["MtF", "FtM", "博客"] 
      },
      { 
        name: "Project Trans Community", 
        url: "https://link.mtf.wiki/discord", 
        description: "Discord 上的跨性别社区讨论组",
        tags: ["社区", "聊天"] 
      },
      { 
        name: "r/mtf_zh", 
        url: "https://reddit.com/r/mtf_zh", 
        description: "Reddit 上的中文MtF讨论组",
        tags: ["MtF", "社区"] 
      },
      { 
        name: "MtF Hub", 
        url: "https://hub.mtf.party/explore", 
        description: "由琴春(@vxst@hub.mtf.party)运营，面向跨性别🏳️‍⚧️人士开放注册的社区平台",
        tags: ["MtF", "社区"] 
      },
      { 
        name: "One Among Us 社群", 
        url: "https://oneamongus.ca", 
        description: "去世跨性别者与友跨人士建立的网站",
        tags: ["社区", "支持"] 
      },
      { 
        name: "跨性别交流社群 (Line)", 
        url: "https://line.me/ti/g2/1KIFjuRQ06LZSO_ucBwHlw", 
        description: "LINE上的台湾跨性别交流群组",
        tags: ["台湾", "社区", "聊天"] 
      },
      { 
        name: "MTF 之家 (Line)", 
        url: "https://line.me/ti/g2/YfLfbQBxLou-lVa27nX7Xq_mNeeKFw60b4HfzA", 
        description: "LINE上的台湾MtF交流群组",
        tags: ["台湾", "MtF", "聊天"] 
      },
      { 
        name: "跨跨們的小樹屋 (Discord)", 
        url: "https://discord.gg/YH3ByZRwSm", 
        description: "Discord上的台湾跨性别社区",
        tags: ["台湾", "社区", "聊天"] 
      },
      { 
        name: "跨性别板（Dcard）", 
        url: "https://dcard.tw/f/trans", 
        description: "台湾大学生社群Dcard上的跨性别讨论板块",
        tags: ["台湾", "社区", "论坛"] 
      },
      { 
        name: "跨性别板（PTT）", 
        url: "https://ptt.cc/bbs/transgender", 
        description: "台湾PTT论坛的跨性别讨论板块",
        tags: ["台湾", "社区", "论坛"] 
      }
    ]
  },
  {
    category: "社区组织与支持团体",
    links: [
      { 
        name: "跨樂園", 
        url: "https://transnation.asia", 
        description: "跨性別交友及分享平台",
        tags: ["香港", "社区", "支持"] 
      },
      { 
        name: "跨青時刻 Quarks", 
        url: "https://facebook.com/quarkshk", 
        description: "香港年轻跨性别者的社区团体",
        tags: ["香港", "社区", "支持"] 
      },
      { 
        name: "未竟之路", 
        url: "https://trnt.tw", 
        description: "台湾跨性别社区资源整合平台",
        tags: ["台湾", "社区", "资源"] 
      },
      { 
        name: "不明小站", 
        url: "https://trnt.lgbt", 
        description: "提供跨性别议题资讯的台湾社区网站",
        tags: ["台湾", "社区", "资讯"] 
      },
      { 
        name: "跨性别学术小组", 
        url: "https://transinacademia.org/", 
        description: "关注学术领域跨性别议题的组织与网站",
        tags: ["学术", "社区"] 
      },
      { 
        name: "基恩之家", 
        url: "https://hkbmcc.org", 
        description: "香港多元性别友善的支持机构",
        tags: ["香港", "支援", "心理"] 
      },
      { 
        name: "熱線跨性別小站", 
        url: "https://facebook.com/groups/468518206672039", 
        description: "台湾同志热线的跨性别支持小组",
        tags: ["台湾", "社区", "支持"] 
      },
      { 
        name: "眾樂教會", 
        url: "https://onebodyinthechrist.blogspot.com", 
        description: "香港性别友善信仰社区",
        tags: ["香港", "信仰", "支援"] 
      }
    ]
  },
  {
    category: "医疗资源与地图",
    links: [
      { 
        name: "醫療看診地圖 (香港)", 
        url: "https://link.mtf.wiki/maps/hk", 
        description: "香港地区跨性别友善医疗资源地图",
        tags: ["香港", "医疗", "地图"] 
      },
      { 
        name: "醫療看診地圖 (台湾)", 
        url: "https://link.mtf.wiki/maps/tw", 
        description: "台湾地区跨性别友善医疗资源地图",
        tags: ["台湾", "医疗", "地图"] 
      },
      { 
        name: "性別友善精神科醫師", 
        url: "https://tgr.org.hk/index.php/zh/10-database/365-taiwantgfriendlypsychiatry", 
        description: "台湾性别友善精神科医师名录",
        tags: ["台湾", "精神科", "医疗"] 
      },
      { 
        name: "皓日專線", 
        url: "https://facebook.com/haori.hotline", 
        description: "台湾跨性别医疗咨询热线",
        tags: ["台湾", "医疗", "咨询"] 
      },
      { 
        name: "跨夢天空 - 跨性別健康與 HiV 資訊站", 
        url: "https://facebook.com/transdreamsky", 
        description: "关注跨性别健康与艾滋病预防的信息平台",
        tags: ["台湾", "健康", "艾滋"] 
      }
    ]
  },
  {
    category: "博客与个人故事",
    links: [
      { 
        name: "生如夏花", 
        url: "https://viva-la-vita.org/", 
        description: "关注性少数群体的性体验",
        tags: ["博客", "性体验"] 
      },
      { 
        name: "KnowSex", 
        url: "https://knowsex.net/", 
        description: "性教育与多元性别认识平台",
        tags: ["性教育", "性体验"] 
      },
      { 
        name: "AGE OF QUEER", 
        url: "https://ageofqueer.com/category/news/transgender_news", 
        description: "关注香港与国际LGBTQ+新闻的网站",
        tags: ["香港", "新闻", "博客"] 
      }
    ]
  },
  {
    category: "社交媒体与官方账号",
    links: [
      { 
        name: "@MtFwiki", 
        url: "https://twitter.com/MtFwiki", 
        description: "MtF.wiki的官方Twitter账号",
        tags: ["MtF", "社交媒体"] 
      },
      { 
        name: "@MtFwiki@mastodon", 
        url: "https://mastodon.social/@MtFwiki", 
        description: "MtF.wiki的官方Mastodon账号",
        tags: ["MtF", "社交媒体"] 
      },
      { 
        name: "@FtMwiki", 
        url: "https://twitter.com/FtMwiki", 
        description: "FtM.wiki的官方Twitter账号",
        tags: ["FtM", "社交媒体"] 
      },
      { 
        name: "@FtMwiki@mastodon", 
        url: "https://mastodon.social/@FtMwiki", 
        description: "FtM.wiki的官方Mastodon账号",
        tags: ["FtM", "社交媒体"] 
      }
    ]
  },
  {
    category: "特殊兴趣社区",
    links: [
      { 
        name: "HKCDFamily", 
        url: "https://hkcdfamily.net", 
        description: "香港变装者与跨性别社区",
        tags: ["香港", "变装", "社区"] 
      },
      { 
        name: "戀之天地", 
        url: "https://hkcdtv.net", 
        description: "香港变装与性少数群体社区",
        tags: ["香港", "变装", "社区"] 
      },
      { 
        name: "香港易服群組", 
        url: "https://facebook.com/groups/hkcdfan/", 
        description: "香港变装爱好者Facebook群组",
        tags: ["香港", "变装", "社区"] 
      },
      { 
        name: "多元性別圖書館", 
        url: "https://facebook.com/groups/185580525638320", 
        description: "台湾多元性别图书分享社区",
        tags: ["台湾", "社区", "图书"] 
      },
      { 
        name: "性別不明關懷協會", 
        url: "https://facebook.com/groups/istscareTW", 
        description: "关注间性人与多元性别议题的台湾组织",
        tags: ["台湾", "间性", "社区"] 
      },
      { 
        name: "偽娘基地", 
        url: "https://facebook.com/groups/291422091340489", 
        description: "台湾女装与跨性别文化社区",
        tags: ["台湾", "女装", "社区"] 
      },
      { 
        name: "台灣非二元性別支持社群", 
        url: "https://facebook.com/groups/1008074439681831", 
        description: "台湾非二元性别者的互助社区",
        tags: ["台湾", "非二元", "社区"] 
      }
    ]
  }
];

export default navigationLinks; 