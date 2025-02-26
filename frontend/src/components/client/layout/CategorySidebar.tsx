import { Link,useParams } from "react-router-dom";  
import { useGetCategoriesQuery, useGetSubCategoriesByCategorySlugQuery } from "../../../services/categoryApi";
import { useEffect, useState } from "react";
import { ISubCategoryItem } from "../../../interfaces/subcategory";
import axios from "axios";
import { API_URL } from "../../../env"; // Додано для запиту категорії за slug

interface CategorySidebarProps {
  onCategoryChange: (id: number) => void;
}

const CategorySidebar: React.FC<CategorySidebarProps> = ({ onCategoryChange }) => {
  const { slug } = useParams(); // Отримуємо slug категорії з URL
  // const navigate = useNavigate();
  
  const { data: categories, isLoading } = useGetCategoriesQuery();
  const { data: subCategories } = useGetSubCategoriesByCategorySlugQuery(slug);

  const [openCategory, setOpenCategory] = useState<number | null>(null);
  const [categoryId, setCategoryId] = useState<number | null>(null); // ID категорії, отриманий за slug

  useEffect(() => {
    if (slug) {
      // Отримуємо ID категорії за slug
      axios.get(`${API_URL}/api/Category/slug/${slug}`)
        .then((response) => {
          setCategoryId(response.data.id);
          onCategoryChange(response.data.id);
        })
        .catch((error) => {
          console.error("Помилка отримання категорії за slug:", error);
          setCategoryId(null);
        });
    }
  }, [slug, onCategoryChange]);

  if (isLoading) return <p>Завантаження...</p>;

  return (
    <div className="w-64 bg-blue-500 text-white p-4">
      <h2 className="font-bold text-xl mb-2">Категорії</h2>
      <ul>
        {categories?.map((category) => (
          <li key={category.id} className="mb-2">
            <div className="flex justify-between items-center p-2">
              {/* Натискання на назву переходить на сторінку категорії */}
              <Link 
                to={`/category/${category.slug}`} 
                className={`cursor-pointer ${categoryId === category.id ? "text-yellow-300" : ""}`}
              >
                {category.name}
              </Link>

              {/* Натискання на + відкриває підкатегорії без переходу */}
              <span 
                className="cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation(); // Зупиняємо спливання події, щоб не переходило на категорію
                  setOpenCategory(openCategory === category.id ? null : category.id);
                }}
              >
                {openCategory === category.id ? "−" : "+"}
              </span>
            </div>

            {/* Відображаємо підкатегорії тільки для активної категорії */}
            {openCategory === category.id && subCategories?.length > 0 && (
              <ul className="ml-4">
                {subCategories
                  .filter((sub: ISubCategoryItem) => sub.categoryId === category.id)
                  .map((sub: ISubCategoryItem) => (
                    <li key={sub.id} className="mt-1">
                      <Link
                        to={`/subcategory/products/${sub.slug}`}
                        className="text-yellow-200 hover:text-yellow-400"
                      >
                        {sub.name}
                      </Link>
                    </li>
                  ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategorySidebar;
// import { Link, useNavigate, useParams } from "react-router-dom"; 
// import { useGetCategoriesQuery, useGetSubCategoriesByCategoryIdQuery } from "../../../services/categoryApi";
// import { useEffect, useState } from "react";
// import { ISubCategoryItem } from "../../../interfaces/subcategory";

// interface CategorySidebarProps {
//   onCategoryChange: (id: number) => void;
// }

// const CategorySidebar: React.FC<CategorySidebarProps> = ({ onCategoryChange }) => {
//   const { data: categories, isLoading } = useGetCategoriesQuery();
//   const { id } = useParams();
//   const categoryId = Number(id);
  
//   const navigate = useNavigate();
//   const { data: subCategories } = useGetSubCategoriesByCategoryIdQuery(categoryId);
//   const [openCategory, setOpenCategory] = useState<number | null>(null);

//   useEffect(() => {
//     if (categoryId) {
//       onCategoryChange(categoryId);
//     }
//   }, [categoryId, onCategoryChange]);

//   if (isLoading) return <p>Завантаження...</p>;

//   return (
//     <div className="w-64 bg-blue-500 text-white p-4">
//       <h2 className="font-bold text-xl mb-2">Категорії</h2>
//       <ul>
//         {categories?.map((category) => (
//           <li key={category.id} className="mb-2">
//             <div className="flex justify-between items-center p-2">
//               {/* Натискання на назву переходить на сторінку категорії */}
//               <Link 
//                 to={`/category/${category.id}`} 
//                 className={`cursor-pointer ${categoryId === category.id ? "text-yellow-300" : ""}`}
//               >
//                 {category.name}
//               </Link>

//               {/* Натискання на + відкриває підкатегорії без переходу */}
//               <span 
//                 className="cursor-pointer"
//                 onClick={(e) => {
//                   e.stopPropagation(); // ❗ Зупиняємо спливання події, щоб не переходило на категорію
//                   setOpenCategory(openCategory === category.id ? null : category.id);
//                 }}
//               >
//                 {openCategory === category.id ? "−" : "+"}
//               </span>
//             </div>

//             {/* Відображаємо підкатегорії тільки для активної категорії */}
//             {openCategory === category.id && subCategories?.length > 0 && (
//               <ul className="ml-4">
//                 {subCategories
//                   .filter((sub: ISubCategoryItem) => sub.categoryId === category.id)
//                   .map((sub: ISubCategoryItem) => (
//                     <li key={sub.id} className="mt-1">
//                       <Link
//                         to={`/subcategory/${sub.id}/products`} 
//                         className="text-yellow-200 hover:text-yellow-400"
//                       >
//                         {sub.name}
//                       </Link>
//                     </li>
//                   ))}
//               </ul>
//             )}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default CategorySidebar;
// // import { Link, useNavigate, useParams } from "react-router-dom";
// // import { useGetCategoriesQuery, useGetSubCategoriesByCategoryIdQuery } from "../../../services/categoryApi";
// // import { useEffect, useState } from "react";
// // import { ISubCategoryItem } from "../../../interfaces/subcategory";

// // interface CategorySidebarProps {
// //   onCategoryChange: (id: number) => void;
// // }

// // const CategorySidebar: React.FC<CategorySidebarProps> = ({ onCategoryChange }) => {
// //   const { data: categories, isLoading } = useGetCategoriesQuery();
// //   const { id } = useParams();
// //   const categoryId = Number(id);
  
// //   const navigate = useNavigate();
// //   const { data: subCategories } = useGetSubCategoriesByCategoryIdQuery(categoryId);
// //   const [openCategory, setOpenCategory] = useState<number | null>(null);
// //   useEffect(() => {
// //             if (categoryId) {
// //                 onCategoryChange(categoryId);
// //             }
// //         }, [categoryId, onCategoryChange]);
// //   if (isLoading) return <p>Завантаження...</p>;

// //   return (
// //             <div className="w-64 bg-blue-500 text-white p-4">
// //                 <h2 className="font-bold text-xl mb-2">Категорії</h2>
// //                 <ul>
// //                     {categories?.map((category) => (
// //                         <li key={category.id} className="mb-2">
// //                             <div
// //                                 className={`flex justify-between items-center cursor-pointer p-2 ${
// //                                     categoryId === category.id ? "text-yellow-300" : ""
// //                                 }`}
// //                                 onClick={() => {
// //                                     setOpenCategory(openCategory === category.id ? null : category.id);
// //                                     navigate(`/category/${category.id}`);
// //                                 }}
// //                             >
// //                                 <span>{category.name}</span>
// //                                 <span>{openCategory === category.id ? "−" : "+"}</span>
// //                             </div>
    
// //                             {/* Відображаємо підкатегорії тільки для активної категорії */}
// //                             {openCategory === category.id && categoryId === category.id && subCategories?.length > 0 && (
// //                                 <ul className="ml-4">
// //                                     {subCategories
// //                                         .filter((sub: ISubCategoryItem) => sub.categoryId === category.id)
// //                                         .map((sub: ISubCategoryItem) => (
// //                                             <li key={sub.id} className="mt-1">
// //                                                 <Link
// //                                                     to={`/subcategory/${sub.id}/products`} 
// //                                                     className="text-yellow-200 hover:text-yellow-400"
// //                                                 >
// //                                                     {sub.name}
// //                                                 </Link>
// //                                             </li>
// //                                         ))}
// //                                 </ul>
// //                             )}
// //                         </li>
// //                     ))}
// //                 </ul>
// //             </div>
// //         );
// //     };

// // export default CategorySidebar;
// // import { Link, useNavigate, useParams } from "react-router-dom";
// // import { useGetCategoriesQuery, useGetSubCategoriesByCategoryIdQuery } from "../../../services/categoryApi";
// // import { useState, useEffect } from "react";
// // import { ISubCategoryItem } from "../../../interfaces/subcategory";

// // const CategorySidebar = ({ onCategoryChange }: { onCategoryChange: (id: number) => void }) => {
// //     const { data: categories, isLoading } = useGetCategoriesQuery();
// //     const { id } = useParams();
// //     const categoryId = Number(id);

// //     const navigate = useNavigate();
// //     const [openCategory, setOpenCategory] = useState<number | null>(categoryId);

// //     // Отримуємо підкатегорії **тільки для активної категорії**
// //     const { data: subCategories } = useGetSubCategoriesByCategoryIdQuery(categoryId);

// //     useEffect(() => {
// //         if (categoryId) {
// //             onCategoryChange(categoryId);
// //         }
// //     }, [categoryId, onCategoryChange]);

// //     if (isLoading) return <p>Завантаження...</p>;

// //     return (
// //         <div className="w-64 bg-blue-500 text-white p-4">
// //             <h2 className="font-bold text-xl mb-2">Категорії</h2>
// //             <ul>
// //                 {categories?.map((category) => (
// //                     <li key={category.id} className="mb-2">
// //                         <div
// //                             className={`flex justify-between items-center cursor-pointer p-2 ${
// //                                 categoryId === category.id ? "text-yellow-300" : ""
// //                             }`}
// //                             onClick={() => {
// //                                 setOpenCategory(openCategory === category.id ? null : category.id);
// //                                 navigate(`/category/${category.id}`);
// //                             }}
// //                         >
// //                             <span>{category.name}</span>
// //                             <span>{openCategory === category.id ? "−" : "+"}</span>
// //                         </div>

// //                         {/* Відображаємо підкатегорії тільки для активної категорії */}
// //                         {openCategory === category.id && categoryId === category.id && subCategories?.length > 0 && (
// //                             <ul className="ml-4">
// //                                 {subCategories
// //                                     .filter((sub: ISubCategoryItem) => sub.categoryId === category.id)
// //                                     .map((sub: ISubCategoryItem) => (
// //                                         <li key={sub.id} className="mt-1">
// //                                             <Link
// //                                                 to={`/subcategory/${sub.id}/products`} 
// //                                                 className="text-yellow-200 hover:text-yellow-400"
// //                                             >
// //                                                 {sub.name}
// //                                             </Link>
// //                                         </li>
// //                                     ))}
// //                             </ul>
// //                         )}
// //                     </li>
// //                 ))}
// //             </ul>
// //         </div>
// //     );
// // };

// // export default CategorySidebar;
// // // import { Link, useNavigate, useParams } from "react-router-dom";
// // // import { useGetCategoriesQuery, useGetSubCategoriesByCategoryIdQuery } from "../../../services/categoryApi";
// // // import { useState, useEffect } from "react";
// // // import { ISubCategoryItem } from "../../../interfaces/subcategory";

// // // const CategorySidebar = ({ onCategoryChange }: { onCategoryChange: (id: number) => void }) => {
// // //     const { data: categories, isLoading } = useGetCategoriesQuery();
// // //     const { id } = useParams();
// // //     const categoryId = Number(id);

// // //     const navigate = useNavigate();
// // //     const [openCategory, setOpenCategory] = useState<number | null>(categoryId);

// // //     // Запит на підкатегорії **тільки для активної категорії**
// // //     const { data: subCategories } = useGetSubCategoriesByCategoryIdQuery(categoryId);

// // //     useEffect(() => {
// // //         if (categoryId) {
// // //             onCategoryChange(categoryId);
// // //         }
// // //     }, [categoryId, onCategoryChange]);

// // //     if (isLoading) return <p>Завантаження...</p>;

// // //     return (
// // //         <div className="w-64 bg-blue-500 text-white p-4">
// // //             <h2 className="font-bold text-xl mb-2">Категорії</h2>
// // //             <ul>
// // //                 {categories?.map((category) => (
// // //                     <li key={category.id} className="mb-2">
// // //                         <div
// // //                             className={`flex justify-between items-center cursor-pointer p-2 ${
// // //                                 categoryId === category.id ? "text-yellow-300" : ""
// // //                             }`}
// // //                             onClick={() => {
// // //                                 setOpenCategory(openCategory === category.id ? null : category.id);
// // //                                 navigate(`/category/${category.id}`);
// // //                             }}
// // //                         >
// // //                             <span>{category.name}</span>
// // //                             <span>{openCategory === category.id ? "−" : "+"}</span>
// // //                         </div>

// // //                         {/* Відображаємо тільки підкатегорії цієї категорії */}
// // //                         {openCategory === category.id && categoryId === category.id && subCategories?.length > 0 && (
// // //                             <ul className="ml-4">
// // //                                 {subCategories
// // //                                     .filter((sub: ISubCategoryItem) => sub.categoryId === category.id)
// // //                                     .map((sub: ISubCategoryItem) => (
// // //                                         <li key={sub.id} className="mt-1">
// // //                                             <Link to={`/subcategory/${sub.id}/products`} className="text-yellow-200 hover:text-yellow-400">
// // //                                                 {sub.name}
// // //                                             </Link>
// // //                                         </li>
// // //                                     ))}
// // //                             </ul>
// // //                         )}
// // //                     </li>
// // //                 ))}
// // //             </ul>
// // //         </div>
// // //     );
// // // };

// // // export default CategorySidebar;
