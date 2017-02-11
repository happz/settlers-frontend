const log = require('loglevel');

const languages = {
  cz: {
    'Settlers': 'Osadníci',

    /* Navigation bar */
    'Home': 'Domů',
    'Archive': 'Archív',
    'New': 'Nové',
    'Board': 'Nástěnka',
    'Stats': 'Statistiky',
    'Settings': 'Nastavení',
    'Help': 'Nápověda',
    'Admin': 'Admin',
    'Monitor': 'Monitor',
    'Log out': 'Odhlásit',

    /* Commonly used patterns */
    'Success!': 'Povedlo se!',
    'Error!': 'Zrada!',

    'Set': 'Nastavit',

    'This window will disappear in 5 seconds.':
        'Tohle okno samo zmizí za 5 sekund.',

    /* Board posts */
    'New message': 'Nová zpráva',
    'Add': 'Odeslat',
    'Preview': 'Náhled',
    'Newest': 'Nejnovější',
    'Newer': 'Novější',
    'Older': 'Starší',
    'Oldest': 'Nejstarší',

    /* Login page */
    'Username': 'Přihlašovací jméno',
    'Password': 'Heslo',
    'Log in': 'Přihlásit se',

    /*
     * Registration page
     */
    'New player': 'Novy hrac',
    'Create account': 'Zalozit ucet',
    'E-mail': 'E-mail',
    'Account registered.': 'Ucet vytvoren.',

    /*
     * Settings page
     */
    'Account': 'Účet',
    'Settings were successfully updated.': 'Nastavení uloženo.',

    /* Change e-mail */
    'Invalid e-mail format': 'E-mail nemá správný formát',
    'Change e-mail': 'Změnit e-mail',
    'Your new e-mail address': 'Vaše nová adresa',

    /* Change password */
    'Invalid password format': 'Heslo nemá správný formát',
    'Change password': 'Změnit heslo',
    '2 to 256 characters': '2 až 256 znaků',
    'Password verification': 'Ověření hesla',

    /* After pass turn */
    'Pass turn': 'Předání tahu',
    'What to do after passing a turn?': 'Co udělat po předání tahu ve hře?',
    'Switch to the next game': 'Přepnout do další hry',
    'Stay in the current game': 'Zůstat v aktuální hře',
    'Switch to the current games listing': 'Přepnout na seznam her',

    /* Color */
    'Favourite color': 'Oblíbená barva',
    'Pick a game kind...': 'Zvolte druh her...',
    'Pick a color': 'Zvolte barvu',



    /*
     * Home Page
     */
    'Active': 'Rozehrane',
    'Free': 'Volne',
    'Inactive': 'Dokoncene',
    'Game': 'Hra',
    'Players': 'Hraci',
    'players': 'hraci',
    'Join': 'Pridat se',
    'Show board': 'Ukazat desku',
    'Show history': 'Ukazat historii',
    'Show chat': 'Ukazat nastenku',
    'Show stats': 'Ukazat statistiky',
    'Winner is': 'Vitezem je',


    /*
     * Errors
     */
    'Invalid username or password': 'Chybne jmeno ci heslo',
  }
};

let _ = function(pattern) {
  if (languages.cz.hasOwnProperty(pattern))
    return languages.cz[pattern];

  log.warn(`Missing language pattern: "${pattern}"`);
  return pattern;
};

module.exports._ = _;
