// Улучшенный glitch эффект с случайными вспышками
const glitchElement = document.querySelector('.glitch');
if (glitchElement) {
    let glitchInterval;
    
    function triggerGlitch() {
        glitchElement.style.animation = 'none';
        setTimeout(() => {
            glitchElement.style.animation = 'glitch-intense 0.3s';
        }, 10);
    }
    
    // Случайные вспышки glitch эффекта
    function randomGlitch() {
        const randomDelay = Math.random() * 3000 + 2000; // 2-5 секунд
        glitchInterval = setTimeout(() => {
            triggerGlitch();
            randomGlitch(); // Рекурсивно вызываем для следующей вспышки
        }, randomDelay);
    }
    
    // Начинаем случайные вспышки
    // randomGlitch(); // Временно отключено
    
    // Убрано анимацию при наведении для предотвращения тряски
}

// Частицы на фоне hero секции
const canvas = document.getElementById('particles-canvas');
if (canvas) {
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const particleCount = 50;

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2 + 1;
            this.speedX = Math.random() * 1 - 0.5;
            this.speedY = Math.random() * 1 - 0.5;
            this.opacity = Math.random() * 0.5 + 0.2;
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;

            if (this.x > canvas.width) this.x = 0;
            if (this.x < 0) this.x = canvas.width;
            if (this.y > canvas.height) this.y = 0;
            if (this.y < 0) this.y = canvas.height;
        }

        draw() {
            ctx.fillStyle = `rgba(0, 255, 136, ${this.opacity})`;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    function initParticles() {
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }
    }

    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        for (let i = 0; i < particles.length; i++) {
            particles[i].update();
            particles[i].draw();

            // Соединяем близкие частицы
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 100) {
                    ctx.strokeStyle = `rgba(0, 255, 136, ${0.1 * (1 - distance / 100)})`;
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }

        requestAnimationFrame(animateParticles);
    }

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });

    initParticles();
    animateParticles();
}

// Плавная прокрутка для навигации
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // Закрываем мобильное меню если открыто
            if (navMenu) navMenu.classList.remove('active');
        }
    });
});

// Мобильное меню
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        
        // Анимация гамбургера
        const spans = hamburger.querySelectorAll('span');
        if (navMenu.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });
}

// Изменение навигации при прокрутке
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.style.boxShadow = '0 5px 20px rgba(0, 255, 136, 0.1)';
    } else {
        navbar.style.boxShadow = 'none';
    }
    
    lastScroll = currentScroll;
});

// Анимация появления элементов при прокрутке
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Применяем анимацию к элементам
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.player-card, .timeline-item, .stat-item, .match-card, .sponsor-card');
    
    animateElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(el);
    });
});

// Обработка формы контактов
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Получаем данные формы
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            message: document.getElementById('message').value
        };
        
        // Здесь можно добавить отправку на сервер
        console.log('Форма отправлена:', formData);
        
        // Показываем сообщение об успехе
        alert('Спасибо за ваше сообщение! Мы свяжемся с вами в ближайшее время.');
        
        // Очищаем форму
        contactForm.reset();
    });
}

// Эффект параллакса для hero секции
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Добавляем активный класс к текущей секции в навигации
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
            });
            if (navLink) {
                navLink.classList.add('active');
            }
        }
    });
});

// Добавляем стили для активной ссылки
const style = document.createElement('style');
style.textContent = `
    .nav-link.active {
        color: var(--primary-color) !important;
    }
    .nav-link.active::after {
        width: 100% !important;
    }
`;
document.head.appendChild(style);

// Анимация счетчиков для статистики
const animateCounter = (element, target, duration = 2000) => {
    let start = 0;
    const increment = target / (duration / 16);
    
    const updateCounter = () => {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start) + '+';
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target + '+';
        }
    };
    
    updateCounter();
};

// Запускаем анимацию счетчиков когда секция видна
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumbers = entry.target.querySelectorAll('.stat-number');
            statNumbers.forEach(stat => {
                const text = stat.textContent;
                const number = parseInt(text);
                if (!isNaN(number)) {
                    stat.textContent = '0+';
                    animateCounter(stat, number);
                }
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const statsSection = document.querySelector('.stats');
if (statsSection) {
    statsObserver.observe(statsSection);
}

// Добавляем эффект свечения при наведении на карточки игроков
document.querySelectorAll('.player-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.boxShadow = '0 10px 40px rgba(0, 255, 136, 0.3)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.boxShadow = '';
    });
});

// Аудио-цитаты в блоке "Командный дух"
const spiritButtons = document.querySelectorAll('.spirit-audio-btn');
if (spiritButtons.length) {
    const audios = new Map();
    let currentButton = null;

    spiritButtons.forEach(btn => {
        const src = btn.getAttribute('data-audio');
        if (!src) return;

        const audio = new Audio(src);
        audio.preload = 'none';
        audios.set(btn, audio);

        audio.addEventListener('ended', () => {
            btn.classList.remove('is-playing');
            if (currentButton === btn) currentButton = null;
        });

        btn.addEventListener('click', () => {
            const currentAudio = audios.get(btn);
            if (!currentAudio) return;

            // Останавливаем все остальные
            audios.forEach((a, b) => {
                if (b !== btn) {
                    a.pause();
                    a.currentTime = 0;
                    b.classList.remove('is-playing');
                }
            });

            if (btn.classList.contains('is-playing')) {
                currentAudio.pause();
                btn.classList.remove('is-playing');
                currentButton = null;
            } else {
                currentAudio.currentTime = 0;
                currentAudio.play();
                btn.classList.add('is-playing');
                currentButton = btn;
            }
        });
    });
}

// Предотвращаем отправку формы при пустых полях
const formInputs = document.querySelectorAll('#contactForm input, #contactForm textarea');
formInputs.forEach(input => {
    input.addEventListener('blur', function() {
        if (this.value.trim() === '' && this.hasAttribute('required')) {
            this.style.borderColor = 'rgba(255, 0, 102, 0.5)';
        } else {
            this.style.borderColor = 'rgba(0, 255, 136, 0.2)';
        }
    });
    
    input.addEventListener('input', function() {
        if (this.value.trim() !== '') {
            this.style.borderColor = 'rgba(0, 255, 136, 0.5)';
        }
    });
});

