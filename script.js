/* ===================================================================
   BATCH PHOTOGRAPH 2023 - OFFICIAL INVITATION SCRIPT
   Faculty of Humanities & Social Sciences | OUSL Nawala
   =================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    initAmbientParticles();
    initEnvelopeReveal();
    initCountdownTimer();
    initCalendarLink();
    initRSVPModal();
    initConfettiButton();
    initSoundToggle();
    initShareButton();
});

/* ===================================================================
   1. SOUND SYNTHESIZER (Web Audio API - Zero external assets needed)
   =================================================================== */
let soundEnabled = true;
let audioCtx = null;

function getAudioContext() {
    if (!audioCtx) {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (AudioContext) {
            audioCtx = new AudioContext();
        }
    }
    if (audioCtx && audioCtx.state === 'suspended') {
        audioCtx.resume();
    }
    return audioCtx;
}

// Plays an elegant celebratory arpeggio chord (Ethereal chime)
function playCelebrationFanfare() {
    if (!soundEnabled) return;
    try {
        const ctx = getAudioContext();
        if (!ctx) return;

        // F major 9 pentatonic arpeggio notes (F4, A4, C5, E5, G5, C6)
        const notes = [349.23, 440.00, 523.25, 659.25, 783.99, 1046.50];
        const now = ctx.currentTime;

        notes.forEach((freq, idx) => {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();

            osc.type = 'triangle';
            osc.frequency.setValueAtTime(freq, now + idx * 0.12);

            gain.gain.setValueAtTime(0, now + idx * 0.12);
            gain.gain.linearRampToValueAtTime(0.2, now + idx * 0.12 + 0.05);
            gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.12 + 1.6);

            osc.connect(gain);
            gain.connect(ctx.destination);

            osc.start(now + idx * 0.12);
            osc.stop(now + idx * 0.12 + 1.8);
        });
    } catch (e) {
        console.warn('Audio playback not permitted yet:', e);
    }
}

function initSoundToggle() {
    const soundBtn = document.getElementById('sound-btn');
    if (!soundBtn) return;

    soundBtn.addEventListener('click', () => {
        soundEnabled = !soundEnabled;
        const icon = soundBtn.querySelector('i');
        if (soundEnabled) {
            icon.className = 'fa-solid fa-volume-high';
            soundBtn.title = 'Sound On';
            playCelebrationFanfare();
        } else {
            icon.className = 'fa-solid fa-volume-xmark';
            soundBtn.title = 'Sound Muted';
        }
    });
}

/* ===================================================================
   2. ENVELOPE OPENING & CARD REVEAL
   =================================================================== */
function initEnvelopeReveal() {
    const envelope = document.getElementById('envelope');
    const openBtn = document.getElementById('open-card-btn');
    const waxSeal = document.getElementById('wax-seal');
    const overlay = document.getElementById('envelope-overlay');
    const mainContent = document.getElementById('main-content');

    let isOpened = false;

    function openInvitation() {
        if (isOpened) return;
        isOpened = true;

        // Trigger Audio Chime
        playCelebrationFanfare();

        // Animate envelope
        envelope.classList.add('open');

        // Confetti burst from envelope
        if (typeof confetti === 'function') {
            confetti({
                particleCount: 80,
                spread: 70,
                origin: { y: 0.6 },
                colors: ['#f5c042', '#ffd366', '#ffffff', '#1e50a0']
            });
        }

        // Smooth transition to main content
        setTimeout(() => {
            overlay.classList.add('hide-envelope');
            mainContent.classList.remove('hidden');

            // Grand confetti shower
            fireGrandCelebration();

            // Smooth scroll to top of main content
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }, 1100);
    }

    if (openBtn) openBtn.addEventListener('click', openInvitation);
    if (waxSeal) waxSeal.addEventListener('click', openInvitation);
    if (envelope) {
        envelope.addEventListener('click', (e) => {
            if (e.target.closest('#open-card-btn')) return;
            openInvitation();
        });
    }
}

/* ===================================================================
   3. CELEBRATORY CONFETTI EFFECTS
   =================================================================== */
function fireGrandCelebration() {
    if (typeof confetti !== 'function') return;

    const count = 200;
    const defaults = {
        origin: { y: 0.7 },
        colors: ['#f5c042', '#e6a71e', '#ffd700', '#ffffff', '#2563eb', '#38bdf8']
    };

    function fire(particleRatio, opts) {
        confetti(Object.assign({}, defaults, opts, {
            particleCount: Math.floor(count * particleRatio)
        }));
    }

    fire(0.25, { spread: 26, startVelocity: 55 });
    fire(0.2, { spread: 60 });
    fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
    fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
    fire(0.1, { spread: 120, startVelocity: 45 });
}

function initConfettiButton() {
    const confettiBtn = document.getElementById('confetti-btn');
    if (!confettiBtn) return;

    confettiBtn.addEventListener('click', () => {
        playCelebrationFanfare();
        fireGrandCelebration();
    });
}

/* ===================================================================
   4. DYNAMIC COUNTDOWN TIMER
   =================================================================== */
function initCountdownTimer() {
    const daysEl = document.getElementById('days');
    const hoursEl = document.getElementById('hours');
    const minutesEl = document.getElementById('minutes');
    const secondsEl = document.getElementById('seconds');

    if (!daysEl) return;

    // Target Date: December 13th at 08:30:00 AM
    const currentYear = new Date().getFullYear();
    let targetYear = currentYear;
    
    // Check if Dec 13 of this year has already passed
    const candidateDate = new Date(`December 13, ${currentYear} 08:30:00`);
    if (new Date().getTime() > candidateDate.getTime()) {
        targetYear = currentYear + 1;
    }

    const eventDate = new Date(`December 13, ${targetYear} 08:30:00`).getTime();

    function updateCountdown() {
        const now = new Date().getTime();
        const distance = eventDate - now;

        if (distance <= 0) {
            daysEl.innerText = '00';
            hoursEl.innerText = '00';
            minutesEl.innerText = '00';
            secondsEl.innerText = '00';
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        daysEl.innerText = String(days).padStart(2, '0');
        hoursEl.innerText = String(hours).padStart(2, '0');
        minutesEl.innerText = String(minutes).padStart(2, '0');
        secondsEl.innerText = String(seconds).padStart(2, '0');
    }

    updateCountdown();
    setInterval(updateCountdown, 1000);
}

/* ===================================================================
   5. GOOGLE CALENDAR LINK GENERATION
   =================================================================== */
function initCalendarLink() {
    const calBtn = document.getElementById('google-calendar-btn');
    if (!calBtn) return;

    const currentYear = new Date().getFullYear();
    let targetYear = currentYear;
    const candidateDate = new Date(`December 13, ${currentYear} 08:30:00`);
    if (new Date().getTime() > candidateDate.getTime()) {
        targetYear = currentYear + 1;
    }

    const title = encodeURIComponent("Batch Photograph 2023 - Department of Social Sciences (OUSL)");
    const details = encodeURIComponent(
        "Official Grand Batch Photograph of the 2023 Batch, Department of Social Sciences, Faculty of Humanities & Social Sciences, The Open University of Sri Lanka.\n\nOrganized by the FHSS Students' Union."
    );
    const location = encodeURIComponent("The Open University of Sri Lanka, Nawala, Nugegoda");

    // Format ISO string for Google Calendar (YYYYMMDDTHHMMSS)
    const startDate = `${targetYear}1213T083000`;
    const endDate = `${targetYear}1213T140000`;

    const gcalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${startDate}/${endDate}&details=${details}&location=${location}`;
    calBtn.setAttribute('href', gcalUrl);
}

/* ===================================================================
   6. RSVP MODAL & SUBMISSION
   =================================================================== */
function initRSVPModal() {
    const openBtn = document.getElementById('open-rsvp-btn');
    const modal = document.getElementById('rsvp-modal');
    const closeBtn = document.getElementById('close-rsvp');
    const form = document.getElementById('rsvp-form');
    const successMsg = document.getElementById('rsvp-success-msg');

    if (!modal) return;

    openBtn.addEventListener('click', () => {
        modal.classList.remove('hidden');
    });

    closeBtn.addEventListener('click', () => {
        modal.classList.add('hidden');
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.add('hidden');
        }
    });

    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = document.getElementById('student-name').value;
            const studentId = document.getElementById('student-id').value;
            const phone = document.getElementById('contact-phone').value;
            const attending = document.getElementById('diet-pref').value;

            // Save confirmation locally
            const rsvpData = { name, studentId, phone, attending, timestamp: new Date().toISOString() };
            try {
                localStorage.setItem('ousl_rsvp_2023', JSON.stringify(rsvpData));
            } catch (err) {
                console.log(err);
            }

            // Show success state
            form.style.display = 'none';
            successMsg.classList.remove('hidden');

            // Celebration effect
            playCelebrationFanfare();
            if (typeof confetti === 'function') {
                confetti({
                    particleCount: 100,
                    spread: 80,
                    origin: { y: 0.5 }
                });
            }

            // Auto-close after 3.5 seconds
            setTimeout(() => {
                modal.classList.add('hidden');
                setTimeout(() => {
                    form.style.display = 'block';
                    form.reset();
                    successMsg.classList.add('hidden');
                }, 500);
            }, 3500);
        });
    }
}

/* ===================================================================
   7. SHARE INVITATION BUTTON
   =================================================================== */
function initShareButton() {
    const shareBtn = document.getElementById('share-btn');
    if (!shareBtn) return;

    shareBtn.addEventListener('click', async () => {
        const shareData = {
            title: "Batch Photograph 2023 | Department of Social Sciences - OUSL",
            text: "You are cordially invited to the Grand Batch Photograph 2023 of the Department of Social Sciences, Faculty of Humanities & Social Sciences - OUSL Nawala on December 13th!",
            url: window.location.href
        };

        if (navigator.share) {
            try {
                await navigator.share(shareData);
            } catch (err) {
                console.log('Share dismissed or cancelled');
            }
        } else {
            // Fallback: Copy to clipboard
            try {
                await navigator.clipboard.writeText(window.location.href);
                const originalText = shareBtn.innerHTML;
                shareBtn.innerHTML = '<i class="fa-solid fa-check"></i> Link Copied!';
                setTimeout(() => {
                    shareBtn.innerHTML = originalText;
                }, 2500);
            } catch (e) {
                alert("Invite link: " + window.location.href);
            }
        }
    });
}

/* ===================================================================
   8. AMBIENT BACKGROUND PARTICLES (Canvas)
   =================================================================== */
function initAmbientParticles() {
    const canvas = document.getElementById('ambient-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    window.addEventListener('resize', () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    });

    const particles = [];
    const particleCount = Math.min(Math.floor(width / 20), 45);

    class Sparkle {
        constructor() {
            this.reset();
        }

        reset() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.size = Math.random() * 2 + 0.8;
            this.speedY = -(Math.random() * 0.4 + 0.15);
            this.speedX = (Math.random() - 0.5) * 0.3;
            this.opacity = Math.random() * 0.6 + 0.2;
            this.fadeSpeed = Math.random() * 0.008 + 0.003;
            this.color = Math.random() > 0.35 ? '245, 192, 66' : '255, 255, 255';
        }

        update() {
            this.y += this.speedY;
            this.x += this.speedX;
            this.opacity -= this.fadeSpeed;

            if (this.y < 0 || this.opacity <= 0) {
                this.reset();
                this.y = height + 10;
            }
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${this.color}, ${this.opacity})`;
            ctx.shadowBlur = 8;
            ctx.shadowColor = `rgba(${this.color}, 0.8)`;
            ctx.fill();
        }
    }

    for (let i = 0; i < particleCount; i++) {
        particles.push(new Sparkle());
    }

    function animate() {
        ctx.clearRect(0, 0, width, height);
        particles.forEach(p => {
            p.update();
            p.draw();
        });
        requestAnimationFrame(animate);
    }

    animate();
}
