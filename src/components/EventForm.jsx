import { useContext, useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import { UserContext } from '../contextos/UserContext';
import { validateEventForm } from '../utils/formatters';

const EventForm = ({ onSubmit, event=null }) => {
    
  const { token } = useContext(UserContext);
  const [eventLocations, setEventLocations] = useState([]);
  const [formData, setFormData] = useState(() => ({
    name: event?.name || '',
    description: event?.description || '',
    id_event_location: event?.event_location?.id || '',
    start_date: event?.start_date ? new Date(event.start_date).toISOString().slice(0, 16) : '',
    duration_in_minutes: event?.duration_in_minutes || '',
    price: event?.price || '',
    enabled_for_enrollment: event?.enabled_for_enrollment ?? true,
    max_assistance: event?.max_assistance || ''
  }));

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const resp = await axios.get('/event-location', {
          headers: { Authorization: `Bearer ${token}` }
        });
        const locations = resp.data.event_locations || [];
        setEventLocations(locations);
      } catch (error) {
        console.error('Error al cargar ubicaciones:', error);
      }
    };
    fetchLocations();
  }, [token]);

  const hasChanges = useMemo(() => {
    if (!event) return true; // crear: no exigir cambios
    const original = {
      name: event.name,
      description: event.description,
      id_event_location: event.event_location?.id,
      start_date: new Date(event.start_date).toISOString().slice(0, 16),
      duration_in_minutes: event.duration_in_minutes,
      price: event.price,
      enabled_for_enrollment: event.enabled_for_enrollment,
      max_assistance: event.max_assistance
    };
    return (
      formData.name !== original.name ||
      formData.description !== original.description ||
      formData.id_event_location !== original.id_event_location ||
      formData.start_date !== original.start_date ||
      formData.duration_in_minutes !== original.duration_in_minutes ||
      formData.price !== original.price ||
      formData.enabled_for_enrollment !== original.enabled_for_enrollment ||
      formData.max_assistance !== original.max_assistance
    );
  }, [event, formData]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const formatCurrentValue = (field, value) => {
    switch (field) {
      case 'start_date':
        return new Date(value).toLocaleString('es-ES');
      case 'duration_in_minutes':
        const hours = Math.floor(value / 60);
        const minutes = value % 60;
        return hours > 0 ? `${hours}h ${minutes}min` : `${minutes}min`;
      case 'price':
        return value === 0 ? 'Gratis' : `$${value}`;
      case 'enabled_for_enrollment':
        return value ? 'Sí' : 'No';
      case 'max_assistance':
        return value || 'Sin límite';
      default:
        return value || 'No especificado';
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateEventForm(formData);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    if (!hasChanges) {
      setSubmitError('No se han realizado cambios');
      return;
    }

    setIsSubmitting(true);
    setSubmitError('');
    try {
      await onSubmit(formData);//funcion que se le pasa, puede ser para editar o para crear
    } catch (error) {
      console.error('Error al procesar formulario:', error);
      const status = error?.response?.status;
      const message = error?.response?.data?.message;
      if (status === 401) {
        setSubmitError('No tienes permisos para realizar esta acción');
      } else if (status === 404) {
        setSubmitError('Recurso no encontrado');
      } else {
        setSubmitError(message || 'Error al procesar la solicitud');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="edit-form">
      <div className="form-section">
        <h2 className="section-title">Información del Evento</h2>

        <div className="field-group">
          <div className="field-row">
            {event && (
              <div className="current-value">
                <label>Nombre actual:</label>
                <span>{event.name}</span>
              </div>
            )}
            <div className="new-value">
              <label htmlFor="name">Nombre:</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className={errors.name ? 'error' : ''}
              />
              {errors.name && <span className="error-text">{errors.name}</span>}
            </div>
          </div>
        </div>

        <div className="field-group">
          <div className="field-row">
            {event && (
              <div className="current-value">
                <label>Descripción actual:</label>
                <span>{event.description || 'Sin descripción'}</span>
              </div>
            )}
            <div className="new-value">
              <label htmlFor="description">Descripción:</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows="3"
                className={errors.description ? 'error' : ''}
              />
              {errors.description && <span className="error-text">{errors.description}</span>}
            </div>
          </div>
        </div>

        <div className="field-group">
          <div className="field-row">
            {event && (
              <div className="current-value">
                <label>Ubicación actual:</label>
                <span>{event.event_location?.name}</span>
              </div>
            )}
            <div className="new-value">
              <label htmlFor="id_event_location">Ubicación:</label>
              <select
                id="id_event_location"
                name="id_event_location"
                value={formData.id_event_location}
                onChange={handleInputChange}
                className={errors.id_event_location ? 'error' : ''}
              >
                <option value="">Seleccionar ubicación</option>
                {eventLocations.map((location) => (
                  <option key={location.id} value={location.id}>
                    {location.name} - {location.full_address}
                  </option>
                ))}
              </select>
              {errors.id_event_location && (
                <span className="error-text">{errors.id_event_location}</span>
              )}
            </div>
          </div>
        </div>

        <div className="field-group">
          <div className="field-row">
            {event && (
              <div className="current-value">
                <label>Fecha actual:</label>
                <span>{formatCurrentValue('start_date', event.start_date)}</span>
              </div>
            )}
            <div className="new-value">
              <label htmlFor="start_date">Fecha:</label>
              <input
                type="datetime-local"
                id="start_date"
                name="start_date"
                value={formData.start_date}
                onChange={handleInputChange}
                className={errors.start_date ? 'error' : ''}
              />
              {errors.start_date && <span className="error-text">{errors.start_date}</span>}
            </div>
          </div>
        </div>

        <div className="field-group">
          <div className="field-row">
            {event && (
              <div className="current-value">
                <label>Duración actual:</label>
                <span>{formatCurrentValue('duration_in_minutes', event.duration_in_minutes)}</span>
              </div>
            )}
            <div className="new-value">
              <label htmlFor="duration_in_minutes">Duración (minutos):</label>
              <input
                type="number"
                id="duration_in_minutes"
                name="duration_in_minutes"
                value={formData.duration_in_minutes}
                onChange={handleInputChange}
                min="15"
                max="1440"
                className={errors.duration_in_minutes ? 'error' : ''}
              />
              {errors.duration_in_minutes && (
                <span className="error-text">{errors.duration_in_minutes}</span>
              )}
            </div>
          </div>
        </div>

        <div className="field-group">
          <div className="field-row">
            {event && (
              <div className="current-value">
                <label>Precio actual:</label>
                <span>{formatCurrentValue('price', event.price)}</span>
              </div>
            )}
            <div className="new-value">
              <label htmlFor="price">Precio:</label>
              <input
                type="number"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                min="0"
                step="0.01"
                className={errors.price ? 'error' : ''}
              />
              {errors.price && <span className="error-text">{errors.price}</span>}
            </div>
          </div>
        </div>

        <div className="field-group">
          <div className="field-row">
            {event && (
              <div className="current-value">
                <label>Inscripciones habilitadas:</label>
                <span>{formatCurrentValue('enabled_for_enrollment', event.enabled_for_enrollment)}</span>
              </div>
            )}
            <div className="new-value">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  name="enabled_for_enrollment"
                  checked={formData.enabled_for_enrollment}
                  onChange={handleInputChange}
                />
                Habilitar inscripciones
              </label>
            </div>
          </div>
        </div>

        <div className="field-group">
          <div className="field-row">
            {event && (
              <div className="current-value">
                <label>Cupo máximo actual:</label>
                <span>{formatCurrentValue('max_assistance', event.max_assistance)}</span>
              </div>
            )}
            <div className="new-value">
              <label htmlFor="max_assistance">Cupo máximo:</label>
              <input
                type="number"
                id="max_assistance"
                name="max_assistance"
                value={formData.max_assistance}
                onChange={handleInputChange}
                min="1"
                className={errors.max_assistance ? 'error' : ''}
              />
              {errors.max_assistance && (
                <span className="error-text">{errors.max_assistance}</span>
              )}
            </div>
          </div>
        </div>
      </div>

      {submitError && <div className="alert-error">{submitError}</div>}

      <div className="form-actions">
        <button
          type="submit"
          className="btn-primary"
          disabled={isSubmitting || (!!event && !hasChanges)}
        >
          {isSubmitting ? 'Procesando...' : 'Guardar'}
        </button>
      </div>
    </form>
  );
};

export default EventForm; 