import { Link } from "react-router-dom";
import Titulo from "../components/Titulos";
import Button from "../components/Button";

const users = [
  {
    id: 1,
    firstName: "Juan",
    lastName: "Pérez",
    email: "juan.perez@example.com",
    country: "El Salvador",
    city: "San Salvador",
  },
  {
    id: 2,
    firstName: "Ana",
    lastName: "Gómez",
    email: "ana.gomez@example.com",
    country: "Guatemala",
    city: "Guatemala",
  },
  {
    id: 3,
    firstName: "Carlos",
    lastName: "Rodríguez",
    email: "carlos.rod@example.com",
    country: "Honduras",
    city: "Tegucigalpa",
  },
  {
    id: 4,
    firstName: "María",
    lastName: "López",
    email: "maria.lopez@example.com",
    country: "Nicaragua",
    city: "Managua",
  },
  {
    id: 5,
    firstName: "Pedro",
    lastName: "Martínez",
    email: "pedro.martinez@example.com",
    country: "Costa Rica",
    city: "San José",
  },
];

const Home = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Link
        to="/users"
        className="text-2xl font-bold text-gray-900 mb-4 bg-green-100 p-2 rounded w-full text-center hover:bg-green-200 transition-colors block mb-6"
      >
        Agregar usuario
      </Link>

      <Titulo titulo="User Information" />

      <p className="mt-1 text-sm text-gray-600 mb-4">
        Lista de usuarios registrados.
      </p>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg">
          <thead className="bg-gray-100 text-gray-700 text-left text-sm">
            <tr>
              <th className="px-4 py-2 border-b">Nombre</th>
              <th className="px-4 py-2 border-b">Apellido</th>
              <th className="px-4 py-2 border-b">Email</th>
              <th className="px-4 py-2 border-b">País</th>
              <th className="px-4 py-2 border-b">Ciudad</th>
              <th className="px-4 py-2 border-b">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr
                key={user.id}
                className="border-b hover:bg-gray-50 transition-colors"
              >
                <td className="px-4 py-2">{user.firstName}</td>
                <td className="px-4 py-2">{user.lastName}</td>
                <td className="px-4 py-2">{user.email}</td>
                <td className="px-4 py-2">{user.country}</td>
                <td className="px-4 py-2">{user.city}</td>
                <td className="px-4 py-2">
                  <Button text="Editar" />

                  <Button text="Eliminar" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Home;
