import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API_URL } from "../../../../env/index.ts";
import { useGetCategoryBySlugQuery, useGetSubCategoriesByCategorySlugQuery } from "../../../../services/categoryApi.ts";
import Loader from "../../../common/Loader/index.tsx";
import { ICategoryItem } from "../../../../interfaces/categories/index.ts";
import { ISubCategoryItem } from "../../../../interfaces/subcategory/index.ts";

const CategoryViewPage = () => {
    const { slug } = useParams();
    const categorySlug = slug || "";
    const [category, setCategory] = useState<ICategoryItem | null>(null);
    const [subCategories, setSubCategories] = useState<ISubCategoryItem[]>([]);

    const { data: categoryData, isLoading: categoryLoading } = useGetCategoryBySlugQuery(categorySlug);
    const { data: subCategoryData, isLoading: subCategoryLoading } = useGetSubCategoriesByCategorySlugQuery(slug);


    useEffect(() => {
        if (categoryData) setCategory(categoryData);
        if (subCategoryData) setSubCategories(subCategoryData);
    }, [categoryData, subCategoryData]);


    if (categoryLoading || subCategoryLoading) return <Loader loading={true} size={150} color="#1f2937" />;

    return (
        <div className="p-6">
            {/* Основна інформація про категорію */}
            {category && (
                <div className="mb-6 p-6 border rounded-lg shadow-md bg-white">
                    <h1 className="text-2xl font-bold mb-4">Інформація про категорію</h1>
                    <div className="mb-4">
                        <span className="font-semibold">Назва:</span> {category.name}
                    </div>
                    <div className="mb-4">
                        <span className="font-semibold">Опис:</span> {category.description}
                    </div>
                    <div className="mb-4">
                        <span className="font-semibold">Зображення:</span>
                        <img
                            src={`${API_URL}/images/300_${category.imageCategory}`}
                            alt={category.name}
                            className="h-40 w-40 object-cover rounded-lg mt-2 border"
                        />
                    </div>
                </div>
            )}

            {/* Підкатегорії */}
            <h2 className="text-xl font-semibold mt-6 mb-4">Підкатегорії</h2>
            {subCategories?.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {subCategories.map((subCategory: any) => (
                        <div
                            key={subCategory.id}
                            className="p-4 border rounded-lg shadow-md bg-white hover:shadow-lg transition-shadow"
                        >
                            <h3 className="text-lg font-bold mb-2">{subCategory.name}</h3>
                            <img
                                src={`${API_URL}/images/300_${subCategory.imageSubCategory}`}
                                alt={subCategory.name}
                                className="h-24 w-24 object-cover rounded-lg border mb-4"
                            />
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-gray-600">Немає підкатегорій для цієї категорії.</p>
            )}
        </div>
    );
};

export default CategoryViewPage;
// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { API_URL } from "../../../../env/index.ts";
// import { useGetCategoryQuery, useGetSubCategoriesByCategoryIdQuery } from "../../../../services/categoryApi.ts";
// import Loader from "../../../common/Loader/index.tsx";

// const CategoryViewPage = () => {
//     const { id } = useParams();
//     const [category, setCategory] = useState<any>(null);
//     const [subCategories, setSubCategories] = useState<any[]>([]);

//     const { data: categoryData, isLoading: categoryLoading } = useGetCategoryQuery(Number(id));
//     const { data: subCategoryData, isLoading: subCategoryLoading } = useGetSubCategoriesByCategoryIdQuery(Number(id));

//     useEffect(() => {
//         if (categoryData) {
//             setCategory(categoryData);
//         }
//         if (subCategoryData) {
//             const filteredSubCategories = subCategoryData.filter(
//                 (subCategory: any) => subCategory.categoryId === Number(id)
//             );
//             setSubCategories(filteredSubCategories);
//         }
//     }, [categoryData, subCategoryData, id]);

//     if (categoryLoading || subCategoryLoading) return <Loader loading={true} size={150} color="#1f2937" />;

//     return (
//         <div className="p-6">
//             {/* Основна інформація про категорію */}
//             {category && (
//                 <div className="mb-6 p-6 border rounded-lg shadow-md bg-white">
//                     <h1 className="text-2xl font-bold mb-4">Інформація про категорію</h1>
//                     <div className="mb-4">
//                         <span className="font-semibold">Назва:</span> {category.name}
//                     </div>
//                     <div className="mb-4">
//                         <span className="font-semibold">Опис:</span> {category.description}
//                     </div>
//                     <div className="mb-4">
//                         <span className="font-semibold">Зображення:</span>
//                         <img
//                             src={`${API_URL}/images/300_${category.imageCategory}`}
//                             alt={category.name}
//                             className="h-40 w-40 object-cover rounded-lg mt-2 border"
//                         />
//                     </div>
//                 </div>
//             )}

//             {/* Підкатегорії */}
//             <h2 className="text-xl font-semibold mt-6 mb-4">Підкатегорії</h2>
//             {subCategories?.length > 0 ? (
//                 <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//                     {subCategories.map((subCategory: any) => (
//                         <div
//                             key={subCategory.id}
//                             className="p-4 border rounded-lg shadow-md bg-white hover:shadow-lg transition-shadow"
//                         >
//                             <h3 className="text-lg font-bold mb-2">{subCategory.name}</h3>
//                             <img
//                                 src={`${API_URL}/images/300_${subCategory.imageSubCategory}`}
//                                 alt={subCategory.name}
//                                 className="h-24 w-24 object-cover rounded-lg border mb-4"
//                             />
//                         </div>
//                     ))}
//                 </div>
//             ) : (
//                 <p className="text-gray-600">Немає підкатегорій для цієї категорії.</p>
//             )}
//         </div>
//     );
// };

// export default CategoryViewPage;
