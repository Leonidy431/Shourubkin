export type Lang = 'ru' | 'en';

export const t = {
  ru: {
    siteName: 'Александр Шурубкин',
    nav: {
      home: 'Главная',
      bio: 'Биография',
      hydrolab: 'Гидролаборатория',
      courses: 'Курсы и IDC',
      seminars: 'Расписание',
      news: 'Новости',
      contacts: 'Контакты',
    },
    heroTitle: 'Александр Дмитриевич Шурубкин',
    heroSubtitle: 'Курс-директор PADI · Специалист гидролаборатории Центра подготовки космонавтов им. Ю. А. Гагарина',
    heroLead: 'Более 40 лет подготовки людей к работе под водой — от тренировок космонавтов в гидролаборатории Звёздного городка до подготовки профессиональных инструкторов PADI.',
    ctaCourses: 'Записаться на IDC',
    ctaContact: 'Связаться',
    identityDiver: 'Курс-директор PADI',
    identityDiverText: 'Подготовка профессиональных инструкторов дайвинга: IDC, IDC Staff Instructor, MSDT, семинары для курс-директоров. Сотни выпускников по всему миру.',
    identityHydrolab: 'Гидролаборатория ЦПК',
    identityHydrolabText: 'Многолетняя работа в гидролаборатории Центра подготовки космонавтов в Звёздном городке: подготовка космонавтов и астронавтов к работе в открытом космосе в условиях гидроневесомости.',
    latestNews: 'Последние новости',
    allNews: 'Все новости',
    upcomingSeminars: 'Ближайшие семинары',
    allSeminars: 'Полное расписание',
    readMore: 'Читать далее',
    statsYears: 'лет под водой',
    statsInstructors: 'подготовленных инструкторов',
    statsCosmonauts: 'космонавтов и астронавтов',
    statsDives: 'погружений',
    footerRights: 'Все права защищены.',
  },
  en: {
    siteName: 'Alexander Shurubkin',
    nav: {
      home: 'Home',
      bio: 'Biography',
      hydrolab: 'Hydro Laboratory',
      courses: 'Courses & IDC',
      seminars: 'Schedule',
      news: 'News',
      contacts: 'Contacts',
    },
    heroTitle: 'Alexander Shurubkin',
    heroSubtitle: 'PADI Course Director · Hydro Laboratory specialist, Gagarin Cosmonaut Training Center',
    heroLead: 'Over 40 years of preparing people to work underwater — from training cosmonauts in the Star City hydro laboratory to educating professional PADI instructors.',
    ctaCourses: 'Apply for IDC',
    ctaContact: 'Get in touch',
    identityDiver: 'PADI Course Director',
    identityDiverText: 'Training professional diving instructors: IDC, IDC Staff Instructor, MSDT, Course Director seminars. Hundreds of graduates worldwide.',
    identityHydrolab: 'Hydro Laboratory, Star City',
    identityHydrolabText: 'Years of work at the hydro laboratory of the Gagarin Cosmonaut Training Center in Star City: preparing cosmonauts and astronauts for spacewalks in simulated weightlessness underwater.',
    latestNews: 'Latest news',
    allNews: 'All news',
    upcomingSeminars: 'Upcoming seminars',
    allSeminars: 'Full schedule',
    readMore: 'Read more',
    statsYears: 'years underwater',
    statsInstructors: 'instructors trained',
    statsCosmonauts: 'cosmonauts & astronauts',
    statsDives: 'dives logged',
    footerRights: 'All rights reserved.',
  },
} as const;

export function langFromUrl(pathname: string, base: string): Lang {
  const path = pathname.startsWith(base) ? pathname.slice(base.length) : pathname;
  return path === '/en' || path.startsWith('/en/') ? 'en' : 'ru';
}

export function localizePath(path: string, lang: Lang): string {
  const clean = path.startsWith('/') ? path : '/' + path;
  const localized = lang === 'en' ? '/en' + (clean === '/' ? '' : clean) : clean;
  // Трейлинг-слэш обязателен: GitHub Pages отдаёт directory/index.html без
  // 301-редиректа только по адресу со слэшем на конце
  return localized.endsWith('/') ? localized : localized + '/';
}
