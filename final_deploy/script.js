// ========================================
// ScrollSpy: 현재 섹션에 따라 nav 활성화
// ========================================

window.addEventListener("scroll", () => {
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll(".nav-link");

  let current = "";

  sections.forEach(sec => {
    const top = sec.offsetTop - 80;
    if (window.scrollY >= top) current = sec.id;
  });

  navLinks.forEach(link => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });
});

// ========================================
// Hamburger Menu Toggle
// ========================================

const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

if (hamburger && navMenu) {
  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
  });

  document.querySelectorAll(".nav-link").forEach(link => {
    link.addEventListener("click", () => {
      hamburger.classList.remove("active");
      navMenu.classList.remove("active");
    });
  });

  document.addEventListener("click", (e) => {
    if (!e.target.closest(".nav-container")) {
      hamburger.classList.remove("active");
      navMenu.classList.remove("active");
    }
  });
}

// ========================================
// Smooth Scroll
// ========================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    
    if (href === '#' || href.startsWith('http')) {
      return;
    }

    e.preventDefault();

    const target = document.querySelector(href);
    if (target) {
      const offset = 80;
      const targetPosition = target.offsetTop - offset;
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  });
});

// ========================================
// 고도화된 카운트업 애니메이션 (Metrics)
// ========================================

const animateCounters = () => {
  const metricNumbers = document.querySelectorAll('.metric-number');
  let hasAnimated = false;

  const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !hasAnimated) {
        hasAnimated = true;
        
        metricNumbers.forEach(el => {
          const finalValue = parseInt(el.getAttribute('data-value') || el.textContent.replace(/[^0-9]/g, ''));
          let currentValue = 0;
          const duration = 2500; // 2.5초
          const increment = finalValue / (duration / 16); // 60fps
          
          const counter = setInterval(() => {
            currentValue += increment;
            if (currentValue >= finalValue) {
              currentValue = finalValue;
              clearInterval(counter);
            }
            el.textContent = Math.floor(currentValue) + (el.textContent.match(/[^\d]/g)?.join('') || '');
          }, 16);
        });
      }
    });
  }, observerOptions);

  const metricsSection = document.querySelector('.metrics');
  if (metricsSection) {
    observer.observe(metricsSection);
  }
};

// ========================================
// 고도화된 스크롤 애니메이션 (요소별 fade-up)
// ========================================

const observeScrollAnimations = () => {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -60px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        // 약간의 지연을 주어 연쇄 애니메이션 효과
        const delay = index % 3 === 0 ? 0 : index % 3 === 1 ? 0.1 : 0.2;
        setTimeout(() => {
          entry.target.style.animation = `fadeUpIn 0.8s ease-out forwards`;
          entry.target.style.opacity = '0';
          entry.target.offsetHeight; // Trigger reflow
          entry.target.style.animation = `fadeUpIn 0.8s ease-out forwards`;
        }, delay * 100);
        
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // 애니메이션 대상 요소들
  document.querySelectorAll(
    '.story-card, .program-card, .metric-card, .team-info-box, .team-staff, .team-contact, blockquote'
  ).forEach(el => {
    el.style.opacity = '0';
    observer.observe(el);
  });
};

// ========================================
// 페이지 로드 및 초기화
// ========================================

window.addEventListener('load', () => {
  // 로딩 화면 숨기기
  const loadingScreen = document.getElementById('loadingScreen');
  if (loadingScreen) {
    setTimeout(() => {
      loadingScreen.classList.add('hidden');
      // 2초 후 DOM에서 제거
      setTimeout(() => {
        loadingScreen.style.display = 'none';
      }, 600);
    }, 1800); // 1.8초 후 로딩 화면 제거
  }

  document.body.classList.add('loaded');
  animateCounters();
  observeScrollAnimations();
  
  // 모든 섹션에 애니메이션 추가
  document.querySelectorAll('section').forEach((section, index) => {
    section.style.animation = `fadeUpIn 0.9s ease-out ${0.1 * index}s both`;
  });
});

// DOM이 준비되면 실행
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    animateCounters();
    observeScrollAnimations();
  });
} else {
  animateCounters();
  observeScrollAnimations();
}

// ========================================\n// 모바일 화면 크기 변화 감지
// ========================================

let windowWidth = window.innerWidth;

window.addEventListener('resize', () => {
  const newWindowWidth = window.innerWidth;
  
  if ((windowWidth <= 768 && newWindowWidth > 768) || 
      (windowWidth > 768 && newWindowWidth <= 768)) {
    if (hamburger && navMenu) {
      hamburger.classList.remove("active");
      navMenu.classList.remove("active");
    }
  }
  
  windowWidth = newWindowWidth;
});

// ========================================
// 포스터 모달 함수
// ========================================

function openModal(element) {
  const img = element.querySelector('img');
  const modal = document.getElementById('posterModal');
  const modalImage = document.getElementById('modalImage');
  
  modalImage.src = img.src;
  modalImage.alt = img.alt;
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  const modal = document.getElementById('posterModal');
  modal.classList.remove('active');
  document.body.style.overflow = 'auto';
}

// ESC 키로 모달 닫기
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeModal();
  }
});

// ========================================
// 숫자 카운팅 애니메이션
// ========================================

function countUp(element, target, duration = 2000) {
  const start = 0;
  const increment = target / (duration / 16);
  let current = start;

  const updateNumber = () => {
    current += increment;
    if (current < target) {
      element.textContent = Math.floor(current);
      requestAnimationFrame(updateNumber);
    } else {
      element.textContent = target;
    }
  };

  updateNumber();
}

// Intersection Observer로 섹션이 보일 때 애니메이션 시작
const observerOptions = {
  threshold: 0.3,
  rootMargin: '0px 0px -100px 0px'
};

const summaryObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
      entry.target.classList.add('animated');
      
      // 메인 카드 숫자 애니메이션
      document.querySelectorAll('.summary-number[data-count]').forEach(el => {
        const target = parseInt(el.getAttribute('data-count'));
        countUp(el, target, 2000);
      });

      // 서브 카드 숫자 애니메이션
      document.querySelectorAll('.summary-sub-number[data-count]').forEach(el => {
        const target = parseInt(el.getAttribute('data-count'));
        countUp(el, target, 2000);
      });

      summaryObserver.unobserve(entry.target);
    }
  });
}, observerOptions);

// summary 섹션 감시
const summarySection = document.getElementById('summary');
if (summarySection) {
  summaryObserver.observe(summarySection);
}
