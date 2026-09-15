/**
 * MAISON SOLARIS EYEWEAR - MISSION CONTROL ESCAPE ROOM
 * Core Terminal Controller & Cipher Verification Engine
 */

// Sound Synthesizer via Web Audio API
class AudioSynthesizer {
  constructor() {
    this.ctx = null;
    this.enabled = true;
  }

  init() {
    if (!this.ctx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this.ctx = new AudioContext();
      }
    }
  }

  playBeep(freq = 800, duration = 0.08, type = 'sine') {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
      gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + duration);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch (e) {}
  }

  playSuccess() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      [523.25, 659.25, 783.99, 1046.50].forEach((freq, i) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.frequency.setValueAtTime(freq, now + i * 0.1);
        gain.gain.setValueAtTime(0.1, now + i * 0.1);
        gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.1 + 0.35);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now + i * 0.1);
        osc.stop(now + i * 0.1 + 0.35);
      });
    } catch (e) {}
  }

  playError() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(140, now);
      osc.frequency.linearRampToValueAtTime(90, now + 0.3);
      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.3);
    } catch (e) {}
  }
}

const audio = new AudioSynthesizer();

// State variables
let timerSeconds = 60 * 60; // 60 minutes
let timerRunning = false;
let timerInterval = null;
let penaltyMinutes = 0;

let unlockedChambers = {
  1: false,
  2: false,
  3: false,
  4: false
};

let hintsUsed = {
  1: 0,
  2: 0,
  3: 0,
  4: 0
};

// Official Hard Mode Solutions
const CHAMBER_KEYS = {
  1: 'TITAN-54-18-950',
  2: 'ISO14855-DELTA49-CAT3',
  3: 'GUARD-BRIDGEFIT26-PRO',
  4: 'MIDNIGHT-TOKYO5000-SLIDES-VIDEO'
};

// Progressive Hint System (-3 min penalty per tier)
const CHAMBER_HINTS = {
  1: [
    "Look at the Raw Spec #881: The boxing dimensions are 'Eye 54' and 'Bridge 18'.",
    "Open the Technical Blueprints PDF: Grade-5 Beta Titanium Ultimate Tensile Strength is explicitly listed as 950 MPa.",
    "Assembly Formula: TITAN-[LENS]-[BRIDGE]-[TENSILE] => TITAN-54-18-950"
  ],
  2: [
    "In NotebookLM, run Audio Overview on both sources. The hosts debate the industrial composting standard and runway lighting.",
    "Forensic query chat: ISO for composting is ISO 14855. Acetate batch is DELTA49. Spotlight filter is Category 3 (CAT3).",
    "Assembly Formula: [ISO_STANDARD]-[BATCH_CODE]-[FILTER_CAT] => ISO14855-DELTA49-CAT3"
  ],
  3: [
    "Enforce Gem 02 negative constraints: strict refusal of headache medicine / clinical diagnosis. Biocompatibility: ISO 10993-5.",
    "Examine Brand Safety SOP Section 3: The authorized VIP emergency replacement voucher is for Bridge Fit 2026 Pro.",
    "Assembly Formula: GUARD-BRIDGEFIT26-PRO"
  ],
  4: [
    "Reconcile the Allocation Matrix: Milan gets 3,000, New York gets 4,000, Tokyo has highest pre-orders (7,850) and lowest returns (2.1%). Tokyo gets 5,000 units.",
    "Remember the deliverables required in NotebookLM Studio: Slide Deck (SLIDES) and Video Overview (VIDEO). Theme is MIDNIGHT.",
    "Assembly Formula: MIDNIGHT-TOKYO5000-SLIDES-VIDEO"
  ]
};

// Document Metadata for Viewer & Tabs
const DOSSIER_METADATA = {
  'gem1_prompt': { title: 'Gem 01: Luxury Eyewear Merchandiser (System Prompt)', category: 'Gems', tool: 'Gemini App' },
  'gem2_prompt': { title: 'Gem 02: Optical Care Guardian (System Prompt)', category: 'Gems', tool: 'Gemini App' },
  'gem3_prompt': { title: 'Gem 03: Merchandise Allocator (System Prompt)', category: 'Gems', tool: 'Gemini App' },
  'raw_specs': { title: 'Raw Factory Engineering Notes (Prototype #881)', category: 'Specs', tool: 'Chamber 01' },
  'source1_mido': { title: 'Source 01: MIDO Eyewear Trend Forecast (2026/2027)', category: 'Sources', tool: 'NotebookLM' },
  'source2_bioacetate': { title: 'Source 02: Bio-Acetate Composting & UV Audit', category: 'Sources', tool: 'NotebookLM' },
  'source3_ergonomics': { title: 'Source 03: Optical Fit & Cranial Ergonomics Guide', category: 'Sources', tool: 'NotebookLM' },
  'source4_sentiment': { title: 'Source 04: Regional Pre-Order Demand & Sentiment', category: 'Sources', tool: 'NotebookLM' },
  'allocation_csv': { title: 'Master Inventory Allocation Matrix (CSV)', category: 'Data', tool: 'NotebookLM' },
  'influencer_thread': { title: 'Leaked Influencer DM & Comments (@chloevance_style)', category: 'PR', tool: 'Chamber 03' },
  'brand_playbook': { title: 'Brand Voice & Escalation Tone Playbook', category: 'PR', tool: 'Chamber 03' },
  'room1_worksheet': { title: 'Chamber 01 Student Worksheet', category: 'Worksheets', tool: 'Chamber 01' },
  'room2_tasks': { title: 'Chamber 02 NotebookLM Forensic Tasks', category: 'Worksheets', tool: 'Chamber 02' },
  'room2_worksheet': { title: 'Chamber 02 Citation Verification Sheet', category: 'Worksheets', tool: 'Chamber 02' },
  'room3_worksheet': { title: 'Chamber 03 Response Testing Checklist', category: 'Worksheets', tool: 'Chamber 03' },
  'room4_worksheet': { title: 'Chamber 04 Master Launch Protocol', category: 'Worksheets', tool: 'Chamber 04' },
  'gems_cheatsheet': { title: 'Quick Reference: Gemini App Custom Gems', category: 'Handouts', tool: 'All' },
  'notebooklm_guide': { title: 'Quick Reference: Gemini NotebookLM Studio', category: 'Handouts', tool: 'All' },
  'scorecard': { title: 'Official Squad Scorecard & Honor Roll', category: 'Handouts', tool: 'All' },
  'pdf_blueprints': { title: 'Maison Solaris Technical Blueprints (PDF)', category: 'PDFs', tool: 'Chamber 01', pdfUrl: 'gem-library/knowledge-pdfs/Maison_Solaris_Technical_Blueprints.pdf' },
  'pdf_sop': { title: 'Maison Solaris Brand Safety SOP (PDF)', category: 'PDFs', tool: 'Chamber 03', pdfUrl: 'gem-library/knowledge-pdfs/Maison_Solaris_Brand_Safety_SOP.pdf' }
};

let currentActiveDossierKey = 'gem1_prompt';

// ==========================================================================
// UNIVERSAL BULLETPROOF CLIPBOARD COPY
// ==========================================================================
function copyDossier(key, btnElement) {
  let text = '';
  if (window.ESCAPE_DOSSIERS && window.ESCAPE_DOSSIERS[key]) {
    text = window.ESCAPE_DOSSIERS[key];
  } else if (typeof ESCAPE_DOSSIERS !== 'undefined' && ESCAPE_DOSSIERS[key]) {
    text = ESCAPE_DOSSIERS[key];
  }

  if (!text) {
    showToast(`⚠️ Unable to locate document text for ${key}.`);
    return;
  }

  // Provide immediate visual button state feedback
  if (btnElement && btnElement.innerHTML && btnElement.classList) {
    const originalContent = btnElement.innerHTML;
    btnElement.innerHTML = '✅ COPIED!';
    btnElement.classList.add('btn-copied');
    setTimeout(() => {
      btnElement.innerHTML = originalContent;
      btnElement.classList.remove('btn-copied');
    }, 2200);
  }

  audio.playBeep(950, 0.08);

  // Method 1: Universal hidden textarea (works in file://, HTTP, iframe, all modern & older browsers)
  let copied = false;
  try {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed';
    ta.style.top = '0';
    ta.style.left = '0';
    ta.style.width = '2em';
    ta.style.height = '2em';
    ta.style.padding = '0';
    ta.style.border = 'none';
    ta.style.outline = 'none';
    ta.style.boxShadow = 'none';
    ta.style.background = 'transparent';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.focus();
    ta.select();
    ta.setSelectionRange(0, 999999);
    copied = document.execCommand('copy');
    document.body.removeChild(ta);
  } catch (err) {
    copied = false;
  }

  // Method 2: Async Clipboard API fallback
  if (!copied && navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(text).then(() => {
      showToast(`✅ Copied to clipboard! Ready to paste.`);
    }).catch(() => {
      showToast(`⚠️ Press Ctrl+C / Cmd+C to copy.`);
    });
    return;
  }

  if (copied) {
    showToast(`✅ Copied to clipboard! Ready to paste.`);
  } else {
    // If browser strictly blocks background clipboard, open modal
    openDossierModal(key);
    showToast(`📋 Opened document in reader. Select and copy!`);
  }
}

// Toast Notification
function showToast(message) {
  let toast = document.getElementById('toast-notification');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast-notification';
    toast.className = 'toast-notification';
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.classList.add('toast-show');

  if (window.toastTimeout) clearTimeout(window.toastTimeout);
  window.toastTimeout = setTimeout(() => {
    toast.classList.remove('toast-show');
  }, 3200);
}

// ==========================================================================
// IN-WORKSPACE TAB SWITCHING (Brief vs Source vs Worksheet)
// ==========================================================================
function switchWsTab(roomNum, tabId, btnElement) {
  audio.playBeep(650, 0.04);
  const panel = document.getElementById(`room-panel-${roomNum}`);
  if (!panel) return;

  // Update tab buttons in this room
  panel.querySelectorAll('.ws-tab-btn').forEach(btn => btn.classList.remove('active'));
  if (btnElement) btnElement.classList.add('active');

  // Update tab contents in this room
  panel.querySelectorAll('.ws-tab-content').forEach(content => content.classList.remove('active'));
  const targetContent = document.getElementById(`tab-content-${roomNum}-${tabId}`);
  if (targetContent) targetContent.classList.add('active');
}

// ==========================================================================
// MODAL VIEWER SYSTEM
// ==========================================================================
function openDossierModal(dossierKey = 'gem1_prompt') {
  audio.playBeep(700, 0.05);
  const modal = document.getElementById('dossier-modal');
  if (!modal) return;
  modal.classList.add('active');
  switchDossierTab(dossierKey);
}

function closeDossierModal() {
  audio.playBeep(500, 0.05);
  const modal = document.getElementById('dossier-modal');
  if (modal) modal.classList.remove('active');
}

function switchDossierTab(dossierKey) {
  currentActiveDossierKey = dossierKey;

  // Update active state in sidebar
  document.querySelectorAll('.dossier-tab-btn').forEach(btn => {
    if (btn.getAttribute('data-doc') === dossierKey) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });

  const meta = DOSSIER_METADATA[dossierKey] || { title: dossierKey };
  const titleEl = document.getElementById('dossier-doc-title');
  if (titleEl) titleEl.textContent = meta.title;

  const copyBtn = document.getElementById('btn-modal-copy-doc');
  const pdfBtn = document.getElementById('btn-modal-download-pdf');

  if (meta.pdfUrl) {
    if (copyBtn) copyBtn.style.display = 'none';
    if (pdfBtn) {
      pdfBtn.style.display = 'inline-flex';
      pdfBtn.href = meta.pdfUrl;
      pdfBtn.setAttribute('download', meta.pdfUrl.split('/').pop());
    }
  } else {
    if (copyBtn) copyBtn.style.display = 'inline-flex';
    if (pdfBtn) pdfBtn.style.display = 'none';
  }

  // Populate content viewer
  const viewer = document.getElementById('dossier-viewer');
  if (viewer) {
    if (meta.pdfUrl) {
      viewer.innerHTML = `
        <div style="text-align: center; padding: 50px 20px;">
          <div style="font-size: 54px; margin-bottom: 16px;">📄</div>
          <h3 style="color: var(--gold-glow); font-family: var(--font-display); margin-bottom: 12px; font-size: 18px;">${meta.title}</h3>
          <p style="color: var(--text-muted); max-width: 520px; margin: 0 auto 24px; line-height: 1.6; font-size: 13px;">
            This is an official binary PDF document used as Knowledge grounding for your Gemini Gem.
            Download this PDF to your computer, then drag-and-drop it into the <b>Knowledge</b> tab of your Gem in the Gemini App.
          </p>
          <a href="${meta.pdfUrl}" download class="btn-shelf-action btn-shelf-pdf" style="font-size: 12px; padding: 12px 24px; display: inline-flex;">
            📥 Download ${meta.pdfUrl.split('/').pop()}
          </a>
        </div>
      `;
    } else {
      const text = (window.ESCAPE_DOSSIERS && window.ESCAPE_DOSSIERS[dossierKey])
        || (typeof ESCAPE_DOSSIERS !== 'undefined' && ESCAPE_DOSSIERS[dossierKey])
        || "Document content loading...";
      viewer.textContent = text;
    }
    viewer.scrollTop = 0;
  }
}

function copyCurrentModalDoc() {
  const copyBtn = document.getElementById('btn-modal-copy-doc');
  copyDossier(currentActiveDossierKey, copyBtn);
}

// ==========================================================================
// TIMER & SESSION MANAGEMENT
// ==========================================================================
function updateTimerDisplay() {
  const display = document.getElementById('timer-display');
  if (!display) return;

  const minutes = Math.floor(timerSeconds / 60);
  const seconds = timerSeconds % 60;
  display.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  if (timerSeconds <= 300) {
    display.classList.add('urgent');
  } else {
    display.classList.remove('urgent');
  }
}

function startTimer() {
  if (timerRunning) return;
  audio.init();
  audio.playBeep(880, 0.1);
  timerRunning = true;
  const toggleBtn = document.getElementById('btn-timer-toggle');
  if (toggleBtn) {
    toggleBtn.textContent = '⏸ PAUSE';
    toggleBtn.classList.add('btn-running');
  }

  timerInterval = setInterval(() => {
    if (timerSeconds > 0) {
      timerSeconds--;
      updateTimerDisplay();
      if (timerSeconds === 300) audio.playBeep(440, 0.4);
      if (timerSeconds === 60) audio.playBeep(440, 0.8);
    } else {
      clearInterval(timerInterval);
      timerRunning = false;
      audio.playError();
      alert('⚠️ T-MINUS ZERO! RUNWAY DEPLOYMENT WINDOW CLOSED. Request +5 MIN to continue!');
    }
  }, 1000);
}

function pauseTimer() {
  if (!timerRunning) return;
  audio.playBeep(440, 0.1);
  clearInterval(timerInterval);
  timerRunning = false;
  const toggleBtn = document.getElementById('btn-timer-toggle');
  if (toggleBtn) {
    toggleBtn.textContent = '▶ START';
    toggleBtn.classList.remove('btn-running');
  }
}

function addTime(minutes = 5) {
  audio.playBeep(600, 0.08);
  timerSeconds += minutes * 60;
  updateTimerDisplay();
  showToast(`⏱️ Added +${minutes} minutes to countdown.`);
}

function deductTime(minutes = 3) {
  penaltyMinutes += minutes;
  timerSeconds = Math.max(0, timerSeconds - minutes * 60);
  updateTimerDisplay();

  const penaltyPill = document.getElementById('penalty-log');
  if (penaltyPill) {
    const totalHints = Object.values(hintsUsed).reduce((a, b) => a + b, 0);
    penaltyPill.textContent = `Penalties: -${penaltyMinutes}m (${totalHints} hints)`;
  }
}

// ==========================================================================
// CHAMBER NAVIGATION & VERIFICATION
// ==========================================================================
function switchRoom(roomNum) {
  audio.playBeep(520, 0.05);

  // Update Stepper buttons
  document.querySelectorAll('.step-btn').forEach(btn => {
    if (parseInt(btn.getAttribute('data-room'), 10) === roomNum) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });

  // Update Chamber panels
  document.querySelectorAll('.room-panel').forEach(panel => {
    panel.classList.remove('active');
    panel.style.display = 'none';
  });

  const activePanel = document.getElementById(`room-panel-${roomNum}`);
  if (activePanel) {
    activePanel.classList.add('active');
    activePanel.style.display = 'grid';
  }
}

function verifyChamber(roomNum) {
  audio.init();
  const input = document.getElementById(`cipher-input-${roomNum}`);
  const feedback = document.getElementById(`feedback-${roomNum}`);
  if (!input || !feedback) return;

  const enteredCode = input.value.trim().toUpperCase().replace(/\s+/g, '');
  const correctCode = CHAMBER_KEYS[roomNum];

  if (!timerRunning && Object.values(unlockedChambers).every(v => !v)) {
    startTimer();
  }

  if (enteredCode === correctCode) {
    audio.playSuccess();
    unlockedChambers[roomNum] = true;
    input.classList.remove('input-error');
    input.classList.add('input-success');
    input.disabled = true;

    feedback.className = 'feedback-msg msg-success';
    feedback.textContent = `✅ CHAMBER ${roomNum} DECRYPTED! OVERRIDE AUTHORIZED.`;

    const stepBtn = document.getElementById(`step-btn-${roomNum}`);
    if (stepBtn) {
      stepBtn.classList.add('unlocked');
      const statusIcon = stepBtn.querySelector('.step-status');
      if (statusIcon) statusIcon.textContent = '🔓';
    }

    updateProgress();

    // Advance to next room or trigger victory
    if (roomNum < 4) {
      setTimeout(() => {
        switchRoom(roomNum + 1);
        showToast(`🔓 Chamber 0${roomNum} cleared! Chamber 0${roomNum + 1} unlocked.`);
      }, 1200);
    } else {
      setTimeout(() => triggerVictory(), 1000);
    }
  } else {
    audio.playError();
    input.classList.add('input-error');
    setTimeout(() => input.classList.remove('input-error'), 600);
    feedback.className = 'feedback-msg msg-error';
    feedback.textContent = `❌ ACCESS DENIED: Invalid override cipher.`;
  }
}

function requestHint(roomNum) {
  const currentLevel = hintsUsed[roomNum];
  const hints = CHAMBER_HINTS[roomNum];

  if (currentLevel >= hints.length) {
    showToast(`All available hints for Chamber 0${roomNum} have been revealed.`);
    return;
  }

  const confirmed = confirm(`Requesting a hint will deduct 3:00 minutes from your runway countdown. Proceed?`);
  if (!confirmed) return;

  audio.playBeep(350, 0.15);
  deductTime(3);
  hintsUsed[roomNum]++;

  const hintText = hints[currentLevel];
  const display = document.getElementById(`hint-display-${roomNum}`);
  if (display) {
    const hintCard = document.createElement('div');
    hintCard.className = 'hint-card';
    hintCard.innerHTML = `<strong>TIER ${currentLevel + 1} CLUE:</strong> ${hintText}`;
    display.appendChild(hintCard);
  }
}

function updateProgress() {
  const total = 4;
  const solved = Object.values(unlockedChambers).filter(Boolean).length;
  const pct = (solved / total) * 100;

  const headerProgressText = document.getElementById('header-progress-text');
  if (headerProgressText) {
    headerProgressText.textContent = `${solved} / ${total} Chambers Decrypted`;
  }
}

function triggerVictory() {
  audio.playSuccess();
  if (timerRunning) pauseTimer();

  const modal = document.getElementById('victory-modal');
  if (!modal) return;

  const minutes = Math.floor(timerSeconds / 60);
  const seconds = timerSeconds % 60;
  const timeStr = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  const scoreTime = document.getElementById('score-time-left');
  if (scoreTime) scoreTime.textContent = timeStr;

  const totalHints = Object.values(hintsUsed).reduce((a, b) => a + b, 0);
  const scoreHints = document.getElementById('score-hints-count');
  if (scoreHints) scoreHints.textContent = `${totalHints} (-${penaltyMinutes}m)`;

  const scoreRank = document.getElementById('score-rank');
  if (scoreRank) {
    if (timerSeconds > 2400 && totalHints === 0) {
      scoreRank.textContent = "ALTA MODA GRANDMASTER (DIAMOND)";
    } else if (timerSeconds > 1200) {
      scoreRank.textContent = "SENIOR EYEWEAR ARCHITECT (GOLD)";
    } else {
      scoreRank.textContent = "CERTIFIED OPTICAL MERCHANDISER";
    }
  }

  modal.classList.add('active');
}

function closeVictoryModal() {
  const modal = document.getElementById('victory-modal');
  if (modal) modal.classList.remove('active');
}

function resetGame() {
  const confirmed = confirm("Are you sure you want to reset the escape room session?");
  if (!confirmed) return;

  clearInterval(timerInterval);
  timerRunning = false;
  timerSeconds = 60 * 60;
  penaltyMinutes = 0;
  unlockedChambers = { 1: false, 2: false, 3: false, 4: false };
  hintsUsed = { 1: 0, 2: 0, 3: 0, 4: 0 };

  for (let i = 1; i <= 4; i++) {
    const stepBtn = document.getElementById(`step-btn-${i}`);
    if (stepBtn) {
      stepBtn.classList.remove('unlocked');
      const statusIcon = stepBtn.querySelector('.step-status');
      if (statusIcon) statusIcon.textContent = '🔒';
    }
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

  const penaltyPill = document.getElementById('penalty-log');
  if (penaltyPill) penaltyPill.textContent = 'Penalties: 0 min (0 hints)';

  const toggleBtn = document.getElementById('btn-timer-toggle');
  if (toggleBtn) {
    toggleBtn.textContent = '▶ START';
    toggleBtn.classList.remove('btn-running');
  }

  updateTimerDisplay();
  updateProgress();
  closeVictoryModal();
  switchRoom(1);
}

// Facilitator Drawer
function toggleFacilitatorDrawer() {
  const drawer = document.getElementById('facilitator-drawer');
  if (drawer) drawer.classList.toggle('open');
}

function unlockAllRooms() {
  for (let i = 1; i <= 4; i++) {
    const input = document.getElementById(`cipher-input-${i}`);
    if (input) input.value = CHAMBER_KEYS[i];
    verifyChamber(i);
  }
}

function addFacilitatorTime(mins) {
  addTime(mins);
}

// Make all handlers universally accessible on window
window.copyDossier = copyDossier;
window.copyCurrentModalDoc = copyCurrentModalDoc;
window.openDossierModal = openDossierModal;
window.closeDossierModal = closeDossierModal;
window.switchDossierTab = switchDossierTab;
window.switchWsTab = switchWsTab;
window.switchRoom = switchRoom;
window.verifyChamber = verifyChamber;
window.requestHint = requestHint;
window.startTimer = startTimer;
window.pauseTimer = pauseTimer;
window.addTime = addTime;
window.resetGame = resetGame;
window.closeVictoryModal = closeVictoryModal;
window.toggleFacilitatorDrawer = toggleFacilitatorDrawer;
window.unlockAllRooms = unlockAllRooms;
window.addFacilitatorTime = addFacilitatorTime;

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  updateTimerDisplay();
  updateProgress();

  // Attach Enter key support to inputs
  for (let i = 1; i <= 4; i++) {
    const input = document.getElementById(`cipher-input-${i}`);
    if (input) {
      input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') verifyChamber(i);
      });
    }
  }

  // Timer Toggle Click
  const timerBtn = document.getElementById('btn-timer-toggle');
  if (timerBtn) {
    timerBtn.addEventListener('click', () => {
      if (timerRunning) pauseTimer();
      else startTimer();
    });
  }

  // Add 5 min click
  const addBtn = document.getElementById('btn-add-time');
  if (addBtn) addBtn.addEventListener('click', () => addTime(5));

  // Sound toggle click
  const soundBtn = document.getElementById('btn-sound-toggle');
  if (soundBtn) {
    soundBtn.addEventListener('click', () => {
      audio.enabled = !audio.enabled;
      soundBtn.textContent = audio.enabled ? '🔊 SOUND ON' : '🔇 SOUND OFF';
    });
  }

  // Reset session click
  const resetBtn = document.getElementById('btn-reset-session');
  if (resetBtn) resetBtn.addEventListener('click', resetGame);
});
