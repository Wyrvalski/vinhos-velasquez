import axios from 'axios'

export async function buscarDadosNaApi(that) {
    let res = await axios.get('http://www.mocky.io/v2/598b16291100004705515ec5/')
                .then(res => that.setState({listaClientes: res.data}))
    let res1 = await axios.get('http://www.mocky.io/v2/598b16861100004905515ec7/')
                .then(res => that.setState({listaCompras: res.data}))
}