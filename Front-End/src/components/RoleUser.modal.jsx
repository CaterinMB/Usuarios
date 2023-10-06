import React from "react";

function RoleStatusModal({ isOpen, onClose }) {
  return (
    isOpen && (
      <div className="fixed inset-0 flex items-center justify-center">
        <div className="modal-overlay" onClick={onClose}></div>
        <div className="modal-container bg-white p-6 rounded shadow-md text-center">
          <h1 className="text-3xl font-semibold ">No se puede cambiar el estado</h1>
          <p className="deleteText">
            El rol seleccionado esta asignado a un usuario.
          </p>
          <button
            onClick={onClose}
            className="bg-gray-300 hover:bg-gray-400 text-gray-700 font-bold py-2 px-4 rounded"
          >
            Cerrar
          </button>
        </div>
      </div>
    )
  );
}

export default RoleStatusModal;