// components/SchemaMarkup.tsx

import React from 'react';

const SchemaMarkup = () => {
  // Person Schema - Comprehensive personal info with Flutter focus
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "یوسف هاشم زاده",
    "alternateName": "Yousof Hashemzadeh",
    "url": "https://www.youdexsof.ir",
    "image": "https://www.youdexsof.ir/pic.png",
    "sameAs": [
      "https://www.linkedin.com/in/yousof-hashemezade",
      "https://github.com/YOUSSSOF",
      "https://www.instagram.com/youdexsof"
    ],
    "jobTitle": "Flutter Developer | توسعه دهنده فلاتر",
    "worksFor": {
      "@type": "Organization",
      "name": "Freelance"
    },
    "knowsAbout": [
      "Flutter",
      "Dart",
      "BLoC Architecture",
      "GetX State Management",
      "توسعه اپلیکیشن موبایل",
      "برنامه نویسی کراس پلتفرم",
      "Python Backend Development"
    ],
    "description": "توسعه‌دهنده حرفه‌ای اپلیکیشن‌های موبایل با فلاتر و پایتون با تخصص در معماری BLoC و مدیریت حالت GetX | Professional Flutter and Python developer specializing in BLoC architecture and GetX state management"
  };

  // Website Schema
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "url": "https://www.youdexsof.ir/",
    "name": "یوسف هاشم زاده | توسعه دهنده موبایل و فلاتر",
    "alternateName": "Yousof Hashemzadeh | Flutter Developer",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://www.youdexsof.ir/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  // FAQ Schema - Common Flutter Development Questions
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "چه خدماتی در زمینه فلاتر ارائه می‌دهید؟",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "من در زمینه توسعه اپلیکیشن‌های موبایل با فلاتر تخصص دارم و خدماتی مانند طراحی، توسعه، و پشتیبانی اپلیکیشن‌های کراس پلتفرم ارائه می‌دهم. تخصص من در پیاده‌سازی معماری BLoC و مدیریت حالت با GetX است."
        }
      },
      {
        "@type": "Question",
        "name": "What Flutter services do you offer?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "I specialize in mobile app development with Flutter, offering services including design, development, and support for cross-platform applications. My expertise includes implementing BLoC architecture and state management with GetX."
        }
      },
      {
        "@type": "Question",
        "name": "آیا فلاتر مناسب پروژه های تجاری است؟",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "بله، فلاتر یک فریمورک قدرتمند و مناسب برای توسعه اپلیکیشن‌های تجاری است. با استفاده از فلاتر می‌توان اپلیکیشن‌های کراس پلتفرم با عملکرد مشابه نیتیو و رابط کاربری یکپارچه ایجاد کرد که هزینه‌های توسعه را کاهش می‌دهد."
        }
      },
      {
        "@type": "Question",
        "name": "زمان و هزینه تقریبی توسعه یک اپلیکیشن با فلاتر چقدر است؟",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "زمان و هزینه توسعه به پیچیدگی پروژه بستگی دارد. از مزایای فلاتر این است که می‌توانید با یک کدبیس واحد، هم برای اندروید و هم برای iOS توسعه دهید که باعث کاهش زمان و هزینه‌های توسعه می‌شود. برای مشاوره دقیق‌تر درباره پروژه خود با من تماس بگیرید."
        }
      }
    ]
  };

  // BreadcrumbList Schema
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "یوسف هاشم زاده",
        "item": "https://www.youdexsof.ir/"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "مهارت‌ها",
        "item": "https://www.youdexsof.ir/#skills"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "نمونه کارها",
        "item": "https://www.youdexsof.ir/#portfolio"
      },
      {
        "@type": "ListItem",
        "position": 4,
        "name": "تماس با من",
        "item": "https://www.youdexsof.ir/#call-me"
      }
    ]
  };

  // Skills Schema (ItemList)
  const skillsSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "item": {
          "@type": "Thing",
          "name": "Flutter",
          "description": "توسعه اپلیکیشن‌های موبایل کراس پلتفرم با فریمورک فلاتر و زبان دارت | Cross-platform mobile app development with Flutter framework and Dart language"
        }
      },
      {
        "@type": "ListItem",
        "position": 2,
        "item": {
          "@type": "Thing",
          "name": "BLoC Architecture",
          "description": "پیاده‌سازی پیشرفته معماری Business Logic Component برای مدیریت حالت در اپلیکیشن‌های فلاتر | Advanced implementation of Business Logic Component architecture for state management in Flutter applications"
        }
      },
      {
        "@type": "ListItem",
        "position": 3,
        "item": {
          "@type": "Thing",
          "name": "GetX",
          "description": "مدیریت حالت پیشرفته با استفاده از کتابخانه GetX در فلاتر | Advanced state management using GetX library in Flutter"
        }
      },
      {
        "@type": "ListItem",
        "position": 4,
        "item": {
          "@type": "Thing",
          "name": "Python",
          "description": "توسعه سمت سرور با پایتون | Backend development with Python"
        }
      }
    ]
  };

  // Portfolio Projects Schema
  const portfolioSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "item": {
          "@type": "SoftwareApplication",
          "name": "اپلیکیشن فروشگاهی فلاتر",
          "applicationCategory": "MobileApplication",
          "operatingSystem": "Android, iOS",
          "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD"
          },
          "applicationSubCategory": "Flutter",
          "creator": {
            "@type": "Person",
            "name": "یوسف هاشم زاده",
            "url": "https://www.youdexsof.ir"
          },
          "description": "اپلیکیشن فروشگاهی توسعه یافته با فلاتر و معماری BLoC با ویژگی‌های پیشرفته مانند پرداخت آنلاین | E-commerce application developed with Flutter and BLoC architecture with advanced features such as online payment",
          "screenshot": "https://www.youdexsof.ir/projects/ecommerce-app.jpg",
          "softwareVersion": "1.0.0",
          "featureList": "Flutter, BLoC, Firebase, RESTful API integration"
        }
      },
      {
        "@type": "ListItem",
        "position": 2,
        "item": {
          "@type": "SoftwareApplication",
          "name": "اپلیکیشن شبکه اجتماعی با فلاتر",
          "applicationCategory": "MobileApplication",
          "operatingSystem": "Android, iOS",
          "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD"
          },
          "applicationSubCategory": "Flutter",
          "creator": {
            "@type": "Person",
            "name": "یوسف هاشم زاده",
            "url": "https://www.youdexsof.ir"
          },
          "description": "اپلیکیشن شبکه اجتماعی با قابلیت چت، اشتراک‌گذاری محتوا و پروفایل کاربری توسعه یافته با فلاتر و GetX | Social media application with chat capabilities, content sharing, and user profiles developed with Flutter and GetX",
          "screenshot": "https://www.youdexsof.ir/projects/social-app.jpg",
          "softwareVersion": "1.0.0",
          "featureList": "Flutter, GetX, Firebase Auth, Cloud Firestore, Push Notifications"
        }
      }
    ]
  };

  const contactSchema = {
    "@context": "https://schema.org",
    "@type": "ContactPoint",
    "contactType": "Professional Services",
    "availableLanguage": ["fa", "en"],
    "email": "your@email.com",
    "telephone": "+989135655644X",
    "serviceArea": {
      "@type": "GeoCircle",
      "geoMidpoint": {
        "@type": "GeoCoordinates",
        "latitude": 32.719869390324114,
        "longitude": 51.64378059123429
      },
      "geoRadius": "Worldwide"
    },
    "serviceType": [
      "Flutter App Development",
      "توسعه اپلیکیشن فلاتر",
      "Mobile App Consulting",
      "Python Backend Development"
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />

      {/* FAQ Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Breadcrumb Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Skills Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(skillsSchema) }}
      />

      {/* Portfolio Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(portfolioSchema) }}
      />

      {/* Contact Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactSchema) }}
      />
    </>
  );
};

export default SchemaMarkup;
