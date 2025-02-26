import { Link, useParams } from "react-router-dom";  
import { useGetProductBySlugQuery } from "../../../services/productApi"; 
import { API_URL } from "../../../env"; 
import { useDispatch } from "react-redux"; 
import { addToCart } from "../../../interfaces/cart/cartSlice"; 
import { useState, useEffect } from "react"; 
import axios from "axios";
import { useGetSubCategoryByIdQuery } from "../../../services/subcategoryApi";

const ProductPage = () => { 
  const { slug } = useParams(); // Отримуємо slug продукту з URL
  const [productId, setProductId] = useState<number | null>(null); 

  // Отримуємо ID продукту за його slug
  useEffect(() => {
    if (slug) {
      axios.get(`${API_URL}/api/Products/slug/${slug}`)
        .then((response) => {
          setProductId(response.data.id); // Тут усе правильно
        })
        .catch((error) => {
          console.error("Помилка отримання продукту за slug:", error);
          setProductId(null);
        });
    }
  }, [slug]);
  


  const { data: product, isLoading } = useGetProductBySlugQuery(slug!, {
    skip: !slug, // Пропускаємо запит, якщо slug не визначено
  });
  

  const { data: subCategory } = useGetSubCategoryByIdQuery(product?.subCategoryId ?? 0, {
    skip: !product?.subCategoryId, // Пропускаємо, якщо немає підкатегорії
  });
   
   
  const [quantity, setQuantity] = useState(1); 
  const dispatch = useDispatch(); 

  const handleQuantityChange = (increment: number) => { 
    setQuantity((prev) => Math.max(prev + increment, 1)); 
  }; 

  const handleAddToCart = () => { 
    if (product) { 
      dispatch(addToCart({ 
        productId: product.id, 
        productName: product.name, 
        price: product.price, 
        quantity, 
        images: product.images || [], 
      })); 
    } 
  }; 

  if (isLoading) { 
    return <div>Завантаження...</div>; 
  } 

  if (!product) { 
    return <div>Продукт не знайдено</div>; 
  } 

  return ( 
    <div className="container mx-auto py-6"> 
      {/* Хлібні крихти */} 
      <nav className="text-gray-600 mb-4 flex items-center"> 
        <Link to="/" className="hover:text-black text-lg"> 
          <span className="mr-2">🏠</span> 
        </Link> 
        {subCategory?.categoryName && ( 
          <> 
            <span className="mx-2">/</span> 
        <Link to={`/category/${subCategory.categoryId}`} className="hover:underline text-black">
          {subCategory.categoryName}
        </Link>
 
          </> 
        )} 
        {subCategory?.name && ( 
          <> 
            <span className="mx-2">/</span> 
            <Link to={`/subcategory/${subCategory.slug}/products`} className="hover:underline text-black"> 
              {subCategory.name} 
            </Link> 
          </> 
        )} 
        <span className="mx-2">/</span> 
        <span className="text-black">{product.name}</span> 
      </nav> 

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6"> 
        {product.images?.length > 0 ? ( 
          <img 
            src={`${API_URL}/images/300_${product.images[0]}`}  
            alt={product.name} 
            className="w-full h-auto max-h-[500px] object-contain rounded-lg" 
          /> 
        ) : ( 
          <div className="w-full h-80 flex items-center justify-center bg-gray-200 text-gray-500"> 
            Зображення відсутнє 
          </div> 
        )} 

        <div> 
          <h1 className="text-2xl font-bold">{product.name}</h1> 
          <p><strong>ID Продукту:</strong> {productId ?? "Не визначено"}</p>
          <p><strong>Виробник:</strong> {product.manufacturer}</p> 
          <p><strong>Модель:</strong> {product.modeles}</p> 
          <p><strong>Код:</strong> {product.code}</p> 
          <p><strong>Ціна:</strong> {product.price} грн</p> 

          <div className="flex items-center mt-4"> 
            <span className="mr-2">Кількість:</span> 
            <button onClick={() => handleQuantityChange(-1)} className="bg-gray-600 px-3 py-1 rounded-md">-</button> 
            <span className="mx-2">{quantity}</span> 
            <button onClick={() => handleQuantityChange(1)} className="bg-gray-600 px-3 py-1 rounded-md">+</button> 
          </div> 

          <button 
            onClick={handleAddToCart} 
            className="mt-4 bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800" 
          > 
            Купити 
          </button> 
        </div> 
      </div> 
    </div> 
  ); 
}; 

export default ProductPage;
// import { Link, useParams } from "react-router-dom"; 
// import { useGetProductByIdQuery } from "../../../services/productApi";
// import { useGetSubCategoryQuery } from "../../../services/subcategoryApi";
// import { API_URL } from "../../../env";
// import { useDispatch } from "react-redux";
// import { addToCart } from "../../../interfaces/cart/cartSlice";
// import { useState } from "react";

// const ProductPage = () => {
//   const { id } = useParams();
//   const productId = id ? Number(id) : null;

//   // Отримуємо продукт
//   const { data: product, isLoading } = useGetProductByIdQuery(productId!, {
//     skip: productId === null,
//   });

//   // Отримуємо підкатегорію продукту
//  const { data: subCategory } = useGetSubCategoryQuery(product?.subCategoryId ?? 0, {
//     skip: !product?.subCategoryId,
//   });
  
//   const [quantity, setQuantity] = useState(1);
//   const dispatch = useDispatch();

//   const handleQuantityChange = (increment: number) => {
//     setQuantity((prev) => Math.max(prev + increment, 1));
//   };

//   const handleAddToCart = () => {
//     if (product) {
//       dispatch(addToCart({
//         productId: product.id,
//         productName: product.name,
//         price: product.price,
//         quantity,
//         images: product.images || [],
//       }));
//     }
//   };

//   if (isLoading) {
//     return <div>Завантаження...</div>;
//   }

//   if (!product) {
//     return <div>Продукт не знайдено</div>;
//   }

//   return (
//     <div className="container mx-auto py-6">
//       {/* Хлібні крихти */}
//       <nav className="text-gray-600 mb-4 flex items-center">
//         <Link to="/" className="hover:text-black text-lg">
//           <span className="mr-2">🏠</span>
//         </Link>
//         {subCategory?.categoryName && (
//           <>
//             <span className="mx-2">/</span>
//             <Link to={`/category/${subCategory.categoryId}`} className="hover:underline text-black">
//               {subCategory.categoryName}
//             </Link>
//           </>
//         )}
//         {subCategory?.name && (
//           <>
//             <span className="mx-2">/</span>
//             <Link to={`/subcategory/${subCategory.id}/products`} className="hover:underline text-black">
//               {subCategory.name}
//             </Link>
//           </>
//         )}
//         <span className="mx-2">/</span>
//         <span className="text-black">{product.name}</span>
//       </nav>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         {product.images?.length > 0 ? (
//           <img
//             src={`${API_URL}/images/300_${product.images[0]}`} 
//             alt={product.name}
//             className="w-full h-auto max-h-[500px] object-contain rounded-lg"
//           />
//         ) : (
//           <div className="w-full h-80 flex items-center justify-center bg-gray-200 text-gray-500">
//             Зображення відсутнє
//           </div>
//         )}

//         <div>
//           <h1 className="text-2xl font-bold">{product.name}</h1>
//           <p><strong>Виробник:</strong> {product.manufacturer}</p>
//           <p><strong>Модель:</strong> {product.modeles}</p>
//           <p><strong>Код:</strong> {product.code}</p>
//           <p><strong>Ціна:</strong> {product.price} грн</p>

//           <div className="flex items-center mt-4">
//             <span className="mr-2">Кількість:</span>
//             <button onClick={() => handleQuantityChange(-1)} className="bg-gray-600 px-3 py-1 rounded-md">-</button>
//             <span className="mx-2">{quantity}</span>
//             <button onClick={() => handleQuantityChange(1)} className="bg-gray-600 px-3 py-1 rounded-md">+</button>
//           </div>

//           <button
//             onClick={handleAddToCart}
//             className="mt-4 bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800"
//           >
//             Купити
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductPage;
// import { useParams } from "react-router-dom";
// import { useGetProductByIdQuery } from "../../../services/productApi";
// import { API_URL } from "../../../env";
// import { useDispatch } from "react-redux";
// import { addToCart } from "../../../interfaces/cart/cartSlice";
// import { useState } from "react";

// const ProductPage = () => {
//   const { id } = useParams();
//   const productId = id ? Number(id) : null;
//   const { data: product, isLoading } = useGetProductByIdQuery(productId!, {
//     skip: productId === null,
//   });
//   const [quantity, setQuantity] = useState(1);
//   const dispatch = useDispatch();

//   const handleQuantityChange = (increment: number) => {
//     setQuantity((prev) => Math.max(prev + increment, 1));
//   };
  

//   const handleAddToCart = () => {
//     if (product) {
//       dispatch(addToCart({
//         productId: product.id,
//         productName: product.name,
//         price: product.price,
//         quantity,
//         images: product.images || [],
//       }));
//     }
//   };

//   if (isLoading) {
//     return <div>Завантаження...</div>;
//   }

//   if (!product) {
//     return <div>Продукт не знайдено</div>;
//   }

//   return (
//     <div className="container mx-auto py-6">
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         {product.images?.length > 0 ? (
//   <img
//     src={`${API_URL}/images/300_${product.images[0]}`} 
//     alt={product.name}
//     className="w-full h-auto max-h-[500px] object-contain rounded-lg"
//   />
// ) : (
//   <div className="w-full h-80 flex items-center justify-center bg-gray-200 text-gray-500">
//     Зображення відсутнє
//   </div>
// )}

//         <div>
//           <h1 className="text-2xl font-bold">{product.name}</h1>
//           <p><strong>Виробник:</strong> {product.manufacturer}</p>
//           <p><strong>Модель:</strong> {product.modeles}</p>
//           <p><strong>Код:</strong> {product.code}</p>
//           <p><strong>Ціна:</strong> {product.price} грн</p>

//           <div className="flex items-center mt-4">
//             <span className="mr-2">Кількість:</span>
//             <button onClick={() => handleQuantityChange(-1)} className="bg-gray-600 px-3 py-1 rounded-md">-</button>
//             <span className="mx-2">{quantity}</span>
//             <button onClick={() => handleQuantityChange(1)} className="bg-gray-600 px-3 py-1 rounded-md">+</button>
//           </div>

//           <button
//             onClick={handleAddToCart}
//             className="mt-4 bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800"
//           >
//             Купити
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductPage;
