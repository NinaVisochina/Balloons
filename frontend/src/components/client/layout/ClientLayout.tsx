import { useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import Footer from "./Footer";
import { FaHeart, FaSearch, FaShoppingCart, FaSignInAlt, FaTimes, FaUser } from "react-icons/fa";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import Logo from "../../../assets/logo.png";
import { useGetProductsByNameQuery } from "../../../services/productApi";
import { useGetCategoriesQuery, useGetSubCategoriesByCategorySlugQuery } from "../../../services/categoryApi";
import { API_URL } from "../../../env";


const ClientLayout = () => {
  const token = localStorage.getItem("accessToken");
  const [search, setSearch] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hoveredCategory, setHoveredCategory] = useState<number | null>(null);
  const [filteredSubCategories, setFilteredSubCategories] = useState<any[]>([]);
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const cartTotal = Array.isArray(cartItems) ? cartItems.reduce((total, item) => total + item.quantity, 0) : 0;
  //const dispatch = useDispatch(); 
  const [showSuggestions, setShowSuggestions] = useState(false);
  const { data: searchResults } = useGetProductsByNameQuery(search, {
    skip: search.length < 3,
  });
  const { data: categories, isLoading: categoriesLoading } = useGetCategoriesQuery();

  const categorySlug = categories?.find(cat => cat.id === hoveredCategory)?.slug ?? '';

  const { data: subCategoryData } = useGetSubCategoriesByCategorySlugQuery(
    categorySlug,
    { skip: !hoveredCategory || !categories }
  );

  useEffect(() => {
    if (subCategoryData && hoveredCategory !== null) {
      const filtered = subCategoryData.filter(
        (subCategory: any) => subCategory.categoryId === hoveredCategory
      );
      setFilteredSubCategories(filtered);
    }
  }, [subCategoryData, hoveredCategory]);


  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);
    setShowSuggestions(value.trim().length >= 3);
  };
  const handleSuggestionClick = (productSlug: string) => {
    navigate(`/product/${productSlug}`);
    setShowSuggestions(false);
    setSearch("");
  };


  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleCategoryHover = (categoryId: number) => {
    setHoveredCategory(categoryId);
  };
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (search.trim()) {
      console.log("📡 Відправка запиту на API:", search);
      navigate(`/product/${searchResults?.[0]?.id}`);
      setShowSuggestions(false);
    } else {
      console.warn("⚠️ Порожній запит не відправляється!");
    }
  };



  const navigate = useNavigate();

  return (
    <div className="bg-background text-text font-sans">
      <header className="bg-gradient-to-r from-primary to-pink-200 shadow-md">
        <div className="flex flex-col sm:flex-row items-center justify-between py-2 px-4 sm:py-1 sm:px-3 xs:py-1 xs:px-2 max-w-7xl mx-auto space-y-2 sm:space-y-0">
          <div className="flex items-center justify-between w-full sm:w-auto">
            <Link to="/" className="flex items-center space-x-2">
              <img src={Logo} alt="Logo" className="h-20 w-auto sm:h-16 xs:h-12" />
              <span className="text-3xl sm:text-2xl xs:text-lg font-caveat drop-shadow-md" style={{ fontWeight: 600 }}>
                <span className="text-pink-700">Balloons</span>
                <span className="text-pink-500">Shop</span>
              </span>
            </Link>
            <button
              onClick={toggleMenu}
              className="sm:hidden text-white p-2 rounded-full bg-gradient-to-r from-accent to-pink-500 hover:from-accentDark hover:to-pink-600 transition duration-300 shadow-md hover:shadow-lg"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
              </svg>
            </button>
          </div>

          <button
            onClick={toggleMenu}
            className="hidden sm:flex bg-gradient-to-r from-accent to-pink-500 text-white font-sans w-auto md:w-40 px-6 h-11 sm:px-4 sm:h-8 xs:px-3 xs:h-7 rounded-lg shadow-md hover:from-accentDark hover:to-pink-600 hover:shadow-lg transition duration-300 text-lg sm:text-base xs:text-sm flex items-center justify-center"
          >
            Каталог
          </button>
          {isMenuOpen && !categoriesLoading && categories && (
            <div
              className="absolute left-0 top-0 w-full sm:w-[500px] h-screen bg-white text-text shadow-lg z-50 flex flex-col sm:flex-row"
              onMouseEnter={() => setIsMenuOpen(true)}
              onMouseLeave={() => setIsMenuOpen(false)}
            >
              {/* Хрестик для закриття меню */}
              <button
                onClick={toggleMenu}
                className="absolute top-3 right-4 text-pink-600 hover:text-pink-800 z-50"
              >
                <FaTimes size={28} />
              </button>

              {/* Ліва панель категорій */}
              <div className="w-full sm:w-[250px] bg-gray-50 p-4">
                <ul className="space-y-2">
                  {[...categories]
                    .sort((a, b) => a.id - b.id)
                    .map((category) => (
                      <li
                        key={category.id}
                        className={`flex justify-between items-center px-4 py-2 cursor-pointer transition-all duration-300 ${hoveredCategory === category.id ? "bg-pink-100 text-pink-700" : "hover:bg-gray-200"}`}
                        onMouseEnter={() => handleCategoryHover(category.id)}
                        onClick={() => {
                          navigate(`/category/${category.slug}`);
                          setIsMenuOpen(false); // Закриває меню після натискання
                        }}
                      >
                        <span>{category.name}</span>
                        <span className="text-secondary">›</span>
                      </li>
                    ))}
                </ul>
              </div>

              {/* Права панель підкатегорій (при наведенні на категорію) */}
              {hoveredCategory && filteredSubCategories.length > 0 && (
                <div
                  className="hidden sm:block w-[250px] bg-white shadow-md p-4 border-l border-gray-200 transition-opacity duration-300"
                  onMouseEnter={() => setHoveredCategory(hoveredCategory)}
                  onMouseLeave={() => setHoveredCategory(null)}
                >
                  <h3 className="font-caveat text-text text-lg mb-2"></h3>
                  <ul className="space-y-2">
                    {filteredSubCategories.map((subCategory) => (
                      <li key={subCategory.id}>
                        <Link
                          to={`/subcategory/products/${subCategory.slug}`}
                          className="text-text hover:text-pink-500 transition-all" // Змінено hover:text-accent на hover:text-pink-500
                          onClick={() => {
                            setIsMenuOpen(false);
                          }}
                        >
                          {subCategory.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
          <div className="flex items-center space-x-2 w-full sm:w-auto">
            <div className="relative w-full sm:w-auto sm:max-w-[400px]">
              <form
                onSubmit={handleSearchSubmit}
                className="flex items-center bg-white rounded-lg px-4 py-2 sm:px-3 sm:py-1 xs:px-2 xs:py-1 xs:h-7 border border-gray-200 w-full"
              >
                <input
                  type="text"
                  placeholder="Я шукаю..."
                  className="outline-none px-3 h-full text-lg sm:text-base xs:text-sm w-full placeholder-pink-300"
                  value={search}
                  onChange={handleSearch}
                />
                <button
                  type="submit"
                  className="p-1 h-full w-11 sm:w-8 xs:w-7 rounded-full bg-gradient-to-r from-accent to-pink-500 text-white hover:from-accentDark hover:to-pink-600 transition duration-300 shadow-md hover:shadow-lg flex items-center justify-center"
                >
                  <FaSearch size={24} className="sm:w-5 sm:h-5 xs:w-3 xs:h-3" />
                </button>
              </form>

              {/* Підказки (адаптовано) */}
              {showSuggestions && searchResults && searchResults.length > 0 && (
                <ul className="absolute z-40 top-full left-0 w-full bg-white shadow-lg rounded-lg mt-1 max-h-64 overflow-y-auto border border-gray-200">
                  {searchResults.map((product) => (
                    <li
                      key={product.id}
                      onClick={() => handleSuggestionClick(product.slug)}
                      className="flex items-center px-3 py-2 hover:bg-gray-100 cursor-pointer transition-all"
                    >
                      <img
                        src={`${API_URL}/images/300_${product.images[0]}`}
                        alt={product.name}
                        className="w-10 h-10 object-cover rounded mr-3"
                      />
                      <span className="text-sm sm:text-base truncate">{product.name}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="flex items-center space-x-2">
              <Link to="/cart" className="relative flex items-center">
                <div className="p-2 rounded-full bg-gradient-to-r from-accent to-pink-500 text-white hover:from-accentDark hover:to-pink-600 transition duration-300 shadow-md hover:shadow-lg h-11 sm:h-8 xs:h-8 flex items-center justify-center">
                  <FaShoppingCart size={24} className="sm:w-5 sm:h-5 xs:w-5 xs:h-5" />
                </div>
                {cartTotal > 0 && (
                  <span className="absolute -top-1 -right-1 bg-pink-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {cartTotal}
                  </span>
                )}
              </Link>
              <nav className="flex items-center space-x-2">
                {token ? (
                  <Link to="/profile">
                    <div className="p-2 rounded-full bg-gradient-to-r from-accent to-pink-500 text-white hover:from-accentDark hover:to-pink-600 transition duration-300 shadow-md hover:shadow-lg h-11 sm:h-8 xs:h-8 flex items-center justify-center">
                      <FaUser size={24} className="sm:w-5 sm:h-5 xs:w-5 xs:h-5" />
                    </div>
                  </Link>
                ) : (
                  <Link to="/login">
                    <div className="p-2 rounded-full bg-gradient-to-r from-accent to-pink-500 text-white hover:from-accentDark hover:to-pink-600 transition duration-300 shadow-md hover:shadow-lg h-11 sm:h-8 xs:h-8 flex items-center justify-center">
                      <FaSignInAlt size={24} className="sm:w-5 sm:h-5 xs:w-5 xs:h-5" />
                    </div>
                  </Link>
                )}
              </nav>
              <Link to="/wishlist">
                <div className="p-2 rounded-full bg-gradient-to-r from-accent to-pink-500 text-white hover:from-accentDark hover:to-pink-600 transition duration-300 shadow-md hover:shadow-lg h-11 sm:h-8 xs:h-8 flex items-center justify-center">
                  <FaHeart size={24} className="sm:w-5 sm:h-5 xs:w-5 xs:h-5" />
                </div>
              </Link>
            </div>
          </div>
        </div>
      </header>
      {/* className=container mx-auto py-6 px-6 */}
      <main className="max-w-7xl mx-auto py-6 px-6">
        <Outlet />
      </main>

      <Footer />
    </div>
  );

};

export default ClientLayout;