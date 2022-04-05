document.addEventListener("DOMContentLoaded", () => {
  console.log("MUST");
  getHubspotData("offert");
});

const datepickerDate = () => {
  let date = new Date();
  date.setMonth(date.getMonth() + 6);
  return date;
};

(function (factory) {
  "use strict";
  if (typeof define === "function" && define.amd) {
    // AMD. Register as an anonymous module.
    define(["../widgets/datepicker"], factory);
  } else {
    // Browser globals
    factory(jQuery.datepicker);
  }
})(function (datepicker) {
  "use strict";
  datepicker.regional.sv = {
    closeText: "Stäng",
    prevText: "&#xAB;Förra",
    nextText: "Nästa&#xBB;",
    currentText: "Idag",
    monthNames: [
      "januari",
      "februari",
      "mars",
      "april",
      "maj",
      "juni",
      "juli",
      "augusti",
      "september",
      "oktober",
      "november",
      "december"
    ],
    monthNamesShort: [
      "jan.",
      "feb.",
      "mars",
      "apr.",
      "maj",
      "juni",
      "juli",
      "aug.",
      "sep.",
      "okt.",
      "nov.",
      "dec."
    ],
    dayNamesShort: ["sön", "mån", "tis", "ons", "tor", "fre", "lör"],
    dayNames: [
      "söndag",
      "måndag",
      "tisdag",
      "onsdag",
      "torsdag",
      "fredag",
      "lördag"
    ],
    dayNamesMin: ["sö", "må", "ti", "on", "to", "fr", "lö"],
    weekHeader: "Ve",
    dateFormat: "yy-mm-dd",
    firstDay: 1,
    isRTL: false,
    showMonthAfterYear: false,
    yearSuffix: ""
  };
  datepicker.setDefaults(datepicker.regional.sv);
  return datepicker.regional.sv;
});
$("#datepicker").datepicker({
  maxDate: datepickerDate(),
  minDate: new Date(),
  firstDay: 1
});
$("#datepicker").on("change", function () {
  var event = new Event("input");
  var pickerInput = document.getElementById("datepicker");
  pickerInput.dispatchEvent(event);
});
$(function () {
  $("#calendar-icon").on("click", function (e) {
    $("#datepicker").datepicker("show");
  });
});
