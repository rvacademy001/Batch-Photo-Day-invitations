/* ===================================================================
   VIP CEREMONIAL INVITATION - JAVASCRIPT
   Faculty of Humanities & Social Sciences | OUSL Nawala
   Theme: Royal Emerald Green & Imperial Gold
   Event Date: December 13, 2026 at 7:00 AM
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
   1. SOUND SYNTHESIZER (Web Audio API - Elegant Brass & Harp Chimes)
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

// Royal ceremonial arpeggio (C major 9 / Pentatonic chime)
function playCelebrationFanfare() {
    if (!soundEnabled) return;
    try {
        const ctx = getAudioContext();
        if (!ctx) return;

        // Frequencies for a noble academic harp chime: C4, G4, C5, E5, G5, B5, C6
        const notes = [261.63, 392.00, 523.25, 659.25, 783.99, 987.77, 1046.50];
        const now = ctx.currentTime;

        notes.forEach((freq, idx) => {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();

            osc.type = 'sine';
            osc.frequency.setValueAtTime(freq, now + idx * 0.1);

            gain.gain.setValueAtTime(0, now + idx * 0.1);
            gain.gain.linearRampToValueAtTime(0.18, now + idx * 0.1 + 0.04);
            gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.1 + 1.8);

            osc.connect(gain);
            gain.connect(ctx.destination);

            osc.start(now + idx * 0.1);
            osc.stop(now + idx * 0.1 + 2.0);
        });
    } catch (e) {
        console.warn('Audio playback note:', e);
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

        // Sound chime
        playCelebrationFanfare();

        // Animate envelope
        envelope.classList.add('open');

        // Gold & Emerald confetti burst
        if (typeof confetti === 'function') {
            confetti({
                particleCount: 90,
                spread: 75,
                origin: { y: 0.6 },
                colors: ['#e6b749', '#10b981', '#059669', '#ffd700', '#ffffff']
            });
        }

        // Smooth transition to main content
        setTimeout(() => {
            overlay.classList.add('hide-envelope');
            mainContent.classList.remove('hidden');

            // Ceremonial grand shower
            fireGrandCelebration();

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
   3. CELEBRATORY GOLD & EMERALD CONFETTI
   =================================================================== */
function fireGrandCelebration() {
    if (typeof confetti !== 'function') return;

    const count = 220;
    const defaults = {
        origin: { y: 0.7 },
        colors: ['#e6b749', '#10b981', '#047857', '#ffd700', '#ffffff', '#22c55e']
    };

    function fire(particleRatio, opts) {
        confetti(Object.assign({}, defaults, opts, {
            particleCount: Math.floor(count * particleRatio)
        }));
    }

    fire(0.25, { spread: 28, startVelocity: 55 });
    fire(0.2, { spread: 65 });
    fire(0.35, { spread: 105, decay: 0.91, scalar: 0.85 });
    fire(0.1, { spread: 130, startVelocity: 25, decay: 0.92, scalar: 1.2 });
    fire(0.1, { spread: 130, startVelocity: 45 });
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
   4. DYNAMIC COUNTDOWN TIMER (Exact: Dec 13, 2026 at 07:00 AM)
   =================================================================== */
function initCountdownTimer() {
    const daysEl = document.getElementById('days');
    const hoursEl = document.getElementById('hours');
    const minutesEl = document.getElementById('minutes');
    const secondsEl = document.getElementById('seconds');

    if (!daysEl) return;

    // Exact event date requested: December 13, 2026 at 7:00:00 AM
    const targetDate = new Date("December 13, 2026 07:00:00").getTime();

    function updateCountdown() {
        const now = new Date().getTime();
        const distance = targetDate - now;

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
   5. GOOGLE CALENDAR LINK (Dec 13, 2026 at 7:00 AM)
   =================================================================== */
function initCalendarLink() {
    const calBtn = document.getElementById('google-calendar-btn');
    if (!calBtn) return;

    const title = encodeURIComponent("Ceremonial Batch Photograph 2023 - Department of Social Sciences (OUSL)");
    const details = encodeURIComponent(
        "Official Ceremonial Invitation to the Grand Batch Photograph 2023.\n\nHonoring: Respected Vice-Chancellor, Dean of FHSS, Heads of Departments, and Academic Staff.\nHost: Faculty of Humanities & Social Sciences Students' Union & The Batch of 2023, Department of Social Sciences.\n\nDate: December 13, 2026\nTime: 7:00 AM Sharp\nVenue: HSS Faculty Premises, The Open University of Sri Lanka, Nawala."
    );
    const location = encodeURIComponent("Faculty of Humanities and Social Sciences, The Open University of Sri Lanka, Nawala");

    // December 13, 2026 from 07:00 AM to 01:00 PM
    const startDate = "20261213T070000";
    const endDate = "20261213T130000";

    const gcalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${startDate}/${endDate}&details=${details}&location=${location}`;
    calBtn.setAttribute('href', gcalUrl);
}

/* ===================================================================
   6. DIGNITARY RSVP MODAL & SUBMISSION
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

            const role = document.getElementById('dignitary-role').value;
            const name = document.getElementById('student-name').value;
            const phone = document.getElementById('contact-phone').value;
            const attending = document.getElementById('diet-pref').value;

            // Save RSVP locally
            const rsvpData = { role, name, phone, attending, timestamp: new Date().toISOString() };
            try {
                localStorage.setItem('ousl_dignitary_rsvp_2026', JSON.stringify(rsvpData));
            } catch (err) {
                console.log(err);
            }

            form.style.display = 'none';
            successMsg.classList.remove('hidden');

            playCelebrationFanfare();
            if (typeof confetti === 'function') {
                confetti({
                    particleCount: 120,
                    spread: 85,
                    origin: { y: 0.5 },
                    colors: ['#e6b749', '#10b981', '#ffd700', '#ffffff']
                });
            }

            setTimeout(() => {
                modal.classList.add('hidden');
                setTimeout(() => {
                    form.style.display = 'block';
                    form.reset();
                    successMsg.classList.add('hidden');
                }, 500);
            }, 3800);
        });
    }
}

/* ===================================================================
   7. SHARE INVITATION LINK
   =================================================================== */
function initShareButton() {
    const shareBtn = document.getElementById('share-btn');
    if (!shareBtn) return;

    shareBtn.addEventListener('click', async () => {
        const shareData = {
            title: "VIP Invitation: Grand Batch Photograph 2023 | FHSS - OUSL",
            text: "Official Dignitary Invitation: You are respectfully invited to grace the Ceremonial Batch Photograph 2023 of the Department of Social Sciences, Faculty of Humanities & Social Sciences, The Open University of Sri Lanka on December 13, 2026 at 7:00 AM at the HSS Faculty Premises.",
            url: window.location.href
        };

        if (navigator.share) {
            try {
                await navigator.share(shareData);
            } catch (err) {
                console.log('Share dismissed');
            }
        } else {
            try {
                await navigator.clipboard.writeText(window.location.href);
                const originalText = shareBtn.innerHTML;
                shareBtn.innerHTML = '<i class="fa-solid fa-check"></i> Link Copied!';
                setTimeout(() => {
                    shareBtn.innerHTML = originalText;
                }, 2500);
            } catch (e) {
                alert("Invitation URL: " + window.location.href);
            }
        }
    });
}

/* ===================================================================
   8. AMBIENT EMERALD & GOLD DUST PARTICLES (Canvas)
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
    const particleCount = Math.min(Math.floor(width / 22), 48);

    class DustParticle {
        constructor() {
            this.reset();
        }

        reset() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.size = Math.random() * 2.2 + 0.8;
            this.speedY = -(Math.random() * 0.45 + 0.12);
            this.speedX = (Math.random() - 0.5) * 0.35;
            this.opacity = Math.random() * 0.65 + 0.2;
            this.fadeSpeed = Math.random() * 0.007 + 0.003;

            // Color alternates between Imperial Gold and Emerald Sparkle
            const rand = Math.random();
            if (rand > 0.55) {
                this.color = '230, 183, 73'; // Imperial Gold
            } else if (rand > 0.25) {
                this.color = '16, 185, 129'; // Emerald Green
            } else {
                this.color = '255, 255, 255'; // Diamond Star
            }
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
            ctx.shadowBlur = 10;
            ctx.shadowColor = `rgba(${this.color}, 0.85)`;
            ctx.fill();
        }
    }

    for (let i = 0; i < particleCount; i++) {
        particles.push(new DustParticle());
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
