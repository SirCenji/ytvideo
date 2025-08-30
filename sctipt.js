// --- YARDIMCI FONKSİYON (DAHA GELİŞMİŞ VERSİYON) ---
// Her türlü YouTube linkini analiz edip video ID'sini çıkaran fonksiyon.
function getYouTubeId(url) {
    let ID = '';
    url = url.replace(/(>|<)/gi, '').split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);
    if (url[2] !== undefined) {
        ID = url[2].split(/[^0-9a-z_\-]/i);
        ID = ID[0];
    } else {
        ID = url;
    }
    return ID;
}

// --- VERİ BÖLÜMÜ ---
const videos = [
    {
        link: "https://www.youtube.com/embed/3Z1_cpQafng1", // Standart link
        selector: "Ahmet"
    },
    {
        link: "https://www.youtube.com/embed/3Z1_cpQafng2", // Kısa link
        selector: "Ayşe"
    },
    {
        link: "https://www.youtube.com/embed/3Z1_cpQafng3", // Zaman damgalı link
        selector: "Mehmet"
    },
    {
        link: "https://www.youtube.com/embed/3Z1_cpQafng4",
        selector: "Zeynep"
    }
];

const selectors = ["Ahmet", "Ayşe", "Mehmet", "Zeynep"];

// --- HTML ELEMANLARINI SEÇME ---
const videoPlayer = document.getElementById('video-player');
const choicesContainer = document.getElementById('choices-container');
const resultText = document.getElementById('result-text');
const nextButton = document.getElementById('next-button');

// --- OYUN DEĞİŞKENLERİ ---
let currentVideoIndex = 0;

// --- FONKSİYONLAR ---
function loadVideo(index) {
    if (index >= videos.length) {
        videoPlayer.parentElement.innerHTML = "<h2>Oyun Bitti! Katıldığınız için teşekkürler.</h2>";
        choicesContainer.innerHTML = '';
        resultText.textContent = "";
        nextButton.style.display = 'none';
        document.getElementById('question-text').style.display = 'none';
        return;
    }

    const currentVideo = videos[index];
    const videoId = getYouTubeId(currentVideo.link);
    
    if (videoId) {
        videoPlayer.src = `https://www.youtube.com/embed/3Z1_cpQafng5{videoId}`;
    } else {
        console.error("Geçersiz YouTube linki veya ID bulunamadı:", currentVideo.link);
        // Hatalı link durumunda bir sonraki videoya geçilebilir veya mesaj gösterilebilir
        resultText.textContent = "Video yüklenemedi. Lütfen sonraki videoya geçin.";
    }
    
    resultText.textContent = '';
    nextButton.style.display = 'none';
    choicesContainer.innerHTML = '';

    selectors.forEach(selector => {
        const button = document.createElement('button');
        button.textContent = selector;
        button.onclick = () => checkAnswer(selector);
        choicesContainer.appendChild(button);
    });
}

function checkAnswer(guessedSelector) {
    const correctSelector = videos[currentVideoIndex].selector;
    const buttons = choicesContainer.querySelectorAll('button');

    buttons.forEach(button => {
        button.disabled = true;
        if (button.textContent === correctSelector) {
            button.classList.add('correct');
        } else if (button.textContent === guessedSelector) {
            button.classList.add('wrong');
        }
    });

    if (guessedSelector === correctSelector) {
        resultText.textContent = "Doğru Bildin!";
        resultText.style.color = '#28a745';
    } else {
        resultText.textContent = `Yanlış! Doğru cevap: ${correctSelector}`;
        resultText.style.color = '#dc3545';
    }

    nextButton.style.display = 'inline-block';
}

function goToNextVideo() {
    currentVideoIndex++;
    loadVideo(currentVideoIndex);
}

// --- OLAY DİNLEYİCİLERİ ---
nextButton.addEventListener('click', goToNextVideo);

// --- OYUNU BAŞLATMA ---
window.onload = () => {
    loadVideo(currentVideoIndex);
};