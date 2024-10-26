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

// incio do chat, robo falando
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
    '<div class="col-md-12  hel py-2 justify-content-start align-items-start" id="" style="display:flex;"><div class="avatarmensagem robo"></div><p class="hel conversarobo ml-3"> <span class=""> Qual o seu nome? </span> <br/></p></div>'
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
      }, 900);
    }, 1800);
  } else {
    $("#fnome input").css("border", "solid 1px #a00");
    $('input[name="cb-nome"]').attr("placeholder", "preencha o seu nome.");
  }
}

// email
function respemail() {
  if ($('input[name="cb-email"]').val() != "") {
    var email = $('input[name="cb-email"]').val();

    // pessoal email
    chatConteudo.append(
      '<div class="col-12 py-2 hel d-flex justify-content-end align-items-start" style=""><p class="hel  text-right conversagente bg-verde"><span class=" text-white" > ' +
        email +
        ' </span></p><div class="avatarmensagem" style=""></div></div>'
    );
    $("#femail").css("display", "none");
    scroll();

    //bot
    setTimeout(function () {
      $(".digitando").css("display", "flex");
      setTimeout(function () {
        $(".digitando").css("display", "none");

        chamada();
        chatConteudo.append(
          '<div class="col-md-12 hel py-2 justify-content-start align-items-start" id="" style="display:flex;"><div class="avatarmensagem robo"></div><p class="hel conversarobo ml-3"> <span class=""> Por fim, qual seu número de Whatsapp?</p></div>'
        );
        scroll();
        $("#ftelefone").css("display", "flex");
      }, 400);
    }, 1000);
  } else {
    $("#femail input").css("border", "solid 1px #a00");
    $('input[name="cb-email"]').attr("placeholder", "preencha o seu nome.");
  }
}

// telefone
var whatsappMessage =
  "Olá, meu nome é Soraya Teixeira. Está com interesse em baixar o Book de Plantas para conhecer as opções que combinam com seu estilo de vida? Qual é o seu melhor email?";
var whatsappNumber = "5521977411537"; // Substitua pelo número desejado
var whatsappLink =
  "https://api.whatsapp.com/send?phone=" +
  whatsappNumber +
  "&text=" +
  encodeURIComponent(whatsappMessage);
function resptelefone() {
  if ($('input[name="cb-tel"]').val() != "") {
    // var ebook = '  <a href="plantas/plantas.pdf"    target="blank" onclick="gtag(\'event\', \'click\', {  \'event_category\': \'button\',  \'event_label\': \'book\'});"; class="btn-verde hel bg-rosa btn text-white text-uppercase my-1 small">book</a> <br>';
    // var tour = '   <a href="https://v.cyrelatc.com.br/tour/living-parque-jardim-apartamento-tipo"   target="blank" onclick="gtag(\'event\', \'click\', {  \'event_category\': \'button\',  \'event_label\': \'tour-chat\'});"; class="btn-verde bg-rosa btn text-white text-uppercase my-1 small hel" >tour</a> <br>';
    var plantas =
      '<a href="' +
      whatsappLink +
      '" target="blank" class="btn-verde hel bg-rosa btn text-white text-uppercase my-1 small">Plantas</a> <br>';

    var local =
      '<a href="https://maps.google.com/maps?q=-22.905192873178116,-43.17876333840828" target="blank"  class="btn-verde  hel bg-rosa btn text-white text-uppercase my-1 small" >Localização</a> <br>';

    var tel = $('input[name="cb-tel"]').val();

    const urlAtual = window.location.href;
    var chave;
    if (urlAtual.includes("lpmeta.gatebyyoo.com.br")) {
      chave = "B10AF0F3-8F74-406B-94FD-98EBB3E0C80B";
    } else if (urlAtual.includes("pmax.gatebyyoo.com.br")) {
      chave = "4F02DD0B-874C-4726-9A53-417630DC36C1";
    } else {
      chave = "A0F953B7-30E2-4DB2-BE70-D9E1EB81611A";
    }

    var formData = {
      nome: $('input[name="cb-nome"]').val(),
      telefone: $('input[name="cb-tel"]').val(),
      email: $('input[name="cb-email"]').val(),
      utm_source: "chat-bot",
      chave: chave,
      guid: "F5C7CD41-E8FF-EE11-80D8-00155D7C3508",
      empreendimento: "GateByyoo",
      tbox: "345",
      "g-recaptcha-response": "00",
    };

    $.ajax({
      type: "post",
      url: "https://integracao.agenciadigitalrj.com/lp/cyrela/envia.php",
      data: formData,
      dataType: "json",
      encode: true,
      success: function (response) {
        console.log(response);
      },
    });
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
          '<div class="col-md-12 hel py-2 justify-content-start align-items-start" id="" style="display:flex;"><div class="avatarmensagem robo"></div><p class="hel conversarobo ml-3"> <span class="">Obrigada pelas informações! </p></div>'
        );
        scroll();
      }, 400);
    }, 1000);

    setTimeout(function () {
      $(".digitando").css("display", "flex");
      setTimeout(function () {
        $(".digitando").css("display", "none");

        chamada();
        chatConteudo.append(
          '<div class="col-md-12 hel py-2 justify-content-start align-items-start" id="" style="display:flex;"><div class="avatarmensagem robo"></div><p class="hel conversarobo ml-3"> <span class="">Encontrei aqui materiais bem legais sobre o lançamento. Qual deles gostaria de ver primeiro?  <br>   ' +
            plantas +
            "  " +
            local +
            "   </p></div>"
        );
        scroll();
      }, 500);
    }, 1100);

    setTimeout(function () {
      $(".digitando").css("display", "flex");
      setTimeout(function () {
        $(".digitando").css("display", "none");

        chamada();
        chatConteudo.append(
          '<div class="col-md-12 py-2 hel justify-content-start align-items-start" id="" style="display:flex;"><div class="avatarmensagem robo"></div><p class="hel conversarobo ml-3"> <span class="">Agradeço muito seu interesse, em breve um de nossos consultores entrará em contato para te passar mais detalhes do empreendimento 🙂</p></div>'
        );
        scroll();
      }, 800);
    }, 1400);
  } else {
    $("#femail input").css("border", "solid 1px #a00");
    $('input[name="cb-email"]').attr("placeholder", "preencha o seu nome.");
  }
}
// chat

// enter

$("#textoChat-nome").on("keydown", function (event) {
  if (event.key === "Enter") {
    // Verifica se a tecla pressionada é "Enter"
    event.preventDefault(); // Evita o comportamento padrão do Enter
    respnome();
  }
});

$("#textoChat-email").on("keydown", function (event) {
  if (event.key === "Enter") {
    // Verifica se a tecla pressionada é "Enter"
    event.preventDefault(); // Evita o comportamento padrão do Enter
    respemail();
  }
});

$("#textoChat-telefone").on("keydown", function (event) {
  if (event.key === "Enter") {
    // Verifica se a tecla pressionada é "Enter"
    event.preventDefault(); // Evita o comportamento padrão do Enter
    resptelefone();
  }
});

//mascara telefone

$("#textoChat-telefone").mask("(00) 0000-00009");
$("#textoChat-telefone").blur(function (event) {
  if ($(this).val().length == 15) {
    // Celular com 9 dígitos + 2 dígitos DDD e 4 da máscara
    $("#textoChat-telefone").mask("(00) 00000-0009");
  } else {
    $("#textoChat-telefone").mask("(00) 0000-00009");
  }
});
$(".textoChat-email").mask("A", {
  translation: {
    A: { pattern: /[\w@\-.+]/, recursive: true },
  },
});
$(document).click("#aceito", function () {});
