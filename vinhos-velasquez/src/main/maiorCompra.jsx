import React, { Component } from 'react'
import { buscarDadosNaApi } from '../util/api'
import Header from './header'
import { Button } from 'react-bootstrap'
import '../style/custom.css'
import { ajustarPreco } from '../util/functions'

export default class MaiorCompra extends Component {
    constructor(props) {
        super(props)
        this.clienteCpfAjustado = []
        this.state = {
            listaClientes: null,
            listaCompras: null,
            maiorCompra: null,
            clienteMaiorCompra: null,
            compraBoolean: false
        }
    }

    buscarClienteMaiorCompra(clientes) {
        let maiorValor = 0
        const { listaCompras } = this.state 
        for (let i = 0; i < clientes.length; i++) {
            for (let j = 0; j < listaCompras.length; j++) {
                if ((listaCompras[j].cliente.includes(clientes[i].cpf)) && listaCompras[i].data.includes('2016')) {
                    if (maiorValor < listaCompras[j].valorTotal) {
                        maiorValor = listaCompras[j].valorTotal
                        this.setState({
                            maiorCompra: listaCompras[j],
                            clienteMaiorCompra: clientes[i]
                        })
                        
                    }
                }
            }
        }
    }

    montarCliente(cliente) {
        this.clienteCpfAjustado.push({nome: cliente.nome,cpf: this.ajustarCpf(cliente.cpf)})
    }

    ajustarCpf(cpf) {
        let cpfCliente = cpf.replace('-','.')
        return cpfCliente
    }

    componentWillMount() {
        buscarDadosNaApi(this)
    }

    componentDidUpdate(prevProps, prevState) {
        const { listaCompras, listaClientes } = this.state
        
        if( listaCompras !== prevState.listaCompras  ){
                listaClientes.map(cliente => this.montarCliente(cliente))
                this.buscarClienteMaiorCompra(this.clienteCpfAjustado)
        }
    }

    exibirCompra() {
        const { compraBoolean } = this.state
        this.setState({
            compraBoolean: compraBoolean ? false : true
        })
    }

    render() {
        const { maiorCompra, clienteMaiorCompra, compraBoolean } = this.state
        return(
            <div className='container'>
                <Header />
                {clienteMaiorCompra ?
                    <ul className='list-group'>
                        <br/><h2>Maior compra única em 2016</h2><br/>
                        <li className='list-group-item'>Nome do Cliente: {clienteMaiorCompra.nome}</li>
                        <li className='list-group-item'>CPF: {clienteMaiorCompra.cpf}</li>
                        <li className='list-group-item'>Data da compra: {maiorCompra.data}</li>
                        <li className='list-group-item'><Button variant='primary' onClick={(e) => this.exibirCompra(e)} >Ver Compra</Button></li>
                        {compraBoolean ? 
                            <div> 
                                {maiorCompra.itens.map((item, index) =>
                                    <li key={index} className='list-group-item'>Vinho: {item.produto} | Categoria: {item.categoria} | Safra: {item.safra} | Preco: R$ {ajustarPreco(item.preco)}</li>
                                ) }
                                <li className='list-group-item'>Valor total da compra: {ajustarPreco( maiorCompra.valorTotal)}</li>             
                            </div>
                        : ''}
                    </ul>
                : ''}
            </div>
        )
    }
}