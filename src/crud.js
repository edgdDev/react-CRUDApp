import React, {Component, Fragment} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container, Button, Table, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup} from 'reactstrap';


const datos = [
    {id: 1, nombre: 'Elvin', apellido: 'Guzman'},
    {id: 2, nombre: 'Warlin', apellido: 'Garcia'},
    {id: 3, nombre: 'Cristofer', apellido: 'Nuñez'},
    {id: 4, nombre: 'Joneiry', apellido: 'Guzman'},
    {id: 5, nombre: 'Andy', apellido: 'Rodriguez'}
]

class Crud extends Component {
 
    state = {
        data: datos,
        modalInsertar: false,
        modalEditar: false,
        form: {
            id: '',
            nombre: '',
            apellido: ''
        }
    }

    mostrarModalIsertar = () => {
        this.setState({modalInsertar: true});
    }

    cerrarModalIsertar = () => {
        this.setState({modalInsertar: false});
    }

    mostrarModalEditar = (dato) => {
        this.setState({modalEditar: true, form: dato});
    }

    cerrarModalEditar = () => {
        this.setState({modalEditar: false});
    }

    handleChange = (e) => {

        this.setState({
            form: {...this.state.form, [e.target.name]: e.target.value}
        })

    }

    insertar = () => {

        let valorNuevo = this.state.form;
        valorNuevo.id = this.state.data.length+1;
        let lista = this.state.data;
        lista.push(valorNuevo);

        this.setState({data: lista, modalInsertar: false});

    }

    editar = (dato) => {

        let iterador = 0;
        let arreglo = this.state.data;
        arreglo.map(elemento => {
            if (dato.id === elemento.id) {
                arreglo[iterador].nombre = dato.nombre;
                arreglo[iterador].apellido = dato.apellido;
            }
            iterador++;
        });
        this.setState({data: arreglo, modalEditar: false})
    }

    eliminar = (dato) => {

        let confirmar = window.confirm('Estás seguro eliminar este registro?');
        if (confirmar) {

            let iterador = 0;
            let arreglo = this.state.data;
            arreglo.map(elemento => {
                if (dato.id === elemento.id) {
                    arreglo.splice(iterador, 1);
                }
                iterador++;
            });
            this.setState({data: arreglo})

        }

    }
    

    render() {

        return (
           <Fragment>
            <Container>
                <br/>
                <Button color='primary' onClick={this.mostrarModalIsertar}>Insertar</Button>
                <br/>

                <Table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>NOMBRE</th>
                            <th>APELLIDO</th>
                            <th>OPCIONES</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.data.map(dato => (

                            <tr key={dato.id}>
                                <td>{dato.id}</td>
                                <td>{dato.nombre}</td>
                                <td>{dato.apellido}</td>
                                <td>
                                    <Button color='warning' onClick={ () => this.mostrarModalEditar(dato)}>Editar</Button> {''}
                                    <Button color='danger' onClick={() => this.eliminar(dato)}>Eliminar</Button>
                                </td>
                            </tr>


                        ))}
                    </tbody>
                </Table>

            </Container>

            {/*Modal para insertar*/}
            <Modal isOpen={this.state.modalInsertar}>
                <ModalHeader>
                    <h2>Insertar datos</h2>
                </ModalHeader>
                <ModalBody>

                    <FormGroup>
                        
                            <label>ID</label>
                            <input 
                                type='text'
                                className='form-control' 
                                readOnly 
                                value={this.state.data.length+1}>
                            </input>
                    </FormGroup>
                    <br/>
                    <FormGroup>
                            <label>Nombre</label>
                            <input 
                                type='text'
                                className='form-control'
                                name='nombre'
                                onChange={this.handleChange}>
                            </input>
                    </FormGroup>
                    <br/>
                    <FormGroup>
                            <label>Apellido</label>
                            <input 
                                type='text'
                                className='form-control'
                                name='apellido'
                                onChange={this.handleChange}>
                            </input>
                    </FormGroup> 
                    <br/>        
                    <ModalFooter>
                        <Button color='success' onClick={this.insertar}>Crear</Button>
                        <Button color='danger' onClick={this.cerrarModalIsertar}>Cancelar</Button>
                    </ModalFooter>       

                </ModalBody>
            </Modal>

             {/*Modal para actualizar*/}
             <Modal isOpen={this.state.modalEditar}>
                <ModalHeader>
                    <h2>Actualizar datos</h2>
                </ModalHeader>
                <ModalBody>

                    <FormGroup>
                        
                            <label>ID</label>
                            <input 
                                type='text'
                                className='form-control' 
                                readOnly 
                                value={this.state.form.id}
                                onChange={this.handleChange}>
                            </input>
                    </FormGroup>
                    <br/>
                    <FormGroup>
                            <label>Nombre</label>
                            <input 
                                type='text'
                                className='form-control'
                                name='nombre'
                                onChange={this.handleChange}
                                value={this.state.form.nombre}>
                            </input>
                    </FormGroup>
                    <br/>
                    <FormGroup>
                            <label>Apellido</label>
                            <input 
                                type='text'
                                className='form-control'
                                name='apellido'
                                onChange={this.handleChange}
                                value={this.state.form.apellido}>
                            </input>
                    </FormGroup> 
                    <br/>        
                    <ModalFooter>
                        <Button color='success' onClick={() => this.editar(this.state.form)}>Actualizar</Button>
                        <Button color='danger' onClick={this.cerrarModalEditar}>Cancelar</Button>
                    </ModalFooter>       

                </ModalBody>
            </Modal>
        </Fragment>
        );

    }

};

export default Crud;