<template>
  <div v-if="visible" class="preloader">
    <div ref="field" class="pixel-field"></div>
    <div ref="logo" class="logo">
      <div class="piece top"></div>
      <div class="piece right"></div>
      <div class="piece bottom"></div>
      <div class="piece dot"></div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const visible = ref(true);
const field = ref(null);
const logo = ref(null);

function buildField() {
  if (!field.value) return;
  field.value.innerHTML = "";

  const W = window.innerWidth;
  const H = window.innerHeight;
  const TARGET = Math.max(40, Math.min(72, Math.round(Math.min(W, H) / 14)));
  const cols = Math.max(8, Math.round(W / TARGET));
  const rows = Math.max(8, Math.round(H / TARGET));
  const cellW = W / cols;
  const cellH = H / rows;

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const d = document.createElement("div");
      d.className = "p";
      d.style.width = cellW + "px";
      d.style.height = cellH + "px";
      d.style.gridRow = r + 1;
      d.style.gridColumn = c + 1;

      if (Math.random() < 0.5) {
        const fromLeft = Math.random() < 0.5;
        d.style.transform = fromLeft
          ? `translateX(${-cellW}px)`
          : `translateX(${W + cellW}px)`;
      } else {
        const fromTop = Math.random() < 0.5;
        d.style.transform = fromTop
          ? `translateY(${-cellH}px)`
          : `translateY(${H + cellH}px)`;
      }

      field.value.appendChild(d);

      d.animate(
        [
          { opacity: 0, transform: d.style.transform },
          { opacity: 1, transform: "translate(0,0)" },
        ],
        {
          duration: 2500,
          delay: Math.random() * 500,
          easing: "cubic-bezier(.22,1,.36,1)",
          fill: "forwards",
        }
      );
    }
  }
}

onMounted(() => {
  buildField();

  setTimeout(() => {
    if (logo.value) logo.value.classList.add("cycle");
  }, 2500);

  setTimeout(() => {
    visible.value = false;
  }, 5000);

  let t;
  window.addEventListener("resize", () => {
    clearTimeout(t);
    t = setTimeout(buildField, 120);
  });
});
</script>

<!-- REMOVE scoped -->
<style>
:root {
  --brand: #4c2746;
  --ink: #ffffff;
  --bg: #ffffff;
}

.preloader {
  position: fixed;
  inset: 0;
  z-index: 9999;
  overflow: hidden;
  display: grid;
  place-items: center;
  background: var(--bg);
}
.pixel-field {
  position: absolute;
  inset: 0;
  overflow: hidden;
  display: grid;
}
.p {
  background: var(--brand);
  opacity: 0;
  will-change: transform, opacity;
}
.logo {
  position: relative;
  width: min(38vmin, 260px);
  aspect-ratio: 1/1;
  filter: drop-shadow(0 6px 16px rgba(0, 0, 0, 0.35));
}
.piece {
  position: absolute;
  background: var(--ink);
  opacity: 0;
  transform: scale(0.001);
}
:root {
  --u: 22%;
  --pad: 14%;
  --t: 22%;
}
.top {
  left: var(--pad);
  top: var(--pad);
  width: calc(3 * var(--u));
  height: var(--t);
  transform-origin: left center;
}
.right {
  left: calc(var(--pad) + 3 * var(--u) - var(--t));
  top: var(--pad);
  width: var(--t);
  height: calc(3 * var(--u));
  transform-origin: center top;
}
.bottom {
  left: calc(var(--pad) + 1 * var(--u));
  top: calc(var(--pad) + 3 * var(--u) - var(--t));
  width: calc(2 * var(--u));
  height: var(--t);
  transform-origin: right center;
}
.dot {
  left: var(--pad);
  top: calc(var(--pad) + 3 * var(--u));
  width: var(--t);
  height: var(--t);
  transform-origin: center;
}
.cycle .top {
  animation: revealX 0.42s cubic-bezier(.2,.9,.2,1) 0.05s forwards;
}
.cycle .right {
  animation: revealY 0.45s cubic-bezier(.2,.9,.2,1) 0.32s forwards;
}
.cycle .bottom {
  animation: revealX 0.38s cubic-bezier(.2,.9,.2,1) 0.62s forwards;
}
.cycle .dot {
  animation: popStay 0.34s cubic-bezier(.2,.9,.2,1) 0.92s forwards;
}
@keyframes revealX {
  from { transform: scaleX(0.001); opacity: 1; }
  to { transform: scaleX(1); opacity: 1; }
}
@keyframes revealY {
  from { transform: scaleY(0.001); opacity: 1; }
  to { transform: scaleY(1); opacity: 1; }
}
@keyframes popStay {
  0% { transform: scale(.15); opacity: 0; }
  70% { transform: scale(1.08); opacity: 1; }
  100% { transform: scale(1); opacity: 1; }
}
</style>
