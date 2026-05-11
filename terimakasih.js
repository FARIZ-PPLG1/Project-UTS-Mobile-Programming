// Mencari elemen audio berdasarkan ID 'bgm-audio' dan menyimpannya ke variabel 'audio'
var audio = document.getElementById("bgm-audio");

// Mencari elemen tombol berdasarkan ID 'btn-audio' dan menyimpannya ke variabel 'btnAudio'
var btnAudio = document.getElementById("btn-audio");

// Membuat fungsi bernama 'toggleMusic' yang bertugas mengganti status musik (main/berhenti)
function toggleMusic(event) {
    // Jika ada event klik, hentikan penyebaran event agar tidak memicu klik pada elemen induk 
    // (seperti body)
    if (event) event.stopPropagation(); 
    
    // Mengecek apakah audio sedang dalam posisi berhenti (paused)
    if (audio.paused) {
        // Jika sedang berhenti, maka jalankan musiknya
        audio.play();
        // Ubah teks tombol menjadi ikon Pause dan tulisan "Pause"
        btnAudio.innerHTML = "&#x23F8; Pause";
    } else {
        // Jika sedang berputar, maka hentikan musiknya
        audio.pause();
        // Ubah teks tombol menjadi ikon Play dan tulisan "Play"
        btnAudio.innerHTML = "&#9654; Play";
    }
}

// Memberikan instruksi agar saat 'btnAudio' diklik, fungsi 'toggleMusic' dijalankan
btnAudio.addEventListener('click', toggleMusic);

// Menambahkan pendengar klik pada seluruh halaman (body) sebagai trik melewati aturan 
// autoplay browser
document.body.addEventListener('click', function() {
    // Jika audio masih belum berjalan saat pengguna pertama kali klik area mana saja di layar
    if (audio.paused) {
        // Jalankan audio secara otomatis
        audio.play();
        // Pastikan teks pada tombol sinkron menjadi "Pause"
        btnAudio.innerHTML = "&#x23F8; Pause";
    }
// Aturan '{ once: true }' memastikan fungsi ini hanya berjalan sekali saja pada klik pertama
}, { once: true });