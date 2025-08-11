import { useLocation } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { UserContext, UserProvider } from '../contextos/UserContext';
import '../styles/DetailEvent.css';
import { formatDate, formatDuration, formatPrice } from '../utils/formatters';
import axios from 'axios'

const DetailEvent = () => {
    const [isBusy,setIsBusy]=useState(false);
    const [errorMsj, setErrorMsj] = useState(null);
    const [isEnrolled,setIsEnrolled] = useState(null);
  const { state } = useLocation();
  const event = state.event;
  const creatorUsername = event.creator_user.username;
  const evLoc = event.event_location;
  const evLocName = evLoc.name;
  const evLocAddress = evLoc.full_address;
  const evLocLocationName = evLoc.location.name;
  const evLocProvinceName = evLoc.location.province.name;
  const {token, userId} = useContext(UserContext);

    const fetchSub = async ()=>{
        const respuesta = await axios.get(`/event/sub?idUsuario=${userId}&idEvento=${event.id}`);
        setIsEnrolled(respuesta.data.subscribed); 
    }
    
  useEffect(()=>{fetchSub},[]);

  if(!event)return <h1>Event not found</h1>

  const handleToggleInscripcion = async () => {
    try {
      setIsBusy(true);
      if(!isEnrolled){
        const respuesta = await axios.post(`/event/${event.id}/enrollment`,{},{headers:{Authorization:`Bearer ${token}`}});
        setIsEnrolled(true);
      }
      else{
        const respuesta = await axios.delete(`/event/${event.id}/enrollment`,{},{headers:{Authorization:`Bearer ${token}`}});
        setIsEnrolled(false);
      }
      setErrorMsj(null);
    } catch (err) {
      const status = err.response?.status;
      const backendMsg = err.response?.data?.message;
    
      if (status === 400) {
        setErrorMsj(backendMsg || 'Solicitud inválida.');
      } else if (status === 401) {
        setErrorMsj('Tenés que iniciar sesión para inscribirte.');
      } else if (status === 404) {
        setErrorMsj('Evento no encontrado.');
      } else {
        setErrorMsj('Algo salió mal. Intentalo de nuevo.');
      }
    }finally{
      setIsBusy(false);
    }
  };

  return (
    <div className="detail-container">
      <div className="detail-card">
        <h1 className="detail-title">{event.name}</h1>

        {event.description && (
          <p className="detail-description">{event.description}</p>
        )}

        <div className="detail-section">
          <div className="detail-grid">
            <div className="detail-item">
              <div className="detail-label">Fecha</div>
              <div className="detail-value">{formatDate(event.start_date)}</div>
            </div>
            <div className="detail-item">
              <div className="detail-label">Duración</div>
              <div className="detail-value">{formatDuration(event.duration_in_minutes)}</div>
            </div>
            <div className="detail-item">
              <div className="detail-label">Precio</div>
              <div className="detail-value">{formatPrice(event.price)}</div>
            </div>
            <div className="detail-item">
              <div className="detail-label">Cupo máximo</div>
              <div className="detail-value">{event.max_assistance ?? '-'}</div>
            </div>
            <div className="detail-item">
              <div className="detail-label">Creador</div>
              <div className="detail-value">{creatorUsername}</div>
            </div>
          </div>
        </div>

        <div className="detail-section">
          <h2 className="detail-subtitle">Ubicación</h2>
          <div className="detail-grid">
            <div className="detail-item">
              <div className="detail-label">Lugar</div>
              <div className="detail-value">{evLocName}</div>
            </div>
            <div className="detail-item">
              <div className="detail-label">Dirección</div>
              <div className="detail-value">{evLocAddress}</div>
            </div>
            <div className="detail-item">
              <div className="detail-label">Localidad</div>
              <div className="detail-value">{evLocLocationName}</div>
            </div>
            <div className="detail-item">
              <div className="detail-label">Provincia</div>
              <div className="detail-value">{evLocProvinceName}</div>
            </div>
          </div>
        </div>

        {token && userId === event.creator_user.id && (
          <button 
            className="btn-secondary" 
            onClick={() => navigate('/edit-event', { 
              state: { 
                event: event
              } 
            })}
            style={{ marginBottom: '10px' }}
          >
            Editar
          </button>
        )}
        

        <div className="detail-actions">
          <button disabled={isBusy} className="btn-primary" onClick={handleToggleInscripcion}>
            {isBusy ? 'Procesando...' : isEnrolled ? 'Desinscribirme' : 'Inscribirme'}
          </button>
        </div>
        {errorMsj && <div className="alert-error">{errorMsj}</div>}
      </div>
    </div>
  );
};

export default DetailEvent;