import React, { useEffect, useState } from 'react';
import RoleCard from '../components/Role.card';
import { useRole } from '../context/RoleContext';
import CreateRole from './CreateRole';
import EditRole from './EditRole';
import DeleteRole from './DeleteRole';
import { useUser } from "../context/UserContext";

function ListRole() {
    const { role, getRoles, deleteRole } = useRole();
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredRole, setFilteredRole] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [roleToEdit, setRoleToEdit] = useState(null);
    const [roleToDelete, setRoleToDelete] = useState(null);
    const [isDataChanged, setIsDataChanged] = useState(false);
    const [cannotDelete, setCannotDelete] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 7;

    const { user, getUsers } = useUser();

    useEffect(() => {
        getRoles();
        getUsers();
    }, []);

    useEffect(() => {
        if (searchTerm === '') {
            setFilteredRole(role);
        } else {
            const filtered = role.filter((rol) =>
                rol.Nombre_Rol.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredRole(filtered);
        }
    }, [searchTerm, role]);

    const handleDelete = async (rol) => {
        const isRolInUse = user.some(
            (users) => users.Rol_ID === rol.ID_ROL
        );

        if (isRolInUse) {
            setIsDeleteModalOpen(true);
            setRoleToDelete(rol);
            setCannotDelete(
                'No se puede eliminar este rol porque está asigando a usuario(s) existente(s).'
            );
        } else {
            setIsDeleteModalOpen(true);
            setRoleToDelete(rol);
            setCannotDelete(null);
        }
    };

    const confirmDelete = () => {
        if (roleToDelete) {
            deleteRole(roleToDelete.ID_ROL);
            setRoleToDelete(null);
            setIsDeleteModalOpen(false);
            setIsDataChanged(true);
        }
    };

    const cancelDelete = () => {
        setRoleToDelete(null);
        setCannotDelete(null);
        setIsDeleteModalOpen(false);
    };

    const navigateToCreateRole = () => {
        setIsModalOpen(true);
    };

    const handleEdit = (rol) => {
        setRoleToEdit(rol);
        setIsEditModalOpen(true);
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const roleToDisplay = filteredRole.slice(startIndex, endIndex);

    return (
        <div className="mx-auto mt-4 contenedor">
            <h1 className="text-3xl font-bold text-center mb-20">Roles</h1>
            <div className="flex justify-between items-center mb-4">
                <button
                    onClick={navigateToCreateRole}
                    className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-5 rounded border border-orange-500 hover:border-orange-700 focus:outline-none focus:shadow-outline"
                >
                    Crear Rol
                </button>
                <input
                    type="text"
                    placeholder="Buscar rol"
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
                        <th className="border border-gray-400 px-2 py-2">Nombre</th>
                        <th className="border border-gray-400 px-7 py-2">Permisos</th>
                        <th className="border border-gray-400 px-2 py-2">Estado</th>
                        <th className="border border-gray-400 px-4 py-2">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {roleToDisplay.map(rol => (
                        <RoleCard
                            Role={rol}
                            key={rol.ID_ROL}
                            onEdit={() => handleEdit(rol)}
                            onDelete={() => handleDelete(rol)}
                        />
                    ))}
                </tbody>
            </table>

            {isDeleteModalOpen && (
                <DeleteRole
                    onClose={cancelDelete}
                    cannotDelete={cannotDelete}
                    onConfirmDelete={confirmDelete}
                />
            )}

            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="modal-overlay" onClick={() => setIsModalOpen(false)}></div>
                    <div className="modal-container">
                        <CreateRole onClose={() => setIsModalOpen(false)} />
                    </div>
                </div>
            )}

            {isEditModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="modal-overlay" onClick={() => setIsEditModalOpen(false)}></div>
                    <div className="modal-container">
                        <EditRole
                            onClose={() => setIsEditModalOpen(false)}
                            roleToEdit={roleToEdit}
                        />
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
                        disabled={endIndex >= role.length}
                        className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-5 rounded border border-orange-500 hover:border-orange-700 focus:outline-none focus:shadow-outline ml-2"
                    >
                        Siguiente
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ListRole