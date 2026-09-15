/**
 * MAISON SOLARIS EYEWEAR - MISSION CONTROL ESCAPE ROOM
 * Core Interactive Logic, Audio Synthesis, Timer, Cipher Engine (Hard Mode)
 */

// Master Answers & Alternative Regex Patterns
const CIPHER_SOLUTIONS = {
  1: {
    canonical: 'TITAN-54-18-950',
    alternatives: ['TITAN-54-18-950TI', 'TITAN5418950', 'TITAN-54-18-950-TI'],
    check: (input) => {
      const clean = input.toUpperCase().replace(/[\s]/g, '');
      return clean === 'TITAN-54-18-950' || 
             clean === 'TITAN-54-18-950TI' || 
             clean === 'TITAN5418950' ||
             clean === 'TITAN-54-18-950-TI';
    }
  },
  2: {
    canonical: 'ISO14855-DELTA49-CAT3',
    alternatives: ['ISO14855-DELTA49-CAT3', 'ISO-14855-DELTA-49-CAT-3', 'ISO14855DELTA49CAT3', 'ISO14855-M49-CAT3'],
    check: (input) => {
      const clean = input.toUpperCase().replace(/[\s]/g, '');
      return clean === 'ISO14855-DELTA49-CAT3' ||
             clean === 'ISO-14855-DELTA-49-CAT-3' ||
             clean === 'ISO-14855-DELTA-49-CAT3' ||
             clean === 'ISO14855DELTA49CAT3' ||
             clean === 'ISO14855-M49-CAT3';
    }
  },
  3: {
    canonical: 'GUARD-BRIDGEFIT26-PRO',
    alternatives: ['GUARD-BRIDGEFIT26', 'BRIDGEFIT26', 'GUARDBRIDGEFIT26PRO'],
    check: (input) => {
      const clean = input.toUpperCase().replace(/[\s]/g, '');
      return clean === 'GUARD-BRIDGEFIT26-PRO' ||
             clean === 'GUARD-BRIDGEFIT26' ||
             clean === 'BRIDGEFIT26' ||
             clean === 'GUARDBRIDGEFIT26PRO';
    }
  },
  4: {
    canonical: 'MIDNIGHT-TOKYO5000-SLIDES-VIDEO',
    alternatives: ['MIDNIGHT-TOKYO5K-SLIDES-VIDEO', 'MIDNIGHT-TOKYO-5000-SLIDES-VIDEO', 'MIDNIGHT-TOKYO5000', 'MIDNIGHTTOKYO5000SLIDESVIDEO'],
    check: (input) => {
      const clean = input.toUpperCase().replace(/[\s]/g, '');
      return clean.includes('MIDNIGHT') && 
             (clean.includes('TOKYO5000') || clean.includes('TOKYO5K') || clean.includes('5000')) &&
             (clean.includes('SLIDE') || clean.includes('VIDEO'));
    }
  }
};

// 3-Tiered Hints for Hard Mode
const ROOM_HINTS = {
  1: [
    "Tier 1 (Nudge): Have you uploaded 'Maison_Solaris_Technical_Blueprints.pdf' into the Gem's Knowledge section and enabled Image Generation (Nano Banana)? Look at Section 3 of the PDF.",
    "Tier 2 (Clue): The formula is TITAN-[LENS]-[BRIDGE]-[TENSILE]. The lens width is 54mm, bridge is 18mm, and Grade-5 Beta Titanium tensile strength in Section 2 is 950 MPa.",
    "Tier 3 (Reveal): The Chamber 01 override cipher is: TITAN-54-18-950"
  ],
  2: [
    "Tier 1 (Nudge): Generate the Audio Overview podcast in NotebookLM Studio. Listen to the hosts discuss the 115-day composting test and runway lighting standard, then ask targeted questions in NotebookLM chat.",
    "Tier 2 (Clue): In NotebookLM chat, ask for: 1) ISO standard for biodegradability (ISO 14855), 2) batch code for M49 (DELTA-49), and 3) mandatory runway filter category (CAT3). Formula: [ISO]-[BATCH]-[CAT].",
    "Tier 3 (Reveal): The Chamber 02 override cipher is: ISO14855-DELTA49-CAT3"
  ],
  3: [
    "Tier 1 (Nudge): Upload 'Maison_Solaris_Brand_Safety_SOP.pdf' into the Optical Care Guardian Gem. Notice the negative constraint: strictly decline headache prescriptions.",
    "Tier 2 (Clue): Read Section 3 of the Brand Safety SOP. When de-escalating bridge pinching, the concierge is authorized to issue the VIP resolution voucher code.",
    "Tier 3 (Reveal): The Chamber 03 override cipher is: GUARD-BRIDGEFIT26-PRO"
  ],
  4: [
    "Tier 1 (Nudge): In NotebookLM Studio, generate both a Slide Deck (Presentation) and a Video Overview. Check allocation_matrix.csv for which city has 7,850 pre-orders and only 2.1% returns.",
    "Tier 2 (Clue): Tokyo is the Priority Hub receiving 5,000 units. Combine the runway theme (MIDNIGHT), the priority hub units (TOKYO5000), and the NotebookLM Studio deliverables (SLIDES-VIDEO).",
    "Tier 3 (Reveal): The Master Deployment Cipher is: MIDNIGHT-TOKYO5000-SLIDES-VIDEO"
  ]
};

// State Variables
let timerSeconds = 60 * 60; // 60 minutes default
let timerInterval = null;
let timerRunning = false;
let unlockedChambers = { 1: false, 2: false, 3: false, 4: false };
let hintsUsed = { 1: 0, 2: 0, 3: 0, 4: 0 };
let penaltyMinutes = 0;
let soundEnabled = true;

// Web Audio API Synthesizer (No external mp3/wav files required)
let audioCtx = null;

function initAudio() {
  if (!audioCtx) {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (AudioContext) {
      audioCtx = new AudioContext();
    }
  }
}

function playSound(type) {
  if (!soundEnabled) return;
  try {
    initAudio();
    if (!audioCtx) return;
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }

    const now = audioCtx.currentTime;

    if (type === 'unlock') {
      // Elegant crystal chime
      const osc1 = audioCtx.createOscillator();
      const osc2 = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      osc1.type = 'sine';
      osc2.type = 'triangle';

      osc1.frequency.setValueAtTime(587.33, now); // D5
      osc1.frequency.exponentialRampToValueAtTime(880.00, now + 0.15); // A5
      osc1.frequency.exponentialRampToValueAtTime(1174.66, now + 0.35); // D6

      osc2.frequency.setValueAtTime(293.66, now);
      osc2.frequency.exponentialRampToValueAtTime(440.00, now + 0.2);

      gain.gain.setValueAtTime(0.25, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.8);

      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(audioCtx.destination);

      osc1.start(now);
      osc2.start(now);
      osc1.stop(now + 0.8);
      osc2.stop(now + 0.8);

    } else if (type === 'error') {
      // Low dual-tone buzzer
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(130.81, now); // C3
      osc.frequency.linearRampToValueAtTime(98.00, now + 0.25); // G2

      gain.gain.setValueAtTime(0.3, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.35);

      osc.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start(now);
      osc.stop(now + 0.35);

    } else if (type === 'hint') {
      // Warning penalty blip
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(440, now);
      osc.frequency.exponentialRampToValueAtTime(220, now + 0.3);

      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.3);

      osc.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start(now);
      osc.stop(now + 0.3);

    } else if (type === 'victory') {
      // Grand celebratory orchestral chords
      const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
      notes.forEach((freq, idx) => {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + idx * 0.12);
        gain.gain.setValueAtTime(0.25, now + idx * 0.12);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.12 + 1.2);

        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start(now + idx * 0.12);
        osc.stop(now + idx * 0.12 + 1.2);
      });
    }
  } catch (err) {
    console.warn("Web Audio unable to play:", err);
  }
}

// Timer Functions
function formatTime(totalSeconds) {
  const isNegative = totalSeconds < 0;
  const absSeconds = Math.abs(totalSeconds);
  const minutes = Math.floor(absSeconds / 60);
  const seconds = absSeconds % 60;
  const formatted = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  return isNegative ? `-${formatted}` : formatted;
}

function updateTimerDisplay() {
  const display = document.getElementById('timer-display');
  if (display) {
    display.textContent = formatTime(timerSeconds);
    if (timerSeconds <= 300 && timerSeconds > 0) {
      display.classList.add('urgent');
    } else {
      display.classList.remove('urgent');
    }
  }
}

function startTimer() {
  if (timerRunning) return;
  timerRunning = true;
  initAudio();
  const toggleBtn = document.getElementById('btn-timer-toggle');
  if (toggleBtn) {
    toggleBtn.textContent = '⏸ PAUSE MISSION';
    toggleBtn.classList.add('btn-running');
  }

  timerInterval = setInterval(() => {
    timerSeconds--;
    updateTimerDisplay();
  }, 1000);
}

function pauseTimer() {
  if (!timerRunning) return;
  timerRunning = false;
  clearInterval(timerInterval);
  const toggleBtn = document.getElementById('btn-timer-toggle');
  if (toggleBtn) {
    toggleBtn.textContent = '▶ RESUME MISSION';
    toggleBtn.classList.remove('btn-running');
  }
}

function addTime(minutes) {
  timerSeconds += minutes * 60;
  updateTimerDisplay();
}

// Room & Navigation Handlers
function switchRoom(roomNum) {
  document.querySelectorAll('.nav-room-btn').forEach(btn => btn.classList.remove('active'));
  document.querySelectorAll('.room-panel').forEach(panel => panel.classList.remove('active'));

  const navBtn = document.getElementById(`nav-btn-${roomNum}`);
  const roomPanel = document.getElementById(`room-panel-${roomNum}`);

  if (navBtn) navBtn.classList.add('active');
  if (roomPanel) roomPanel.classList.add('active');

  const input = document.getElementById(`cipher-input-${roomNum}`);
  if (input && !unlockedChambers[roomNum]) {
    setTimeout(() => input.focus(), 100);
  }
}

// Cipher Verification
function verifyChamber(roomNum) {
  initAudio();
  if (unlockedChambers[roomNum]) {
    showFeedback(roomNum, "Chamber already decrypted and online.", "info");
    return;
  }

  const inputEl = document.getElementById(`cipher-input-${roomNum}`);
  if (!inputEl) return;
  const userVal = inputEl.value.trim();

  if (!userVal) {
    showFeedback(roomNum, "Enter a cipher before submitting verification.", "error");
    playSound('error');
    return;
  }

  const solver = CIPHER_SOLUTIONS[roomNum];
  const isCorrect = solver && solver.check(userVal);

  if (isCorrect) {
    unlockedChambers[roomNum] = true;
    playSound('unlock');
    showFeedback(roomNum, `ACCESS GRANTED! Chamber ${roomNum} unlocked successfully.`, "success");

    // Update UI
    const navStatus = document.getElementById(`nav-status-${roomNum}`);
    if (navStatus) navStatus.textContent = '🔓';
    const navBtn = document.getElementById(`nav-btn-${roomNum}`);
    if (navBtn) navBtn.classList.add('unlocked');

    inputEl.disabled = true;
    inputEl.classList.add('input-success');

    updateProgress();

    // Check victory condition
    if (unlockedChambers[1] && unlockedChambers[2] && unlockedChambers[3] && unlockedChambers[4]) {
      setTimeout(triggerVictory, 900);
    } else {
      // Auto-switch to next chamber
      setTimeout(() => {
        const nextRoom = roomNum < 4 ? roomNum + 1 : 1;
        switchRoom(nextRoom);
      }, 1200);
    }
  } else {
    playSound('error');
    showFeedback(roomNum, `INVALID CIPHER. Authentication rejected. Check your deductions.`, "error");
    inputEl.classList.add('input-error');
    setTimeout(() => inputEl.classList.remove('input-error'), 800);
  }
}

function showFeedback(roomNum, msg, type) {
  const el = document.getElementById(`feedback-${roomNum}`);
  if (!el) return;
  el.textContent = msg;
  el.className = `feedback-msg msg-${type}`;
}

// Hint System with -3:00 Penalty
function requestHint(roomNum) {
  initAudio();
  if (unlockedChambers[roomNum]) {
    alert(`Chamber ${roomNum} is already solved!`);
    return;
  }

  const currentHintIndex = hintsUsed[roomNum];
  const hints = ROOM_HINTS[roomNum];

  if (currentHintIndex >= hints.length) {
    alert("All available hints have already been revealed for this chamber.");
    return;
  }

  const confirmed = confirm(`Requesting a hint will deduct 3:00 minutes from your mission clock. Proceed?`);
  if (!confirmed) return;

  hintsUsed[roomNum]++;
  penaltyMinutes += 3;
  timerSeconds -= 180;
  updateTimerDisplay();
  playSound('hint');

  const penaltyLog = document.getElementById('penalty-log');
  const totalHints = Object.values(hintsUsed).reduce((a, b) => a + b, 0);
  if (penaltyLog) {
    penaltyLog.textContent = `Penalties: -${penaltyMinutes} min (${totalHints} hints used)`;
  }

  const hintDisplay = document.getElementById(`hint-display-${roomNum}`);
  if (hintDisplay) {
    const hintEl = document.createElement('div');
    hintEl.className = 'hint-card';
    hintEl.textContent = hints[currentHintIndex];
    hintDisplay.appendChild(hintEl);
  }
}

// Progress Tracker
function updateProgress() {
  const unlockedCount = Object.values(unlockedChambers).filter(Boolean).length;
  const pct = (unlockedCount / 4) * 100;

  const bar = document.getElementById('progress-bar-fill');
  if (bar) bar.style.width = `${pct}%`;

  const txt = document.getElementById('vaults-unlocked-text');
  if (txt) txt.textContent = `${unlockedCount} / 4 Chambers Unlocked`;

  const pctTxt = document.getElementById('progress-percent-text');
  if (pctTxt) pctTxt.textContent = `${Math.round(pct)}%`;
}

// Victory Modal
function triggerVictory() {
  pauseTimer();
  playSound('victory');

  const modal = document.getElementById('victory-modal');
  if (modal) modal.classList.add('active');

  const scoreTime = document.getElementById('score-time-left');
  if (scoreTime) scoreTime.textContent = formatTime(timerSeconds);

  const totalHints = Object.values(hintsUsed).reduce((a, b) => a + b, 0);
  const scoreHints = document.getElementById('score-hints-count');
  if (scoreHints) scoreHints.textContent = `${totalHints} (-${penaltyMinutes}m)`;

  const scoreRank = document.getElementById('score-rank');
  if (scoreRank) {
    if (timerSeconds >= 1800 && totalHints === 0) {
      scoreRank.textContent = "GRAND MASTER OPTICAL ALCHEMIST 🌟";
    } else if (timerSeconds >= 900 && totalHints <= 2) {
      scoreRank.textContent = "EXECUTIVE RUNWAY DIRECTOR 🕶️";
    } else {
      scoreRank.textContent = "HAUTE COUTURE SURVIVOR 🥂";
    }
  }
}

function closeVictoryModal() {
  const modal = document.getElementById('victory-modal');
  if (modal) modal.classList.remove('active');
}

// Facilitator Drawer
function toggleFacilitatorDrawer() {
  const drawer = document.getElementById('facilitator-drawer');
  if (drawer) drawer.classList.toggle('open');
}

function unlockAllRooms() {
  for (let i = 1; i <= 4; i++) {
    unlockedChambers[i] = true;
    const navStatus = document.getElementById(`nav-status-${i}`);
    if (navStatus) navStatus.textContent = '🔓';
    const navBtn = document.getElementById(`nav-btn-${i}`);
    if (navBtn) navBtn.classList.add('unlocked');
    const input = document.getElementById(`cipher-input-${i}`);
    if (input) {
      input.value = CIPHER_SOLUTIONS[i].canonical;
      input.disabled = true;
    }
    showFeedback(i, `Facilitator override applied.`, "info");
  }
  updateProgress();
  playSound('unlock');
}

function addFacilitatorTime(mins) {
  addTime(mins);
  alert(`Added ${mins} minutes to the mission clock.`);
}

function resetGame() {
  if (!confirm("Are you sure you want to reset the escape room session?")) return;
  clearInterval(timerInterval);
  timerSeconds = 60 * 60;
  timerRunning = false;
  penaltyMinutes = 0;
  unlockedChambers = { 1: false, 2: false, 3: false, 4: false };
  hintsUsed = { 1: 0, 2: 0, 3: 0, 4: 0 };

  for (let i = 1; i <= 4; i++) {
    const navStatus = document.getElementById(`nav-status-${i}`);
    if (navStatus) navStatus.textContent = '🔒';
    const navBtn = document.getElementById(`nav-btn-${i}`);
    if (navBtn) navBtn.classList.remove('unlocked');
    const input = document.getElementById(`cipher-input-${i}`);
    if (input) {
      input.value = '';
      input.disabled = false;
      input.classList.remove('input-success', 'input-error');
    }
    const feedback = document.getElementById(`feedback-${i}`);
    if (feedback) feedback.textContent = '';
    const hintDisp = document.getElementById(`hint-display-${i}`);
    if (hintDisp) hintDisp.innerHTML = '';
  }

  const penaltyLog = document.getElementById('penalty-log');
  if (penaltyLog) penaltyLog.textContent = 'Penalties: 0 min (0 hints used)';

  const toggleBtn = document.getElementById('btn-timer-toggle');
  if (toggleBtn) {
    toggleBtn.textContent = '▶ START MISSION';
    toggleBtn.classList.remove('btn-running');
  }

  updateTimerDisplay();
  updateProgress();
  closeVictoryModal();
  switchRoom(1);
}

// Event Listeners Initialization
document.addEventListener('DOMContentLoaded', () => {
  updateTimerDisplay();
  updateProgress();

  // Timer Toggle
  const timerBtn = document.getElementById('btn-timer-toggle');
  if (timerBtn) {
    timerBtn.addEventListener('click', () => {
      if (timerRunning) {
        pauseTimer();
      } else {
        startTimer();
      }
    });
  }

  // Add 5 min button
  const addBtn = document.getElementById('btn-add-time');
  if (addBtn) {
    addBtn.addEventListener('click', () => addTime(5));
  }

  // Sound Toggle
  const soundBtn = document.getElementById('btn-sound-toggle');
  if (soundBtn) {
    soundBtn.addEventListener('click', () => {
      soundEnabled = !soundEnabled;
      soundBtn.textContent = soundEnabled ? '🔊 SOUND ON' : '🔇 SOUND OFF';
    });
  }

  // Reset Button
  const resetBtn = document.getElementById('btn-reset-session');
  if (resetBtn) {
    resetBtn.addEventListener('click', resetGame);
  }

  // Room Nav Buttons
  document.querySelectorAll('.nav-room-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const roomNum = parseInt(btn.getAttribute('data-room'), 10);
      switchRoom(roomNum);
    });
  });

  // Enter key support for cipher inputs
  for (let i = 1; i <= 4; i++) {
    const input = document.getElementById(`cipher-input-${i}`);
    if (input) {
      input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          verifyChamber(i);
        }
      });
    }
  }
});
