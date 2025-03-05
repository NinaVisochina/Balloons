import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API_URL } from "../../../../env/index.ts";
import Loader from "../../../common/Loader/index.tsx";
import { useGetProductsBySubCategoryIdQuery } from "../../../../services/productApi.ts";
import { useGetSubCategoryBySlugQuery } from "../../../../services/subcategoryApi.ts"; // ❗ Новий запит для отримання підкатегорії за slug
import axios from "axios";

const SubCategoryViewPage = () => {
    const { slug } = useParams<{ slug?: string }>(); // Робимо slug необов'язковим
    const [categoryName, setCategoryName] = useState<string>("");
    const [subCategoryId, setSubCategoryId] = useState<number | null>(null);

    const { data: subCategoryData, isLoading: subCategoryLoading } = useGetSubCategoryBySlugQuery(slug!, {
        skip: !slug, // ❗ Пропускаємо запит, якщо slug ще немає
    });
    // Як тільки ми отримали `subCategoryData`, встановлюємо `subCategoryId`
    useEffect(() => {
        if (subCategoryData) {
            setSubCategoryId(subCategoryData.id);

            // Додатковий запит для отримання назви категорії
            axios.get(`${API_URL}/api/Category/${subCategoryData.categoryId}`)
                .then((response) => setCategoryName(response.data.name))
                .catch(() => setCategoryName("Категорія не знайдена"));
        }
    }, [subCategoryData]);

    // Завантажуємо продукти тільки після отримання `subCategoryId`
    const { data: productData, isLoading: productLoading } = useGetProductsBySubCategoryIdQuery(subCategoryId!, {
        skip: !subCategoryId, // ❗ Пропускаємо запит, якщо `subCategoryId` ще не отримано
    });

    if (subCategoryLoading || productLoading) {
        return <Loader loading={true} size={150} color="#1f2937" />;
    }

    return (
        <div className="p-6">
            {/* Основна картка підкатегорії */}
            {subCategoryData && (
                <div className="mb-6 p-6 border rounded-lg shadow-md bg-white">
                    <h1 className="text-2xl font-bold mb-4">Інформація про підкатегорію</h1>
                    <div className="mb-4">
                        <span className="font-semibold">Назва:</span> {subCategoryData.name}
                    </div>
                    <div className="mb-4">
                        <span className="font-semibold">Категорія:</span> {categoryName}
                    </div>
                    <div className="mb-4">
                        <span className="font-semibold">Зображення:</span>
                        <img
                            src={`${API_URL}/images/300_${subCategoryData.imageSubCategory}`}
                            alt={subCategoryData.name}
                            className="h-40 w-40 object-cover rounded-lg mt-2 border"
                        />
                    </div>
                </div>
            )}

            {/* Список продуктів */}
            <h2 className="text-xl font-semibold mt-6 mb-4">Список продуктів</h2>
            {productData && productData.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {productData.map((product: any) => (
                        <div
                            key={product.id}
                            className="p-4 border rounded-lg shadow-md bg-white hover:shadow-lg transition-shadow"
                        >
                            <h3 className="text-lg font-bold mb-2">{product.name}</h3>
                            <div className="mb-2">
                                <span className="font-semibold">Ціна:</span> {product.price} грн
                            </div>
                            <img
                                src={product.images.length > 0 ? `${API_URL}/images/300_${product.images[0]}` : "/path-to-placeholder-image.jpg"}
                                alt={product.name}
                                className="h-24 w-24 object-cover rounded-lg border mb-4"
                            />
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-gray-600">Немає продуктів у цій підкатегорії.</p>
            )}
        </div>
    );
};

export default SubCategoryViewPage;
// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { API_URL } from "../../../../env/index.ts";
// import Loader from "../../../common/Loader/index.tsx";
// import { useGetProductsBySubCategoryIdQuery } from "../../../../services/productApi.ts";
// import { useGetSubCategoryQuery } from "../../../../services/subcategoryApi.ts";
// import axios from "axios";

// const SubCategoryViewPage = () => {
//     const { id } = useParams(); // Отримуємо ID підкатегорії з URL
//     const [subCategory, setSubCategory] = useState<any>(null);
//     const [products, setProducts] = useState<any[]>([]);
//     const [categoryName, setCategoryName] = useState<string>("");

//     const { data: subCategoryData, isLoading: subCategoryLoading } = useGetSubCategoryQuery(Number(id));
//     const { data: productData, isLoading: productLoading, error: productError } = useGetProductsBySubCategoryIdQuery(Number(id));
    
//     useEffect(() => {
//         if (subCategoryData) {
//             console.log("SubCategory Data:", subCategoryData);
//             setSubCategory(subCategoryData);

//             // Додатковий запит для отримання назви категорії
//             axios.get(`${API_URL}/api/Category/${subCategoryData.categoryId}`)
//                 .then((response) => {
//                     setCategoryName(response.data.name);
//                 })
//                 .catch((error) => {
//                     console.error("Помилка завантаження категорії:", error);
//                     setCategoryName("Категорія не знайдена");
//                 });
//         }
//         if (productData) {
//             setProducts(productData);
//         } else if (productError) {
//             // Ensure productError is of the correct type
//             if ('status' in productError && productError.status === 404) {
//                 setProducts([]); // Якщо помилка 404, встановлюємо порожній список продуктів
//             } else {
//                 console.error('Помилка продуктів:', productError);
//             }
//         }
//     }, [subCategoryData, productData, productError]);

//     if (subCategoryLoading || productLoading) return <Loader loading={true} size={150} color="#1f2937" />;

//     return (
//         <div className="p-6">
//             {/* Основна картка підкатегорії */}
//             {subCategory && (
//                 <div className="mb-6 p-6 border rounded-lg shadow-md bg-white">
//                     <h1 className="text-2xl font-bold mb-4">Інформація про підкатегорію</h1>
//                     <div className="mb-4">
//                         <span className="font-semibold">Назва:</span> {subCategory.name}
//                     </div>
//                     <div className="mb-4">
//                         <span className="font-semibold">Категорія:</span> {categoryName}
//                     </div>
//                     <div className="mb-4">
//                         <span className="font-semibold">Зображення:</span>
//                         <img
//                             src={`${API_URL}/images/300_${subCategory.imageSubCategory}`}
//                             alt={subCategory.name}
//                             className="h-40 w-40 object-cover rounded-lg mt-2 border"
//                         />
//                     </div>
//                 </div>
//             )}

//             {/* Список продуктів */}
//             <h2 className="text-xl font-semibold mt-6 mb-4">Список продуктів</h2>
//             {products?.length > 0 ? (
//                 <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//                     {products.map((product: any) => (
//                         <div
//                             key={product.id}
//                             className="p-4 border rounded-lg shadow-md bg-white hover:shadow-lg transition-shadow"
//                         >
//                             <h3 className="text-lg font-bold mb-2">{product.name}</h3>
//                             <div className="mb-2">
//                                 <span className="font-semibold">Ціна:</span> {product.price} грн
//                             </div>
//                             <img
//                                 src={product.images.length > 0 ? `${API_URL}/images/300_${product.images[0]}` : "/path-to-placeholder-image.jpg"}
//                                 alt={product.name}
//                                 className="h-24 w-24 object-cover rounded-lg border mb-4"
//                             />
//                         </div>
//                     ))}
//                 </div>
//             ) : (
//                 <p className="text-gray-600">Немає продуктів у цій підкатегорії.</p>
//             )}
//         </div>
//     );
// };

// export default SubCategoryViewPage;
// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { API_URL } from "../../../../env/index.ts";
// import Loader from "../../../common/Loader/index.tsx";
// import { useGetProductsBySubCategoryIdQuery } from "../../../../services/productApi.ts";
// import { useGetSubCategoryQuery } from "../../../../services/subcategoryApi.ts";
// import axios from "axios";

// const SubCategoryViewPage = () => {
//     const { id } = useParams(); // Отримуємо ID підкатегорії з URL
//     const [subCategory, setSubCategory] = useState<any>(null);
//     const [products, setProducts] = useState<any[]>([]);
//     const [categoryName, setCategoryName] = useState<string>("");

//     const { data: subCategoryData, isLoading: subCategoryLoading } = useGetSubCategoryQuery(Number(id));
//     const { data: productData, isLoading: productLoading, error: productError } = useGetProductsBySubCategoryIdQuery(Number(id));
    
//     useEffect(() => {
//         if (subCategoryData) {
//             console.log("SubCategory Data:", subCategoryData);
//             setSubCategory(subCategoryData);

//             // Додатковий запит для отримання назви категорії
//             axios.get(`${API_URL}/api/Category/${subCategoryData.categoryId}`)
//                 .then((response) => {
//                     setCategoryName(response.data.name);
//                 })
//                 .catch((error) => {
//                     console.error("Помилка завантаження категорії:", error);
//                     setCategoryName("Категорія не знайдена");
//                 });
//         }
//         if (productData) {
//             setProducts(productData);
//         } else if (productError) {
//             // Ensure productError is of the correct type
//             if ('status' in productError && productError.status === 404) {
//                 setProducts([]); // Якщо помилка 404, встановлюємо порожній список продуктів
//             } else {
//                 console.error('Помилка продуктів:', productError);
//             }
//         }
//     }, [subCategoryData, productData, productError]);

//     if (subCategoryLoading || productLoading) return <Loader loading={true} size={150} color="#1f2937" />;

//     return (
//         <div className="p-6">
//             {/* Основна картка підкатегорії */}
//             {subCategory && (
//                 <div className="mb-6 p-6 border rounded-lg shadow-md bg-white">
//                     <h1 className="text-2xl font-bold mb-4">Інформація про підкатегорію</h1>
//                     <div className="mb-4">
//                         <span className="font-semibold">Назва:</span> {subCategory.name}
//                     </div>
//                     <div className="mb-4">
//                         <span className="font-semibold">Категорія:</span> {categoryName}
//                     </div>
//                     <div className="mb-4">
//                         <span className="font-semibold">Зображення:</span>
//                         <img
//                             src={`${API_URL}/images/300_${subCategory.imageSubCategory}`}
//                             alt={subCategory.name}
//                             className="h-40 w-40 object-cover rounded-lg mt-2 border"
//                         />
//                     </div>
//                 </div>
//             )}

//             {/* Список продуктів */}
//             <h2 className="text-xl font-semibold mt-6 mb-4">Список продуктів</h2>
//             {products?.length > 0 ? (
//                 <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//                     {products.map((product: any) => (
//                         <div
//                             key={product.id}
//                             className="p-4 border rounded-lg shadow-md bg-white hover:shadow-lg transition-shadow"
//                         >
//                             <h3 className="text-lg font-bold mb-2">{product.name}</h3>
//                             <div className="mb-2">
//                                 <span className="font-semibold">Ціна:</span> {product.price} грн
//                             </div>
//                             <img
//                                 src={product.images.length > 0 ? `${API_URL}/images/300_${product.images[0]}` : "/path-to-placeholder-image.jpg"}
//                                 alt={product.name}
//                                 className="h-24 w-24 object-cover rounded-lg border mb-4"
//                             />
//                         </div>
//                     ))}
//                 </div>
//             ) : (
//                 <p className="text-gray-600">Немає продуктів у цій підкатегорії.</p>
//             )}
//         </div>
//     );
// };

// export default SubCategoryViewPage;
