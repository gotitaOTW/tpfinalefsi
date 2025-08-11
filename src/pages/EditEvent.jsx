import { useLocation, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../contextos/UserContext';
import axios from 'axios';
import '../styles/EditEvent.css';
import EventForm from '../components/EventForm';

const EditEvent = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { token } = useContext(UserContext);

  const event = state?.event;

  if (!event) {
    return <div className="edit-container"><h1>Evento no encontrado</h1></div>;
  }

  const onSubmit = async (formData) => {
    const data=[event.id,...formData];
    await axios.put(`/event`, data, {
      headers: { Authorization: `Bearer ${token}` }
    });
    window.alert(`El evento ${event.name} fue actualizado.`);
    navigate(`/event`, { state: { event } });
  };

  const onDelete = async () => {
    const confirmar = window.confirm(`¿Seguro que quieres eliminar el evento "${event.name}"?`);
    if (!confirmar) return;

    try {
      await axios.delete(`/event/${event.id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      window.alert(`El evento "${event.name}" fue eliminado con éxito.`);
      navigate('/events');
    } catch (error) {
      console.error(error);
      window.alert('Error al eliminar el evento. Por favor, inténtalo de nuevo.');
    }
  };

  return (
    <div className="edit-container">
      <div className="edit-card">
        <h1 className="edit-title">Editar Evento</h1>
        <EventForm onSubmit={onSubmit} event={event}/>
      </div>
      <button onClick={onDelete} className="delete-button">
          Eliminar Evento
        </button>
    </div>
  );
};

export default EditEvent;
