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
        // Unlock Audio Context for mobile
        music.play().then(() => {
            music.pause();
            music.currentTime = 0;
        }).catch(e => console.log("Audio permission needed"));

        // Smooth transition
        welcomeSection.style.opacity = '0';
        welcomeSection.style.transition = 'opacity 0.8s ease';
        
        setTimeout(() => {
            welcomeSection.classList.add('hidden');
            typewriterSection.classList.remove('hidden');
            typewriterSection.style.opacity = '0';
            setTimeout(() => {
                typewriterSection.style.transition = 'opacity 0.8s ease';
                typewriterSection.style.opacity = '1';
                startTypewriter();
            }, 100);
        }, 800);
    });

    // --- FLOATING ELEMENTS (Welcome Screen) ---
    function createFloatingElements() {
        const container = document.querySelector('.floating-elements');
        const icons = ['💗', '🌷', '🌻', '✨', '💕', '🌸', '💝'];
        
        function createFloater() {
            const el = document.createElement('span');
            el.textContent = icons[Math.floor(Math.random() * icons.length)];
            el.style.left = Math.random() * 100 + '%';
            el.style.animationDuration = (Math.random() * 8 + 8) + 's';
            el.style.animationDelay = Math.random() * 2 + 's';
            el.style.fontSize = (Math.random() * 1 + 1) + 'rem';
            container.appendChild(el);
            
            setTimeout(() => el.remove(), 16000);
        }
        
        // Initial burst
        for (let i = 0; i < 8; i++) {
            setTimeout(createFloater, i * 300);
        }
        
        // Continue creating
        setInterval(createFloater, 800);
    }
    createFloatingElements();

    // --- TYPEWRITER EFFECT (Enhanced) ---
    function startTypewriter() {
        const lines = [
            { text: "Initializing feelings...", delay: 40 },
            { text: "Compiling courage...", delay: 40 },
            { text: "", delay: 500 },
            { text: "No errors found.", delay: 60 },
            { text: "", delay: 300 },
            { text: "Starting our first Valentine 💕", delay: 50 }
        ];
        
        let lineIndex = 0;
        let charIndex = 0;
        
        function type() {
            if (lineIndex < lines.length) {
                const currentLine = lines[lineIndex];
                
                if (currentLine.text === "") {
                    typewriterText.innerHTML += "<br>";
                    lineIndex++;
                    setTimeout(type, currentLine.delay);
                } else if (charIndex < currentLine.text.length) {
                    typewriterText.innerHTML += currentLine.text.charAt(charIndex);
                    charIndex++;
                    setTimeout(type, currentLine.delay);
                } else {
                    typewriterText.innerHTML += "<br>";
                    lineIndex++;
                    charIndex = 0;
                    setTimeout(type, 600);
                }
            } else {
                // Finished typing
                setTimeout(() => {
                    typewriterSection.style.opacity = '0';
                    setTimeout(() => {
                        typewriterSection.classList.add('hidden');
                        mainContent.classList.remove('hidden');
                        mainContent.classList.add('fade-in');
                        initScrollAnimations();
                    }, 800);
                }, 1500);
            }
        }
        
        setTimeout(type, 500);
    }

    // --- SCROLL ANIMATIONS ---
    function initScrollAnimations() {
        const sections = document.querySelectorAll('.content-section');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in');
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
        
        sections.forEach(section => observer.observe(section));
    }

    // --- SONG CONTROL ---
    const songSection = document.getElementById('song-section');
    const playBtn = document.getElementById('play-music-btn');
    let isPlaying = false;

    playBtn.addEventListener('click', () => {
        if (!isPlaying) {
            music.play();
            playBtn.textContent = "⏸ Pause Music";
            playBtn.style.background = 'var(--primary-pink)';
            playBtn.style.color = 'white';
            isPlaying = true;
        } else {
            music.pause();
            playBtn.textContent = "▶ Play Music";
            playBtn.style.background = 'white';
            playBtn.style.color = 'var(--deep-pink)';
            isPlaying = false;
        }
    });

    // Stop music when leaving section
    const musicObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting && isPlaying) {
                music.pause();
                playBtn.textContent = "▶ Play Music";
                playBtn.style.background = 'white';
                playBtn.style.color = 'var(--deep-pink)';
                isPlaying = false;
            }
        });
    }, { threshold: 0.1 });

    musicObserver.observe(songSection);

    // --- DAYS COUNTER ---
    const startDate = new Date('2024-02-14'); // CONFIGURABLE DATE
    const today = new Date();
    const diffTime = Math.abs(today - startDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
    
    // Animate counter
    const daysElement = document.getElementById('days-count');
    let currentCount = 0;
    const increment = Math.ceil(diffDays / 60);
    
    function animateCounter() {
        if (currentCount < diffDays) {
            currentCount = Math.min(currentCount + increment, diffDays);
            daysElement.innerText = `${currentCount} days together 🤍`;
            requestAnimationFrame(animateCounter);
        }
    }
    
    // Start counter when section is visible
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && currentCount === 0) {
                animateCounter();
            }
        });
    }, { threshold: 0.5 });
    
    counterObserver.observe(document.getElementById('counter-section'));

    // --- APOLOGY FADE IN ---
    const apologySection = document.getElementById('apology-section');
    const apologyLines = document.querySelectorAll('.clean-text-container p');
    
    const apologyObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                apologyLines.forEach((line, index) => {
                    setTimeout(() => {
                        line.classList.add('visible');
                    }, index * 2500);
                });
            }
        });
    }, { threshold: 0.2 });

    apologyObserver.observe(apologySection);

    // --- VALENTINE BUTTONS ---
    const yesBtn = document.getElementById('yes-btn');
    const noBtn = document.getElementById('no-btn');
    const noTexts = [
        "NO 🙈", 
        "I'll cook for you 🍳", 
        "Coffee on me ☕", 
        "Dessert date 🍰", 
        "One hug pls 🥺", 
        "Please Boo 😭", 
        "You're my valentine anyway 💞"
    ];
    let noClickCount = 0;
    let yesScale = 1;

    noBtn.addEventListener('click', () => {
        noClickCount++;
        if (noClickCount < noTexts.length) {
            noBtn.textContent = noTexts[noClickCount];
        } else {
            noBtn.textContent = noTexts[0];
            noClickCount = 0;
        }
        
        // Grow Yes button smoothly
        yesScale += 0.15;
        yesBtn.style.transform = `scale(${yesScale})`;
        
        // Add heartbeat effect
        yesBtn.style.animation = 'heartbeat 0.6s ease-in-out';
        setTimeout(() => {
            yesBtn.style.animation = 'softGlow 2s ease-in-out infinite';
        }, 600);
    });

    yesBtn.addEventListener('click', () => {
        // Show celebration
        createConfetti();
        
        setTimeout(() => {
            document.getElementById('sunflower-section').classList.remove('hidden');
            document.getElementById('sunflower-section').scrollIntoView({ behavior: 'smooth' });
        }, 1000);
    });

    // --- CONFETTI EFFECT ---
    function createConfetti() {
        const colors = ['#ffb7b2', '#e2d1f9', '#fff5ba', '#ff9a9e', '#ffd1dc'];
        
        for (let i = 0; i < 50; i++) {
            setTimeout(() => {
                const confetti = document.createElement('div');
                confetti.style.cssText = `
                    position: fixed;
                    width: ${Math.random() * 10 + 5}px;
                    height: ${Math.random() * 10 + 5}px;
                    background: ${colors[Math.floor(Math.random() * colors.length)]};
                    left: ${Math.random() * 100}vw;
                    top: -20px;
                    border-radius: ${Math.random() > 0.5 ? '50%' : '2px'};
                    pointer-events: none;
                    z-index: 9999;
                    animation: confettiFall ${Math.random() * 2 + 2}s ease-out forwards;
                `;
                document.body.appendChild(confetti);
                setTimeout(() => confetti.remove(), 4000);
            }, i * 30);
        }
    }
    
    // Add confetti animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes confettiFall {
            to {
                transform: translateY(100vh) rotate(720deg);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);

    // --- SUNFLOWER INTERACTION ---
    const sunflowerContainer = document.getElementById('sunflower-container');
    const giftReveal = document.getElementById('gift-reveal');
    const acceptGiftBtn = document.getElementById('accept-gift-btn');

    sunflowerContainer.addEventListener('click', () => {
        if (!sunflowerContainer.classList.contains('bloomed')) {
            sunflowerContainer.classList.add('bloomed');
            
            setTimeout(() => {
                giftReveal.classList.remove('hidden');
            }, 1500);
        }
    });

    acceptGiftBtn.addEventListener('click', () => {
        showPopup("Ownership successfully transferred to Boo 💗");
        
        setTimeout(() => {
            document.getElementById('email-section').classList.remove('hidden');
            document.getElementById('email-section').scrollIntoView({ behavior: 'smooth' });
        }, 2000);
    });

    // --- POPUP FUNCTION ---
    function showPopup(message) {
        const overlay = document.createElement('div');
        overlay.className = 'popup-overlay';
        overlay.innerHTML = `
            <div class="popup-content">
                <p>${message}</p>
            </div>
        `;
        document.body.appendChild(overlay);
        
        overlay.addEventListener('click', () => {
            overlay.style.opacity = '0';
            setTimeout(() => overlay.remove(), 300);
        });
        
        setTimeout(() => {
            overlay.style.opacity = '0';
            setTimeout(() => overlay.remove(), 300);
        }, 2500);
    }

    // --- EMAIL JS ---
    const sendLoveBtn = document.getElementById('send-love-btn');
    const replyContainer = document.getElementById('reply-container');
    const sendReplyBtn = document.getElementById('send-reply-btn');
    const replyMsg = document.getElementById('reply-message');
    const reactions = document.querySelectorAll('.reaction');
    let selectedReaction = '';

    reactions.forEach(r => {
        r.addEventListener('click', () => {
            reactions.forEach(x => x.style.filter = 'grayscale(0.3)');
            r.style.filter = 'grayscale(0)';
            r.style.transform = 'scale(1.3)';
            selectedReaction = r.textContent;
        });
    });

    sendLoveBtn.addEventListener('click', () => {
        sendLoveBtn.textContent = '💕 Love sent!';
        sendLoveBtn.style.background = 'linear-gradient(135deg, #00ff88, #00cc66)';
        
        setTimeout(() => {
            replyContainer.classList.remove('hidden');
            replyContainer.classList.add('fade-in');
        }, 800);
    });

    sendReplyBtn.addEventListener('click', () => {
        const message = replyMsg.value;
        if (!message.trim()) {
            showPopup("Write something first! 🥺");
            return;
        }

        // EmailJS integration (uncomment and configure)
        /*
        const templateParams = {
            to_name: "My Love",
            from_name: "Boo",
            message: message + (selectedReaction ? ` ${selectedReaction}` : '')
        };

        emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', templateParams)
            .then(function(response) {
                console.log('SUCCESS!', response.status);
                showPopup("Message sent! 💌");
            }, function(error) {
                console.log('FAILED...', error);
            });
        */
        
        showPopup("Message sent! 💌");
        
        setTimeout(() => {
            document.getElementById('ending-section').classList.remove('hidden');
            document.getElementById('ending-section').scrollIntoView({ behavior: 'smooth' });
        }, 2000);
    });

    // --- SMOOTH SCROLL ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});