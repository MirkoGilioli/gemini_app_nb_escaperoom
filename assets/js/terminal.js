/* ==========================================================================
   MAISON SOLARIS EYEWEAR - MISSION CONTROL ESCAPE ROOM JAVASCRIPT
   Timer, Cipher Validation, Audio Synthesis, Progressive Hints, State Storage
   ========================================================================== */

(function () {
  'use strict';

  // State
  const state = {
    totalSeconds: 60 * 60, // 60 minutes default
    remainingSeconds: 60 * 60,
    timerRunning: false,
    timerInterval: null,
    penaltyMinutes: 0,
    hintsUsedCount: 0,
    activeRoom: 1,
    unlockedRooms: {
      1: false,
      2: false,
      3: false,
      4: false
    },
    hintsUsedByRoom: {
      1: 0,
      2: 0,
      3: 0,
      4: 0
    },
    soundEnabled: true
  };

  // Valid Ciphers (Clean trimmed uppercase)
  const SOLUTIONS = {
    1: ['SOLAR', 'SOLARIS'],
    2: ['CAT3-M49', 'CAT 3-M49', 'CAT3M49', 'M49-CAT3'],
    3: ['BRIDGEFIT26', 'BRIDGEFIT-26', 'BRIDGE FIT 26'],
    4: ['MIDNIGHT-LUMINA-2026', 'MIDNIGHTLUMINA2026', 'MIDNIGHT-SOLARIS-2026']
  };

  // Tiered Hints Matrix
  const HINT_TIERS = {
    1: [
      "Tier 1 (Nudge): Look at the structured tags in your Luxury Eyewear Merchandiser Gem output. The prompt worksheet tells you which 5 attribute tags spell out a solar keyword.",
      "Tier 2 (Clue): Look at the first letters of these attributes: [S]ilhouette (Aviator), [O]ptical fit (54-18-145), [L]ens tech (Polarized), [A]cetate origin (Belluno), [R]ating UV (Category 3).",
      "Tier 3 (Reveal): The Chamber 01 override cipher is 'SOLAR'."
    ],
    2: [
      "Tier 1 (Nudge): Ask your NotebookLM notebook two specific questions: 'What is the exact trade designation of the Mazzucchelli bio-acetate?' and 'What lens filter category is specified for the Milan runway sunglasses?'",
      "Tier 2 (Clue): The lens filter category is 'CAT3' (Category 3 - 8% to 18% light transmission). The biodegradable cellulose acetate formula is 'M49'. Combine them with a hyphen.",
      "Tier 3 (Reveal): The Chamber 02 override cipher is 'CAT3-M49'."
    ],
    3: [
      "Tier 1 (Nudge): Review your Optical Care Guardian Gem rules in `gem-library/02_optical_care_guardian_gem.md`. Did you include the mandatory Universal Fit voucher code to appease affected customers?",
      "Tier 2 (Clue): The brand playbook stipulates offering customers experiencing bridge pinch a complimentary Asian/Universal Fit consultation using promo code: BRIDGEFIT + the collection year.",
      "Tier 3 (Reveal): The Chamber 03 override cipher is 'BRIDGEFIT26'."
    ],
    4: [
      "Tier 1 (Nudge): Synthesize the inventory numbers from `allocation_matrix.csv`. Tokyo demand is highest due to titanium ultralight popularity. Then generate the Audio Overview in NotebookLM to catch the runway sign-off phrase.",
      "Tier 2 (Clue): The secret format is [EVENT]-[COLLECTION_HERO]-[YEAR]. The event is MIDNIGHT, the hero design code is LUMINA, and the capsule year is 2026.",
      "Tier 3 (Reveal): The Master Deployment cipher is 'MIDNIGHT-LUMINA-2026'."
    ]
  };

  // Web Audio Synthesizer (No external sound files required!)
  class SoundSynth {
    constructor() {
      this.ctx = null;
    }

    init() {
      if (!this.ctx) {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (AudioContext) {
          this.ctx = new AudioContext();
        }
      }
    }

    playUnlock() {
      if (!state.soundEnabled) return;
      this.init();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(330, now);
      osc.frequency.exponentialRampToValueAtTime(659.25, now + 0.15);
      osc.frequency.exponentialRampToValueAtTime(1318.5, now + 0.35);

      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.5);
    }

    playError() {
      if (!state.soundEnabled) return;
      this.init();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(180, now);
      osc.frequency.setValueAtTime(130, now + 0.12);

      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.3);
    }

    playAlarm() {
      if (!state.soundEnabled) return;
      this.init();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(880, now);
      osc.frequency.setValueAtTime(660, now + 0.15);

      gain.gain.setValueAtTime(0.1, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.3);
    }

    playVictory() {
      if (!state.soundEnabled) return;
      this.init();
      if (!this.ctx) return;

      const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
      const now = this.ctx.currentTime;

      notes.forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'square';
        osc.frequency.setValueAtTime(freq, now + idx * 0.12);

        gain.gain.setValueAtTime(0.12, now + idx * 0.12);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.12 + 0.4);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now + idx * 0.12);
        osc.stop(now + idx * 0.12 + 0.4);
      });
    }
  }

  const sound = new SoundSynth();

  // DOM Elements
  const timerDisplay = document.getElementById('timer-display');
  const btnTimerToggle = document.getElementById('btn-timer-toggle');
  const btnAddTime = document.getElementById('btn-add-time');
  const penaltyLog = document.getElementById('penalty-log');
  const progressBarFill = document.getElementById('progress-bar-fill');
  const vaultsUnlockedText = document.getElementById('vaults-unlocked-text');
  const progressPercentText = document.getElementById('progress-percent-text');
  const victoryModal = document.getElementById('victory-modal');
  const btnSoundToggle = document.getElementById('btn-sound-toggle');
  const btnResetSession = document.getElementById('btn-reset-session');

  // Format mm:ss
  function formatTime(seconds) {
    const isNeg = seconds < 0;
    const absSec = Math.abs(seconds);
    const m = Math.floor(absSec / 60);
    const s = absSec % 60;
    return `${isNeg ? '-' : ''}${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  }

  // Update Timer UI
  function updateTimerUI() {
    timerDisplay.textContent = formatTime(state.remainingSeconds);
    if (state.remainingSeconds <= 300 && state.remainingSeconds > 0) {
      timerDisplay.classList.add('low-time');
    } else {
      timerDisplay.classList.remove('low-time');
    }
    penaltyLog.textContent = `Penalties: -${state.penaltyMinutes} min (${state.hintsUsedCount} hints used)`;
  }

  // Timer Tick
  function tick() {
    if (state.remainingSeconds > 0) {
      state.remainingSeconds--;
      updateTimerUI();
    } else {
      // Time Expired
      clearInterval(state.timerInterval);
      state.timerRunning = false;
      btnTimerToggle.textContent = '▶ RESUME';
      sound.playAlarm();
      alert("🚨 TIME EXPIRED! The runway fashion show has begun without the e-commerce catalog! You can add +5 minutes to keep attempting the mission.");
    }
  }

  // Toggle Timer
  function toggleTimer() {
    sound.init();
    if (!state.timerRunning) {
      state.timerInterval = setInterval(tick, 1000);
      state.timerRunning = true;
      btnTimerToggle.textContent = '⏸ PAUSE';
      btnTimerToggle.style.background = 'linear-gradient(135deg, #445, #223)';
      btnTimerToggle.style.color = '#fff';
    } else {
      clearInterval(state.timerInterval);
      state.timerRunning = false;
      btnTimerToggle.textContent = '▶ START MISSION';
      btnTimerToggle.style.background = 'linear-gradient(135deg, var(--gold-primary), #9c7818)';
      btnTimerToggle.style.color = '#0b0d11';
    }
  }

  // Add 5 Minutes
  function addTime(minutes = 5) {
    state.remainingSeconds += minutes * 60;
    updateTimerUI();
  }

  // Switch Room View
  function switchRoom(roomNum) {
    state.activeRoom = roomNum;
    document.querySelectorAll('.room-panel').forEach(p => p.classList.remove('active'));
    document.querySelectorAll('.nav-room-btn').forEach(b => b.classList.remove('active'));

    const panel = document.getElementById(`room-panel-${roomNum}`);
    const navBtn = document.getElementById(`nav-btn-${roomNum}`);
    if (panel) panel.classList.add('active');
    if (navBtn) navBtn.classList.add('active');
  }

  // Update Progress
  function updateProgress() {
    const unlockedCount = Object.values(state.unlockedRooms).filter(Boolean).length;
    const pct = Math.round((unlockedCount / 4) * 100);

    progressBarFill.style.width = `${pct}%`;
    vaultsUnlockedText.textContent = `${unlockedCount} / 4 Chambers Unlocked`;
    progressPercentText.textContent = `${pct}%`;

    for (let r = 1; r <= 4; r++) {
      const navBtn = document.getElementById(`nav-btn-${r}`);
      const navStatus = document.getElementById(`nav-status-${r}`);
      if (state.unlockedRooms[r]) {
        navBtn.classList.add('unlocked');
        navStatus.textContent = '🔓';
      } else {
        navBtn.classList.remove('unlocked');
        navStatus.textContent = '🔒';
      }
    }
  }

  // Verify Chamber Cipher
  window.verifyChamber = function (roomNum) {
    sound.init();
    const input = document.getElementById(`cipher-input-${roomNum}`);
    const feedback = document.getElementById(`feedback-${roomNum}`);
    if (!input || !feedback) return;

    const val = input.value.trim().toUpperCase();
    const validKeys = SOLUTIONS[roomNum];

    if (validKeys.includes(val)) {
      // Correct!
      state.unlockedRooms[roomNum] = true;
      feedback.className = 'feedback-msg success';
      feedback.innerHTML = `✅ ACCESS GRANTED! Chamber 0${roomNum} Security Deactivated.`;
      sound.playUnlock();
      updateProgress();

      // Auto-advance if not room 4
      if (roomNum < 4) {
        setTimeout(() => {
          switchRoom(roomNum + 1);
        }, 1200);
      } else {
        // All unlocked!
        checkAllUnlocked();
      }
    } else {
      // Incorrect
      feedback.className = 'feedback-msg error';
      feedback.innerHTML = `❌ ACCESS DENIED: Invalid Cipher. Verify prompt instructions and citations.`;
      sound.playError();
    }
  };

  // Request Hint with 3-minute penalty
  window.requestHint = function (roomNum) {
    sound.init();
    const used = state.hintsUsedByRoom[roomNum];
    if (used >= 3) {
      alert("All 3 hint tiers for this chamber have already been revealed!");
      return;
    }

    const confirmPenalty = confirm(
      `⚠️ WARNING: Requesting Tier ${used + 1} Hint will deduct 3:00 from your remaining time!\n\nDo you want to proceed?`
    );

    if (confirmPenalty) {
      state.hintsUsedByRoom[roomNum]++;
      state.hintsUsedCount++;
      state.penaltyMinutes += 3;
      state.remainingSeconds = Math.max(0, state.remainingSeconds - 180);
      updateTimerUI();
      sound.playAlarm();

      renderHints(roomNum);
    }
  };

  function renderHints(roomNum) {
    const container = document.getElementById(`hint-display-${roomNum}`);
    if (!container) return;

    container.innerHTML = '';
    const hints = HINT_TIERS[roomNum];
    const count = state.hintsUsedByRoom[roomNum];

    for (let i = 0; i < count; i++) {
      const hintDiv = document.createElement('div');
      hintDiv.className = 'hint-item';
      hintDiv.textContent = hints[i];
      container.appendChild(hintDiv);
    }
  }

  // Check Victory
  function checkAllUnlocked() {
    const allDone = Object.values(state.unlockedRooms).every(Boolean);
    if (allDone) {
      clearInterval(state.timerInterval);
      state.timerRunning = false;
      sound.playVictory();

      // Populate Victory Stats
      document.getElementById('score-time-left').textContent = formatTime(state.remainingSeconds);
      document.getElementById('score-hints-count').textContent = `${state.hintsUsedCount} (-${state.penaltyMinutes}m)`;

      let rank = "HAUTE COUTURE PRO";
      if (state.hintsUsedCount === 0 && state.remainingSeconds > 1800) {
        rank = "SOLARIS MASTER ALCHEMIST 🌟";
      } else if (state.hintsUsedCount <= 2 && state.remainingSeconds > 900) {
        rank = "EXECUTIVE EYEWEAR DIRECTOR 🕶️";
      } else {
        rank = "FASHION SQUAD SURVIVOR 🥂";
      }
      document.getElementById('score-rank').textContent = rank;

      victoryModal.classList.add('active');
    }
  }

  window.closeVictoryModal = function () {
    victoryModal.classList.remove('active');
  };

  window.resetGame = function () {
    if (confirm("Reset the escape room mission? All progress will be cleared.")) {
      clearInterval(state.timerInterval);
      state.remainingSeconds = 60 * 60;
      state.timerRunning = false;
      state.penaltyMinutes = 0;
      state.hintsUsedCount = 0;
      state.activeRoom = 1;
      for (let r = 1; r <= 4; r++) {
        state.unlockedRooms[r] = false;
        state.hintsUsedByRoom[r] = 0;
        const input = document.getElementById(`cipher-input-${r}`);
        const feedback = document.getElementById(`feedback-${r}`);
        const hintDisplay = document.getElementById(`hint-display-${r}`);
        if (input) input.value = '';
        if (feedback) feedback.textContent = '';
        if (hintDisplay) hintDisplay.innerHTML = '';
      }
      victoryModal.classList.remove('active');
      btnTimerToggle.textContent = '▶ START MISSION';
      btnTimerToggle.style.background = 'linear-gradient(135deg, var(--gold-primary), #9c7818)';
      btnTimerToggle.style.color = '#0b0d11';
      switchRoom(1);
      updateTimerUI();
      updateProgress();
    }
  };

  // Facilitator Drawer
  window.toggleFacilitatorDrawer = function () {
    const drawer = document.getElementById('facilitator-drawer');
    drawer.classList.toggle('open');
  };

  window.unlockAllRooms = function () {
    for (let r = 1; r <= 4; r++) {
      state.unlockedRooms[r] = true;
      const feedback = document.getElementById(`feedback-${r}`);
      if (feedback) {
        feedback.className = 'feedback-msg success';
        feedback.textContent = '🔓 FACILITATOR OVERRIDE UNLOCKED';
      }
    }
    updateProgress();
    checkAllUnlocked();
  };

  window.addFacilitatorTime = function (mins) {
    addTime(mins);
  };

  // Event Listeners
  btnTimerToggle.addEventListener('click', toggleTimer);
  btnAddTime.addEventListener('click', () => addTime(5));
  btnResetSession.addEventListener('click', window.resetGame);

  btnSoundToggle.addEventListener('click', () => {
    state.soundEnabled = !state.soundEnabled;
    btnSoundToggle.textContent = state.soundEnabled ? '🔊 SOUND ON' : '🔇 MUTED';
  });

  document.querySelectorAll('.nav-room-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const r = parseInt(btn.getAttribute('data-room'), 10);
      switchRoom(r);
    });
  });

  // Allow enter key in cipher input fields
  for (let r = 1; r <= 4; r++) {
    const input = document.getElementById(`cipher-input-${r}`);
    if (input) {
      input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
          window.verifyChamber(r);
        }
      });
    }
  }

  // Initial UI Render
  updateTimerUI();
  updateProgress();

})();
