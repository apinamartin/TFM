import { Link } from "react-router-dom";

export const Contacto = () => {

    const toYouTube = () => {
        window.open('https://www.youtube.com/@RainbowSet', '_blank')
    }

    const toTikTok = () => {
        window.open('https://www.tiktok.com/@rainbowsetofficial', '_blank')
    }

    const toInstagram = () => {
        window.open('https://www.instagram.com/rainbowsetofficial/', '_blank')
    }

    const toGMail = () => {
        window.open('mailto:rainbowsetra3@gmail.com', '_blank')
    }

    return (
        <div>
            <div className='contacto-text'>
                Además de esta página web, como ya hemos comentado en otras secciones, disponemos de 
                varias redes sociales en las que subimos diferentes tipos de contenido. Si queréis
                estar al tanto de las publicaciones en cada una de ellas, aquí os dejamos los enlaces 
                para que le echéis un vistazo.
            </div>
            <div className='contacto-text redes'>
                <div className="rrss tt" onClick={toTikTok}></div>
                <div className="rrss yt" onClick={toYouTube}></div>
                <div className="rrss ig" onClick={toInstagram}></div>
            </div>
            <div className='contacto-text'>
                Podéis seguirnos y activar las notificaciones en cada una de ellas para que podáis
                ser los primeros en ver el contenido que subamos.<br/><br/>

                Además, si queréis poneros en contacto con nosotros de manera más profesional, ya sea para hablar de negocios, 
                contratarnos para alguna actuación o simplemente hablarnos directamente,
                aquí os dejamos nuestra dirección de correo:<br/><br/>

                <Link onClick={toGMail} style={{fontSize: '2vw'}}>rainbowsetra3@gmail.com</Link><br/><br/>

                Clicando en la dirección, accederéis directamente al correo con nuestro email preparado
                para enviarnos el mensaje que deseéis.
            </div>
        </div>
    )
    
};