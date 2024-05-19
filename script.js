let [milliseconds, seconds, minutes, hours] = [0, 0, 0, 0];
let timeRef = document.querySelector(".timer-display");
let int = null;
let lapCount = 0; 

document.getElementById("start-timer").addEventListener("click", () => {
    if (int !== null) {
        clearInterval(int);
    }
    int = setInterval(displayTimer, 10);
});

document.getElementById("pause-timer").addEventListener("click", () => {
    clearInterval(int);
});

document.getElementById("reset-timer").addEventListener("click", () => {
    clearInterval(int);
    [milliseconds, seconds, minutes, hours] = [0, 0, 0, 0];
    timeRef.innerHTML = "00 : 00 : 00 : 000";
    document.querySelector(".laps").innerHTML = "";
    lapCount = 0;
});

document.getElementById("lap-timer").addEventListener("click", () => {
    recordLap();
});

function recordLap() {
    lapCount++;
    const lapTime = formatTime(hours, minutes, seconds, milliseconds);
    const lapDiv = document.createElement("div");
    lapDiv.textContent = `Lap ${lapCount} - ${lapTime}`;
    document.querySelector(".laps").appendChild(lapDiv);
}

function displayTimer() {
    milliseconds += 10;
    if (milliseconds >= 1000) {
        milliseconds = 0;
        seconds++;
        if(seconds >= 60) {
            seconds = 0;
            minutes++;
            if(minutes >= 60) {
                minutes = 0;
                hours++;
            }
        }
    }

    timeRef.innerHTML = formatTime(hours, minutes, seconds, milliseconds);
}

function formatTime(h, m, s, ms) {
    let formattedH = h < 10 ? "0" + h : h;
    let formattedM = m < 10 ? "0" + m : m;
    let formattedS = s < 10 ? "0" + s : s;
    let formattedMS = ms < 10 ? "00" + ms : (ms < 100 ? "0" + ms : ms);
    return `${formattedH} : ${formattedM} : ${formattedS} : ${formattedMS}`;
}
