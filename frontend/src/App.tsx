import { Route, Routes } from "react-router-dom";
import CategoryCreatePage from "./components/admin/category/create/index.tsx";
import CategoryEditPage from "./components/admin/category/edit/index.tsx";
import AdminLayout from "./components/admin/containers/adminLayout.tsx";
import CategoriesListPage from "./components/admin/category/list/index.tsx";
import SubCategoryCreatePage from "./components/admin/subcategory/create/index.tsx";
import SubCategoryEditPage from "./components/admin/subcategory/edit/index.tsx";
import SubCategoryListPage from "./components/admin/subcategory/list/index.tsx";
import ProductListPage from "./components/admin/products/list/index.tsx";
import ProductCreatePage from "./components/admin/products/create/index.tsx";
import ProductEditPage from "./components/admin/products/edit/index.tsx";
import CategoryViewPage from "./components/admin/category/details/index.tsx";
import ClientLayout from "./components/client/layout/ClientLayout.tsx";
import HomePage from "./components/client/home/HomePage.tsx";
import SubCategoryViewPage from "./components/admin/subcategory/details/index.tsx";
import ProductViewPage from "./components/admin/products/details/index.tsx";
import UsersList from "./components/admin/users/UsersList.tsx";
import AdminsList from "./components/admin/users/AdminsList.tsx";
import LoginPage from "./components/client/auth/LoginPage.tsx";
import RegisterPage from "./components/client/auth/RegisterPage.tsx";
import ProfilePage from "./components/client/profile/ProfilePage.tsx";
import AboutPage from "./components/client/layout/AboutPage.tsx";
import ContactsPage from "./components/client/layout/ContactsPage";
import PricingPolicyPage from "./components/client/layout/PricingPolicyPage.tsx";
import CategoryPage from "./components/client/layout/CategoryPage.tsx";
import ProductsPage from "./components/client/layout/ProductsPage.tsx";
import ProfileEditPage from "./components/client/profile/ProfileEditPage.tsx";
import CartPage from "./components/client/cart/CartPage.tsx";
import SearchResultsPage from "./components/client/products/SearchResultsPage.tsx";
import CheckoutPage from "./components/client/orders/CheckoutPage.tsx";
import ProductPage from "./components/client/layout/ProductPage";
import PrivateRoute from "./components/admin/PrivateRoute.tsx";
import AdminOrders from "./components/admin/orders/index.tsx";
import WishListPage from "./components/client/wishlist/index.tsx";
// import CategoryLayout from "./components/client/layout/CategoryLayout.tsx";


export default function App() {
    return (
        <>
            <Routes>
                {/* Маршрути адміністратора */}
                <Route path="/admin" element={<PrivateRoute />}>
                    <Route path="/admin" element={<AdminLayout />}>
                        <Route index element={<h1>Головна сторінка адміністратора</h1>} />

                        {/* Категорії */}
                        <Route path="categories" element={<CategoriesListPage />} />
                        <Route path="categories/create" element={<CategoryCreatePage />} />
                        <Route path="categories/edit/:id" element={<CategoryEditPage />} />
                        <Route path="categories/view/:id" element={<CategoryViewPage />} />

                        {/* Підкатегорії */}
                        <Route path="subcategories" element={<SubCategoryListPage />} />
                        <Route path="subcategories/create" element={<SubCategoryCreatePage />} />
                        <Route path="subcategories/edit/:id" element={<SubCategoryEditPage />} />
                        <Route path="subcategories/view/:id" element={<SubCategoryViewPage />} />

                        {/* PRODUCTS */}
                        <Route path={"products"}>
                            <Route index element={<ProductListPage />} />
                            <Route path="create" element={<ProductCreatePage />} />
                            <Route path="edit/:id" element={<ProductEditPage />} />
                            <Route path="/admin/products/view/:id" element={<ProductViewPage />} />
                        </Route>

                        {/* USERS */}
                        <Route path="users" element={<UsersList />} />
                        <Route path="admins" element={<AdminsList />} />

                        {/* ORDERS */}
                        <Route path="orders" element={<AdminOrders />} />
                    </Route>
                </Route>

                {/* Layout для клієнтів */}
                <Route path="/" element={<ClientLayout />}>
                    <Route index element={<HomePage />} />
                    {/* <Route path="/category/:id" element={<CategoryPage />} />
                    <Route path="/subcategory/:id/products" element={<ProductsPage />} /> */}
                    <Route path="login" element={<LoginPage />} />
                    <Route path="register" element={<RegisterPage />} />
                    <Route path="profile" element={<ProfilePage />} />
                    <Route path="profile/edit" element={<ProfileEditPage />} />
                    <Route path="/cart" element={<CartPage />} />
                    <Route path="/products/search" element={<SearchResultsPage />} />
                    <Route path="/checkout" element={<CheckoutPage />} />
                    <Route path="about" element={<AboutPage />} />
                    <Route path="contact" element={<ContactsPage />} />
                    <Route path="pricing-policy" element={<PricingPolicyPage />} />
                    {/* <Route path="/product/:id" element={<ProductPage />}/> */}
                    {/* <Route path="/subcategory/:id/products" element={<CategoryPage />} /> */}
                    <Route path="/wishlist" element={<WishListPage />} />
                    <Route path="/category/:slug" element={<CategoryPage />} />
                    <Route path="/subcategory/products/:subslug" element={<ProductsPage />} />
                    <Route path="/product/:slug" element={<ProductPage />} />
                </Route>
                {/* Сторінка 404 */}
                <Route path="*" element={<h1>Сторінка не знайдена</h1>} />
            </Routes>
        </>
    )
}