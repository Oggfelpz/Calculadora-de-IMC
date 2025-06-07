document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("imc-form");
  const resultado = document.getElementById("resultado");

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const peso = parseFloat(form.peso.value);
    const altura = parseFloat(form.altura.value);
    const idade = parseInt(form.idade.value);
    const genero = form.genero.value;

    if (!genero) {
      mostrarResultado("Por favor, selecione seu gênero.", false);
      return;
    }

    if (peso <= 0 || altura <= 0 || idade <= 0 || isNaN(peso) || isNaN(altura) || isNaN(idade)) {
      mostrarResultado("Por favor, preencha todos os campos corretamente.", false);
      return;
    }

    const imc = peso / (altura * altura);
    const imcFixado = imc.toFixed(2);

    let categoria = "";
    let faixa = "";

    if (idade <= 12) 
    {
      faixa = "criança";
    } 
      else if (idade <= 18) {
      faixa = "adolescente";
    } 
    else if (idade <= 59) {
      faixa = "adulto";
    } 
    else {
      faixa = "idoso";
    }

    if (imc < 18.5) {
      categoria = "abaixo do peso";
    } else if (imc < 25) {
      categoria = "peso normal";
    } else if (imc < 30) {
      categoria = "sobrepeso";
    } else {
      categoria = "obesidade";
    }

    let pronome = "";
    switch (genero) {
      case "masculino":
        pronome = "um";
        break;
      case "feminino":
        pronome = "uma";
        break;
      default:
        pronome = "uma pessoa";
        break;
    }

    let mensagem = `Você é ${pronome} <strong>${faixa}</strong> de <strong>${idade}</strong> anos, seu IMC é <strong>${imcFixado}</strong> (${categoria}).`;

    if (faixa === "criança") {
      mensagem += "<br>Para crianças, o IMC deve ser avaliado com acompanhamento médico.";
    } else if (faixa === "idoso") {
      mensagem += "<br>Para idosos, cuidados especiais devem ser considerados.";
    }

    mostrarResultado(mensagem, true);
  });

  const btnLimpar = document.getElementById("btn-limpar");
  btnLimpar.addEventListener("click", () => {
    form.reset();
    resultado.textContent = "";
    resultado.classList.remove("mostrar");
  });

  function mostrarResultado(mensagem, animar) {
    resultado.innerHTML = mensagem;

    resultado.classList.remove("mostrar");
    if (animar) {
      void resultado.offsetWidth; // força reflow
      resultado.classList.add("mostrar");
    }
  }
});
