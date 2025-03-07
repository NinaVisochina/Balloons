import { useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import Footer from "./Footer";
import { FaSearch, FaSignInAlt, FaSignOutAlt, FaUser } from "react-icons/fa";
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
  
  
  
// const { data: categories, isLoading: categoriesLoading } = useGetCategoriesQuery();

// const { data: subCategoryData } = useGetSubCategoriesByCategorySlugQuery(
//   hoveredCategory && categories
//     ? categories.find(cat => cat.id === hoveredCategory)?.slug ?? ''
//     : '',
//   { skip: !hoveredCategory || !categories }
// );

// useEffect(() => {
//   if (subCategoryData && hoveredCategory !== null && categories) { // 🔍 Додаємо перевірку categories
//     const filtered = subCategoryData.filter(
//       (subCategory: any) => 
//         categories.find(cat => cat.id === hoveredCategory)?.slug === subCategory.categorySlug
//     );
//     setFilteredSubCategories(filtered);
//   }
// }, [subCategoryData, hoveredCategory, categories]);


  // const { data: categories, isLoading: categoriesLoading } = useGetCategoriesQuery();
  // const { data: subCategoryData } = useGetSubCategoriesByCategoryIdQuery(
  //   hoveredCategory ?? -1,
  //   { skip: hoveredCategory === null }
  // );

  // useEffect(() => {
  //   if (subCategoryData && hoveredCategory !== null) {
  //     const filtered = subCategoryData.filter(
  //       (subCategory: any) => subCategory.categoryId === hoveredCategory
  //     );
  //     setFilteredSubCategories(filtered);
  //   }
  // }, [subCategoryData, hoveredCategory]);

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

  const handleCategoryLeave = () => {
    setHoveredCategory(null);
    setFilteredSubCategories([]);
  };

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
    <div className="bg-background text-accent">
      <header className=" text-accent ">
        <div className="flex items-center justify-between p-2 ">
          <Link to="/" className="flex items-center space-x-2">
            <img src={Logo} alt="Logo" className="h-16 w-auto ml-2" />
            <span className="text-4xl font-sans text-accent">
              BallonsShop
            </span>
          </Link>
  
          <button
            onClick={toggleMenu}
            className="border border-accent text-accent text-xl px-6 py-3 rounded-lg hover:text-primary transition duration-300"
          >
            Каталог
          </button>
          {isMenuOpen && !categoriesLoading && categories && (
  <div
    className="absolute left-0 top-0 w-[500px] h-screen bg-white text-black shadow-lg z-50 flex"
    onMouseEnter={() => setIsMenuOpen(true)}
    onMouseLeave={() => setIsMenuOpen(false)}
  >
    {/* Ліва панель категорій */}
    <div className="w-[250px] bg-gray-100 p-4">
      <ul className="space-y-2">
        {categories.map((category) => (
          <li
            key={category.id}
            className={`flex justify-between items-center px-4 py-2 cursor-pointer transition-all duration-300 ${
              hoveredCategory === category.id ? "bg-gray-300" : ""
            }`}
            onMouseEnter={() => handleCategoryHover(category.id)}
            onClick={() => {
              navigate(`/category/${category.slug}`);
              setIsMenuOpen(false); // Закриває меню після натискання
            }}
          >
            <span>{category.name}</span>
            <span className="text-gray-500">›</span>
          </li>
        ))}
      </ul>
    </div>

    {/* Права панель підкатегорій (при наведенні на категорію) */}
    {hoveredCategory && filteredSubCategories.length > 0 && (
      <div
        className="w-[250px] bg-white shadow-md p-4 border-l border-gray-300 transition-opacity duration-300"
        onMouseEnter={() => setHoveredCategory(hoveredCategory)}
        onMouseLeave={() => setHoveredCategory(null)}
      >
        <h3 className="font-bold text-lg mb-2">Підкатегорії</h3>
        <ul className="space-y-2">
          {filteredSubCategories.map((subCategory) => (
            <li key={subCategory.id}>
              <Link
                to={`/subcategory/products/${subCategory.slug}`}
                className="text-gray-800 hover:text-gray-500 transition-all"
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

          <form onSubmit={handleSearchSubmit} className="flex items-center bg-white rounded-lg px-4 py-2 border border-accent">
            <input
              type="text"
              placeholder="Я шукаю..."
              className="outline-none px-3 py-1 text-lg text-accent w-64"
              value={search}
              onChange={handleSearch}
            />
            <button
              type="submit"
              className="text-accent text-lg px-5 py-2 rounded-lg hover:text-primary transition duration-300"
            >
              <FaSearch />
            </button>
            {showSuggestions && searchResults && searchResults.length > 0 && (
  <ul className="absolute top-full left-0 w-full bg-white shadow-md rounded-md mt-1 max-h-40 overflow-y-auto">
    {searchResults?.map((product) => (
      <li
        key={product.id}
        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
        onClick={() => handleSuggestionClick(product.id)}
      >
        {product.name}
      </li>
    ))}
  </ul>
)}

          </form>
  
          <div className="flex items-center space-x-6">
            <Link to="/cart" className="flex items-center space-x-2 text-xl">
              <span>🛒</span>
              <span>{cartTotal}</span>
            </Link>
  
            <nav className="flex items-center space-x-4 text-xl">
              {token ? (
                <>
                  <Link to="/profile" className="hover:text-mint"><FaUser size={24} /></Link>
                  <button onClick={handleLogout} className="hover:text-mint">
                    <FaSignOutAlt size={24} />
                  </button>
                </>
              ) : (
                <Link to="/login" className="hover:text-mint">
                  <FaSignInAlt size={24} />
                </Link>
              )}
            </nav>
  
            <Link to="/wishlist" className="hover:text-yellowAccent text-xl">❤️</Link>
          </div>
        </div>
      </header>
      {/* className=container mx-auto py-6 px-6 */}
      <main className="w-full">  
        <Outlet />
      </main>
  
      <Footer />
    </div>
  );
  
};

export default ClientLayout;