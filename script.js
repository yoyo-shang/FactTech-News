// script.js - Simple Dark Mode Toggle

const themeToggleBtn = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');

// The SVG paths for moon and sun
const sunIconPath = '<circle cx="12" cy="12" r="4"></circle><path d="M12 2v2"></path><path d="M12 20v2"></path><path d="m4.93 4.93 1.41 1.41"></path><path d="m17.66 17.66 1.41 1.41"></path><path d="M2 12h2"></path><path d="M20 12h2"></path><path d="m6.34 17.66-1.41 1.41"></path><path d="m19.07 4.93-1.41 1.41"></path>';
const moonIconPath = '<path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>';

// Check localStorage and system preference
function applyTheme(isDark) {
  if (isDark) {
    document.documentElement.classList.add('dark');
    themeIcon.innerHTML = sunIconPath;
    localStorage.theme = 'dark';
  } else {
    document.documentElement.classList.remove('dark');
    themeIcon.innerHTML = moonIconPath;
    localStorage.theme = 'light';
  }
}

// Initial theme check
if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
  applyTheme(true);
} else {
  applyTheme(false);
}

// Toggle listener
themeToggleBtn.addEventListener('click', () => {
  const isDark = document.documentElement.classList.contains('dark');
  applyTheme(!isDark);
});

// --- Search Functionality ---
const searchInputs = document.querySelectorAll('.search-input-wrap input');

searchInputs.forEach(searchInput => {
  if (searchInput) {
    // Check if we are on an article page or a specific category page
    const isArticlePage = window.location.pathname.includes('article-');
    const isCategoryPage = window.location.pathname.includes('graphics-cards.html') || 
                           window.location.pathname.includes('gaming.html') || 
                           window.location.pathname.includes('pc-guides.html') || 
                           window.location.pathname.includes('tutorials.html') || 
                           window.location.pathname.includes('ai-news.html');
    
    // Create hidden "No results" message div if it doesn't exist
    let noResultsMsg = document.getElementById('no-results-msg');
    if (!noResultsMsg && !isArticlePage) {
      noResultsMsg = document.createElement('div');
      noResultsMsg.id = 'no-results-msg';
      noResultsMsg.innerHTML = '<div style="text-align: center; padding: 4rem 2rem;"><svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="margin-bottom: 1rem; opacity: 0.5;"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg><h3>No articles found</h3><p style="color: var(--muted-foreground);">Try searching for something else</p></div>';
      noResultsMsg.style.display = 'none';
      const mainContent = document.querySelector('main .split-left') || document.querySelector('main');
      if (mainContent) mainContent.appendChild(noResultsMsg);
    }

    // If we came from a search redirect, apply the search
    const urlParams = new URLSearchParams(window.location.search);
    const initialQuery = urlParams.get('s');
    if (initialQuery && !isArticlePage) {
      searchInput.value = initialQuery;
      setTimeout(() => {
        searchInput.dispatchEvent(new Event('input'));
      }, 100);
    }

    searchInput.addEventListener('input', (e) => {
      const query = e.target.value.toLowerCase().trim();
      
      // Update ALL other search inputs to match
      searchInputs.forEach(si => { if(si !== searchInput) si.value = e.target.value; });

      // Select all article cards and trending items
      const articleCards = Array.from(document.querySelectorAll('.article-card, .horizontal-card, .trending-item'));
      let foundAny = false;

      articleCards.forEach(card => {
        const title = card.querySelector('h3, h4')?.textContent.toLowerCase() || '';
        const excerpt = card.querySelector('p')?.textContent.toLowerCase() || '';
        const tag = card.querySelector('.card-tag')?.textContent.toLowerCase() || '';
        
        if (title.includes(query) || excerpt.includes(query) || tag.includes(query)) {
          card.style.display = '';
          card.style.opacity = '1';
          if (!card.classList.contains('trending-item')) foundAny = true;
        } else {
          card.style.display = 'none';
          card.style.opacity = '0';
        }
      });

      // Handle section/main content visibility
      const sections = document.querySelectorAll('section, .split-layout');
      sections.forEach(section => {
        const allCards = section.querySelectorAll('.article-card, .horizontal-card');
        if (allCards.length > 0) {
          const visibleInThisSection = Array.from(allCards).some(c => c.style.display !== 'none');
          if (!visibleInThisSection && query !== '') {
            if (!section.classList.contains('split-layout')) section.style.display = 'none';
          } else {
            section.style.display = '';
          }
        }
      });

      if (noResultsMsg) {
        noResultsMsg.style.display = (!foundAny && query !== '') ? 'block' : 'none';
      }
    });

    searchInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        const query = e.target.value.toLowerCase().trim();
        const hasLocalResults = Array.from(document.querySelectorAll('.article-card')).some(c => c.style.display !== 'none');
        
        if (isArticlePage || (!hasLocalResults && query !== '')) {
          window.location.href = `index.html?s=${encodeURIComponent(query)}`;
        }
      }
    });
  }
});

// --- Newsletter Subscription Logic ---
// We use a modular approach that can be easily connected to a real service (like Mailchimp, Formspree, or Firebase)
const subscriptionForms = document.querySelectorAll('form');

subscriptionForms.forEach(form => {
  if (form.innerHTML.includes('type="email"')) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const emailInput = form.querySelector('input[type="email"]');
      const submitBtn = form.querySelector('button[type="submit"]');
      const emailValue = emailInput.value.trim();

      if (emailValue) {
        // 1. Visual loading state
        const originalBtnText = submitBtn.innerText;
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<svg class="animate-spin" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v4m0 12v4M4.93 4.93l2.83 2.83m8.48 8.48l2.83 2.83M2 12h4m12 0h4M4.93 19.07l2.83-2.83m8.48-8.48l2.83-2.83"/></svg> Subscribing...';

        // 2. Simulated "Registration" Logic (Storage for future use)
        // In a real app, you would send this to your backend/API here
        const subscribers = JSON.parse(localStorage.getItem('tech_newsletter_subscribers') || '[]');
        if (!subscribers.includes(emailValue)) {
          subscribers.push(emailValue);
          localStorage.setItem('tech_newsletter_subscribers', JSON.stringify(subscribers));
        }

        // 3. Success Feedback UI
        setTimeout(() => {
          form.innerHTML = `
            <div style="text-align: center; background: rgba(34, 197, 94, 0.1); border: 1px solid rgba(34, 197, 94, 0.2); box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1); padding: 1.5rem; border-radius: var(--radius); animation: fadeIn 0.4s ease-out;">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#22c55e" stroke-width="2.5" style="margin-bottom: 0.5rem;"><path d="m22 11.08V12a10 10 0 1 1-5.93-9.14"/><path d="m22 4-11.73 11.72-3.51-3.51"/></svg>
              <h4 style="color: #22c55e; margin-bottom: 0.25rem;">You're subscribed!</h4>
              <p style="font-size: 0.8125rem; opacity: 0.8;">Keep an eye on <b>${emailValue}</b> for the latest tech news.</p>
            </div>
          `;
          
          console.log(`%c [Subscription] Registered: ${emailValue}. You can now use this list to trigger email notifications when you add new articles!`, "color: #22c55e; font-weight: bold;");
        }, 1200);
      }
    });
  }
});

// --- Mobile Menu Logic ---
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const closeMenuBtn = document.getElementById('closeMenu');
const mobileMenu = document.getElementById('mobileMenu');

if (mobileMenuToggle && mobileMenu && closeMenuBtn) {
  const toggleMenu = (show) => {
    if (show) {
      mobileMenu.classList.add('active');
      document.body.style.overflow = 'hidden'; // Prevent scrolling
    } else {
      mobileMenu.classList.remove('active');
      document.body.style.overflow = '';
    }
  };

  mobileMenuToggle.addEventListener('click', () => toggleMenu(true));
  closeMenuBtn.addEventListener('click', () => toggleMenu(false));

  // Close menu on link click
  const mobileLinks = mobileMenu.querySelectorAll('a');
  mobileLinks.forEach(link => {
    link.addEventListener('click', () => toggleMenu(false));
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') toggleMenu(false);
  });
}
