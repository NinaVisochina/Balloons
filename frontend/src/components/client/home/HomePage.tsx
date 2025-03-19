import CategoryCircles from "../layout/CategoryCircles";
import SubCategoryCarousel from "../layout/SubCategoryCarousel";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import { useGetProductsQuery } from "../../../services/productApi";
import { API_URL } from "../../../env";

// Імпорт зображень для слайдера
import bannerKids from "../../../assets/images/banner-kids.jpg"; // Перший банер (дитяче свято)
import bannerBalloons from "../../../assets/images/banner-balloons.jpg"; // Другий банер (зображення 1, просто кульки)
import bannerCelebration from "../../../assets/images/banner-celebration.jpg"; // Третій банер (baby shower)

// Масив із даними для слайдера
const banners = [
  {
    image: bannerKids,
    title: "Створюй свято для дітей!",
    subtitle: "Кульки для незабутнього дня народження",
    cta: "Замовити зараз!",
    link: "/catalog",
  },
  {
    image: bannerBalloons,
    title: "Яскраві кульки для будь-якої події!",
    subtitle: "Створи свою ідеальну композицію",
    cta: "Переглянути товари",
    link: "/catalog",
  },
  {
    image: bannerCelebration,
    title: "Декор для особливих моментів!",
    subtitle: "Кульки для весіль, вечірок і свят",
    cta: "Дізнайся більше!",
    link: "/about",
  },
];

const HomePage = () => {
  const { data: products, isLoading: productsLoading } = useGetProductsQuery();

  // Налаштування для слайдера
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: true,
  };

  return (
    <div className="font-sans">
      {/* Слайдер із банерами */}
      <div className="w-full relative">
        <Slider {...settings}>
          {banners.map((banner, index) => (
            <div key={index} className="relative">
              <img
                src={banner.image}
                alt={banner.title}
                className="w-full h-[600px] object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-start p-12 md:p-8 sm:p-6">
                <h1 className="text-5xl md:text-4xl sm:text-3xl font-caveat text-white drop-shadow-lg animate-fadeIn">
                  {banner.title}
                </h1>
                <p className="text-2xl md:text-xl sm:text-lg font-sans text-white mt-4 drop-shadow-lg animate-fadeIn animation-delay-200">
                  {banner.subtitle}
                </p>
                <Link
                  to={banner.link}
                  className="mt-6 bg-accent text-white font-sans px-8 py-3 rounded-lg hover:bg-accentDark transition duration-300 animate-fadeIn animation-delay-400 text-lg sm:text-base"
                >
                  {banner.cta}
                </Link>
              </div>
            </div>
          ))}
        </Slider>
      </div>

      {/* Кружечки категорій */}
      <CategoryCircles />

      {/* Карусель підкатегорій */}
      <SubCategoryCarousel />

      {/* Популярні товари */}
      {productsLoading ? (
        <p className="font-sans text-text">Завантаження...</p>
      ) : (
        <div className="mt-12 max-w-7xl mx-auto px-6">
          <h2 className="text-2xl font-caveat text-text mb-6">Популярні товари</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {products?.slice(0, 4).map((product) => (
              <Link to={`/product/${product.slug}`} key={product.id}>
                <div className="border rounded-lg p-4 bg-gray-50 hover:shadow-lg transition duration-200">
                  <img
                    src={product.images && product.images.length > 0 ? `${API_URL}/images/1200_${product.images[0]}` : "/path/to/placeholder-image.jpg"}
                    alt={product.name}
                    className="w-full h-48 object-cover rounded"
                  />
                  <h3 className="font-sans text-text mt-2">{product.name}</h3>
                  <p className="text-accent font-sans mt-1">{product.price} грн</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;