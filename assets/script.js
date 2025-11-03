// Portfolio JavaScript - Antonio Murolo

document.addEventListener('DOMContentLoaded', function() {
  // Mobile menu functionality
  const mobileMenuButton = document.getElementById('mobile-menu-button');
  const mobileMenu = document.getElementById('mobile-menu');
  const hamburgerIcon = document.getElementById('hamburger-icon');
  const closeIcon = document.getElementById('close-icon');
  let isMenuOpen = false;

  if (mobileMenuButton && mobileMenu) {
    mobileMenuButton.addEventListener('click', function() {
      isMenuOpen = !isMenuOpen;
      
      if (isMenuOpen) {
        mobileMenu.style.maxHeight = mobileMenu.scrollHeight + 'px';
        mobileMenu.style.opacity = '1';
        if (hamburgerIcon) hamburgerIcon.style.display = 'none';
        if (closeIcon) closeIcon.style.display = 'block';
      } else {
        mobileMenu.style.maxHeight = '0px';
        mobileMenu.style.opacity = '0';
        if (hamburgerIcon) hamburgerIcon.style.display = 'block';
        if (closeIcon) closeIcon.style.display = 'none';
      }
    });

    // Close menu when clicking on nav links
    const navLinks = mobileMenu.querySelectorAll('a');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.style.maxHeight = '0px';
        mobileMenu.style.opacity = '0';
        if (hamburgerIcon) hamburgerIcon.style.display = 'block';
        if (closeIcon) closeIcon.style.display = 'none';
        isMenuOpen = false;
      });
    });
  }

  // GitHub API functionality
  const GITHUB_USER = "muanto";
  const repoList = document.getElementById("repo-list");

  // Function to show error message
  function showError(message) {
    repoList.innerHTML = `
      <div class="col-span-full text-center py-12">
        <div class="bg-red-500/10 border border-red-500/20 rounded-lg p-6 inline-block">
          <p class="text-red-400 flex items-center gap-2">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
            </svg>
            ${message}
          </p>
        </div>
      </div>
    `;
  }

  // Fetch GitHub repositories
  fetch(`https://api.github.com/users/${GITHUB_USER}/repos?sort=updated`)
    .then((res) => {
      if (!res.ok) {
        throw new Error(`Errore HTTP: ${res.status} - ${res.statusText}`);
      }
      return res.json();
    })
    .then((repos) => {
      if (!Array.isArray(repos)) {
        throw new Error('Formato dati non valido ricevuto dall\'API');
      }
      
      const filteredRepos = repos.filter(
        (r) => !r.fork && !r.private && r.name !== `${GITHUB_USER}.github.io`
      );
      
      if (filteredRepos.length === 0) {
        showError('Nessun repository pubblico trovato');
        return;
      }
      
      repoList.innerHTML = "";
      
      filteredRepos.forEach((repo, index) => {
        const repoDiv = document.createElement("div");
        repoDiv.className = "bg-secondary/50 backdrop-blur-sm rounded-2xl p-6 border border-border hover:border-accent transition-all group hover:transform hover:scale-105";
        repoDiv.style.animationDelay = `${index * 0.1}s`;
        repoDiv.classList.add('animate-slide-up');

        repoDiv.innerHTML = `
          <div class="flex items-start justify-between mb-4">
            <div class="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center group-hover:bg-accent/30 transition-colors">
              <svg class="w-6 h-6 text-accent" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zm0 4a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1V8zm8 0a1 1 0 011-1h4a1 1 0 011 1v2a1 1 0 01-1 1h-4a1 1 0 01-1-1V8zm0 4a1 1 0 011-1h4a1 1 0 011 1v2a1 1 0 01-1 1h-4a1 1 0 01-1-1v-2z" clip-rule="evenodd"></path>
              </svg>
            </div>
            <a href="${repo.html_url}" target="_blank" class="text-text-secondary hover:text-accent transition-colors">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
              </svg>
            </a>
          </div>
          
          <h3 class="text-xl font-semibold text-accent mb-3 group-hover:text-accent-dark transition-colors">
            ${repo.name}
          </h3>
          
          <p class="text-text-secondary text-sm leading-relaxed mb-4 flex-grow">
            ${repo.description || 'Nessuna descrizione disponibile'}
          </p>
          
          <div class="flex items-center justify-between text-sm text-text-secondary">
            ${repo.language ? `
              <div class="flex items-center gap-2">
                <div class="w-3 h-3 rounded-full bg-accent"></div>
                <span>${repo.language}</span>
              </div>
            ` : '<div></div>'}
            
            <div class="flex items-center gap-4">
              <div class="flex items-center gap-1">
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
                <span>${repo.stargazers_count}</span>
              </div>
              
              <div class="flex items-center gap-1">
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M7.707 3.293a1 1 0 010 1.414L5.414 7H11a7 7 0 017 7v2a1 1 0 11-2 0v-2a5 5 0 00-5-5H5.414l2.293 2.293a1 1 0 11-1.414 1.414L2.586 7l3.707-3.707a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                </svg>
                <span>${repo.forks_count}</span>
              </div>
            </div>
          </div>
        `;
        
        repoList.appendChild(repoDiv);
      });
    })
    .catch((error) => {
      console.error('Errore nel caricamento dei repository:', error);
      if (error.message.includes('403')) {
        showError('Limite di richieste API raggiunto. Riprova più tardi.');
      } else if (error.message.includes('404')) {
        showError('Utente GitHub non trovato.');
      } else {
        showError('Errore nel caricamento dei repository. Riprova più tardi.');
      }
    });

  // Skill bars animation trigger
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.3,
    rootMargin: '0px 0px -50px 0px'
  });

  // Observe all skill sections
  document.querySelectorAll('.skills-section').forEach(section => {
    observer.observe(section);
  });
});