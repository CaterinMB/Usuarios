import { createContext, useState, useContext } from 'react'
import { createRoleRequest, getRolesRequest, getRoleRequest, updateRoleRequest, deleteRoleRequest, statusRoleRequest } from '../api/role.js'

export const RoleContext = createContext();

export const useRole = () => {
    const context = useContext(RoleContext);
    if (!context) {
        throw new Error("useRole debe usarse dentro de RoleProvider")
    }
    return context;
}

export const RoleProvider = ({ children }) => {

    const [role, setRole] = useState();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [ loading, setLoading] = useState(true);

    useEffect(() => {
        const storedRole = localStorage.getItem("roles");
        if (storedRole) {
            setRole(JSON.parse(storedRole));
            setLoading(false); 
        } else {
            loadRole();
        }
    }, []);

    const loadRole = async () => {
        try {
            const res = await getRolesRequest();
            setRole(res.data);
            setLoading(false); 
        } catch (error) {
            console.error(error);
            setLoading(false); 
        }
    }

    const createRole = async (role) => {
        try {
            const res = await createRoleRequest(role);
            console.log(res.data);
            setRole(res.data);
            setIsAuthenticated(true);
        } catch (error) {
            console.log(error);
        }
    }

    const getRoles = async (role) => {
        try {
            const res = await getRolesRequest();
            setRole(res.data)
        } catch (error) {
            console.log(error)
        }
    }

    const toggleRoleStatus = async (id) => {
        try {
            const res = await statusRoleRequest(id);

            if (res.status === 200) {
                setRole((prevRole) =>
                    prevRole.map((roles) =>
                    roles.ID_ROL === id ? { ...roles, Estado: !roles.Estado } : roles
                    )
                );
            }
        } catch (error) {
            console.log(error);
        }
    }

    const updateRole = async (id, roles) => {
        try {
            await updateRoleRequest(id, roles);
            getRoles();
        } catch (error) {
            console.error(error);
        }
    }

    const deleteRole = async (id) => {
        try {
            const res = await deleteRoleRequest(id)
            if (res.status === 204) setRole(role.filter(roles => roles.ID_ROL !== id))
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <RoleContext.Provider
            value={{
                role,
                createRole,
                getRoles,
                loadRole,
                toggleRoleStatus,
                updateRole,
                deleteRole,
                isAuthenticated,
            }}
        >
            {children}
        </RoleContext.Provider>
    );
};