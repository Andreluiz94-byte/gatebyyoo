$(document).ready(function () {
  const urlAtual = window.location.href;
  var chave;
  if (urlAtual.includes("lpmeta.gatebyyoo.com.br")) {
    chave = "B10AF0F3-8F74-406B-94FD-98EBB3E0C80B";
  } else if (urlAtual.includes("pmax.gatebyyoo.com.br")) {
    chave = "4F02DD0B-874C-4726-9A53-417630DC36C1";
  } else {
    chave = "A0F953B7-30E2-4DB2-BE70-D9E1EB81611A";
  }
  //     console.log(chave);

  var content = "";
  var title = "";
  window.local = "";
  var startPos;
  var geoSuccess = function (position) {
    startPos = position;
    window.local =
      "(" + startPos.coords.latitude + "," + startPos.coords.longitude + ")";
    // console.log(window.local);
  };
  var geoError = function (error) {
    console.log("Ocorreu um erro. Erro de código: " + error.code);
  };
  navigator.geolocation.getCurrentPosition(geoSuccess, geoError);
  function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
      results = regex.exec(location.search);
    return results === null
      ? ""
      : decodeURIComponent(results[1].replace(/\+/g, " "));
  }
  if (getParameterByName("utm_source")) {
    var utm_source = getParameterByName("utm_source");
    Cookies.set("utm_source", utm_source, {
      expires: 7,
    });
  } else if (Cookies.get("utm_source")) {
    var utm_source = Cookies.get("utm_source");
  } else {
    var utm_source = "Orgânico";
  }
  if (getParameterByName("utm_medium")) {
    var utm_medium = getParameterByName("utm_medium");
    Cookies.set("utm_medium", utm_medium, {
      expires: 7,
    });
  } else if (Cookies.get("utm_medium")) {
    var utm_medium = Cookies.get("utm_medium");
  } else {
    var utm_medium = "LP";
  }
  if (getParameterByName("utm_term")) {
    var utm_term = getParameterByName("utm_term");
    Cookies.set("utm_term", utm_term, {
      expires: 7,
    });
  } else if (Cookies.get("utm_term")) {
    var utm_term = Cookies.get("utm_term");
  } else {
    var utm_term = "Desconhecido";
  }
  if (getParameterByName("utm_content")) {
    var utm_content = getParameterByName("utm_content");
    Cookies.set("utm_content", utm_content, {
      expires: 7,
    });
  } else if (Cookies.get("utm_content")) {
    var utm_content = Cookies.get("utm_content");
  } else {
    var utm_content = "Desconhecido";
  }
  if (getParameterByName("utm_campaign")) {
    var utm_campaign = getParameterByName("utm_campaign");
    Cookies.set("utm_campaign", utm_campaign, {
      expires: 7,
    });
  } else if (Cookies.get("utm_campaign")) {
    var utm_campaign = Cookies.get("utm_campaign");
  } else {
    var utm_campaign = "Desconhecido";
  }
  var SPMaskBehavior = function (val) {
      return val.replace(/\D/g, "").length === 11
        ? "(00) 00000-0000"
        : "(00) 0000-00009";
    },
    spOptions = {
      onKeyPress: function (val, e, field, options) {
        field.mask(SPMaskBehavior.apply({}, arguments), options);
      },
    };
  // formulario
  $("input").blur(function () {
    if ($(this).val() == "") {
      var txt = $(this).attr("placeholder");
      if (txt.length < 9) {
        $(this).attr("placeholder", "Campo " + txt + " Incorreto.");
      }
      $(this).addClass("border-danger");
    } else {
      $(this).removeClass("border-danger");
    }
  });
  $("input[name=telefone]").mask("(00) 0000-00009");
  $("input[name=telefone]").blur(function (event) {
    if ($(this).val().length == 15) {
      // Celular com 9 dígitos + 2 dígitos DDD e 4 da máscara
      $("input[name=telefone]").mask("(00) 00000-0009");
    } else {
      $("input[name=telefone]").mask("(00) 0000-00009");
    }
  });
  function form(fm, rmclass, link) {
    var nome = $("#" + fm + " input[name=nome]");
    var email = $("#" + fm + " input[name=email]");
    var tel = $("#" + fm + " input[name=telefone]");
    var cont = 0;
    // verificar os campos
    // nome
    if (nome.val() == "") {
      cont++;
      nome.css("border", "2px solid #a00 !important");
      nome.attr("placeholder", "Nome incorreto.");
    }
    // // email
    if (email.val() == "" || email.val().includes("@") == false) {
      cont++;
      email.css("border", "2px solid #a00 !important");
      email.attr("placeholder", "E-mail incorreto.");
    }
    // // telefone
    if (tel.val() == "") {
      cont++;
      tel.css("border", "2px solid #a00 !important");
      tel.attr("placeholder", "Telefone incorreto.");
    }

    console.log(cont);
    if (cont == 0) {
      var formData = {
        asssuntoForm: $("#" + fm + "input[name=assuntoForm]").val(),
        nome: $("#" + fm + " input[name=nome]").val(),
        telefone: $("#" + fm + " input[name=telefone]").val(),
        email: $("#" + fm + " input[name=email]").val(),
        mensagem: $("#" + fm + " textarea[name=mensagem]").val(),
        honeypot: $("#" + fm + " input[name=honeypot]").val(),
        utm_source: utm_source,
        utm_medium: utm_medium,
        utm_campaign: utm_campaign,
        chave: chave,
        guid: "F5C7CD41-E8FF-EE11-80D8-00155D7C3508",
        empreendimento: "GateByyoo",
        tbox: "345",
        "g-recaptcha-response": "00",
      };
      console.log(formData);
      $.ajax({}).done(function (json) {
        $.ajax({
          type: "get",
          url: "https://hooks.zapier.com/hooks/catch/1137812/3tsdksz/",
          data: formData,
          // dataType: 'json',
          // encode: true,
          // headers: formData,
          success: function (response) {
            $.ajax({
              type: "post",
              url: "log.php",
              data: formData,
              dataType: "json",
              encode: true,
            });
            console.log(response);

            if (response.status === "success") {
              console.log("Requisição bem-sucedida!");
              location.href = link;
            } else {
              console.log("error");
            }
          },
          beforeSend: function () {
            $("#" + fm + " button").css({
              display: "flex",
              "justify-content": "center",
              "align-items": "center",
              gap: "2rem",
              color: "#fff",
            });
            $("#" + fm + " button").append(
              '<div class="spinner-border  carregando" style="width: 1rem; height: 1rem; display: flex;" role="status"></div>'
            );
            $("#" + fm + " classe").attr("disabled", true);
            $("#" + fm + " button").removeClass(rmclass);
          },
        }).done(function (data) {
          if (data.response) {
            // location.href = link;
          } else {
            // $('.form').html('<div class="alert alert-warning">Houve um problema, tente novamente mais tarde.</div>');
          }
        });
      });
    }
  }

  // $('.envia').click(function (e) {
  //         var rmclasse = 'envia';
  //     form( 'contato', rmclasse, 'obrigado.html');
  //         $('#contato').submit(function (e) {
  //                 event.preventDefault();
  //         });

  // });

  $(".enviaemp").click(function (e) {
    var rmclasse = "enviaemp";
    form("ftour", rmclasse, "plantas/plantas.pdf");
    $("#ftour").submit(function (e) {
      event.preventDefault();
    });
  });
});
