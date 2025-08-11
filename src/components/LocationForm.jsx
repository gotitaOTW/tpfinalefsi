import { useState } from 'react';

const LocationForm = ({ onSubmit, initialValues = null, submitLabel = 'Guardar' }) => {
  const [formData, setFormData] = useState({
    id_location: initialValues ? initialValues.id_location ?? '' : '',
    name: initialValues ? initialValues.name ?? '' : '',
    full_address: initialValues ? initialValues.full_address ?? '' : '',
    max_capacity: initialValues ? initialValues.max_capacity ?? '' : '',
    latitude: initialValues ? initialValues.latitude ?? '' : '',
    longitude: initialValues ? initialValues.longitude ?? '' : ''
  });

  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validateNumbers = () => {
    const newErrors = {};
    if (formData.id_location !== '' && isNaN(Number(formData.id_location))) newErrors.id_location = 'Debe ser un número';
    if (formData.max_capacity !== '' && isNaN(Number(formData.max_capacity))) newErrors.max_capacity = 'Debe ser un número';
    if (formData.latitude !== '' && isNaN(Number(formData.latitude))) newErrors.latitude = 'Debe ser un número';
    if (formData.longitude !== '' && isNaN(Number(formData.longitude))) newErrors.longitude = 'Debe ser un número';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const numErrors = validateNumbers();
    setErrors(numErrors);
    if (Object.keys(numErrors).length > 0) return;

    setSubmitting(true);
    try {
      await onSubmit(formData);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="edit-form">
      <div className="field-group">
        <label htmlFor="id_location">ID ubicación base (id_location)</label>
        <input
          id="id_location"
          name="id_location"
          type="number"
          value={formData.id_location}
          onChange={handleChange}
          placeholder={initialValues?.id_location?.toString() || ''}
          className={errors.id_location ? 'error' : ''}
        />
        {errors.id_location && <span className="error-text">{errors.id_location}</span>}
      </div>

      <div className="field-group">
        <label htmlFor="name">Nombre</label>
        <input
          id="name"
          name="name"
          type="text"
          value={formData.name}
          onChange={handleChange}
          placeholder={initialValues?.name || ''}
        />
      </div>

      <div className="field-group">
        <label htmlFor="full_address">Dirección completa</label>
        <input
          id="full_address"
          name="full_address"
          type="text"
          value={formData.full_address}
          onChange={handleChange}
          placeholder={initialValues?.full_address || ''}
        />
      </div>

      <div className="field-group">
        <label htmlFor="max_capacity">Capacidad máxima</label>
        <input
          id="max_capacity"
          name="max_capacity"
          type="number"
          value={formData.max_capacity}
          onChange={handleChange}
          placeholder={initialValues?.max_capacity?.toString() || ''}
          className={errors.max_capacity ? 'error' : ''}
        />
        {errors.max_capacity && <span className="error-text">{errors.max_capacity}</span>}
      </div>

      <div className="field-group">
        <label htmlFor="latitude">Latitud</label>
        <input
          id="latitude"
          name="latitude"
          type="number"
          step="any"
          value={formData.latitude}
          onChange={handleChange}
          placeholder={initialValues?.latitude?.toString() || ''}
          className={errors.latitude ? 'error' : ''}
        />
        {errors.latitude && <span className="error-text">{errors.latitude}</span>}
      </div>

      <div className="field-group">
        <label htmlFor="longitude">Longitud</label>
        <input
          id="longitude"
          name="longitude"
          type="number"
          step="any"
          value={formData.longitude}
          onChange={handleChange}
          placeholder={initialValues?.longitude?.toString() || ''}
          className={errors.longitude ? 'error' : ''}
        />
        {errors.longitude && <span className="error-text">{errors.longitude}</span>}
      </div>

      <div className="form-actions">
        <button type="submit" className="btn-primary" disabled={submitting}>
          {submitting ? 'Procesando…' : submitLabel}
        </button>
      </div>
    </form>
  );
};

export default LocationForm; 