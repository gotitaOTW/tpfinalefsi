import React from 'react';

const UbicacionesList = ({ locations, userId, onEdit, onDelete }) => {
  if (!locations || locations.length === 0) {
    return <div>No hay ubicaciones.</div>;
  }

  return (
    <div className="events-list">
      {locations.map((loc) => (
        <div key={loc.id} className="event-card">
          <div className="event-header">
            <h3 className="event-name">{loc.name}</h3>
          </div>

          <div className="event-details">
            <div className="event-info">
              <span>Dirección: {loc.full_address || '—'}</span>
            </div>
            <div className="event-info">
              <span>Capacidad: {loc.max_capacity ?? '—'}</span>
            </div>
            <div className="event-info">
              <span>Coordenadas: {loc.latitude ?? '—'}, {loc.longitude ?? '—'}</span>
            </div>
            <div className="event-info">
              <span>ID location base: {loc.id_location ?? '—'}</span>
            </div>
          </div>

          {loc.id_creator_user === userId && (
            <div className="form-actions" style={{ display: 'flex', gap: '8px' }}>
              <button className="btn-primary" onClick={() => onEdit(loc)}>Editar</button>
              <button className="delete-button" onClick={() => onDelete(loc)}>Eliminar</button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default UbicacionesList; 