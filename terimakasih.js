// Mencari elemen audio di HTML yang memiliki ID "bgm-audio" dan 
// menyimpannya ke dalam variabel bernama 'audio'
var audio = document.getElementById("bgm-audio");

// Mencari elemen tombol di HTML yang memiliki ID "btn-audio" dan 
// menyimpannya ke dalam variabel bernama 'btnAudio'
var btnAudio = document.getElementById("btn-audio");

// Membuat sebuah fungsi bernama 'toggleMusic' yang bertugas mengontrol nyala/matinya 
// musik. (event) adalah data interaksi user (klik/sentuh)
function toggleMusic(event) {
    
    // Mengecek apakah ada 'event' (interaksi) yang memicu fungsi ini
    if (event) {
        // Mencegah perilaku bawaan browser (misal: mencegah layar tiba-tiba tergeser 
        // saat tombol ditap di HP)
        event.preventDefault(); 
        // Menghentikan efek "bocor" ke elemen di belakangnya. Jadi kalau tombol ditap, 
        // tag <body> tidak ikut merasa ditap
        event.stopPropagation(); 
    }
    
    // Mengecek apakah elemen 'audio' saat ini sedang dalam keadaan dijeda (paused)
    if (audio.paused) {
        // Jika sedang dijeda, perintahkan audio untuk berputar (play)
        // .then() artinya: JIKA audio sukses berputar (browser memberi izin), 
        // MAKA lakukan baris di bawahnya
        audio.play().then(() => {
            // Ubah teks dan ikon di dalam tombol menjadi ikon Pause 
            // (simbol HTML &#x23F8;) dan tulisan "Pause"
            btnAudio.innerHTML = "&#x23F8; Pause";
            
        // .catch() artinya: JIKA browser HP menolak/memblokir pemutaran audio, 
        // MAKA tangkap error-nya di sini
        }).catch((error) => {
            // Tuliskan pesan error di Console browser (untuk keperluan perbaikan/debugging 
            // developer)
            console.log("Pemutaran audio diblokir oleh browser: ", error);
            // Munculkan jendela pop-up pemberitahuan kepada user agar mereka 
            // menekan tombol sekali lagi
            alert("Silakan tap sekali lagi untuk memutar musik.");
        });
        
    // 'else' berarti JIKA kondisi di atas salah (yang artinya audio sedang berputar), MAKA:
    } else {
        // Hentikan (jeda) pemutaran musik
        audio.pause();
        // Ubah kembali teks dan ikon tombol menjadi ikon Play (simbol HTML &#9654;) dan tulisan "Play"
        btnAudio.innerHTML = "&#9654; Play";
    }
} // Penutup fungsi toggleMusic

// Memberikan instruksi: Jika 'btnAudio' DIKLIK (biasanya menggunakan mouse di laptop), 
// jalankan fungsi 'toggleMusic'
btnAudio.addEventListener('click', toggleMusic);

// Memberikan instruksi: Jika 'btnAudio' DISENTUH/TAP (di layar HP), 
// jalankan fungsi 'toggleMusic'. 

// { passive: false } wajib ditambahkan agar perintah event.preventDefault() di atas 
// bisa diizinkan berjalan oleh browser HP
btnAudio.addEventListener('touchstart', toggleMusic, { passive: false });


// Membuat sebuah fungsi bernama 'startAudioContext' sebagai trik pancingan untuk 
// browser HP yang ketat aturan
const startAudioContext = function() {
    
    // Mengecek apakah musik masih dalam keadaan mati
    if (audio.paused) {
        // Coba jalankan musiknya secara otomatis di latar belakang
        audio.play().then(() => {
            // Jika berhasil jalan, langsung ubah teks tombol menjadi "Pause" agar sinkron
            btnAudio.innerHTML = "&#x23F8; Pause";
            
        // Jika pancingan ini tetap diblokir, tuliskan saja secara diam-diam di console tanpa 
        // memunculkan error mencolok ke user
        }).catch((e) => console.log("Autoplay dicegah:", e));
    }
    
    // Setelah fungsi pancingan ini berhasil dijalankan satu kali, hapus 
    // pendengar klik di halaman <body>. 

    // Ini penting agar browser tidak terus-menerus mengeksekusi kode ini 
    // setiap kali layar diklik (hemat memori)
    document.body.removeEventListener('click', startAudioContext);
    
    // Sama seperti di atas, hapus juga pendengar sentuhan (tap) di halaman <body>
    document.body.removeEventListener('touchstart', startAudioContext);
};

// Memasang pendengar pada keseluruhan halaman (body): Kalau user meng-KLIK sembarang 
// tempat di halaman, jalankan fungsi pancingan tadi
document.body.addEventListener('click', startAudioContext);

// Memasang pendengar pada keseluruhan halaman (body): Kalau user menyentuh/TAP sembarang 
// tempat di layar HP, jalankan fungsi pancingan.
document.body.addEventListener('touchstart', startAudioContext, { passive: true });