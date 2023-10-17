import './App.css'
import { useState } from "react";
import { Link, Route, Routes } from 'react-router-dom'
import { Home } from './pages/Home';
import { AboutUs } from './pages/AboutUs';
import { Contacto } from './pages/Contacto';
import { Publicaciones } from './pages/Publicaciones';
import { Admin } from './pages/Admin';

function App() {

  const [activeTab, setActiveTab] = useState(1);

  const handleTabClick = (tabIndex) => {
    setActiveTab(tabIndex);
  };

  return (
    <div className="App">
      {location.pathname === '/admin' ? (
        <header>
        <h1 className='admin-title'>Página de administración</h1>
        
      </header>
      ) : (
      <header>
        <div><Link to='/'><img className="logo" src="src/assets/logo.png" alt=""  onClick={() => handleTabClick(1)}/></Link></div>
        <h1 className='appname'>Rainbow Set</h1>
        <div className='contenedor-nav'>
          <hr className='separator'></hr>
          <nav className="nav-menu">
            <ul>
              <li
                className={`tab ${activeTab === 1 ? "active" : ""}`}
              >
                <Link to="/" onClick={() => handleTabClick(1)}>Inicio</Link>
              </li>
              <li
                className={`tab ${activeTab === 2 ? "active" : ""}`}
              >
                <Link to="/aboutus" onClick={() => handleTabClick(2)}>Conócenos</Link>
              </li>
              <li
                className={`tab ${activeTab === 3 ? "active" : ""}`}
              >
                <Link to="/publicaciones" onClick={() => handleTabClick(3)}>Publicaciones</Link>
              </li>
              <li
                className={`tab ${activeTab === 4 ? "active" : ""}`}
              >
                <Link to="/contacto" onClick={() => handleTabClick(4)}>RRSS Y Contacto</Link>
              </li>
            </ul>
          </nav>
          <hr className='separator'></hr>
        </div>
      </header>
      )}
      <Routes>
        <Route path="/" element={<Home setActiveTab={handleTabClick}/>} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/publicaciones" element={<Publicaciones />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
      <footer>
      <img className="footer-logo" src="src/assets/logo.png" alt="" />
        <h4 className='footer-text'>Rainbow Set</h4>
      </footer>
    </div>
  )
}

export default App
