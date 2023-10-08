import { useUser } from "../context/UserContext";
import { useRole } from "../context/RoleContext";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { MdToggleOn, MdToggleOff } from "react-icons/md";

function UserCard ({ user, onEdit, onDelete }) {
  const { toggleUserStatus } = useUser();
  const { role } = useRole();

  const roles = user ? role.find(
    (rol) => rol.ID_ROL === user.Rol_ID
  ) : null;

  const barraClass = user.Estado ? "" : "desactivado";

  return (
    <tr>
      <td className="border border-gray-400 px-4 py-2 text-center width-column">{user.TipoDocumento}</td>
      <td className="border border-gray-400 px-4 py-2 text-center width-column">{user.Documento}</td>
      <td className="border border-gray-400 px-4 py-2 text-center width-column">{user.Nombre_Usuario}</td>
      <td className="border border-gray-400 px-4 py-2 text-center width-column">{user.Apellido_Usuario}</td>
      <td className="border border-gray-400 px-4 py-2 text-center width-column">
        {roles && roles.Nombre_Rol}
      </td>
      <td className={`border border-gray-400 px-4 py-2 text-center width-column ${barraClass}`}>
        {user.Estado ? "Habilitado" : "Deshabilitado"}
      </td>
      <td className="border border-gray-400 px-4 py-2 text-center">
        <div style={{ display: "flex", alignItems: "center" }}>
          <button
            onClick={onEdit}
            className={`text-orange-500 hover:text-orange-700 mr-2 ${!user.Estado ? "text-gray-400 cursor-not-allowed" : ""}`}
            disabled={!user.Estado}
            style={{ marginLeft: "14%" }}
          >
            <AiFillEdit size={24} />
          </button>
          <button
            onClick={onDelete}
            className={`text-red-500 hover:text-red-800 mr-2 ${!user.Estado ? "text-gray-400 cursor-not-allowed" : ""}`}
            style={{ marginRight: "-20px" }}
            disabled={!user.Estado}
          >
            <AiFillDelete size={24} />
          </button>
          <div
            className={`barra-container ${barraClass} adjust`}
            onClick={() => toggleUserStatus(user.ID_USUARIO)}
          >
            <div className={` ${barraClass}`} style={{ marginRight: "-30px" }}>
              {user.Estado ? (
                <MdToggleOn className={`estado-icon active ${barraClass}`} />
              ) : (
                <MdToggleOff className={`estado-icon inactive ${barraClass}`} />
              )}
            </div>
          </div>
        </div>
      </td>
    </tr>
  );
}

export default UserCard;