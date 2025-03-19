import { useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import Footer from "./Footer";
import { FaHeart, FaSearch, FaShoppingCart, FaSignInAlt, FaSignOutAlt, FaUser } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store";
import { clearCart } from "../../../interfaces/cart/cartSlice";
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
  const dispatch = useDispatch(); 
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

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("userId");
    localStorage.removeItem("cart");
    localStorage.removeItem("isAdmin");
    dispatch(clearCart());
    alert("Ви успішно вийшли з системи!");
    navigate("/");
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
      <header className="bg-primary shadow-md">
        <div className="flex items-center justify-between p-4 max-w-7xl mx-auto">
          <Link to="/" className="flex items-center space-x-2">
            <img src={Logo} alt="Logo" className="h-12 w-auto" />
            <span className="text-3xl font-caveat text-text">
              BallonsShop
            </span>
          </Link>
  
          <button
            onClick={toggleMenu}
            className="border border-accent text-accent text-lg px-6 py-2 rounded-lg hover:bg-accent hover:text-white transition duration-300"
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

          <form onSubmit={handleSearchSubmit} className="flex items-center bg-white rounded-lg px-4 py-2 border border-gray-200">
            <input
              type="text"
              placeholder="Я шукаю..."
              className="outline-none px-3 py-1 text-lg text-text w-64"
              value={search}
              onChange={handleSearch}
            />
            <button
              type="submit"
              className="text-accent text-lg px-3 py-1 rounded-lg hover:text-primary transition duration-300"
            >
              <FaSearch />
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
  
          <div className="flex items-center space-x-6">
          <Link to="/cart" className="flex items-center space-x-2 text-xl text-accent hover:text-accent-dark">
            <FaShoppingCart size={24} />
            <span>{cartTotal}</span>
          </Link>  
            <nav className="flex items-center space-x-4 text-xl">
              {token ? (
                <>
                  <Link to="/profile" className="text-accent hover:text-accent-dark"><FaUser size={24} /></Link>
                  <button onClick={handleLogout} className="text-accent hover:text-accent-dark">
                    <FaSignOutAlt size={24} />
                  </button>
                </>
              ) : (
                <Link to="/login" className="text-accent hover:text-accent-dark">
                  <FaSignInAlt size={24} />
                </Link>
              )}
            </nav>  
            <Link to="/wishlist" className="text-accent hover:text-accent-dark">
              <FaHeart size={24} />
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