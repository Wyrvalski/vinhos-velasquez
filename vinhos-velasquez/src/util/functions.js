export function ajustarPreco (preco){
    let precoAjustado = []
    preco =preco.toString()
    if(preco.includes('.')){
        precoAjustado = preco.split('.')
        switch (precoAjustado[1].length) {
            case 1:
                precoAjustado[1] = ',' + precoAjustado[1] + '0'
                preco = precoAjustado[0] + precoAjustado[1]
                break;
            case 2:
                precoAjustado[1] = ',' + precoAjustado[1]
                preco = precoAjustado[0] + precoAjustado[1]
                break;
            default:
                let precoSubstr = precoAjustado[1].substr(0,2)
                preco = precoAjustado[0] + ',' + precoSubstr
                break;
        }
        
    }else{
        preco = preco + ',00'
    }
    return 'R$ ' + preco 
}

export function vinhosComprados (cliente, listaCompras,that){
    let cpfCliente = cliente.cpf.replace('-','.')
    let vinho = []
    for (let i = 0; i < listaCompras.length; i++) {
        if(listaCompras[i].cliente.includes(cpfCliente)) {
            for (let j = 0; j < listaCompras[i].itens.length; j++) {
                vinho.push(listaCompras[i].itens[j])
            }
        }
    }
    that.setState({
        vinhosComprados: {nomeCliente: cliente.nome, nomeProduto: vinho},
        exibirVinhosComprados: that.state.exibirVinhosComprados ? false : true,
        exibirVinhosRecomendados: false
    })
    return vinho
}

export function ajustarCpf(cpf) {
    let cpfCliente = cpf.replace('-','.')
    if(cpfCliente !== '000.000.000.01') {
        cpfCliente = '0'+cpfCliente
    }
    return cpfCliente
}