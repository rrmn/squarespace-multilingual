// Function to get the current page's language from hreflang tags
function getCurrentPageLanguage() {
    console.log("Fetching the language for the current page from hreflang tags...");
    const links = document.querySelectorAll('link[rel="alternate"]');
    const currentUrl = window.location.href;
    for (let link of links) {
        if (link.href === currentUrl) {
            const lang = link.getAttribute('hreflang');
            console.log("Detected page language from hreflang:", lang);
            return lang;
        }
    }
    console.log("No matching hreflang tag found, defaulting to 'en'.");
    return 'en'; // Default to English if no match is found
}

// Function to get alternate language URLs from hreflang tags
function getAlternateLangUrls() {
    console.log("Fetching alternate language URLs from hreflang tags...");
    const links = document.querySelectorAll('link[rel="alternate"]');
    const langUrls = {};

    links.forEach(link => {
        const lang = link.getAttribute('hreflang');
        const href = link.getAttribute('href');
        langUrls[lang] = href;
        console.log(`Found hreflang URL: ${lang} -> ${href}`);
    });

    return langUrls;
}

// Insert the bubble only if lang is 'it' or 'en'
function insertBubble(currentLang, langUrls) {
    var bubbleText;
    var alternateLangUrl;

    if (currentLang === 'it') {
        bubbleText = 'EN';
        alternateLangUrl = langUrls['en'];
    } else if (currentLang === 'en') {
        bubbleText = 'IT';
        alternateLangUrl = langUrls['it'];
    } else {
        return; // Don't do anything if it's neither 'it' nor 'en'
    }

    if (!alternateLangUrl) {
        console.log("No alternate language URL available, not displaying the bubble.");
        return;
    }

    // Construct the HTML string for main page
    var bubbleHTML = `
        <a href="${alternateLangUrl}" class="SocialLinks-link text-bubble">
          <div>
            <svg class="SocialLinks-link-svg" viewBox="0 0 64 64">
              <circle cx="32" cy="32" r="32" class="SocialLinks-link-mask"></circle>
              <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-size="32" class="SocialLinks-link-icon" dy=".1em" style="fill: white;">
                ${bubbleText}
              </text>
            </svg>
          </div>
        </a>
    `;

    // Append the bubble to the container on the main page
    document.querySelector('.SocialLinks-inner').insertAdjacentHTML('beforeend', bubbleHTML);
}

// Insert the language selector in the mobile menu (if both languages exist)
function insertMobileMenuLangSelector(langUrls) {
    console.log("Inserting language selector in the mobile menu...");
    let enUrl = langUrls['en'] || null;
    let itUrl = langUrls['it'] || null;

    // If both languages exist, create the selector
    if (enUrl || itUrl) {
        let mobileLangSelectorHTML = `
          <span class="Mobile-overlay-nav-item">
            ${enUrl ? `<a href="${enUrl}">EN</a>` : 'EN'}
            |
            ${itUrl ? `<a href="${itUrl}">IT</a>` : 'IT'}
          </span>
        `;

        // Append the language selector to the mobile menu
        document.querySelector('.Mobile-overlay-menu-main nav').insertAdjacentHTML('beforeend', mobileLangSelectorHTML);
    }
}
  
function updateMenuLanguage(pageLang) {
    // Header navigation items and their links
    var headerNavItems = document.querySelectorAll(".Header-nav-item");
    
    // Mobile menu navigation items and their links
    var mobileNavItems = document.querySelectorAll(".Mobile-overlay-nav-item");

    if (pageLang === "it") {
      
        // Italian translations and links for DESKTOP Header
        if (headerNavItems[0]) {
            headerNavItems[0].innerText = "Home";
            headerNavItems[0].href = "/it/home";
        }
        if (headerNavItems[1]) {
            headerNavItems[1].innerText = "Per Creator";
            headerNavItems[1].href = "/it/per-creator";
        }
        if (headerNavItems[2]) {
            headerNavItems[2].innerText = "Per Brand e Agenzie";
            headerNavItems[2].href = "/it/per-brand-e-agenzie";
        }
        if (headerNavItems[3]) {
            headerNavItems[3].innerText = "Chi siamo";
            headerNavItems[3].href = "/it/chi-siamo";
        }
        if (headerNavItems[4]) {
            headerNavItems[4].innerText = "Lavora con Noi";
            headerNavItems[4].href = "/it/lavora-con-noi";
        }

        // Italian translations and links for MOBILE Menu
        if (mobileNavItems[0]) {
            mobileNavItems[0].innerText = "Home";
            mobileNavItems[0].href = "/it/home";
        }
        if (mobileNavItems[1]) {
            mobileNavItems[1].innerText = "Per Creator";
            mobileNavItems[1].href = "/it/per-creator";
        }
        if (mobileNavItems[2]) {
            mobileNavItems[2].innerText = "Per Brand e Agenzie";
            mobileNavItems[2].href = "/it/per-brand-e-agenzie";
        }
        if (mobileNavItems[3]) {
            mobileNavItems[3].innerText = "Chi siamo";
            mobileNavItems[3].href = "/it/chi-siamo";
        }
        if (mobileNavItems[4]) {
            mobileNavItems[4].innerText = "Lavora con Noi";
            mobileNavItems[4].href = "/it/lavora-con-noi";
        }
    }
}
// Initialize language detection based on hreflangs, cookie setting, and setting lang attribute
document.addEventListener('DOMContentLoaded', function() {
    const pageLang = getCurrentPageLanguage(); // Get the language of the current page
    document.documentElement.setAttribute("lang", pageLang); // set the html lang
    const langUrls = getAlternateLangUrls(); // Get alternate language URLs

    insertBubble(pageLang, langUrls); // Add the language selector bubble to the main page
    insertMobileMenuLangSelector(langUrls); // Add language selector to the mobile menu
    updateMenuLanguage(pageLang); // update menu language
});
