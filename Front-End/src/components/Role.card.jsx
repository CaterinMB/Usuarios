import React, { useState } from "react";
import { useRole } from "../context/RoleContext";
import { useUser } from "../context/UserContext";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { MdToggleOn, MdToggleOff } from "react-icons/md";
import RoleStatusModal from "./RoleUser.modal";

function RoleCard({ role, onEdit, onDelete }) {
  const { toggleRoleStatus } = useRole();
  const { user } = useUser();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const barraClass = role.Estado ? "" : "desactivado";

  const canChangeRoleStatus = !user.some(
    (users) => users.Rol_ID === role.ID_ROL
  );

  const handleToggleRoleStatus = () => {
    if (canChangeRoleStatus) {
      toggleRoleStatus(role.ID_ROL);
    } else {
      setIsModalOpen(true);
    }
  };

  return (
    <tr>
      <td className="border border-gray-400 px-4 py-2 text-center width-column">
        {role.Nombre_Rol}
      </td>
      <td className="border border-gray-400 px-4 py-2 text-center width-column">
        Van los permisos, cuando sepa como hacerlo :D
      </td>
      <td
        className={`border border-gray-400 px-4 py-2 text-center width-column ${barraClass}`}
      >
        {role.Estado ? "Habilitado" : "Deshabilitado"}
      </td>
      <td className="border border-gray-400 px-4 py-2 text-center">
        <div style={{ display: "flex", alignItems: "center" }}>
          <button
            onClick={onEdit}
            className={`text-orange-500 hover:text-orange-700 mr-2 ${!role.Estado ? "text-gray-400 cursor-not-allowed" : ""}`}
            disabled={!role.Estado || !canChangeRoleStatus}
            style={{ marginLeft: "14%" }}
          >
            <AiFillEdit size={24} />
          </button>
          <button
            onClick={onDelete}
            className={`text-red-500 hover:text-red-800 mr-2 ${!role.Estado ? "text-gray-400 cursor-not-allowed" : ""}`}
            style={{ marginRight: "-20px" }}
            disabled={!role.Estado || !canChangeRoleStatus}
          >
            <AiFillDelete size={24} />
          </button>
          <div
            className={`barra-container ${barraClass} adjust`}
            style={{ marginRight: "-100px" }}
            onClick={handleToggleRoleStatus}
          >
            <div className={`circulo ${barraClass}`}>
              {role.Estado ? (
                <MdToggleOn className={`estado-icon active ${barraClass}`} />
              ) : (
                <MdToggleOff className={`estado-icon inactive ${barraClass}`} />
              )}
            </div>
          </div>
        </div>
      </td>
      {canChangeRoleStatus ? null : (
        <RoleStatusModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </tr>
  );
}

export default RoleCard;