import { Link, useParams } from "react-router-dom";
import { useGetProductByIdQuery, useGetProductBySlugQuery } from "../../../services/productApi";
import { useDispatch } from "react-redux";
import { addToCart } from "../../../interfaces/cart/cartSlice";
import { useState, useEffect } from "react";
import { useGetSubCategoryByIdQuery } from "../../../services/subcategoryApi";
import { API_URL } from "../../../env";

const ProductPage = () => {
  const { slug } = useParams();
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);
  const [productId, setProductId] = useState<number | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Отримуємо ID продукту за його slug
  const { data: productBySlug, isLoading } = useGetProductBySlugQuery(slug!, {
    skip: !slug,
  });

  useEffect(() => {
    if (productBySlug?.id) {
      setProductId(productBySlug.id);
    }
  }, [productBySlug]);

  // Отримуємо продукт по ID, якщо він доступний
  const { data: productById } = useGetProductByIdQuery(productId!, {
    skip: !productId,
  });

  const product = productById || productBySlug;

  // Отримуємо підкатегорію за її ID
  const { data: subCategory } = useGetSubCategoryByIdQuery(product?.subCategoryId ?? 0, {
    skip: !product?.subCategoryId,
  });

  // Визначаємо зображення продукту
  const productImages = product?.images?.length ? product.images : [];

  // Зміна кількості товару
  const handleQuantityChange = (increment: number) => {
    setQuantity((prev) => Math.max(prev + increment, 1));
  };

  // Додаємо товар у кошик
  const handleAddToCart = () => {
    if (product) {
      dispatch(
        addToCart({
          productId: product.id,
          productName: product.name,
          price: product.price,
          quantity,
          images: productImages,
        })
      );
    }
  };

  // Перемикання зображень
  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % productImages.length);
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? productImages.length - 1 : prevIndex - 1
    );
  };

  if (isLoading) return <div>Завантаження...</div>;
  if (!product) return <div>Продукт не знайдено</div>;

  return (
    <div className="container mx-auto py-6">
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
        {productImages.length > 0 ? (
          <div className="relative w-full max-w-lg">
            <button onClick={handlePrevImage} className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-700 text-white px-2 py-1 rounded-md">◀</button>
            <img
              src={`${API_URL}/images/600_${productImages[currentImageIndex]}`}
              alt={product.name}
              className="w-full h-auto max-h-[500px] object-contain rounded-lg"
            />
            <button onClick={handleNextImage} className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-700 text-white px-2 py-1 rounded-md">▶</button>
          </div>
        ) : (
          <div className="w-full h-80 flex items-center justify-center bg-gray-200 text-gray-500">
            Зображення відсутнє
          </div>
        )}

        <div>
          <h1 className="text-2xl font-bold">{product.name}</h1>
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