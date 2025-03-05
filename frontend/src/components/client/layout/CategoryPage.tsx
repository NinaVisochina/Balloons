import { Link, useParams } from "react-router-dom";
import { useGetProductsByCategorySlugQuery } from "../../../services/productApi";
import CategorySidebar from "./CategorySidebar";
import { API_URL } from "../../../env";
import { ISubCategoryItem } from "../../../interfaces/subcategory";
import { useGetCategoryBySlugQuery } from "../../../services/categoryApi";

import { useGetSubCategoriesByCategorySlugQuery } from "../../../services/categoryApi";
import ProductsPage from "./ProductsPage";
import { useState, useEffect } from "react";
import ProductFilter from "./ProductFilter";

const CategoryPage = () => {
  const { slug } = useParams<{ slug?: string }>();

const { data: category } = slug
  ? useGetCategoryBySlugQuery(slug) // Виконує запит, якщо slug існує
  : { data: null }; // В іншому випадку category = null
  const [categoryId, setCategoryId] = useState<number | null>(null);

  useEffect(() => {
    if (category) setCategoryId(category.id); // ✅ Встановлюємо categoryId після отримання категорії
  }, [category]);

  
  const { data: subCategories, isLoading: subCategoriesLoading } = useGetSubCategoriesByCategorySlugQuery(categoryId);
  const { data: products, isLoading: productsLoading } = slug
  ? useGetProductsByCategorySlugQuery(slug)
  : { data: [], isLoading: false };
  console.log("categoryPage,useGetProductsByCategorySlugQuery",slug);
  const [selectedManufacturers, setSelectedManufacturers] = useState<string[]>([]);
  const [selectedQuantities, setSelectedQuantities] = useState<number[]>([]);

  if (subCategoriesLoading || productsLoading) {
    return <div>Завантаження...</div>;
  }

  // Фільтрація підкатегорій за categoryId
  const filteredSubCategories = subCategories?.filter((sub: ISubCategoryItem) => sub.categoryId === categoryId) || [];

  return (
    <div className="container mx-auto py-6 flex flex-col">
      <nav className="text-gray-600 mb-4 flex items-center">
        <Link to="/" className="hover:text-black text-lg">
          <span className="mr-2">🏠</span>
        </Link>
        {category?.name && (
          <>
            <span className="mx-2">/</span>
            <span className="text-black">{category.name}</span>
          </>
        )}
      </nav>

      <div className="container mx-auto py-6 flex">
        <div className="w-1/4">
          <CategorySidebar onCategoryChange={setCategoryId} />
          <ProductFilter
            products={products || []}
            selectedManufacturers={selectedManufacturers}
            setSelectedManufacturers={setSelectedManufacturers}
            selectedQuantities={selectedQuantities}
            setSelectedQuantities={setSelectedQuantities}
          />
        </div>

        <div className="w-3/4 ml-6">
          <h1 className="text-2xl font-bold mb-4">Підкатегорії</h1>
          {filteredSubCategories.length > 0 ? (
            <ul className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {filteredSubCategories.map((sub: ISubCategoryItem) => (
                <li key={sub.id} className="bg-white p-4 shadow-md rounded-lg">
                  <img src={`${API_URL}/images/300_${sub.imageSubCategory}`} alt={sub.name} className="w-full h-40 object-cover rounded-t-lg" />
                  <h2 className="text-lg font-semibold mt-2">{sub.name}</h2>
                  <Link to={`/subcategory/products/${sub.slug}`} className="text-blue-500 hover:underline mt-2 block">
                    Переглянути продукти
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p>У цій категорії немає підкатегорій.</p>
          )}

          <h1 className="text-2xl font-bold mt-8 mb-4">Продукти</h1>
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
