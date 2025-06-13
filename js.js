const categorias = {
  "Produtos de Limpeza": [
    "1 sabão em pó",
    "1 desinfetante",
    "2 detergentes",
    "1 cândida",
    "1 amaciante",
    "Papel toalha",
    "Papel higiênico",
    "4 sabonetes",
  ],
  "Legumes / Verduras": [
    "3 kg de batatas",
    "4 cenouras",
    "2 pimentões",
    "2 maços de alface",
    "5 tomates",
  ],
  "Alimentos Básicos / Secos": [
    "2 dúzias de ovos",
    "2 pacotes de arroz",
    "5 kg de açúcar",
    "3 litros de óleo",
    "2 pacotes de café",
    "1 pote de alho",
    "1 kg de sal",
    "2 massas de tomate",
    "2 kg de feijão",
    "1 kg de feijão preto",
    "2 macarrão Ave Maria",
  ],
  "Laticínios / Derivados": [
    "3 caixinhas de leite",
    "2 latas de leite condensado",
  ],
  "Padaria / Diversos": ["1 pão sovado"],
  Outros: ["Gás"],
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
