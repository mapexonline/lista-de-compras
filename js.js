// Obter produtos do localStorage ou usar padrão inicial
const produtosPadrao = [
  "1 pacote de arroz",
  "2 pacotes de café",
  "2 quilos de trigo",
  "2 pacotes de feijão",
  "1 pacote de feijão preto",
  "3 quilos de açúcar",
  "2 unidades de óleo",
  "2 maços de tomate",
  "1 quilo de cebola",
  "3 quilos de batata",
  "3 abobrinhas",
  "5 tomates",
  "4 batatas doces",
  "1 quilo de linguiça",
  "1 quilo de carne moída",
  "3 quilos de sobrecoxa",
  "1 quilo de costelinha de porco",
  "2 pacotes de bacon",
  "1 bandeja de orelha de porco",
  "Suco",
  "3 unidades de leite",
  "Manteiga",
  "2 dúzias de ovos",
  "DESINFETANTE-ROGERIO"
];

let produtos = JSON.parse(localStorage.getItem('produtos')) || produtosPadrao.slice();

const listaEl = document.getElementById('lista');
const contadorEl = document.getElementById('contador');

function carregarLista() {
  const salvos = JSON.parse(localStorage.getItem('itensMarcados') || '[]');
  listaEl.innerHTML = '';

  produtos.forEach((produto, i) => {
    const li = document.createElement('li');
    li.className = 'item';
    if (salvos.includes(i)) {
      li.classList.add('checked');
    }

    const spanProduto = document.createElement('span');
    spanProduto.textContent = produto;
    spanProduto.style.flexGrow = '1';

    const btnEditar = document.createElement('button');
    btnEditar.textContent = 'Editar';
    btnEditar.className = 'editar-btn';
    btnEditar.onclick = (event) => {
      event.stopPropagation();
      editarProduto(i);
    };

    const btnDeletar = document.createElement('button');
    btnDeletar.textContent = '❌';
    btnDeletar.className = 'deletar-btn';
    btnDeletar.onclick = (event) => {
      event.stopPropagation();
      deletarProduto(i);
    };

    li.appendChild(spanProduto);
    li.appendChild(btnEditar);
    li.appendChild(btnDeletar);

    li.onclick = () => marcarItem(i);
    listaEl.appendChild(li);
  });

  atualizarContador(salvos.length);
}

function marcarItem(index) {
  let salvos = JSON.parse(localStorage.getItem('itensMarcados') || '[]');
  if (salvos.includes(index)) {
    salvos = salvos.filter(i => i !== index);
  } else {
    salvos.push(index);
  }
  localStorage.setItem('itensMarcados', JSON.stringify(salvos));
  carregarLista();
}

function atualizarContador(marcados) {
  const total = produtos.length;
  const faltam = total - marcados;
  contadorEl.textContent = `Faltam ${faltam} de ${total} produtos`;
}

function resetarLista() {
  localStorage.removeItem('itensMarcados');
  localStorage.removeItem('produtos');
  produtos = produtosPadrao.slice();
  carregarLista();
}

function editarProduto(index) {
  const novoProduto = prompt('Digite o novo nome do produto:', produtos[index]);
  if (novoProduto !== null && novoProduto.trim() !== '') {
    produtos[index] = novoProduto.trim();
    localStorage.setItem('produtos', JSON.stringify(produtos));
    carregarLista();
  }
}

function deletarProduto(index) {
  if (confirm('Tem certeza que deseja deletar este produto?')) {
    produtos.splice(index, 1);
    localStorage.setItem('produtos', JSON.stringify(produtos));
    
    // Também remover do "itensMarcados" se estava marcado
    let salvos = JSON.parse(localStorage.getItem('itensMarcados') || '[]');
    salvos = salvos.filter(i => i !== index).map(i => i > index ? i - 1 : i);
    localStorage.setItem('itensMarcados', JSON.stringify(salvos));
    
    carregarLista();
  }
}

function adicionarProduto() {
  const novoProduto = prompt('Digite o nome do novo produto:');
  if (novoProduto !== null && novoProduto.trim() !== '') {
    produtos.push(novoProduto.trim());
    localStorage.setItem('produtos', JSON.stringify(produtos));
    carregarLista();
  }
}

carregarLista();
