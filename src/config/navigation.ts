// 数组顺序决定展示顺序；route 保留分类入口，sources 指定归入该分类的原始目录。
export const NAVIGATION_GROUPS = [
  {
    route: '03 【前端-1】',
    sources: ['03 【前端-1】'],
  },
  {
    route: '01 【概念探索阶段】',
    sources: [
      '01 【概念探索阶段】',
      '01 【编程素养】/06 C++ 项目',
      '01 【编程素养】/06 C++系统进阶',
      '01 【编程素养】/06 Qt',
      '01 【编程素养】/06 数据库',
      '01 【编程素养】/06 系统',
    ],
  },
  {
    route: '07 【Datawhale】',
    sources: [
      '01 【编程素养】/10 ML Andrew Ng',
      '01 【编程素养】/10 ML 吃瓜',
      '01 【编程素养】/10 百度飞桨',
      '07 【Datawhale】',
    ],
  },
  {
    route: '102 【深刻提升】',
    sources: ['102 【深刻提升】'],
  },
] as const;
