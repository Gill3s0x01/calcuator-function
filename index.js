var input = document.getElementById("screen"),
  number = document.querySelectorAll(".numbers div"),
  account = document.querySelectorAll(".account div"),
  result = document.getElementById("result"),
  clean = document.getElementById("clean"),
  resultShowing = false;

// adiconando evento de clique nos botões dos number
for (var i = 0; i < number.length; i++) {
  number[i].addEventListener("click", function (e) {
    // variaveis do texto na tela e o ultimo caractere
    var textInScreen = input.innerHTML;
    var lastChar = textInScreen[textInScreen.length - 1];

    // se o resultado ainda não foi mostrado continua adicionando
    if (resultShowing === false) {
      input.innerHTML += e.target.innerHTML;
    } else if (
      (resultShowing === true && lastChar === "+") ||
      lastChar === "-" ||
      lastChar === "×" ||
      lastChar === "÷"
    ) {
      // se o resultado ja foi mostrado e o usuario aperta um botão de conta continuam adicionando na tela para a próxima operação
      resultShowing = false;
      input.innerHTML += e.target.innerHTML;
    } else {
      //se o resultado ja foi mostrado e o usuario apertar um numero limpa a tela e começa uma nova operação
      resultShowing = false;
      input.innerHTML = "";
      input.innerHTML += e.target.innerHTML;
    }
  });
}

// adiconando evento de clique nos botões das account
for (var i = 0; i < account.length; i++) {
  account[i].addEventListener("click", function (e) {
    // variaveis do texto na tela e o ultimo caractere
    var textInScreen = input.innerHTML;
    var lastChar = textInScreen[textInScreen.length - 1];

    // se o ultimo caractere mostrado for uma conta, substitui pela que foi clicada
    if (
      lastChar === "+" ||
      lastChar === "-" ||
      lastChar === "×" ||
      lastChar === "÷"
    ) {
      var newString =
        textInScreen.substring(0, textInScreen.length - 1) + e.target.innerHTML;
      input.innerHTML = newString;
    } else if (textInScreen.length == 0) {
      //se a primeira tecla pressionada for uma conta, avisa o usuario para colocar um numero primeiro
      alert("Primeiro, digite um número");
    } else {
      //senão apenas adiciona a conta pressionada na tela
      input.innerHTML += e.target.innerHTML;
    }
  });
}

// adiconando evento de clique no botão igual
result.addEventListener("click", function () {
  // texto que será processado
  var inputString = input.innerHTML;

  // fazendo uma lista dos number que serão processados
  var number = inputString.split(/\+|\-|\×|\÷/g);

  // fazendo uma lista das account que serão processadas
  var account = inputString.replace(/[0-9]|\./g, "").split("");

  // fazendo as account uma de cada vez em ordem, primeiro divisão depois multiplicação, subtração e adição
  var divide = account.indexOf("÷");
  while (divide != -1) {
    number.splice(divide, 2, number[divide] / number[divide + 1]);
    account.splice(divide, 1);
    divide = account.indexOf("÷");
  }

  var multiply = account.indexOf("×");
  while (multiply != -1) {
    number.splice(multiply, 2, number[multiply] * number[multiply + 1]);
    account.splice(multiply, 1);
    multiply = account.indexOf("×");
  }

  var subtract = account.indexOf("-");
  while (subtract != -1) {
    number.splice(subtract, 2, number[subtract] - number[subtract + 1]);
    account.splice(subtract, 1);
    subtract = account.indexOf("-");
  }

  var add = account.indexOf("+");
  while (add != -1) {
    number.splice(
      add,
      2,
      parseFloat(number[add]) + parseFloat(number[add + 1])
    );
    account.splice(add, 1);
    add = account.indexOf("+");
  }

  input.innerHTML = number[0]; // mostrando resultado na tela

  resultShowing = true; // dizendo que o resultado está sendo mostrado
});

// adiconando evento de clique no botão limpar
clean.addEventListener("click", function () {
  input.innerHTML = "";
});
