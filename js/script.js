// Function untuk menampilkan pesan selamat datang
function welcomeMessage() {
    let userName = prompt("Masukkan nama Anda:");
    
    if (!userName || userName.trim() === '') {
        userName = "Tamu";
    }
    
    document.getElementById("welcome-text").textContent = `Halo, ${userName}! Saya Ahmad Topandi`;
}

// Function untuk mobile menu
function setupMobileMenu() {
    const menuBtn = document.getElementById('menuBtn');
    const nav = document.querySelector('.nav');
    
    menuBtn.addEventListener('click', function() {
        nav.classList.toggle('active');
        
        const icon = menuBtn.querySelector('i');
        if (nav.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
}

// Function untuk update waktu
function updateCurrentTime() {
    const now = new Date();
    const options = { 
        weekday: 'short', 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        timeZoneName: 'short'
    };
    
    const timeString = now.toLocaleString('en-US', options);
    document.getElementById('currentTime').textContent = `Current time: ${timeString}`;
}

// Function untuk form contact
function setupContactForm() {
    const form = document.getElementById('contactForm');
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('name').value.trim();
        const birthdate = document.getElementById('birthdate').value;
        const gender = document.querySelector('input[name="gender"]:checked');
        const message = document.getElementById('message').value.trim();
        
        // Validasi sederhana
        if (!name || !birthdate || !gender || !message) {
            alert('Harap isi semua field!');
            return;
        }
        
        // Format tanggal lahir
        const dateObj = new Date(birthdate);
        const formattedDate = `${dateObj.getDate().toString().padStart(2, '0')}/${(dateObj.getMonth() + 1).toString().padStart(2, '0')}/${dateObj.getFullYear()}`;
        
        // Update waktu saat ini
        updateCurrentTime();
        
        // Tampilkan data di result display
        document.getElementById('resultName').textContent = name;
        document.getElementById('resultBirthdate').textContent = formattedDate;
        document.getElementById('resultGender').textContent = gender.value;
        document.getElementById('resultMessage').textContent = message;
        
        // Reset form
        form.reset();
        
        // Scroll ke result display
        document.getElementById('resultDisplay').scrollIntoView({ 
            behavior: 'smooth',
            block: 'center'
        });
    });
}

// Function validasi email
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Function untuk smooth scroll
function setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Tutup mobile menu jika terbuka
                const nav = document.querySelector('.nav');
                const menuBtn = document.getElementById('menuBtn');
                
                if (nav.classList.contains('active')) {
                    nav.classList.remove('active');
                    const icon = menuBtn.querySelector('i');
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
                
                // Scroll ke element
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Function untuk active nav link
function setActiveNavLink() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        const headerHeight = document.querySelector('.header').offsetHeight;
        
        if (window.scrollY >= (sectionTop - headerHeight - 50)) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').substring(1) === currentSection) {
            link.classList.add('active');
        }
    });
}

// Initialize ketika DOM loaded
document.addEventListener('DOMContentLoaded', function() {
    welcomeMessage();
    setupMobileMenu();
    setupContactForm();
    setupSmoothScroll();
    
    // Set waktu awal
    updateCurrentTime();
    
    // Event listener untuk scroll
    window.addEventListener('scroll', setActiveNavLink);
    
    // Set active link awal
    setActiveNavLink();
});

// Simple debounce function untuk performance
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Optimized scroll handler
const optimizedScrollHandler = debounce(setActiveNavLink, 10);
window.addEventListener('scroll', optimizedScrollHandler);