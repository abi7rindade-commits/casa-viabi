// ==========================================
// LISTA DE PRESENTES
// ==========================================

const presentes = [
  {
    id: 1,
    categoria: "Cozinha",
    nome: "Jogo de jantar",
    descricao: "Para nossas primeiras refeições na casa nova.",
    preco: 500,
    imagem: "🍽️",
    linkCompra: "https://www.amazon.com.br/",
    arrecadado: 0
  },

  {
    id: 2,
    categoria: "Quarto",
    nome: "Jogo de cama",
    descricao: "Para deixar nosso quarto ainda mais gostoso.",
    preco: 300,
    imagem: "🛏️",
    linkCompra: "https://www.mercadolivre.com.br/",
    arrecadado: 0
  },

  {
    id: 3,
    categoria: "Casa",
    nome: "Kit de toalhas",
    descricao: "Um carinho para começar nossa casa do zero.",
    preco: 250,
    imagem: "🛁",
    linkCompra: "https://shopee.com.br/",
    arrecadado: 0
  },

  {
    id: 4,
    categoria: "Cozinha",
    nome: "Jogo de panelas",
    descricao: "Para encher a cozinha de comida e histórias.",
    preco: 700,
    imagem: "🍳",
    linkCompra: "https://www.amazon.com.br/",
    arrecadado: 0
  },

  {
    id: 5,
    categoria: "Casa",
    nome: "Aspirador de pó",
    descricao: "Porque a Lilith também vai participar da mudança.",
    preco: 600,
    imagem: "🧹",
    linkCompra: "https://www.mercadolivre.com.br/",
    arrecadado: 0
  },

  {
    id: 6,
    categoria: "Sala",
    nome: "Manta para o sofá",
    descricao: "Para as noites de filme, conversa e preguiça.",
    preco: 180,
    imagem: "🧶",
    linkCompra: "https://shopee.com.br/",
    arrecadado: 0
  }
];


// ==========================================
// ELEMENTOS
// ==========================================

const listaPresentes = document.getElementById("lista-presentes");

const modal = document.getElementById("modal");

const conteudoModal = document.getElementById("conteudo-modal");

const fecharModal = document.getElementById("fechar-modal");


// ==========================================
// FORMATAÇÃO DE VALORES
// ==========================================

function formatarValor(valor) {

  return valor.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
  });

}


// ==========================================
// RENDERIZAR PRESENTES
// ==========================================

function renderizarPresentes() {

  listaPresentes.innerHTML = "";


  presentes.forEach(presente => {

    const percentual = Math.min(
      (presente.arrecadado / presente.preco) * 100,
      100
    );


    const completo = percentual >= 100;


    const card = document.createElement("article");

    card.className = "gift-card";


    card.innerHTML = `

      <div class="gift-image">

        <span class="gift-status">
          ${completo ? "conquistado ♥" : "na nossa lista"}
        </span>

        <span>
          ${presente.imagem}
        </span>

      </div>


      <div class="gift-body">

        <span class="gift-category">
          ${presente.categoria}
        </span>


        <h3 class="gift-name">
          ${presente.nome}
        </h3>


        <p class="gift-description">
          ${presente.descricao}
        </p>


        <div class="price-row">

          <strong class="gift-price">
            ${formatarValor(presente.preco)}
          </strong>

        </div>


        <div class="progress-area">

          <div class="progress-info">

            <span>
              ${completo
                ? "Presente conquistado!"
                : `${formatarValor(presente.arrecadado)} já contribuídos`
              }
            </span>

            <span>
              ${Math.round(percentual)}%
            </span>

          </div>


          <div class="progress">

            <div
              class="progress-bar"
              style="width: ${percentual}%"
            ></div>

          </div>

        </div>


        ${
          completo

          ? `

            <div class="completed-message">
              Esse presente já está garantido para a nossa casa 💚
            </div>

          `

          : `

            <div class="buttons">

              <button
                class="button-small buy-button"
                onclick="comprarPresente(${presente.id})"
              >
                comprar inteiro
              </button>


              <button
                class="button-small contribute-button"
                onclick="contribuirPresente(${presente.id})"
              >
                contribuir
              </button>

            </div>

          `
        }

      </div>

    `;


    listaPresentes.appendChild(card);

  });

}


// ==========================================
// COMPRAR PRESENTE
// ==========================================

function comprarPresente(id) {

  const presente = presentes.find(
    item => item.id === id
  );


  if (!presente) return;


  abrirModal(`

    <p class="eyebrow">
      esse presente é especial ♥
    </p>

    <h3>
      ${presente.nome}
    </h3>

    <p class="modal-description">

      Se você quiser nos presentear com
      ${presente.nome.toLowerCase()},
      você pode comprar diretamente pela loja.

      <br><br>

      Depois, volte aqui para deixar seu
      nome e um recadinho para nós.

    </p>


    <button
      class="modal-action"
      onclick="irParaLoja(${presente.id})"
    >
      comprar na loja →
    </button>


    <button
      class="modal-action"
      style="margin-top: 8px; background: #e8ddc8; color: #2f4438;"
      onclick="registrarCompra(${presente.id})"
    >
      já comprei — deixar recadinho
    </button>

  `);

}


// ==========================================
// IR PARA A LOJA
// ==========================================

function irParaLoja(id) {

  const presente = presentes.find(
    item => item.id === id
  );


  if (!presente) return;


  window.open(
    presente.linkCompra,
    "_blank"
  );

}


// ==========================================
// REGISTRAR COMPRA
// ==========================================

function registrarCompra(id) {

  const presente = presentes.find(
    item => item.id === id
  );


  if (!presente) return;


  abrirModal(`

    <p class="eyebrow">
      que carinho ♥
    </p>

    <h3>
      Você comprou ${presente.nome}!
    </h3>

    <p class="modal-description">
      Deixe seu nome e um recadinho
      para a Abi, a Vi e a Lilith.
    </p>


    <label class="form-label">
      seu nome
    </label>

    <input
      id="nome-compra"
      class="form-input"
      type="text"
      placeholder="Como podemos te chamar?"
    >


    <label class="form-label">
      seu recadinho
    </label>

    <textarea
      id="mensagem-compra"
      class="form-textarea"
      placeholder="Escreva alguma coisa para nós..."
    ></textarea>


    <button
      class="modal-action"
      onclick="enviarRecadoCompra(${id})"
    >
      enviar recadinho ♥
    </button>

  `);

}


// ==========================================
// ENVIAR RECADO DA COMPRA
// ==========================================

function enviarRecadoCompra(id) {

  const nome = document.getElementById(
    "nome-compra"
  ).value.trim();


  const mensagem = document.getElementById(
    "mensagem-compra"
  ).value.trim();


  if (!nome) {

    alert("Coloque seu nome antes de enviar. 💚");

    return;

  }


  salvarRecado({
    nome: nome,
    mensagem: mensagem,
    tipo: "presente"
  });


  abrirModal(`

    <p class="eyebrow">
      recadinho recebido ♥
    </p>

    <h3>
      Obrigada, ${nome}!
    </h3>

    <p class="modal-description">
      Seu carinho agora faz parte
      da história da nossa casa.
    </p>

  `);

}


// ==========================================
// CONTRIBUIR
// ==========================================

function contribuirPresente(id) {

  const presente = presentes.find(
    item => item.id === id
  );


  if (!presente) return;


  abrirModal(`

    <p class="eyebrow">
      um pedacinho da nossa casa ♥
    </p>

    <h3>
      Contribuir para ${presente.nome}
    </h3>

    <p class="modal-description">

      Você pode escolher qualquer valor
      para ajudar a gente a conquistar
      esse presente.

    </p>


    <label class="form-label">
      quanto você quer contribuir?
    </label>


    <div class="amount-options">

      <button
        class="amount-button"
        onclick="selecionarValor(50)"
      >
        R$ 50
      </button>

      <button
        class="amount-button"
        onclick="selecionarValor(100)"
      >
        R$ 100
      </button>

      <button
        class="amount-button"
        onclick="selecionarValor(200)"
      >
        R$ 200
      </button>

    </div>


    <input
      id="valor-contribuicao"
      class="form-input"
      type="number"
      min="1"
      step="0.01"
      placeholder="Ou digite outro valor"
      style="margin-top: 10px;"
    >


    <label class="form-label">
      seu nome
    </label>

    <input
      id="nome-contribuicao"
      class="form-input"
      type="text"
      placeholder="Como podemos te chamar?"
    >


    <label class="form-label">
      seu recadinho
    </label>

    <textarea
      id="mensagem-contribuicao"
      class="form-textarea"
      placeholder="Escreva uma mensagem para nós..."
    ></textarea>


    <button
      class="modal-action"
      onclick="prepararPagamento(${id})"
    >
      continuar para o Pix →
    </button>


    <p class="modal-note">

      O pagamento será feito de forma segura.
      Depois da confirmação, sua mensagem
      ficará associada à contribuição.

    </p>

  `);

}


// ==========================================
// SELECIONAR VALOR
// ==========================================

function selecionarValor(valor) {

  const campo = document.getElementById(
    "valor-contribuicao"
  );


  if (campo) {

    campo.value = valor;

  }

}


// ==========================================
// PREPARAR PAGAMENTO
// ==========================================

function prepararPagamento(id) {

  const presente = presentes.find(
    item => item.id === id
  );


  if (!presente) return;


  const valor = Number(
    document.getElementById(
      "valor-contribuicao"
    ).value
  );


  const nome = document.getElementById(
    "nome-contribuicao"
  ).value.trim();


  const mensagem = document.getElementById(
    "mensagem-contribuicao"
  ).value.trim();


  if (!valor || valor <= 0) {

    alert("Digite o valor da contribuição. 💚");

    return;

  }


  if (!nome) {

    alert("Coloque seu nome antes de continuar. 💚");

    return;

  }


  /*
    IMPORTANTE:

    Por enquanto esta é apenas a demonstração
    da experiência do usuário.

    O Mercado Pago será conectado posteriormente
    através de um servidor seguro.

    NUNCA coloque uma chave secreta do Mercado Pago
    diretamente neste arquivo.
  */


  abrirModal(`

    <p class="eyebrow">
      quase lá ♥
    </p>

    <h3>
      Sua contribuição
    </h3>

    <p class="modal-description">

      Você escolheu contribuir com

      <strong>
        ${formatarValor(valor)}
      </strong>

      para o nosso

      <strong>
        ${presente.nome}
      </strong>.

    </p>


    <div
      style="
        margin-top: 20px;
        padding: 22px;
        border-radius: 18px;
        background: #f3eee5;
        text-align: center;
      "
    >

      <div
        style="
          font-size: 12px;
          color: #77736c;
          margin-bottom: 8px;
        "
      >
        PAGAMENTO
      </div>

      <strong
        style="
          display: block;
          font-size: 30px;
          color: #2f4438;
        "
      >
        ${formatarValor(valor)}
      </strong>

      <p
        style="
          font-size: 12px;
          color: #77736c;
          line-height: 1.5;
        "
      >
        Aqui entraremos com o pagamento
        do Mercado Pago.
      </p>

    </div>


    <p class="modal-note">

      <strong>${nome}</strong>,
      seu recadinho também será guardado
      junto com a contribuição.

    </p>

  `);

}


// ==========================================
// SALVAR RECADINHO
// ==========================================

function salvarRecado(recado) {

  const recadosSalvos =
    JSON.parse(
      localStorage.getItem("recadosCasa")
    ) || [];


  recadosSalvos.push({

    ...recado,

    data: new Date().toISOString()

  });


  localStorage.setItem(
    "recadosCasa",
    JSON.stringify(recadosSalvos)
  );

}


// ==========================================
// MODAL
// ==========================================

function abrirModal(conteudo) {

  conteudoModal.innerHTML = conteudo;

  modal.hidden = false;

  document.body.style.overflow = "hidden";

}


function fecharModalFuncao() {

  modal.hidden = true;

  document.body.style.overflow = "";

}


fecharModal.addEventListener(
  "click",
  fecharModalFuncao
);


modal.addEventListener(
  "click",
  event => {

    if (event.target === modal) {

      fecharModalFuncao();

    }

  }
);


document.addEventListener(
  "keydown",
  event => {

    if (event.key === "Escape") {

      fecharModalFuncao();

    }

  }
);


// ==========================================
// INICIAR SITE
// ==========================================

renderizarPresentes();
console.log("SITE CASA VIABI FUNCIONANDO");

console.log("Modal:", modal);

console.log("Lista de presentes:", listaPresentes);
