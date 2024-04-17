const mantraSelect = document.getElementById('mantraSelect');
const timesInput = document.getElementById('times');
const startBtn = document.getElementById('startBtn');
const countBtn = document.getElementById('countBtn');
const progressDisplay = document.getElementById('progress');
const totalChantsDisplay = document.getElementById('totalChants');
const selectedMantraDisplay = document.getElementById('selectedMantra');
const visitorCountDisplay = document.getElementById('visitorCount');

// Function to toggle the visibility of the visitor count
function toggleVisitorCount() {
  if (visitorCountDisplay.style.display === 'none') {
    visitorCountDisplay.style.display = 'inline';
  } else {
    visitorCountDisplay.style.display = 'none';
  }
}

// Function to increment and display the visitor count
function incrementVisitorCount() {
  if (!localStorage.getItem('totalVisits')) {
    localStorage.setItem('totalVisits', '0');
  }

  let totalVisits = parseInt(localStorage.getItem('totalVisits'));
  totalVisits++;
  localStorage.setItem('totalVisits', totalVisits);

  // Update the displayed total visit count
  visitorCountDisplay.textContent = totalVisits;
}

// Call the function to increment and display the visitor count
incrementVisitorCount();

startBtn.addEventListener('click', () => {
  const selectedMantra = mantraSelect.value;
  const timesToChant = parseInt(timesInput.value);

  if (timesToChant <= 0 || isNaN(timesToChant)) {
    alert('Please enter a valid number of times to chant.');
    return;
  }

  startChanting(selectedMantra, timesToChant);
  startBtn.style.display = 'none'; // Hide the start button immediately
});

function startChanting(mantra, timesToChant) {
  countBtn.style.display = 'block';
  let totalChants = 0;
  let count = 0;
  let loopCount = 0;

  countBtn.addEventListener('click', () => {
    count++;
    if (count <= 108) {
      progressDisplay.textContent = count + '/' + 108;
    } else {
      count = 1; // Reset count for new loop
      loopCount++;
      totalChants = loopCount; // Update totalChants for each loop
      totalChantsDisplay.textContent = totalChants; // Update totalChants display
      if (loopCount === timesToChant) {
        alert('Chanting Completed!');
        resetUI();
      }
    }
  });

  selectedMantraDisplay.textContent = mantra;
  selectedMantraDisplay.style.fontSize = '24px';
  selectedMantraDisplay.style.fontWeight = 'bold';
}

function resetUI() {
  startBtn.style.display = 'block'; // Show the start button again
  countBtn.style.display = 'none';
  progressDisplay.textContent = '0/0'; // Reset progress display
}
