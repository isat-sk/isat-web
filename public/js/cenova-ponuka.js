// Žiadosť o cenovú ponuku: z vyplneného formulára zostaví prehľadný e-mail
// a otvorí ho v e-mailovom programe návštevníka. Bez JavaScriptu formulár
// funguje tiež (odošle údaje cez mailto), len menej prehľadne.
(function () {
  var form = document.getElementById('cenova-ponuka');
  if (!form) return;
  var status = form.querySelector('.quote-status');
  var ADRESA = 'isat@isat.sk';

  function hodnota(id) {
    var el = document.getElementById(id);
    return el && el.value.trim() ? el.value.trim() : '–';
  }

  function zaskrtnute(skupina) {
    var vybrane = [];
    form.querySelectorAll('input[name="' + skupina + '"]:checked').forEach(function (el) {
      vybrane.push('  • ' + el.value);
    });
    return vybrane.length ? vybrane.join('\n') : '  –';
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (!form.reportValidity()) return;

    var riadky = [
      'ŽIADOSŤ O CENOVÚ PONUKU',
      '',
      'ÚDAJE O PODNIKU',
      'Názov podniku: ' + hodnota('p-nazov'),
      'IČO: ' + hodnota('p-ico'),
      'DIČ: ' + hodnota('p-dic'),
      'IČ DPH: ' + hodnota('p-icdph'),
      'Sídlo: ' + hodnota('p-sidlo'),
      '',
      'KONTAKTNÁ OSOBA',
      'Meno: ' + hodnota('p-meno'),
      'Funkcia: ' + hodnota('p-funkcia'),
      'E-mail: ' + hodnota('p-email'),
      'Telefón: ' + hodnota('p-telefon'),
      '',
      'ROZSAH HOSPODÁRENIA',
      'Počet katastrálnych území: ' + hodnota('p-ku'),
      'Obhospodarovaná výmera (ha): ' + hodnota('p-vymera'),
      '',
      'MODULY ISAT-HOLDING',
      zaskrtnute('Moduly'),
      '',
      'SLUŽBY',
      zaskrtnute('Služby'),
      '',
      'POZNÁMKA',
      hodnota('p-poznamka'),
      '',
      'Súhlas so spracúvaním osobných údajov: áno'
    ];

    var predmet = 'Žiadosť o cenovú ponuku – ' + hodnota('p-nazov');
    window.location.href = 'mailto:' + ADRESA +
      '?subject=' + encodeURIComponent(predmet) +
      '&body=' + encodeURIComponent(riadky.join('\n'));

    if (status) {
      status.textContent = 'Otvoril sa váš e-mailový program s vyplnenou žiadosťou. Stačí ju odoslať. ' +
        'Ak sa nič neotvorilo, napíšte nám na ' + ADRESA + ' alebo zavolajte na +421 911 761 114.';
    }
  });
})();
