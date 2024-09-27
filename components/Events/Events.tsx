import React from "react";
import EduCard from "./EventCard";

export type Event = {
  name: string;
  date: string;
  picture: string;
  attachment: string;
  description?: string;
};

const EventData: Event[] = [
  {
    name: "اولین دوره مسابقات بزرگ برنامه نویسی و نرم افزار نرم افزارهای تخصصی داناکاپ",
    date: "تیر 1403",
    picture: "/events/danacup-logo.jpg",
    attachment: "/events/danacup.jpg",
    description:
      "کسب رتبه برتر در نخستین دوره مسابقات داناکاپ که با همکاری دانشگاه آزاد اسلامی واحد نجف‌آباد برگزار گردید. این مسابقات، با حضور شرکت‌کنندگان برتر از سراسر استان اصفهان، به منظور ارتقاء سطح دانش و مهارت‌های علمی و عملی دانشجویان در زمینه‌های مختلف علمی و فناوری برگزار شد. ",
  },
  {
    name: "نهمین دوره مسابقات برنامه نویسی چالش های فناوری اطلاعات کشور",
    date: "شهریور 1403",
    picture: "/events/ict-logo.jpg",
    attachment: "/events/ict.jpg",
    description:
      "شرکت در نهمین دوره مسابقات ملی ICT Challenge به میزبانی دانشگاه صنعتی شریف، فرصتی ارزشمند برای رقابت با تیم‌های نخبه کشور بود. این رویداد علاوه بر تقویت مهارت‌های فنی من، باعث آشنایی با برنامه‌نویسی بلاکچین شد که توانستم آن را به‌طور عملی پیاده‌سازی کنم.",
  },
];

export default function Event() {
  return (
    <div
      id="events"
      className="bg-[url('/vectors/sec1-bgdark.svg')] bg-no-repeat bg-cover h-auto "
    >
      <div className="ALL lg:w-[70vw] lg:mr-[22vw] pb-12">
        <div className="H3&P pt-[5vh] w-[80%] pr-[10vw] lg:pr-0">
          <h3 className="xl:text-4xl font-[ybb] text-white/80 self-start mb-6 text-nowrap">
            رویداد ها، مسابقات و جوایز
          </h3>
          <p className="font-[ybn] text-white/40 self-start mb-[5vh] text-wrap 2xl:text-lg">
            علاقه ی خاص و بیش از اندازه ای به هنر داشتم اما هنگام انتخاب رشته
            رفتم سمت رشته ی ریاضی و مباحث کامپیوتر و مهندسی. سوابق و مدارک
            تحصیلی من ( این بخش به مرور زمان کامل تر میشه ) :
          </p>
        </div>
        <div className="grid lg:inline-grid grid-cols-1 lg:grid-cols-2 gap-5">
          {EventData.map((event) => (
            <EduCard key={event.description} data={event} />
          ))}
        </div>
      </div>
    </div>
  );
}
