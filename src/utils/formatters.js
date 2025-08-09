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


