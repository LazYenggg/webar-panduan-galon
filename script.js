document.addEventListener('DOMContentLoaded', () => {
    // Referensi Elemen DOM
    const viewer = document.getElementById('galon-viewer');
    const restartBtn = document.getElementById('btn-restart');
    const finalModal = document.getElementById('final-modal');
    const closeModalBtn = document.getElementById('btn-close-modal');

    // Referensi Checkboxes
    const check1 = document.getElementById('check-step-1');
    const check2 = document.getElementById('check-step-2');
    const check3 = document.getElementById('check-step-3');
    const check4 = document.getElementById('check-step-4');

    // Referensi Hotspots
    const hot1 = viewer.querySelector('[slot="hotspot-step-1"]');
    const hot2 = viewer.querySelector('[slot="hotspot-step-2"]');
    const hot3 = viewer.querySelector('[slot="hotspot-step-3"]');
    const hot4 = viewer.querySelector('[slot="hotspot-step-4"]');

    // Fungsi untuk me-reset semua panduan ke kondisi awal
    function restartGuide() {
        check1.checked = false;
        check2.checked = false;
        check3.checked = false;
        check4.checked = false;

        hot1.classList.remove('hidden');
        hot2.classList.add('hidden');
        hot3.classList.add('hidden');
        hot4.classList.add('hidden');

        finalModal.classList.remove('show');
        restartBtn.classList.add('hidden'); // Sembunyikan tombol restart saat awal
    }

    // Fungsi untuk menampilkan notifikasi "Galon bersih & siap"
    function showFinalNotif() {
        finalModal.classList.add('show');
        restartBtn.classList.remove('hidden'); // Tampilkan tombol restart
    }

    // --- LOGIKA CHECKLIST BERURUTAN ---

    // Saat Checkbox 1 dicentang
    check1.addEventListener('change', () => {
        if (check1.checked) {
            hot2.classList.remove('hidden'); // Buka langkah berikutnya
        } else {
            // Jika uncheck, sembunyikan semua langkah di depannya
            check2.checked = false;
            check3.checked = false;
            check4.checked = false;
            hot2.classList.add('hidden');
            hot3.classList.add('hidden');
            hot4.classList.add('hidden');
        }
    });

    // Saat Checkbox 2 dicentang
    check2.addEventListener('change', () => {
        if (check2.checked) {
            if (check1.checked) {
                hot3.classList.remove('hidden'); // Buka langkah berikutnya
            } else {
                // Jangan biarkan centang jika sebelumnya belum selesai
                check2.checked = false; 
                alert("Pastikan langkah ke-1 diselesaikan terlebih dahulu.");
            }
        } else {
            check3.checked = false;
            check4.checked = false;
            hot3.classList.add('hidden');
            hot4.classList.add('hidden');
        }
    });

    // Saat Checkbox 3 dicentang
    check3.addEventListener('change', () => {
        if (check3.checked) {
            if (check2.checked && check1.checked) {
                hot4.classList.remove('hidden'); // Buka langkah berikutnya
            } else {
                check3.checked = false;
                alert("Pastikan langkah ke-2 diselesaikan terlebih dahulu.");
            }
        } else {
            check4.checked = false;
            hot4.classList.add('hidden');
        }
    });

    // Saat Checkbox 4 (Terakhir) dicentang
    check4.addEventListener('change', () => {
        if (check4.checked) {
            if (check3.checked && check2.checked && check1.checked) {
                // Pembersihan terkonfirmasi, tampilkan notifikasi akhir
                showFinalNotif();
            } else {
                check4.checked = false;
                alert("Pastikan langkah ke-3 diselesaikan terlebih dahulu.");
            }
        } else {
            finalModal.classList.remove('show');
        }
    });

    // --- LOGIKA NAVIGASI MODAL & RESTART ---

    closeModalBtn.addEventListener('click', () => {
        finalModal.classList.remove('show');
    });

    restartBtn.addEventListener('click', () => {
        restartGuide();
    });

    // Inisialisasi awal
    restartGuide();
});