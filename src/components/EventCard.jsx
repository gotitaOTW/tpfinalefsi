import React from 'react';
import './EventCard.css';
import { useNavigate } from 'react-router-dom'; 
import { formatDate, formatDuration, formatPrice } from '../utils/formatters';

const EventCard = ({ event }) => {
    const navigate = useNavigate();
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
                onClick={() => navigate(`/events/${event.id}`, {state:  {event } })}
            >
                Quiero ir
            </button>
        </div>
    );
};

export default EventCard; 