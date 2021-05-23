import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table'
import api from '../services/api';
import Button from 'react-bootstrap/Button'
import ModalItens from '../Component/ModalItens';
import ModalCliente from '../Component/ModalCliente';

function Home() {

    const [load, setLoad] = useState(false)
    const [itens, setItens] = useState();
    const [id, setId] = useState();
    const [codigo, setCodigo] = useState()
    const [descricao, setdescricao] = useState()
    const [preco, setPreco] = useState();
    const [openEdit, setOpenEdit] = useState(false);
    const [openCliente, setOpenCliente] = useState(false);
    const [type, setType] = useState();
    const [clientes, setClientes] = useState();
    const [nome, setNome] = useState();
    const [cpf, setCpf] = useState();
    const [telefone, setTelefone] = useState();

    useEffect(() => {
        api.get('/itens')
            .then(response => {
                setItens(response.data.itens)
            })
        api.get('/cliente')
            .then(response => {
                setClientes(response.data.cliente)
                setLoad(true)
            })
    }, [load])

    function handleDeleteItens(id) {
        api.delete(`/itens/${id}`)
            .then(response => {
                setLoad(false)
                console.log(response)
            })
            .catch((erro) => {
                console.log(erro.response)
            })
    }

    function handleDeleteCliente(id) {
        api.delete(`/cliente/${id}`)
            .then(response => {
                setLoad(false)
                console.log(response)
            })
            .catch((erro) => {
                console.log(erro.response)
            })
    }

    function handleEditItens(id, codigo, descricao, preco) {
        setId(id)
        setCodigo(codigo)
        setdescricao(descricao)
        setPreco(preco)
        setOpenEdit(true)
        setType("Editar")
    }
    function handleEditCliente(id, nome, cpf, telefone) {
        setId(id)
        setNome(nome)
        setCpf(cpf)
        setTelefone(telefone)
        setOpenCliente(true)
        setType("Editar")
    }

    function handleAdd() {
        setOpenEdit(true)
        setType("Adicionar")
    }
    function handleAddCliente() {
        setOpenCliente(true)
        setType("Adicionar")
    }


    return (
        <>
            {load ?
                <>
                    <div className="mb-5">
                        <h1>Itens</h1>
                        <Button onClick={handleAdd}>Adicionar Itens</Button>
                    </div>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Codigo</th>
                                <th>Descricao</th>
                                <th>Preço Unitario</th>
                                <th></th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {itens.map((item) =>
                                <tr>
                                    <td>{item.codigo}</td>
                                    <td>{item.descricao}</td>
                                    <td>{item.preco}</td>
                                    <td><Button variant="outline-warning" onClick={() => handleEditItens(item._id, item.codigo, item.descricao, item.preco)}>Editar</Button></td>
                                    <td><Button variant="outline-danger" onClick={() => handleDeleteItens(item._id)}>Deletar</Button></td>

                                </tr>
                            )}
                        </tbody>
                    </Table>

                    <div className="mb-5">
                        <h1>Cliente</h1>
                        <Button onClick={handleAddCliente}>Adicionar Clientes</Button>
                    </div>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Nome</th>
                                <th>CPF</th>
                                <th>Telefone</th>
                                <th></th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {clientes.map((cliente) =>
                                <tr>
                                    <td>{cliente.name}</td>
                                    <td>{cliente.cpf}</td>
                                    <td>{cliente.telefone}</td>
                                    <td><Button variant="outline-warning" onClick={() => handleEditCliente(cliente._id, cliente.name, cliente.cpf, cliente.telefone)}>Editar</Button></td>
                                    <td><Button variant="outline-danger" onClick={() => handleDeleteCliente(cliente._id)}>Deletar</Button></td>

                                </tr>
                            )}
                        </tbody>
                    </Table>
                </>

                : <h2>Carregando</h2>


            }
            <ModalItens
                type={type}
                codigo={codigo}
                setCodigo={setCodigo}
                descricao={descricao}
                setdescricao={setdescricao}
                preco={preco}
                setPreco={setPreco}
                open={openEdit}
                id={id}
                setOpen={setOpenEdit}
                setLoad={setLoad}
            />
            <ModalCliente
                type={type}
                setLoad={setLoad}
                id={id}
                setOpen={setOpenCliente}
                open={openCliente}
                nome={nome}
                cpf={cpf}
                telefone={telefone}
                setNome={setNome}
                setCpf={setCpf}
                setTelefone={setTelefone}
            />
        </>
    );
}

export default Home;