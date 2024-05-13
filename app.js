// Create audio elements for sounds
const bells = new Audio('./sounds/bell.wav');
const clicks = new Audio('./sounds/click.wav');

// Select buttons from the DOM
const startBtn = document.querySelector('.btn-start');
const resetBtn = document.querySelector('.btn-reset');
const pauseBtn = document.querySelector('.btn-pause');
const resumeBtn = document.querySelector('.btn-resume');

// Initialize variables
let myInterval; // Variable to hold the interval
let totalSeconds; // Variable to hold the total seconds remaining
let initialSessionAmount = 25; // Initial session time in minutes
let initialTotalSeconds = initialSessionAmount * 60; // Convert initial session time to seconds
let paused = false; // Flag to indicate if timer is paused

// Function to reset the timer
const resetTimer = () => {
  clearInterval(myInterval); // Stop the interval
  totalSeconds = initialTotalSeconds; // Reset totalSeconds to initial value
  updateTimerDisplay(); // Update the timer display
  showButton(startBtn); // Show the start button
  hideButton(resumeBtn); // Hide the resume button
  hideButton(resetBtn); // Hide the reset button
  paused = false; // Reset paused flag
};

// Function to pause or resume the timer
const pauseResumeTimer = () => {
  if (!paused) {
    clearInterval(myInterval); // Stop the interval
    showButton(resumeBtn); // Show the resume button
    showButton(resetBtn); // Show the reset button
    hideButton(pauseBtn); // Hide the pause button
    paused = true; // Set paused flag to true
  } else {
    myInterval = setInterval(updateSeconds, 1000); // Resume the interval
    hideButton(resumeBtn); // Hide the resume button
    hideButton(resetBtn); // Hide the reset button
    showButton(pauseBtn); // Show the pause button
    paused = false; // Set paused flag to false
  }
};

// Function to update the timer display
const updateTimerDisplay = () => {
  const minuteDiv = document.querySelector('.minutes');
  const secondDiv = document.querySelector('.seconds');

  let minutesLeft = Math.floor(totalSeconds / 60);
  let secondsLeft = totalSeconds % 60;

  if (secondsLeft < 10) {
    secondDiv.textContent = '0' + secondsLeft;
  } else {
    secondDiv.textContent = secondsLeft;
  }
  minuteDiv.textContent = `${minutesLeft}`;
};

// Function to start the timer
const appTimer = () => {
  bells.play(); // Play the bell sound
  totalSeconds = initialTotalSeconds; // Use initialTotalSeconds for the timer
  myInterval = setInterval(updateSeconds, 1000); // Start the interval
  hideButton(startBtn); // Hide the start button
  showButton(pauseBtn); // Show the pause button
};

// Function to update the seconds remaining in the timer
const updateSeconds = () => {
  totalSeconds--;

  updateTimerDisplay();

  if (totalSeconds === 0) {
    bells.play(); // Play the bell sound
    clearInterval(myInterval); // Stop the interval
    showButton(startBtn); // Show the start button
    hideButton(pauseBtn); // Hide the pause button
    hideButton(resumeBtn); // Hide the resume button
    showButton(resetBtn); // Show the reset button
  }
};

// Function to hide a button
const hideButton = (button) => {
  button.classList.add('hidden');
};

// Function to show a button
const showButton = (button) => {
  button.classList.remove('hidden');
};

// Event listeners for buttons
startBtn.addEventListener('click', () => {
  clicks.play(); // Play the click sound
  appTimer(); // Start the timer
});

resetBtn.addEventListener('click', () => {
  clicks.play(); // Play the click sound
  resetTimer(); // Reset the timer
});

pauseBtn.addEventListener('click', () => {
  clicks.play(); // Play the click sound
  pauseResumeTimer(); // Pause or resume the timer
});

resumeBtn.addEventListener('click', () => {
  clicks.play(); // Play the click sound
  pauseResumeTimer(); // Pause or resume the timer
});

// Initial setup
hideButton(pauseBtn); // Hide the pause button
hideButton(resumeBtn); // Hide the resume button
hideButton(resetBtn); // Hide the reset button
