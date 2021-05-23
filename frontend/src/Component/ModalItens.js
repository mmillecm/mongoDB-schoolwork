import React from 'react';
import Modal from 'react-bootstrap/Modal'
import InputGroup from 'react-bootstrap/InputGroup'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/esm/Button';
import api from '../services/api';



function ModalItens({ type, codigo, setCodigo, descricao, setdescricao, preco, setPreco, open, setOpen, id, setLoad }) {


    function handleEdit() {
        api.put(`/itens/${id}`, { codigo: codigo, descricao: descricao, preco: preco })
            .then(response => {
                setOpen(false)
                setLoad(false)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    function handleAdd() {
        api.post('/itens', { codigo: codigo, descricao: descricao, preco: preco })
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
                    <Modal.Title>{type} Item </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <InputGroup className="m-3">
                        <InputGroup.Prepend>
                            <InputGroup.Text id="basic-addon1">Codigo</InputGroup.Text>
                            <Form.Control
                                placeholder="Codigo"
                                aria-label="Codigo"
                                aria-describedby="basic-addon1"
                                value={codigo}
                                onChange={(e) => setCodigo(e.target.value)}
                            />
                        </InputGroup.Prepend>
                    </InputGroup>
                    <InputGroup className="m-3">
                        <InputGroup.Prepend>
                            <InputGroup.Text id="basic-addon1">Descrição</InputGroup.Text>
                            <Form.Control
                                placeholder="Descrição"
                                aria-label="Descrição"
                                aria-describedby="basic-addon1"
                                value={descricao}
                                onChange={(e) => setdescricao(e.target.value)}
                            />
                        </InputGroup.Prepend>
                    </InputGroup>
                    <InputGroup className="m-3">
                        <InputGroup.Prepend>
                            <InputGroup.Text id="basic-addon1">$</InputGroup.Text>
                            <Form.Control
                                placeholder="Preço"
                                aria-label="Preço"
                                aria-describedby="basic-addon1"
                                type="number"
                                value={preco}
                                onChange={(e) => setPreco(e.target.value)}
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

export default ModalItens;