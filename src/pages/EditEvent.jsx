import { useLocation, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../contextos/UserContext';
import api from '../api';
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
    try {
      const payload = { id: event.id, ...formData };
      await api.put(`/event/`, payload, {
        headers: { Authorization: `Bearer ${token}` }
      });
      window.alert(`El evento ${event.name} fue actualizado.`);
      navigate(`/event`, { state: { event } });
    } catch (error) {
      console.error(error);
      window.alert('Error al editar evento. Por favor, inténtalo de nuevo.');
    }
    
  };

  const onDelete = async () => {
    const confirmar = window.confirm(`¿Seguro que quieres eliminar el evento "${event.name}"?`);
    if (!confirmar) return;

    try {
      await api.delete(`/event/${event.id}`, {
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
          Eliminar
        </button>
    </div>
  );
};

export default EditEvent;
