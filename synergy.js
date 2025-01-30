function checkLoan() {
    let loanAmount = parseFloat(document.getElementById("loanAmount").value.replace(/,/g, ''));
    let lastDeposit = parseFloat(document.getElementById("lastDeposit").value.replace(/,/g, ''));
    let creditScore = parseInt(document.getElementById("creditScore").value);
    let businessDuration = parseInt(document.getElementById("businessDuration").value);
    let industry = document.getElementById("industry").value.trim().toLowerCase();
    let bankruptcy = document.getElementById("bankruptcy").value;
    let message = document.getElementById("message");
    let dialNumber = document.getElementById("dialNumber");

    // Clear previous messages
    message.textContent = "";
    dialNumber.textContent = "";

    // Industries not allowed
    let disallowedIndustries = [
        "trucking", "transportation", "logistics", "hauling", "towing", "law firm",
        "real estate", "funding firm", "porn industry", "gambling", "casino", "capital", "lending"
    ];

    // Validation Rules
    if (lastDeposit < 15000) {
        message.textContent = "Error: Last month deposit must be at least $15,000.";
        return;
    }

    if (creditScore < 500) {
        message.textContent = "Error: Credit score must be at least 500.";
        return;
    }


    if (disallowedIndustries.includes(industry)) {
        message.textContent = "Error: Industry is not eligible for a loan.";
        return;
    }

    if (bankruptcy === "Y") {
        message.textContent = "Error: Defaulted/Bankruptcy applicants are not eligible.";
        return;
    }

    // Loan Limit Calculation (4x last month deposit)
    let loanLimit = lastDeposit * 4;

    // Display loan limit
    message.textContent = "Can Only Loan: $" + loanLimit.toLocaleString();

    // Phone Number Rules
    if (lastDeposit >= 20000 && creditScore >= 500 && creditScore <= 679) {
        dialNumber.textContent = "Copy and Dial this line: 2076804189";
    } 
    else if (lastDeposit >= 15000 && lastDeposit < 19999 && creditScore >= 500 && creditScore <= 679) {
        dialNumber.textContent = "Copy and Dial this line: 2074817718";
    } 
    else if (lastDeposit >= 15000 && creditScore >= 680) {
        dialNumber.textContent = "Copy and Dial this line: 2074817511";
    }

    // Apply opacity transition (only for contact form)
    document.getElementById("contactForm").style.opacity = 1;
    document.getElementById("contactForm").style.visibility = "visible";
}

function formatDuration() {
let input = document.getElementById("businessDuration").value;
let display = document.getElementById("businessDurationDisplay");

// Match the pattern for months and years input (e.g., 1yr 2months or 24 months)
let regex = /(\d+)\s*(yr|year|months?)\s*(\d+)?\s*(month|months)?/i;

let match = input.match(regex);

if (match) {
    // If it's in the format of years and months (e.g., 1yr 2months)
    let years = parseInt(match[1], 10);
    let months = match[3] ? parseInt(match[3], 10) : 0;

    let totalMonths = (years * 12) + months;
    display.textContent = totalMonths + " months"; // Show total months
} else {
    // If it's just a number, convert to months
    let numericValue = parseInt(input, 10);

    if (!isNaN(numericValue)) {
        if (numericValue === 1) {
            display.textContent = "12 months"; // 1 year
        } else if (numericValue > 1) {
            display.textContent = numericValue * 12 + " months"; // Convert to months
        }
    } else {
        // If it's not a valid input (e.g., string without numbers)
        display.textContent = "Invalid input";
    }
}
}



function submitContactForm() {
    let state = document.getElementById("state").value;
    let contactName = document.getElementById("contactName").value;
    let companyName = document.getElementById("companyName").value;
    let phoneNumber = document.getElementById("phoneNumber").value;

    let contactMessage = document.getElementById("contactMessage");

    // You can add validation for contact information here, if needed
    if (!state || !contactName || !companyName || !phoneNumber) {
        contactMessage.textContent = "Error: All contact fields must be filled.";
        contactMessage.style.color = "red";
        return;
    }

    contactMessage.textContent = "Contact Information Submitted Successfully!";
    contactMessage.style.color = "green";
}

function formatNumber(input) {
    let value = input.value.replace(/,/g, ''); // Remove commas
    let formattedValue = value.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    input.value = formattedValue;
}

function darkMode() {
    let element = document.body;
    element.classList.toggle("dark-mode");
}

const stateAbbreviations = {
    "Alabama": "AL", "Alaska": "AK", "Arizona": "AZ", "Arkansas": "AR", "California": "CA", "Colorado": "CO", 
    "Connecticut": "CT", "Delaware": "DE", "Florida": "FL", "Georgia": "GA", "Hawaii": "HI", "Idaho": "ID", 
    "Illinois": "IL", "Indiana": "IN", "Iowa": "IA", "Kansas": "KS", "Kentucky": "KY", "Louisiana": "LA", 
    "Maine": "ME", "Maryland": "MD", "Massachusetts": "MA", "Michigan": "MI", "Minnesota": "MN", "Mississippi": "MS", 
    "Missouri": "MO", "Montana": "MT", "Nebraska": "NE", "Nevada": "NV", "New Hampshire": "NH", "New Jersey": "NJ", 
    "New Mexico": "NM", "New York": "NY", "North Carolina": "NC", "North Dakota": "ND", "Ohio": "OH", 
    "Oklahoma": "OK", "Oregon": "OR", "Pennsylvania": "PA", "Rhode Island": "RI", "South Carolina": "SC", 
    "South Dakota": "SD", "Tennessee": "TN", "Texas": "TX", "Utah": "UT", "Vermont": "VT", "Virginia": "VA", 
    "Washington": "WA", "West Virginia": "WV", "Wisconsin": "WI", "Wyoming": "WY", "District of Columbia": "DC", 
    "American Samoa": "AS", "Guam": "GU", "Puerto Rico": "PR", "Virgin Islands": "VI", "Northern Mariana Islands": "MP", 
    "Trust Territories": "TT"
};

function convertState() {
    let stateInput = document.getElementById("state");
    let stateValue = stateInput.value.trim();

    // Check if the entered value matches a state name and convert to abbreviation
    if (stateAbbreviations[stateValue]) {
        stateInput.value = stateAbbreviations[stateValue];
    }
}

    // Capitalize first letter of each word in name
    function formatName(inputId) {
    let nameInput = document.getElementById(inputId);
    let value = nameInput.value.trim();

    // Capitalize each word and ensure correct spacing
    value = value.replace(/\s+/g, ' ').split(' ').map(word => {
        // Capitalize each word, and ensure abbreviations stay uppercase
        if (['llc', 'abc', 'inc', 'co', 'ltd'].includes(word.toLowerCase())) {
            return word.toUpperCase();
        }
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    }).join(' ');

    nameInput.value = value;
}

// Capitalize first letter of each word in company name and handle spaces
function formatCompanyName(inputId) {
    let companyInput = document.getElementById(inputId);
    let value = companyInput.value.trim();

    // Capitalize each word and ensure correct spacing
    value = value.replace(/\s+/g, ' ').split(' ').map(word => {
        // Capitalize each word, and ensure abbreviations stay uppercase
        if (['llc', 'abc', 'inc', 'co', 'ltd'].includes(word.toLowerCase())) {
            return word.toUpperCase();
        }
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    }).join(' ');

    companyInput.value = value;
}

// Format phone number to remove +1 and spaces
function formatPhoneNumber() {
    let phoneInput = document.getElementById("phoneNumber");
    let phoneValue = phoneInput.value.trim();

    // Remove any non-numeric characters and format as (xxx) xxx-xxxx
    phoneValue = phoneValue.replace(/\D/g, ""); // Remove all non-numeric characters
    if (phoneValue.startsWith("1")) {
        phoneValue = phoneValue.substring(1); // Remove the +1
    }

    // Format the phone number (xxx) xxx-xxxx
    if (phoneValue.length === 10) {
        phoneValue = `(${phoneValue.substring(0, 3)}) ${phoneValue.substring(3, 6)}-${phoneValue.substring(6)}`;
    }

    phoneInput.value = phoneValue;
}

function submitContactForm() {
    let state = document.getElementById("state").value;
    let contactName = document.getElementById("contactName").value;
    let companyName = document.getElementById("companyName").value;
    let phoneNumber = document.getElementById("phoneNumber").value;

    let contactMessage = document.getElementById("contactMessage");

    // You can add validation for contact information here, if needed
    if (!state || !contactName || !companyName || !phoneNumber) {
        contactMessage.textContent = "Error: All contact fields must be filled.";
        contactMessage.style.color = "red";
        return;
    }

    contactMessage.textContent = "Contact Information Submitted Successfully!";
    contactMessage.style.color = "green";
}