/* ==========================================================================
   JavaScript Functionality - Personal Portfolio
   Vishwa Shah (Full Stack Developer & AI Enthusiast)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  
  // ==========================================
  // 1. THEME SWITCHING (DARK/LIGHT MODE)
  // ==========================================
  const themeToggleBtn = document.getElementById('themeToggle');
  const themeIcon = themeToggleBtn.querySelector('i');
  
  // Check local storage or prefers-color-scheme
  const savedTheme = localStorage.getItem('theme') || 
                     (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
                     
  document.documentElement.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);
  
  themeToggleBtn.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
  });
  
  function updateThemeIcon(theme) {
    if (theme === 'light') {
      themeIcon.className = 'fa-solid fa-sun';
      themeIcon.style.color = 'var(--accent-pink)';
    } else {
      themeIcon.className = 'fa-solid fa-moon';
      themeIcon.style.color = 'var(--accent-cyan)';
    }
  }

  // ==========================================
  // 2. TYPEWRITER HEADING ANIMATION
  // ==========================================
  const words = ["⚡ Full Stack Developer", "🤖 AI & ML Enthusiast", "🎓 B.Tech Computer Science And Technology Student", "🔒 Cybersecurity Learner"];
  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const typewriterElement = document.getElementById('typewriter');
  
  function type() {
    const currentWord = words[wordIndex];
    
    if (isDeleting) {
      typewriterElement.textContent = currentWord.substring(0, charIndex - 1);
      charIndex--;
    } else {
      typewriterElement.textContent = currentWord.substring(0, charIndex + 1);
      charIndex++;
    }
    
    let typingSpeed = 100;
    
    if (isDeleting) {
      typingSpeed /= 2; // Delete faster
    }
    
    if (!isDeleting && charIndex === currentWord.length) {
      typingSpeed = 2000; // Pause at full word
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      typingSpeed = 500; // Pause before typing next word
    }
    
    setTimeout(type, typingSpeed);
  }
  
  type(); // Start typewriter effect

  // ==========================================
  // 3. INTERACTIVE 3D LANYARD BADGE SWAY
  // ==========================================
  const lanyardWrapper = document.getElementById('lanyardWrapper');
  const lanyardCard = document.getElementById('lanyardCard');
  
  if (lanyardWrapper && lanyardCard) {
    lanyardWrapper.addEventListener('mousemove', (e) => {
      const rect = lanyardWrapper.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      
      // Calculate rotation ratios based on mouse coordinate distance from center
      const tiltX = (y / (rect.height / 2)) * -12; // tilt vertical
      const tiltY = (x / (rect.width / 2)) * 12;   // tilt horizontal
      
      lanyardCard.style.animation = 'none'; // Pause pendulum swinging during hover
      lanyardCard.style.transform = `rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale(1.05)`;
    });
    
    lanyardWrapper.addEventListener('mouseleave', () => {
      // Re-enable sway animation and reset transitions on mouse leave
      lanyardCard.style.transform = 'rotateX(0deg) rotateY(0deg) scale(1)';
      lanyardCard.style.transition = 'transform 0.5s ease';
      
      setTimeout(() => {
        lanyardCard.style.animation = 'swayPhysics 8s infinite ease-in-out';
        lanyardCard.style.transition = '';
      }, 500);
    });
  }

  // ==========================================
  // 4. SCROLL REVEAL (Timeline Items)
  // ==========================================
  const scrollElements = document.querySelectorAll('.scroll-reveal');
  
  const elementInView = (el, dividend = 1) => {
    const elementTop = el.getBoundingClientRect().top;
    return (
      elementTop <= (window.innerHeight || document.documentElement.clientHeight) / dividend
    );
  };
  
  const displayScrollElement = (element) => {
    element.classList.add('show');
  };
  
  const handleScrollAnimation = () => {
    scrollElements.forEach((el) => {
      if (elementInView(el, 1.15)) {
        displayScrollElement(el);
      }
    });
  };
  
  window.addEventListener('scroll', () => {
    handleScrollAnimation();
    highlightNavLinks();
  });
  
  handleScrollAnimation(); // Initial run in case elements already in viewport

  // ==========================================
  // 5. NAVIGATION LINK ACTIVE INDICATORS
  // ==========================================
  const navLinkItems = document.querySelectorAll('.nav-link-item');
  const sections = document.querySelectorAll('section');
  
  function highlightNavLinks() {
    let currentSectionId = 'home';
    const scrollPosition = window.scrollY + 150; // offset for nav header height
    
    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        currentSectionId = section.getAttribute('id');
      }
    });
    
    navLinkItems.forEach((link) => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSectionId}`) {
        link.classList.add('active');
      }
    });
  }

  // ==========================================
  // 6. PROJECTS DETAILED INFOS MODAL
  // ==========================================
  const projectDetails = {
    bidlens: {
      title: "BidLens",
      tagline: "AI-Powered Tender Analysis Platform",
      desc: "BidLens is a comprehensive enterprise tool that simplifies government and commercial tender tracking. It leverages AI and Optical Character Recognition (OCR) to read massive tender proposals, verify deadlines, audit matching constraints, and output summaries.",
      features: [
        "AI Document Parsing: Automated metadata extraction from lengthy legal and business PDF uploads.",
        "Requirement Matchmaker: Machine analysis auditing your skills/assets against tender requirements.",
        "Interactive analytics dashboards monitoring bids status, budget caps, and deadline thresholds.",
        "Database Index: High speed filtering across state, national, and company proposals."
      ],
      tech: ["React.js", "Node.js", "Express.js", "PostgreSQL", "Gemini AI", "OCR"],
      demo: "https://bid-lens-iota.vercel.app",
      repo: "https://github.com/Vishwashah1010/BidLens"
    },
    urbanpulse: {
      title: "UrbanPulse",
      tagline: "Hyperlocal Civic Issue Reporting Platform",
      desc: "UrbanPulse is an interactive crowdsourced platform that allows residents to report local municipal issues (like potholes, power outages, and broken infrastructure) directly to civic administrators.",
      features: [
        "Interactive Mapping: Point-and-click issue pinning on custom Leaflet maps.",
        "AI Dispatching: Automated classification and department routing based on text descriptions.",
        "Status Telemetry: Real-time update tracker for active issue remediation.",
        "Community Voting: Upvote and verification logic allowing citizens to endorse civic reports."
      ],
      tech: ["React.js", "Express.js", "TypeScript", "Leaflet Maps", "Gemini AI"],
      demo: "https://urban-pulse-hyperlocal-problem-solv.vercel.app",
      repo: "https://github.com/Vishwashah1010/UrbanPulse"
    },
    transitops: {
      title: "TransitOps",
      tagline: "Real-time Dispatch & Fleet Control Dashboard",
      desc: "TransitOps is a transport-centric operations portal mapping vehicle locations, automating driver dispatch assignments, and alerting dispatchers of delays or scheduling warnings.",
      features: [
        "Live Telemetry Map: Plotting active vehicles on responsive Leaflet coordinates.",
        "Automated Dispatches: Programmed assigning logic triggered by schedules and geographic parameters.",
        "Real-Time Sync: Dual data updates between drivers and controllers utilizing WebSockets.",
        "AI Operations Control Room: Monitoring live charts, dispatch statuses, and warning alerts."
      ],
      tech: ["React.js", "TypeScript", "Node.js", "WebSockets", "Leaflet Maps"],
      demo: "https://transit-ops-drab-two.vercel.app",
      repo: "https://github.com/Vishwashah1010/TransitOps"
    },
    cryptotrade: {
      title: "CryptoTrade",
      tagline: "Cryptocurrency Real-time Analytics Dashboard",
      desc: "CryptoTrade maps currency markets, visualizes price graphs, tracks portfolio balances, and generates real-time price warnings in a highly fluid interface.",
      features: [
        "Live Market Feeds: Seamless currency tracking integrating CoinGecko REST APIs.",
        "Interactive Charts: Plotting token histories over customized time ranges.",
        "Mock Portfolio: Client-side tracking simulation representing investment gains.",
        "Fast Filters: Grouping and sorting indicators mapping market capitalizations."
      ],
      tech: ["React.js", "JavaScript", "REST APIs", "CSS Grid"],
      demo: "https://crypto-trade-ashy.vercel.app",
      repo: "https://github.com/Vishwashah1010/CryptoTrade"
    },
    propvault: {
      title: "PropVault",
      tagline: "AI Real Estate Locker & Recommendations Portal",
      desc: "PropVault acts as a secure repository for housing documentation, leveraging scanning algorithms to extract mortgage rates, analyzing cash-on-cash returns, and proposing deals.",
      features: [
        "Document Vault: Secure cloud uploads mapping credentials and property deeds.",
        "AI Paperwork Scan: Auto-extraction of interest terms, loan caps, and tax rules.",
        "Deal Evaluator: Predictive algorithm evaluating cash-flow margins.",
        "Recommendation Grid: Custom suggestions proposing investment locations."
      ],
      tech: ["React.js", "Django", "PostgreSQL", "Tailwind CSS", "OCR"],
      demo: "#",
      repo: "https://github.com/Vishwashah1010"
    }
  };

  const projectModal = document.getElementById('projectModal');
  const modalClose = document.getElementById('modalClose');
  const modalTitle = document.getElementById('modalTitle');
  const modalTagline = document.getElementById('modalTagline');
  const modalDesc = document.getElementById('modalDesc');
  const modalFeatures = document.getElementById('modalFeatures');
  const modalTech = document.getElementById('modalTech');
  const modalDemoLink = document.getElementById('modalDemoLink');
  const modalRepoLink = document.getElementById('modalRepoLink');
  
  const projectCards = document.querySelectorAll('.project-card');
  
  projectCards.forEach((card) => {
    card.addEventListener('click', () => {
      const projectKey = card.getAttribute('data-project');
      const data = projectDetails[projectKey];
      
      if (data) {
        modalTitle.textContent = data.title;
        modalTagline.textContent = data.tagline;
        modalDesc.textContent = data.desc;
        
        // Populate features list
        modalFeatures.innerHTML = '';
        data.features.forEach((feature) => {
          const li = document.createElement('li');
          li.innerHTML = feature.replace(/:/g, ': <strong>') + '</strong>';
          modalFeatures.appendChild(li);
        });
        
        // Populate tech tags
        modalTech.innerHTML = '';
        data.tech.forEach((tech) => {
          const span = document.createElement('span');
          span.className = 'tech-tag';
          span.textContent = tech;
          modalTech.appendChild(span);
        });
        
        // Setup links
        modalDemoLink.setAttribute('href', data.demo);
        modalRepoLink.setAttribute('href', data.repo);
        
        // Handle "PropVault" (no active demo)
        if (projectKey === 'propvault') {
          modalDemoLink.style.display = 'none';
        } else {
          modalDemoLink.style.display = 'inline-block';
        }
        
        projectModal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Stop page scroll behind modal
      }
    });
  });
  
  // Close triggers
  function closeModal() {
    projectModal.classList.remove('active');
    document.body.style.overflow = '';
  }
  
  modalClose.addEventListener('click', closeModal);
  projectModal.addEventListener('click', (e) => {
    if (e.target === projectModal) {
      closeModal();
    }
  });
  
  // Escape key closes modal
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeModal();
    }
  });

  // ==========================================
  // 7. CONTACT FORM SUBMISSION
  // ==========================================
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const message = document.getElementById('message').value;
      
      // Showcase successful submit simulation
      alert(`Thank you, ${name}! Your mock message has been registered. Viswha will respond at ${email}.`);
      contactForm.reset();
    });
  }

});
