import React, { Component } from 'react'
import { buscarDadosNaApi } from '../util/api'
import Cliente from './cliente'
import Header from './header'

export default class Lista extends Component {
    constructor(props) {
        super(props)
        this.state = {
            listaClientes: [],
            listaCompras:[]
        }
    }

    componentWillMount() {
        buscarDadosNaApi(this)
    }

    render() {
        const { listaClientes, listaCompras } = this.state
        return (
            <div className='container'>
                <Header />
                <Cliente listaClientes={listaClientes} listaCompras={listaCompras}/>
            </div>
            
        )
    }
}