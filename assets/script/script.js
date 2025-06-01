let abacarrinho = document.querySelector('.aba-carrinho');
let abrircarrinho = document.querySelector('#abrecarrinho');
function abrircarrinho1(event) {
    event.preventDefault();
    // Alterna o carrinho usando classe para transição
    if (abacarrinho.classList.contains('mostrar')) {
        abacarrinho.classList.remove('mostrar');
        setTimeout(() => abacarrinho.style.display = 'none', 300);
    } else {
        abacarrinho.style.display = 'block';
        setTimeout(() => abacarrinho.classList.add('mostrar'), 10);
    }
}
let pCarrinhoV = document.querySelector('.carrinhoVazio');
abrircarrinho.addEventListener('click', abrircarrinho1)
let ul = document.querySelector('.listaCarrinho')
let opcs = document.querySelectorAll('.card');
let bolinha = document.createElement('p');
bolinha.classList.add('bolinha')
abrircarrinho.appendChild(bolinha);
bolinha.style.display = 'none';
let contBol = []

// Função para formatar valor
function formatarValor(valor) {
    return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

// Função para atualizar o valor total do carrinho
function atualizarTotalCarrinho() {
    let total = 0;
    document.querySelectorAll('.listaCarrinho .pdCarrinho').forEach(li => {
        let valor = parseFloat(li.dataset.valor);
        let quant = parseInt(li.querySelector('.quant').textContent) || 0;
        total += valor * quant;
    });
    document.querySelector('.total').textContent = 'Total: ' + formatarValor(total);
}

function atualizarBolinha() {
    let total = 0;
    document.querySelectorAll('.listaCarrinho .quant').forEach(q => {
        total += parseInt(q.textContent) || 0;
    });
    if (total > 0) {
        bolinha.style.display = 'inline-block';
        bolinha.innerHTML = total;
    } else {
        bolinha.style.display = 'none';
    }
    atualizarTotalCarrinho(); // Atualiza o total sempre que atualizar a bolinha
}

opcs.forEach(opc => {
    opc.addEventListener('click', function (e) {
        
        

        // Pega nome e valor do card
        let nome = opc.querySelector('.txtTitulo').textContent.trim();
        let valorTexto = opc.querySelector('.txtValor').textContent.replace(/[^0-9,]/g, '').replace(',', '.');
        let valor = parseFloat(valorTexto);
        if (isNaN(valor)) valor = 0;
        // Pega a imagem do card
        let imgSrc = opc.querySelector('.imgComida').getAttribute('src');

        // Verifica se já existe no carrinho (agora usando nome + valor + imagem para garantir unicidade)
        let liExistente = Array.from(ul.children).find(li => li.dataset.nome === nome && li.dataset.valor === valor.toString() && li.dataset.imgsrc === imgSrc);
        if (liExistente) {
            let pQuant = liExistente.querySelector('.quant');
            let h4Valor = liExistente.querySelector('.h4Valor');
            let quant = parseInt(pQuant.textContent) + 1;
            pQuant.textContent = quant;
            h4Valor.textContent = formatarValor(valor * quant);
            atualizarBolinha();
            return;
        }

        

        let li = document.createElement('li');
        li.classList.add('pdCarrinho');
        li.dataset.nome = nome;
        li.dataset.valor = valor;
        li.dataset.imgsrc = imgSrc;
        ul.appendChild(li);

        let imgOriginal = opc.querySelector('.imgComida');
        let img = imgOriginal.cloneNode(true);
        img.classList.add('imgBoloCarrinho');
        img.classList.remove('imgComida');

        let infCar = document.createElement('div');
        infCar.classList.add('infCardCarrinho');
        let cntr = document.createElement('div');
        cntr.classList.add('control');
        let txtCard = document.createElement('div');
        txtCard.classList.add('txtCard');

        let h4Titulo = document.createElement('h4');
        h4Titulo.classList.add('h4Titulo');
        h4Titulo.innerHTML = nome;
        let h4Valor = document.createElement('h4');
        h4Valor.classList.add('h4Valor');
        h4Valor.textContent = formatarValor(valor);

        let btnRemove = document.createElement('button');
        btnRemove.classList.add('btRemove');
        btnRemove.textContent = 'remover';
        btnRemove.addEventListener('click', function dd(e) {
            e.preventDefault();
            ul.removeChild(li);
            atualizarBolinha();
            atualizarTotalCarrinho();
        });

        let addIt = document.createElement('button');
        addIt.classList.add('btMais');
        addIt.textContent = '+';

        let p = document.createElement('p');
        p.classList.add('quant');
        let quant = 1;
        p.textContent = quant;

        addIt.addEventListener('click', function (e) {
            e.preventDefault();
            quant++;
            p.textContent = quant;
            h4Valor.textContent = formatarValor(valor * quant);
            atualizarBolinha();
            atualizarTotalCarrinho();
        });

        let subIt = document.createElement('button');
        subIt.classList.add('btMenos');
        subIt.textContent = '-';

        subIt.addEventListener('click', function (e) {
            e.preventDefault();
            if (quant > 1) {
                quant--;
                p.textContent = quant;
                h4Valor.textContent = formatarValor(valor * quant);
                atualizarBolinha();
                atualizarTotalCarrinho();
            }
        });
        
        li.appendChild(img);
        li.appendChild(infCar);
        infCar.appendChild(txtCard);
        txtCard.appendChild(h4Titulo);
        infCar.appendChild(cntr); 
        cntr.appendChild(btnRemove);
        cntr.appendChild(subIt);
        cntr.appendChild(p);
        cntr.appendChild(addIt);
        cntr.appendChild(h4Valor);

        atualizarBolinha();
        atualizarTotalCarrinho();
    });
});

let Concluida = document.querySelector('.compraConcluida');
let butonFinalizar = document.querySelector('.btfinalizar');

butonFinalizar.addEventListener('click', function (e) {
    if(ul.children.length === 0) {
        alert('Seu carrinho está vazio!');
        return;
    }
    ul.innerHTML = '';
    bolinha.style.display = 'none';
    atualizarTotalCarrinho();
    Concluida.style.display = 'inline-block';
    
    setTimeout(function() {
        Concluida.style.display = 'none';
    },5000);

});


