import { createContext, useState, useContext, useEffect } from 'react'
import { registerRequest, getUserRequest, getUsersRequest, updateUserRequest, statusUserRequest, deleteUserRequest } from '../api/user.js'

export const UserContext = createContext();

export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error("El useUser debe usarse dentro de UserProvider")
    }
    return context;
}

export const UserProvider = ({ children }) => {

    const [user, setUser] = useState([]);

    const createUser = async (user) => {
        try {
            const res = await registerRequest(user);
            getUsers();
        } catch (error) {
            console.log(error);
        }
    }

    const getUsers = async () => {
        try {
            const res = await getUsersRequest();
            setUser(res.data)
        } catch (error) {
            console.log(error)
        }
    }

    const getUser = async (id) => {
        try {
            const res = await getUserRequest(id);
            return res.data
        } catch (error) {
            console.error(error);
        }
    }

    const toggleUserStatus = async (id) => {
        try {
            const res = await statusUserRequest(id);

            if (res.status === 200) {
                setUser((prevUser) =>
                    prevUser.map((users) =>
                    users.ID_USUARIO === id ? { ...users, Estado: !users.Estado } : users
                    )
                );
            }
        } catch (error) {
            console.log(error);
        }
    }

    const updateUser = async (id, users) => {
        try {
            await updateUserRequest(id, users);
            getUsers();
        } catch (error) {
            console.error(error);
        }
    }

    const deleteUser = async (id) => {
        try {
            const res = await deleteUserRequest(id)
            if (res.status === 204) setUser(user.filter(users => users.ID_USUARIO !== id))
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <UserContext.Provider
            value={{
                user,
                createUser,
                getUsers,
                getUser,
                toggleUserStatus,
                updateUser,
                deleteUser,
            }}
        >
            {children}
        </UserContext.Provider>
    );
};