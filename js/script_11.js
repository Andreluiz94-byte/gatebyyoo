var chat = $(".chamada");
var chatini = $(".chamadaini");
var chatConteudo = $("#ChatConversa");
var fechar = $("#fechar");
var send = $("#send");
var form = $("#formulariorobo");

function limpar() {
  $("#textoChat").val("");
}

function chamada() {
  $("#chamada").trigger("play");
}

function scroll() {
  chatConteudo.scrollTop(9000);
}

// inicio do chat
setTimeout(function () {
  $(".chamadaini").css("bottom", "40px");
  $("#chamada").trigger("play");
}, 5000);

// digitando
function digi() {
  $(".digitando").css("display", "flex");
  setTimeout(function () {
    $(".digitando").css("display", "none");
    chamada();
  }, 4000);
}

// inicio do chat, robo falando
function ola() {
  setTimeout(function (e) {
    $(".aguarde").css("display", "none");
    $(".digitando").css("display", "flex");
    setTimeout(function (e) {
      $(".digitando").css("display", "none");
      $("#ola").css("display", "flex");
      chamada();
    }, 1000);
  }, 800);
}

// iniciar atendimento
function call() {
  setTimeout(function (e) {
    $(".aguarde").css("display", "none");
    $(".digitando").css("display", "flex");
    setTimeout(function (e) {
      $(".digitando").css("display", "none");
      $("#call").css("display", "flex");
      chamada();
    }, 1900);
  }, 800);
}

chatini.click(function (event) {
  chatConteudo.css("display", "block");
  fechar.css("display", "flex");
  form.css("display", "block");
  $("#chat").css("display", "block");
  chatini.css("display", "none");

  ola();
  call();
});

chat.click(function (event) {
  chatConteudo.css("display", "block");
  fechar.css("display", "flex");
  form.css("display", "block");
});

fechar.click(function (event) {
  chatConteudo.css("display", "none");
  fechar.css("display", "none");
  form.css("display", "none");
});

// bot
function nome() {
  chamada();
  chatConteudo.append(
    '<div class="col-md-12  hel py-2 justify-content-start align-items-start" style="display:flex;"><div class="avatarmensagem robo"></div><p class="hel conversarobo ml-3"> <span class=""> Qual o seu nome? </span> <br/></p></div>'
  );
  var fn = $("#fnome");
  fn.css("display", "flex");

  scroll();
}

$("#inicio").click(function (e) {
  $("#inicio").css("display", "none");

  chatConteudo.append(
    '<div class="col-12 py-2 hel d-flex justify-content-end align-items-start" style=""><p class="hel  text-right conversagente bg-verde"><span class=" text-white" >Sim, eu quero! </span></p><div class="avatarmensagem" style=""></div></div>'
  );
  scroll();

  // contar um tempo e colocar escrevendo
  $(".digitando").css("display", "flex");

  setTimeout(function () {
    chamada();
    chatConteudo.append(
      '<div class="col-md-12 hel py-2 justify-content-start align-items-start" id="" style="display:flex;"><div class="avatarmensagem robo"></div><p class="hel conversarobo ml-3"> <span class="">Maravilha 🙂, Vamos dar continuidade ao seu atendimento.</span> <br/></p></div>'
    );
    scroll();
    $(".digitando").css("display", "none");
  }, 900);

  setTimeout(function () {
    $(".digitando").css("display", "flex");

    setTimeout(function () {
      $(".digitando").css("display", "none");
      nome();
    }, 800);
  }, 1700);
});

// usuario
function respnome() {
  if ($('input[name="cb-nome"]').val() != "") {
    var nome = $("#fnome input").val();

    // Adiciona o nome à mensagem do WhatsApp
    var whatsappNumber = "5521977411537";
    var whatsappMessage =
      "Olá Soraya Teixeira, meu nome é " +
      nome +
      ". Estou com interesse em mais informações.";
    var whatsappLink =
      "https://api.whatsapp.com/send?phone=" +
      whatsappNumber +
      "&text=" +
      encodeURIComponent(whatsappMessage);

    chatConteudo.append(
      '<div class="col-12 py-2  hel d-flex justify-content-end align-items-start" style=""><p class="hel  text-right conversagente bg-verde"><span class=" text-white" > ' +
        nome +
        ' </span></p><div class="avatarmensagem" style=""></div></div>'
    );
    scroll();

    $("#fnome").css("display", "none");

    setTimeout(function () {
      $(".digitando").css("display", "flex");
      setTimeout(function () {
        $(".digitando").css("display", "none");

        chamada();
        chatConteudo.append(
          '<div class="col-md-12 py-2 hel justify-content-start align-items-start" id="" style="display:flex;"><div class="avatarmensagem robo"></div><p class="hel conversarobo ml-3"> <span class=""> Prazer, ' +
            nome +
            " 😄👋  </span> <br/></p></div>"
        );
        scroll();
      }, 400);
    }, 600);

    setTimeout(function () {
      $(".digitando").css("display", "flex");

      setTimeout(function () {
        $(".digitando").css("display", "none");

        chamada();
        chatConteudo.append(
          '<div class="col-md-12 py-2 hel justify-content-start align-items-start" id="" style="display:flex;"><div class="avatarmensagem robo"></div><p class="hel conversarobo ml-3"> <span class=""> E o seu e-mail?  </span> <br/></p></div>'
        );
        scroll();
        $("#femail").css("display", "flex");
      }, 800);
    }, 1400);
  } else {
    $("#fnome input").css("border", "solid 1px #a00");
    $('input[name="cb-nome"]').attr("placeholder", "preencha o seu nome.");
  }
}

// email
function respemail() {
  if ($('input[name="cb-email"]').val() != "") {
    var email = $('input[name="cb-email"]').val();
    var nome = $('input[name="cb-nome"]').val();

    // Adiciona o e-mail à mensagem do WhatsApp
    var whatsappNumber = "5521977411537";
    var whatsappMessage =
      "Olá, meu nome é " +
      nome +
      ". e o meu e-mail é " +
      email +
      ". estou com interesse em mais informações.";
    var whatsappLink =
      "https://api.whatsapp.com/send?phone=" +
      whatsappNumber +
      "&text=" +
      encodeURIComponent(whatsappMessage);

    chatConteudo.append(
      '<div class="col-12 py-2 hel d-flex justify-content-end align-items-start " style=""><p class="hel  text-right conversagente bg-verde"><span class=" text-white" > ' +
        email +
        ' </span></p><div class="avatarmensagem" style=""></div></div>'
    );
    scroll();

    $("#femail").css("display", "none");

    setTimeout(function () {
      $(".digitando").css("display", "flex");
      setTimeout(function () {
        $(".digitando").css("display", "none");

        chamada();
        chatConteudo.append(
          '<div class="col-md-12 hel py-2 justify-content-start align-items-start" id="" style="display:flex;"><div class="avatarmensagem robo"></div><p class="hel conversarobo ml-3"> <span class=""> Obrigada!  </span> <br/></p></div>'
        );
        scroll();
      }, 400);
    }, 600);

    setTimeout(function () {
      $(".digitando").css("display", "flex");

      setTimeout(function () {
        $(".digitando").css("display", "none");

        chamada();
        chatConteudo.append(
          '<div class="col-md-12 hel py-2 justify-content-start align-items-start" id="" style="display:flex;"><div class="avatarmensagem robo"></div><p class="hel conversarobo ml-3"> <span class=""> Por favor, digite seu telefone.  </span> <br/></p></div>'
        );
        scroll();
        $("#ftelefone").css("display", "flex");
      }, 800);
    }, 1400);
  } else {
    $("#femail input").css("border", "solid 1px #a00");
    $('input[name="cb-email"]').attr("placeholder", "preencha o seu e-mail.");
  }
}

// telefone
function resptelefone() {
  if ($('input[name="cb-tel"]').val() != "") {
    var tel = $('input[name="cb-tel"]').val();
    var nome = $('input[name="cb-nome"]').val();
    var email = $('input[name="cb-email"]').val();

    var whatsappNumber = "5521977411537"; // Substitua pelo número desejado
    var whatsappMessage =
      "Olá, meu nome é " +
      nome +
      ", e meu email é " +
      email +
      ". Estou interessado(a) em mais informações.";
    var whatsappLink =
      "https://api.whatsapp.com/send?phone=" +
      whatsappNumber +
      "&text=" +
      encodeURIComponent(whatsappMessage);

    chatConteudo.append(
      '<div class="col-12 py-2 hel d-flex justify-content-end align-items-start " style=""><p class="hel  text-right conversagente bg-verde"><span class=" text-white" > ' +
        tel +
        '  </span></p><div class="avatarmensagem" style=""></div></div>'
    );
    scroll();
    $("#ftelefone").css("display", "none");

    setTimeout(function () {
      $(".digitando").css("display", "flex");
      setTimeout(function () {
        $(".digitando").css("display", "none");
        chamada();
        chatConteudo.append(
          '<div class="col-md-12 hel py-2 justify-content-start align-items-start" id="" style="display:flex;"><div class="avatarmensagem robo"></div><p class="hel conversarobo ml-3"> <span class="">Clique aqui para falar comigo diretamente no   <a href="' +
            whatsappLink +
            '" target="_blank">WhatsApp</a></span></p></div>'
        );
        scroll();
        chamada();
        chatConteudo.append(
          '<div class="col-md-12 hel py-2 justify-content-start align-items-start" id="" style="display:flex;"><div class="avatarmensagem robo"></div><p class="hel conversarobo ml-3"> <span class=""> Obrigada pelas informações!  </span> <br/></p></div>'
        );
        scroll();
      }, 400);
    }, 1000);
  } else {
    $("#ftelefone input").css("border", "solid 1px #a00");
    $('input[name="cb-tel"]').attr("placeholder", "preencha o seu número.");
  }
}

// Adicionar ouvintes de eventos aos campos de entrada
$("#fnome input").on("keyup", function (event) {
  if (event.key === "Enter") {
    respnome();
  }
});

$("#femail input").on("keyup", function (event) {
  if (event.key === "Enter") {
    respemail();
  }
});

$("#ftelefone input").on("keyup", function (event) {
  if (event.key === "Enter") {
    resptelefone();
  }
});

// Iniciar o chat após o carregamento
$(document).ready(function () {
  chatConteudo.css("display", "none");
  fechar.css("display", "none");
  form.css("display", "none");
});
