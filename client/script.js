document.addEventListener('DOMContentLoaded', () => {
    
    // --- VARIABLES ---
    const music = document.getElementById('bg-music');
    const startBtn = document.getElementById('start-btn');
    const welcomeSection = document.getElementById('welcome-section');
    const typewriterSection = document.getElementById('typewriter-section');
    const typewriterText = document.getElementById('typewriter-text');
    const mainContent = document.getElementById('main-content');
    
    // --- GLOBAL FLOATING ELEMENTS ---
    function createGlobalFloatingElements() {
        const heartsContainer = document.querySelector('.floating-hearts');
        const petalsContainer = document.querySelector('.floating-petals');
        
        const hearts = ['💗', '💕', '💖', '💝', '🩷'];
        const petals = ['🌸', '🌺', '🌷', '✨', '⭐'];
        
        function createFloater(container, items) {
            const el = document.createElement('span');
            el.textContent = items[Math.floor(Math.random() * items.length)];
            el.style.left = Math.random() * 100 + '%';
            el.style.animationDuration = (Math.random() * 15 + 15) + 's';
            el.style.animationDelay = Math.random() * 5 + 's';
            el.style.fontSize = (Math.random() * 1 + 0.8) + 'rem';
            container.appendChild(el);
            
            setTimeout(() => el.remove(), 30000);
        }
        
        setInterval(() => {
            if (heartsContainer) createFloater(heartsContainer, hearts);
        }, 2000);
        
        setInterval(() => {
            if (petalsContainer) createFloater(petalsContainer, petals);
        }, 3000);
    }
    createGlobalFloatingElements();
    
    // --- SPARKLE EFFECT ---
    function createSparkles() {
        const container = document.querySelector('.sparkles');
        if (!container) return;
        
        setInterval(() => {
            const sparkle = document.createElement('div');
            sparkle.className = 'sparkle';
            sparkle.textContent = '✨';
            sparkle.style.left = Math.random() * 100 + '%';
            sparkle.style.top = Math.random() * 100 + '%';
            sparkle.style.animationDuration = (Math.random() * 2 + 1) + 's';
            container.appendChild(sparkle);
            
            setTimeout(() => sparkle.remove(), 3000);
        }, 400);
    }
    createSparkles();

    // --- START EXPERIENCE ---
    startBtn.addEventListener('click', () => {
        music.play().then(() => {
            music.pause();
            music.currentTime = 0;
        }).catch(e => console.log("Audio permission needed"));

        createRipple(startBtn);

        welcomeSection.style.opacity = '0';
        welcomeSection.style.transform = 'scale(0.95)';
        welcomeSection.style.transition = 'all 1s cubic-bezier(0.4, 0, 0.2, 1)';
        
        setTimeout(() => {
            welcomeSection.classList.add('hidden');
            typewriterSection.classList.remove('hidden');
            typewriterSection.style.opacity = '0';
            setTimeout(() => {
                typewriterSection.style.transition = 'opacity 1s ease';
                typewriterSection.style.opacity = '1';
                startTypewriter();
            }, 100);
        }, 1000);
    });

    // --- RIPPLE EFFECT ---
    function createRipple(element) {
        const ripple = document.createElement('span');
        ripple.style.cssText = `
            position: absolute;
            background: rgba(255,255,255,0.5);
            border-radius: 50%;
            transform: scale(0);
            animation: rippleEffect 0.6s ease-out;
            pointer-events: none;
        `;
        element.style.position = 'relative';
        element.style.overflow = 'hidden';
        element.appendChild(ripple);
        
        const size = Math.max(element.offsetWidth, element.offsetHeight);
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = '50%';
        ripple.style.top = '50%';
        ripple.style.marginLeft = -size/2 + 'px';
        ripple.style.marginTop = -size/2 + 'px';
        
        setTimeout(() => ripple.remove(), 600);
    }

    const rippleStyle = document.createElement('style');
    rippleStyle.textContent = `
        @keyframes rippleEffect {
            to { transform: scale(4); opacity: 0; }
        }
    `;
    document.head.appendChild(rippleStyle);

    // --- FLOATING ELEMENTS (Welcome Screen) ---
    function createFloatingElements() {
        const container = document.querySelector('.floating-elements');
        if (!container) return;
        
        const icons = ['💗', '🌷', '🌻', '✨', '💕', '🌸', '💝', '🦋', '💫', '🌺'];
        
        function createFloater() {
            const el = document.createElement('span');
            el.textContent = icons[Math.floor(Math.random() * icons.length)];
            el.style.left = Math.random() * 100 + '%';
            el.style.animationDuration = (Math.random() * 10 + 10) + 's';
            el.style.animationDelay = Math.random() * 3 + 's';
            el.style.fontSize = (Math.random() * 1.5 + 0.8) + 'rem';
            container.appendChild(el);
            
            setTimeout(() => el.remove(), 20000);
        }
        
        for (let i = 0; i < 12; i++) {
            setTimeout(createFloater, i * 200);
        }
        
        setInterval(createFloater, 600);
    }
    createFloatingElements();

    // --- TYPEWRITER EFFECT ---
    function startTypewriter() {
        const lines = [
            { text: "$ initializing feelings...", delay: 35, color: "#64ffda" },
            { text: "[OK] heart module loaded", delay: 30, color: "#a5d6a7" },
            { text: "$ compiling courage...", delay: 35, color: "#64ffda" },
            { text: "[OK] butterflies activated", delay: 30, color: "#a5d6a7" },
            { text: "", delay: 400 },
            { text: ">> No errors found.", delay: 45, color: "#ffd54f" },
            { text: "", delay: 300 },
            { text: "Starting our first Valentine 💕", delay: 50, color: "#ff8fab" }
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
                } else if (charIndex === 0) {
                    const color = currentLine.color || '#64ffda';
                    typewriterText.innerHTML += `<span style="color: ${color}">`;
                    charIndex++;
                    setTimeout(type, currentLine.delay);
                } else if (charIndex <= currentLine.text.length) {
                    typewriterText.innerHTML = typewriterText.innerHTML.slice(0, -7) + 
                        currentLine.text.charAt(charIndex - 1) + '</span>';
                    charIndex++;
                    setTimeout(type, currentLine.delay);
                } else {
                    typewriterText.innerHTML += "<br>";
                    lineIndex++;
                    charIndex = 0;
                    setTimeout(type, 500);
                }
            } else {
                setTimeout(() => {
                    typewriterSection.style.opacity = '0';
                    typewriterSection.style.transform = 'scale(1.05)';
                    typewriterSection.style.transition = 'all 1s ease';
                    setTimeout(() => {
                        typewriterSection.classList.add('hidden');
                        mainContent.classList.remove('hidden');
                        mainContent.classList.add('fade-in');
                        initScrollAnimations();
                    }, 1000);
                }, 1500);
            }
        }
        
        setTimeout(type, 800);
    }

    // --- SCROLL ANIMATIONS (AOS-like) ---
    function initScrollAnimations() {
        const scrollElements = document.querySelectorAll('.scroll-reveal');
        const textElements = document.querySelectorAll('.scroll-reveal-text');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const delay = entry.target.dataset.delay || 0;
                    setTimeout(() => {
                        entry.target.classList.add('revealed');
                    }, parseInt(delay));
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -80px 0px' });
        
        scrollElements.forEach(el => observer.observe(el));
        
        const textObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const texts = entry.target.querySelectorAll('.scroll-reveal-text');
                    texts.forEach((text, index) => {
                        setTimeout(() => {
                            text.classList.add('revealed');
                        }, index * 400);
                    });
                }
            });
        }, { threshold: 0.2 });
        
        const apologySection = document.getElementById('apology-section');
        if (apologySection) {
            textObserver.observe(apologySection);
        }
    }

    // --- SONG CONTROL ---
    const songSection = document.getElementById('song-section');
    const playBtn = document.getElementById('play-music-btn');
    const vinyl = document.getElementById('vinyl');
    const bars = document.querySelectorAll('.bar');
    let isPlaying = false;

    playBtn.addEventListener('click', () => {
        if (!isPlaying) {
            music.play();
            playBtn.innerHTML = '<span class="play-icon">⏸</span><span>Pause</span>';
            vinyl.classList.add('spinning');
            bars.forEach(bar => bar.classList.add('playing'));
            isPlaying = true;
        } else {
            music.pause();
            playBtn.innerHTML = '<span class="play-icon">▶</span><span>Play Our Song</span>';
            vinyl.classList.remove('spinning');
            bars.forEach(bar => bar.classList.remove('playing'));
            isPlaying = false;
        }
    });

    const musicObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting && isPlaying) {
                music.pause();
                playBtn.innerHTML = '<span class="play-icon">▶</span><span>Play Our Song</span>';
                vinyl.classList.remove('spinning');
                bars.forEach(bar => bar.classList.remove('playing'));
                isPlaying = false;
            }
        });
    }, { threshold: 0.1 });

    musicObserver.observe(songSection);

    // --- DAYS COUNTER (22/08/2025) ---
    const startDate = new Date('2025-08-22');
    const today = new Date();
    const diffTime = Math.abs(today - startDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
    
    const daysElement = document.getElementById('days-count');
    let currentCount = 0;
    const duration = 2000;
    const steps = 60;
    const increment = diffDays / steps;
    let step = 0;
    
    function animateCounter() {
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && currentCount === 0) {
                    const interval = setInterval(() => {
                        step++;
                        currentCount = Math.min(Math.round(increment * step), diffDays);
                        daysElement.innerText = currentCount;
                        
                        if (step >= steps) {
                            clearInterval(interval);
                            daysElement.innerText = diffDays;
                        }
                    }, duration / steps);
                }
            });
        }, { threshold: 0.5 });
        
        counterObserver.observe(document.getElementById('counter-section'));
    }
    animateCounter();

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
        
        yesScale += 0.12;
        yesBtn.style.transform = `scale(${yesScale})`;
        
        yesBtn.style.animation = 'none';
        setTimeout(() => {
            yesBtn.style.animation = 'glow 2s ease-in-out infinite';
        }, 10);
    });

    yesBtn.addEventListener('click', () => {
        createHeartExplosion();
        createConfetti();
        
        setTimeout(() => {
            document.getElementById('sunflower-section').classList.remove('hidden');
            document.getElementById('sunflower-section').scrollIntoView({ behavior: 'smooth' });
        }, 1500);
    });

    // --- HEART EXPLOSION ---
    function createHeartExplosion() {
        const container = document.createElement('div');
        container.style.cssText = `
            position: fixed;
            inset: 0;
            pointer-events: none;
            z-index: 9999;
            overflow: hidden;
        `;
        document.body.appendChild(container);
        
        for (let i = 0; i < 30; i++) {
            setTimeout(() => {
                const heart = document.createElement('div');
                heart.textContent = '💗';
                heart.style.cssText = `
                    position: absolute;
                    font-size: ${Math.random() * 2 + 1}rem;
                    left: 50%;
                    top: 50%;
                    animation: heartExplode ${Math.random() * 1 + 1}s ease-out forwards;
                    --tx: ${(Math.random() - 0.5) * 400}px;
                    --ty: ${(Math.random() - 0.5) * 400}px;
                    --r: ${Math.random() * 720 - 360}deg;
                `;
                container.appendChild(heart);
            }, i * 30);
        }
        
        setTimeout(() => container.remove(), 3000);
    }
    
    const heartStyle = document.createElement('style');
    heartStyle.textContent = `
        @keyframes heartExplode {
            0% { transform: translate(-50%, -50%) scale(0); opacity: 1; }
            100% { 
                transform: translate(calc(-50% + var(--tx)), calc(-50% + var(--ty))) 
                           rotate(var(--r)) scale(1); 
                opacity: 0; 
            }
        }
    `;
    document.head.appendChild(heartStyle);

    // --- CONFETTI EFFECT ---
    function createConfetti() {
        const colors = ['#ff8fab', '#c9b1ff', '#ffd6a5', '#caffbf', '#ffc8dd', '#bde0fe'];
        
        for (let i = 0; i < 80; i++) {
            setTimeout(() => {
                const confetti = document.createElement('div');
                const isCircle = Math.random() > 0.5;
                confetti.style.cssText = `
                    position: fixed;
                    width: ${isCircle ? Math.random() * 10 + 5 : Math.random() * 15 + 8}px;
                    height: ${isCircle ? confetti.style.width : Math.random() * 8 + 4}px;
                    background: ${colors[Math.floor(Math.random() * colors.length)]};
                    left: ${Math.random() * 100}vw;
                    top: -20px;
                    border-radius: ${isCircle ? '50%' : '2px'};
                    pointer-events: none;
                    z-index: 9999;
                    animation: confettiFall ${Math.random() * 2 + 2}s ease-out forwards;
                    --rotation: ${Math.random() * 720}deg;
                `;
                document.body.appendChild(confetti);
                setTimeout(() => confetti.remove(), 4000);
            }, i * 20);
        }
    }
    
    const confettiStyle = document.createElement('style');
    confettiStyle.textContent = `
        @keyframes confettiFall {
            0% { transform: translateY(0) rotate(0deg); opacity: 1; }
            100% { 
                transform: translateY(100vh) rotate(var(--rotation)); 
                opacity: 0; 
            }
        }
    `;
    document.head.appendChild(confettiStyle);

    // --- SUNFLOWER INTERACTION ---
    const sunflowerContainer = document.getElementById('sunflower-container');
    const giftReveal = document.getElementById('gift-reveal');
    const acceptGiftBtn = document.getElementById('accept-gift-btn');
    const downloadCertBtn = document.getElementById('download-cert-btn');

    sunflowerContainer.addEventListener('click', () => {
        if (!sunflowerContainer.classList.contains('bloomed')) {
            sunflowerContainer.classList.add('bloomed');
            
            for (let i = 0; i < 12; i++) {
                setTimeout(() => {
                    const sparkle = document.createElement('div');
                    sparkle.textContent = '✨';
                    sparkle.style.cssText = `
                        position: absolute;
                        font-size: 1.5rem;
                        left: ${50 + Math.cos(i * 30 * Math.PI / 180) * 80}%;
                        top: ${30 + Math.sin(i * 30 * Math.PI / 180) * 80}%;
                        animation: sparkleOut 1s ease-out forwards;
                        pointer-events: none;
                    `;
                    sunflowerContainer.appendChild(sparkle);
                    setTimeout(() => sparkle.remove(), 1000);
                }, i * 100);
            }
            
            setTimeout(() => {
                giftReveal.classList.remove('hidden');
                giftReveal.classList.add('fade-in');
            }, 1800);
        }
    });
    
    const sparkleStyle = document.createElement('style');
    sparkleStyle.textContent = `
        @keyframes sparkleOut {
            0% { transform: scale(0); opacity: 1; }
            100% { transform: scale(1.5); opacity: 0; }
        }
    `;
    document.head.appendChild(sparkleStyle);

    acceptGiftBtn.addEventListener('click', () => {
        showPopup("Ownership successfully transferred to Boo 💗");
        
        setTimeout(() => {
            document.getElementById('email-section').classList.remove('hidden');
            document.getElementById('email-section').scrollIntoView({ behavior: 'smooth' });
        }, 2500);
    });

    // --- DOWNLOAD CERTIFICATE ---
    downloadCertBtn.addEventListener('click', () => {
        generateCertificate();
    });

    function generateCertificate() {
        const canvas = document.getElementById('certificate-canvas');
        const ctx = canvas.getContext('2d');
        
        canvas.width = 800;
        canvas.height = 600;
        
        // Background gradient
        const gradient = ctx.createLinearGradient(0, 0, 800, 600);
        gradient.addColorStop(0, '#fff5f8');
        gradient.addColorStop(0.5, '#fff0ff');
        gradient.addColorStop(1, '#fff5eb');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, 800, 600);
        
        // Border
        ctx.strokeStyle = '#ff8fab';
        ctx.lineWidth = 8;
        ctx.strokeRect(20, 20, 760, 560);
        
        ctx.strokeStyle = '#ffd6cc';
        ctx.lineWidth = 3;
        ctx.strokeRect(35, 35, 730, 530);
        
        // Title
        ctx.fillStyle = '#ff6b9d';
        ctx.font = 'bold 48px Georgia, serif';
        ctx.textAlign = 'center';
        ctx.fillText('Certificate of Emotional Property', 400, 100);
        
        // Decorative line
        ctx.strokeStyle = '#d4b8ff';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(150, 120);
        ctx.lineTo(650, 120);
        ctx.stroke();
        
        // Main content
        ctx.fillStyle = '#5c4d4d';
        ctx.font = '24px Georgia, serif';
        ctx.fillText('This certifies that', 400, 180);
        
        ctx.fillStyle = '#ff6b9d';
        ctx.font = 'bold 36px Georgia, serif';
        ctx.fillText('BOO 💗', 400, 230);
        
        ctx.fillStyle = '#5c4d4d';
        ctx.font = '24px Georgia, serif';
        ctx.fillText('is the sole owner of', 400, 280);
        
        ctx.fillStyle = '#ff6b9d';
        ctx.font = 'bold 42px Georgia, serif';
        ctx.fillText('10 ACRES OF LOVE', 400, 340);
        
        // Details
        ctx.fillStyle = '#8a7575';
        ctx.font = '20px Georgia, serif';
        ctx.fillText('Location: Right next to my heart', 400, 400);
        ctx.fillText('Price: One smile per day', 400, 430);
        ctx.fillText('Registry: Forever & Always', 400, 460);
        
        // Date
        const today = new Date();
        const dateStr = today.toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        });
        ctx.font = 'italic 18px Georgia, serif';
        ctx.fillText(`Issued on: ${dateStr}`, 400, 510);
        
        // Hearts decoration
        ctx.font = '30px serif';
        ctx.fillText('💗 🌻 💕', 400, 560);
        
        // Download
        const link = document.createElement('a');
        link.download = 'Love-Certificate.png';
        link.href = canvas.toDataURL('image/png');
        link.click();
        
        showPopup("Certificate downloaded! 📜💗");
    }

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
            if (overlay.parentNode) {
                overlay.style.opacity = '0';
                setTimeout(() => overlay.remove(), 300);
            }
        }, 3000);
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
            reactions.forEach(x => x.classList.remove('selected'));
            r.classList.add('selected');
            selectedReaction = r.dataset.emoji;
        });
    });

    sendLoveBtn.addEventListener('click', () => {
        sendLoveBtn.innerHTML = '<span class="code-bracket">{</span> love_sent! 💕 <span class="code-bracket">}</span>';
        sendLoveBtn.style.background = 'linear-gradient(135deg, #27ca40, #1e8e3e)';
        sendLoveBtn.style.color = 'white';
        
        setTimeout(() => {
            replyContainer.classList.remove('hidden');
            replyContainer.classList.add('fade-in');
        }, 1000);
    });

    sendReplyBtn.addEventListener('click', () => {
        const message = replyMsg.value;
        if (!message.trim()) {
            showPopup("Write something first! 🥺");
            return;
        }
        
        showPopup("Message sent with love! 💌");
        
        setTimeout(() => {
            document.getElementById('ending-section').classList.remove('hidden');
            document.getElementById('ending-section').scrollIntoView({ behavior: 'smooth' });
        }, 2500);
    });

    // --- TILT EFFECT FOR CARDS ---
    document.querySelectorAll('[data-tilt]').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 15;
            const rotateY = (centerX - x) / 15;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
        });
        
        card.addEventListener('touchstart', () => {}, { passive: true });
    });
});