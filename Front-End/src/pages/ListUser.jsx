import React, { useEffect, useState } from 'react';
import { useUser } from '../context/UserContext';
import CreateUser from './CreateUser';
import EditUser from './EditUser';
import DeleteUser from './DeleteUser';
import { useRole } from "../context/RoleContext";
import UserCard from '../components/User.card';

function ListUser() {
    const { user, getUsers, deleteUser } = useUser();
    const { role } = useRole();
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredUser, setFilteredUser] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [supplyToEdit, setSupplyToEdit] = useState(null);
    const [supplyToDelete, setSupplyToDelete] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 7;


    useEffect(() => {
        getUsers();
    }, []);

    if (user.length < 0) return <h1>No hay insumos</h1>;

    useEffect(() => {
        if (searchTerm === '') {
            setFilteredUser(user);
        } else {
            const filtered = user.filter((supply) =>
                supply.Nombre_Insumo.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredUser(filtered);
        }
    }, [searchTerm, user]);

    const navigateToCreateUser = () => {
        setIsModalOpen(true);
    };

    const handleCreated = () => {
        getUsers();
    };

    const handleEdit = (supply) => {
        setUserToEdit(supply);
        setIsEditModalOpen(true);
    };

    const handleDelete = (supply) => {
        setUserToDelete(supply);
        setIsDeleteModalOpen(true);
    };

    const confirmDelete = () => {
        if (supplyToDelete) {
            deleteUser(supplyToDelete.ID_INSUMO);
            setUserToDelete(null);
            setIsDeleteModalOpen(false);
        }
    };

    const cancelDelete = () => {
        setUserToDelete(null);
        setIsDeleteModalOpen(false);
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const userToDisplay = filteredUser.slice(startIndex, endIndex);

    return (
        <div className="mx-auto mt-4 contenedor">
            <h1 className="text-3xl font-bold text-center mb-20">USUARIOS</h1>
            <div className="flex justify-between items-center mb-4">
                <button
                    onClick={navigateToCreateUser}
                    className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-5 rounded border border-orange-500 hover:border-orange-700 focus:outline-none focus:shadow-outline"
                >
                    Crear Usuario
                </button>
                <input
                    type="text"
                    placeholder="Buscar usuario por nombre"
                    value={searchTerm}
                    onChange={(e) => {
                        const inputValue = e.target.value;
                        const filteredInput = inputValue.replace(/[^a-zA-Z]/g, '');
                        setSearchTerm(filteredInput);
                    }}
                    className="border-2 border-gray-800 rounded-lg p-2 focus:outline-none"
                />
            </div>
            <table className="table-auto mx-auto w-full">
                <thead>
                    <tr className="bg-[#201E1E] text-white">
                        <th className="border border-gray-400 px-4 py-2 w-1/7">Tipo de documento</th>
                        <th className="border border-gray-400 px-4 py-2 w-1/7">N° de documento</th>
                        <th className="border border-gray-400 px-4 py-2 w-1/7">Nombre</th>
                        <th className="border border-gray-400 px-7 py-2 w-1/7">Apellido</th>
                        <th className="border border-gray-400 px-4 py-2 w-1/7">Correo</th>
                        <th className="border border-gray-400 px-2 py-2 w-1/7">Rol</th>
                        <th className="border border-gray-400 px-8 py-2 w-1/7">Estado</th>
                        <th className="border border-gray-400 px-4 py-2 w-1/7">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {userToDisplay.map((supply) => (
                        <UserCard
                            user={user}
                            key={user.ID_USUARIO}
                            onEdit={() => handleEdit(user)}
                            onDelete={() => handleDelete(user)}
                        />
                    ))}
                </tbody>
            </table>

            {isDeleteModalOpen && (
                <DeleteUser
                    onClose={cancelDelete}
                    onDelete={confirmDelete}
                />
            )}

            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="modal-overlay" onClick={() => setIsModalOpen(false)}></div>
                    <div className="modal-container">
                        <CreateUser onClose={() => setIsModalOpen(false)} onCreated={handleCreated} />
                    </div>
                </div>
            )}

            {isEditModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="modal-overlay" onClick={() => setIsEditModalOpen(false)}></div>
                    <div className="modal-container">
                        <EditUser onClose={() => setIsEditModalOpen(false)} UserToEdit={userToEdit} />
                    </div>
                </div>
            )}

            <div className="pagination">
                <div className="pagination text-center mt-4">
                    <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-5 rounded border border-orange-500 hover:border-orange-700 focus:outline-none focus:shadow-outline mr-2"
                    >
                        Anterior
                    </button>
                    <span>Página {currentPage}</span>
                    <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={endIndex >= user.length}
                        className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-5 rounded border border-orange-500 hover:border-orange-700 focus:outline-none focus:shadow-outline ml-2"
                    >
                        Siguiente
                    </button>
                </div>
            </div>

        </div>
    );
}

export default ListUser