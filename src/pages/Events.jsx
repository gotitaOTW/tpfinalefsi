import { useEffect, useState } from "react";    
import api from "../api";
import EventCard from "../components/EventCard";
import "../styles/Events.css";

const Events = () => {
    const [events, setEvents] = useState(null);
    const [filtros, setFiltros] = useState({
        name: '',
        startdate: '',
        tag: '',
        page: 1,
        size: 10,
    });

    const buildQuery = () => {
        const params = new URLSearchParams();
        if (filtros.name) params.append('name', filtros.name);
        if (filtros.startdate) params.append('startdate', filtros.startdate);
        if (filtros.tag) params.append('tag', filtros.tag);
        if (filtros.page) params.append('page', String(filtros.page));
        if (filtros.size) params.append('size', String(filtros.size));
        const qs = params.toString();
        return qs ? `/event/?${qs}` : '/event/';
    };

    const fetchEvents = async () => {
        try {
            const url = buildQuery();
            const response = await api.get(url);
            const list = response.data?.events || response.data?.returnArray || response.data;
            setEvents(Array.isArray(list) ? list : []);
        } catch (error) {
            console.error('Error trayendo eventos:', error);
            setEvents([]);
        }
    };
    
    useEffect(() => { fetchEvents(); }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFiltros(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetchEvents();
    };

    const getMinDate = () => {
        const today = new Date();
        return today.toISOString().split('T')[0];
    };

    if (!events) {
        return <div>Cargando eventos...</div>;
    }

    return (
        <div className="events-container">
            <form onSubmit={handleSubmit} className="filters-form">
                <div className="search-container"> 
                    <div className="input-group">
                        <input
                            type="text"
                            name="name"
                            value={filtros.name}
                            onChange={handleInputChange}
                            placeholder="Buscar eventos..."
                            className="search-input"
                        />
                        <span className="search-icon">🔍</span>
                    </div>
                    <div className="input-group">
                        <input
                            type="date"
                            name="startdate"
                            value={filtros.startdate}
                            onChange={handleInputChange}
                            min={getMinDate()}
                            className="date-input"
                        />
                    </div>
                    <div className="input-group">
                        <input
                            type="text"
                            name="tag"
                            value={filtros.tag}
                            onChange={handleInputChange}
                            placeholder="Tag"
                            className="search-input"
                        />
                    </div>

                    <button type="submit" className="filter-btn">
                        Filtrar
                    </button>
                </div>
            </form>
            
            <div className="events-list">
                {events.map((event) => (
                       <EventCard 
                        key={event.id} 
                        event={event} 
                    /> 
                ))}
            </div>
        </div>
    );
};

export default Events;