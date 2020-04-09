import React, { Component } from 'react'
import Header from './header'
import { Button } from 'react-bootstrap'
import { buscarDadosNaApi } from '../util/api'
import { ajustarPreco, vinhosComprados as listarVinhos, ajustarCpf } from '../util/functions'

export default class ClientesFieis extends Component {
    constructor(props) {
        super(props)
        this.cpfAjustado = []
        this.state = {
            listaClientes: [],
            listaCompras: [],
            clientesFieis: [],
            exibirVinhosComprados: false,
            exibirVinhosRecomendados: false
        }
    }

    componentWillMount() {
        buscarDadosNaApi(this)
    }

    componentDidUpdate(prevProps, prevState) {
        const { listaClientes } = this.state
        if(prevState.listaCompras !== this.state.listaCompras) {
            listaClientes.map(cliente => this.montarCliente(cliente))
            this.setState({ clientesFieis:  this.buscarClientesFieis(this.cpfAjustado) })
        }
    }

    montarCliente(cliente) {
        this.cpfAjustado.push({nome: cliente.nome,cpf: cliente.cpf})
    }

    buscarClientesFieis(clientes) {
        this.filtroDosClientesFieis = []
        const { listaCompras } = this.state 
        for (let i = 0; i < clientes.length; i++) {
            let count = 0
            let countItens = 0
            for (let j = 0; j < listaCompras.length; j++) {
                let cpfAjustado = ajustarCpf( clientes[i].cpf)
                if (cpfAjustado === listaCompras[j].cliente) {
                    countItens += listaCompras[j].itens.length
                    count++
                }
            }
            if (count > 5) {
                clientes[i].qtdVezesComprou = count
                clientes[i].qtdItensComprou = countItens
                this.filtroDosClientesFieis.push(clientes[i])
            }
        }
        return this.filtroDosClientesFieis
    }

    render() {
        const { clientesFieis, vinhosComprados, exibirVinhosComprados } = this.state

        return (
            <div className='container'>
                <Header />
                <br/><h1>Clientes mais fieis</h1><br/>
                <ul className='list-group'>
                {clientesFieis.map(cliente => 
                    <div key={cliente.cpf}>
                        <li className='list-group-item'>Nome do Cliente: {cliente.nome}</li>
                        <li className='list-group-item'>CPF: {cliente.cpf}</li>
                        <li className='list-group-item'>Comprou {cliente.qtdVezesComprou} vezes na loja</li>
                        <li className='list-group-item'>Comprou {cliente.qtdItensComprou} vinhos na loja</li>
                        <li className='list-group-item'><Button onClick={() => listarVinhos(cliente, this.state.listaCompras,this)} variant='primary'>Vinhos Comprados</Button></li>
                        {exibirVinhosComprados && vinhosComprados.nomeCliente === cliente.nome ? 
                            vinhosComprados.nomeProduto.map( (produto, index) => 
                            <li key={index} className='list-group-item'>Vinho: {produto.produto} | Categoria: {produto.categoria} | Safra: {produto.safra} | Preco: {ajustarPreco(produto.preco)}</li>) : 
                                    ''
                        }
                        <br/> 
                    </div>  
                )}
                </ul>
            </div>
        )
    }
}