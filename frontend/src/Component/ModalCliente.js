import React from 'react';
import Modal from 'react-bootstrap/Modal'
import InputGroup from 'react-bootstrap/InputGroup'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/esm/Button';
import api from '../services/api';



function ModalCliente({ type, nome, setNome, cpf, setCpf, telefone, setTelefone, open, setOpen, id, setLoad }) {


    function handleEdit() {
        api.put(`/cliente/${id}`, { name: nome, cpf: cpf, telefone: telefone })
            .then(response => {
                setOpen(false)
                setLoad(false)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    function handleAdd() {
        api.post('/cliente', { name: nome, cpf: cpf, telefone: telefone })
            .then(response => {
                setOpen(false)
                setLoad(false)
            })
            .catch((error) => {
                console.log(error)
            })
    }
    return (
        <>
            <Modal show={open} onHide={(e) => setOpen(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>{type} Cliente </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <InputGroup className="m-3">
                        <InputGroup.Prepend>
                            <InputGroup.Text id="basic-addon1">Nome</InputGroup.Text>
                            <Form.Control
                                placeholder="Nome"
                                aria-label="Nome"
                                aria-describedby="basic-addon1"
                                value={nome}
                                onChange={(e) => setNome(e.target.value)}
                            />
                        </InputGroup.Prepend>
                    </InputGroup>
                    <InputGroup className="m-3">
                        <InputGroup.Prepend>
                            <InputGroup.Text id="basic-addon1">CPF</InputGroup.Text>
                            <Form.Control
                                placeholder="CPF"
                                aria-label="CPF"
                                aria-describedby="basic-addon1"
                                value={cpf}
                                onChange={(e) => setCpf(e.target.value)}
                            />
                        </InputGroup.Prepend>
                    </InputGroup>
                    <InputGroup className="m-3">
                        <InputGroup.Prepend>
                            <InputGroup.Text id="basic-addon1">Telefone</InputGroup.Text>
                            <Form.Control
                                placeholder="Telefone"
                                aria-label="Telefone"
                                aria-describedby="basic-addon1"
                                value={telefone}
                                onChange={(e) => setTelefone(e.target.value)}
                            />
                        </InputGroup.Prepend>
                    </InputGroup>
                    {type === "Editar" ?
                        <Button onClick={handleEdit}>{type}</Button> :
                        <Button onClick={handleAdd}>{type}</Button>}

                </Modal.Body>
            </Modal>
        </>
    );
}

export default ModalCliente;