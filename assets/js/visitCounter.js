// Function to check if the visitor has visited before
function hasVisitedBefore() {
    // Check if a cookie named "visited" exists
    return document.cookie.split(';').some(cookie => cookie.trim().startsWith('visited='));
}

// Function to set a cookie indicating that the visitor has visited
function setVisitedCookie() {
    // Set a cookie named "visited" with a value of "true" that expires in 30 days
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + 30);
    document.cookie = `visited=true; expires=${expiryDate.toUTCString()}; path=/`;
}

// Function to get the visit count from the localStorage
function getVisitCount() {
    // Check if localStorage is supported
    if (typeof(Storage) !== "undefined") {
        // Retrieve visit count from localStorage or set it to 0 if it doesn't exist
        return localStorage.getItem("visitCount") || 0;
    } else {
        return 0; // localStorage not supported
    }
}

// Function to update visit count in localStorage
function updateVisitCount() {
    // Check if localStorage is supported
    if (typeof(Storage) !== "undefined") {
        // Retrieve visit count from localStorage or set it to 0 if it doesn't exist
        let visitCount = parseInt(localStorage.getItem("visitCount")) || 0;
        // Increment visit count by 1
        visitCount++;
        // Update localStorage with the new visit count
        localStorage.setItem("visitCount", visitCount);
    }
}

// Function to get today's visit count
function getTodaysVisitCount() {
    // Get the current date
    const today = new Date();
    // Get the visit count for today from localStorage
    const todaysVisitCount = localStorage.getItem(`visitCount-${today.toISOString().slice(0, 10)}`) || 0;
    return parseInt(todaysVisitCount);
}

// Function to update today's visit count
function updateTodaysVisitCount() {
    // Get the current date
    const today = new Date();
    // Get the visit count for today from localStorage or set it to 0 if it doesn't exist
    let todaysVisitCount = parseInt(localStorage.getItem(`visitCount-${today.toISOString().slice(0, 10)}`)) || 0;
    // Increment today's visit count by 1
    todaysVisitCount++;
    // Update localStorage with the new visit count for today
    localStorage.setItem(`visitCount-${today.toISOString().slice(0, 10)}`, todaysVisitCount);
}

// Function to get this week's visit count
function getThisWeeksVisitCount() {
    // Get the current date
    const today = new Date();
    // Get the day of the week (0 for Sunday, 1 for Monday, ..., 6 for Saturday)
    const dayOfWeek = today.getDay();
    // Calculate the start date of the week (Sunday)
    const startDate = new Date(today);
    startDate.setDate(today.getDate() - dayOfWeek);
    // Initialize total visit count for the week
    let totalVisitCount = 0;
    // Loop through each day of the week and add up the visit count for each day
    for (let i = 0; i <= dayOfWeek; i++) {
        const currentDate = new Date(startDate);
        currentDate.setDate(startDate.getDate() + i);
        const visitCount = localStorage.getItem(`visitCount-${currentDate.toISOString().slice(0, 10)}`) || 0;
        totalVisitCount += parseInt(visitCount);
    }
    return totalVisitCount;
}

// Function to get this month's visit count
function getThisMonthsVisitCount() {
    // Get the current date
    const today = new Date();
    // Get the current month and year
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();
    // Initialize total visit count for the month
    let totalVisitCount = 0;
    // Loop through each day of the month and add up the visit count for each day
    for (let day = 1; day <= 31; day++) {
        const currentDate = new Date(currentYear, currentMonth, day);
        // Check if the date is valid (e.g., February 31st is not a valid date)
        if (currentDate.getMonth() !== currentMonth) {
            break;
        }
        const visitCount = localStorage.getItem(`visitCount-${currentDate.toISOString().slice(0, 10)}`) || 0;
        totalVisitCount += parseInt(visitCount);
    }
    return totalVisitCount;
}

// Function to get lifetime total visit count
function getLifetimeTotalVisitCount() {
    // Initialize total visit count
    let totalVisitCount = 0;
    // Loop through localStorage keys and add up the visit count for each day
    for (let key in localStorage) {
        if (key.startsWith("visitCount-")) {
            totalVisitCount += parseInt(localStorage.getItem(key));
        }
    }
    return totalVisitCount;
}

// Update visit count and set visited cookie if the visitor has not visited before
if (!hasVisitedBefore()) {
    setVisitedCookie();
    updateVisitCount();
    updateTodaysVisitCount();
}

// Example usage:
console.log("Today's visit count:", getTodaysVisitCount());
console.log("This week's visit count:", getThisWeeksVisitCount());
console.log("This month's visit count:", getThisMonthsVisitCount());
console.log("Lifetime total visit count:", getLifetimeTotalVisitCount());
