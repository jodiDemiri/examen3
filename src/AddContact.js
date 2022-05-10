import React from 'react';
import Constantes from "./Constantes";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
class AddContact extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            contact: {
                "name": "",
                "phone": "",
                "birthday": "",
            },
        };
        // Indicarle a las funciones a quién nos referimos con "this"
        this.manejarCambio = this.manejarCambio.bind(this);
        this.manejarEnvioDeFormulario = this.manejarEnvioDeFormulario.bind(this);
    }
    render() {
        return (
            <div className="column is-one-third">
                <h1 className="is-size-3">Add Contact</h1>
                <ToastContainer></ToastContainer>
                <form className="field" onSubmit={this.manejarEnvioDeFormulario}>
                    <div className="form-group">
                        <label className="label" htmlFor="nombre">Name:</label>
                        <input autoFocus required placeholder="Name" type="text" id="nombre" onChange={this.manejarCambio} value={this.state.contact.nombre} className="input" />
                    </div>
                    <div className="form-group">
                        <label className="label" htmlFor="precio">Phone Number:</label>
                        <input required placeholder="Number" type="number" id="precio" onChange={this.manejarCambio} value={this.state.contact.phone} className="input" />
                    </div>
                    <div className="form-group">
                        <label className="label" htmlFor="calificacion">Birthday:</label>
                        <input required placeholder="Birthday" type="number" id="calificacion" onChange={this.manejarCambio} value={this.state.contact.birthday} className="input" />
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
        const respuesta = await fetch(`${Constantes.RUTA_API}`, {
            method: "POST",
            body: cargaUtil,
            headers: {
                "Content-Type":"application/json",
            }
        });
        const exitoso = await respuesta.json();
        if (exitoso) {
            toast('contact guardado ', {
                position: "top-left",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            this.setState({
                contact: {
                    name: "",
                    phone: "",
                    birthday: "",
                }
            });
        } else {
            toast.error("Error guardando. Intenta de nuevo");
        }
    }
    manejarCambio(evento) {
        const clave = evento.target.id;
        let valor = evento.target.value;
        this.setState(state => {
            const ContactSaved = state.contact;
            if (clave !== "name") {
                valor = parseFloat(valor);
            }
            ContactSaved[clave] = valor;
            return {
                contact: ContactSaved,
            }
        });
    }
}

export default AddContact;