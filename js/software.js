(function() {
    
    'use strict';
    
    // ====================
    // DETECCIÓN DE BACK/FORWARD
    // ====================
    window.addEventListener('pageshow', function(event) {
        if (event.persisted) {
            console.log('Página restaurada de caché - reiniciando...');
            // Forzar un reinicio completo después de un micro delay
            setTimeout(() => {
                window.location.reload();
            }, 10);
        }
    });

    // ====================
    // INICIALIZACIÓN PRINCIPAL
    // ====================
    document.addEventListener('DOMContentLoaded', initApp);
    
    // También ejecutar si ya está cargado
    if (document.readyState === 'complete' || document.readyState === 'interactive') {
        setTimeout(initApp, 10);
    }
    
    function initApp() {
        console.log('Inicializando aplicación...');
        
        // Elementos del DOM
        const heroSection = document.getElementById('heroSection');
        const projectsSection = document.getElementById('projectsSection');
        const scrollDown = document.getElementById('scrollDown');
        const backToTop = document.getElementById('backToTop');
        const folderIcon = document.getElementById('folderIcon');
        const modalOverlay = document.getElementById('modalOverlay');
        const closeModal = document.getElementById('closeModal');
        
        // Variables de estado
        let currentSection = 0;
        const sections = [heroSection, projectsSection].filter(s => s);
        
        // ====================
        // ANIMACIONES INICIALES
        // ====================
        function animateHeroSection() {
            const heroTitle = document.querySelector('.hero-title');
            const heroSubtitle = document.querySelector('.hero-subtitle');
            
            if (heroTitle) {
                heroTitle.classList.add('animate');
            }
            
            setTimeout(() => {
                if (heroSubtitle) heroSubtitle.classList.add('visible');
            }, 400);
            
            setTimeout(() => {
                if (scrollDown) scrollDown.classList.add('visible');
            }, 600);
        }
        
        function animateProjectsSection() {
            const sectionTitle = document.querySelector('.section-title');
            const sectionSubtitle = document.querySelector('.section-subtitle');
            const folderContainer = document.querySelector('.folder-container');
            
            if (sectionTitle) {
                sectionTitle.classList.add('animate');
            }
            
            setTimeout(() => {
                if (sectionSubtitle) sectionSubtitle.classList.add('visible');
            }, 400);
            
            setTimeout(() => {
                if (folderContainer) folderContainer.classList.add('visible');
            }, 600);
        }
        
        // Animar sección visible inicialmente
        animateHeroSection();
        
        // ====================
        // INTERSECCIÓN PARA PROJECTS
        // ====================
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.target === projectsSection && entry.isIntersecting) {
                    animateProjectsSection();
                    observer.unobserve(projectsSection); // Solo una vez
                }
            });
        }, { threshold: 0.3 });
        
        if (projectsSection) {
            observer.observe(projectsSection);
        }
        
        // ====================
        // SCROLL ENTRE SECCIONES
        // ====================
        if (scrollDown) {
            scrollDown.addEventListener('click', () => {
                if (projectsSection) {
                    projectsSection.scrollIntoView({ behavior: 'smooth' });
                }
            });
        }
        
        // ====================
        // BACK TO TOP
        // ====================
        function updateBackToTop() {
            if (!backToTop) return;
            
            if (window.scrollY > window.innerHeight / 2) {
                backToTop.classList.add('show');
            } else {
                backToTop.classList.remove('show');
            }
        }
        
        window.addEventListener('scroll', updateBackToTop);
        
        if (backToTop) {
            backToTop.addEventListener('click', () => {
                heroSection.scrollIntoView({ behavior: 'smooth' });
            });
        }
        
        // ====================
        // MODAL FOLDER
        // ====================
        // ====================
// MODAL FOLDER - MEJORADO
// ====================
if (folderIcon && modalOverlay && closeModal) {
    
    // Variable para controlar si el modal está abierto
    let isModalOpen = false;
    
    // Abrir modal
    folderIcon.addEventListener('click', function() {
        this.classList.add('opening');
        isModalOpen = true;
        
        setTimeout(() => {
            this.src = this.dataset.open;
        }, 120);
        
        setTimeout(() => {
            modalOverlay.classList.add('show');
            
            // Opcional: Asegurar que la sección projects sea visible
            projectsSection.scrollIntoView({ 
                behavior: 'smooth',
                block: 'center'  // Centrar la sección
            });
            
        }, 300);
    });
    
    // Cerrar modal
    function closeModalHandler() {
        modalOverlay.classList.remove('show');
        isModalOpen = false;
        
        setTimeout(() => {
            folderIcon.src = folderIcon.dataset.closed;
            folderIcon.classList.remove('opening');
        }, 350);
    }
    
    closeModal.addEventListener('click', closeModalHandler);
    
    // Cerrar al hacer clic fuera
    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) {
            closeModalHandler();
        }
    });
    
    // Prevenir cierre al hacer clic dentro de la ventana
    const modalWindow = document.querySelector('.modal-window');
    if (modalWindow) {
        modalWindow.addEventListener('click', (e) => {
            e.stopPropagation();
        });
    }
    
    // Opcional: Cerrar con tecla ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && isModalOpen) {
            closeModalHandler();
        }
    });
}
        
        // ====================
        // LINKS DEL MODAL
        // ====================
        document.querySelectorAll('.file-item').forEach(link => {
            link.addEventListener('click', (e) => {
                // Los links ya tienen target="_blank", así que abren en nueva pestaña
                // No necesitamos hacer nada especial
                console.log('Link clickeado:', link.href);
            });
        });
        
        console.log('Aplicación inicializada correctamente');
    }
    
})();