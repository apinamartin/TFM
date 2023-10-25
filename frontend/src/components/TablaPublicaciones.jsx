import { useEffect, useState } from "react";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import Dialog from "@material-ui/core/Dialog";
import {
  DialogActions,
  DialogTitle,
  DialogContent,
  FormControl,
  FormLabel,
  FormGroup,
  FormControlLabel,
  Switch,
} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";

export const TablaPublicaciones = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [openWarning, setOpenWarning] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [fechaActual, setFechaActual] = useState(new Date());
  /*const [isLoading, setIsLoading] = useState(true);*/
  const [posts, setPosts] = useState([]);
  const [miembros, setMiembros] = useState([]);
  const [miembrosPost, setMiembrosPost] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [newPost, setNewPost] = useState({
    title: "",
    content: "",
    url: "",
    upload_time: "",
  });
  const [currentPostId, setCurrentPostId] = useState(null);
  const [eliminar, setEliminar] = useState(false);

  useEffect(() => {
    fetch("http://localhost:8000/api/posts")
      .then((response) => response.json())
      .then((data) => {
        setPosts(data);
        console.log(data);
      });
  }, []);

  useEffect(() => {
    fetch("http://localhost:8000/api/miembros")
      .then((response) => response.json())
      .then((data) => {
        setMiembros(data);
        console.log(data);
      });
  }, []);

  // GET miembros de una publicacion
  const getMiembros = (id) => {
    fetch(`http://localhost:8000/api/miembros_posts/post/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setMiembrosPost(data);
        console.log(data);
      })
      .then(() => {
        // Recargar los miembros después de actualizar uno
        fetch("http://localhost:8000/api/miembros")
          .then((response) => response.json())
          .then((data) => setMiembros(data));
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const postsFiltrados = posts.filter((post) =>
    post[1].toLowerCase().includes(busqueda.toLowerCase())
  );

  // Crear post
  const addPosts = async (post) => {
    await fetch("http://localhost:8000/api/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(post),
    }).then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    const data = await fetch("http://localhost:8000/api/posts")
      .then((response) => response.json())
      .then(async (data) => {
        console.log({ data });
        setPosts(data);
        return data;
      });
    miembrosPost.map(async (id_member) => {
      console.log(id_member[0]);
      console.log(posts);
      // Añadir los miembros enlazados al post en members_posts
      await fetch("http://localhost:8000/api/miembros_posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id_post: data[0][0],
          id_member: id_member[0],
        }),
      });
    });
    console.log({ data });

    console.log({ posts });
    setNewPost({
      title: "",
      content: "",
      url: "",
      upload_time: "",
    });
  };

  // Modificar publicacion
  const updatePost = (id, updatedPost) => {
    fetch(`http://localhost:8000/api/posts/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedPost),
    })
      .then(() => {
        // Recargar los posts después de actualizar uno
        fetch("http://localhost:8000/api/posts")
          .then((response) => response.json())
          .then((data) => setPosts(data));
      })
      .then(() => {
          console.log(miembrosPost);
          fetch(`http://localhost:8000/api/miembros_posts/put/${id}?posts=${miembrosPost}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
          })
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  // Borrar post
  const deletePost = (id) => {
    // Borramos la publicacion enlazada en los miembros
    fetch(`http://localhost:8000/api/miembros_posts/post/${id}`, {
      method: "DELETE",
    }).then(() => {
      // Borramos la publicacion
      fetch(`http://localhost:8000/api/posts/${id}`, {
        method: "DELETE",
      })
        .then(() => {
          // Recargar las publicaciones después de actualizar una
          fetch("http://localhost:8000/api/posts")
            .then((response) => response.json())
            .then((data) => setPosts(data));
          setEliminar(true);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    });
  };

  const handleAddDialogOpen = () => {
    setEditMode(false);
    setFechaActual(new Date());
    setMiembrosPost([]);
    setNewPost({
      title: "",
      content: "",
      url: "",
      upload_time: fechaActual.toISOString().slice(0, 19).replace("T", " "),
    });
    setOpenDialog(true);
  };
  const handleEditDialogOpen = (IdPost, postData) => {
    setEditMode(true);
    setFechaActual(new Date());
    getMiembros(IdPost);
    setCurrentPostId(IdPost);
    setNewPost({
      title: postData[1],
      content: postData[2],
      url: postData[3],
      upload_time: fechaActual.toISOString().slice(0, 19).replace("T", " "),
    });
    setOpenDialog(true);
  };
  const handleDialogClose = () => {
    setOpenDialog(false);
    setCurrentPostId(null);
  };

  const handleChange = (event) => {
    const { name, type, checked, value } = event.target;
    const newValue = type === "checkbox" ? checked : value;

    setNewPost((prevPost) => ({
      ...prevPost,
      [name]: newValue,
    }));
  };

  const handleSwitchChange = (event, key) => {
    if (event.target.checked) {
      setMiembrosPost([...miembrosPost, [key]]);
    } else {
      setMiembrosPost(miembrosPost.filter((selected) => selected[0] !== key));
    }
    console.log(miembrosPost);
  };

  const savePost = (post) => {
    if (editMode) {
      updatePost(currentPostId, post);
    } else {
      addPosts(post);
    }
    handleDialogClose();
    handleConfirmOpen();
  };

  const handleAlertOpen = () => {
    setOpenAlert(true);
  };
  const handleAlertClose = () => {
    setOpenAlert(false);
  };
  const handleConfirmOpen = () => {
    setOpenConfirm(true);
  };
  const handleConfirmClose = () => {
    setOpenConfirm(false);
    setEliminar(false);
  };
  const handleWarningOpen = (id) => {
    setCurrentPostId(id);
    setOpenWarning(true);
  };
  const handleWarningClose = () => {
    setOpenWarning(false);
    setCurrentPostId(null);
  };
  const handleWarningConfirm = () => {
    deletePost(currentPostId);
    setOpenWarning(false);
    setCurrentPostId(null);
  };

  return (
    <div>
      <div className="filtros">
        <label className="label-search">Buscar publicaciones:</label>
        <input
          type="text"
          placeholder="Introduce el título"
          className="input-search"
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        ></input>
        <button className="btn add" onClick={handleAddDialogOpen}>
          Añadir publicación
        </button>
      </div>
      <Dialog open={openDialog} onClose={handleDialogClose}>
        <DialogTitle className="d-title">
          {editMode ? "Editar publicación" : "Añadir publicación"}
        </DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            name="title"
            label="Título"
            type="text"
            fullWidth
            variant="outlined"
            value={newPost.title || ""}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="content"
            label="Descripción"
            type="text"
            fullWidth
            multiline
            rows={4}
            variant="outlined"
            value={newPost.content || ""}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="url"
            label="URL del vídeo"
            type="text"
            fullWidth
            multiline
            rows={4}
            variant="outlined"
            value={newPost.url || ""}
            onChange={handleChange}
          />
          <FormControl component="fieldset" variant="standard" margin="dense">
            <FormLabel component="legend">
              Miembros en la publicación:
            </FormLabel>
            <FormGroup>
              {miembros.map((item) => (
                <FormControlLabel
                  key={item[0]}
                  control={
                    <Switch
                      onChange={(event) => handleSwitchChange(event, item[0])}
                      name={item[1]}
                      checked={miembrosPost.some(
                        (element) => element[0] === item[0]
                      )}
                    />
                  }
                  label={item[1]}
                />
              ))}
            </FormGroup>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <button className="btn cancelar dialog" onClick={handleDialogClose}>
            Cancelar
          </button>
          <button
            className="btn confirmar dialog"
            onClick={() => {
              newPost.title && newPost.content
                ? savePost(newPost)
                : handleAlertOpen();
            }}
          >
            {editMode ? "Guardar" : "Añadir"}
          </button>
        </DialogActions>
      </Dialog>
      <Dialog open={openAlert} onClose={handleAlertClose}>
        <DialogTitle>Algunos de los campos están vacíos</DialogTitle>
        <DialogActions>
          <button
            className="btn confirmar dialog"
            onClick={() => {
              handleAlertClose();
            }}
          >
            Confirmar
          </button>
        </DialogActions>
      </Dialog>
      <Dialog open={openConfirm} onClose={handleConfirmClose}>
        <DialogTitle>
          Publicación{" "}
          {eliminar ? "eliminada" : editMode ? "editada" : "añadida"}
        </DialogTitle>
        <DialogActions>
          <button
            className="btn confirmar dialog"
            onClick={() => {
              handleConfirmClose();
            }}
          >
            Confirmar
          </button>
        </DialogActions>
      </Dialog>
      <Dialog open={openWarning} onClose={handleWarningClose}>
        <DialogTitle>¿Estás seguro de eliminar esta publicación?</DialogTitle>
        <DialogActions>
          <button className="btn cancelar dialog" onClick={handleWarningClose}>
            Cancelar
          </button>
          <button
            className="btn confirmar dialog"
            onClick={() => {
              handleWarningConfirm();
              handleConfirmOpen();
            }}
          >
            Confirmar
          </button>
        </DialogActions>
      </Dialog>
      <table className="tabla-datos">
        <tr>
          <th className="tabla-header">ID</th>
          <th className="tabla-header">Título</th>
          <th className="tabla-header">Descripción</th>
          <th className="tabla-header">URL</th>
          <th className="tabla-header">Fecha de subida</th>
        </tr>
        {postsFiltrados.map((post, key) => {
          return (
            <tr key={key}>
              <td className="tabla-celda">{post[0]}</td>
              <td className="tabla-celda">{post[1]}</td>
              <td className="tabla-celda">{post[2]}</td>
              <td className="tabla-celda">{post[3]}</td>
              <td className="tabla-celda">
                {post[4].substring(11, 16)} {post[4].substring(8, 10)}
                {post[4].substring(4, 8)}
                {post[4].substring(0, 4)}
              </td>
              <td className="tabla-celda">
                <button
                  className="btn editar"
                  onClick={() => {
                    handleEditDialogOpen(post[0], post);
                  }}
                >
                  <AiFillEdit className="icon" />
                </button>
              </td>
              <td className="tabla-celda">
                <button
                  className="btn eliminar"
                  onClick={() => {
                    handleWarningOpen(post[0]);
                  }}
                >
                  <AiFillDelete className="icon" />
                </button>
              </td>
            </tr>
          );
        })}
      </table>
    </div>
  );
};
