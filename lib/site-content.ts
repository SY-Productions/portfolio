import { CONTACT, OWNER, SITE_NAME, SITE_URL } from "./site-profile";

/**
 * Editorial copy for the trust-anchor pages (/about, /contact, /privacy),
 * written once and consumed by both the rendered pages and the markdown
 * representations served under `Accept: text/markdown`. A single source stops
 * the two views from drifting apart.
 */

export type ContentSection = {
  heading: string;
  /** Paragraphs. Rendered as <p> in HTML, blank-line separated in markdown. */
  body: string[];
  /** Optional bullet list rendered after the paragraphs. */
  bullets?: string[];
};

export type StaticPageContent = {
  path: string;
  title: string;
  titleFa: string;
  description: string;
  descriptionFa: string;
  sectionsFa: ContentSection[];
  sectionsEn: ContentSection[];
};

export const ABOUT_PAGE: StaticPageContent = {
  path: "/about",
  title: `About ${OWNER.name} — ${SITE_NAME}`,
  titleFa: `درباره ${OWNER.nameFa}`,
  description: `${OWNER.name} is an independent mobile and web developer based in ${CONTACT.addressLocality}, ${CONTACT.addressCountryName}, building production Flutter apps, React front-ends and Python back-ends.`,
  descriptionFa: `${OWNER.nameFa}، توسعه‌دهنده مستقل موبایل و وب، ساکن ${CONTACT.addressLocalityFa} — سازنده اپلیکیشن‌های فلاتر، رابط‌های ریکت و بک‌اندهای پایتون.`,
  sectionsFa: [
    {
      heading: "من کی هستم",
      body: [
        `${OWNER.nameFa} هستم؛ توسعه‌دهنده مستقل موبایل و وب که در ${CONTACT.addressLocalityFa} کار می‌کند. مسیرم از کنجکاوی درباره کامپیوتر شروع شد و بعد از سال‌ها آزمون‌وخطا در زبان‌ها و فریم‌ورک‌های مختلف، به جایی رسیدم که امروز هستم: کسی که نرم‌افزار تولیدی می‌نویسد، تحویل می‌دهد و پشتیبانی می‌کند.`,
        "تمرکز اصلی‌ام روی اپلیکیشن‌های موبایل با فلاتر است — از طراحی معماری تا انتشار در استور. در کنارش رابط‌های وب با ریکت و نکست و سرویس‌های بک‌اند با پایتون (FastAPI و جنگو) می‌سازم.",
      ],
    },
    {
      heading: "چه کارهایی انجام می‌دهم",
      body: [
        "پروژه‌هایی را می‌پذیرم که در آن‌ها کیفیت کد، معماری تمیز و تحویل واقعی اهمیت دارد. کار من معمولاً یکی از این شکل‌هاست:",
      ],
      bullets: [
        "ساخت اپلیکیشن موبایل کراس‌پلتفرم با فلاتر و دارت (معماری BLoC یا GetX)",
        "توسعه رابط کاربری وب با ریکت، نکست‌جی‌اس و تیلویند",
        "پیاده‌سازی API و بک‌اند با پایتون، FastAPI، جنگو و پایگاه‌داده‌های رابطه‌ای",
        "ساخت و فروش قالب‌ها و افزونه‌های وردپرس با پشتیبانی کامل راست‌به‌چپ",
        "بازطراحی و بهبود کارایی پروژه‌های موجود",
      ],
    },
    {
      heading: "چطور کار می‌کنم",
      body: [
        "قبل از نوشتن کد، مسئله را روشن می‌کنم؛ محدوده کار، خروجی و زمان‌بندی را شفاف می‌نویسم و در طول پروژه مرتب گزارش می‌دهم. کد را طوری می‌نویسم که شش ماه بعد هم قابل نگهداری باشد: ماژول‌های کوچک، نام‌های واضح و مدیریت خطای صریح.",
        "برای هر پروژه مخزن گیت، مستندات و مسیر انتشار مشخص تحویل می‌دهم تا تیم بعدی بتواند بدون من ادامه دهد.",
      ],
    },
    {
      heading: "ارتباط",
      body: [
        `برای شروع همکاری کافی است به ${CONTACT.email} ایمیل بزنید یا از صفحه تماس استفاده کنید. معمولاً ظرف یک روز کاری پاسخ می‌دهم.`,
      ],
    },
  ],
  sectionsEn: [
    {
      heading: "Who I am",
      body: [
        `I am ${OWNER.name} — an independent mobile and web developer working from ${CONTACT.addressLocality}, ${CONTACT.addressCountryName}. I started out simply curious about computers, spent years trying different languages and stacks, and ended up where I am now: writing, shipping and maintaining production software.`,
        "My main focus is cross-platform mobile development with Flutter, from architecture through store release. Alongside that I build web front-ends with React and Next.js and back-end services in Python.",
      ],
    },
    {
      heading: "What I do",
      body: [
        "I take on work where code quality, clean architecture and actual delivery matter. In practice that looks like:",
      ],
      bullets: [
        "Cross-platform mobile apps in Flutter and Dart (BLoC or GetX architecture)",
        "Web interfaces with React, Next.js and Tailwind CSS",
        "APIs and back-end services in Python with FastAPI or Django",
        "Premium WordPress themes and plugins with full RTL support",
        "Refactoring and performance work on existing codebases",
      ],
    },
    {
      heading: "How I work",
      body: [
        "I clarify the problem before writing code: scope, deliverables and timeline in writing, with regular progress updates. I write code meant to survive six months of other people maintaining it — small modules, clear names, explicit error handling.",
        "Every project ships with a Git repository, documentation and a defined release path, so the next team can carry it forward without me.",
      ],
    },
    {
      heading: "Getting in touch",
      body: [
        `Email ${CONTACT.email} or use the contact page to start a conversation. I usually reply within one business day.`,
      ],
    },
  ],
};

export const CONTACT_PAGE: StaticPageContent = {
  path: "/contact",
  title: `Contact ${OWNER.name} — ${SITE_NAME}`,
  titleFa: `تماس با ${OWNER.nameFa}`,
  description: `Reach ${OWNER.name} by email (${CONTACT.email}), phone (${CONTACT.phoneDisplay}) or Telegram. Based in ${CONTACT.addressLocality}, ${CONTACT.addressCountryName}. Replies usually within one business day.`,
  descriptionFa: `راه‌های تماس با ${OWNER.nameFa}: ایمیل، تلفن و تلگرام. مستقر در ${CONTACT.addressLocalityFa}، ایران.`,
  sectionsFa: [
    {
      heading: "راه‌های تماس",
      body: [
        "برای پروژه، همکاری یا مشاوره فنی از هر کدام از راه‌های زیر می‌توانید تماس بگیرید. ایمیل مطمئن‌ترین راه است و همه پیام‌ها را خودم می‌خوانم.",
      ],
      bullets: [
        `ایمیل: ${CONTACT.email}`,
        `تلفن و واتساپ: ${CONTACT.phoneDisplay}`,
        `تلگرام: ${CONTACT.telegram}`,
        `موقعیت: ${CONTACT.addressLocalityFa}، ایران`,
      ],
    },
    {
      heading: "زمان پاسخ‌گویی",
      body: [
        "ساعات کاری معمول من شنبه تا پنجشنبه، ۹ صبح تا ۶ بعدازظهر به وقت ایران (UTC+3:30) است. به ایمیل‌ها معمولاً ظرف یک روز کاری پاسخ می‌دهم؛ اگر پیام در آخر هفته ارسال شود، پاسخ در اولین روز کاری بعد ارسال می‌شود.",
      ],
    },
    {
      heading: "برای اینکه سریع‌تر جواب بگیرید",
      body: [
        "در پیام اول این موارد را بنویسید تا بتوانم دقیق‌تر و سریع‌تر جواب بدهم:",
      ],
      bullets: [
        "چه چیزی می‌خواهید ساخته شود و برای چه کاربری",
        "پلتفرم هدف: موبایل، وب یا هر دو",
        "بازه زمانی و بودجه تقریبی",
        "لینک مستندات، طرح فیگما یا مخزن موجود در صورت وجود",
      ],
    },
  ],
  sectionsEn: [
    {
      heading: "How to reach me",
      body: [
        "For project work, collaboration or technical consulting, use any of the channels below. Email is the most reliable one, and I read every message myself.",
      ],
      bullets: [
        `Email: ${CONTACT.email}`,
        `Phone and WhatsApp: ${CONTACT.phoneDisplay}`,
        `Telegram: ${CONTACT.telegram}`,
        `Location: ${CONTACT.addressLocality}, ${CONTACT.addressCountryName}`,
      ],
    },
    {
      heading: "Response time",
      body: [
        "My usual working hours are Saturday to Thursday, 9:00 to 18:00 Iran time (UTC+03:30). I answer email within one business day; messages sent over the weekend get a reply on the next working day.",
      ],
    },
    {
      heading: "To get a faster answer",
      body: [
        "Include these details in your first message so I can reply with something concrete:",
      ],
      bullets: [
        "What you want built, and who will use it",
        "Target platform: mobile, web, or both",
        "Rough timeline and budget range",
        "Links to any existing docs, Figma files or repositories",
      ],
    },
  ],
};

export const PRIVACY_PAGE: StaticPageContent = {
  path: "/privacy",
  title: `Privacy Policy — ${SITE_NAME}`,
  titleFa: "سیاست حریم خصوصی",
  description: `What ${SITE_URL} collects, why it collects it, which third parties are involved, and how to request deletion.`,
  descriptionFa:
    "این صفحه توضیح می‌دهد این سایت چه داده‌ای جمع می‌کند، چرا، و چطور می‌توانید حذف آن را درخواست کنید.",
  sectionsFa: [
    {
      heading: "چه داده‌ای جمع‌آوری می‌شود",
      body: [
        "این سایت یک نمونه‌کار شخصی است و حساب کاربری عمومی ندارد. داده‌ای که ذخیره می‌شود محدود است به:",
      ],
      bullets: [
        "آمار بازدید صفحه: مسیر صفحه، زبان انتخابی و زمان بازدید — بدون نام، بدون ایمیل و بدون شناسه تبلیغاتی",
        "محتوای فرم تماس: نام، ایمیل، موضوع و متن پیامی که خودتان ارسال می‌کنید",
        "نظرات وبلاگ: نام و متنی که هنگام ثبت نظر وارد می‌کنید",
      ],
    },
    {
      heading: "چرا جمع‌آوری می‌شود",
      body: [
        "آمار بازدید فقط برای فهمیدن اینکه کدام بخش‌های سایت مفید هستند استفاده می‌شود. اطلاعات فرم تماس فقط برای پاسخ دادن به خود شما به کار می‌رود. هیچ داده‌ای فروخته نمی‌شود، به شبکه تبلیغاتی داده نمی‌شود و برای پروفایل‌سازی رفتاری استفاده نمی‌شود.",
      ],
    },
    {
      heading: "سرویس‌های شخص ثالث",
      body: [
        "این سایت روی زیرساخت ابری میزبانی می‌شود و برای بخش‌هایی از عملکردش به سرویس‌های بیرونی متکی است: میزبانی و شبکه توزیع محتوا، فایربیس برای بخش‌های بی‌درنگ، و API عمومی گیت‌هاب برای نمایش پروژه‌های متن‌باز. این سرویس‌ها ممکن است طبق سیاست خودشان لاگ فنی مانند نشانی IP نگه دارند.",
      ],
    },
    {
      heading: "کوکی‌ها و ذخیره‌سازی محلی",
      body: [
        "کوکی تبلیغاتی و ردیاب شخص ثالث روی این سایت وجود ندارد. حافظه محلی مرورگر فقط برای نگه‌داشتن تنظیمات خودتان (زبان و پوسته) استفاده می‌شود و کوکی نشست تنها در بخش مدیریت سایت و برای ورود مدیر ساخته می‌شود.",
      ],
    },
    {
      heading: "نگه‌داری و حذف داده",
      body: [
        `پیام‌های فرم تماس تا زمانی که برای پیگیری همکاری لازم باشند نگه داشته می‌شوند. برای درخواست حذف پیام، نظر یا هر داده مرتبط با خودتان کافی است به ${CONTACT.email} ایمیل بزنید؛ درخواست حذف را ظرف ۳۰ روز انجام می‌دهم.`,
      ],
    },
  ],
  sectionsEn: [
    {
      heading: "What this site collects",
      body: [
        "This is a personal portfolio site with no public user accounts. The only data stored is:",
      ],
      bullets: [
        "Page view statistics: the page path, the selected language and a timestamp — no name, no email, no advertising identifier",
        "Contact form submissions: the name, email, subject and message you choose to send",
        "Blog comments: the name and text you enter when posting a comment",
      ],
    },
    {
      heading: "Why it is collected",
      body: [
        "Page view statistics are used only to understand which parts of the site are useful. Contact form details are used only to reply to you. No data is sold, shared with advertising networks, or used for behavioural profiling.",
      ],
    },
    {
      heading: "Third-party services",
      body: [
        "The site runs on cloud hosting and relies on a few external services: hosting and CDN delivery, Firebase for real-time features, and the public GitHub API to display open source projects. Those providers may keep technical logs such as IP addresses under their own policies.",
      ],
    },
    {
      heading: "Cookies and local storage",
      body: [
        "There are no advertising cookies and no third-party trackers. Browser local storage is used only to remember your own preferences (language and theme), and a session cookie is created solely in the admin area for the site owner's login.",
      ],
    },
    {
      heading: "Retention and deletion",
      body: [
        `Contact messages are kept for as long as they are needed to follow up on an enquiry. To have a message, a comment or any data relating to you deleted, email ${CONTACT.email}; deletion requests are handled within 30 days.`,
      ],
    },
  ],
};

export const STATIC_PAGES: StaticPageContent[] = [
  ABOUT_PAGE,
  CONTACT_PAGE,
  PRIVACY_PAGE,
];
