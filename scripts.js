// Get our elements
const player = document.querySelector(".player");
const video = player.querySelector(".viewer");
const progress = player.querySelector(".progress");
const progressBar = player.querySelector(".progress__filled");
const toggle = player.querySelector(".toggle");
const skipBtns = player.querySelectorAll("[data-skip]");
const ranges = player.querySelectorAll(".player__slider");

// Build out functions

function togglePlay() {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
}

function updateBtn() {
  const icon = this.paused ? "▶" : "▌▌";
  toggle.innerHTML = icon;
}

function skip() {
  // convert string to number
  video.currentTime += parseFloat(this.dataset.skip);
}

// Set up event listeners
video.addEventListener("click", togglePlay);
video.addEventListener("play", updateBtn);
video.addEventListener("pause", updateBtn);
toggle.addEventListener("click", togglePlay);
skipBtns.forEach((button) => button.addEventListener("click", skip));
