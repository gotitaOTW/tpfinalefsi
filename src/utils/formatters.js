export const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

export const formatDuration = (minutes) => {
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  if (hours > 0) {
    return `${hours}h ${remainingMinutes > 0 ? `${remainingMinutes}min` : ''}`;
  }
  return `${minutes}min`;
};

export const formatPrice = (price) => {
  if (price === 0 || price === null) {
    return 'Gratis';
  }
  return `$${price}`;
};

export const validateEventForm = (formData) => {
  const errors = {};
  
  // Validar nombre
  if (!formData.name.trim()) {
    errors.name = 'El nombre es requerido';
  } else if (formData.name.trim().length < 3) {
    errors.name = 'El nombre debe tener al menos 3 caracteres';
  }
  
  // Validar descripción
  if (formData.description && formData.description.length > 500) {
    errors.description = 'La descripción no puede exceder 500 caracteres';
  }
  
  // Validar ubicación
  if (!formData.id_event_location) {
    errors.id_event_location = 'Debe seleccionar una ubicación';
  }
  
  // Validar fecha
  if (!formData.start_date) {
    errors.start_date = 'La fecha es requerida';
  } else {
    const selectedDate = new Date(formData.start_date);
    const now = new Date();
    if (selectedDate <= now) {
      errors.start_date = 'La fecha debe ser futura';
    }
  }
  
  // Validar duración
  if (!formData.duration_in_minutes) {
    errors.duration_in_minutes = 'La duración es requerida';
  } else if (formData.duration_in_minutes < 15) {
    errors.duration_in_minutes = 'La duración mínima es 15 minutos';
  } else if (formData.duration_in_minutes > 1440) {
    errors.duration_in_minutes = 'La duración máxima es 24 horas (1440 minutos)';
  }
  
  // Validar precio
  if (formData.price < 0) {
    errors.price = 'El precio no puede ser negativo';
  }
  
  // Validar cupo máximo
  if (formData.max_assistance && formData.max_assistance < 1) {
    errors.max_assistance = 'El cupo máximo debe ser mayor a 0';
  }
  
  return errors;
};


