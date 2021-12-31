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

function handleRangeUpdate() {
  video[this.name] = this.value;

  //   console.log(this.value);
  //   console.log(this.name);
}

function handleProgress() {
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`;
}

function scrub(e) {
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
  //   console.log(e);
}

// Set up event listeners
video.addEventListener("click", togglePlay);
video.addEventListener("play", updateBtn);
video.addEventListener("pause", updateBtn);
video.addEventListener("timeupdate", handleProgress);
toggle.addEventListener("click", togglePlay);
skipBtns.forEach((button) => button.addEventListener("click", skip));
ranges.forEach((range) => range.addEventListener("click", handleRangeUpdate));
ranges.forEach((range) =>
  range.addEventListener("mousemove", handleRangeUpdate)
);

let mousedown = false;

progress.addEventListener("click", scrub);
// first check for mousedown - if true run scrub
progress.addEventListener("mousemove", (e) => mousedown && scrub(e));

progress.addEventListener("mousedown", () => (mousedown = true));
progress.addEventListener("mouseup", () => (mousedown = false));
