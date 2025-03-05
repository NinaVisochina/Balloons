import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../../../env/index.ts";
import { User } from "../../../interfaces/users/index.ts";
import { authFetch } from "../../../interfaces/users/authFetch.ts";

const ProfileEditPage = () => {
  const [user, setUser] = useState<User | null>(null);
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    phoneNumber: "",
    email: "",
    birthdate: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        //const token = localStorage.getItem("token");
        const response = await authFetch(`${API_URL}/api/Accounts/profile`, {
          method: "GET",
        }, () => navigate("/login")); // Перенаправлення при помилці токена
        if (response.ok) {
          const data = await response.json();
          setUser(data);
          setFormData({
            firstname: data.firstname || "",
            lastname: data.lastname || "",
            phoneNumber: data.phoneNumber || "",
            email: data.email || "",
            birthdate: data.birthdate || "",
          });
        } else {
          console.error("Failed to fetch user data");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchUserData();
  }, [navigate]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await authFetch(`${API_URL}/api/Accounts/profile`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      }, () => navigate("/login"));

      if (response.ok) {
        alert("Профіль успішно оновлено!");
        navigate("/profile");
      } else {
        console.error("Failed to update profile");
        alert("Сталася помилка при оновленні профілю.");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Сталася помилка при оновленні профілю.");
    }
  };

  if (!user) {
    return <p>Завантаження...</p>;
  }

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow-md rounded-md">
      <h1 className="text-2xl font-bold mb-6">Редагування профілю</h1>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="firstname" className="block text-sm font-medium">
              Ім'я
            </label>
            <input
              type="text"
              id="firstname"
              name="firstname"
              value={formData.firstname}
              onChange={handleInputChange}
              className="w-full mt-1 p-2 border rounded-md"
            />
          </div>
          <div>
            <label htmlFor="lastname" className="block text-sm font-medium">
              Прізвище
            </label>
            <input
              type="text"
              id="lastname"
              name="lastname"
              value={formData.lastname}
              onChange={handleInputChange}
              className="w-full mt-1 p-2 border rounded-md"
            />
          </div>
          <div>
            <label htmlFor="phoneNumber" className="block text-sm font-medium">
              Телефон
            </label>
            <input
              type="text"
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              className="w-full mt-1 p-2 border rounded-md"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full mt-1 p-2 border rounded-md"
            />
          </div>
          <div>
            <label htmlFor="birthdate" className="block text-sm font-medium">
              Дата народження
            </label>
            <input
              type="date"
              id="birthdate"
              name="birthdate"
              value={formData.birthdate}
              onChange={handleInputChange}
              className="w-full mt-1 p-2 border rounded-md"
            />
          </div>
        </div>
        <div className="mt-6 flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => navigate("/profile")}
            className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
          >
            Відмінити
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Зберегти
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProfileEditPage;
