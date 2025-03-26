import { useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import Footer from "./Footer";
import { FaHeart, FaSearch, FaShoppingCart, FaSignInAlt, FaUser } from "react-icons/fa";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import Logo from "../../../assets/logo.png";
import { useGetProductsByNameQuery } from "../../../services/productApi";
import { useGetCategoriesQuery, useGetSubCategoriesByCategorySlugQuery } from "../../../services/categoryApi";


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
    console.log("🔍 Введений пошуковий запит:", value);
    setSearch(value);
    setShowSuggestions(value.length >= 3);
};

  const handleSuggestionClick = (productId: number) => {
    navigate(`/product/${productId}`);
    setShowSuggestions(false);
  };
    

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleCategoryHover = (categoryId: number) => {
    setHoveredCategory(categoryId);
  };

  // const handleCategoryLeave = () => {
  //   setHoveredCategory(null);
  //   setFilteredSubCategories([]);
  // };

  // const handleLogout = () => {
  //   localStorage.removeItem("accessToken");
  //   localStorage.removeItem("refreshToken");
  //   localStorage.removeItem("userId");
  //   localStorage.removeItem("cart");
  //   localStorage.removeItem("isAdmin");
  //   dispatch(clearCart());
  //   alert("Ви успішно вийшли з системи!");
  //   navigate("/");
  // };

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
        <div className="flex items-center justify-between p-4 sm:p-3 xs:p-2 max-w-7xl mx-auto">
          <Link to="/" className="flex items-center space-x-2">
            <img src={Logo} alt="Logo" className="h-12 w-auto sm:h-10 xs:h-8" />
            <span className="text-3xl sm:text-2xl xs:text-xl font-caveat drop-shadow-md" style={{ fontWeight: 600 }}>
              <span className="text-pink-700">Balloons</span>
              <span className="text-pink-500">Shop</span>
            </span>
          </Link>
  
          <button
            onClick={toggleMenu}
            className="bg-gradient-to-r from-accent to-pink-500 text-white font-sans px-6 py-2 sm:px-4 sm:py-1 xs:px-3 xs:py-1 rounded-lg shadow-md hover:from-accentDark hover:to-pink-600 hover:shadow-lg transition duration-300"
          >
            Каталог
          </button>
          {isMenuOpen && !categoriesLoading && categories && (
  <div
    className="absolute left-0 top-0 w-[500px] h-screen bg-white text-text shadow-lg z-50 flex"
    onMouseEnter={() => setIsMenuOpen(true)}
    onMouseLeave={() => setIsMenuOpen(false)}
  >
    {/* Ліва панель категорій */}
    <div className="w-[250px] bg-gray-50 p-4">
      <ul className="space-y-2">
        {categories.map((category) => (
          <li
            key={category.id}
            className={`flex justify-between items-center px-4 py-2 cursor-pointer transition-all duration-300 ${
              hoveredCategory === category.id ? "bg-accent text-white" : "hover:bg-gray-200"
            }`}
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
        className="w-[250px] bg-white shadow-md p-4 border-l border-gray-200 transition-opacity duration-300"
        onMouseEnter={() => setHoveredCategory(hoveredCategory)}
        onMouseLeave={() => setHoveredCategory(null)}
      >
        <h3 className="font-caveat text-text text-lg mb-2">Підкатегорії</h3>
        <ul className="space-y-2">
          {filteredSubCategories.map((subCategory) => (
            <li key={subCategory.id}>
              <Link
                to={`/subcategory/products/${subCategory.slug}`}
                className="text-text hover:text-accent transition-all"
                onClick={() => {
                  setIsMenuOpen(false); // Закриває меню після натискання
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

          <form onSubmit={handleSearchSubmit} className="flex items-center bg-white rounded-lg px-4 py-2 sm:px-3 sm:py-1 xs:px-2 xs:py-1 border border-gray-200">
            <input
              type="text"
              placeholder="Я шукаю..."
              className="outline-none px-3 py-1 text-lg sm:text-base xs:text-sm w-64 sm:w-48 xs:w-32"
              value={search}
              onChange={handleSearch}
            />
            <button
              type="submit"
              className="p-2 rounded-full bg-gradient-to-r from-accent to-pink-500 text-white hover:from-accentDark hover:to-pink-600 transition duration-300 shadow-md hover:shadow-lg"
            >
              <FaSearch size={18} className="sm:w-4 sm:h-4 xs:w-3 xs:h-3" />
            </button>
            {showSuggestions && searchResults && searchResults.length > 0 && (
              <ul className="absolute top-full left-0 w-full bg-white shadow-md rounded-md mt-1 max-h-40 overflow-y-auto">
                {searchResults?.map((product) => (
                  <li
                    key={product.id}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-text"
                    onClick={() => handleSuggestionClick(product.id)}
                  >
                    {product.name}
                  </li>
                ))}
              </ul>
            )}
          </form>
  
          <div className="flex items-center space-x-6 sm:space-x-4 xs:space-x-2">
            <Link to="/cart" className="relative flex items-center">
              <div className="p-2 rounded-full bg-gradient-to-r from-accent to-pink-500 text-white hover:from-accentDark hover:to-pink-600 transition duration-300 shadow-md hover:shadow-lg">
                <FaShoppingCart size={24} className="sm:w-5 sm:h-5 xs:w-4 xs:h-4" />
              </div>
              {cartTotal > 0 && (
                <span className="absolute -top-1 -right-1 bg-pink-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {cartTotal}
                </span>
              )}
            </Link>
            <nav className="flex items-center space-x-4 text-xl">
              {token ? (
                <Link to="/profile">
                  <div className="p-2 rounded-full bg-gradient-to-r from-accent to-pink-500 text-white hover:from-accentDark hover:to-pink-600 transition duration-300 shadow-md hover:shadow-lg">
                    <FaUser size={24} className="sm:w-5 sm:h-5 xs:w-4 xs:h-4" />
                  </div>
                </Link>
              ) : (
                <Link to="/login">
                  <div className="p-2 rounded-full bg-gradient-to-r from-accent to-pink-500 text-white hover:from-accentDark hover:to-pink-600 transition duration-300 shadow-md hover:shadow-lg">
                    <FaSignInAlt size={24} className="sm:w-5 sm:h-5 xs:w-4 xs:h-4" />
                  </div>
                </Link>
              )}
            </nav>
            <Link to="/wishlist">
              <div className="p-2 rounded-full bg-gradient-to-r from-accent to-pink-500 text-white hover:from-accentDark hover:to-pink-600 transition duration-300 shadow-md hover:shadow-lg">
                <FaHeart size={24} className="sm:w-5 sm:h-5 xs:w-4 xs:h-4" />
              </div>
            </Link>
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