from flask import Flask, jsonify
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import Column, String, Integer, Boolean

from flask_cors import CORS
app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

CORS(app, resources={
     r"/*": {"origins": ["http://localhost:3000", "https://youdexsof.ir"]}})



class WorkSample(
    db.Model):
    id =Column(
        Integer, primary_key=True)
    is_web =Column(
        Boolean, default=True)
    fa_title =Column(
        String(255), nullable=False)
    en_title =Column(
        String(255), nullable=False)
    fa_description =Column(
        String, default="")
    en_description =Column(
        String, default="")
    pictures =Column(
        String, nullable=False)
    link =Column(
        String, nullable=False)
    technologys =Column(
        String, nullable=False)
    fa_start_date =Column(
        String, nullable=False)
    en_start_date =Column(
        String, nullable=False)
    fa_end_date =Column(
        String, nullable=False)
    en_end_date =Column(db.String, nullable=False)


with app.app_context():
    db.create_all()

samples = [
    WorkSample(
        id=4,
        is_web=True,
        fa_title="وبسایت رزومه",
        en_title="Portfolio Website",
        fa_description="وبسایت رزومه شخصی م که الان درحال مشاهده ش هستید، پیاده سازی شده با کتابخونه react و کامپوننت های ChakraUI.",
        en_description="My personal portfolio website that you're currently browsing.",
        pictures="/portfolio/por1.png /portfolio/por2.png",
        link="www.youdexsof.ir",
        technologys="NextJs ChakraUI",
        fa_start_date="تیر 1402",
        en_start_date="June 2022",
        fa_end_date="شهریور 1402",
        en_end_date="August 2022"
    ),
    WorkSample(
        id=5,
        is_web=True,
        fa_title="وبسایت منتخب شاپ",
        en_title="Montakhab Light Website",
        fa_description="برند منتخب از سال ۱۳۹۲ شروع به فعالیت کرده و برای لانچ تک تک محصولات ماه ها زمان گذاشته شده و بهترین متریال موجود دربازار با توجه به قیمت مقرون به صرفه در محصولات استفاده شده.",
        en_description="The selected brand started its activities in 2013 and spent months launching each product. The best materials available in the market have been used in the products, considering their affordable prices.",
        pictures="/portfolio/mon1.png /portfolio/mon2.png",
        link="www.montakhablighte.ir",
        technologys="WP",
        fa_start_date="بهمن 1402",
        en_start_date="June 2022",
        fa_end_date="اسفند 1402",
        en_end_date="August 2022"
    ),
    WorkSample(
        id=6,
        is_web=True,
        fa_title="وبسایت پرنیان",
        en_title="Parnian Website",
        fa_description="خدمات حمل هوایی انواع کالا به اقصی نقاط دنیا با وبسایت پرنیان.",
        en_description="Air transportation services for all kinds of stuff to all parts of the world with Pernian website.",
        pictures="/portfolio/par1.png /portfolio/par2.png",
        link="www.montakhablighte.ir",
        technologys="WP",
        fa_start_date="اردیبهشت 1399",
        en_start_date="June 2020",
        fa_end_date="اردیبهشت 1399",
        en_end_date="June 2020"
    ),
    WorkSample(
        id=7,
        is_web=False,
        fa_title="آی‌پت پلاس",
        en_title="iPET Plus",
        fa_description="یک پلتفرم بزرگ برای خرید و فروش کالاها و خدمات مربوط به حیوانات خانگی در سراسر کشور!",
        en_description="A large platform for buying and selling pet-related goods and services across the country!",
        pictures="/portfolio/ipet1.png /portfolio/ipet2.png /portfolio/ipet3.png /portfolio/ipet4.png",
        link="www.ipetplus.ir",
        technologys="Dart Flutter Bloc",
        fa_start_date="تیر 1403",
        en_start_date="July 2024",
        fa_end_date="شهریور 1403",
        en_end_date="September 2024"
    ),
    WorkSample(
        id=8,
        is_web=False,
        fa_title="ترخینه",
        en_title="Tarkhine",
        fa_description="ترخینه، یک اپلیکیشن سفارش غذایِ تماما ایرانی، دوای گرسنگی شما در هر لحظه!",
        en_description="Tarkhine, a complete Persian delivery food application, best friend for your hungry moments!",
        pictures="/portfolio/tarkhine1.png /portfolio/tarkhine2.png /portfolio/tarkhine3.png /portfolio/tarkhine1.png",
        link="www.github.com/YOUSSSOF/Tarkhine",
        technologys="Dart Flutter Bloc Python Django",
        fa_start_date="تیر 1402",
        en_start_date="June 2022",
        fa_end_date="شهریور 1402",
        en_end_date="August 2022"
    ),
    WorkSample(
        id=9,
        is_web=False,
        fa_title="گرین‌تامب",
        en_title="GreenThumb",
        fa_description="گرین‌تامب، اپلیکیشنی جذاب برای کمک به خرید و مراقبت از گیاهان!",
        en_description="GreenThumb, a cool plant shopping and care application!",
        pictures="/portfolio/gre1.png /portfolio/gre2.png /portfolio/gre3.png",
        link="#",
        technologys="Dart Flutter GetX",
        fa_start_date="اردیبهشت 1402",
        en_start_date="May 2023",
        fa_end_date="مرداد 1402",
        en_end_date="July 2023"
    ),
    WorkSample(
        id=10,
        is_web=False,
        fa_title="مووی باکس",
        en_title="MovieBox",
        fa_description="اپلیکیشن فیلم و سریالِ مووی باکس یک مرجع کامل برای دسترسی به اطلاعات هزاران فیلم و سریاله.",
        en_description="The MovieBox app is a complete reference for accessing information on thousands of movies and TV series.",
        pictures="/portfolio/movie1.png /portfolio/movie2.png /portfolio/movie3.png",
        link="www.github.com/YOUSSSOF/Movies-App",
        technologys="Dart Flutter GetX",
        fa_start_date="مرداد 1401",
        en_start_date="August 2022",
        fa_end_date="مرداد 1401",
        en_end_date="August 2022"
    ),
    WorkSample(
        id=11,
        is_web=False,
        fa_title="ریتمو",
        en_title="Ritmo",
        fa_description="ریتمو، یک برنامه پخش کننده موسیقی با استفاده از فلاتر و GetX ساخته شده است.",
        en_description="Ritmo is a music player app built using Flutter and GetX.",
        pictures="/portfolio/music1.png /portfolio/music2.png /portfolio/music3.png",
        link="www.github.com/YOUSSSOF/Player",
        technologys="Dart Flutter GetX",
        fa_start_date="مهر 1401",
        en_start_date="October 2022",
        fa_end_date="آبان 1401",
        en_end_date="November 2022"
    ),
    WorkSample(
        id=12,
        is_web=False,
        fa_title="کفشینو",
        en_title="Kafshino",
        fa_description="اپلیکیشن فروشگاه کفش کفشینو ساخته شده با فلاتر و GetX.",
        en_description="Kafshino is a shoe store app built using Flutter and GetX.",
        pictures="/portfolio/shoe1.png /portfolio/shoe2.png /portfolio/shoe3.png",
        link="www.github.com/YOUSSSOF/Shoe-Commerce",
        technologys="Dart Flutter GetX",
        fa_start_date="آذر 1401",
        en_start_date="December 2022",
        fa_end_date="دی 1401",
        en_end_date="January 2023"
    ),
]






@app.route('/api/worksamples', methods=['GET'])
def get_work_samples():
    work_samples = WorkSample.query.all()
    return jsonify([
        {
            "id": ws.id,
            "isWeb": ws.is_web,
            "faTitle": ws.fa_title,
            "enTitle": ws.en_title,
            "faDescription": ws.fa_description,
            "enDescription": ws.en_description,
            "pictures": ws.pictures,
            "link": ws.link,
            "technologys": ws.technologys,
            "faStartDate": ws.fa_start_date,
            "enStartDate": ws.en_start_date,
            "faEndDate": ws.fa_end_date,
            "enEndDate": ws.en_end_date
        } for ws in work_samples
    ])


def seed_database():
    with app.app_context():
        if not WorkSample.query.first():
            db.session.bulk_save_objects(samples)
            db.session.commit()
            print("Database seeded!")
        else:
            print("Database already seeded!")

if __name__ == '__main__':
    seed_database()
    app.run(debug=False)
