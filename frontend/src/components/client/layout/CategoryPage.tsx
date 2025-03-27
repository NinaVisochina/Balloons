import { Link, useLocation, useParams } from "react-router-dom";
import { useGetProductsByCategorySlugQuery } from "../../../services/productApi";
import CategorySidebar from "./CategorySidebar";
import { API_URL } from "../../../env";
import { ISubCategoryItem } from "../../../interfaces/subcategory";
import { useGetCategoryBySlugQuery } from "../../../services/categoryApi";
import { useGetSubCategoriesByCategorySlugQuery } from "../../../services/categoryApi";
import ProductsPage from "./ProductsPage";
import { useState, useEffect } from "react";
import ProductFilter from "./ProductFilter";
import { FaHome } from "react-icons/fa";

const CategoryPage = () => {
  const { slug } = useParams<{ slug?: string }>();
  const location = useLocation();

  const { data: category } = slug
    ? useGetCategoryBySlugQuery(slug)
    : { data: null };
  const [categoryId, setCategoryId] = useState<number | null>(null);

  useEffect(() => {
    if (category) setCategoryId(category.id);
  }, [category]);

  const { data: subCategories, isLoading: subCategoriesLoading } = useGetSubCategoriesByCategorySlugQuery(categoryId);
  const { data: products, isLoading: productsLoading } = slug
    ? useGetProductsByCategorySlugQuery(slug)
    : { data: [], isLoading: false };
  const [selectedManufacturers, setSelectedManufacturers] = useState<string[]>([]);
  const [selectedQuantities, setSelectedQuantities] = useState<number[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);

  const isCategoryPage = location.pathname.includes(`/category/${slug}`);

  if (subCategoriesLoading || productsLoading) {
    return <div>Завантаження...</div>;
  }

  const filteredSubCategories = subCategories?.filter((sub: ISubCategoryItem) => sub.categoryId === categoryId) || [];

  return (
    <div className="container mx-auto py-6 px-4 sm:px-6 flex flex-col">
      <nav className="text-gray-600 mb-4 flex items-center">
        <Link to="/" className="hover:text-pink-500 transition duration-200">
          <FaHome className="inline-block mr-2 w-5 h-5 text-gray-600 hover:text-pink-500 transition duration-200" />
        </Link>
        {category?.name && (
          <>
            <span className="mx-2">/</span>
            <span className="text-black">{category.name}</span>
          </>
        )}
      </nav>

      <div className="flex flex-col sm:flex-row">
        <div className="w-full sm:w-64 mb-4 sm:mb-0">
          <CategorySidebar onCategoryChange={setCategoryId} />
          <ProductFilter
            products={products || []}
            selectedManufacturers={selectedManufacturers}
            setSelectedManufacturers={setSelectedManufacturers}
            selectedQuantities={selectedQuantities}
            setSelectedQuantities={setSelectedQuantities}
            selectedSizes={selectedSizes} // 🆕
            setSelectedSizes={setSelectedSizes} // 🆕
          />
        </div>

        <div className="flex-1 sm:ml-6">
          {filteredSubCategories.length > 0 ? (
            <div className="bg-white px-6 pt-4 pb-6 rounded-lg shadow-md border border-pink-100 hover:border-pink-300 hover:shadow-xl transition duration-300">
              <h1 className="text-2xl font-caveat text-pink-700 font-bold text-center mb-4">Підкатегорії</h1>
              <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 justify-items-center">
                {filteredSubCategories.map((sub: ISubCategoryItem) => (
                  <li key={sub.id} className="bg-white p-4 rounded-md transition-transform duration-300 hover:scale-105 hover:shadow-md">
                    <Link to={`/subcategory/products/${sub.slug}`} className="block">
                      <img
                        src={`${API_URL}/images/300_${sub.imageSubCategory}`}
                        alt={sub.name}
                        className="w-32 h-32 object-cover rounded-lg mx-auto transition-transform duration-300 hover:scale-105 hover:opacity-90"
                      />
                    </Link>
                    <h2 className="text-base font-sans text-gray-700 mt-3 text-center">{sub.name}</h2>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <p className="text-gray-700">У цій категорії немає підкатегорій.</p>
          )}

          {isCategoryPage && (
            <h2 className="text-xl font-caveat text-pink-700 mb-4 mt-6">Товари</h2>
          )}
          <ProductsPage categorySlug={category?.slug} />
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
// import { Link, useParams } from "react-router-dom";
// import { useGetProductsByCategoryIdQuery } from "../../../services/productApi";
// import CategorySidebar from "./CategorySidebar";
// import { API_URL } from "../../../env";
// import { ISubCategoryItem } from "../../../interfaces/subcategory";
// import { useGetCategoryQuery } from "../../../services/categoryApi"; 
// import { useGetSubCategoriesByCategoryIdQuery } from "../../../services/categoryApi";
// import ProductsPage from "./ProductsPage";
// import { useState, useEffect } from "react";

// const CategoryPage = () => {
//     const { id } = useParams();
//     const [categoryId, setCategoryId] = useState<number>(Number(id));

//     useEffect(() => {
//         setCategoryId(Number(id)); // Оновлюємо categoryId при зміні URL
//     }, [id]);

//     const { data: category } = useGetCategoryQuery(categoryId);
//     const { data: subCategories, isLoading: subCategoriesLoading } = useGetSubCategoriesByCategoryIdQuery(categoryId);
//     const { data: products, isLoading: productsLoading } = useGetProductsByCategoryIdQuery(categoryId);

//     const [selectedManufacturers, setSelectedManufacturers] = useState<string[]>([]);
//     const [selectedQuantities, setSelectedQuantities] = useState<number[]>([]);

//     if (subCategoriesLoading || productsLoading) {
//         return <div>Завантаження...</div>;
//     }

//     // Отримання унікальних виробників і кількостей упаковок
//     const uniqueManufacturers = Array.from(new Set(products?.map((p) => p.manufacturer)));
//     const uniqueQuantities = Array.from(new Set(products?.map((p) => p.quantityInPack)));

//     // Фільтрація продуктів за вибраними критеріями
//     const filteredProducts = products?.filter((product) => {
//         const matchesManufacturer = selectedManufacturers.length === 0 || selectedManufacturers.includes(product.manufacturer);
//         const matchesQuantity = selectedQuantities.length === 0 || selectedQuantities.includes(product.quantityInPack);
//         return matchesManufacturer && matchesQuantity;
//     });

//     // Оновлення кількостей упаковок відповідно до вибраних виробників
//     const availableQuantities = Array.from(
//         new Set(
//             products
//                 ?.filter((p) => selectedManufacturers.length === 0 || selectedManufacturers.includes(p.manufacturer))
//                 .map((p) => p.quantityInPack)
//         )
//     );
// // Фільтрація підкатегорій за categoryId
//     const filteredSubCategories = subCategories?.filter((sub: ISubCategoryItem) => sub.categoryId === categoryId) || [];

// return (
//     <div className="container mx-auto py-6 flex flex-col">
//         {/* Хлібні крихти над Sidebar */}
//         <nav className="text-gray-600 mb-4 flex items-center">
//             <Link to="/" className="hover:text-black text-lg">
//                 <span className="mr-2">🏠</span>
//             </Link>
//             {category?.name && (
//                 <>
//                     <span className="mx-2">/</span>
//                     <span className="text-black">{category.name}</span>
//                 </>
//             )}
//         </nav>

//         {/* Основний контент: Sidebar + Категорії */}
//         <div className="flex">
//             {/* Sidebar */}
//             <div className="w-1/4">
//                 <CategorySidebar onCategoryChange={setCategoryId} />

//                 {/* Переміщаємо фільтр ПІД CategorySidebar */}
//                 <div className="bg-gray-100 p-4 rounded-md shadow-md mt-4">
//                     <h2 className="text-xl font-bold mb-2">Фільтр</h2>

//                     {/* Фільтр виробників */}
//                     <div className="mb-4">
//                         <h3 className="font-semibold cursor-pointer">Виробники</h3>
//                         <ul>
//                             {uniqueManufacturers.map((manufacturer) => (
//                                 <li key={manufacturer} className="flex items-center">
//                                     <input
//                                         type="checkbox"
//                                         checked={selectedManufacturers.includes(manufacturer)}
//                                         onChange={() =>
//                                             setSelectedManufacturers((prev) =>
//                                                 prev.includes(manufacturer)
//                                                     ? prev.filter((m) => m !== manufacturer)
//                                                     : [...prev, manufacturer]
//                                             )
//                                         }
//                                         className="mr-2"
//                                     />
//                                     {manufacturer}
//                                 </li>
//                             ))}
//                         </ul>
//                     </div>

//                     {/* Фільтр кількості в упаковці */}
//                     <div>
//                         <h3 className="font-semibold cursor-pointer">Кількість в упаковці</h3>
//                         <ul>
//                             {uniqueQuantities.map((quantity) => (
//                                 <li key={quantity} className="flex items-center">
//                                     <input
//                                         type="checkbox"
//                                         checked={selectedQuantities.includes(quantity)}
//                                         onChange={() =>
//                                             setSelectedQuantities((prev) =>
//                                                 prev.includes(quantity)
//                                                     ? prev.filter((q) => q !== quantity)
//                                                     : [...prev, quantity]
//                                             )
//                                         }
//                                         disabled={!availableQuantities.includes(quantity)}
//                                         className="mr-2"
//                                     />
//                                     <span className={availableQuantities.includes(quantity) ? "" : "text-gray-400"}>
//                                         {quantity} шт
//                                     </span>
//                                 </li>
//                             ))}
//                         </ul>
//                     </div>
//                 </div>
//             </div>

//             {/* Основний контент */}
//             <div className="ml-6 flex-1">
//                 <h1 className="text-2xl font-bold mb-4">Підкатегорії</h1>
//                 {filteredSubCategories.length > 0 ? (
//                     <ul className="grid grid-cols-1 md:grid-cols-3 gap-6">
//                         {filteredSubCategories.map((sub: ISubCategoryItem) => (
//                             <li key={sub.id} className="bg-white p-4 shadow-md rounded-lg">
//                                 <img
//                                     src={`${API_URL}/images/300_${sub.imageSubCategory}`}
//                                     alt={sub.name}
//                                     className="w-full h-40 object-cover rounded-t-lg"
//                                 />
//                                 <h2 className="text-lg font-semibold mt-2">{sub.name}</h2>
//                                 <Link to={`/subcategory/${sub.id}/products`} className="text-blue-500 hover:underline mt-2 block">
//                                     Переглянути продукти
//                                 </Link>
//                             </li>
//                         ))}
//                     </ul>
//                 ) : (
//                     <p>У цій категорії немає підкатегорій.</p>
//                 )}

//                 <h1 className="text-2xl font-bold mt-8 mb-4">Продукти</h1>
//                 <ProductsPage categoryId={categoryId} products={filteredProducts} />
//             </div>
//         </div>
//     </div>
// );

    
// };

// export default CategoryPage;
// import { Link, useParams } from "react-router-dom";
// import { useGetProductsByCategoryIdQuery } from "../../../services/productApi";
// import CategorySidebar from "./CategorySidebar";
// import { API_URL } from "../../../env";
// import { ISubCategoryItem } from "../../../interfaces/subcategory";
// import { useGetCategoryQuery } from "../../../services/categoryApi"; 
// import { useGetSubCategoriesByCategoryIdQuery } from "../../../services/categoryApi";
// import ProductsPage from "./ProductsPage";
// import { useState, useEffect } from "react";

// const CategoryPage = () => {
//     const { id } = useParams();
//     const [categoryId, setCategoryId] = useState<number>(Number(id));

//     useEffect(() => {
//         setCategoryId(Number(id)); // Оновлюємо categoryId при зміні URL
//     }, [id]);
//     const { data: category } = useGetCategoryQuery(categoryId);
//     const { data: subCategories, isLoading: subCategoriesLoading } = useGetSubCategoriesByCategoryIdQuery(categoryId);
//     const { data: products, isLoading: productsLoading } = useGetProductsByCategoryIdQuery(categoryId);

//     if (subCategoriesLoading || productsLoading) {
//         return <div>Завантаження...</div>;
//     }

//     // Фільтрація підкатегорій за categoryId
//     const filteredSubCategories = subCategories?.filter((sub: ISubCategoryItem) => sub.categoryId === categoryId) || [];

//     return (
//         <div className="container mx-auto py-6 flex flex-col">
//             {/* Хлібні крихти над Sidebar */}
//             <nav className="text-gray-600 mb-4 flex items-center">
//                 <Link to="/" className="hover:text-black text-lg">
//                     <span className="mr-2">🏠</span>
//                 </Link>
//                 {category?.name && (
//                     <>
//                         <span className="mx-2">/</span>
//                         <span className="text-black">{category.name}</span>
//                     </>
//                 )}
//             </nav>

//             {/* Основний контент: Sidebar + Категорії */}
//             <div className="flex">
//                 {/* Sidebar */}
//                 <CategorySidebar onCategoryChange={setCategoryId} />

//                 <div className="ml-6 flex-1">
//                     <h1 className="text-2xl font-bold mb-4">Підкатегорії</h1>

//                     {filteredSubCategories.length > 0 ? (
//                         <ul className="grid grid-cols-1 md:grid-cols-3 gap-6">
//                             {filteredSubCategories.map((sub: ISubCategoryItem) => (
//                                 <li key={sub.id} className="bg-white p-4 shadow-md rounded-lg">
//                                     <img
//                                         src={`${API_URL}/images/300_${sub.imageSubCategory}`}
//                                         alt={sub.name}
//                                         className="w-full h-40 object-cover rounded-t-lg"
//                                     />
//                                     <h2 className="text-lg font-semibold mt-2">{sub.name}</h2>
//                                     <Link to={`/subcategory/${sub.id}/products`} className="text-blue-500 hover:underline mt-2 block">
//                                         Переглянути продукти
//                                     </Link>
//                                 </li>
//                             ))}
//                         </ul>
//                     ) : (
//                         <p>У цій категорії немає підкатегорій.</p>
//                     )}

//                     {/* Відображення продуктів цієї категорії */}
//                     <h1 className="text-2xl font-bold mt-8 mb-4">Продукти</h1>
//                     <ProductsPage categoryId={categoryId} />
//                 </div>
//             </div>
//         </div>

//         //         <div className="container mx-auto py-6 flex">
//         //             {/* Передаємо `setCategoryId` у `CategorySidebar`, щоб керувати категорією */}
//         //             <CategorySidebar onCategoryChange={setCategoryId} />

//         //             <div className="ml-6 flex-1">
//         //                 <h1 className="text-2xl font-bold mb-4">Підкатегорії</h1>
//         //                 {filteredSubCategories.length > 0 ? (
//         //                     <ul className="grid grid-cols-1 md:grid-cols-3 gap-6">
//         //                         {filteredSubCategories.map((sub: ISubCategoryItem) => (
//         //                             <li key={sub.id} className="bg-white p-4 shadow-md rounded-lg">
//         //                                 <img
//         //                                     src={`${API_URL}/images/300_${sub.imageSubCategory}`}
//         //                                     alt={sub.name}
//         //                                     className="w-full h-40 object-cover rounded-t-lg"
//         //                                 />
//         //                                 <h2 className="text-lg font-semibold mt-2">{sub.name}</h2>
//         //                                 <Link to={`/subcategory/${sub.id}/products`} className="text-blue-500 hover:underline mt-2 block">
//         //                                     Переглянути продукти
//         //                                 </Link>
//         //                             </li>
//         //                         ))}
//         //                     </ul>
//         //                 ) : (
//         //                     <p>У цій категорії немає підкатегорій.</p>
//         //                 )}

//         //                 {/* Відображення продуктів цієї категорії */}
//         //                 <h1 className="text-2xl font-bold mt-8 mb-4">Продукти</h1>
//         //                 <ProductsPage categoryId={categoryId} />
//         //             </div>
//         //         </div>
//     );
// };

// export default CategoryPage;
