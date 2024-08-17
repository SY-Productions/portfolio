import React from "react";
import Preview from "./Preview";
import Information from "./Information";
import { WorkSample } from "@prisma/client";
import SampleSwitcher from "./SampleSwitcher";
// const staticData: WorkSample[] = [
//   {
//     id: 1,
//     isWeb: true,
//     faTitle: "وبسایت منتخب شاپ",
//     enTitle: "Montakhab Light Website",
//     faDescription:
//       "برند منتخب از سال ۱۳۹۲ شروع به فعالیت کرده و برای لانچ تک تک محصولات ماه ها زمان گذاشته شده و ...",
//     enDescription:
//       "The selected brand started its activities in 2013 and spent months launching each product. The best materials available in the market have been used in the products, considering their afford",
//     pictures: "/portfolio/mon1.png /portfolio/mon2.png",
//     link: "https://montakhablighte.ir/",
//     technologys: "WP",
//     faStartDate: "بهمن 1402",
//     enStartDate: "January 2024",
//     faEndDate: "اسفند 1402",
//     enEndDate: "February 2024",
//   },
//   {
//     id: 11,
//     isWeb: true,
//     faTitle: "وبسایت پرنیان",
//     enTitle: "Parnian Website",
//     faDescription:
//       "خدمات حمل هوایی انواع کالا به اقصی نقاط دنیا با وبسایت پرنیان.",
//     enDescription:
//       "Air transportation services for all kinds of stuff to all parts of the world with Pernian website.",
//     pictures: "/portfolio/par1.png /portfolio/par2.png",
//     link: "https://google.com/",
//     technologys: "WP",
//     faStartDate: "اردیبهشت 1399",
//     enStartDate: "June 2023",
//     faEndDate: "اردیبهشت 1399",
//     enEndDate: "June 2020",
//   },
//   {
//     id: 12,
//     isWeb: false,
//     faTitle: "ترخینه",
//     enTitle: "Tarkhine",
//     faDescription:
//       "ترخینه، یک اپلیکیشن سفارش غذایِ تماما ایرانی، دوای گرسنگی شما در هر لحظه!",
//     enDescription:
//       "Tarkhine, a complete perisan delivery food application, best friend for your hungery moments!",
//     pictures:
//       "/portfolio/tarkhine1.png /portfolio/tarkhine2.png /portfolio/tarkhine3.png /portfolio/tarkhine4.png",
//     link: "https://github.com/YOUSSSOF/Tarkhine",
//     technologys: "dart flutter python django",
//     faStartDate: "تیر 1402",
//     enStartDate: "June 2022",
//     faEndDate: "شهریور 1402",
//     enEndDate: "August 2022",
//   },
// ];
// export interface PreviewProps {
//   isWeb: boolean;
//   pictures: string;
// }
// export interface InformationProps {
//   isWeb: boolean;
//   faTitle: string;
//   faDescription: string;
// }

export default async function WorkSamples() {
  const res = await fetch("http://localhost:3000/api/");
  const data: WorkSample[] = await res.json();

  return (
    <div className="flex flex-col lg:flex-row-reverse items-center justify-center mt-12 bg-[url('/vectors/sec1-bgdark.svg')] bg-no-repeat bg-cover w-full h-auto lg:h-screen ">
      <Preview data={data} />
      <div className="INFO&SWITCH">
        <Information data={data} />
        <SampleSwitcher />
      </div>
    </div>
  );
}
