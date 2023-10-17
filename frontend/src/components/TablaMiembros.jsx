import { useEffect, useState } from "react";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import Dialog from "@material-ui/core/Dialog"
import { DialogActions, DialogTitle, DialogContent, MenuItem } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";


export const TablaMiembros = () => {

  const [openDialog, setOpenDialog] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [openWarning, setOpenWarning] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [editMode, setEditMode] = useState(false);
  /*const [isLoading, setIsLoading] = useState(true);*/
  const [miembros, setMiembros] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [newMiembro, setNewMiembro] = useState({
    member_name: "",
    descrip: "",
    birthday: "",
    zodiac: "",
    url: ""
  });
  const [currentMemberId, setCurrentMemberId] = useState(null);
  const [eliminar, setEliminar] = useState(false)

  useEffect(() => {
    fetch('http://localhost:8000/api/miembros')
      .then(response => response.json())
      .then(data => {
        setMiembros(data);
        console.log(data);
      });
  }, []);

  const miembrosFiltrados = miembros.filter(miembro => 
    miembro[1].toLowerCase().includes(busqueda.toLowerCase())
  );

  // Crear miembro
  const addMiembros = miembro => {
    fetch('http://localhost:8000/api/miembros', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(miembro),
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then(() => {
      // Recargar los miembros después de añadir uno nuevo
      fetch('http://localhost:8000/api/miembros')
        .then(response => response.json())
        .then(data => setMiembros(data));
          setNewMiembro({
            member_name: "",
            descrip: "",
            birthday: "",
            zodiac: "",
            url: ""
          });
    })
    .catch(error => {
      console.error('Error:', error);
    });
  };

  // Modificar miembro
  const updateMiembro = (id, updatedMiembro) => {
    fetch(`http://localhost:8000/api/miembros/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedMiembro),
    })
      .then(() => {
        // Recargar los clientes después de actualizar uno
        fetch('http://localhost:8000/api/miembros')
          .then(response => response.json())
          .then(data => setMiembros(data));
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  // Borrar miembro
  const deleteMiembro = id => {
    // Borramos el miembro enlazado en las publicaciones
    fetch(`http://localhost:8000/api/miembros_posts/miembro/${id}`, {
      method: 'DELETE',
    }).then(() => {
      // Borramos el miembro
      fetch(`http://localhost:8000/api/miembros/${id}`, {
      method: 'DELETE',
      }).then(() => {
        // Recargar los clientes después de actualizar uno
        fetch('http://localhost:8000/api/miembros')
          .then(response => response.json())
          .then(data => setMiembros(data));
          setEliminar(true)
      })
      .catch(error => {
        console.error('Error:', error);
      });
    });
  };

  const handleAddDialogOpen = () => {
    setEditMode(false);
    setNewMiembro({
      member_name: "",
      birthday: "",
      zodiac: "",
      descrip: "",
      url: "src/assets/members/placeholder.png"
    });
    setOpenDialog(true);
  };
  const handleEditDialogOpen = (IdMiembro, miembroData) => {
    setEditMode(true);
    setCurrentMemberId(IdMiembro);
    setNewMiembro({
      member_name: miembroData[1],
      birthday: miembroData[2],
      zodiac: miembroData[3],
      descrip: miembroData[4],
      url: miembroData[5]
    });
    setOpenDialog(true);
  };
  const handleDialogClose = () => {
    setOpenDialog(false);
    setCurrentMemberId(null);
  };

  const handleChange = (event) => {
    const { name, type, checked, value } = event.target;
    const newValue = type === 'checkbox' ? checked : value;

    setNewMiembro((prevMiembro) => ({
      ...prevMiembro,
      [name]: newValue,
    }));
  };

  const saveMiembro = miembro => {
    if (editMode) {
      updateMiembro(currentMemberId, miembro)
    } else {
      addMiembros(miembro)
    }
    handleDialogClose()
    handleConfirmOpen()
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
    setEliminar(false)
  };
  const handleWarningOpen = (id) => {
    setCurrentMemberId(id)
    setOpenWarning(true);
  };
  const handleWarningClose = () => {
    setOpenWarning(false);
    setCurrentMemberId(null)
  };
  const handleWarningConfirm = () => {
    deleteMiembro(currentMemberId)
    setOpenWarning(false);
    setCurrentMemberId(null)
  };

    return(
      <div>
        <div className="filtros">
          <label className="label-search">Buscar miembro:</label>
          <input type="text" placeholder="Introduce el nombre" className="input-search" value={busqueda} onChange={e => setBusqueda(e.target.value)}></input>
          <button className="btn add" onClick={handleAddDialogOpen}>Añadir miembro</button>
        </div>
        <Dialog open={openDialog} onClose={handleDialogClose}>
          <DialogTitle className="d-title">{editMode ? 'Editar miembro' : 'Añadir miembro'}</DialogTitle>
          <DialogContent>
            <TextField margin="dense" name="member_name" label="Nombre" type="text" inputProps={{ maxLength: 12 }} fullWidth variant="outlined" value={newMiembro.member_name || ''} onChange={handleChange} />            
            <TextField InputLabelProps={{ shrink: true }} margin="dense" name="birthday" label="Fecha de nacimiento" type="date" fullWidth variant="outlined" value={newMiembro.birthday || null} onChange={handleChange} />
              <TextField margin="dense" select name="zodiac" label={"Signo del zodiaco"} fullWidth variant="outlined" value={newMiembro.zodiac || ''} onChange={handleChange}>
                <MenuItem value='Capricornio'>Capricornio</MenuItem>
                <MenuItem value='Acuario'>Acuario</MenuItem>
                <MenuItem value='Piscis'>Piscis</MenuItem>
                <MenuItem value='Aries'>Aries</MenuItem>
                <MenuItem value='Tauro'>Tauro</MenuItem>
                <MenuItem value='Géminis'>Géminis</MenuItem>
                <MenuItem value='Cáncer'>Cáncer</MenuItem>
                <MenuItem value='Leo'>Leo</MenuItem>
                <MenuItem value='Virgo'>Virgo</MenuItem>
                <MenuItem value='Libra'>Libra</MenuItem>
                <MenuItem value='Escorpio'>Escorpio</MenuItem>
                <MenuItem value='Sagitario'>Sagitario</MenuItem>
              </TextField>
            <TextField margin="dense" name="descrip" label="Descripción" type="text" inputProps={{ maxLength: 300 }} fullWidth multiline rows={4} variant="outlined" value={newMiembro.descrip || ''} onChange={handleChange} />
          </DialogContent>
          <DialogActions>
            <button className="btn cancelar dialog" onClick={handleDialogClose}>Cancelar</button>
            <button className="btn confirmar dialog" onClick={() => { (newMiembro.member_name && newMiembro.birthday && newMiembro.zodiac && newMiembro.descrip) ? saveMiembro(newMiembro) : handleAlertOpen() }}>{editMode ? 'Guardar' : 'Añadir'}</button>
          </DialogActions>
        </Dialog>
        <Dialog open={openAlert} onClose={handleAlertClose}>
          <DialogTitle>Algunos de los campos están vacíos</DialogTitle>
          <DialogActions>
            <button className="btn confirmar dialog" onClick={() => {handleAlertClose()}}>Confirmar</button>
          </DialogActions>
        </Dialog>
        <Dialog open={openConfirm} onClose={handleConfirmClose}>
          <DialogTitle>Miembro {eliminar ? 'eliminado' : (editMode ? 'editado' : 'añadido')}</DialogTitle>
          <DialogActions>
            <button className="btn confirmar dialog" onClick={() => {handleConfirmClose()}}>Confirmar</button>
          </DialogActions>
        </Dialog>
        <Dialog open={openWarning} onClose={handleWarningClose}>
          <DialogTitle>¿Estás seguro de eliminar este miembro?</DialogTitle>
          <DialogActions>
            <button className="btn cancelar dialog" onClick={handleWarningClose}>Cancelar</button>
            <button className="btn confirmar dialog" onClick={() => { handleWarningConfirm(); handleConfirmOpen()}}>Confirmar</button>
          </DialogActions>
        </Dialog>
        <table className="tabla-datos">
            <tr>
                <th className="tabla-header">ID</th>
                <th className="tabla-header">Nombre</th>
                <th className="tabla-header">Fecha de nacimiento</th>
                <th className="tabla-header">Signo zodiacal</th>
                <th className="tabla-header">Descripción</th>
            </tr>
            {miembrosFiltrados.map((miembro, key) => {
                return (
                    <tr key={key}>
                        <td className="tabla-celda">{miembro[0]}</td>
                        <td className="tabla-celda">{miembro[1]}</td>
                        <td className="tabla-celda">{miembro[2]}</td>
                        <td className="tabla-celda">{miembro[3]}</td>
                        <td className="tabla-celda">{miembro[4]}</td>
                        <td className="tabla-celda">
                          <button className="btn editar" onClick={() =>  {handleEditDialogOpen(miembro[0], miembro)}}><AiFillEdit className="icon"/></button>
                        </td>
                        <td className="tabla-celda">
                          <button className="btn eliminar" onClick={() => {handleWarningOpen(miembro[0])}}><AiFillDelete className="icon"/></button>
                        </td>
                    </tr>
                )
            })}
        </table>
      </div>
    )
}