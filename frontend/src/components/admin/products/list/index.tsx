import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { API_URL } from "../../../../env";
import { useGetProductsQuery } from "../../../../services/productApi";
import Loader from "../../../common/Loader";
import { FaEdit, FaEye, FaTrash } from "react-icons/fa";

const ProductListPage = () => {
  const [subcategories, setSubCategories] = useState<{ id: number; name: string; slug: string }[]>([]);
  const [selectedSubCategoryId, setSelectedSubCategoryId] = useState<number | null>(null);

  const { data: products, isLoading } = useGetProductsQuery();

  useEffect(() => {
    fetch(`${API_URL}/api/SubCategory`)
      .then((response) => response.json())
      .then((data) => setSubCategories(data))
      .catch((err) => console.error("Помилка завантаження підкатегорій:", err));
  }, []);

  const filteredProducts = selectedSubCategoryId
    ? products?.filter((product) => product.subCategoryId === selectedSubCategoryId)
    : [];

  const handleDelete = async (id: number) => {
    if (window.confirm("Ви впевнені, що хочете видалити цей товар?")) {
      try {
        await fetch(`${API_URL}/api/products/${id}`, { method: "DELETE" });
        window.location.reload();
      } catch (error) {
        console.error("Помилка видалення:", error);
      }
    }
  };

  if (isLoading) return <Loader loading={true} size={150} color={"#1f2937"} />;

  return (
    <>
      <h1 className="text-2xl font-bold mb-4">Список товарів</h1>

      <div className="flex flex-wrap gap-2 mb-4">
        {subcategories.map((sub) => (
          <button
            key={sub.id}
            className={`px-4 py-2 rounded-full border text-sm ${
              selectedSubCategoryId === sub.id
                ? "bg-pink-200 text-black font-semibold"
                : "bg-white text-gray-700 hover:bg-gray-100"
            }`}
            onClick={() => setSelectedSubCategoryId(sub.id)}
          >
            {sub.name}
          </button>
        ))}
      </div>

      {filteredProducts.length === 0 ? (
        <div>Оберіть підкатегорію, щоб переглянути товари.</div>
      ) : (
        <table className="table-auto w-full bg-white shadow-md rounded-lg">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 border">#</th>
              <th className="p-2 border">Зображення</th>
              <th className="p-2 border">Назва</th>
              <th className="p-2 border">Підкатегорія</th>
              <th className="p-2 border">Ціна</th>
              <th className="p-2 border">Кількість на складі</th>
              <th className="p-2 border">Дії</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((product, index) => (
              <tr key={product.id} className="hover:bg-gray-100">
                <td className="p-2 border text-center">{index + 1}</td>
                <td className="p-2 border text-center">
                  {product.images.length > 0 ? (
                    <img
                      src={`${API_URL}/images/300_${product.images[0]}`}
                      alt={product.name}
                      className="h-16 w-16 object-cover rounded"
                    />
                  ) : (
                    <span>Зображення відсутнє</span>
                  )}
                </td>
                <td className="p-2 border">{product.name}</td>
                <td className="p-2 border">
                  {subcategories.find((cat) => cat.id === product.subCategoryId)?.name || "Невідома"}
                </td>
                <td className="p-2 border">{product.price} грн</td>
                <td className="p-2 border">{product.quantityInStock}</td>
                <td className="p-2 border text-center">
                  <div className="flex justify-center space-x-4">
                    <Link to={`/admin/products/view/${product.slug}`} className="text-gray-700 hover:text-gray-900">
                      <FaEye className="text-gray-500 text-lg hover:text-gray-800" />
                    </Link>
                    <Link to={`/admin/products/edit/${product.slug}`} className="text-gray-700 hover:text-gray-900">
                      <FaEdit className="text-gray-500 text-lg hover:text-gray-800" />
                    </Link>
                    <button onClick={() => handleDelete(product.id)} className="text-gray-700 hover:text-gray-900">
                      <FaTrash className="text-gray-500 text-lg hover:text-gray-800" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};

export default ProductListPage;
// import { useEffect, useState } from "react";
// import { Link, useParams } from "react-router-dom";
// import { API_URL } from "../../../../env";
// import { useGetSubCategoryBySlugQuery } from "../../../../services/subcategoryApi";
// import { useGetProductsQuery } from "../../../../services/productApi";
// import Loader from "../../../common/Loader";
// import { FaEdit, FaEye, FaTrash } from "react-icons/fa";

// const ProductListPage = () => {
//     const { subslug } = useParams<{ subslug?: string }>(); // Отримуємо subslug із URL
//   const [subcategories, setSubCategories] = useState<{ id: number; name: string; slug: string }[]>([]);

//   // Завантажуємо всі продукти
//   const { data: products, isLoading: productsLoading } = useGetProductsQuery();

//   // Завантажуємо підкатегорію за subslug, якщо вона є
//   const { data: subCategory, isLoading: subCategoryLoading } = subslug
//     ? useGetSubCategoryBySlugQuery(subslug)
//     : { data: undefined, isLoading: false };

//   // Завантажуємо всі підкатегорії для відображення їх назв
//   useEffect(() => {
//     fetch(`${API_URL}/api/SubCategory`)
//       .then((response) => response.json())
//       .then((data) => setSubCategories(data))
//       .catch((err) => console.error("Помилка завантаження підкатегорій:", err));
//   }, []);

//   // Фільтруємо продукти за subCategoryId, якщо subslug є
//   const filteredProducts = subslug && subCategory && products
//     ? products.filter((product) => product.subCategoryId === subCategory.id)
//     : products;

//   const handleDelete = async (id: number) => {
//     if (window.confirm("Ви впевнені, що хочете видалити цей товар?")) {
//       try {
//         await fetch(`${API_URL}/api/products/${id}`, { method: "DELETE" });
//         // Оновлюємо список локально (тимчасово перезавантажуємо сторінку)
//         window.location.reload();
//       } catch (error) {
//         console.error("Помилка видалення:", error);
//       }
//     }
//   };

//   if (productsLoading || subCategoryLoading) return <Loader loading={true} size={150} color={"#1f2937"} />;
//   if (!filteredProducts || filteredProducts.length === 0) return <div>Список продуктів відсутній.</div>;

//     return (
//         <>
//             <h1 className="text-2xl font-bold mb-4">Список товарів</h1>
//             <table className="table-auto w-full bg-white shadow-md rounded-lg">
//                 <thead>
//                     <tr className="bg-gray-200">
//                         <th className="p-2 border">#</th>
//                         <th className="p-2 border">Зображення</th>
//                         <th className="p-2 border">Назва</th>
//                         <th className="p-2 border">Підкатегорія</th>
//                         <th className="p-2 border">Ціна</th>
//                         <th className="p-2 border">Кількість на складі</th>
//                         <th className="p-2 border">Дії</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {filteredProducts.map((product, index) => (
//                         <tr key={product.id} className="hover:bg-gray-100">
//                             <td className="p-2 border text-center">{index + 1}</td>
//                             <td className="p-2 border text-center">
//                                 {product.images.length > 0 ? (
//                                     <img
//                                         src={`${API_URL}/images/300_${product.images[0]}`}
//                                         alt={product.name}
//                                         className="h-16 w-16 object-cover rounded"
//                                     />
//                                 ) : (
//                                     <span>Зображення відсутнє</span>
//                                 )}
//                             </td>
//                             <td className="p-2 border">{product.name}</td>
//                             <td className="p-2 border">
//                                 {subcategories.find((cat) => cat.id === product.subCategoryId)?.name || "Невідома підкатегорія"}
//                             </td>
//                             <td className="p-2 border">{product.price} грн</td>
//                             <td className="p-2 border">{product.quantityInStock}</td>
//                             <td className="p-2 border text-center">
//                                 <div className="flex justify-center space-x-4">
//                                     <Link
//                                         to={`/admin/products/view/${product.slug}`}
//                                         className="text-gray-700 hover:text-gray-900"
//                                     >
//                                         <FaEye className="text-gray-500 text-lg hover:text-gray-800" />
//                                     </Link>
//                                     <Link
//                                         to={`/admin/products/edit/${product.slug}`}
//                                         className="text-gray-700 hover:text-gray-900"
//                                     >
//                                         <FaEdit className="text-gray-500 text-lg hover:text-gray-800" />
//                                     </Link>
//                                     <button
//                                         onClick={() => handleDelete(product.id)}
//                                         className="text-gray-700 hover:text-gray-900"
//                                     >
//                                         <FaTrash className="text-gray-500 text-lg hover:text-gray-800" />
//                                     </button>
//                                 </div>
//                             </td>

//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//         </>
//     );
// };

// export default ProductListPage;
// import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import { API_URL, http_common } from "../../../../env";
// import { IProductItem } from "../../../../interfaces/products";

// const ProductListPage = () => {
//     const [list, setList] = useState<IProductItem[]>([]);
//     //const { data: products, isLoading, refetch } = useGetProductsQuery();
//     //const [deleteProduct] = useDeleteProductMutation();
//     const [subcategories, setSubCategories] = useState<{ id: number; name: string }[]>([]);

//     const handleDelete = async (id: number) => {
//         if (window.confirm("Ви впевнені, що хочете видалити цей товар?")) {
//             try {
//                 await http_common.delete("/api/products/" + id);
//                 setList(list.filter(item => item.id !== id));
//             } catch {
//                 //toast
//             }
//         }
//     };
//     useEffect(() => {
//         http_common.get<IProductItem[]>("/api/Products")
//             .then(resp => {
//                 setList(resp.data);
//             });
//     }, []);
//     useEffect(() => {
//         // Завантаження підкатегорій для відображення
//         fetch(`${API_URL}/api/SubCategory`)
//             .then((response) => response.json())
//             .then((data) => setSubCategories(data))
//             .catch((err) => console.error("Помилка завантаження підкатегорій:", err));
//     }, []);

//     //if (isLoading) return <Loader loading={isLoading} size={150} color={"#1f2937"} />;
//     //if (!products) return <div>Список продуктів відсутній.</div>;

//     return (
//         <>
//             <h1 className="text-2xl font-bold mb-4">Список товарів</h1>
//             <table className="table-auto w-full bg-white shadow-md rounded-lg">
//                 <thead>
//                     <tr className="bg-gray-200">
//                         <th className="p-2 border">#</th>
//                         <th className="p-2 border">Зображення</th>
//                         <th className="p-2 border">Назва</th>
//                         <th className="p-2 border">Підкатегорія</th>
//                         <th className="p-2 border">Ціна</th>
//                         <th className="p-2 border">Кількість на складі</th>
//                         <th className="p-2 border">Дії</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {list.map((product, index) => (
//                         <tr key={product.id} className="hover:bg-gray-100">
//                             <td className="p-2 border text-center">{index + 1}</td>
//                             <td className="p-2 border text-center">
//                                 {product.images.length > 0 ? (
//                                     <img
//                                         src={`${API_URL}/images/300_${product.images[0]}`}
//                                         alt={product.name}
//                                         className="h-16 w-16 object-cover rounded"
//                                     />
//                                 ) : (
//                                     <span>Зображення відсутнє</span>
//                                 )}
//                             </td>
//                             <td className="p-2 border">{product.name}</td>
//                             <td className="p-2 border">
//                                 {subcategories.find((cat) => cat.id === product.subCategoryId)?.name || "Невідома підкатегорія"}
//                             </td>
//                             <td className="p-2 border">{product.price} грн</td>
//                             <td className="p-2 border">{product.quantityInStock}</td>
//                             <td className="p-2 border text-center space-x-2">
//                                 <Link
//                                     to={`/admin/products/view/${product.id}`}
//                                     className="text-blue-600 hover:text-blue-800"
//                                 >
//                                     Переглянути
//                                 </Link>
//                                 <Link
//                                     to={`/admin/products/edit/${product.id}`}
//                                     className="text-yellow-600 hover:text-yellow-800"
//                                 >
//                                     Редагувати
//                                 </Link>
//                                 <button
//                                     onClick={() => handleDelete(product.id)}
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

// export default ProductListPage;
