const categorias = {
  Carnes: [
    "comprar mais mistura"
  ],
  "Alimentos Básicos / Secos": [
    "1 pacote de café",
    "3 kilos de açucar"
  ],
  "Legumes / Verduras": [
    "4 cenouras"
  ],
  "Produtos de Limpeza": [
    "2 panos de chao",
    "2 panos de prato",
    "1 rodo",
    "papel higienico"
  ]
};

let produtosMarcados = JSON.parse(localStorage.getItem("itensMarcados")) || [];

function carregarLista() {
  const listaEl = document.getElementById("lista");
  listaEl.innerHTML = "";

  let total = 0;
  let marcados = 0;

  Object.entries(categorias).forEach(([categoria, itens]) => {
    const titulo = document.createElement("h3");
    titulo.textContent = categoria;
    listaEl.appendChild(titulo);

    const ul = document.createElement("ul");
    ul.className = "lista";

    const marcadosNaCategoria = [];
    const naoMarcadosNaCategoria = [];

    itens.forEach((item, i) => {
      const key = `${categoria}-${item}`;
      if (produtosMarcados.includes(key)) {
        marcadosNaCategoria.push(item);
        marcados++;
      } else {
        naoMarcadosNaCategoria.push(item);
      }
      total++;
    });

    [...naoMarcadosNaCategoria, ...marcadosNaCategoria].forEach((item) => {
      const key = `${categoria}-${item}`;
      const li = document.createElement("li");
      li.className = "item";
      if (produtosMarcados.includes(key)) li.classList.add("checked");

      li.onclick = () => marcarItem(key);

      const spanProduto = document.createElement("span");
      spanProduto.textContent = item;
      spanProduto.style.flexGrow = "1";
      li.appendChild(spanProduto);

      ul.appendChild(li);
    });

    listaEl.appendChild(ul);
  });

  atualizarContador(total - marcados, total);
}

function marcarItem(key) {
  if (produtosMarcados.includes(key)) {
    produtosMarcados = produtosMarcados.filter((i) => i !== key);
  } else {
    produtosMarcados.push(key);
  }
  localStorage.setItem("itensMarcados", JSON.stringify(produtosMarcados));
  carregarLista();
}

function atualizarContador(faltam, total) {
  document.getElementById(
    "contador"
  ).textContent = `Faltam ${faltam} de ${total} produtos`;
}

function resetarLista() {
  localStorage.removeItem("itensMarcados");
  produtosMarcados = [];
  carregarLista();
}

function adicionarProduto() {
  const nome = prompt("Digite o nome do novo produto:");
  if (!nome) return;

  const categoria = prompt("Digite a categoria (existente ou nova):");
  if (!categoria) return;

  if (!categorias[categoria]) categorias[categoria] = [];
  categorias[categoria].push(nome.trim());
  carregarLista();
}

carregarLista();
