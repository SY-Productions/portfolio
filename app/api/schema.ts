import { z } from "zod";

export const schema = z.object({
  faTitle: z.string(),
  enTitle: z.string(),
  enDescription: z.string(),
  faDescription: z.string(),
  isWeb: z.boolean(),
});
// {
//   "isWeb": true,
//   "faTitle": "وبسایت منتخب شاپ",
//   "enTitle": "Montakhab Light Website",
//   "faDescription": "برند منتخب از سال ۱۳۹۲ شروع به فعالیت کرده و برای لانچ تک تک محصولات ماه ها زمان گذاشته شده و بهترین متریال موجود دربازار با توجه به قیمت مقرون به صرفه در محصولات استفاده شده. افتخارات مجموع",
//   "enDescription": "The selected brand started its activities in 2013 and spent months launching each product. The best materials available in the market have been used in the products, considering their afford",
//   "pictures": "/portfolio/mon1.png /portfolio/mon2.png",
//   "link": "https://montakhablighte.ir/",
//   "technologys": "WP",
//   "faStartDate": "بهمن 1402",
//   "enStartDate": "January 2024",
//   "faEndDate": "اسفند 1402",
//   "enEndDate": "February 2024"
// }

// {
//   "isWeb": true,
//   "faTitle": "وبسایت پرنیان",
//   "enTitle": "Parnian Website",
//   "faDescription": "خدمات حمل هوایی انواع کالا به اقصی نقاط دنیا با وبسایت پرنیان. وبسایت پرنیان طراحی شده با وردپرس،دارای ظاهری شیک و جذاب و تجربه کاربری دلچسب و به یاد ماندنی است. با سرعت بالا تمامی سفارشات خود را در کثری از ثانیه ثبت کنید",
//   "enDescription":"Air transportation services for all kinds of stuff to all parts of the world with Pernian website. Parnians website, designed with WordPress, has a stylish and attractive appearance and a pleasant and memorable user experience. Register all your orders with highest performance in a few seconds.",
//   "pictures": "/portfolio/par1.png /portfolio/par2.png",
//   "link": "#",
//   "technologys": "WP",
//   "faStartDate": "اردیبهشت 1399",
//   "enStartDate": "June 2023",
//   "faEndDate": "اردیبهشت 1399",
//   "enEndDate": "June 2020"
// }
