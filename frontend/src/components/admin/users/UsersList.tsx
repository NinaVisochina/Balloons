import { useEffect, useState } from "react";
import axios from "axios";
import { User } from "../../../interfaces/users";

const UsersList = () => {
    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => {

        axios.get<User[]>("/api/accounts/users")
            .then(response => {
                console.log("Users response:", response.data);
                setUsers(response.data);
            })
            .catch(error => console.error("Error fetching users:", error));
    }, []);

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-6 text-center">Звичайні користувачі</h1>
            <table className="min-w-full bg-white border border-gray-300">
                <thead className="bg-gray-200">
                    <tr>
                        <th className="px-4 py-2 border border-gray-300 text-center">ID</th>
                        <th className="px-4 py-2 border border-gray-300 text-center">Ім'я</th>
                        <th className="px-4 py-2 border border-gray-300 text-center">Прізвище</th>
                        <th className="px-4 py-2 border border-gray-300 text-center">Email</th>
                        <th className="px-4 py-2 border border-gray-300 text-center">Зображення</th>
                    </tr>
                </thead>
                <tbody>
                    {Array.isArray(users) && users.map((user, index) => (
                        <tr key={user.id} className={index % 2 === 0 ? "bg-gray-50" : ""}>
                            <td className="px-4 py-2 border border-gray-300 text-center">{index + 1}</td>
                            <td className="px-4 py-2 border border-gray-300 text-center">{user.firstname}</td>
                            <td className="px-4 py-2 border border-gray-300 text-center">{user.lastname}</td>
                            <td className="px-4 py-2 border border-gray-300 text-center">{user.email}</td>
                            <td className="px-4 py-2 border border-gray-300 text-center">
                                {user.image ? (
                                    <img
                                        src={user.image}
                                        alt="User"
                                        className="h-10 w-10 rounded-full mx-auto"
                                    />
                                ) : (
                                    "—"
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UsersList;
