import EventForm from "../components/EventForm";
import api from '../api';
import { useContext } from 'react';
import { UserContext } from '../contextos/UserContext';

const CreateEvent = () => {
    const { token } = useContext(UserContext);

    const onSubmit = async (formData) =>{
        try {
            await api.post('/event/', formData,{headers:{Authorization: `Bearer ${token}`}});
            window.alert(`Evento ${formData.name} agregado!`);
        } catch (error) {
            window.alert(`Evento ${formData.name} no pudo ser agregado. Reintentar.`);
            console.error(error);
        }
    }
    return(
    <>
        <EventForm onSubmit={onSubmit}/>
    </>
    )
}

export default CreateEvent