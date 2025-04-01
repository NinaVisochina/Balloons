
import SidebarLinks from "./SidebarLinks";

const ContactsPage = () => {
    return (
        <div className="container mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Бічне меню */}
            <div className="md:col-span-1">
                <SidebarLinks />
            </div>

            {/* Основний контент */}
            <div className="md:col-span-3">
                <h1 className="text-3xl font-bold mb-6 text-purple-800">Контакти</h1>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Ліва колонка */}
                    <div>
                        <h2 className="text-2xl font-bold mb-4 text-purple-800">Зв’яжіться з нами</h2>
                        <p className="text-lg text-purple-800 mb-2">
                            📞 <strong>Телефони:</strong>
                        </p>
                        <ul className="text-lg text-purple-950 space-y-2">
                            <li>+38 (068) 022-76-08</li>
                        </ul>

                        <p className="text-lg text-purple-800 mt-4 mb-2">
                            📧 <strong>Email:</strong> perlamutr.net@gmail.com
                        </p>

                        <p className="text-lg text-purple-950">
                            Інтернет-гуртівня BookOpt працює 7 днів в тиждень, 365 днів на рік, для того, щоб Ви могли
                            оформити замовлення у будь-який зручний для Вас час! Оформити замовлення можливо на сайті{" "}
                            <a
                                href="https://balloons.in.ua"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-violet-800 hover:underline"
                            >
                                balloons.in.ua
                            </a>
                            , який працює цілодобово.
                        </p>

                        <p className="text-lg text-purple-950 mt-4">
                            Якщо Вам потрібна допомога працівника кол-центру, Ви можете зателефонувати в робочий час:
                        </p>
                        <ul className="text-lg text-purple-950 mt-2 space-y-1">
                            <li>Вт-Нд: 10:00 - 16:00</li>
                        </ul>

                        <p className="text-lg text-purple-800 mt-4">
                            📍 <strong>Наша адреса:</strong> м. Рівне, вул. Шевченка, 7. р-к "Моріон", 80
                        </p>
                    </div>

                    {/* Права колонка */}
                    <div className="flex justify-center">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d1315.3239026517274!2d26.24072604247815!3d50.622062199359526!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1suk!2sua!4v1737410543209!5m2!1suk!2sua" 
                            width="600"
                            height="450"
                            style={{ border: 0 }}
                            allowFullScreen={false}
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            className="rounded-lg shadow-lg"
                        ></iframe>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactsPage;
