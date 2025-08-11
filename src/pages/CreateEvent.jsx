import EventForm from "../components/EventForm";
import axios from axios;
const CreateEvent = () => {
    const onSubmit = (formData) =>{
        try {
            axios.post('/event', formData,{headers:{Authorization: `Bearer ${token}`}});
            windows.alert(`Evento ${formData.name} agregado!`);
        } catch (error) {
            windows.alert(`Evento ${formData.name} no puedo ser agregado. Reintentar.`);
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