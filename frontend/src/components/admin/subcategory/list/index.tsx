import { Link } from "react-router-dom"; 
import { API_URL } from "../../../../env/index.ts";
import Loader from "../../../common/Loader/index.tsx";
import { useGetSubCategoriesQuery, useDeleteSubCategoryMutation } from "../../../../services/subcategoryApi.ts";
import { useEffect, useState } from "react";
import axios from "axios";

const SubCategoryListPage = () => {
    const { data: list, isLoading, refetch } = useGetSubCategoriesQuery();
    const [deleteSubCategory] = useDeleteSubCategoryMutation();
    const [categories, setCategories] = useState<{ id: number; name: string }[]>([]);
        
    const handleDelete = async (id: number) => {
        if (confirm("Ви впевнені, що хочете видалити цю підкатегорію?")) {
            try {
                await deleteSubCategory(id).unwrap();
                alert("Підкатегорію успішно видалено");
                refetch(); // Оновлення списку підкатегорій
            } catch (error) {
                console.error("Помилка при видаленні підкатегорії:", error);
                alert("Помилка при видаленні підкатегорії");
            }
        }
    };

    useEffect(() => {
        axios.get(`${API_URL}/api/Category`)
            .then((response) => {
                setCategories(response.data);
            })
            .catch((error) => {
                console.error("Помилка завантаження категорій:", error);
            });
    }, []);
    
    if (isLoading) return <Loader loading={isLoading} size={150} color={"#1f2937"} />;

    return (
        <>
            <h1 className="text-2xl font-bold mb-4">Список підкатегорій</h1>
            <table className="table-auto w-full bg-white shadow-md rounded-lg">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="p-2 border">#</th>
                        <th className="p-2 border">Зображення</th>
                        <th className="p-2 border">Назва</th>
                        <th className="p-2 border">Категорія</th>
                        <th className="p-2 border">Дії</th>
                    </tr>
                </thead>
                <tbody>
                    {list?.map((subcategory, index) => (
                        <tr key={subcategory.id} className="hover:bg-gray-100">
                            <td className="p-2 border text-center">{index + 1}</td>
                            <td className="p-2 border text-center">
                                <img
                                    src={`${API_URL}/images/300_${subcategory.imageSubCategory}`}
                                    alt={subcategory.name}
                                    className="h-16 w-16 object-cover rounded"
                                />
                            </td>
                            <td className="p-2 border">{subcategory.name}</td>
                            <td className="p-2 border">
                                {categories.find(category => category.id === subcategory.categoryId)?.name || "Категорія не знайдена"}
                            </td>
                            <td className="p-2 border text-center space-x-2">
                                <Link
                                    to={`/admin/subcategories/view/${subcategory.slug}`} // ✅ Використовуємо slug
                                    className="text-blue-600 hover:text-blue-800"
                                >
                                    Переглянути
                                </Link>
                                <Link
                                    to={`/admin/subcategories/edit/${subcategory.slug}`} // ✅ Використовуємо slug
                                    className="text-yellow-600 hover:text-yellow-800"
                                >
                                    Редагувати
                                </Link>
                                <button
                                    onClick={() => handleDelete(subcategory.id)}
                                    className="text-red-600 hover:text-red-800"
                                >
                                    Видалити
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
};

export default SubCategoryListPage;
// import { Link } from "react-router-dom";
// import { API_URL } from "../../../../env/index.ts";
// import Loader from "../../../common/Loader/index.tsx";
// import { useGetSubCategoriesQuery, useDeleteSubCategoryMutation } from "../../../../services/subcategoryApi.ts";
// import { useEffect, useState } from "react";
// import axios from "axios";

// const SubCategoryListPage = () => {
//     const { data: list, isLoading, refetch } = useGetSubCategoriesQuery();
//     const [deleteSubCategory] = useDeleteSubCategoryMutation();
//     const [categories, setCategories] = useState<{ id: number; name: string }[]>([]);
        
//     const handleDelete = async (id: number) => {
//         if (confirm("Ви впевнені, що хочете видалити цю підкатегорію?")) {
//             try {
//                 await deleteSubCategory(id).unwrap();
//                 alert("Підкатегорію успішно видалено");
//                 refetch(); // Оновлення списку підкатегорій
//             } catch (error) {
//                 console.error("Помилка при видаленні підкатегорії:", error);
//                 alert("Помилка при видаленні підкатегорії");
//             }
//         }
//     };

//     useEffect(() => {
//         axios.get("http://localhost:5126/api/Category")
//             .then((response) => {
//                 setCategories(response.data); // Припускаємо, що список категорій містить поле `id` і `name`
//             })
//             .catch((error) => {
//                 console.error("Помилка завантаження категорій:", error);
//             });
//     }, []);
    
//     if (isLoading) return <Loader loading={isLoading} size={150} color={"#1f2937"} />;
//     console.log(list);
//     return (
//         <>
//             <h1 className="text-2xl font-bold mb-4">Список підкатегорій</h1>
//             <table className="table-auto w-full bg-white shadow-md rounded-lg">
//                 <thead>
//                     <tr className="bg-gray-200">
//                         <th className="p-2 border">#</th>
//                         <th className="p-2 border">Зображення</th>
//                         <th className="p-2 border">Назва</th>
//                         <th className="p-2 border">Категорія</th>
//                         <th className="p-2 border">Дії</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {list?.map((subcategory, index) => (
//                         <tr key={subcategory.id} className="hover:bg-gray-100">
//                             <td className="p-2 border text-center">{index + 1}</td>
//                             <td className="p-2 border text-center">
//                                 <img
//                                     src={`${API_URL}/images/300_${subcategory.imageSubCategory}`}
//                                     alt={subcategory.name}
//                                     className="h-16 w-16 object-cover rounded"
//                                 />
//                             </td>
//                             <td className="p-2 border">{subcategory.name}</td>
//                             <td className="p-2 border">{categories.find(category => category.id === subcategory.categoryId)?.name || "Категорія не знайдена"}</td>
//                             <td className="p-2 border text-center space-x-2">
//                                 <Link
//                                     to={`/admin/subcategories/view/${subcategory.id}`}
//                                     className="text-blue-600 hover:text-blue-800"
//                                 >
//                                     Переглянути
//                                 </Link>
//                                 <Link
//                                     to={`/admin/subcategories/edit/${subcategory.id}`}
//                                     className="text-yellow-600 hover:text-yellow-800"
//                                 >
//                                     Редагувати
//                                 </Link>
//                                 <button
//                                     onClick={() => handleDelete(subcategory.id)}
//                                     className="text-red-600 hover:text-red-800"
//                                 >
//                                     Видалити
//                                 </button>
//                             </td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//         </>
//     );
// };

// export default SubCategoryListPage;
