let interval;

function startCountdown() {
    // Clear any existing interval
    if (interval) {
        clearInterval(interval);
    }

    // Get the user-provided end date
    const endDateInput = document.getElementById("end-date-input").value;
    if (!endDateInput) {
        alert("Please enter a valid end date and time.");
        return;
    }
    const endDate = new Date(endDateInput).getTime();
    const startDate = new Date().getTime();

    // Check if the input date is in the future
    if (endDate <= startDate) {
        alert("Please select a future date and time.");
        return;
    }

    // Start the countdown
    interval = setInterval(function updateTimer() {
        const currentDate = new Date().getTime();
        const coveredDistance = currentDate - startDate;
        const pendingDistance = endDate - currentDate;

        // Calculate days, hrs, mins, secs
        const days = Math.floor(pendingDistance / (24 * 60 * 60 * 1000));
        const hrs = Math.floor((pendingDistance % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));
        const mins = Math.floor((pendingDistance % (60 * 60 * 1000)) / (60 * 1000));
        const secs = Math.floor((pendingDistance % (60 * 1000)) / 1000);

        document.getElementById("days").innerHTML = days;
        document.getElementById("hours").innerHTML = hrs;
        document.getElementById("minutes").innerHTML = mins;
        document.getElementById("seconds").innerHTML = secs;

        // Calculate progress bar width
        const totalDistance = endDate - startDate;
        const percentageDistance = (coveredDistance / totalDistance) * 100;
        document.getElementById("progress-bar").style.width = percentageDistance + "%";

        // If the countdown is over
        if (pendingDistance < 0) {
            clearInterval(interval);
            document.getElementById("countdown").innerHTML = "EXPIRED";
            document.getElementById("countdown").style.color = "black";
            document.getElementById("countdown").style.fontSize = "large";
            document.getElementById("progress-bar").style.width = "100%";
        }
    }, 1000);
}
