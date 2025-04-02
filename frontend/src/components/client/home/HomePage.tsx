import CategoryCircles from "../layout/CategoryCircles";
import SubCategoryCarousel from "../layout/SubCategoryCarousel";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import { useGetProductsQuery } from "../../../services/productApi";
import { API_URL } from "../../../env";
import { useState } from "react";

// Імпорт зображень для слайдера
import bannerKids from "../../../assets/images/banner-kids.jpg"; // Перший банер (дитяче свято)
import bannerBalloons from "../../../assets/images/bannerBalloonsMirrored.jpg"
//import bannerBalloons from "../../../assets/images/banner-balloons.jpg"; // Другий банер (зображення 1, просто кульки)
import bannerCelebration from "../../../assets/images/banner-celebration.jpg"; // Третій банер (baby shower)
import { FaShoppingCart } from "react-icons/fa";
import { addToCart, CartItem } from "../../../interfaces/cart/cartSlice";
import axios from "axios";
import { IProductItem } from "../../../interfaces/products";
import { useDispatch } from "react-redux";

// Масив із даними для слайдера
const banners = [
  {
    image: bannerKids,
    title: "Створюй свято для дітей!",
    subtitle: "Кульки для незабутнього дня народження",
    cta: "Замовити зараз!",
    link: "/subcategory/products/z-malyunkamy",
  },
  {
    image: bannerBalloons,
    title: "Яскраві кульки для будь-якої події!",
    subtitle: "Створи свою ідеальну композицію",
    cta: "Переглянути товари",
    link: "/subcategory/products/nabory"
  },
  {
    image: bannerCelebration,
    title: "Декор для особливих моментів!",
    subtitle: "Кульки для весіль, вечірок і свят",
    cta: "Дізнайся більше!",
    link: "/subcategory/products/kolorovyy-dym",
  },
];

const HomePage = () => {
  const { data: products, isLoading: productsLoading } = useGetProductsQuery();


  const [productQuantities, setProductQuantities] = useState<Record<number, number>>({});
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const dispatch = useDispatch();
  const [overstockMessage, setOverstockMessage] = useState<string | null>(null);
  // const [wishList] = useState<number[]>([]);
  const isMobile = window.innerWidth <= 768;
  const [hoveredProductId, setHoveredProductId] = useState<number | null>(null);
  const handleQuantityChange = (productId: number, increment: number) => {
    const current = productQuantities[productId] || 1;
    const newQty = current + increment;
    if (newQty < 1) return;

    const product = products?.find(p => p.id === productId);
    if (product && newQty > product.quantityInStock) return;

    setProductQuantities(prev => ({
      ...prev,
      [productId]: newQty,
    }));
  };
  const handleAddToCart = async (product: IProductItem) => {
    const token = localStorage.getItem("accessToken");
    const userId = localStorage.getItem("userId");
    const quantity = productQuantities[product.id] || 1;
    if (quantity > product.quantityInStock) {
      setOverstockMessage(`Товару "${product.name}" залишилось лише ${product.quantityInStock} шт.`);
      setTimeout(() => setOverstockMessage(null), 4000);
      return;
    }
    if (token && userId) {
      try {
        await axios.post(
          `${API_URL}/api/Cart/add`,
          { userId, productId: product.id, quantity },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        dispatch(addToCart({
          productId: product.id,
          productName: product.name,
          price: product.price,
          quantity,
          images: product.images || [],
          quantityInStock: product.quantityInStock
        }));

        // ✅ Показати toast
        setToastMessage(`«${product.name}» доданий у кошик`);
        setTimeout(() => {
          setToastMessage(null);

          // Очищення кількості через 2 секунди
          setProductQuantities(prev => ({
            ...prev,
            [product.id]: 1
          }));
        }, 2000);
        setTimeout(() => setToastMessage(null), 3000);

      } catch (error) {
        console.error(error.response?.data?.message || "Помилка додавання товару в кошик.");
      }
    } else {
      const cartItem: CartItem = {
        productId: product.id,
        productName: product.name,
        price: product.price,
        quantity,
        images: product.images || [],
        quantityInStock: product.quantityInStock
      };

      dispatch(addToCart(cartItem));

      const cartItems: CartItem[] = JSON.parse(localStorage.getItem("cart") || "[]");
      const existingItem = cartItems.find(item => item.productId === product.id);
      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        cartItems.push(cartItem);
      }
      localStorage.setItem("cart", JSON.stringify(cartItems));

      // ✅ Показати toast для незареєстрованих
      setToastMessage(`«${product.name}» доданий у кошик`);
      setToastMessage(`«${product.name}» доданий у кошик`);
      setTimeout(() => {
        setToastMessage(null);

        // Очищення кількості через 2 секунди
        setProductQuantities(prev => ({
          ...prev,
          [product.id]: 1
        }));
      }, 2000);

      setTimeout(() => setToastMessage(null), 4000);
    }
  };
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
      {toastMessage && (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-pink-400 to-pink-500 text-white font-sans px-6 py-2 sm:px-4 sm:py-1 xs:px-3 xs:py-1 rounded-lg shadow-md hover:from-pink-500 hover:to-pink-600 hover:shadow-lg transition duration-300 z-50">
          {toastMessage}
        </div>
      )}
      {/* Слайдер із банерами */}
      <div className="w-full relative">
        <Slider {...settings}>
          {banners.map((banner, index) => (
            <div key={index} className="relative">
              <img
                src={banner.image}
                alt={banner.title}
                className="w-full h-[60vh] sm:h-[50vh] xs:h-[40vh] max-h-[500px] min-h-[300px] object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 flex flex-col justify-center items-start p-12 md:p-8 sm:p-6 xs:p-4">
                <div className="bg-gradient-to-r from-black/40 to-transparent backdrop-blur-sm p-6 sm:p-4 xs:p-3 rounded-lg max-w-lg space-y-4">
                  <h1 className="text-5xl md:text-4xl sm:text-3xl xs:text-2xl font-caveat text-white drop-shadow-lg animate-fadeIn">
                    {banner.title}
                  </h1>
                  <p className="text-2xl md:text-xl sm:text-lg xs:text-base font-sans text-white drop-shadow-lg animate-fadeIn animation-delay-200">
                    {banner.subtitle}
                  </p>
                  <Link
                    to={banner.link}
                    className="inline-block bg-gradient-to-r from-accent to-pink-500 text-white font-sans px-8 py-3 sm:px-6 sm:py-2 xs:px-4 xs:py-2 rounded-lg shadow-lg hover:from-accentDark hover:to-pink-600 hover:shadow-xl transition duration-300 animate-fadeIn animation-delay-400 text-lg sm:text-base xs:text-sm"
                  >
                    {banner.cta}
                  </Link>
                </div>
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
        // <div className="mt-12 max-w-7xl mx-auto px-6">
        //   <h2 className="text-2xl xs:text-xl font-caveat text-pink-700 font-bold mb-6">Популярні товари</h2>
        //   <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 xs:gap-4">
        //     {products?.slice(0, 4).map((product) => (
        //       <Link to={`/product/${product.slug}`} key={product.id}>
        //         <div className="border-2 border-pink-100 rounded-xl p-4 xs:p-3 bg-gradient-to-b from-white to-gray-50 shadow-md hover:shadow-xl hover:border-pink-300 hover:scale-105 transition duration-300">
        //           <img
        //             src={product.images && product.images.length > 0 ? `${API_URL}/images/1200_${product.images[0]}` : "/path/to/placeholder-image.jpg"}
        //             alt={product.name}
        //             className="w-full h-48 xs:h-40 object-contain rounded-lg bg-white"
        //           />
        //           <h3 className="font-sans text-text mt-3 xs:mt-2 font-semibold hover:text-pink-500 transition duration-200 text-base xs:text-sm">{product.name}</h3>
        //           <p className="text-pink-500 font-sans mt-1 text-lg xs:text-base">{product.price} грн</p>
        //         </div>
        //       </Link>
        //     ))}
        //   </div>
        // </div>
        <div className="mt-12 max-w-7xl mx-auto px-6">
          <h2 className="text-2xl xs:text-xl font-caveat text-pink-700 font-bold mb-6">Популярні товари</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 xs:gap-4">
            {products?.slice(0, 4).map((product) => {
              const currentQuantity = productQuantities[product.id] || 1;
              const isAddButtonDisabled = currentQuantity >= product.quantityInStock;

              // function toggleWishList(id: number): void {
              //   throw new Error("Function not implemented.");
              // }

              return (
                <li
                  key={product.id}
                  className="relative bg-white shadow-md rounded-lg border border-pink-100 hover:border-pink-300 hover:shadow-xl transition duration-300 group"
                  onMouseEnter={() => setHoveredProductId(product.id)}
                  onMouseLeave={() => setHoveredProductId(null)}
                >
                  {/* <button
                      onClick={() => toggleWishList(product.id)}
                      className="absolute top-2 right-2 w-6 h-6 z-10"
                    >
                      <img
                        src={wishList.includes(product.id) ? bookmark : bookmarkWhite}
                        alt="bookmark"
                        className="w-full h-full object-contain"
                      />
                    </button> */}
                  {overstockMessage && (
                    <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-yellow-400 to-pink-400 text-white font-sans px-6 py-2 rounded-lg shadow-md z-50 animate-fadeIn">
                      {overstockMessage}
                    </div>
                  )}

                  <Link to={`/product/${product.slug}`} className="block">
                    <div className="w-full h-52 sm:h-60 md:h-64 bg-white flex items-center justify-center overflow-hidden">
                      <img
                        src={`${API_URL}/images/600_${product.images[0]}`}
                        alt={product.name}
                        className="object-contain h-full w-full p-4"
                      />
                    </div>
                  </Link>
                  <div className="p-3">
                    <h2 className="text-md font-sans text-gray-700 text-center">{product.name}</h2>
                    <p className="text-center text-sm text-gray-600">Розмір: {product.size}</p>
                    <p className="text-center font-bold text-pink-500 mt-1">{product.price} грн</p>

                    {isMobile && (
                      <div className="mt-3 flex flex-col items-center gap-2">
                        <div className="flex items-center">
                          <button
                            onClick={() => handleQuantityChange(product.id, -1)}
                            className="bg-gray-200 px-2 py-1 rounded hover:bg-gray-300"
                          >
                            -
                          </button>
                          <span className="mx-2">{currentQuantity}</span>
                          <button
                            onClick={() => handleQuantityChange(product.id, 1)}
                            className={`px-2 py-1 rounded ${isAddButtonDisabled ? 'bg-gray-300 cursor-not-allowed' : 'bg-gray-200 hover:bg-gray-300'}`}
                            disabled={isAddButtonDisabled}
                          >
                            +
                          </button>
                        </div>
                        <button
                          onClick={() => handleAddToCart(product)}
                          className="bg-gradient-to-r from-accent to-pink-500 text-white px-6 py-2 rounded-lg font-semibold shadow-md hover:from-pink-500 hover:to-pink-600 transition"
                        >
                          <FaShoppingCart className="inline-block mr-2" /> Купити
                        </button>
                      </div>
                    )}
                  </div>


                  {(hoveredProductId === product.id || isMobile) && (
                    <div className="absolute bottom-0 left-0 right-0 bg-gray-600 bg-opacity-75 text-white px-2 py-3 transition-all duration-300 ease-in-out flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-0">
                      <div className="flex items-center">
                        <button
                          onClick={() => handleQuantityChange(product.id, -1)}
                          className="bg-gradient-to-r from-gray-200 to-gray-400 px-2 py-1 rounded-md shadow-md hover:from-gray-400 hover:to-gray-500 transition duration-300"
                        >
                          -
                        </button>
                        {/* <span className="mx-2">{currentQuantity}</span> */}
                        <input
                          type="number"
                          min={1}
                          max={product.quantityInStock}
                          value={currentQuantity}
                          onChange={(e) => {
                            const value = parseInt(e.target.value);
                            if (!isNaN(value)) {
                              setProductQuantities(prev => ({
                                ...prev,
                                [product.id]: value,
                              }));
                            }
                          }}
                          className="w-14 text-center text-black rounded-md border border-gray-300 px-1 py-0.5 mx-2"
                        />

                        <button
                          onClick={() => handleQuantityChange(product.id, 1)}
                          className={`px-2 py-1 rounded-md shadow-md transition duration-300 ${isAddButtonDisabled ? 'bg-gray-200 cursor-not-allowed' : 'bg-gradient-to-r from-gray-200 to-gray-400 hover:from-gray-400 hover:to-gray-500'}`}
                          disabled={isAddButtonDisabled}
                        >
                          +
                        </button>
                      </div>
                      <button
                        onClick={() => handleAddToCart(product)}
                        className="bg-gradient-to-r from-accent to-pink-500 text-white px-4 py-2 rounded-lg font-semibold shadow-lg hover:from-pink-500 hover:to-pink-600 hover:shadow-xl transition duration-300 w-full sm:w-auto flex items-center justify-center"
                      >
                        <FaShoppingCart className="mr-2 w-5 h-5" />
                        Купити
                      </button>
                    </div>
                  )}
                </li>
              );
            })}
          </div>
        </div>

      )}
    </div>
  );
};

export default HomePage;