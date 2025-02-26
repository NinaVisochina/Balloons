import { useParams } from "react-router-dom";
import { API_URL } from "../../../../env/index.ts";
import Loader from "../../../common/Loader/index.tsx";
import { useGetProductBySlugQuery } from "../../../../services/productApi.ts";

const ProductViewPage = () => {
    const { slug } = useParams<{ slug: string }>(); // Отримуємо `slug` з URL
    const { data: product, isLoading, error } = useGetProductBySlugQuery(slug!); // Запитуємо продукт по `slug`

    if (isLoading) return <Loader loading={true} size={150} color="#1f2937" />;
    if (error || !product) return <div>Помилка завантаження продукту або продукт не знайдений.</div>;

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Інформація про товар</h1>
            <div className="mb-6 p-6 border rounded-lg shadow-md bg-white">
                <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
                <div className="mb-4">
                    <span className="font-semibold">Ціна:</span> {product.price} грн
                </div>
                <div className="mb-4">
                    <span className="font-semibold">Опис:</span> {product.description}
                </div>
                <div className="mb-4">
                    <span className="font-semibold">Розмір:</span> {product.size}
                </div>
                <div className="mb-4">
                    <span className="font-semibold">Колір:</span> {product.color}
                </div>
                <div className="mb-4">
                    <span className="font-semibold">Тип:</span> {product.type}
                </div>
                <div className="mb-4">
                    <span className="font-semibold">Кількість на складі:</span> {product.quantityInStock}
                </div>
                <div className="mb-4">
                    <span className="font-semibold">Виробник:</span> {product.manufacturer}
                </div>
                <div className="mb-4">
                    <span className="font-semibold">Зображення:</span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        {product.images.map((image, index) => (
                            <img
                                key={index}
                                src={`${API_URL}/images/300_${image}`}
                                alt={product.name}
                                className="h-40 w-40 object-cover rounded-lg border"
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductViewPage;
// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { API_URL } from "../../../../env/index.ts";
// import Loader from "../../../common/Loader/index.tsx";
// import { useGetProductsQuery } from "../../../../services/productApi.ts";
// import { IProductItem } from "../../../../interfaces/products";

// const ProductViewPage = () => {
//     const { id } = useParams<{ id: string }>(); // Get product ID from the URL
//     const [product, setProduct] = useState<IProductItem | null>(null);

//     const { data, isLoading, error } = useGetProductsQuery();

//     useEffect(() => {
//         if (data) {
//             const foundProduct = data.find((product) => product.id === Number(id));
//             if (foundProduct) {
//                 setProduct(foundProduct);
//             }
//         }
//     }, [data, id]);

//     if (isLoading) return <Loader loading={true} size={150} color="#1f2937" />;
//     if (error || !product) return <div>Помилка завантаження продукту або продукт не знайдений.</div>;

//     return (
//         <div className="p-6">
//             <h1 className="text-2xl font-bold mb-4">Інформація про товар</h1>
//             <div className="mb-6 p-6 border rounded-lg shadow-md bg-white">
//                 <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
//                 <div className="mb-4">
//                     <span className="font-semibold">Ціна:</span> {product.price} грн
//                 </div>
//                 <div className="mb-4">
//                     <span className="font-semibold">Опис:</span> {product.description}
//                 </div>
//                 <div className="mb-4">
//                     <span className="font-semibold">Розмір:</span> {product.size}
//                 </div>
//                 <div className="mb-4">
//                     <span className="font-semibold">Колір:</span> {product.color}
//                 </div>
//                 <div className="mb-4">
//                     <span className="font-semibold">Тип:</span> {product.type}
//                 </div>
//                 <div className="mb-4">
//                     <span className="font-semibold">Кількість на складі:</span> {product.quantityInStock}
//                 </div>
//                 <div className="mb-4">
//                     <span className="font-semibold">Виробник:</span> {product.manufacturer}
//                 </div>
//                 <div className="mb-4">
//                     <span className="font-semibold">Зображення:</span>
//                     <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
//                         {product.images.map((image, index) => (
//                             <img
//                                 key={index}
//                                 src={`${API_URL}/images/300_${image}`}
//                                 alt={product.name}
//                                 className="h-40 w-40 object-cover rounded-lg border"
//                             />
//                         ))}
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default ProductViewPage;
