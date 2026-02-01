document.addEventListener('DOMContentLoaded', () => {
    
    // --- VARIABLES ---
    const music = document.getElementById('bg-music');
    const startBtn = document.getElementById('start-btn');
    const welcomeSection = document.getElementById('welcome-section');
    const typewriterSection = document.getElementById('typewriter-section');
    const typewriterText = document.getElementById('typewriter-text');
    const mainContent = document.getElementById('main-content');
    
    // --- START EXPERIENCE ---
    startBtn.addEventListener('click', () => {
        // Unlock Audio Context
        music.play().then(() => {
            music.pause(); // Pause immediately, wait for song section
            music.currentTime = 0;
        }).catch(e => console.log("Audio permission needed"));

        // Transition
        welcomeSection.classList.add('hidden');
        typewriterSection.classList.remove('hidden');
        startTypewriter();
    });

    // --- FLOATING ELEMENTS (Welcome Screen) ---
    function createFloatingElements() {
        const container = document.querySelector('.floating-elements');
        const icons = ['💗', '🌷', '🌻', '✨', '☁️'];
        
        setInterval(() => {
            const el = document.createElement('span');
            el.textContent = icons[Math.floor(Math.random() * icons.length)];
            el.style.left = Math.random() * 100 + '%';
            el.style.animationDuration = (Math.random() * 5 + 5) + 's';
            container.appendChild(el);
            
            setTimeout(() => el.remove(), 10000);
        }, 500);
    }
    createFloatingElements();

    // --- TYPEWRITER EFFECT ---
    function startTypewriter() {
        const lines = [
            "Initializing feelings...",
            "Compiling courage...",
            "No errors found.",
            "Starting our first Valentine 💕"
        ];
        
        let lineIndex = 0;
        let charIndex = 0;
        
        function type() {
            if (lineIndex < lines.length) {
                if (charIndex < lines[lineIndex].length) {
                    typewriterText.innerHTML += lines[lineIndex].charAt(charIndex);
                    charIndex++;
                    setTimeout(type, 50);
                } else {
                    typewriterText.innerHTML += "<br>";
                    lineIndex++;
                    charIndex = 0;
                    setTimeout(type, 500);
                }
            } else {
                setTimeout(() => {
                    typewriterSection.classList.add('hidden');
                    mainContent.classList.remove('hidden');
                    mainContent.classList.add('fade-in');
                }, 1000);
            }
        }
        type();
    }

    // --- SONG CONTROL ---
    const songSection = document.getElementById('song-section');
    const playBtn = document.getElementById('play-music-btn');
    let isPlaying = false;

    playBtn.addEventListener('click', () => {
        if (!isPlaying) {
            music.play();
            playBtn.textContent = "⏸ Pause Music";
            isPlaying = true;
        } else {
            music.pause();
            playBtn.textContent = "▶ Play Music";
            isPlaying = false;
        }
    });

    // Stop music when leaving section
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting && isPlaying) {
                music.pause();
                playBtn.textContent = "▶ Play Music";
                isPlaying = false;
            }
        });
    }, { threshold: 0.1 });

    observer.observe(songSection);

    // --- DAYS COUNTER ---
    const startDate = new Date('2024-02-14'); // CONFIGURABLE DATE
    const today = new Date();
    const diffTime = Math.abs(today - startDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
    document.getElementById('days-count').innerText = `${diffDays} days together 🤍`;

    // --- APOLOGY FADE IN ---
    const apologySection = document.getElementById('apology-section');
    const apologyLines = document.querySelectorAll('.clean-text-container p');
    
    const apologyObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                apologyLines.forEach((line, index) => {
                    setTimeout(() => {
                        line.classList.add('visible');
                    }, index * 2000); // Slow 2s fade in per line
                });
            }
        });
    }, { threshold: 0.3 });

    apologyObserver.observe(apologySection);

    // --- VALENTINE BUTTONS ---
    const yesBtn = document.getElementById('yes-btn');
    const noBtn = document.getElementById('no-btn');
    const noTexts = [
        "NO 🙈", 
        "I’ll cook for you 🍳", 
        "Coffee on me ☕", 
        "Dessert date 🍰", 
        "One hug pls 🥺", 
        "Please Boo 😭", 
        "You’re my valentine anyway 💞"
    ];
    let noClickCount = 0;

    noBtn.addEventListener('click', () => {
        noClickCount++;
        if (noClickCount < noTexts.length) {
            noBtn.textContent = noTexts[noClickCount];
        } else {
            noBtn.textContent = noTexts[0]; // Loop back
            noClickCount = 0;
        }
        
        // Grow Yes button
        const currentSize = parseFloat(window.getComputedStyle(yesBtn).fontSize);
        yesBtn.style.fontSize = (currentSize * 1.2) + 'px';
        yesBtn.style.padding = (parseFloat(window.getComputedStyle(yesBtn).padding) * 1.1) + 'px';
    });

    yesBtn.addEventListener('click', () => {
        document.getElementById('sunflower-section').classList.remove('hidden');
        document.getElementById('sunflower-section').scrollIntoView({ behavior: 'smooth' });
    });

    // --- SUNFLOWER INTERACTION ---
    const sunflowerContainer = document.getElementById('sunflower-container');
    const giftReveal = document.getElementById('gift-reveal');
    const acceptGiftBtn = document.getElementById('accept-gift-btn');

    sunflowerContainer.addEventListener('click', () => {
        sunflowerContainer.classList.add('bloomed');
        setTimeout(() => {
            giftReveal.classList.remove('hidden');
            giftReveal.classList.add('fade-in');
        }, 1000);
    });

    acceptGiftBtn.addEventListener('click', () => {
        alert("Ownership successfully transferred to Boo 💗");
        document.getElementById('email-section').classList.remove('hidden');
        document.getElementById('email-section').scrollIntoView({ behavior: 'smooth' });
    });

    // --- EMAIL JS ---
    const sendLoveBtn = document.getElementById('send-love-btn');
    const replyContainer = document.getElementById('reply-container');
    const sendReplyBtn = document.getElementById('send-reply-btn');
    const replyMsg = document.getElementById('reply-message');

    sendLoveBtn.addEventListener('click', () => {
        // Mock sending love
        replyContainer.classList.remove('hidden');
        replyContainer.classList.add('fade-in');
    });

    sendReplyBtn.addEventListener('click', () => {
        const message = replyMsg.value;
        if (!message) return alert("Write something first! 🥺");

        // Use EmailJS to send
        const templateParams = {
            to_name: "My Love",
            from_name: "Boo",
            message: message
        };

        // REPLACE SERVICE_ID and TEMPLATE_ID
        // emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', templateParams)
        //     .then(function(response) {
        //        console.log('SUCCESS!', response.status, response.text);
        //     }, function(error) {
        //        console.log('FAILED...', error);
        //     });
        
        // Simulating success for demo
        alert("Message sent! 💌");
        
        document.getElementById('ending-section').classList.remove('hidden');
        document.getElementById('ending-section').scrollIntoView({ behavior: 'smooth' });
    });
});