/**
 * One-time script to fill in EN/AR translation fields for all existing DB records.
 * Run with:  npx ts-node --compiler-options '{"module":"CommonJS"}' scripts/update-translations.ts
 */

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌍 Updating multilingual translations...\n");

  // ─────────────────────────────────────────
  // WORK SAMPLES
  // ─────────────────────────────────────────

  await prisma.workSample.update({
    where: { id: 1 },
    data: {
      enDescription:
        "The personal portfolio site you're looking at right now — built with React and ChakraUI.",
      arTitle: "موقع البورتفوليو",
      arDescription:
        "موقعي الشخصي الذي تتصفحه الآن، مبني بمكتبة React ومكونات ChakraUI.",
      enStartDate: "July 2023",
      arStartDate: "يوليو 2023",
      enEndDate: "September 2023",
      arEndDate: "سبتمبر 2023",
    },
  });
  console.log("✓ WorkSample 1 — Portfolio Website");

  await prisma.workSample.update({
    where: { id: 2 },
    data: {
      enDescription:
        "Montakhab has been crafting quality lighting products since 2013. Every item goes through months of careful development, pairing the finest materials on the market with genuinely accessible pricing.",
      arTitle: "موقع منتخب للإضاءة",
      arDescription:
        "منتخب علامة تجارية للإضاءة تأسست عام 2013، تُطلق كل منتج بعد أشهر من التطوير الدقيق، مع الحرص على أفضل المواد المتاحة في السوق بأسعار في متناول الجميع.",
      enStartDate: "January 2024",
      arStartDate: "يناير 2024",
      enEndDate: "March 2024",
      arEndDate: "مارس 2024",
    },
  });
  console.log("✓ WorkSample 2 — Montakhab Light Website");

  await prisma.workSample.update({
    where: { id: 3 },
    data: {
      enDescription:
        "Global air freight services for all types of cargo — connecting customers to every corner of the world through the Parnian platform.",
      arTitle: "موقع برنيان",
      arDescription:
        "خدمات شحن جوي دولية لجميع أنواع البضائع، تربط العملاء بكل أرجاء العالم من خلال منصة برنيان.",
      enStartDate: "May 2020",
      arStartDate: "مايو 2020",
      enEndDate: "May 2020",
      arEndDate: "مايو 2020",
    },
  });
  console.log("✓ WorkSample 3 — Parnian Website");

  await prisma.workSample.update({
    where: { id: 4 },
    data: {
      arTitle: "سبيد، خدمة التوصيل بالدراجات النارية",
      arDescription:
        "توصيل سريع وموثوق بلا تعقيدات في راحة يدك. سبيد — الحل الأمثل للتوصيل الفوري. %g% في عالم اليوم المتسارع، لا مجال للانتظار. جاء سبيد ليُحدث ثورة في طريقة إرسال واستقبال الطرود عبر خدمة توصيل دراجات نارية فائقة السرعة. سواء أردت إرسال وثائق مهمة أو طعام أو هدية في اللحظة الأخيرة، يربطك تطبيقنا بأقرب ساعٍ متاح في ثوانٍ معدودة. مبني على Flutter وRiverpod من جانب العميل، وDjango وDjango REST Framework من جانب الخادم، مع تحسينات Redis واتصالات WebSocket لحظية. يتكوّن النظام من تطبيقين منفصلين للعملاء والسائقين، وكل توصيل يُتابَع في الوقت الحقيقي.",
      arStartDate: "ديسمبر 2024",
      arEndDate: "مارس 2025",
    },
  });
  console.log("✓ WorkSample 4 — Speed Delivery");

  await prisma.workSample.update({
    where: { id: 5 },
    data: {
      arTitle: "زورا، مدرب اللياقة البدنية الذكي",
      arDescription:
        "زورا — المزيج المثالي من الخبرة الرياضية والتكنولوجيا وتحليل البيانات لتحقيق اللياقة المثالية! مع زورا، طريقك نحو التقدم أوضح من أي وقت مضى. %g% مع زورا لن يكون التمرين مجرد روتين يومي، بل تجربة ذكية وديناميكية ومدعومة علمياً. يستخدم التطبيق Flutter وRiverpod ليوفر أدوات متكاملة لتتبع التمارين والتغذية وتطور الجسم. يبرز زورا بمخططاته التفاعلية ورسومه البيانية المتقدمة ونماذجه ثلاثية الأبعاد للجسم البشري التي تعكس أداءك وتقدمك بدقة. الرسوم المتحركة السلسة والتأثيرات البصرية الجذابة تجعل كل تمرين أكثر متعة وإثارة.",
      arStartDate: "ديسمبر 2024",
      arEndDate: "يناير 2025",
    },
  });
  console.log("✓ WorkSample 5 — Zura Fitness App");

  await prisma.workSample.update({
    where: { id: 6 },
    data: {
      arTitle: "قالب تطبيق المتجر المتعدد المنصات",
      arDescription:
        "أول وأحدث قالب تطبيق متعدد المنصات في السوق الإيرانية! %g% ModernCommerce قالب تجارة إلكترونية احترافي مبني بـ Flutter من الصفر — أطلق متجرك بسرعة وركّز على ما يميّزه. متجاوب تماماً ويعمل على Android وiOS وWindows وMac وLinux. يأتي مع لوحة تحكم إدارية متكاملة (CMS) تمنحك سيطرة كاملة على المنتجات والمخزون والمستخدمين والطلبات. للمزيد من التفاصيل والشراء، تفضل بزيارة رست‌چين!",
      arStartDate: "نوفمبر 2024",
      arEndDate: "ديسمبر 2024",
    },
  });
  console.log("✓ WorkSample 6 — ModernCommerce Template");

  await prisma.workSample.update({
    where: { id: 7 },
    data: {
      arTitle: "آي بت بلاس",
      arDescription:
        "جميع احتياجات حيوانك الأليف في منصة واحدة! %g% iPetPlus منصة شاملة لبيع وشراء منتجات وخدمات الحيوانات الأليفة في جميع أنحاء البلاد. يعرض فيها موردون موثوقون منتجاتهم عبر الإنترنت، مع تشكيلة واسعة من أبرز العلامات التجارية لتلبية كل احتياجات حيوانك بجودة مضمونة. مقارنة المنتجات والدفع الآمن والشحن السريع وتتبع الطلبات — كل ما تحتاجه في مكان واحد.",
      arStartDate: "يوليو 2024",
      arEndDate: "سبتمبر 2024",
    },
  });
  console.log("✓ WorkSample 7 — iPET Plus");

  await prisma.workSample.update({
    where: { id: 8 },
    data: {
      enDescription:
        "Tarkhine brings you the real taste of Iranian cuisine — anytime, anywhere, with just a tap! %g% Tarkhine is a fully Iranian food delivery app that takes you on a culinary journey through traditional and modern Persian dishes. From sizzling kebabs to rich, slow-cooked stews, every craving is covered. Built with Flutter and Bloc for a fast, smooth, and effortless ordering experience every time.",
      arTitle: "ترخينه",
      arDescription:
        "ترخينه يجلب لك الطعم الحقيقي للمطبخ الإيراني — في أي وقت وأي مكان، بنقرة واحدة! %g% ترخينه تطبيق توصيل طعام إيراني بامتياز، يأخذك في رحلة شهية عبر المأكولات الإيرانية التقليدية والعصرية. من الكباب الشهي إلى الطواجن الأصيلة الغنية، كل شهية تجد ما يُرضيها. مدعوم بـ Flutter وBloc لتجربة طلب سريعة وسلسة في كل مرة.",
      enStartDate: "July 2023",
      arStartDate: "يوليو 2023",
      enEndDate: "September 2023",
      arEndDate: "سبتمبر 2023",
    },
  });
  console.log("✓ WorkSample 8 — Tarkhine Food Delivery");

  await prisma.workSample.update({
    where: { id: 9 },
    data: {
      arTitle: "بوكس أوفيس بيت",
      arDescription:
        "بوكس أوفيس بيت رفيقك المثالي في عالم السينما، يقدم معلومات وتقييمات وتوجهات آنية مدعومة بـ TMDB API. %g% سواء كنت مشاهداً عادياً أو مدمن سينما محترفاً، يبقيك بوكس أوفيس بيت على اطلاع دائم بأحدث الأفلام والمقاطع الترويجية والمراجعات — كل ما تحتاجه لجعل ليلة أفلامك استثنائية!",
      arStartDate: "يونيو 2020",
      arEndDate: "يوليو 2020",
    },
  });
  console.log("✓ WorkSample 9 — BoxOfficeBeat");

  await prisma.workSample.update({
    where: { id: 10 },
    data: {
      arTitle: "غرين ثمب",
      arDescription:
        "غرين ثمب — الطريق الذكي لشراء النباتات والعناية بها! وداعاً للأوراق الذابلة ومرحباً بالخضرة المزدهرة. %g% صُمِّم هذا التطبيق ليجعل العناية بالنباتات أمراً سهلاً وممتعاً. بإرشادات متخصصة ومذكرات ري تلقائية ومجموعة واسعة من النباتات بين يديك، يمكن لأي شخص تطوير موهبته الخضراء. مدعوم بـ Flutter ليقدم تجربة سلسة وبديهية تحوّل العناية بالنباتات من مهمة شاقة إلى هواية مريحة ومُجزية.",
      arStartDate: "مايو 2023",
      arEndDate: "يوليو 2023",
    },
  });
  console.log("✓ WorkSample 10 — GreenThumb");

  // ─────────────────────────────────────────
  // EDUCATION
  // ─────────────────────────────────────────

  await prisma.education.updateMany({
    where: { name: "دبیرستان ماندگار شهدای ادب" },
    data: {
      nameEn: "Shohada-e-Adab High School",
      nameAr: "مدرسة شهداء الأدب الثانوية",
      descriptionEn:
        "Completed high school at Shohada-e-Adab, majoring in Mathematics & Physics, graduating with a diploma.",
      descriptionAr:
        "أتممت دراستي الثانوية في مدرسة شهداء الأدب، قسم الرياضيات والفيزياء، وحصلت على شهادة الثانوية العامة.",
    },
  });
  console.log("✓ Education — Shohada-e-Adab High School");

  await prisma.education.updateMany({
    where: { name: "دانشگاه بین المللی آزاد خوراسگان" },
    data: {
      nameEn: "Islamic Azad University, Khorasgan Branch",
      nameAr: "جامعة آزاد الإسلامية، فرع خوراسقان",
      descriptionEn:
        "Currently pursuing a Bachelor's degree in Computer Science at this university.",
      descriptionAr:
        "أدرس حالياً درجة البكالوريوس في علوم الحاسوب في هذه الجامعة.",
    },
  });
  console.log("✓ Education — Islamic Azad University");

  // ─────────────────────────────────────────
  // WORKS
  // ─────────────────────────────────────────

  await prisma.work.updateMany({
    where: { url: "https://neshatrokh.com" },
    data: {
      nameEn: "NeshatRokh Co.",
      nameAr: "شركة نشاط روخ آرا",
      descriptionEn:
        "Worked as a freelancer with NeshatRokh for 6 months, contributing to their Flutter-based mobile projects.",
      descriptionAr:
        "عملت بصفة مستقلة مع شركة نشاط روخ لمدة 6 أشهر، وأسهمت في مشاريع الجوال المبنية بـ Flutter.",
    },
  });
  console.log("✓ Work — NeshatRokh Co.");

  // ─────────────────────────────────────────
  // EVENTS
  // ─────────────────────────────────────────

  await prisma.event.updateMany({
    where: { name: { contains: "داناکاپ" } },
    data: {
      nameEn: "1st DanaCup Programming & Software Competition",
      nameAr: "الدورة الأولى لمسابقات داناكاب للبرمجة والبرمجيات",
      descriptionEn:
        "Achieved a top ranking in the inaugural DanaCup competition, held in collaboration with Islamic Azad University, Najafabad Branch. The contest brought together top participants from across Isfahan Province to raise the bar in scientific and practical skills in technology.",
      descriptionAr:
        "حققت مرتبة متقدمة في الدورة الأولى لمسابقات داناكاب، التي أُقيمت بالتعاون مع جامعة آزاد الإسلامية فرع نجف‌آباد. استقطبت المسابقة نخبة المشاركين من جميع أنحاء محافظة أصفهان، بهدف تطوير المهارات العلمية والتقنية لدى الطلاب.",
    },
  });
  console.log("✓ Event — DanaCup Competition");

  await prisma.event.updateMany({
    where: { name: { contains: "ICT" } },
    data: {
      nameEn: "9th National ICT Challenge Programming Competition",
      nameAr: "الدورة التاسعة لمسابقات تحديات تكنولوجيا المعلومات الوطنية",
      descriptionEn:
        "Participated in the 9th national ICT Challenge, hosted by Sharif University of Technology — a valuable opportunity to compete against top teams from across the country. Beyond sharpening my technical skills, the event introduced me to blockchain programming, which I was able to implement hands-on.",
      descriptionAr:
        "شاركت في الدورة التاسعة من مسابقة ICT Challenge الوطنية التي استضافتها جامعة شريف للتكنولوجيا، فرصة ثمينة للمنافسة مع أبرز الفرق في البلاد. أسهمت في صقل مهاراتي التقنية وعرّفتني على برمجة البلوك‌تشين التي تمكّنت من تطبيقها عملياً.",
    },
  });
  console.log("✓ Event — ICT Challenge Competition");

  console.log("\n✅ All translations updated successfully!");
}

main()
  .catch((e) => {
    console.error("❌ Error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
