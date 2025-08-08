import React from 'react';
import './EventCard.css';
import { useNavigate } from 'react-router-dom'; 

const EventCard = ({ event }) => {
    const navigate = useNavigate();

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('es-ES', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const formatDuration = (minutes) => {
        const hours = Math.floor(minutes / 60);
        const remainingMinutes = minutes % 60;
        
        if (hours > 0) {
            return `${hours}h ${remainingMinutes > 0 ? `${remainingMinutes}min` : ''}`;
        }
        return `${minutes}min`;
    };

    const formatPrice = (price) => {
        if (price === 0 || price === null) {
            return 'Gratis';
        }
        return `$${price}`;
    };

    return (
        <div className="event-card">
            <div className="event-header">
                <h3 className="event-name">{event.name}</h3>
                <span className="event-price">{formatPrice(event.price)}</span>
            </div>
            
            <div className="event-details">
                <div className="event-info">
                    <span className="event-duration">
                        ⏱️ {formatDuration(event.duration_in_minutes)}
                    </span>
                    <span className="event-date">
                        📅 {formatDate(event.start_date)}
                    </span>
                </div>
                
                {event.description && (
                    <p className="event-description">{event.description}</p>
                )}
            </div>
            
            <button 
                className="ir-boton"
                onClick={() => navigate(`/events/${event.id}`)}
            >
                Quiero ir
            </button>
        </div>
    );
};

export default EventCard; 