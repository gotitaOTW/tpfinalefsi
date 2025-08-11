import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../contextos/UserContext';
import api from '../api';
import UbicacionesList from '../components/UbicacionesList';
import LocationForm from '../components/LocationForm';

const Ubicaciones = () => {
  const { token, userId } = useContext(UserContext);
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [showCreate, setShowCreate] = useState(false);
  const [editing, setEditing] = useState(null);
  const [message, setMessage] = useState('');

  const fetchLocations = async () => {
    setLoading(true);
    setError('');
    try {
      const resp = await api.get('/event-location', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const list = resp.data?.event_locations || resp.data?.returnArray || resp.data || [];
      setLocations(Array.isArray(list) ? list : []);
    } catch (err) {
      console.error(err);
      setError(err?.response?.data?.message || 'Error al cargar ubicaciones');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) fetchLocations();
  }, [token]);

  const handleDelete = async (loc) => {
    const ok = window.confirm(`¿Eliminar ubicación "${loc.name}"?`);
    if (!ok) return;
    setMessage('');
    try {
      const resp = await api.delete(`/event-location/${loc.id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMessage(resp?.data?.message || 'Ubicación eliminada');
      await fetchLocations();
    } catch (err) {
      console.error(err);
      setMessage(err?.response?.data?.message || 'Error al eliminar');
    }
  };

  const handleStartEdit = (loc) => {
    setEditing(loc);
    setShowCreate(false);
    setMessage('');
  };

  const handleCancelEdit = () => {
    setEditing(null);
  };

  const submitEdit = async (formValues) => {
    if (!editing) return;

    const payload = {
      id: editing.id,
      id_location: formValues.id_location !== '' ? Number(formValues.id_location) : editing.id_location,
      name: formValues.name !== '' ? formValues.name : editing.name,
      full_address: formValues.full_address !== '' ? formValues.full_address : editing.full_address,
      max_capacity: formValues.max_capacity !== '' ? Number(formValues.max_capacity) : editing.max_capacity,
      latitude: formValues.latitude !== '' ? Number(formValues.latitude) : editing.latitude,
      longitude: formValues.longitude !== '' ? Number(formValues.longitude) : editing.longitude,
    };

    setMessage('');
    try {
      const resp = await api.put('/event-location/', payload, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMessage(resp?.data?.message || 'Ubicación actualizada');
      setEditing(null);
      await fetchLocations();
    } catch (err) {
      console.error(err);
      setMessage(err?.response?.data?.message || 'Error al actualizar');
      throw err;
    }
  };

  const submitCreate = async (formValues) => {
    const required = ['id_location','name','full_address','max_capacity','latitude','longitude'];
    const missing = required.filter(k => formValues[k] === '' || formValues[k] === null || formValues[k] === undefined);
    if (missing.length > 0) {
      window.alert('Complete todos los campos para crear la ubicación');
      return;
    }

    const payload = {
      id_location: Number(formValues.id_location),
      name: formValues.name,
      full_address: formValues.full_address,
      max_capacity: Number(formValues.max_capacity),
      latitude: Number(formValues.latitude),
      longitude: Number(formValues.longitude),
    };

    setMessage('');
    try {
      const resp = await api.post('/event-location/', payload, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMessage(resp?.data?.message || 'Ubicación creada');
      setShowCreate(false);
      await fetchLocations();
    } catch (err) {
      console.error(err);
      setMessage(err?.response?.data?.message || 'Error al crear');
      throw err;
    }
  };

  if (loading) return <div>Cargando ubicaciones…</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="events-container">
      <div className="filters-form" style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <button className="btn-primary" onClick={() => { setShowCreate(true); setEditing(null); setMessage(''); }}>Agregar ubicación</button>
      </div>

      {message && (
        <div style={{ margin: '12px 0' }}>{message}</div>
      )}

      {showCreate && (
        <div className="edit-card">
          <h2>Crear ubicación</h2>
          <LocationForm onSubmit={submitCreate} submitLabel="Crear" />
        </div>
      )}

      {editing && (
        <div className="edit-card">
          <h2>Editando: {editing.name}</h2>
          <LocationForm onSubmit={submitEdit} initialValues={editing} submitLabel="Guardar cambios" />
          <div className="form-actions" style={{ marginTop: 8 }}>
            <button className="delete-button" onClick={handleCancelEdit}>Cancelar</button>
          </div>
        </div>
      )}

      <UbicacionesList
        locations={locations}
        userId={userId}
        onEdit={handleStartEdit}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default Ubicaciones; 