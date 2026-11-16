// Sťažnosť: z formulára zostaví prehľadný e-mail a otvorí ho v e-mailovom
// programe návštevníka. Bez JavaScriptu formulár funguje tiež (cez mailto).
(function () {
  var form = document.getElementById('staznost');
  if (!form) return;
  var status = form.querySelector('.quote-status');
  var ADRESA = 'isat@isat.sk';

  function hodnota(id) {
    var el = document.getElementById(id);
    return el && el.value.trim() ? el.value.trim() : '–';
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (!form.reportValidity()) return;

    var riadky = [
      'SŤAŽNOSŤ',
      '',
      'E-mail: ' + hodnota('s-email'),
      '',
      'POZNÁMKA',
      hodnota('s-poznamka')
    ];

    window.location.href = 'mailto:' + ADRESA +
      '?subject=' + encodeURIComponent(hodnota('s-predmet')) +
      '&body=' + encodeURIComponent(riadky.join('\n'));

    if (status) {
      status.textContent = 'Otvoril sa váš e-mailový program s vyplnenou sťažnosťou. Stačí ju odoslať. ' +
        'Ak sa nič neotvorilo, napíšte nám na ' + ADRESA + ' alebo zavolajte na +421 911 761 114.';
    }
  });
})();
