import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  const isAuthenticated = localStorage.getItem("accessToken");
  const isAdmin = JSON.parse(localStorage.getItem("isAdmin") || "false");

  if (!isAuthenticated) {
    // Якщо користувач не авторизований, перенаправляємо на сторінку входу
    return <Navigate to="/login" />;
  }

  if (!isAdmin) {
    // Якщо користувач авторизований, але не є адміністратором, перенаправляємо на головну сторінку
    return <Navigate to="/" />;
  }

  // Якщо користувач авторизований та є адміністратором, відображаємо дочірні маршрути
  return <Outlet />;
};

export default PrivateRoute;
