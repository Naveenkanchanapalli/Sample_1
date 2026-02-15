// =============================
// Floating Hearts Background
// =============================
const heartsContainer = document.getElementById("hearts");

function createHeart() {
  const heart = document.createElement("span");
  heart.innerHTML = "💗";

  heart.style.left = Math.random() * 100 + "vw";
  heart.style.fontSize = Math.random() * 18 + 14 + "px";

  const duration = Math.random() * 4 + 4;
  heart.style.animationDuration = duration + "s";

  heartsContainer.appendChild(heart);

  setTimeout(() => {
    heart.remove();
  }, duration * 1000);
}

setInterval(createHeart, 250);

// =============================
// Elements
// =============================
const nameInput = document.getElementById("nameInput");
const unlockBtn = document.getElementById("unlockBtn");
const resultArea = document.getElementById("resultArea");

const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");

const card = document.getElementById("card");

// Confetti + fireworks
const confetti = document.getElementById("confetti");
const fireworks = document.getElementById("fireworks");

// Music + Sounds
const bgMusic = document.getElementById("bgMusic");
const kissSound = document.getElementById("kissSound");
const musicBtn = document.getElementById("musicBtn");

// 🎁 Gift elements (NEW)
const giftBox = document.getElementById("giftBox");
const popup = document.getElementById("popup");
const closePopup = document.getElementById("closePopup");

let isOwner = false;
let questionShown = false;
let musicStarted = false;

// =============================
// Button Control
// =============================
function resetButtons() {
  yesBtn.disabled = false;
  noBtn.disabled = false;
}

function lockButtons() {
  yesBtn.disabled = true;
  noBtn.disabled = true;
}

// =============================
// Music Logic
// =============================
function startMusic() {
  if (musicStarted) return;

  bgMusic.volume = 0.35;
  bgMusic.play().then(() => {
    musicStarted = true;
    musicBtn.innerHTML = "🔊 Music ON";
  }).catch(() => {
    musicBtn.innerHTML = "▶ Play Music";
  });
}

function toggleMusic() {
  if (!musicStarted) {
    startMusic();
    return;
  }

  if (bgMusic.paused) {
    bgMusic.play();
    musicBtn.innerHTML = "🔊 Music ON";
  } else {
    bgMusic.pause();
    musicBtn.innerHTML = "🔇 Music OFF";
  }
}

musicBtn.addEventListener("click", toggleMusic);

// =============================
// Effects: Confetti Hearts
// =============================
function heartConfettiBlast() {
  for (let i = 0; i < 35; i++) {
    const c = document.createElement("span");
    c.innerHTML = "💗";

    c.style.left = Math.random() * 100 + "vw";
    c.style.fontSize = Math.random() * 18 + 16 + "px";

    const duration = Math.random() * 2 + 3; // 3-5s
    c.style.animationDuration = duration + "s";

    confetti.appendChild(c);

    setTimeout(() => {
      c.remove();
    }, duration * 1000);
  }
}

// =============================
// Effects: Fireworks Sparkles
// =============================
function fireworkBoom() {
  for (let i = 0; i < 18; i++) {
    const s = document.createElement("div");
    s.classList.add("sparkle");

    s.style.left = Math.random() * 100 + "vw";
    s.style.top = Math.random() * 70 + "vh";

    fireworks.appendChild(s);

    setTimeout(() => {
      s.remove();
    }, 1000);
  }
}

// Fireworks for 3 seconds
function startFireworks() {
  let count = 0;
  const interval = setInterval(() => {
    fireworkBoom();
    count++;

    if (count >= 8) {
      clearInterval(interval);
    }
  }, 350);
}

// =============================
// Gift Heart Explosion (NEW)
// =============================
function giftHeartExplosion() {
  for (let i = 0; i < 45; i++) {
    const heart = document.createElement("span");
    heart.innerHTML = "💖";

    heart.style.position = "fixed";
    heart.style.left = "70px";
    heart.style.top = "50%";
    heart.style.fontSize = Math.random() * 22 + 18 + "px";
    heart.style.zIndex = 300;

    const x = (Math.random() - 0.5) * 600;
    const y = (Math.random() - 0.5) * 500;

    heart.animate(
      [
        { transform: "translate(0,0)", opacity: 1 },
        { transform: `translate(${x}px, ${y}px)`, opacity: 0 }
      ],
      { duration: 1300, easing: "ease-out" }
    );

    document.body.appendChild(heart);

    setTimeout(() => {
      heart.remove();
    }, 1300);
  }
}

// =============================
// Unlock Logic
// =============================
unlockBtn.addEventListener("click", () => {
  const enteredName = nameInput.value.trim().toLowerCase();

  startMusic();
  card.classList.remove("pink-mode");
  questionShown = false;

  // Hide gift always when unlock pressed
  giftBox.style.display = "none";
  popup.style.display = "none";

  // Reset NO button position
  noBtn.style.transform = "translate(0px, 0px)";

  if (enteredName === "ruth mary") {
    isOwner = true;
    resetButtons();

    resultArea.innerHTML = `
      <div style="font-size:24px; font-weight:800;">
        💖 Welcome to My Heart <span class="glow-name">Ruth Mary</span> 💖
      </div>

      <div id="valentineQ" style="
        margin-top:14px;
        font-size:20px;
        font-weight:600;
        opacity:0;
        transform: translateY(10px);
        transition: 1.3s ease;
      ">
        🌹 Will you be my Valentine? 💌
      </div>

      <div style="margin-top:14px; font-size:26px;">
        ❤️💍💞🌹
      </div>
    `;

    resultArea.style.background = "rgba(0, 0, 0, 0.20)";

    setTimeout(() => {
      const q = document.getElementById("valentineQ");
      if (q) {
        q.style.opacity = "1";
        q.style.transform = "translateY(0px)";
      }
      questionShown = true;
    }, 600);

  } else {
    isOwner = false;
    lockButtons();

    resultArea.innerHTML = `
      ❌ You Are Not A Owner 😁 <br><br>
      <span style="font-size:16px; font-weight:500;">
        Better luck in next life 😁
      </span>
    `;

    resultArea.style.background = "rgba(0, 0, 0, 0.25)";
  }
});

// =============================
// Funny message
// =============================
function occupiedMessage() {
  resultArea.innerHTML = `
    😁 Sorry lady... place is Occupied with Queen 👑💖
  `;
  resultArea.style.background = "rgba(0, 0, 0, 0.25)";
}

// =============================
// YES click (kiss sound + pink mode + fireworks + confetti + gift after 7 sec)
// =============================
yesBtn.addEventListener("click", () => {
  if (!isOwner) {
    occupiedMessage();
    return;
  }

  // Kiss sound
  kissSound.volume = 0.8;
  kissSound.currentTime = 0;
  kissSound.play();

  // Pink mode
  card.classList.add("pink-mode");

  // Confetti + fireworks
  heartConfettiBlast();
  startFireworks();

  resultArea.innerHTML = `
    💞 Awww YESSS!! 💞 <br><br>
    <span style="font-size:18px; font-weight:600;">
      You just made my heart go CRAZY 😍💖💍
    </span>
    <div style="margin-top:12px; font-size:28px;">
      💗💗💗💗💗
    </div>
    <div style="margin-top:10px; font-size:18px;">
      Wait... I have something for you 🎁
    </div>
  `;

  resultArea.style.background = "rgba(0, 0, 0, 0.16)";

  // 🎁 Gift appears after 7 seconds
  giftBox.style.display = "none";

  setTimeout(() => {
    if (isOwner) {
      giftBox.style.display = "block";
    }
  }, 7000);
});

// =============================
// NO click
// =============================
noBtn.addEventListener("click", () => {
  if (!isOwner) {
    occupiedMessage();
    return;
  }

  resultArea.innerHTML = `
    😭 NO?? <br><br>
    <span style="font-size:17px; font-weight:600;">
      My heart is crying... but I still love you 💔💖
    </span>
  `;

  resultArea.style.background = "rgba(0, 0, 0, 0.22)";
});

// =============================
// CRAZY NO BUTTON EFFECT 😈
// =============================
function moveNoButton() {
  if (!isOwner) return;
  if (!questionShown) return;

  const randomX = Math.random() * 260 - 130;
  const randomY = Math.random() * 170 - 85;

  noBtn.style.transform = `translate(${randomX}px, ${randomY}px)`;
}

noBtn.addEventListener("mouseenter", moveNoButton);

noBtn.addEventListener("mousedown", (e) => {
  e.preventDefault();
  moveNoButton();
});

// =============================
// 🎁 Gift Box Click -> Explosion + Popup
// =============================
giftBox.addEventListener("click", () => {
  giftHeartExplosion();
  popup.style.display = "flex";
});

// Close popup
closePopup.addEventListener("click", () => {
  popup.style.display = "none";
});

// Click outside popup closes it
popup.addEventListener("click", (e) => {
  if (e.target === popup) popup.style.display = "none";
});
