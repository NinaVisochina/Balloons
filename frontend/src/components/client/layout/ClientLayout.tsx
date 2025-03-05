import { useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import Footer from "./Footer";
import { FaSearch, FaSignInAlt, FaSignOutAlt, FaUser } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store";
import { clearCart } from "../../../interfaces/cart/cartSlice";
import Logo from "../../../assets/logo.png";
import { useGetProductsByNameQuery } from "../../../services/productApi";
import { useGetCategoriesQuery } from "../../../services/categoryApi";
import { useGetSubCategoriesByCategoryIdQuery } from "../../../services/subcategoryApi";


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
  const { data: subCategoryData } = useGetSubCategoriesByCategoryIdQuery(
    hoveredCategory ?? -1,
    { skip: hoveredCategory === null }
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
    <div className="bg-background text-accent">
      <header className=" text-accent ">
        {/* <div className="flex justify-between items-center p-2 text-sm">
          <div className="flex items-center space-x-4">
            <span>📚 <Link to="/books" className="hover:underline">Книги до зимових свят</Link></span>
            <span>🛒 Інтернет гуртівня книг №1 в Україні</span>
            <span>🌱 <Link to="/eco" className="hover:underline">Екошопери</Link></span>
          </div>
          <div>
            <a href="tel:+380683010220" className="hover:underline">📞 +38 068 301-02-20</a>
          </div>
        </div> */}
  
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
                to={`/subcategory/${subCategory.slug}/products`}
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


          {/* {isMenuOpen && !categoriesLoading && categories && (
  <div
    className={`absolute left-0 w-full h-screen bg-white text-black shadow-lg z-10 flex transition-transform duration-500 ease-out transform ${
      isMenuOpen ? "scale-y-100" : "scale-y-0"
    } origin-top`}
    style={{ top: "120px" }}
  > */}
    {/* Ліва колонка з категоріями */}
    {/* <div className="w-1/3 bg-gray-100 p-4">
      <ul>
        {categories.map((category) => (
          <li
            key={category.id}
            className={`flex justify-between items-center px-4 py-2 cursor-pointer ${
              hoveredCategory === category.id ? "bg-gray-200" : ""
            }`}
            onMouseEnter={() => handleCategoryHover(category.id)}
            onMouseLeave={handleCategoryLeave}
          >
            <span>{category.name}</span>
            <span className="text-gray-500">›</span>
          </li>
        ))}
      </ul>
    </div> */}

    {/* Права колонка з підкатегоріями */}
    {/* {hoveredCategory && filteredSubCategories.length > 0 && (
      <div className="w-2/3 bg-white shadow-lg p-4">
        <h3 className="font-bold text-lg mb-2">Підкатегорії</h3>
        <ul className="space-y-2">
          {filteredSubCategories.map((subCategory) => (
            <li key={subCategory.id}>
              <Link
                to={`/subcategory/${subCategory.id}/products`}
                className="text-gray-800 hover:underline"
              >
                {subCategory.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    )}
  </div>
)}  */}
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


// import { useEffect, useState } from "react";
// import { Link, Outlet, useNavigate } from "react-router-dom";
// import { useGetCategoriesQuery, useGetSubCategoriesByCategoryIdQuery } from "../../../services/categoryApi";
// import Footer from "./Footer";
// import { FaSignInAlt, FaSignOutAlt, FaUser } from "react-icons/fa";
// import { useDispatch, useSelector } from "react-redux";
// import { RootState } from "../../../store";
// import { clearCart } from "../../../interfaces/cart/cartSlice";
// import { useGetProductsByNameQuery } from "../../../services/productApi";
// import Logo from "../../../assets/logo.png"; // Додайте логотип сюди

// const ClientLayout = () => {
//   const token = localStorage.getItem("accessToken");
//   const [search, setSearch] = useState("");
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [hoveredCategory, setHoveredCategory] = useState<number | null>(null);
//   const [filteredSubCategories, setFilteredSubCategories] = useState<any[]>([]);
//   const cartItems = useSelector((state: RootState) => state.cart.items);
//   const cartTotal = Array.isArray(cartItems) ? cartItems.reduce((total, item) => total + item.quantity, 0) : 0;
//   const dispatch = useDispatch();
//   const { data: searchResults } = useGetProductsByNameQuery(search);

//   const { data: categories, isLoading: categoriesLoading } = useGetCategoriesQuery();
//   const { data: subCategoryData, isLoading: subCategoriesLoading } = useGetSubCategoriesByCategoryIdQuery(
//     hoveredCategory ?? -1,
//     { skip: hoveredCategory === null }
//   );

//   useEffect(() => {
//     if (subCategoryData && hoveredCategory !== null) {
//       const filtered = subCategoryData.filter(
//         (subCategory: any) => subCategory.categoryId === hoveredCategory
//       );
//       setFilteredSubCategories(filtered);
//     }
//   }, [subCategoryData, hoveredCategory]);

//   const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setSearch(e.target.value);
//   };

//   const handleSearchSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (search.trim()) {
//       navigate(`/products/search?name=${search.trim()}`);
//     }
//   };

//   const toggleMenu = () => {
//     setIsMenuOpen(!isMenuOpen);
//   };

//   const handleCategoryHover = (categoryId: number) => {
//     setHoveredCategory(categoryId);
//   };

//   const handleCategoryLeave = () => {
//     setHoveredCategory(null);
//     setFilteredSubCategories([]);
//   };

//   const handleLogout = () => {
//     localStorage.removeItem("accessToken");
//     localStorage.removeItem("refreshToken");
//     localStorage.removeItem("userId");
//     localStorage.removeItem("cart");
//     dispatch(clearCart());
//     alert("Ви успішно вийшли з системи!");
//     navigate("/");
//   };

//   const navigate = useNavigate();

//   return (
//     <div className="bg-purple-50 text-purple-800">
//       <header className="bg-purple-600 text-white shadow-md">
//         <div className="flex justify-between items-center p-2 bg-purple-700 text-sm">
//           <div className="flex items-center space-x-4">
//             <span>📚 <Link to="/books" className="hover:underline">Книги до зимових свят</Link></span>
//             <span>🛒 Інтернет гуртівня книг №1 в Україні</span>
//             <span>🌱 <Link to="/eco" className="hover:underline">Екошопери</Link></span>
//           </div>
//           <div>
//             <a href="tel:+380683010220" className="hover:underline">📞 +38 068 301-02-20</a>
//           </div>
//         </div>
//           <div className="flex items-center justify-between p-2 bg-purple-100 shadow-md">
//   <Link to="/" className="flex items-center space-x-2">
//     <img src={Logo} alt="Logo" className="h-16 w-auto ml-2" /> {/* Збільшений логотип і зменшений відступ */}
//     <span className="text-4xl font-extrabold text-purple-700">
//       Ballons<span className="text-purple-500">Shop</span>
//     </span> {/* Збільшений напис */}
//   </Link>

//   <button
//     onClick={toggleMenu}
//     className="bg-purple-700 text-white text-xl px-6 py-3 rounded-lg hover:bg-purple-800 transition duration-300"
//   >
//     📚 Каталог
//   </button>



//           {isMenuOpen && !categoriesLoading && categories && (
//   <div className="absolute left-0 mt-2 w-64 bg-white text-black shadow-lg z-10">
//   <ul className="p-4 space-y-2">
//     {categories.map((category) => (
//       <li
//         key={category.id}
//         className="relative group"
//         onMouseEnter={() => handleCategoryHover(category.id)}
//         onMouseLeave={handleCategoryLeave}
//       >
//         <Link to={`/category/${category.id}`} className="hover:underline">
//           {category.name}
//         </Link>

//         {/* Підкатегорії */}
//         {hoveredCategory === category.id && filteredSubCategories.length > 0 && (
//           <div className="absolute left-full top-0 mt-0 w-64 bg-white text-black shadow-lg z-20">
//             <ul className="p-4 space-y-2">
//               {filteredSubCategories.map((subCategory) => (
//                 <li key={subCategory.id}>
//                   <Link
//                     to={`/subcategory/${subCategory.id}/products`}
//                     className="hover:underline text-purple-600"
//                   >
//                     {subCategory.name}
//                   </Link>
//                 </li>
//               ))}
//             </ul>
//           </div>
//         )}
//       </li>
//     ))}
//   </ul>
// </div>
// )}


          
//   <form onSubmit={handleSearchSubmit} className="flex items-center bg-white rounded-full px-4 py-2 shadow-md">
//     <input
//       type="text"
//       placeholder="Я шукаю..."
//       className="outline-none px-3 py-1 text-lg text-gray-700 w-64"
//       value={search}
//       onChange={handleSearch}
//     />
//     <button
//       type="submit"
//       className="bg-purple-700 text-white text-lg px-5 py-2 rounded-full hover:bg-purple-800 transition duration-300"
//     >
//       🔍
//     </button>
//   </form>

//           <div className="flex items-center space-x-6">
//             <Link to="/cart" className="flex items-center space-x-2 text-xl">
//               <span>🛒</span>
//               <span>{cartTotal}</span>
//             </Link>

//             <nav className="flex items-center space-x-4 text-xl">
//               {token ? (
//                 <>
//                   <Link to="/profile" className="hover:text-purple-300"><FaUser size={24} /></Link>
//                   <button onClick={handleLogout} className="hover:text-purple-300">
//                     <FaSignOutAlt size={24} />
//                   </button>
//                 </>
//               ) : (
//                 <Link to="/login" className="hover:text-purple-300">
//                   <FaSignInAlt size={24} />
//                 </Link>
//               )}
//             </nav>

//             <Link to="/wishlist" className="hover:text-red-500 text-xl">❤️</Link>
//           </div>
//         </div>
//       </header>

//       <main className="container mx-auto py-6 px-6">
//         <Outlet />
//       </main>

//       <Footer />
//     </div>
//   );
// };

// export default ClientLayout;



// import { useEffect, useState } from "react";
// import { Link, Outlet, useNavigate } from "react-router-dom";
// import { useGetCategoriesQuery, useGetSubCategoriesByCategoryIdQuery } from "../../../services/categoryApi";
// import Footer from "./Footer";
// import { FaSignInAlt, FaSignOutAlt, FaUser } from "react-icons/fa";
// import { useDispatch, useSelector } from "react-redux";
// import { RootState } from "../../../store";
// import { clearCart } from "../../../interfaces/cart/cartSlice";
// import { useGetProductsByNameQuery } from "../../../services/productApi";

// const ClientLayout = () => {
//   const token = localStorage.getItem("accessToken"); // Change to check for accessToken
//   const [search, setSearch] = useState("");
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [hoveredCategory, setHoveredCategory] = useState<number | null>(null);
//   const [filteredSubCategories, setFilteredSubCategories] = useState<any[]>([]);
//   const cartItems = useSelector((state: RootState) => state.cart.items);
//   //const cartTotal = cartItems.reduce((total, item) => total + item.quantity, 0); // Підрахунок кількості товарів
//   const cartTotal = Array.isArray(cartItems) ? cartItems.reduce((total, item) => total + item.quantity, 0) : 0;
//   const dispatch = useDispatch(); 
//   const { data: searchResults } = useGetProductsByNameQuery(search);


//   const { data: categories, isLoading: categoriesLoading } = useGetCategoriesQuery();
//   const { data: subCategoryData, isLoading: subCategoriesLoading } = useGetSubCategoriesByCategoryIdQuery(
//     hoveredCategory ?? -1,
//     { skip: hoveredCategory === null }
//   );

//   useEffect(() => {
//     if (subCategoryData && hoveredCategory !== null) {
//       const filtered = subCategoryData.filter(
//         (subCategory: any) => subCategory.categoryId === hoveredCategory
//       );
//       setFilteredSubCategories(filtered);
//     }
//   }, [subCategoryData, hoveredCategory]);

//   useEffect(() => {
//     if (search.trim()) {
//       //refetch();
//     }
//   }, [search]);

//   const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setSearch(e.target.value);
//   };

//   const toggleMenu = () => {
//     setIsMenuOpen(!isMenuOpen);
//   };

//   const handleCategoryHover = (categoryId: number) => {
//     setHoveredCategory(categoryId);
//   };

//   const handleCategoryLeave = () => {
//     setHoveredCategory(null);
//     setFilteredSubCategories([]);
//   };

//   const handleLogout = () => {
//     localStorage.removeItem("accessToken");
//     localStorage.removeItem("refreshToken");
//     localStorage.removeItem("userId");
//     localStorage.removeItem("cart");

//     // Очищення кошика в Redux
//     dispatch(clearCart());

//     alert("Ви успішно вийшли з системи!");
//     navigate("/");
//   };

//   const handleSearchSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (search.trim()) {
//       navigate(`/products/search?name=${search.trim()}`); // Перехід на сторінку результатів
//     }
//   };
  

//   const navigate = useNavigate();

//   return (
//     <div>
//       <header className="bg-gray-800 text-white">
//         <div className="bg-gray-700 p-2 text-sm flex justify-between items-center">
//           <div className="flex items-center space-x-4">
//             <span>📚 <Link to="/books" className="hover:underline">Книги до зимових свят</Link></span>
//             <span>🛒 Інтернет гуртівня книг №1 в Україні</span>
//             <span>🌱 <Link to="/eco" className="hover:underline">Екошопери</Link></span>
//           </div>
//           <div>
//             <a href="tel:+380683010220" className="hover:underline">📞 +38 068 301-02-20</a>
//           </div>
//         </div>

//         <div className="flex items-center justify-between p-4">
//           <Link to="/" className="text-2xl font-bold">
//             <span className="text-orange-500">book</span>opt
//           </Link>

//           <div className="relative">
//             <button onClick={toggleMenu} className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600">
//               📚 Каталог
//             </button>

//             {isMenuOpen && !categoriesLoading && categories && (
//               <div className="absolute left-0 mt-2 w-64 bg-white text-black shadow-lg z-10">
//                 <ul className="p-4 space-y-2">
//                   {categories.map((category) => (
//                     <li
//                       key={category.id}
//                       className="relative"
//                       onMouseEnter={() => handleCategoryHover(category.id)}
//                       onMouseLeave={handleCategoryLeave}
//                     >
//                       <Link to={`/category/${category.id}`} className="hover:underline">{category.name}</Link>
//                       {hoveredCategory === category.id && (
//                         <div className="absolute left-full top-0 mt-2 w-64 bg-white text-black shadow-lg">
//                           <ul className="p-4 space-y-2">
//                             {filteredSubCategories.map((subCategory) => (
//                               <li key={subCategory.id}>
//                                 <Link to={`/subcategory/${subCategory.id}/products`} className="hover:underline">
//                                   {subCategory.name}
//                                 </Link>
//                               </li>
//                             ))}
//                           </ul>
//                         </div>
//                       )}
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             )}
//           </div>

//           <form onSubmit={handleSearchSubmit} className="flex items-center bg-white rounded-full px-3 py-2">
//             <input
//               type="text"
//               placeholder="Я шукаю..."
//               className="outline-none px-2 w-64 text-black"
//               value={search}
//               onChange={handleSearch}
//             />
//             <button type="submit" className="bg-orange-500 text-white px-4 py-2 rounded-full hover:bg-orange-600">
//               🔍
//             </button>
//           </form>

//           <div className="flex items-center space-x-6">
//             <Link to="/cart" className="flex items-center space-x-2">
//               <span>🛒</span>
//               <span>{cartTotal}</span> {/* Тут показуємо кількість товарів у кошику */}
//               <span>0 ₴</span>
//             </Link>

//             <nav className="flex items-center space-x-4">
//               {token ? (
//                 <>
//                   <Link to="/profile" className="text-white text-2xl hover:text-orange-500"><FaUser /></Link>
//                   <button onClick={handleLogout} className="text-white text-2xl hover:text-orange-500">
//                     <FaSignOutAlt />
//                   </button>
//                 </>
//               ) : (
//                 <Link to="/login" className="text-white text-2xl hover:text-orange-500"><FaSignInAlt /></Link>
//               )}
//             </nav>

//             <Link to="/wishlist" className="hover:underline">❤️</Link>
//           </div>
//         </div>
//       </header>

//       <main className="flex-1 container mx-auto py-6 px-6">
//         <Outlet />
//       </main>

//       <Footer />
//     </div>
//   );
// };


// export default ClientLayout;