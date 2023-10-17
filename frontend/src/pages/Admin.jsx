import { useEffect, useState } from "react";
import { TablaMiembros } from "../components/TablaMiembros";
import { TablaPublicaciones } from "../components/TablaPublicaciones";

export const Admin = () => {

    const [activeAdminTab, setAdminActiveTab] = useState(1);
    const [showLogin, setShowLogin] = useState(true);
    const [loggedIn, setLoggedIn] = useState(false);
    const [password, setPassword] = useState('')
    const [correctPassword, setCorrectPassword] = useState([])

    useEffect(() => {
        fetch('http://localhost:8000/api/login')
            .then(response => response.json())
            .then(data => {
                setCorrectPassword(data);
            });
    }, []);

    const handleLogin = (inputPassword) => {
        if (inputPassword === correctPassword[0]) {
          setLoggedIn(true);
          setShowLogin(false);
        } else {
          alert("Contraseña incorrecta. Inténtalo de nuevo.");
        }
      };

    const handleAdminTabClick = (tabIndex) => {
        setAdminActiveTab(tabIndex);
    };

    return ( <>
        {showLogin ? (
        <div className="filtros">
            <label className="label-search">Introduce la contraseña:</label>
            <input type="password" placeholder="Contraseña" className="input-search" value={password} onChange={e => setPassword(e.target.value)}></input>
            <button className="btn add" onClick={() => handleLogin(password)}>Aceptar</button>
        </div>
        ) : null}
        
        {loggedIn ? (
            <>
        <div className='contenedor-nav'>
            <hr className='separator'></hr>
            <nav className="nav-menu">
                <ul>
                    <li className={`tab ${activeAdminTab === 1 ? "active" : ""}`}>
                        <a className="admin-tab" onClick={() => handleAdminTabClick(1)}>Miembros</a>
                    </li>
                    <li className={`tab ${activeAdminTab === 2 ? "active" : ""}`}>
                        <a className="admin-tab" onClick={() => handleAdminTabClick(2)}>Publicaciones</a>
                    </li>
                </ul>
            </nav>
            <hr className='separator'></hr>
        </div>
        <div>
            {activeAdminTab === 1 ? (<TablaMiembros/>) : (<TablaPublicaciones/>)}
        </div>
        </>
        ) : null}
    </>)
}