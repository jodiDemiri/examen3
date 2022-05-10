import React from 'react';
import Constantes from "./Constantes";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ContactsTable from './ContactsTable';
class ViewContacts extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            contacts: [],
        };
    }
    async componentDidMount() {
        const respuesta = await fetch(`${Constantes.RUTA_API}`);
        const contacts = await respuesta.json();
        this.setState({
            contacts: contacts,
        });
    }
    render() {
        return (
            <div>
                <div className="column">
                    <h1 className="is-size-3">See contacts</h1>
                    <ToastContainer></ToastContainer>
                </div>
                <div className="table-container">
                    <table className="table is-fullwidth is-bordered">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Phone Number</th>
                                <th>Birthday</th>
                                <th>Edit</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.contacts.map(contact => {
                                return <ContactsTable key={contact._id} contact={contact}></ContactsTable>;
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default ViewContacts;