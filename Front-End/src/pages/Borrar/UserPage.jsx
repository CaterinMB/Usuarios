import React, { useState, useEffect } from 'react';
import { useFetch } from '../hooks/useFetch';
import { Link } from 'react-router-dom';
import { BiSolidEdit } from 'react-icons/bi';
import { AiOutlineEye } from 'react-icons/ai';
import { BsToggleOff } from 'react-icons/bs';

function UserPage() {
    const { data, loading } = useFetch({ url: 'http://localhost:4000/api/user' });
    const [providers, setProviders] = useState([]);

    useEffect(() => {
        if (!loading) {

            const providersWithInitialHabilitado = data.map(provider => ({
                ...provider,
                Estado: true,
            }));
            setProviders(providersWithInitialHabilitado);
        }
    }, [data, loading]);

    const handleToggleClick = (id) => {
        const updatedProviders = providers.map((user) => {
            if (user.ID_USUARIO === id) {
                user.Estado = !user.Estado;
            }
            return user;
        });

        setProviders(updatedProviders);
    };

    return (
        <div className="min-h-screen flex">
            <div className="flex-grow">
                <h1 className="text-4xl font-bold mb-4 ml-6 mt-7">USUARIOS</h1>
                <div className="ml-8 mb-4">
                    <Link
                        to="/add-user"
                        className="bg-yellow-500 text-white py-2 px-4 rounded-md mt-8"
                    >
                        Registrar Usuario
                    </Link>
                </div>
                {loading ? (
                    <h1 className="text-4xl font-bold mb-4">Cargando...</h1>
                ) : (
                    <div className="w-3/4 mx-auto mb-5 mt-45">
                        <table className="w-full">
                            <thead className="bg-gray-800 text-white">
                                <tr>
                                    <th className="w-1/7 text-sm border border-gray-600 p-2">Documento</th>
                                    <th className="w-1/7 text-sm border border-gray-600 p-2">Nombre</th>
                                    <th className="w-1/7 text-sm border border-gray-600 p-2">Apellido</th>
                                    <th className="w-1/7 text-sm border border-gray-600 p-2">Correo</th>
                                    <th className="w-1/7 text-sm border border-gray-600 p-2">Rol</th>
                                    <th className="w-1/7 text-sm border border-gray-600 p-2">Estado</th>
                                    <th className="w-1/7 text-sm border border-gray-600 p-2">Acciones</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white">
                                {providers.map((user) => (
                                    <tr key={user.ID_USUARIO}>
                                        <td className="w-1/7 border border-gray-600 p-2">{user.Documento}</td>
                                        <td className="w-1/7 border border-gray-600 p-2">{user.Nombre_Usuario}</td>
                                        <td className="w-1/7 border border-gray-600 p-2">{user.Apellido_Usuario}</td>
                                        <td className="w-1/7 border border-gray-600 p-2">{user.Email}</td>
                                        <td className="w-1/7 border border-gray-600 p-2">{user.Rol_ID}</td>
                                        <td className={`w-1/7 border border-gray-600 p-2 ${user.Estado ? 'text-green-600' : 'text-red-600'}`}>
                                            {user.Estado ? 'Habilitado' : 'Deshabilitado'}
                                        </td>
                                        <td className="w-1/7 border border-gray-600 p-2 text-center">
                                            <div className="flex justify-center">
                                                <Link to={`/edit-user/${user.ID_USUARIO}`}>
                                                    <BiSolidEdit className={`text-2xl mx-2 ${!user.Estado ? 'text-gray-400 cursor-not-allowed' : ''}`} />
                                                </Link>
                                                <Link
                                                    to={{
                                                        pathname: `/view-user/${user.ID_USUARIO}`,
                                                        state: { user },
                                                    }}
                                                >
                                                    <AiOutlineEye className={`text-2xl mx-2 ${!user.Estado ? 'text-gray-400 cursor-not-allowed' : ''}`} />
                                                </Link>
                                                <span
                                                    className={`cursor-pointer ${user.Estado ? 'text-green-600' : 'text-red-600'}`}
                                                    onClick={() => handleToggleClick(user.ID_USUARIO)}
                                                >
                                                    <BsToggleOff className="text-2xl mx-2" />
                                                </span>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}

export default UserPage;
