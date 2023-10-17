import { useState } from "react";
import { Link } from "react-router-dom";

export const Home = (props) => {

    const changeTab = (tabIndex) => {
        // eslint-disable-next-line react/prop-types
        props.setActiveTab(tabIndex);
    };

    const [mostrarA, setMostrarA] = useState(false);
    const [mostrarB, setMostrarB] = useState(false);
    const [mostrarC, setMostrarC] = useState(false);
    const [mostrarD, setMostrarD] = useState(false);

    const mostrarOcultar = (m, sm) => {
        sm(!m);
    }

    return (
        <div>
            <div onClick={() => mostrarOcultar(mostrarA, setMostrarA)} className="section a">
                <Link className="titulo">
                    BIENVENIDO
                </Link>
            </div>
            <div className={`section-text ${mostrarA ? 'visible' : ''}`}>
                ¡Os damos la bienvenida a la página oficial de Rainbow Set! Aquí podréis conocer
                más sobre nosotros, nuestra historia y a cada uno de nuestros miembros de manera
                más personal. <br/>También podréis ver nuestra actividad, así como las publicaciones
                que subamos, nuestras redes sociales y contactar con nosotros. ¡Todo en una web!
                Esperemos que disfrutéis de ella tanto cómo nosotros de presentaros este proyecto
                que hemos realizado con mucho cariño. <br/>¡Bienvenidos a un mundo de color! ¡Bienvenidos a Rainbow Set!
            </div>
            <div onClick={() => mostrarOcultar(mostrarB, setMostrarB)} className="section b">
                <Link className="titulo">
                    CONÓCENOS
                </Link>
            </div>
            <div className={`section-text ${mostrarB ? 'visible' : ''}`}>
                ¿Quieres saber más sobre nosotros? ¿Saber cómo se formo Rainbow Set?<br/> ¿Quizás conocer mejor a cada uno de nuestros miembros?<br/>
                Entonces no dudes en ir al apartado CONÓCENOS para poder conocer al grupo en mayor profundidad.
                También te dejamos un atajo para ir más rápido <Link to='/aboutus' onClick={() => changeTab(2)}>HACIENDO CLICK AQUÍ</Link>.<br/>
                En este apartado podrás conocer más sobre nuestra pasión por el baile y el K-Pop y el significado
                que contiene nuestro nombre e imágen grupal.
            </div>
            <div onClick={() => mostrarOcultar(mostrarC, setMostrarC)} className="section c">
                <Link className="titulo">
                    NUESTRA ACTIVIDAD
                </Link>
            </div>
            <div className={`section-text ${mostrarC ? 'visible' : ''}`}>
                Si te interesa saber cuáles van a ser nuestras próximas actividades, debes ir al apartado PUBLICACIONES para informarte sobre ello.<br/>
                En esta sección publicaremos nuestras covers de baile, próximas apariciones, asi cómo participaciones en concursos 
                y actuaciones en público en la que grabamos nuestras covers para el canal.<br/>
                También informaremos sobre acontecimientos futuros y sobre cosas que estemos preparando.<br/>
                Para mantenerte informado accede a dicho apartado <Link to='/publicaciones' onClick={() => changeTab(3)}>HACIENDO CLICK AQUÍ</Link>.
            </div>
            <div onClick={() => mostrarOcultar(mostrarD, setMostrarD)} className="section d">
                <Link className="titulo">
                    DÓNDE ENCONTRARNOS
                </Link>
            </div>
            <div className={`section-text ${mostrarD ? 'visible' : ''}`}>
                En el apartado de CONTACTO Y RRSS podrás encontrar todas nuestras redes sociales en un solo sitio.
                Aquí es dónde podrás acceder a todo nuestro contenido con tan solo un click.<br/>
                ¿Que lo que quiéres es ponerte en contacto con nosotros? En esta sección dispones de un enlace para poder enviarnos
                un correo para contactar de manera más profesional si estáis interesados en hablar con nosotros más formalmente o de negocios.<br/>
                <Link to='/contacto' onClick={() => changeTab(4)}>HAZ CLICK AQUÍ</Link> para obtener toda esta información.

            </div>
        </div>
    )
    
};