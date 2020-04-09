import React, { Component } from 'react'
import { Button } from 'react-bootstrap'
import { ajustarPreco, vinhosComprados as listarVinhos, ajustarCpf } from '../util/functions'

export default class Cliente extends Component {
    constructor(props){
        super(props)
        this.state = {
            clientes: [],
            vinhosComprados: [],
            exibirVinhosComprados: false,
            exibirVinhosRecomendados: false,
            vinhosRecomendados: []
        }
    }

    montarCliente(cliente, listaCompras) {
        this.setState(prevState=>({
            clientes: [...prevState.clientes, {nome: cliente.nome,cpf: cliente.cpf, valorTotal: this.valorTotal(cliente.cpf, listaCompras)}]
        }))
    }

    valorTotal(cpf, listaCompras) {
        let cpfCliente = cpf.replace('-','.')
        let valorTotal = 0
        listaCompras.map(compra => 
            compra.cliente.includes(cpfCliente) ? valorTotal = valorTotal + compra.valorTotal : ''
        )
        return valorTotal
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.listaCompras !== this.props.listaCompras){
            nextProps.listaClientes.map(cliente => 
                this.montarCliente(cliente, nextProps.listaCompras)
            )
        }  
    }

    compare( a, b ) {
        if ( a.valorTotal < b.valorTotal ){
            return 1;
          }
          if ( a.valorTotal > b.valorTotal ){
            return -1;
          }
          return 0;
    }

    todosVinhosComprados() {
        const { listaCompras } = this.props
        let todosVinhosComprados = [], todosVinhos = []
        for (let i = 0; i < listaCompras.length; i++) {
            for (let j = 0; j < listaCompras[i].itens.length; j++) {
                    todosVinhosComprados.push({produto: listaCompras[i].itens[j].produto, categoria: listaCompras[i].itens[j].categoria, preco: listaCompras[i].itens[j].preco, safra: listaCompras[i].itens[j].safra})
            }
        }
        todosVinhosComprados.forEach(function(itm) {
            let unique = true
            todosVinhos.forEach(function(itm2) {
            if (itm.produto === itm2.produto) unique = false;
            });
            if (unique)  todosVinhos.push(itm);
        });
        return todosVinhos;
    }

    recomendarVinho(cliente) {
        const { listaCompras } = this.props
        let vinhosNaoComprados = []
        let cpfAjustado = ajustarCpf( cliente.cpf )
        let vinhosDoCliente = listarVinhos(cliente, listaCompras, this)
        let todosOsVinhos = this.todosVinhosComprados();

        for (let i = 0; i < todosOsVinhos.length; i++) {
            let vinhoJaComprado = false
            for (let j = 0; j < vinhosDoCliente.length; j++) {
                if(vinhosDoCliente[j].produto === todosOsVinhos[i].produto){
                    vinhoJaComprado = true
                }
            }
            if (!vinhoJaComprado) {
                vinhosNaoComprados.push(todosOsVinhos[i])
            }
        }
        this.setState({
            vinhosRecomendados: {nomeCliente: cliente.nome,nomeProduto: vinhosNaoComprados},
            exibirVinhosComprados: false,
            exibirVinhosRecomendados: true
        })
    }

    render(){
        const { clientes, vinhosComprados, exibirVinhosComprados, exibirVinhosRecomendados, vinhosRecomendados } = this.state
        clientes.sort(this.compare)
        return (
            <div>
                <br/><h1>Clientes</h1><br/>
                <ul className="list-group">
                    {clientes.map((cliente,index) =>
                        <div key={index}>
                            <li className='list-group-item'>Nome: {cliente.nome}</li>
                            <li className='list-group-item'>CPF: {cliente.cpf}</li>
                            <li className='list-group-item'>Valor Total: {ajustarPreco( cliente.valorTotal )}</li>
                            <li className='list-group-item'>
                                <Button onClick={() => listarVinhos(cliente, this.props.listaCompras,this)} variant='primary'>Vinhos Comprados</Button>
                                <Button style={{marginLeft: 2 +'em'}} onClick={() => this.recomendarVinho(cliente)} variant='primary'>Recomendar Vinho</Button>    
                            </li>
                            {exibirVinhosComprados && vinhosComprados.nomeCliente === cliente.nome ? 
                                vinhosComprados.nomeProduto.map( (produto, index) => 
                                <li key={index} className='list-group-item'>Vinho: {produto.produto} | Categoria: {produto.categoria} | Safra: {produto.safra} | Preco: {ajustarPreco(produto.preco)}</li>) : 
                                        ''
                            }<br></br>
                            {exibirVinhosRecomendados && vinhosRecomendados.nomeCliente === cliente.nome ? 
                                vinhosRecomendados.nomeProduto.map( (produto, index) => 
                                <li key={index} className='list-group-item'>Vinho: {produto.produto} | Categoria: {produto.categoria} | Safra: {produto.safra} | Preco: {ajustarPreco(produto.preco)}</li>) : 
                                        ''
                            }
                            <br></br>
                        </div>
                    )}
                </ul>
            </div>
        )
    }
}