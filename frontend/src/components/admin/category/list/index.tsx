import { Link } from "react-router-dom";
import { API_URL } from "../../../../env/index.ts";
import Loader from "../../../common/Loader/index.tsx";
import { useGetCategoriesQuery, useDeleteCategoryMutation } from "../../../../services/categoryApi.ts";

const CategoriesListPage = () => {
    const { data: list, /*error,*/ isLoading, refetch } = useGetCategoriesQuery();
    const [deleteCategory] = useDeleteCategoryMutation();

    const handleDelete = async (id: number) => {
        if (confirm("Ви впевнені, що хочете видалити цю категорію?")) {
            try {
                await deleteCategory(id).unwrap();
                alert("Категорію успішно видалено");
                refetch(); // Оновлення списку категорій
            } catch (error) {
                console.error("Помилка при видаленні категорії:", error);
                alert("Помилка при видаленні категорії");
            }
        }
    };

    if (isLoading) return <Loader loading={isLoading} size={150} color={"#1f2937"} />;

    return (
        <>
            <h1 className="text-2xl font-bold mb-4">Список категорій</h1>
            <table className="table-auto w-full bg-white shadow-md rounded-lg">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="p-2 border">#</th>
                        <th className="p-2 border">Зображення</th>
                        <th className="p-2 border">Назва</th>
                        <th className="p-2 border">Опис</th>
                        <th className="p-2 border">Дії</th>
                    </tr>
                </thead>
                <tbody>
                    {list?.map((category, index) => (
                        <tr key={category.id} className="hover:bg-gray-100">
                            <td className="p-2 border text-center">{index + 1}</td>
                            <td className="p-2 border text-center">
                                <img
                                    src={`${API_URL}/images/300_${category.imageCategory}`}
                                    alt={category.name}
                                    className="h-16 w-16 object-cover rounded"
                                />
                            </td>
                            <td className="p-2 border">{category.name}</td>
                            <td className="p-2 border">{category.description}</td>
                            <td className="p-2 border text-center space-x-2">
                                {/* <Link
                                    to={`/admin/categories/view/${category.id}`}
                                    className="text-blue-600 hover:text-blue-800"
                                >
                                    Переглянути
                                </Link>
                                <Link
                                    to={`/admin/categories/edit/${category.id}`}
                                    className="text-yellow-600 hover:text-yellow-800"
                                >
                                    Редагувати
                                </Link> */}
                                <Link to={`/admin/categories/view/${category.slug}`} className="text-blue-600 hover:text-blue-800">
                                    Переглянути
                                </Link>
                                <Link to={`/admin/categories/edit/${category.slug}`} className="text-yellow-600 hover:text-yellow-800">
                                    Редагувати
                                </Link>
                                <button
                                    onClick={() => handleDelete(category.id)}
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
}

export default CategoriesListPage;// import {Link} from "react-router-dom";
// import { API_URL} from "../../../../env/index.ts";
// import Loader from "../../../common/Loader/index.tsx";
// import { useGetCategoriesQuery, useDeleteCategoryMutation } from "../../../../services/categoryApi.ts";

// const CategoriesListPage = () => {
//     const {data: list, /*error,*/ isLoading,refetch } = useGetCategoriesQuery();
//     const [deleteCategory] = useDeleteCategoryMutation();

//     const handleDelete = async (id: number) => {
//         if (confirm("Ви впевнені, що хочете видалити цю категорію?")) {
//             try {
//                 await deleteCategory(id).unwrap();
//                 alert("Категорію успішно видалено");
//                 refetch(); // Оновлення списку категорій
//             } catch (error) {
//                 console.error("Помилка при видаленні категорії:", error);
//                 alert("Помилка при видаленні категорії");
//             }
//         }
//     };

//     if (isLoading) return <Loader loading={isLoading} size={150} color={"#1f2937"}/>;

//     return (
//         <>
//             <h1 className="text-2xl font-bold mb-4">Список категорій</h1>
//             <table className="table-auto w-full bg-white shadow-md rounded-lg">
//                 <thead>
//                     <tr className="bg-gray-200">
//                         <th className="p-2 border">#</th>
//                         <th className="p-2 border">Зображення</th>
//                         <th className="p-2 border">Назва</th>
//                         <th className="p-2 border">Опис</th>
//                         <th className="p-2 border">Дії</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {list?.map((category, index) => (
//                         <tr key={category.id} className="hover:bg-gray-100">
//                             <td className="p-2 border text-center">{index + 1}</td>
//                             <td className="p-2 border text-center">
//                                 <img
//                                     src={`${API_URL}/images/300_${category.imageCategory}`}
//                                     alt={category.name}
//                                     className="h-16 w-16 object-cover rounded"
//                                 />
//                             </td>
//                             <td className="p-2 border">{category.name}</td>
//                             <td className="p-2 border">{category.description}</td>
//                             <td className="p-2 border text-center space-x-2">
//                                 <Link
//                                     to={`/admin/categories/view/${category.id}`}
//                                     className="text-blue-600 hover:text-blue-800"
//                                 >
//                                     Переглянути
//                                 </Link>
//                                 <Link
//                                     to={`/admin/categories/edit/${category.id}`}
//                                     className="text-yellow-600 hover:text-yellow-800"
//                                 >
//                                     Редагувати
//                                 </Link>
//                                 <button
//                                     onClick={() => handleDelete(category.id)}
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
// }

// export default CategoriesListPage;