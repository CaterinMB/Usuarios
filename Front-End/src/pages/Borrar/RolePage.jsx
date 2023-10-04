import { useEffect } from 'react';
import { useRole } from '../context/RoleContext.jsx';
//import RoleCard from '../components/RoleCard.jsx';

function RolePage() {
    const { getRoles, role } = useRole();

    useEffect(() => {
        getRoles();
    }, []);

    return (
        <div>
            <h1>Roles</h1>
            <table className="table-auto mx-auto w-full">
                <thead>
                    <tr className="bg-[#201E1E] text-white">
                        <th className="border border-gray-400 px-4 py-2">Nombre</th>
                        <th className="border border-gray-400 px-4 py-2">Estado</th>
                    </tr>
                </thead>
                <tbody>
                    {/* {role && role.map((rol) => (
                        <RoleCard rol={rol} key={rol.ID_ROL} />
                    ))} */}
                </tbody>
            </table>
        </div>
    )
}

export default RolePage