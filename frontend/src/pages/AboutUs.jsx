import { Link } from "react-router-dom";
import { useState } from "react";
import { SwiperMiembros } from "../components/SwiperMiembros";


export const AboutUs = () => {

    const [mostrarX, setMostrarX] = useState(false);
    const [mostrarY, setMostrarY] = useState(false);
    const [mostrarZ, setMostrarZ] = useState(false);

    const mostrarOcultar = (m, sm) => {
        sm(!m);
    }

    return (
        <div>
            <div onClick={() => mostrarOcultar(mostrarX, setMostrarX)} className="section x">
                <Link className="titulo">
                    NUESTRA HISTORIA
                </Link>
            </div>
            <div className={`section-text ${mostrarX ? 'visible' : ''}`}>
                Rainbow Set se fundó hace 5 años por nuestros dos miembros Kenchi y Adri.
                En ese entonces eramos únicamente un grupo al que les unía una pasión, el K-Pop. 
                Empezamos bailando en nuestra ciudad de origen, Azuqueca de Henares, pero no fue hasta que Prisma se unió al grupo
                que nos animamos para lanzar nuestro talento a internet y empezar a compartir lo que tanto disfrutabamos haciendo.
                Poco a poco se fueron uniéndo el resto de miembros: el siguiente fue Fabi, seguido de Carlos, después Iker y por último Moflad, que es nuestra más reciente incorporación.
            </div>
            <div onClick={() => mostrarOcultar(mostrarY, setMostrarY)} className="section y">
                <Link className="titulo">
                    IMÁGEN DEL GRUPO
                </Link>
            </div>
            <div className={`section-text ${mostrarY ? 'visible' : ''}`}>
                La estética y la imágen de Rainbow Set se comprende nada más leer el nombre: arcoíris,
                cuyos colores componen el logo y fueron la inspiración para crear nuestra web.
                ¿Y cuál es la razón? Rainbow Set está compuesto por una amplia diversidad de miembros, ya que
                cada uno de ellos destaca en diferentes aspectos del baile, justo como los colores del arcoíris.
                Estos colores son combinados siempre con blanco o negro, para poder enfatizar en nuestro concepto.
                Nuestro logo esta formado por las iniciales de Rainbow Set, la R y la S, aunque está hecho de manera 
                muy orgánica para que se vea simple y minimalista.
            </div>
            <div onClick={() => mostrarOcultar(mostrarZ, setMostrarZ)} className="section z">
                <Link className="titulo">
                    MIEMBROS
                </Link>
            </div>
            <div className={`section-text miembros ${mostrarZ ? 'visible' : ''}`}>
                Cómo muchos de vosotos tendréis curiosidad en conocer cuales son los miembros que 
                componen Rainbow Set, aquí os dejamos con un poquito más de información de cada uno de ellos.
                <SwiperMiembros/>
            </div>
        </div>
    )
    
};