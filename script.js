document.getElementById('start-btn').addEventListener('click', function() {
    // 1. Révèle l'ensemble des sections cachées
    const mainStory = document.getElementById('main-story');
    mainStory.classList.remove('hidden');
    
    // 2. Fait défiler l'écran de manière fluide vers l'histoire
    mainStory.scrollIntoView({ behavior: 'smooth' });

    // 3. OPTIMISATION : On fait disparaître l'écran d'accueil proprement après le scroll
    setTimeout(function() {
        document.getElementById('welcome-screen').style.display = 'none';
        window.scrollTo(0, 0); // Aligne parfaitement l'affichage en haut
    }, 800); // 800 millisecondes correspond au temps du défilement fluide
});
// ==========================================
// LOGIQUE DE LA VISIONNEUSE CATALOGUE (LIGHTBOX)
// ==========================================

const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxVideo = document.getElementById('lightbox-video');
const closeBtn = document.getElementById('close-lightbox');

// Fonction pour ouvrir la visionneuse
function openLightbox(mediaUrl, mediaType) {
    // 1. Masque les deux types de médias par défaut
    lightboxImg.classList.add('hidden');
    lightboxVideo.classList.add('hidden');
    
    // 2. Charge et affiche le bon média
    if (mediaType === 'IMG') {
        lightboxImg.src = mediaUrl;
        lightboxImg.classList.remove('hidden');
    } else if (mediaType === 'VIDEO') {
        lightboxVideo.src = mediaUrl;
        lightboxVideo.classList.remove('hidden');
        lightboxVideo.play(); // Lance la vidéo automatiquement à l'ouverture
    }
    
    // 3. Affiche la visionneuse
    lightbox.classList.add('show-lightbox');
    document.body.style.overflow = 'hidden'; // Empêche le défilement de la page en arrière-plan
}

// Fonction pour fermer la visionneuse
function closeLightboxFunc() {
    lightbox.classList.remove('show-lightbox');
    document.body.style.overflow = ''; // Réactive le défilement
    
    // Met la vidéo en pause pour éviter que le son continue
    lightboxVideo.pause();
    lightboxVideo.src = ''; // Nettoie la source pour le prochain chargement
}

// Ajoute l'événement clic sur chaque élément de la galerie
const galleryItems = document.querySelectorAll('.gallery-item');
galleryItems.forEach(item => {
    item.addEventListener('click', function() {
        const mediaUrl = this.src;
        const mediaType = this.tagName; // 'IMG' ou 'VIDEO'
        openLightbox(mediaUrl, mediaType);
    });
});

// Événements pour fermer
closeBtn.addEventListener('click', closeLightboxFunc);

// Ferme en cliquant n'importe où sur le fond sombre
lightbox.addEventListener('click', function(e) {
    if (e.target === this || e.target === document.querySelector('.lightbox-content-wrapper')) {
        closeLightboxFunc();
    }
});

// Ferme en appuyant sur la touche 'Echap'
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && lightbox.classList.contains('show-lightbox')) {
        closeLightboxFunc();
    }
});