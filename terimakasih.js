// Mencari elemen audio dan tombol
var audio = document.getElementById("bgm-audio");
var btnAudio = document.getElementById("btn-audio");

// Fungsi untuk mengganti status musik (main/berhenti)
function toggleMusic(event) {
    // Mencegah double-trigger di perangkat mobile yang membaca touch dan click sekaligus
    if (event) {
        event.preventDefault(); 
        event.stopPropagation(); 
    }
    
    if (audio.paused) {
        // Menggunakan Promise untuk menghindari error di console jika diblokir browser HP
        audio.play().then(() => {
            btnAudio.innerHTML = "&#x23F8; Pause";
        }).catch((error) => {
            console.log("Pemutaran audio diblokir oleh browser: ", error);
            alert("Silakan tap sekali lagi untuk memutar musik.");
        });
    } else {
        audio.pause();
        btnAudio.innerHTML = "&#9654; Play";
    }
}

// Menambahkan pendengar untuk klik (Desktop) dan sentuhan (Mobile) pada tombol
btnAudio.addEventListener('click', toggleMusic);
btnAudio.addEventListener('touchstart', toggleMusic, { passive: false });

// Trik melewati aturan autoplay browser (berlaku untuk klik dan tap di mana saja)
const startAudioContext = function() {
    if (audio.paused) {
        audio.play().then(() => {
            btnAudio.innerHTML = "&#x23F8; Pause";
        }).catch((e) => console.log("Autoplay dicegah:", e));
    }
    // Hapus event listener setelah berhasil agar tidak membebani memori
    document.body.removeEventListener('click', startAudioContext);
    document.body.removeEventListener('touchstart', startAudioContext);
};

// Pasang pendengar di seluruh halaman
document.body.addEventListener('click', startAudioContext);
document.body.addEventListener('touchstart', startAudioContext, { passive: true });