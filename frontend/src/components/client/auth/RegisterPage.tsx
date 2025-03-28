import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../../../env";
import { GoogleOutlined } from "@ant-design/icons";
import { GoogleOAuthProvider } from "@react-oauth/google";
import GoogleLoginButton from "./GoogleLoginButton";

const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      alert("Паролі не співпадають!");
      return;
    }

    try {
      const response = await fetch(`${API_URL}/api/accounts/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        alert("Реєстрація успішна! Тепер увійдіть.");
        navigate("/login");
      } else {
        const error = await response.text();
        alert(`Помилка реєстрації: ${error}`);
      }
    } catch (error) {
      console.error("Register error:", error);
    }
  };
  const onLoginGoogleResult = async (idToken: string) => {
    console.log("Google ID Token", idToken);
    try {
      const response = await fetch(`${API_URL}/api/accounts/login/google`, {  
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(idToken),
      });

      const data = await response.json();
      console.log("Server Response:", data);
      if (response.ok) {
        console.log("Server Response:", data);
        // Зберігаємо дані в localStorage
        localStorage.setItem("accessToken", data.accessToken);
        localStorage.setItem("userId", data.userId);
        localStorage.setItem("isAdmin", JSON.stringify(data.isAdmin));
        navigate("/profile");
      } else {
        throw new Error(data.error || "Login failed");
      }
    } catch (error) {
      console.error("Google login error:", error);
    }
  };

  const CLIENT_ID = '824455261783-k5i4ushr8l5h867jd864krhs8cp30u4l.apps.googleusercontent.com';

  return (
    <GoogleOAuthProvider clientId={CLIENT_ID}>
      <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-md">
        <h2 className="text-2xl font-bold mb-4">Реєстрація</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleRegister();
          }}
        >
          {/* <div className="mb-4">
            <label htmlFor="firstName" className="block text-sm font-medium">
              Ім'я
            </label>
            <input
              type="text"
              id="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
              className="w-full p-2 border rounded-md"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="lastName" className="block text-sm font-medium">
              Прізвище
            </label>
            <input
              type="text"
              id="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
              className="w-full p-2 border rounded-md"
            />
          </div> */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-2 border rounded-md"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium">
              Пароль
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-2 border rounded-md"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="confirmPassword" className="block text-sm font-medium">
              Підтвердження пароля
            </label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="w-full p-2 border rounded-md"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-accent to-pink-500 text-white font-sans py-3 rounded-lg shadow-lg hover:from-accentDark hover:to-pink-600 hover:shadow-xl transition duration-300 text-lg mb-4"
          >
            Зареєструватися
          </button>
          <GoogleLoginButton icon={<GoogleOutlined />} title='Увійти Google' onLogin={onLoginGoogleResult} />
        </form>
      </div>
    </GoogleOAuthProvider>
  );
};

export default RegisterPage;
