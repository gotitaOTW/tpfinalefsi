import { useContext, useEffect, useState } from "react";    
import api from "../api";
import axios from 'axios';
import EventCard from "../components/EventCard";
import "../styles/Events.css";
import { UserContext } from "../contextos/UserContext";
import { UserContext } from "../contextos/UserContext";


const Events = () => {
    const [events, setEvents] = useState(null);
    const [filtros, setFiltros] = useState({
        name: '',
        startdate: '',
    });
    const {userId} = useContext(UserContext); 

    const fetchEvents = async () => {//traer eventos
        try {
            const response = await axios.get(`/event${filtros.name || filtros.startdate ? `?name=${filtros.name}&startdate=${filtros.startdate}` : '' }`);
            const eventsApi = response.data.returnArray;
            const enabledEvents = eventsApi.filter((ev)=>ev.enabled_for_enrollment);
            setEvents(enabledEvents);
        } catch (error) {
            console.error('Error trayendo eventos:', error);
        }
    };
    
    useEffect(() => fetchEvents(), []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFiltros(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const filtrarAEventosPropios=()=>{
        const eventosPropios=events.filter((e)=>e.id_creator_user===userId);
        setEvents(eventosPropios);
    }

    const handleToggleMyEvents = (e) => {
        const checked = e.target.checked;
        if(checked){
            filtrarAEventosPropios();
        }
        else{
            fetchEvents();
        }
    };

    const validarFecha = (startdate) => {
        if (startdate) {
            const selectedDate = new Date(startdate);
            const hoy = new Date();
            hoy.setHours(0, 0, 0, 0);
            
            if (selectedDate < hoy) {
                return 'No se pueden seleccionar fechas pasadas';
            }
        }
        return null;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const dateError = validarFecha(filtros.startdate);

        if (dateError) { 
            alert(dateError);
        }
        else{
            fetchEvents();
        }
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
            {/* form */}
            <form onSubmit={handleSubmit} className="filters-form">
                <div className="search-container"> 
                    {/* contenedor de filtros */}
                    {/* por texto */}
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
                    {/* por fecha */}
                    <div className="input-group">
                        <input
                            type="date"
                            name="startdate"
                            value={filtros.startdate}
                            onChange={handleInputChange}
                            min={getMinDate()}// fecha minima
                            className="date-input"
                        />
                    </div>
                    {/* Mis eventos (checkbox estilizado) */}
                    <div className="input-group">
                        <div className="toggle">
                            <input
                                id="myEvents"
                                type="checkbox"
                                className="toggle-input"
                                onChange={handleToggleMyEvents}
                            />
                            <label htmlFor="myEvents" className="toggle-pill">
                                <span className="toggle-dot" />
                                Mis eventos
                            </label>
                        </div>
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