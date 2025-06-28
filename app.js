//==================== CONFIGURATION - MODIFIEZ ICI ====================
// 🔐 CONFIGURATION DE LA PAGE DE CONNEXION
const LOGIN_CONFIG = {
  enabled: true, // 👈 Changez à 'false' pour désactiver la page de connexion
  password: "1234" // 👈 Changez le mot de passe ici

};

// 🖼️ CONFIGURATION affichage logo
const LOGO_CONFIG = {
  loginPage: true,  // 👈 Changez à 'false' pour masquer le logo sur la page de connexion
  mainPage: true    // 👈 Changez à 'false' pour masquer le logo sur la page principale
};

// 🌐 CONFIGURATION SÉLECTEUR DE LANGUE
const LANGUAGE_CONFIG = {
  loginPage: true,  // 👈 Changez à 'false' pour masquer le sélecteur de langue sur la page de connexion
  mainPage: true    // 👈 Changez à 'false' pour masquer le sélecteur de langue sur la page principale
};

    // Protection contre les tentatives de brute force
    let attemptCount = 0;
    const maxAttempts = 3;
    let lockoutTime = 0;

        // Gestion du changement de langue sur la page de connexion
   let loginCurrentLanguage = localStorage.getItem("language") || sessionStorage.getItem('selectedLanguage') || "fr";

    // Traductions pour la page de connexion
    const loginTranslations = {
      fr: {
        currentLang: "Français &#9662;",
        loginTitle: "Accès Sécurisé",
        passwordPlaceholder: "Mot de passe",
        loginBtn: "Se connecter",
        incorrectPassword: "Mot de passe incorrect",
        tooManyAttempts: "Trop de tentatives. Réessayez dans",
        connectionSuccess: "Connexion réussie !",
        legalMentions: "Mentions légales",
        seconds: "secondes"
      },
      en: {
        currentLang: "English &#9662;",
        loginTitle: "Secure Access",
        passwordPlaceholder: "Password",
        loginBtn: "Log in",
        incorrectPassword: "Incorrect password",
        tooManyAttempts: "Too many attempts. Try again in",
        connectionSuccess: "Login successful!",
        legalMentions: "Legal mentions",
        seconds: "seconds"
      },
      es: {
        currentLang: "Español &#9662;",
        loginTitle: "Acceso Seguro",
        passwordPlaceholder: "Contraseña",
        loginBtn: "Iniciar sesión",
        incorrectPassword: "Contraseña incorrecta",
        tooManyAttempts: "Demasiados intentos. Inténtelo de nuevo en",
        connectionSuccess: "¡Inicio de sesión exitoso!",
        legalMentions: "Menciones legales",
        seconds: "segundos"
      },
      it: {
        currentLang: "Italiano &#9662;",
        loginTitle: "Accesso Sicuro",
        passwordPlaceholder: "Password",
        loginBtn: "Accedi",
        incorrectPassword: "Password errata",
        tooManyAttempts: "Troppi tentativi. Riprova tra",
        connectionSuccess: "Accesso riuscito!",
        legalMentions: "Menzioni legali",
        seconds: "secondi"
      }
    };
//=======================================================================

//...................... Variables sécurité.......................................
// Protection contre l'inspection - Désactiver les outils de développement
(function() {
  'use strict';

  // Désactiver le clic droit
  document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
    return false;
  });

  // Désactiver les raccourcis clavier pour les outils de développement
  document.addEventListener('keydown', function(e) {
    // F12, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+U, Ctrl+Shift+C
    if (e.keyCode === 123 ||
      (e.ctrlKey && e.shiftKey && (e.keyCode === 73 || e.keyCode === 74)) ||
      (e.ctrlKey && e.keyCode === 85) ||
      (e.ctrlKey && e.shiftKey && e.keyCode === 67)) {
      e.preventDefault();
      return false;
    }
  });

  // Détection des outils de développement ouverts
  let devtools = {
    open: false,
    orientation: null
  };
  setInterval(function() {
    if (window.outerHeight - window.innerHeight > 200 ||
      window.outerWidth - window.innerWidth > 200) {
      if (!devtools.open) {
        devtools.open = true;

        // Rediriger ou masquer le contenu
        document.body.innerHTML = '<div style="text-align:center;margin-top:50px;"><h1>Accès non autorisé détecté</h1></div>';
      }
    } else {
      devtools.open = false;
    }
  }, 500);

})();

// Obfuscation du mot de passe - Multiple encodages

const _0x4f2a = [LOGIN_CONFIG.password]; // Utilise le mot de passe de la config
const getSecurePassword = () => {
 
  // Le mot de passe réel serait plus complexe à extraire
  const encoded = btoa(LOGIN_CONFIG.password); // Encode le mot de passe configuré
  return atob(encoded);
};

// Protection du code source

(function() {
  const originalConsoleLog = console.log;
  const originalConsoleError = console.error;
  const originalConsoleWarn = console.warn;

  console.log = function() {};
  console.error = function() {};
  console.warn = function() {};
  console.clear = function() {};

  // Brouillage des variables importantes

  window.addEventListener('load', function() {
    delete window.getSecurePassword;
  });
})();

document.addEventListener("DOMContentLoaded", () => {

  // Variables d'authentification sécurisées
  const correctPassword = getSecurePassword();


  // Fonction de vérification d'authentification avec token crypté
  function isAuthenticated() {
    // Si la page de connexion est désactivée, toujours authentifié
    if (!LOGIN_CONFIG.enabled) {
      return true;
    }

    const token = sessionStorage.getItem('authToken');
    if (!token) return false;

    try {
      // Vérification simple du token (dans un vrai projet, utilisez JWT)
      const decoded = atob(token);
      return decoded === 'authenticated_' + new Date().toDateString();
    } catch {
      return false;
    }
  }

  function setAuthenticated(status) {
    if (status) {
      // Créer un token simple mais pas évident
      const token = btoa('authenticated_' + new Date().toDateString());
      sessionStorage.setItem('authToken', token);
    } else {
      sessionStorage.removeItem('authToken');
    }
    window.userAuthenticated = status;
  }

  // Protection contre la manipulation de variables
  Object.defineProperty(window, 'userAuthenticated', {
    set: function(value) {
      this._userAuth = value;
    },
    get: function() {
      return this._userAuth === true && isAuthenticated();
    }
  });

  function showLoginScreen() {
    const loginHTML = `
      <div class="login-screen">
        <div class="logo-container">
     ${LOGO_CONFIG.loginPage ? '<div class="logo-container"><img src="./images/LOGO.png" alt="Logo NOM" class="logo"></div>' : ''}
        </div>

       ${LANGUAGE_CONFIG.loginPage ? `<div id="translate-dropdown">
          <button class="dropdown-btn" data-translate="currentLang">Français &#9662;</button>
          <div class="dropdown-content">
            <a href="#" data-lang="fr">Français</a>
            <a href="#" data-lang="en">English</a>
            <a href="#" data-lang="es">Español</a>
            <a href="#" data-lang="it">Italiano</a>
          </div>
        </div>` : ''}

        <div class="login-container">
          <h1 class="login-title" data-translate="loginTitle">Accès Sécurisé</h1>
          <input type="password" id="passwordInput" class="login-input" data-translate="passwordPlaceholder" placeholder="Mot de passe" autocomplete="off" />
          <button id="loginBtn" class="login-btn" data-translate="loginBtn">Se connecter</button>
          <div id="loginMessage" class="error-message" style="display: none;"></div>
        </div>

        <div class="footer-container" style="margin-top: 30px; text-align: center;">
          <a href="mentions-légales.html" id="legal-mentions-link" data-translate="legalMentions">Mentions légales</a>
          <div id="footer-text">(Name)© 2025</div>
        </div>
      </div>
    `;
    

    document.body.innerHTML = loginHTML;

    const passwordInput = document.getElementById("passwordInput");
    const loginBtn = document.getElementById("loginBtn");
    const loginMessage = document.getElementById("loginMessage");



    function updateLoginTexts() {
      const elements = document.querySelectorAll('[data-translate]');
      elements.forEach(el => {
        const key = el.getAttribute('data-translate');
        if (loginTranslations[loginCurrentLanguage] && loginTranslations[loginCurrentLanguage][key]) {
          if (el.tagName === 'INPUT') {
            el.placeholder = loginTranslations[loginCurrentLanguage][key];
          } else {
            el.innerHTML = loginTranslations[loginCurrentLanguage][key];
          }
        }
      });
      // Mettre à jour le texte du bouton principal du dropdown
      const dropdownBtn = document.querySelector("#translate-dropdown .dropdown-btn");
      if (dropdownBtn) {
        dropdownBtn.innerHTML = loginTranslations[loginCurrentLanguage].currentLang;
      }
    }

   function changeLanguage(lang) {
  currentLanguage = lang;
  localStorage.setItem("language", lang); // ← SAUVEGARDE dans localStorage
  updateTextWithTranslations();
  loadEnigme(currentEnigmeIndex);
  languageChangeSound.play();
}



// Gestionnaire d'événements pour le sélecteur de langue sur la page de connexion

document.querySelectorAll('#translate-dropdown .dropdown-content a').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const newLang = e.target.getAttribute('data-lang');
    if (loginCurrentLanguage !== newLang) {
      loginCurrentLanguage = newLang;
      
      // NOUVEAU : Sauvegarder la langue dans sessionStorage ET localStorage
      sessionStorage.setItem('selectedLanguage', newLang);
      localStorage.setItem('language', newLang); // ✅ Ajout de cette ligne
      
      updateLoginTexts();
      try {
        const languageChangeSound = new Audio('sounds/sound5.mp3');
        languageChangeSound.currentTime = 0;
        languageChangeSound.play();
      } catch (e) {
      
      }
    }
  });
});

    // Écouteur pour le bouton dropdown pour afficher/masquer le contenu
    const dropdownBtnLogin = document.querySelector("#translate-dropdown .dropdown-btn");
    const dropdownContentLogin = document.querySelector("#translate-dropdown .dropdown-content");

    if (dropdownBtnLogin && dropdownContentLogin) {
      dropdownBtnLogin.addEventListener('click', () => {
        dropdownContentLogin.style.display = dropdownContentLogin.style.display === 'block' ? 'none' : 'block';
      });

      // Fermer le dropdown si on clique en dehors
      document.addEventListener('click', (event) => {
        if (!event.target.closest('#translate-dropdown')) {
          dropdownContentLogin.style.display = 'none';
        }
      });
    }


    // Initialiser les traductions une fois que la page de connexion est chargée
    updateLoginTexts();


    function validatePassword() {
      const currentTime = Date.now();

      // Vérifier le lockout
      if (lockoutTime > currentTime) {
        const remainingTime = Math.ceil((lockoutTime - currentTime) / 1000);
        loginMessage.textContent = `${loginTranslations[loginCurrentLanguage].tooManyAttempts} ${remainingTime} ${loginTranslations[loginCurrentLanguage].seconds}.`;
        loginMessage.className = "error-message";
        loginMessage.style.display = "block";
        return;
      }

      const enteredPassword = passwordInput.value;

      // Hachage simple du mot de passe entré (dans un vrai projet, utilisez bcrypt)
      const hashedInput = btoa(enteredPassword);
      const hashedCorrect = btoa(correctPassword);

      if (hashedInput === hashedCorrect) {
        attemptCount = 0;
        setAuthenticated(true);
        loginMessage.textContent = loginTranslations[loginCurrentLanguage].connectionSuccess;
        loginMessage.className = "success-message";
        loginMessage.style.display = "block";

        // Nettoyer les traces
        passwordInput.value = "";

        setTimeout(() => {
          initializeMainApp();
        }, 1000);
      } else {
        attemptCount++;

        if (attemptCount >= maxAttempts) {
          lockoutTime = Date.now() + (30 * 1000); // 30 secondes de blocage
          startCountdown(30, loginMessage, loginCurrentLanguage, loginTranslations);
        } else {
          loginMessage.textContent = `${loginTranslations[loginCurrentLanguage].incorrectPassword} (${attemptCount}/${maxAttempts})`;
        }

        loginMessage.className = "error-message";
        loginMessage.style.display = "block";
        passwordInput.value = "";
        passwordInput.focus();
      }
    }

    // Fonction de compte à rebours pour le lockout
    function startCountdown(duration, messageEl, lang, translationsData) {
      let timer = duration;
      const countdownInterval = setInterval(() => {
        if (timer <= 0) {
          clearInterval(countdownInterval);
          messageEl.style.display = 'none';
          // Réactiver le bouton de connexion si nécessaire
          loginBtn.disabled = false;
          attemptCount = 0; // Réinitialiser le compteur d'essais après le lockout
        } else {
          loginBtn.disabled = true; // Désactiver le bouton pendant le lockout
          messageEl.textContent = `${translationsData[lang].tooManyAttempts} ${timer} ${translationsData[lang].seconds}.`;
          timer--;
        }
      }, 1000);
    }

    loginBtn.addEventListener("click", validatePassword);
    passwordInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        validatePassword();
      }
    });

    passwordInput.focus();

    // Protection contre l'auto-complétion et l'inspection
    passwordInput.setAttribute('autocomplete', 'new-password');
    passwordInput.setAttribute('spellcheck', 'false');
  }

  function initializeMainApp() {
    // Nettoyer les variables sensibles de la mémoire
    if (typeof correctPassword !== 'undefined') {
      delete window.correctPassword;
    }
    //...................... Fin Variables sécurité.......................................




    // Recréer la structure HTML de l'application principale

   // Pour supprimer le logo, supprimer la ligne 384 
    // Pour gérer l'activation du compte à rebours, changer style="display: display" en style="display: none" (ligne 402)
    // Pour gérer l'activation du score, changer changer style="display: display" en style="display: none (ligne 403)
    

    const mainAppHTML = `
      <div class="particles"></div>
       ${LOGO_CONFIG.mainPage ? '<img src="./images/LOGO.png" alt="Logo" class="logo">' : ''}

     ${LANGUAGE_CONFIG.mainPage ? `<div id="translate-dropdown">
        <button class="dropdown-btn" data-translate="currentLang">Français &#9662;</button>
        <div class="dropdown-content">
        <a href="#" data-lang="fr">Français</a>
         <a href="#" data-lang="en">English</a>
          <a href="#" data-lang="es">Español</a>
          <a href="#" data-lang="it">Italiano</a>
        </div>
    </div>` : ''}

  <div id="countdown-timer" data-translate="timeRemaining" style="display: display;">Temps restant : 60:00</div>
<div id="score-display" style="display: display;">Score: 0/10</div>

      <div class="container">
        <div class="arrow arrow-left" style="display: none;">‹</div>  
        <div class="arrow arrow-right">›</div>
        
        <h1 id="enigme-title"></h1>
        <p data-translate="verifyText">Vérifiez votre réponse !</p>

        <input type="text" id="response" data-translate="placeholderResponse" placeholder="Réponse">

        <div>
          <button id="validateBtn" data-translate="validateBtn">Valider</button>
          <button id="hintBtn" data-translate="hintBtn">Indice</button>
          <button id="solutionBtn" data-translate="solutionBtn" style="display: none;">Voir la réponse</button>
        </div>

        <div id="hintText" style="display: none;"></div>
        <div id="solutionText" style="display: none;"></div>
        <div id="message" style="display: none;"></div>
      </div>

      <div class="footer-container">
        <a href="Mentions-légales.html" id="legal-mentions-link" data-translate="legalMentions">Mentions légales</a>
        <span id="footer-text">(Name)© 2025</span>
      </div>
    `;

    document.body.innerHTML = mainAppHTML;

    initializeAppLogic();
  }


  //-------------------- FIN Variables page d'authentification------------------------

  function initializeAppLogic() {
   
    // Supprimer le stockage de langue et réinitialiser
 let currentLanguage = localStorage.getItem("language") || sessionStorage.getItem('selectedLanguage') || "fr";
    let countdownDuration = 60 * 60; //- Compte à rebours initial
    let answeredQuestions = new Set(); // Pour suivre les questions déjà répondues correctement

     // ... autres variables ...

// NOUVEAU : Fonction pour initialiser l'affichage de la langue
function initializeLanguageDisplay() {
  const dropdownBtnMain = document.querySelector("#translate-dropdown .dropdown-btn");
  if (dropdownBtnMain && translations[currentLanguage]) {
    dropdownBtnMain.innerHTML = translations[currentLanguage].currentLang;
  }
}

    const pages = [{
        title: {
          fr: "Titre 1",
          en: "Title 1",
          es: "Título 1",
          it: "Titolo 1"
        },
        correctAnswers: ["réponse 1", "réponse 2", "réponse 3"], // réponses attendue 
        hint: { // indices 
          fr: "Lorem ipsum dolor sit amet",
          en: "Lorem ipsum dolor sit amet",
          es: "Lorem ipsum dolor sit amet",
          it: "Lorem ipsum dolor sit amet"
        },
        solution: {
          fr: "Lorem ipsum dolor sit amet",
          en: "Lorem ipsum dolor sit amet",
          es: "Lorem ipsum dolor sit amet",
          it: "Lorem ipsum dolor sit amet"
        },
        hasHint: true, // changer en false pour supprimer l'affichage du boutons indice 
        hasSolution: true // changer en false pour supprimer l'affichage du bouton solution 
      }, {
        title: {
          fr: "Titre 2",
          en: "Title 2",
          es: "Título 2",
          it: "Titolo 2"
        },
        correctAnswers: ["réponse 1", "réponse 2"],
        hint: {
          fr: "Lorem ipsum dolor sit amet",
          en: "Lorem ipsum dolor sit amet",
          es: "Lorem ipsum dolor sit amet",
          it: "Lorem ipsum dolor sit amet"
        },
        solution: {
          fr: "Lorem ipsum dolor sit amet",
          en: "Lorem ipsum dolor sit amet",
          es: "Lorem ipsum dolor sit amet",
          it: "Lorem ipsum dolor sit amet"
        },
        hasHint: true,
        hasSolution: false
      }, {
        title: {
          fr: "Titre 3",
          en: "Title 3",
          es: "Título 3",
          it: "Titolo 3"
        },
        correctAnswers: ["23358", "23 358"],
        hint: {
          fr: "Lorem ipsum dolor sit amet",
          en: "Lorem ipsum dolor sit amet",
          es: "Lorem ipsum dolor sit amet",
          it: "Lorem ipsum dolor sit amet"
        },
        solution: {
          fr: "Lorem ipsum dolor sit amet",
          en: "Lorem ipsum dolor sit amet",
          es: "Lorem ipsum dolor sit amet",
          it: "Lorem ipsum dolor sit amet"
        },
        hasHint: true,
        hasSolution: false
      }, {
        title: {
          fr: "Titre 4",
          en: "Title 4",
          es: "Título 4",
          it: "Titolo 4"
        },
        correctAnswers: "786",
        hint: {
          fr: "Lorem ipsum dolor sit amet",
          en: "Lorem ipsum dolor sit amet",
          es: "Lorem ipsum dolor sit amet",
          it: "Lorem ipsum dolor sit amet"
        },
        solution: {
          fr: "Lorem ipsum dolor sit amet",
          en: "Lorem ipsum dolor sit amet",
          es: "Lorem ipsum dolor sit amet",
          it: "Lorem ipsum dolor sit amet"
        },
        hasHint: true,
        hasSolution: false
      }, {
        title: {
          fr: "Titre 5",
          en: "Title 5",
          es: "Título 5",
          it: "Titolo 5"
        },
        correctAnswers: {
          fr: "Lorem ipsum dolor sit amet",
          en: "Lorem ipsum dolor sit amet",
          es: "Lorem ipsum dolor sit amet",
          it: "Lorem ipsum dolor sit amet"
        },
        hint: {
          fr: "Lorem ipsum dolor sit amet",
          en: "Lorem ipsum dolor sit amet",
          es: "Lorem ipsum dolor sit amet",
          it: "Lorem ipsum dolor sit amet"
        },
        solution: {
          fr: "Lorem ipsum dolor sit amet",
          en: "Lorem ipsum dolor sit amet",
          es: "Lorem ipsum dolor sit amet",
          it: "Lorem ipsum dolor sit amet"
        },
        hasHint: true,
        hasSolution: false
      }, {
        title: {
          fr: "Titre 6",
          en: "Title 6",
          es: "Título 6",
          it: "Titolo 6"
        },
        correctAnswers: "(8 ; 4)",
        hint: {
          fr: "Lorem ipsum dolor sit amet",
          en: "Lorem ipsum dolor sit amet",
          es: "Lorem ipsum dolor sit amet",
          it: "Lorem ipsum dolor sit amet"
        },
        solution: {
          fr: "Lorem ipsum dolor sit amet",
          en: "Lorem ipsum dolor sit amet",
          es: "Lorem ipsum dolor sit amet",
          it: "Lorem ipsum dolor sit amet"
        },
        hasHint: true,
        hasSolution: false
      }, {
        title: {
          fr: "Titre 7",
          en: "Title 7",
          es: "Título 7",
          it: "Titolo 7"
        },
        correctAnswers: ["VENI, VIDI, VICI, ALESIA, LII", "VENI VIDI VICI ALESIA LII"],
        hint: {
          fr: "Lorem ipsum dolor sit amet",
          en: "Lorem ipsum dolor sit amet.",
          es: "Lorem ipsum dolor sit amet",
          it: "Lorem ipsum dolor sit amet"
        },
        solution: {
          fr: "Lorem ipsum dolor sit amet",
          en: "Lorem ipsum dolor sit amet",
          es: "Lorem ipsum dolor sit amet",
          it: "Lorem ipsum dolor sit amet"
        },
        hasHint: true,
        hasSolution: false
      }, {
        title: {
          fr: "Titre 8",
          en: "Title 8",
          es: "Título 8",
          it: "Titolo 8"
        },
        correctAnswers: {
          fr: "Partage",
          en: "Share",
          es: "Compartir",
          it: "Condivisione"
        },
        hint: {
          fr: "Lorem ipsum dolor sit amet",
          en: "Lorem ipsum dolor sit amet",
          es: "Lorem ipsum dolor sit amet",
          it: "Lorem ipsum dolor sit amet"
        },
        solution: {
          fr: "Lorem ipsum dolor sit amet",
          en: "Lorem ipsum dolor sit amet",
          es: "Lorem ipsum dolor sit amet",
          it: "Lorem ipsum dolor sit amet"
        },
        hasHint: true,
        hasSolution: false
      }, {
        title: {
          fr: "Titre 9",
          en: "Title 9",
          es: "Título 9",
          it: "Titolo 9"
        },
        correctAnswers: {
          fr: "FUSION",
          en: "FUSION",
          es: "FUSIÓN",
          it: "FUSIONE"
        },
        hint: {
          fr: "Lorem ipsum dolor sit amet",
          en: "Lorem ipsum dolor sit amet",
          es: "Lorem ipsum dolor sit amet",
          it: "Lorem ipsum dolor sit amet"
        },
        solution: {
          fr: "Lorem ipsum dolor sit amet",
          en: "Lorem ipsum dolor sit amet",
          es: "Lorem ipsum dolor sit amet",
          it: "Lorem ipsum dolor sit amet"
        },
        hasHint: true,
        hasSolution: false
      }, {
        title: {
          fr: "Titre 10",
          en: "Title 10",
          es: "Título 10",
          it: "Titolo 10"
        },
        correctAnswers: ["23358", "23 358"],
        hint: {
          fr: "Lorem ipsum dolor sit amet",
          en: "Lorem ipsum dolor sit amet",
          es: "Lorem ipsum dolor sit amet",
          it: "Lorem ipsum dolor sit amet"
        },
        solution: {
          fr: "Lorem ipsum dolor sit amet",
          en: "Lorem ipsum dolor sit amet",
          es: "Lorem ipsum dolor sit amet",
          it: "Lorem ipsum dolor sit amet"
        },
        hasHint: true,
        hasSolution: false
       },
    {
      //ajouter ici un nouveau champ de réponse 
    },
  
    ];

    const translations = {
      fr: {
        currentLang: "Français &#9662;",
        verifyText: "Vérifiez votre réponse !",
        placeholderResponse: "Réponse",
        validateBtn: "Valider",
        hintBtn: "Indice",
        solutionBtn: "Voir la réponse",
        legalMentions: "Mentions légales",
        correctMessage: "Bravo ! Vous avez trouvé la bonne réponse",
        incorrectMessage: "Incorrect. Essayez encore",
        hintPenalty: "Pénalité de 5 minutes !",
        solutionPenalty: "Pénalité de 10 minutes !",
        timeRemaining: "Temps restant :",
        timeUp: "Temps écoulé !"
      },
      en: {
        currentLang: "English &#9662;",
        verifyText: "Check your answer !",
        placeholderResponse: "Answer",
        validateBtn: "Validate",
        hintBtn: "Hint",
        solutionBtn: "See answer",
        legalMentions: "Legal mentions",
        correctMessage: "Congratulations ! You found the correct answer",
        incorrectMessage: "Incorrect. Try again",
        hintPenalty: "5 minute penalty !",
        solutionPenalty: "10 minute penalty !",
        timeRemaining: "Time remaining:",
        timeUp: "Time's up!"
      },
      es: {
        currentLang: "Español &#9662;",
        verifyText: "¡ Verifica tu respuesta !",
        placeholderResponse: "Respuesta",
        validateBtn: "Validar",
        hintBtn: "Pista",
        solutionBtn: "Ver la respuesta",
        legalMentions: "Menciones legales",
        correctMessage: "¡ Bravo ! Has encontrado la respuesta correcta",
        incorrectMessage: "Incorrecto. Intenta de nuevo",
        hintPenalty: "Penalización de 5 minutos !",
        solutionPenalty: "Penalización de 10 minutos !",
        timeRemaining: "Tiempo restante:",
        timeUp: "¡Se acabó el tiempo!"
      },
      it: {
        currentLang: "Italiano &#9662;",
        verifyText: "Verifica la tua risposta !",
        placeholderResponse: "Risposta",
        validateBtn: "Validare",
        hintBtn: "Indice",
        solutionBtn: "Vedi la risposta",
        legalMentions: "Menzioni legali",
        correctMessage: "Bravo ! Hai trovato la risposta corretta",
        incorrectMessage: "Errato. Prova di nuovo",
        hintPenalty: "Penalità di 5 minuti !",
        solutionPenalty: "Penalità di 10 minuti !",
        timeRemaining: "Tempo rimanente:",
        timeUp: "Tempo scaduto!"
      },
        de: {
  currentLang: "Deutsch &#9662;",
  verifyText: "Überprüfen Sie Ihre Antwort!",
  placeholderResponse: "Antwort",
  validateBtn: "Bestätigen",
  hintBtn: "Tipp",
  solutionBtn: "Antwort anzeigen",
  legalMentions: "Impressum",
  correctMessage: "Gut gemacht! Richtige Antwort gefunden.",
  incorrectMessage: "Falsch. Versuchen Sie es erneut.",
  hintPenalty: "Strafe von 5 Minuten!",
  solutionPenalty: "Strafe von 10 Minuten!",
  timeRemaining: "Verbleibende Zeit:",
  timeUp: "Zeit abgelaufen!"
      }
    };



    
    let currentPageIndex = 0;
    const pageTitle = document.getElementById("enigme-title");
    const responseInput = document.getElementById("response");
    const validateBtn = document.getElementById("validateBtn");
    const hintBtn = document.getElementById("hintBtn");
    const solutionBtn = document.getElementById("solutionBtn");
    const hintText = document.getElementById("hintText");
    const solutionText = document.getElementById("solutionText");
    const messageElement = document.getElementById("message");
    const prevBtn = document.querySelector(".arrow-left");
    const nextBtn = document.querySelector(".arrow-right");
    const dropdownBtn = document.querySelector("#translate-dropdown .dropdown-btn"); // S'assurer que c'est le bon dropdown
    const verifyText = document.querySelector("[data-translate='verifyText']");
    const transitionSound = new Audio('sounds/sound1.mp3'); // son flèche transition
    const hintSolutionSound = new Audio('sounds/sound2.mp3'); // son bouton indice et réponse
    const incorrectSound = new Audio('sounds/sound3.mp3'); // son réponse incorecte
    const correctSound = new Audio('sounds/sound4.mp3'); // son réponse correcte
    const languageChangeSound = new Audio('sounds/sound5.mp3'); // son sélecteur langage

    let hintUsed = false;


// Pénalités de temps 

    const showPenalties = false; // changer false en true pour afficher des pénalités de temps au clic sur les boutons indice et voir la réponse 
    let hintPenaltyApplied = new Set(); // Pour suivre les pénalités d'indices appliquées
    let solutionPenaltyApplied = new Set(); // Pour suivre les pénalités de solutions appliquées


hintBtn.addEventListener("click", () => {
  if (hintText.style.display === "block") {
    hintText.style.display = "none";
  } else {
    hintText.style.display = "block";
    playHintSolutionSound();

    if (showPenalties && !hintPenaltyApplied.has(currentPageIndex)) {
      showPopup(translations[currentLanguage].hintPenalty);
      countdownDuration -= 5 * 60; // Soustraire 5 minutes (300 secondes)
      hintPenaltyApplied.add(currentPageIndex); // Marquer cette question comme ayant eu sa pénalité d'indice
    }
  }

  hintUsed = true;
  // Afficher le bouton solution seulement si la page le permet
  if (pages[currentPageIndex].hasSolution) {
    solutionBtn.style.display = "inline-block";
  }
  hintBtn.disabled = false;
});

    solutionBtn.addEventListener("click", () => {
      if (solutionText.style.display === "block") {
        solutionText.style.display = "none";
      } else {
        solutionText.style.display = "block";
        playHintSolutionSound();

        if (showPenalties && !solutionPenaltyApplied.has(currentPageIndex)) {
          showPopup(translations[currentLanguage].solutionPenalty);
          countdownDuration -= 10 * 60; // Soustraire 10 minutes (600 secondes)
          solutionPenaltyApplied.add(currentPageIndex); // Marquer cette question comme ayant eu sa pénalité de solution
        }
      }
    });


    // NOUVELLE FONCTION : Mettre à jour l'affichage du score

    function updateScoreDisplay() {
      const scoreElement = document.getElementById("score-display");
      if (scoreElement) {
        // Calculer le nombre total de pages valides (exclure les pages vides)
        const totalValidPages = pages.filter(page => page.title).length;
        const correctAnswersCount = answeredQuestions.size;
        scoreElement.textContent = `Score: ${correctAnswersCount}/${totalValidPages}`;
      }
    }

    function playTransitionSound() {
      transitionSound.currentTime = 0;
      transitionSound.play();
    }

    function playHintSolutionSound() {
      hintSolutionSound.currentTime = 0;
      hintSolutionSound.play();
    }

    function loadPage(index) {
      const page = pages[index];

      responseInput.value = "";
      hintText.style.display = "none";
      solutionText.style.display = "none";
      messageElement.style.display = "none";
      hintUsed = false;

      pageTitle.textContent = page.title[currentLanguage];

      updateNavigation(index);

      if (page.isRedirect) {
        handleRedirectPage(page);
      } else {
        handleRegularPage(page);
      }

      updateTextWithTranslations();
    }

    // LOGIQUE DE VALIDATION MODIFIÉE
    validateBtn.addEventListener("click", () => {
      const userResponse = responseInput.value.trim().toLowerCase();
      const currentPage = pages[currentPageIndex];

      let isCorrect = false;

      if (Array.isArray(currentPage.correctAnswers)) {
        isCorrect = currentPage.correctAnswers.some(answer =>
          userResponse === answer.toLowerCase()
        );
      } else if (typeof currentPage.correctAnswers === "object") {
        isCorrect = userResponse === currentPage.correctAnswers[currentLanguage].toLowerCase();
      } else {
        isCorrect = userResponse === currentPage.correctAnswers.toLowerCase();
      }

      if (isCorrect) {
        // NOUVELLE LOGIQUE : Gérer le score pour les bonnes réponses
        if (!answeredQuestions.has(currentPageIndex)) {
          // Première fois que cette question est résolue correctement
          answeredQuestions.add(currentPageIndex);
          console.log(`Question ${currentPageIndex + 1} résolue ! Score: ${answeredQuestions.size}/${pages.filter(page => page.title).length}`);
        }

        messageElement.style.display = "block";
        messageElement.style.color = "green";
        messageElement.textContent = translations[currentLanguage].correctMessage;
        correctSound.play();
        animateMessage(messageElement, 'correct');

        // Mettre à jour l'affichage du score
        updateScoreDisplay();

      } else {
        // Pour les mauvaises réponses, on ne change plus le score
        messageElement.style.display = "block";
        messageElement.style.color = "red";
        messageElement.textContent = translations[currentLanguage].incorrectMessage;
        incorrectSound.play();
        animateMessage(messageElement, 'incorrect');
      }
    });

    function showPopup(message) {
      const popup = document.createElement('div');
      popup.className = 'popup';
      popup.textContent = message;
      document.body.appendChild(popup);

      setTimeout(() => {
        popup.classList.add('show');
      }, 10);

      setTimeout(() => {
        popup.classList.remove('show');
        setTimeout(() => {
          document.body.removeChild(popup);
        }, 500);
      }, 3000);
    }



    function animateMessage(element, type) {
      element.classList.remove('animate-correct', 'animate-incorrect');
      void element.offsetWidth;
      element.classList.add(`animate-${type}`);
    }

    prevBtn.addEventListener("click", () => {
      if (currentPageIndex > 0) {
        currentPageIndex--;
        loadPage(currentPageIndex);
        playTransitionSound();
      }
    });

    nextBtn.addEventListener("click", () => {
      if (currentPageIndex < pages.length - 1) {
        currentPageIndex++;
        loadPage(currentPageIndex);
        playTransitionSound();
      }
    });

    function updateNavigation(index) {
      prevBtn.style.display = index > 0 ? "block" : "none";
      nextBtn.style.display = index < (pages.length - 1) ? "block" : "none";

      console.log('Current index:', index);
      console.log('Total pages:', pages.length);
      console.log('Should show next button:', index < (pages.length - 1));
    }

    function handleRedirectPage(page) {
      responseInput.style.display = "none";
      validateBtn.style.display = "none";
      hintBtn.style.display = "none";
      solutionBtn.style.display = "none";
      hintText.style.display = "none";
      solutionText.style.display = "none";
      messageElement.style.display = "none";
      verifyText.style.display = "none";

      let redirectButton = document.getElementById('redirectButton');

      if (!redirectButton) {
        redirectButton = document.createElement('button');
        redirectButton.id = 'redirectButton';
        redirectButton.className = 'redirect-button';
        redirectButton.addEventListener('click', () => {
          playTransitionSound();
          window.location.href = page.redirectUrl;
        });
        pageTitle.insertAdjacentElement('afterend', redirectButton);
      }

      redirectButton.textContent = page.buttonText[currentLanguage];
      redirectButton.style.display = "block";
    }

    function handleRegularPage(page) {
      const redirectButton = document.getElementById('redirectButton');
      if (redirectButton) {
        redirectButton.remove();
      }

      responseInput.style.display = "inline-block";
      validateBtn.style.display = "inline-block";
      verifyText.style.display = "block";


      hintText.textContent = page.hint[currentLanguage];
      solutionText.textContent = page.solution[currentLanguage];

      // Gérer l'affichage des boutons indice et solution
      hintBtn.style.display = page.hasHint ? "inline-block" : "none";
      solutionBtn.style.display = page.hasSolution ? "inline-block" : "none";
    }

    // Gestion de la traduction pour la page principale
    function updateTextWithTranslations() {
      // Mettre à jour le texte du bouton principal du dropdown
      const dropdownBtnMain = document.querySelector("#translate-dropdown .dropdown-btn");
      if (dropdownBtnMain) {
        dropdownBtnMain.innerHTML = translations[currentLanguage].currentLang;
      }

      const elements = document.querySelectorAll('[data-translate]');
      elements.forEach(el => {
        const key = el.getAttribute('data-translate');
        if (translations[currentLanguage] && translations[currentLanguage][key]) {
          if (el.tagName === 'INPUT') {
            el.placeholder = translations[currentLanguage][key];
          } else {
            el.innerHTML = translations[currentLanguage][key];
          }
        }
      });

      // Mise à jour spécifique du titre de l'énigme
      if (pages[currentPageIndex] && pages[currentPageIndex].title) {
        pageTitle.textContent = pages[currentPageIndex].title[currentLanguage];
      }
      // Mise à jour spécifique de l'indice
      if (pages[currentPageIndex] && pages[currentPageIndex].hint && hintText.style.display === "block") {
        hintText.textContent = pages[currentPageIndex].hint[currentLanguage];
      }
      // Mise à jour spécifique de la solution
      if (pages[currentPageIndex] && pages[currentPageIndex].solution && solutionText.style.display === "block") {
        solutionText.textContent = pages[currentPageIndex].solution[currentLanguage];
      }
    }


    // Gestionnaire d'événements pour le sélecteur de langue de la page principale
    // 💡 Déplacé ici, après que le HTML de l'application principale a été créé
document.querySelectorAll('#translate-dropdown .dropdown-content a').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const newLang = e.target.getAttribute('data-lang');
    if (currentLanguage !== newLang) {
      currentLanguage = newLang;
      
      // NOUVEAU : Sauvegarder la langue dans sessionStorage ET localStorage
      sessionStorage.setItem('selectedLanguage', newLang);
      localStorage.setItem('language', newLang); // ✅ Ajout de cette ligne
      
      updateTextWithTranslations();
      loadPage(currentPageIndex);
      try {
        languageChangeSound.currentTime = 0;
        languageChangeSound.play();
      } catch (e) {
        // Son non disponible
      }
    }
  });
});

    // Écouteur pour le bouton dropdown de la page principale pour afficher/masquer le contenu
    const mainDropdownBtn = document.querySelector("#translate-dropdown .dropdown-btn");
    const mainDropdownContent = document.querySelector("#translate-dropdown .dropdown-content");

    if (mainDropdownBtn && mainDropdownContent) {
      mainDropdownBtn.addEventListener('click', () => {
        mainDropdownContent.style.display = mainDropdownContent.style.display === 'block' ? 'none' : 'block';
      });

      // Fermer le dropdown si on clique en dehors
      document.addEventListener('click', (event) => {
        if (!event.target.closest('#translate-dropdown')) {
          mainDropdownContent.style.display = 'none';
        }
      });
    }

    // Initialisation du compteur
    let countdownInterval;

    function formatTime(seconds) {
      const minutes = Math.floor(seconds / 60);
      const remainingSeconds = seconds % 60;
      return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
    }

    function startCountdownTimer() {
      const timerDisplay = document.getElementById("countdown-timer");
      clearInterval(countdownInterval); // S'assurer qu'il n'y a qu'un seul intervalle

      countdownInterval = setInterval(() => {
        if (countdownDuration <= 0) {
          clearInterval(countdownInterval);
          timerDisplay.textContent = translations[currentLanguage].timeUp;
          // Gérer la fin du jeu ici (ex: rediriger, afficher un message final)
        } else {
          countdownDuration--;
          timerDisplay.innerHTML = `${translations[currentLanguage].timeRemaining} ${formatTime(countdownDuration)}`;
        }
      }, 1000);
    }

    // Initialiser le jeu
    loadPage(currentPageIndex);
    updateScoreDisplay(); // Initialiser l'affichage du score
    startCountdownTimer(); // Démarrer le compte à rebours
    initializeLanguageDisplay(); // Initialiser l'affichage de la langue sélectionnée
  }

  // Vérifier l'authentification au chargement initial de la page
  if (LOGIN_CONFIG.enabled && !isAuthenticated()) {
    showLoginScreen();
  } else {
    initializeMainApp();
  }
});
