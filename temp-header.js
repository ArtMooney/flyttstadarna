function getHubspotData(formName) {
  if (document.getElementById(formName)) {
    var formId = document.getElementById(formName);

    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch("https://api.ipify.org?format=json", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        formId.clientip.value = result.ip;
        formId.pageuri.value = window.location.href;
        formId.pagename.value = document.title;
      })
      .catch((error) => console.log("error", error));

    if (readCookie.getCookie("hubspotutk") !== undefined) {
      formId.hubspotutk.value = readCookie.getCookie("hubspotutk");
    } else {
      formId.hubspotutk.value = "";
    }
  }
}

var readCookie = (function () {
  return {
    getCookie: function (name) {
      var value = "; " + document.cookie;
      var parts = value.split("; " + name + "=");
      if (parts.length === 2) {
        return parts.pop().split(";").shift();
      }
    },
  };
})();

var createCookie = function (name, value, days) {
  var expires;
  if (days) {
    var date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = "; expires=" + date.toUTCString();
  } else {
    expires = "";
  }
  document.cookie = name + "=" + value + expires + "; path=/";
};

function deleteCookie(name) {
  document.cookie = name + "=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
}

function listCookies() {
  var theCookies = document.cookie.split(";");
  var aString = "";
  for (var i = 1; i <= theCookies.length; i++) {
    aString += i + " " + theCookies[i - 1] + "\n";
  }
  return aString;
}

// ---------

let tal1;
let tal2;

function createMath() {
  const svarTal = document.querySelectorAll("[svar-tal]");

  tal1 = Math.floor(Math.random() * 12);
  tal2 = Math.floor(Math.random() * 12);

  for (const svar of svarTal) {
    svar.innerHTML = tal1 + "+" + tal2 + "=";
  }
}

window.addEventListener("load", function () {
  createMath();
});

var Webflow = Webflow || [];

Webflow.push(function () {
  $(document).off("submit");
  $("form").submit(function (evt) {
    evt.preventDefault();
    var action = $(this).attr("action");
    var data = "";

    for (const item of $(this).serializeArray()) {
      data = data + `${item.name}=${item.value}&`;
    }

    for (const item of document.querySelectorAll("[svar]")) {
      if (parseInt(item.value) === tal1 + tal2) {
        var requestOptions = {
          method: "GET",
          redirect: "follow",
        };

        fetch(
          "https://api.ngine.se/webhook/flyttstadarna?" + data,
          requestOptions
        )
          .then((response) => response.text())
          .then((result) => {
            document.getElementById("choose-form").style.display = "none";
            var currentForm = evt.currentTarget;
            currentForm.style.display = "none";
            currentForm.parentElement.getElementsByClassName(
              "success-message"
            )[0].style.display = "block";
            setTimeout(() => {
              document.getElementById("redirect-button").click();
            }, 3000);
          })
          .catch((error) => {
            console.log("error", error);
            document.getElementById("choose-form").style.display = "none";
            var currentForm = evt.currentTarget;
            currentForm.style.display = "none";
            currentForm.parentElement.getElementsByClassName(
              "error-message"
            )[0].style.display = "block";
          });
      } else {
        item.value = "";
        item.style.backgroundColor = "#f00";
        setTimeout(() => {
          item.style.backgroundColor = "#f7f7f7";
          createMath();
        }, 100);
      }
    }
  });
});
