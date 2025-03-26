import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../../../env/index.ts";
import { User } from "../../../interfaces/users/index.ts";
import { authFetch } from "../../../interfaces/users/authFetch.ts";
import InputMask from "react-input-mask";
import { toast } from "react-toastify";
import { useForm, Controller } from "react-hook-form";

type FormData = {
  firstname: string;
  lastname: string;
  phoneNumber: string;
  email: string;
  birthdate: string;
};

const ProfileEditPage = () => {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();
  const { register, handleSubmit, setValue, control, formState: { errors } } = useForm<FormData>({
    defaultValues: {
      firstname: "",
      lastname: "",
      phoneNumber: "",
      email: "",
      birthdate: "",
    },
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await authFetch(`${API_URL}/api/Accounts/profile`, {
          method: "GET",
        }, () => navigate("/login"));
        if (response.ok) {
          const data = await response.json();
          console.log("Fetched user data:", data); // Логування
          setUser(data);
          setValue("firstname", data.firstname || "");
          setValue("lastname", data.lastname || "");
          setValue("phoneNumber", data.phoneNumber || "");
          setValue("email", data.email || "");
          setValue("birthdate", data.birthdate ? data.birthdate.split("T")[0] : "");
        } else {
          console.error("Failed to fetch user data");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchUserData();
  }, [navigate, setValue]);

  const onSubmit = async (data: FormData) => {
    try {
      const response = await authFetch(`${API_URL}/api/Accounts/profile`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: data.firstname,
          lastName: data.lastname,
          phoneNumber: data.phoneNumber,
          email: data.email,
          birthdate: data.birthdate,
        }),
      }, () => navigate("/login"));

      if (response.ok) {
        toast.success("Профіль успішно оновлено!");
        navigate("/profile");
      } else {
        const errorData = await response.json();
        console.error("Failed to update profile:", errorData);
        toast.error("Сталася помилка при оновленні профілю: " + (errorData.message || "Невідома помилка"));
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Сталася помилка при оновленні профілю.");
    }
  };

  if (!user) {
    return <p>Завантаження...</p>;
  }

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow-md rounded-md">
      <h1 className="text-2xl font-bold mb-6">Редагування профілю</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <label htmlFor="firstname" className="block text-sm font-medium text-gray-700">
              Ім'я
            </label>
            <input
              type="text"
              id="firstname"
              {...register("firstname", { required: "Ім'я є обов'язковим" })}
              className={`w-full mt-1 p-2 border rounded-md focus:ring-2 focus:ring-pink-300 focus:border-pink-500 ${
                errors.firstname ? "border-red-500" : ""
              }`}
            />
            {errors.firstname && (
              <p className="mt-1 text-sm text-red-500">{errors.firstname.message}</p>
            )}
          </div>
          <div>
            <label htmlFor="lastname" className="block text-sm font-medium text-gray-700">
              Прізвище
            </label>
            <input
              type="text"
              id="lastname"
              {...register("lastname")}
              className="w-full mt-1 p-2 border rounded-md focus:ring-2 focus:ring-pink-300 focus:border-pink-500"
            />
          </div>
          <div>
            <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">
              Телефон
            </label>
            <Controller
              name="phoneNumber"
              control={control}
              rules={{
                pattern: {
                  value: /^\+380 \(\d{2}\) \d{3}-\d{2}-\d{2}$/,
                  message: "Введіть номер у форматі +380 (XX) XXX-XX-XX",
                },
              }}
              render={({ field }) => (
                <InputMask
                  mask="+380 (99) 999-99-99"
                  value={field.value || ""}
                  onChange={(e) => field.onChange(e.target.value)}
                  onBlur={field.onBlur}
                  className={`w-full mt-1 p-2 border rounded-md focus:ring-2 focus:ring-pink-300 focus:border-pink-500 ${
                    errors.phoneNumber ? "border-red-500" : ""
                  }`}
                >
                  {(inputProps: any) => (
                    <input
                      {...inputProps}
                      type="text"
                      id="phoneNumber"
                      placeholder="+380 (XX) XXX-XX-XX"
                    />
                  )}
                </InputMask>
              )}
            />
            {errors.phoneNumber && (
              <p className="mt-1 text-sm text-red-500">{errors.phoneNumber.message}</p>
            )}
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              {...register("email", {
                required: "Email є обов'язковим",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "Введіть коректний email",
                },
              })}
              className={`w-full mt-1 p-2 border rounded-md focus:ring-2 focus:ring-pink-300 focus:border-pink-500 ${
                errors.email ? "border-red-500" : ""
              }`}
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
            )}
          </div>
          <div>
            <label htmlFor="birthdate" className="block text-sm font-medium text-gray-700">
              Дата народження
            </label>
            <input
              type="date"
              id="birthdate"
              {...register("birthdate", {
                validate: (value) => {
                  if (!value) return true; // Дозволяємо порожнє значення
                  const date = new Date(value);
                  const isValid = !isNaN(date.getTime());
                  if (!isValid) return "Некоректна дата";
                  // Додаткова перевірка: дата не повинна бути в майбутньому
                  const today = new Date();
                  if (date > today) return "Дата народження не може бути в майбутньому";
                  return true;
                },
              })}
              className={`w-full mt-1 p-2 border rounded-md focus:ring-2 focus:ring-pink-300 focus:border-pink-500 ${
                errors.birthdate ? "border-red-500" : ""
              }`}
            />
            {errors.birthdate && (
              <p className="mt-1 text-sm text-red-500">{errors.birthdate.message}</p>
            )}
          </div>
        </div>
        <div className="mt-6 flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => navigate("/profile")}
            className="px-4 py-2 bg-pink-100 text-pink-700 rounded-lg shadow-md hover:bg-pink-200 transition duration-300"
          >
            Відмінити
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-gradient-to-r from-accent to-pink-500 text-white rounded-lg shadow-md hover:from-accentDark hover:to-pink-600 hover:shadow-lg transition duration-300"
          >
            Зберегти
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProfileEditPage;