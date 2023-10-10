import React, { useState } from 'react';
import logo from '../img/logo.png'
import insumos from '../img/insumos.png'
import compras from '../img/compras.png'
import productos from '../img/productos.png'
import ventas from '../img/ventas.png'
import informes from '../img/informes.png'
import configuracion from '../img/configuracion.png'
import usuario from '../img/usuario.png'
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [submenuInsumosVisible, setSubmenuInsumosVisible] = useState(false);
  const [submenuComprasVisible, setSubmenuComprasVisible] = useState(false);
  const [submenuProductosVisible, setSubmenuProductosVisible] = useState(false);
  const [submenuVentasVisible, setSubmenuVentasVisible] = useState(false);

  const navigate = useNavigate();

  const toggleSubmenuInsumos = () => {
    setSubmenuInsumosVisible(!submenuInsumosVisible);
    setSubmenuInsumosVisible(false);
  };

  const toggleSubmenuCompras = () => {
    setSubmenuComprasVisible(!submenuComprasVisible);
    setSubmenuComprasVisible(false);
  };

  const toggleSubmenuProductos = () => {
    setSubmenuProductosVisible(!submenuProductosVisible);
    setSubmenuProductosVisible(false);
  };

  const toggleSubmenuVentas = () => {
    setSubmenuVentasVisible(!submenuVentasVisible);
    setSubmenuVentasVisible(false);
  }

  return (
    <div className="bg-white">
      <div className="menu bg-[#201e1e] min-h-screen flex flex-col justify-start items-start p-1">
        <img src={logo} alt="Logo" className="w-32 h-25 ml-8 mt-8" />
        <ul className="mt-8 space-y-5">
          <li>
            <div
              className="flex items-center text-white p-2 rounded ml-5"
              onClick={toggleSubmenuInsumos}
            >
              <img src={insumos} alt="Insumos" className="w-8 h-6" />
              <span className="ml-2">Insumos</span>
            </div>
            {submenuInsumosVisible && (
              <ul className="ml-7 space-y-2">
                <li>
                  <button
                    onClick={() => {
                      navigate('/');
                    }}
                    className="text-white bg-[#201E1E] rounded-md p-2 w-full"
                  >
                    Categoría Insumos
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      navigate('/');
                    }}
                    className="text-white bg-[#201E1E] rounded-md p-2 w-full"
                  >
                    Insumos
                  </button>
                </li>
              </ul>
            )}
          </li>
          <li>
            <div
              className="flex items-center text-white p-2 rounded ml-5"
              onClick={toggleSubmenuCompras}
            >
              <img src={compras} alt="Compras" className="w-8 h-6" />
              <span className="ml-2">Compras</span>
            </div>
            {submenuComprasVisible && (
              <ul className="ml-7 space-y-2">
                <li>
                  <button
                    onClick={() => {
                      navigate('/');
                    }}
                    className="text-white bg-[#201E1E] rounded-md p-2 w-full"
                  >
                    Proveedores
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      navigate('/');
                    }}
                    className="text-white bg-[#201E1E] rounded-md p-2 w-full"
                  >
                    Compras
                  </button>
                </li>
              </ul>
            )}
          </li>
          <li>
            <div
              className="flex items-center text-white p-2 rounded ml-5"
              onClick={toggleSubmenuProductos}
            >
              <img src={productos} alt="Productos" className="w-8 h-6" />
              <span className="ml-2">Productos</span>
            </div>
            {submenuProductosVisible && (
              <ul className="ml-7 space-y-2">
                <li>
                  <button
                    onClick={() => {
                      navigate('/');
                    }}
                    className="text-white bg-[#201E1E] rounded-md p-2 w-full"
                  >
                    Categoría Productos
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      navigate('/');
                    }}
                    className="text-white bg-[#201E1E] rounded-md p-2 w-full"
                  >
                    Productos
                  </button>
                </li>
              </ul>
            )}
          </li>
          <li>
            <div
              className="flex items-center text-white p-2 rounded ml-5"
              onClick={toggleSubmenuVentas}
            >
              <img src={ventas} alt="Ventas" className="w-8 h-6" />
              <span className="ml-2">Ventas</span>
            </div>
            {submenuVentasVisible && (
              <ul className="ml-7 space-y-2">
                <li>
                  <button
                    onClick={() => {
                      navigate('/');
                    }}
                    className="text-white bg-[#201E1E] rounded-md p-2 w-full"
                  >
                    Restaurante
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      navigate('/');
                    }}
                    className="text-white bg-[#201E1E] rounded-md p-2 w-full"
                  >
                    Meseros
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      navigate('/');
                    }}
                    className="text-white bg-[#201E1E] rounded-md p-2 w-full"
                  >
                    Ventas
                  </button>
                </li>
              </ul>
            )}
          </li>
          <li>
            <div
              className="flex items-center text-white p-2 rounded ml-5"
            >
              <img src={informes} alt="Informes" className="w-7 h-6" />
              <span className="ml-2">Informes</span>
            </div>
          </li>
        </ul>
        <div className="menuAbajo mt-auto flex justify-end space-x-3 mr-8 w-full">
          <button
            onClick={() => {
              navigate('/role');
            }}
            className="menuAbajo text-white bg-[#201E1E] rounded-md p-1 w-full"
          >
            <img src={configuracion} alt="Configuración" className="w-9 h-9" />
          </button>
          <button
            onClick={() => {
              navigate('/user');
            }}
            className="menuAbajo text-white bg-[#201E1E] rounded-md p-1 w-full"
          >
            <img src={usuario} alt="Usuario" className="w-8 h-8" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar