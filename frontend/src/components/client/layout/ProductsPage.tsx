import { Link, useParams, useLocation } from "react-router-dom";
import { useGetProductsByCategoryIdQuery, useGetProductsBySubCategoryIdQuery } from "../../../services/productApi";
import { useGetSubCategoryBySlugQuery } from "../../../services/subcategoryApi";
import CategorySidebar from "./CategorySidebar";
import ProductFilter from "./ProductFilter"; // Підключаємо компонент фільтра
import { API_URL } from "../../../env";
import { useDispatch } from "react-redux";
import { addToCart, CartItem } from "../../../interfaces/cart/cartSlice";
import { IProductItem, ProductsPageProps } from "../../../interfaces/products";
import { useEffect, useState } from "react";
// import { useGetCategoryQuery, useGetSubCategoriesByCategoryIdQuery } from "../../../services/categoryApi";
import axios from "axios";
import bookmark from '../../../assets/images/bookmark.png';
import bookmarkWhite from '../../../assets/images/bookmark-white.png';
import { useGetCategoryBySlugQuery } from "../../../services/categoryApi";
const ProductsPage: React.FC<ProductsPageProps> = ({ categorySlug, subCategorySlug }) => {
  const { slug, subslug } = useParams<{ slug?: string, subslug?: string }>();
  console.log("Slug", slug);
  console.log("SubSlug", subslug);
  const location = useLocation();

  const { data: category } = useGetCategoryBySlugQuery(slug ?? "", { skip: !slug });
  const { data: subCategory } = useGetSubCategoryBySlugQuery(subslug ?? "", { skip: !subslug });

  const categoryId = category?.id ?? null;
  const subCategoryId = subCategory?.id ?? null;

  const { data: products = [], isLoading } = categoryId
    ? useGetProductsByCategoryIdQuery(categoryId, { skip: !categoryId })
    : useGetProductsBySubCategoryIdQuery(subCategoryId ?? 0, { skip: !subCategoryId });

  // const ProductsPage: React.FC<ProductsPageProps> = ({ categoryId, subCategoryId }) => {
  //   const { id } = useParams();
  //   const subId = subCategoryId || Number(id);
  //   const location = useLocation();

  //   // Отримуємо продукти
  //   const { data: category } = useGetCategoryQuery(categoryId);
  //   const { data: subCategory } = useGetSubCategoryQuery(subId);
  //   const { data: products = [], isLoading } = categoryId
  //     ? useGetProductsByCategoryIdQuery(categoryId)
  //     : useGetProductsBySubCategoryIdQuery(subId);

  // Стан для вибраних фільтрів
  const [selectedManufacturers, setSelectedManufacturers] = useState<string[]>([]);
  const [selectedQuantities, setSelectedQuantities] = useState<number[]>([]);
  const [wishList, setWishList] = useState<number[]>([]);
  const isCategoryPage = location.pathname.includes(`/category/${categorySlug}`);
  const [hoveredProductId, setHoveredProductId] = useState<number | null>(null);
  const [productQuantities, setProductQuantities] = useState<Record<number, number>>({});
  //Фільтрація продуктів за вибраними значеннями
  const filteredProducts = products.filter((product) => {
    const matchesManufacturer =
      selectedManufacturers.length === 0 || selectedManufacturers.includes(product.manufacturer);
    const matchesQuantity =
      selectedQuantities.length === 0 || selectedQuantities.includes(product.quantityInPack);
    return matchesManufacturer && matchesQuantity;
  });
  const dispatch = useDispatch();
  const handleQuantityChange = (productId: number, increment: number) => {
    setProductQuantities(prev => ({
      ...prev,
      [productId]: Math.max((prev[productId] || 1) + increment, 1),
    }));
  };
  // function dispatch(arg0: { payload: CartItem; type: "cart/addToCart"; }) {
  //   throw new Error("Function not implemented.");
  // }
  const handleAddToCart = async (product: IProductItem) => {
    const token = localStorage.getItem("accessToken");
    const userId = localStorage.getItem("userId");
    const quantity = productQuantities[product.id] || 1;

    if (token && userId) {
      try {
        await axios.post(
          `${API_URL}/api/Cart/add`,
          { userId, productId: product.id, quantity },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        dispatch(addToCart({ productId: product.id, productName: product.name, price: product.price, quantity, images: product.images || [] }));
      } catch (error) {
        console.error("Помилка додавання товару в БД", error);
      }
    } else {
      const cartItem: CartItem = { productId: product.id, productName: product.name, price: product.price, quantity, images: product.images || [] };
      dispatch(addToCart(cartItem));

      const cartItems: CartItem[] = JSON.parse(localStorage.getItem("cart") || "[]");
      const existingItem = cartItems.find(item => item.productId === product.id);
      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        cartItems.push(cartItem);
      }
      localStorage.setItem("cart", JSON.stringify(cartItems));
    }
  };

  useEffect(() => {
    const fetchWishList = async () => {
      const userId = localStorage.getItem("userId");
      const token = localStorage.getItem("accessToken");

      if (userId && token) {
        try {
          const response = await axios.get(`${API_URL}/api/WishList/${userId}`, {
            headers: { Authorization: `Bearer ${token}` }
          });
          setWishList(response.data.map((item: any) => item.productId));
        } catch (error) {
          console.error("Помилка отримання вішліста", error);
        }
      }
    };

    fetchWishList();
  }, []);

    const toggleWishList = async (productId: number) => {
      const token = localStorage.getItem("accessToken");
      const userId = localStorage.getItem("userId");

      // Отримуємо товар за productId
      const product = products?.find(p => p.id === productId);

      if (!product) {
        console.error("Продукт не знайдено");
        return;
      }

      // Якщо товар уже в вішлісті, видаляємо його
      if (wishList.includes(productId)) {
        try {
          await axios.delete(`${API_URL}/api/WishList/${productId}`, {
            headers: { Authorization: `Bearer ${token}` }
          });
          setWishList(prev => prev.filter(id => id !== productId));
        } catch (error) {
          console.error("Помилка видалення з вішліста", error);
        }
      } else {
        // Якщо товар не в вішлісті, додаємо його
        if (!token) {
          alert("Авторизуйтесь, щоб додати в обране!");
          return;
        }

        try {
          // Створюємо об'єкт відповідно до API
          const wishListItem = {
            productId: product.id,
            productName: product.name,
            productPrice: product.price,
            productImage: product.images[0] // Додаємо перше зображення товару
          };

          await axios.post(
            `${API_URL}/api/WishList`,
            wishListItem,
            { headers: { Authorization: `Bearer ${token}` } }
          );
          setWishList(prev => [...prev, productId]);
        } catch (error) {
          console.error("Помилка додавання до вішліста", error);
        }
      }
    };


  // if (isLoading || isSubCategoryLoading) {
  //   return <div>Завантаження...</div>;
  // }

  if (!products || products.length === 0) {
    return <div>Продукти не знайдено.</div>;
  }

  return (
    <div className="container mx-auto py-6 flex flex-col">
      {/* Хлібні крихти */}
      <nav className="text-gray-600 mb-4 flex items-center">
        <Link to="/" className="hover:text-black text-lg">
          <span className="mr-2">🏠</span>
        </Link>
        {category?.name && (
          <>
            <span className="mx-2">/</span>
            <Link to={`/category/${categorySlug}`} className="hover:underline text-black">
              {category.name}
            </Link>
          </>
        )}
        {subCategory?.name && (
          <>
            <span className="mx-2">/</span>
            <Link to={`/subcategory/${subCategorySlug}/products`} className="hover:underline text-black">
              {subCategory.name}
            </Link>
          </>
        )}
      </nav>

      {/* Основний контент: Sidebar + Продукти */}
      <div className="flex">
        {/* Відображаємо Sidebar ТІЛЬКИ якщо ми НЕ на CategoryPage */}
        {!isCategoryPage && (
          <div className="w-1/4 flex flex-col gap-4">
            <CategorySidebar onCategoryChange={() => { }} />
            <ProductFilter
              products={products || []}
              selectedManufacturers={selectedManufacturers}
              setSelectedManufacturers={setSelectedManufacturers}
              selectedQuantities={selectedQuantities}
              setSelectedQuantities={setSelectedQuantities}
            />
          </div>
        )}

        {/* Основний контент */}
        <div className="ml-6 flex-1">
          <h1 className="text-2xl font-bold mb-4">{subCategory?.name || "Продукти"}</h1>

          {/* Фільтрація продуктів перед відображенням */}
          {filteredProducts.length > 0 ? (
            <ul className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {filteredProducts.map((product: IProductItem) => (
                <li
                  key={product.id}
                  className="relative bg-white p-4 shadow-md rounded-lg overflow-hidden"
                  onMouseEnter={() => setHoveredProductId(product.id)}
                  onMouseLeave={() => setHoveredProductId(null)}
                >
                  {/* <Link to={`/product/${product.id}`} className="block">
                  <img
                    src={`${API_URL}/images/600_${product.images[0]}`}
                    alt={product.name}
                    className="w-full h-40 object-cover rounded-t-lg"
                  />
                  <h2 className="text-lg font-semibold mt-2">{product.name}</h2>
                </Link> */}
                  <Link to={`/product/${product.slug}`} className="block">
                    <img
                      src={`${API_URL}/images/600_${product.images[0]}`}
                      alt={product.name}
                      className="w-full h-40 object-cover rounded-t-lg"
                    />
                    <h2 className="text-lg font-semibold mt-2">{product.name}</h2>
                  </Link>


                  {/* Сердечко для вішліста */}
                  <button
                    onClick={() => toggleWishList(product.id)}
                    className="absolute top-2 right-2 w-6 h-6"
                  >
                    <img
                      src={wishList.includes(product.id) ? bookmark : bookmarkWhite}
                      alt="bookmark"
                      className="w-full h-full object-contain"
                    />
                  </button>
                  {hoveredProductId === product.id && (
                    <div className="absolute bottom-0 left-0 right-0 bg-gray-800 bg-opacity-80 text-white p-4 transition-all duration-300 ease-in-out">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <button
                            onClick={() => handleQuantityChange(product.id, -1)}
                            className="bg-gray-600 px-2 py-1 rounded-md"
                          >
                            -
                          </button>
                          <span className="mx-2">{productQuantities[product.id] || 1}</span>
                          <button
                            onClick={() => handleQuantityChange(product.id, 1)}
                            className="bg-gray-600 px-2 py-1 rounded-md"
                          >
                            +
                          </button>
                        </div>
                        <button
                          onClick={() => handleAddToCart(product)}
                          className="bg-orange-500 px-4 py-2 rounded-lg hover:bg-orange-600"
                        >
                          Додати в кошик
                        </button>
                      </div>
                    </div>
                  )}

                  <p>Модель: {product.modeles}</p>
                  <p>Код: {product.code}</p>
                  <p>Розмір: {product.size}</p>
                  <p>Кількість в упаковці: {product.quantityInPack}</p>
                  <p className="font-bold mt-2">{product.price} грн</p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 mt-4">Немає продуктів, які відповідають фільтрам.</p>
          )}
        </div>
      </div>
    </div>
  );

};

export default ProductsPage;