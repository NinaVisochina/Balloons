import { Link } from "react-router-dom";
import { FaInstagram, FaFacebook, FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-primary to-pink-200 shadow-md py-8">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Лого та соціальні мережі */}
        <div className="flex flex-col items-center md:items-start">
          <h2 className="text-2xl font-caveat font-bold mb-4">
            <span className="text-pink-700">Ballons</span>
            <span className="text-pink-500">Shop</span>
          </h2>
          <div className="flex space-x-4">
            <a
              href="https://www.instagram.com/kulky_rivne?utm_source=qr&igsh=bm9qZzlkMmpuZDds"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="text-pink-500 hover:scale-110 transition-transform duration-200"
            >
              <FaInstagram className="w-6 h-6" />
            </a>
            <a
              href="#"
              aria-label="Facebook"
              className="text-pink-500 hover:scale-110 transition-transform duration-200"
            >
              <FaFacebook className="w-6 h-6" />
            </a>
            <a
              href="#"
              aria-label="YouTube"
              className="text-pink-500 hover:scale-110 transition-transform duration-200"
            >
              <FaYoutube className="w-6 h-6" />
            </a>
          </div>
        </div>

        {/* Колонка з інформацією */}
        <div className="text-center md:text-left">
          <h3 className="font-caveat text-pink-700 text-xl font-bold mb-4">Інформація</h3>
          <ul className="space-y-2">
            <li>
              <Link to="/about" className="text-gray-600 hover:text-pink-500 transition duration-200">
                Про нас
              </Link>
            </li>
            <li>
              <Link to="/contact" className="text-gray-600 hover:text-pink-500 transition duration-200">
                Контакт
              </Link>
            </li>
            <li>
              <Link to="/pricing-policy" className="text-gray-600 hover:text-pink-500 transition duration-200">
                Цінова політика
              </Link>
            </li>
            <li>
              <Link to="/how-to-use" className="text-gray-600 hover:text-pink-500 transition duration-200">
                Як користуватись сайтом
              </Link>
            </li>
          </ul>
        </div>

        {/* Колонка з послугами */}
        <div className="text-center md:text-left">
          <h3 className="font-caveat text-pink-700 text-xl font-bold mb-4">Послуги і сервіси</h3>
          <ul className="space-y-2">
            <li>
              <Link to="/workinghours" className="text-gray-600 hover:text-pink-500 transition duration-200">
                Графік роботи
              </Link>
            </li>
            <li>
              <Link to="/reviews" className="text-gray-600 hover:text-pink-500 transition duration-200">
                Відгуки наших клієнтів
              </Link>
            </li>
            <li>
              <Link to="/delivery" className="text-gray-600 hover:text-pink-500 transition duration-200">
              Доставка і оплата
              </Link>
            </li>
            <li>
              <Link to="/returns" className="text-gray-600 hover:text-pink-500 transition duration-200">
              Повернення
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Нижній рядок футера */}
      <div className="mt-8 pt-4 border-t border-pink-300 text-center text-gray-500">
        <p>
          © {new Date().getFullYear()}{" "}
          <span className="font-caveat">
            <span className="text-pink-700">Ballons</span>
            <span className="text-pink-500">Shop</span>
          </span>
          . Всі права захищені.
        </p>
      </div>
    </footer>
  );
};

export default Footer;