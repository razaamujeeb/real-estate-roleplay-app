// characters.js

const characters = {
  easy: [
    {
      name: "佐藤 花子",
      job: "会社員",
      nationality: "日本",
      personality: "穏やかで話しやすい",
      family: "夫と2人暮らし",
      opening: "こんにちは、不動産の件でご相談したいのですが…",
      template: (userInput) => `すみません、${userInput}についてもう少し詳しく教えていただけますか？`
    },
    {
      name: "山田 太郎",
      job: "アルバイト",
      nationality: "日本",
      personality: "控えめで丁寧",
      family: "一人暮らし",
      opening: "家を借りようと思っていて、アドバイスをいただけますか？",
      template: (userInput) => `その点については初めてで少し不安です。${userInput}というのは、どんな意味ですか？`
    }
  ],
  normal: [
    {
      name: "李 美玲",
      job: "通訳者",
      nationality: "中国",
      personality: "積極的で聞き上手",
      family: "母と妹と同居",
      opening: "こんにちは、今日はどのような物件があるか見たいです。",
      template: (userInput) => `ありがとうございます。その点に関して、少し考えさせてください。${userInput}に似た条件もありますか？`
    },
    {
      name: "アレックス・ジョンソン",
      job: "プログラマー",
      nationality: "アメリカ",
      personality: "論理的で丁寧",
      family: "妻と子ども2人",
      opening: "家族で引っ越しを検討していて、3LDKの物件を探しています。",
      template: (userInput) => `了解しました。${userInput}については、いくつか質問させてください。`
    }
  ],
  hard: [
    {
      name: "鈴木 一郎",
      job: "投資家",
      nationality: "日本",
      personality: "要求が多く厳しい",
      family: "独身",
      opening: "このエリアの利回りについて詳しく教えてくれ。",
      template: (userInput) => `それでは、${userInput}の具体的な条件を教えてくれ。無駄な提案はいらない。`
    },
    {
      name: "クリスティーナ・ミラー",
      job: "会社役員",
      nationality: "ドイツ",
      personality: "冷静かつ論理的",
      family: "夫と2人暮らし",
      opening: "駅から徒歩5分以内の物件を探しています。予算は1億円まで。",
      template: (userInput) => `論理的に判断したいので、${userInput}の根拠となる資料をいただけますか？`
    }
  ]
};

export default characters;
