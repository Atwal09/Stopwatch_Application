document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const display = document.getElementById('display');
    const startBtn = document.getElementById('startBtn');
    const pauseBtn = document.getElementById('pauseBtn');
    const resetBtn = document.getElementById('resetBtn');
    const lapBtn = document.getElementById('lapBtn');
    const lapsList = document.getElementById('lapsList');
    
    // Stopwatch variables
    let startTime;
    let elapsedTime = 0;
    let timerInterval;
    let isRunning = false;
    let lapCount = 0;
    
    // Format time (hh:mm:ss.ms)
    function formatTime(time) {
        const date = new Date(time);
        const hours = date.getUTCHours().toString().padStart(2, '0');
        const minutes = date.getUTCMinutes().toString().padStart(2, '0');
        const seconds = date.getUTCSeconds().toString().padStart(2, '0');
        const milliseconds = Math.floor(date.getUTCMilliseconds() / 10).toString().padStart(2, '0');
        
        return `${hours}:${minutes}:${seconds}.${milliseconds}`;
    }
    
    // Update the display
    function updateDisplay() {
        display.textContent = formatTime(elapsedTime);
    }
    
    // Start the stopwatch
    function start() {
        if (!isRunning) {
            startTime = Date.now() - elapsedTime;
            timerInterval = setInterval(function() {
                elapsedTime = Date.now() - startTime;
                updateDisplay();
            }, 10);
            isRunning = true;
            
            // Update button states
            startBtn.disabled = true;
            pauseBtn.disabled = false;
            resetBtn.disabled = false;
            lapBtn.disabled = false;
        }
    }
    
    // Pause the stopwatch
    function pause() {
        if (isRunning) {
            clearInterval(timerInterval);
            isRunning = false;
            
            // Update button states
            startBtn.disabled = false;
            pauseBtn.disabled = true;
        }
    }
    
    // Reset the stopwatch
    function reset() {
        clearInterval(timerInterval);
        isRunning = false;
        elapsedTime = 0;
        lapCount = 0;
        updateDisplay();
        
        // Clear laps list
        lapsList.innerHTML = '';
        
        // Update button states
        startBtn.disabled = false;
        pauseBtn.disabled = true;
        resetBtn.disabled = true;
        lapBtn.disabled = true;
    }
    
    // Record a lap time
    function lap() {
        if (isRunning) {
            lapCount++;
            const lapTime = elapsedTime;
            const lapItem = document.createElement('div');
            lapItem.className = 'lap-item';
            lapItem.innerHTML = `
                <span class="lap-number">Lap ${lapCount}</span>
                <span class="lap-time">${formatTime(lapTime)}</span>
            `;
            lapsList.prepend(lapItem);
        }
    }
    
    // Event listeners
    startBtn.addEventListener('click', start);
    pauseBtn.addEventListener('click', pause);
    resetBtn.addEventListener('click', reset);
    lapBtn.addEventListener('click', lap);
    
    // Initialize display
    updateDisplay();
});
