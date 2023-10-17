import Select from "react-select";
import { Switch } from '@material-ui/core'
import { useEffect, useState } from "react";

export const Publicaciones = () => {

    const [cronologico, setCronologico] = useState(true);
    const [posts, setPosts] = useState([])
    const [miembros, setMiembros] = useState([])
    const [miembroSeleccionado, setMiembroSeleccionado] = useState('')

    useEffect(() => {
        fetch('http://localhost:8000/api/posts')
            .then(response => response.json())
            .then(data => {
                setPosts(data);
                console.log(data);
            });
    }, []);

    useEffect(() => {
        fetch('http://localhost:8000/api/miembros')
            .then(response => response.json())
            .then(data => {
                setMiembros(data);
                console.log(data);
            });
    }, []);

    const selectMiembros = miembros.map((miembro) => ({
        value: miembro[0],
        label: miembro[1]
    }))

    const changeFecha = () => {
        const postInvertidos = posts.reverse()
        setPosts(postInvertidos)
        setCronologico(!cronologico);
    };

    const handleChange = (selectedOption) => {
        setMiembroSeleccionado(selectedOption)
        console.log(selectedOption.value)
        fetch(`http://localhost:8000/api/miembros_posts/miembro/${selectedOption.value}`)
            .then(response => response.json())
            .then(data => {
                if (cronologico === false) {
                    setPosts(data.reverse());
                } else {
                    setPosts(data);
                }
            });
    }

    return (
        <div>
            <div className="filtros">
                <div className="members">Filtro por miembros</div>
                    <Select
                        className="member-select"
                        value={miembroSeleccionado}
                        onChange={handleChange}
                        options={selectMiembros}
                    />
                <div className="fecha">Invertir orden cronológico</div>
                <Switch onChange={changeFecha} />
            </div>
            {posts.map((item) => {
                return (
                <div className="div-publicacion" key={item[0]}>
                    <div className="titulo-publicacion">{item[1]}</div>
                    <div className={`publicacion-text`}>
                        {item[2]}
                    </div>
                    {item[3] ? 
                        <iframe 
                            src={item[3]} 
                            title="YouTube video player" 
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                            allowFullScreen>
                        </iframe> 
                    : null}
                    <div className="datetime">{item[4].substring(11,16)} {item[4].substring(8,10)}{item[4].substring(4,8)}{item[4].substring(0,4)}</div>
                </div>
            )})}
        </div>
    )
    
};