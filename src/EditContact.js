import React from 'react';
import Constantes from "./Constantes";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, withRouter } from 'react-router-dom';
class EditContact extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            contact: {
                _id: "",
                "name": "",
                "phone": "",
                "birthday": "",
            },
        };
        // Indicarle a las funciones a quién nos referimos con "this"
        this.manejarCambio = this.manejarCambio.bind(this);
        this.manejarEnvioDeFormulario = this.manejarEnvioDeFormulario.bind(this);
    }
    async componentDidMount() {
        // Obtener ID de URL
        const idContact = this.props.match.params.id;
        // Llamar a la API para obtener los detalles
        const respuesta = await fetch(`${Constantes.RUTA_API}/${idContact}`);
        const contact = await respuesta.json();
        // "refrescar" el formulario
        this.setState({
            contact: contact,
        });
    }
    render() {
        return (
            <div className="column is-one-third">
                <h1 className="is-size-3">Edit contact</h1>
                <ToastContainer></ToastContainer>
                <form className="field" onSubmit={this.manejarEnvioDeFormulario}>
                    <div className="form-group">
                        <label className="label" htmlFor="nombre">Name:</label>
                        <input autoFocus required placeholder="Name" type="text" id="nombre" onChange={this.manejarCambio} value={this.state.contact.nombre} className="input" />
                    </div>
                    <div className="form-group">
                        <label className="label" htmlFor="phone">Phone:</label>
                        <input required placeholder="Phone" type="number" id="phone" onChange={this.manejarCambio} value={this.state.contact.phone} className="input" />
                    </div>
                    <div className="form-group">
                        <label className="label" htmlFor="birthday">Birthday:</label>
                        <input required placeholder="Birthday" type="number" id="birthday" onChange={this.manejarCambio} value={this.state.contact.birthday} className="input" />
                    </div>
                    <div className="form-group">
                        <button className="button is-success mt-2">Save</button>
                        &nbsp;
                        <Link to="/contacts/view" className="button is-primary mt-2">Go Back</Link>
                    </div>
                </form>
            </div>
        );
    }
    async manejarEnvioDeFormulario(evento) {

        evento.preventDefault();
        // Codificar nuestro contact como JSON

        const cargaUtil = JSON.stringify(this.state.contact);
        // ¡Y enviarlo!
        const respuesta = await fetch(`${Constantes.RUTA_API}/`, {
            method: "PUT",
            body: cargaUtil,
            headers: {
                "Content-Type": "application/json",
            }
        });
        const exitoso = await respuesta.json();
        if (exitoso) {
            toast('contact guardado', {
                position: "top-left",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });

        } else {
            toast.error("Error. Try again");
        }
    }
    manejarCambio(evento) {
        // Extraer la clave del estado que se va a actualizar, así como el valor
        const clave = evento.target.id;
        let valor = evento.target.value;
        this.setState(state => {
            const ContactSaved = state.contact;
            // Si es la calificación o el nombre, necesitamos castearlo a entero
            if (clave !== "name") {
                valor = parseFloat(valor);
            }
            // Actualizamos el valor del contact, solo en el campo que se haya cambiado
            ContactSaved[clave] = valor;
            return {
                contact: ContactSaved,
            }
        });
    }
}

export default withRouter(EditContact);