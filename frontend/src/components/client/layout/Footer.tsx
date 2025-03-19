import { Link } from "react-router-dom";
import { FaInstagram, FaFacebook, FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-primary shadow-md py-8">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Лого та соціальні мережі */}
        <div className="flex flex-col items-center md:items-start">
          <h2 className="text-text font-caveat text-xl mb-4">
            Ballons<span className="text-accent">Shop</span>
          </h2>
          <div className="flex space-x-4">
            <a
              href="https://www.instagram.com/kulky_rivne?utm_source=qr&igsh=bm9qZzlkMmpuZDds"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="text-accent hover:text-accent-dark transition duration-200"
            >
              <FaInstagram className="w-6 h-6" />
            </a>
            <a
              href="#"
              aria-label="Facebook"
              className="text-accent hover:text-accent-dark transition duration-200"
            >
              <FaFacebook className="w-6 h-6" />
            </a>
            <a
              href="#"
              aria-label="YouTube"
              className="text-accent hover:text-accent-dark transition duration-200"
            >
              <FaYoutube className="w-6 h-6" />
            </a>
          </div>
        </div>

        {/* Колонка з інформацією */}
        <div className="text-center md:text-left">
          <h3 className="font-caveat text-text text-lg mb-4">Інформація</h3>
          <ul className="space-y-2">
            <li>
              <Link to="/about" className="text-text hover:text-accent transition duration-200">
                Про нас
              </Link>
            </li>
            <li>
              <Link to="/contact" className="text-text hover:text-accent transition duration-200">
                Контакт
              </Link>
            </li>
            <li>
              <Link to="/pricing-policy" className="text-text hover:text-accent transition duration-200">
                Цінова політика
              </Link>
            </li>
            <li>
              <Link to="/how-to-use" className="text-text hover:text-accent transition duration-200">
                Як користуватись сайтом
              </Link>
            </li>
          </ul>
        </div>

        {/* Колонка з послугами */}
        <div className="text-center md:text-left">
          <h3 className="font-caveat text-text text-lg mb-4">Послуги і сервіси</h3>
          <ul className="space-y-2">
            <li>
              <Link to="/workinghours" className="text-text hover:text-accent transition duration-200">
                Графік роботи
              </Link>
            </li>
            <li>
              <Link to="/reviews" className="text-text hover:text-accent transition duration-200">
                Відгуки наших клієнтів
              </Link>
            </li>
            <li>
              <Link to="/blog" className="text-text hover:text-accent transition duration-200">
                Блог
              </Link>
            </li>
            <li>
              <Link to="/dropshipping" className="text-text hover:text-accent transition duration-200">
                Друк на шоперах
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Нижній рядок футера */}
      <div className="mt-8 pt-4 border-t border-gray-200 text-center text-secondary">
        <p>© {new Date().getFullYear()} BallonsShop. Всі права захищені.</p>
      </div>
    </footer>
  );
};

export default Footer;