import { Link } from "react-router-dom";
import { FaInstagram, FaFacebook, FaYoutube } from "react-icons/fa";
// import backgroundImage from '../../../assets/images/image-from-rawpixel-id-15134866-jpeg 1.png';

        // primary: '#EDCBC2',        // header
        // background: '#FFF3EF',   // для фону
        // accent: '#844E38',      // Темніший для заголовків
        // secondary: '#CB8E75',            // для іншого тексту
const Footer = () => {
    return (
         <footer className="w-full h-[175px] shadow-md items-center justify-between px-6 border-t border-primary">
            {/* style={{ backgroundImage: `url(${backgroundImage})` }}    */}
            {/* Thin Top Line with Elevated Inverted Shadow */}
            <div className="bg-background shadow-md"></div>
            <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 mt-2 ">
                {/* Лого та соціальні мережі */}
                <div className="flex flex-col items-center md:items-start">
                    <h2 className="text-accent font-sans mb-4">Ballons<span className="text-accent">Shop</span></h2>
                    <div className="flex space-x-4">
                        <a href="#" aria-label="Instagram" className="hover:text-darkPurple hover:scale-110 transition duration-200">
                            <FaInstagram className="w-6 h-6" />
                        </a>
                        <a href="#" aria-label="Facebook" className="hover:text-darkPurple hover:scale-110 transition duration-200">
                            <FaFacebook className="w-6 h-6" />
                        </a>
                        <a href="#" aria-label="YouTube" className="hover:text-darkPurple hover:scale-110 transition duration-200">
                            <FaYoutube className="w-6 h-6" />
                        </a>
                    </div>
                </div>

                {/* Колонка з інформацією */}
                <div className="text-center md:text-left">
                    <h3 className="font-caveat mb-4">Інформація</h3>
                    <ul className="space-y-2">
                        <li>
                            <Link to="/about" className="hover:underline hover:text-secondary transition duration-200">
                                Про нас
                            </Link>
                        </li>
                        <li>
                            <Link to="/contact" className="hover:underline hover:text-secondary transition duration-200">
                                Контакт
                            </Link>
                        </li>
                        <li>
                            <Link to="/pricing" className="hover:underline hover:text-secondary transition duration-200">
                                Цінова політика
                            </Link>
                        </li>
                        <li>
                            <Link to="/how-to-use" className="hover:underline hover:text-secondary transition duration-200">
                                Як користуватись сайтом
                            </Link>
                        </li>
                    </ul>
                </div>

                {/* Колонка з послугами */}
                <div className="text-center md:text-left">
                    <h3 className="font-caveat mb-4">Послуги і сервіси</h3>
                    <ul className="space-y-2">
                        <li>
                            <Link to="/joint-purchases" className="hover:underline hover:text-accent transition duration-200">
                                Спільні покупки
                            </Link>
                        </li>
                        <li>
                            <Link to="/reviews" className="hover:underline hover:text-accent transition duration-200">
                                Відгуки наших клієнтів
                            </Link>
                        </li>
                        <li>
                            <Link to="/blog" className="hover:underline hover:text-accent transition duration-200">
                                Блог
                            </Link>
                        </li>
                        <li>
                            <Link to="/dropshipping" className="hover:underline hover:text-accent transition duration-200">
                                Друк на шоперах
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>

            {/* Нижній рядок футера */}
            <div className="mt-2 pt-4 text-center text-secondary bottom-0">
                <p>© {new Date().getFullYear()} BallonsShop. Всі права захищені.</p>
            </div>
        </footer>
    );
};

export default Footer;
