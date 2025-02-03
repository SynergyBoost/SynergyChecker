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

const areaCodeToStateTimeZone = {
    "201": { state: "New Jersey", timeZone: "EST" },  
    "202": { state: "District of Columbia", timeZone: "EST" },  
    "203": { state: "Connecticut", timeZone: "EST" },  
    "205": { state: "Alabama", timeZone: "CST" },  
    "206": { state: "Washington", timeZone: "PST" },  
    "207": { state: "Maine", timeZone: "EST" },  
    "208": { state: "Idaho", timeZone: "MST" },  
    "209": { state: "California", timeZone: "PST" },  
    "210": { state: "Texas", timeZone: "CST" },  
    "212": { state: "New York", timeZone: "EST" },  
    "213": { state: "California", timeZone: "PST" },  
    "214": { state: "Texas", timeZone: "CST" },  
    "215": { state: "Pennsylvania", timeZone: "EST" },  
    "216": { state: "Ohio", timeZone: "EST" },  
    "217": { state: "Illinois", timeZone: "CST" },  
    "218": { state: "Minnesota", timeZone: "CST" },  
    "219": { state: "Indiana", timeZone: "CST" },  
    "220": { state: "Ohio", timeZone: "EST" },  
    "223": { state: "Pennsylvania", timeZone: "EST" },  
    "224": { state: "Illinois", timeZone: "CST" },  
    "225": { state: "Louisiana", timeZone: "CST" },  
    "227": { state: "Maryland", timeZone: "EST" },  
    "228": { state: "Mississippi", timeZone: "CST" },  
    "229": { state: "Georgia", timeZone: "EST" },  
    "231": { state: "Michigan", timeZone: "EST" },  
    "234": { state: "Ohio", timeZone: "EST" },  
    "235": { state: "Missouri", timeZone: "CST" },  
    "239": { state: "Florida", timeZone: "EST" },  
    "240": { state: "Maryland", timeZone: "EST" },  
    "248": { state: "Michigan", timeZone: "EST" },  
    "251": { state: "Alabama", timeZone: "CST" },  
    "252": { state: "North Carolina", timeZone: "EST" },  
    "253": { state: "Washington", timeZone: "PST" },  
    "254": { state: "Texas", timeZone: "CST" },  
    "256": { state: "Alabama", timeZone: "CST" },  
    "260": { state: "Indiana", timeZone: "EST" },  
    "262": { state: "Wisconsin", timeZone: "CST" },  
    "267": { state: "Pennsylvania", timeZone: "EST" },  
    "269": { state: "Michigan", timeZone: "EST" },  
    "270": { state: "Kentucky", timeZone: "CST" },  
    "272": { state: "Pennsylvania", timeZone: "EST" },  
    "274": { state: "Wisconsin", timeZone: "CST" },  
    "276": { state: "Virginia", timeZone: "EST" },  
    "279": { state: "California", timeZone: "PST" },  
    "281": { state: "Texas", timeZone: "CST" },  
    "301": { state: "Maryland", timeZone: "EST" },  
    "302": { state: "Delaware", timeZone: "EST" },  
    "303": { state: "Colorado", timeZone: "MST" },  
    "304": { state: "West Virginia", timeZone: "EST" },  
    "305": { state: "Florida", timeZone: "EST" },  
    "307": { state: "Wyoming", timeZone: "MST" },  
    "308": { state: "Nebraska", timeZone: "CST" },  
    "309": { state: "Illinois", timeZone: "CST" },  
    "310": { state: "California", timeZone: "PST" },  
    "312": { state: "Illinois", timeZone: "CST" },  
    "313": { state: "Michigan", timeZone: "EST" },  
    "314": { state: "Missouri", timeZone: "CST" },  
    "315": { state: "New York", timeZone: "EST" },  
    "316": { state: "Kansas", timeZone: "CST" },  
    "317": { state: "Indiana", timeZone: "EST" },  
    "318": { state: "Louisiana", timeZone: "CST" },  
    "319": { state: "Iowa", timeZone: "CST" },  
    "320": { state: "Minnesota", timeZone: "CST" },  
    "321": { state: "Florida", timeZone: "EST" },  
    "323": { state: "California", timeZone: "PST" },  
    "324": { state: "Florida", timeZone: "EST" },  
    "325": { state: "Texas", timeZone: "CST" },  
    "326": { state: "Ohio", timeZone: "EST" },  
    "327": { state: "Arkansas", timeZone: "CST" },  
    "329": { state: "New York", timeZone: "EST" },  
    "330": { state: "Ohio", timeZone: "EST" },  
    "331": { state: "Illinois", timeZone: "CST" },  
    "332": { state: "New York", timeZone: "EST" },  
    "334": { state: "Alabama", timeZone: "CST" },  
    "336": { state: "North Carolina", timeZone: "EST" },  
    "337": { state: "Louisiana", timeZone: "CST" },  
    "339": { state: "Massachusetts", timeZone: "EST" },  
    "341": { state: "California", timeZone: "PST" },  
    "346": { state: "Texas", timeZone: "CST" },  
    "347": { state: "New York", timeZone: "EST" },  
    "350": { state: "California", timeZone: "PST" },  
    "351": { state: "Massachusetts", timeZone: "EST" },  
    "352": { state: "Florida", timeZone: "EST" },  
    "353": { state: "Wisconsin", timeZone: "CST" },  
    "360": { state: "Washington", timeZone: "PST" },  
    "361": { state: "Texas", timeZone: "CST" },  
    "363": { state: "New York", timeZone: "EST" },  
    "364": { state: "Kentucky", timeZone: "CST" },  
    "369": { state: "California", timeZone: "PST" },  
    "380": { state: "Ohio", timeZone: "EST" },  
    "385": { state: "Utah", timeZone: "MST" },  
    "386": { state: "Florida", timeZone: "EST" },  
    "401": { state: "Rhode Island", timeZone: "EST" },  
    "402": { state: "Nebraska", timeZone: "CST" },  
    "404": { state: "Georgia", timeZone: "EST" },  
    "405": { state: "Oklahoma", timeZone: "CST" },  
    "406": { state: "Montana", timeZone: "MST" },  
    "407": { state: "Florida", timeZone: "EST" },  
    "408": { state: "California", timeZone: "PST" },  
    "409": { state: "Texas", timeZone: "CST" },  
    "410": { state: "Maryland", timeZone: "EST" },  
    "412": { state: "Pennsylvania", timeZone: "EST" },  
    "413": { state: "Massachusetts", timeZone: "EST" },  
    "414": { state: "Wisconsin", timeZone: "CST" },  
    "415": { state: "California", timeZone: "PST" }, 
    "417": { state: "Missouri", timeZone: "CST" },  
    "419": { state: "Ohio", timeZone: "EST" },  
    "423": { state: "Tennessee", timeZone: "EST" },  
    "424": { state: "California", timeZone: "PST" },  
    "425": { state: "Washington", timeZone: "PST" },  
    "430": { state: "Texas", timeZone: "CST" },  
    "432": { state: "Texas", timeZone: "CST" },  
    "434": { state: "Virginia", timeZone: "EST" },  
    "435": { state: "Utah", timeZone: "MST" },  
    "436": { state: "Ohio", timeZone: "EST" },  
    "440": { state: "Ohio", timeZone: "EST" },  
    "442": { state: "California", timeZone: "PST" },  
    "443": { state: "Maryland", timeZone: "EST" },  
    "445": { state: "Pennsylvania", timeZone: "EST" },  
    "447": { state: "Illinois", timeZone: "CST" },  
    "448": { state: "Florida", timeZone: "CST" },  
    "456": { state: "No Data", timeZone: "-" },  
    "458": { state: "Oregon", timeZone: "PST" },  
    "463": { state: "Indiana", timeZone: "EST" },  
    "464": { state: "Illinois", timeZone: "CST" },  
    "469": { state: "Texas", timeZone: "CST" },  
    "470": { state: "Georgia", timeZone: "EST" },  
    "472": { state: "North Carolina", timeZone: "EST" },  
    "475": { state: "Connecticut", timeZone: "EST" },  
    "478": { state: "Georgia", timeZone: "EST" },  
    "479": { state: "Arkansas", timeZone: "CST" },  
    "480": { state: "Arizona", timeZone: "MST" },  
    "484": { state: "Pennsylvania", timeZone: "EST" },  
    "500": { state: "No Data", timeZone: "-" },  
    "501": { state: "Arkansas", timeZone: "CST" },  
    "502": { state: "Kentucky", timeZone: "EST" },  
    "503": { state: "Oregon", timeZone: "PST" },  
    "504": { state: "Louisiana", timeZone: "CST" },  
    "505": { state: "New Mexico", timeZone: "MST" },  
    "507": { state: "Minnesota", timeZone: "CST" },  
    "508": { state: "Massachusetts", timeZone: "EST" },  
    "509": { state: "Washington", timeZone: "PST" },  
    "510": { state: "California", timeZone: "PST" },  
    "512": { state: "Texas", timeZone: "CST" },  
    "513": { state: "Ohio", timeZone: "EST" },  
    "515": { state: "Iowa", timeZone: "CST" },  
    "516": { state: "New York", timeZone: "EST" },  
    "517": { state: "Michigan", timeZone: "EST" },  
    "518": { state: "New York", timeZone: "EST" },  
    "520": { state: "Arizona", timeZone: "MST" },  
    "521": { state: "No Data", timeZone: "-" },  
    "522": { state: "No Data", timeZone: "-" },  
    "523": { state: "No Data", timeZone: "-" },  
    "524": { state: "No Data", timeZone: "-" },  
    "528": { state: "No Data", timeZone: "-" },  
    "529": { state: "No Data", timeZone: "-" },  
    "530": { state: "California", timeZone: "PST" },  
    "531": { state: "Nebraska", timeZone: "CST" },  
    "533": { state: "No Data", timeZone: "-" },  
    "534": { state: "Wisconsin", timeZone: "CST" },  
    "539": { state: "Oklahoma", timeZone: "CST" },  
    "540": { state: "Virginia", timeZone: "EST" },  
    "541": { state: "Oregon", timeZone: "PST" },  
    "544": { state: "No Data", timeZone: "-" },  
    "551": { state: "New Jersey", timeZone: "EST" },  
    "557": { state: "Missouri", timeZone: "CST" },  
    "559": { state: "California", timeZone: "PST" },  
    "561": { state: "Florida", timeZone: "EST" },  
    "562": { state: "California", timeZone: "PST" },  
    "563": { state: "Iowa", timeZone: "CST" },  
    "564": { state: "Washington", timeZone: "PST" },  
    "566": { state: "No Data", timeZone: "-" },  
    "567": { state: "Ohio", timeZone: "EST" },  
    "570": { state: "Pennsylvania", timeZone: "EST" },  
    "571": { state: "Virginia", timeZone: "EST" },  
    "572": { state: "Oklahoma", timeZone: "CST" },  
    "573": { state: "Missouri", timeZone: "CST" },  
    "574": { state: "Indiana", timeZone: "EST" },  
    "575": { state: "New Mexico", timeZone: "MST" },  
    "580": { state: "Oklahoma", timeZone: "CST" },  
    "582": { state: "Pennsylvania", timeZone: "EST" },  
    "585": { state: "New York", timeZone: "EST" },  
    "586": { state: "Michigan", timeZone: "EST" },  
    "588": { state: "No Data", timeZone: "-" },  
    "601": { state: "Mississippi", timeZone: "CST" },  
    "602": { state: "Arizona", timeZone: "MST" },  
    "603": { state: "New Hampshire", timeZone: "EST" },  
    "605": { state: "South Dakota", timeZone: "CST" },  
    "606": { state: "Kentucky", timeZone: "EST" },  
    "607": { state: "New York", timeZone: "EST" },  
    "608": { state: "Wisconsin", timeZone: "CST" },  
    "609": { state: "New Jersey", timeZone: "EST" },  
    "610": { state: "Pennsylvania", timeZone: "EST" },  
    "611": { state: "No Data", timeZone: "-" },  
    "612": { state: "Minnesota", timeZone: "CST" },  
    "614": { state: "Ohio", timeZone: "EST" },  
    "615": { state: "Tennessee", timeZone: "CST" },  
    "616": { state: "Michigan", timeZone: "EST" },  
    "617": { state: "Massachusetts", timeZone: "EST" },  
    "618": { state: "Illinois", timeZone: "CST" },  
    "619": { state: "California", timeZone: "PST" },  
    "620": { state: "Kansas", timeZone: "CST" },  
    "623": { state: "Arizona", timeZone: "MST" },  
    "624": { state: "New York", timeZone: "EST" }, 
    "626": { state: "California", timeZone: "PST" },  
    "628": { state: "California", timeZone: "PST" },  
    "629": { state: "Tennessee", timeZone: "CST" },  
    "630": { state: "Illinois", timeZone: "CST" },  
    "631": { state: "New York", timeZone: "EST" },  
    "636": { state: "Missouri", timeZone: "CST" },  
    "640": { state: "New Jersey", timeZone: "EST" },  
    "641": { state: "Iowa", timeZone: "CST" },  
    "645": { state: "Florida", timeZone: "EST" },  
    "646": { state: "New York", timeZone: "EST" },  
    "650": { state: "California", timeZone: "PST" },  
    "651": { state: "Minnesota", timeZone: "CST" },  
    "656": { state: "Florida", timeZone: "EST" },  
    "657": { state: "California", timeZone: "PST" },  
    "659": { state: "Alabama", timeZone: "CST" },  
    "660": { state: "Missouri", timeZone: "CST" },  
    "661": { state: "California", timeZone: "PST" },  
    "662": { state: "Mississippi", timeZone: "CST" },  
    "667": { state: "Maryland", timeZone: "EST" },  
    "669": { state: "California", timeZone: "PST" },  
    "678": { state: "Georgia", timeZone: "EST" },  
    "680": { state: "New York", timeZone: "EST" },  
    "681": { state: "West Virginia", timeZone: "EST" },  
    "682": { state: "Texas", timeZone: "CST" },  
    "686": { state: "Virginia", timeZone: "EST" },  
    "689": { state: "Florida", timeZone: "EST" },  
    "700": { state: "No Data", timeZone: "-" },  
    "701": { state: "North Dakota", timeZone: "CST" },  
    "702": { state: "Nevada", timeZone: "PST" },  
    "703": { state: "Virginia", timeZone: "EST" },  
    "704": { state: "North Carolina", timeZone: "EST" },  
    "706": { state: "Georgia", timeZone: "EST" },  
    "707": { state: "California", timeZone: "PST" },  
    "708": { state: "Illinois", timeZone: "CST" },  
    "710": { state: "No Data", timeZone: "-" },  
    "712": { state: "Iowa", timeZone: "CST" },  
    "713": { state: "Texas", timeZone: "CST" },  
    "714": { state: "California", timeZone: "PST" },  
    "715": { state: "Wisconsin", timeZone: "CST" },  
    "716": { state: "New York", timeZone: "EST" },  
    "717": { state: "Pennsylvania", timeZone: "EST" },  
    "718": { state: "New York", timeZone: "EST" },  
    "719": { state: "Colorado", timeZone: "MST" },  
    "720": { state: "Colorado", timeZone: "MST" },  
    "724": { state: "Pennsylvania", timeZone: "EST" },  
    "725": { state: "Nevada", timeZone: "PST" },  
    "726": { state: "Texas", timeZone: "CST" },  
    "727": { state: "Florida", timeZone: "EST" },  
    "728": { state: "Florida", timeZone: "EST" },  
    "730": { state: "Illinois", timeZone: "CST" },  
    "731": { state: "Tennessee", timeZone: "CST" },  
    "732": { state: "New Jersey", timeZone: "EST" },  
    "734": { state: "Michigan", timeZone: "EST" },  
    "737": { state: "Texas", timeZone: "CST" },  
    "740": { state: "Ohio", timeZone: "EST" },  
    "743": { state: "North Carolina", timeZone: "EST" },  
    "747": { state: "California", timeZone: "PST" },  
    "754": { state: "Florida", timeZone: "EST" },  
    "757": { state: "Virginia", timeZone: "EST" },  
    "760": { state: "California", timeZone: "PST" },  
    "762": { state: "Georgia", timeZone: "EST" },  
    "763": { state: "Minnesota", timeZone: "CST" },  
    "765": { state: "Indiana", timeZone: "EST" },  
    "769": { state: "Mississippi", timeZone: "CST" },  
    "770": { state: "Georgia", timeZone: "EST" },  
    "771": { state: "District of Columbia", timeZone: "EST" },  
    "772": { state: "Florida", timeZone: "EST" },  
    "773": { state: "Illinois", timeZone: "CST" },  
    "774": { state: "Massachusetts", timeZone: "EST" },  
    "775": { state: "Nevada", timeZone: "PST" },  
    "779": { state: "Illinois", timeZone: "CST" },  
    "781": { state: "Massachusetts", timeZone: "EST" },  
    "785": { state: "Kansas", timeZone: "CST" },  
    "786": { state: "Florida", timeZone: "EST" },  
    "800": { state: "No Data", timeZone: "-" },  
    "801": { state: "Utah", timeZone: "MST" },  
    "802": { state: "Vermont", timeZone: "EST" },  
    "803": { state: "South Carolina", timeZone: "EST" },  
    "804": { state: "Virginia", timeZone: "EST" },  
    "805": { state: "California", timeZone: "PST" },  
    "806": { state: "Texas", timeZone: "CST" },  
    "808": { state: "Hawaii", timeZone: "HAST" },  
    "809": { state: "No Data", timeZone: "AST" },  
    "810": { state: "Michigan", timeZone: "EST" },  
    "812": { state: "Indiana", timeZone: "EST" },  
    "813": { state: "Florida", timeZone: "EST" },  
    "814": { state: "Pennsylvania", timeZone: "EST" },  
    "815": { state: "Illinois", timeZone: "CST" },  
    "816": { state: "Missouri", timeZone: "CST" },  
    "817": { state: "Texas", timeZone: "CST" },  
    "818": { state: "California", timeZone: "PST" },  
    "820": { state: "California", timeZone: "PST" },  
    "821": { state: "South Carolina", timeZone: "EST" },  
    "826": { state: "Virginia", timeZone: "EST" },  
    "828": { state: "North Carolina", timeZone: "EST" },  
    "830": { state: "Texas", timeZone: "CST" },  
    "831": { state: "California", timeZone: "PST" },  
    "832": { state: "Texas", timeZone: "CST" },  
    "833": { state: "No Data", timeZone: "-" },  
    "835": { state: "Pennsylvania", timeZone: "EST"},
    "838": { state: "New York", timeZone: "EST" },  
    "839": { state: "South Carolina", timeZone: "EST" },  
    "840": { state: "California", timeZone: "PST" },  
    "843": { state: "South Carolina", timeZone: "EST" },  
    "844": { state: "No Data", timeZone: "-" },  
    "845": { state: "New York", timeZone: "EST" },  
    "847": { state: "Illinois", timeZone: "CST" },  
    "848": { state: "New Jersey", timeZone: "EST" },  
    "850": { state: "Florida", timeZone: "CST" },  
    "854": { state: "South Carolina", timeZone: "EST" },  
    "855": { state: "No Data", timeZone: "-" },  
    "856": { state: "New Jersey", timeZone: "EST" },  
    "857": { state: "Massachusetts", timeZone: "EST" },  
    "858": { state: "California", timeZone: "PST" },  
    "859": { state: "Kentucky", timeZone: "EST" },  
    "860": { state: "Connecticut", timeZone: "EST" },  
    "861": { state: "Illinois", timeZone: "CST" },  
    "862": { state: "New Jersey", timeZone: "EST" },  
    "863": { state: "Florida", timeZone: "EST" },  
    "864": { state: "South Carolina", timeZone: "EST" },  
    "865": { state: "Tennessee", timeZone: "EST" },  
    "866": { state: "No Data", timeZone: "-" },  
    "870": { state: "Arkansas", timeZone: "CST" },  
    "872": { state: "Illinois", timeZone: "CST" },  
    "877": { state: "No Data", timeZone: "-" },  
    "878": { state: "Pennsylvania", timeZone: "EST" },  
    "880": { state: "No Data", timeZone: "-" },  
    "881": { state: "No Data", timeZone: "-" },  
    "888": { state: "No Data", timeZone: "-" },  
    "900": { state: "No Data", timeZone: "-" },  
    "901": { state: "Tennessee", timeZone: "CST" },  
    "903": { state: "Texas", timeZone: "CST" },  
    "904": { state: "Florida", timeZone: "EST" },  
    "906": { state: "Michigan", timeZone: "EST" },  
    "907": { state: "Alaska", timeZone: "AKST" },  
    "908": { state: "New Jersey", timeZone: "EST" },  
    "909": { state: "California", timeZone: "PST" },  
    "910": { state: "North Carolina", timeZone: "EST" },  
    "912": { state: "Georgia", timeZone: "EST" },  
    "913": { state: "Kansas", timeZone: "CST" },  
    "914": { state: "New York", timeZone: "EST" },  
    "915": { state: "Texas", timeZone: "MST" },  
    "916": { state: "California", timeZone: "PST" },  
    "917": { state: "New York", timeZone: "EST" },  
    "918": { state: "Oklahoma", timeZone: "CST" },  
    "919": { state: "North Carolina", timeZone: "EST" },  
    "920": { state: "Wisconsin", timeZone: "CST" },  
    "924": { state: "Minnesota", timeZone: "CST" },  
    "925": { state: "California", timeZone: "PST" },  
    "928": { state: "Arizona", timeZone: "MST" },  
    "929": { state: "New York", timeZone: "EST" },  
    "930": { state: "Indiana", timeZone: "EST" },  
    "931": { state: "Tennessee", timeZone: "CST" },  
    "934": { state: "New York", timeZone: "EST" },  
    "936": { state: "Texas", timeZone: "CST" },  
    "937": { state: "Ohio", timeZone: "EST" },  
    "938": { state: "Alabama", timeZone: "CST" },  
    "940": { state: "Texas", timeZone: "CST" },  
    "941": { state: "Florida", timeZone: "EST" },  
    "943": { state: "Georgia", timeZone: "EST" },  
    "945": { state: "Texas", timeZone: "CST" },  
    "947": { state: "Michigan", timeZone: "EST" },  
    "948": { state: "Virginia", timeZone: "EST" },  
    "949": { state: "California", timeZone: "PST" },  
    "951": { state: "California", timeZone: "PST" },  
    "952": { state: "Minnesota", timeZone: "CST" },  
    "954": { state: "Florida", timeZone: "EST" },  
    "956": { state: "Texas", timeZone: "CST" },  
    "959": { state: "Connecticut", timeZone: "EST" },  
    "970": { state: "Colorado", timeZone: "MST" },  
    "971": { state: "Oregon", timeZone: "PST" },  
    "972": { state: "Texas", timeZone: "CST" },  
    "973": { state: "New Jersey", timeZone: "EST" },  
    "975": { state: "Missouri", timeZone: "CST" },  
    "978": { state: "Massachusetts", timeZone: "EST" },  
    "979": { state: "Texas", timeZone: "CST" },  
    "980": { state: "North Carolina", timeZone: "EST" },  
    "983": { state: "Colorado", timeZone: "MST" },  
    "984": { state: "North Carolina", timeZone: "EST" },  
    "985": { state: "Louisiana", timeZone: "CST" },  
    "986": { state: "Idaho", timeZone: "MST" },  
    "989": { state: "Michigan", timeZone: "EST" },  
};

function checkAreaCode() {
    let phoneInput = document.getElementById("borrowerPhoneNumber").value.trim();
    let resultDisplay = document.getElementById("timeZoneResult");

    // Extract area code (first 3 digits)
    let areaCodeMatch = phoneInput.match(/\(?(\d{3})\)?/);
    if (!areaCodeMatch) {
        resultDisplay.textContent = "Invalid phone number.";
        resultDisplay.style.color = "red";
        return;
    }

    let areaCode = areaCodeMatch[1];

    // Check area code against state/time zone list
    if (areaCodeToStateTimeZone[areaCode]) {
        let { state, timeZone } = areaCodeToStateTimeZone[areaCode];
    
        // Create elements for state and time zone
        const stateElement = document.createElement('div');
        stateElement.textContent = `State: ${state}`;
    
        const timeZoneElement = document.createElement('div');
        timeZoneElement.textContent = `Time Zone: ${timeZone}`;
    
        // Add elements to the resultDisplay
        resultDisplay.innerHTML = ''; // Clear previous content
        resultDisplay.appendChild(stateElement);
        resultDisplay.appendChild(timeZoneElement);
    
        // Apply styles
        resultDisplay.style.color = "green";
    } else {
        resultDisplay.textContent = "Area code not found.";
        resultDisplay.style.color = "red";
    }
    
}


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
function formatPhoneNumber(inputId) {
    let phoneInput = document.getElementById(inputId);
    if (!phoneInput) {
        console.error("Element with ID", inputId, "not found.");
        return;
    }

    let phoneValue = phoneInput.value.trim();
    phoneValue = phoneValue.replace(/\D/g, ""); // Remove all non-numeric characters
    
    if (phoneValue.startsWith("1")) {
        phoneValue = phoneValue.substring(1); // Remove the +1
    }

    if (phoneValue.length === 10) {
        phoneValue = `(${phoneValue.substring(0, 3)}) ${phoneValue.substring(3, 6)}-${phoneValue.substring(6)}`;
    }

    phoneInput.value = phoneValue;
}


function submitContactForm() {
    let state = document.getElementById("state")?.value;
    let contactName = document.getElementById("contactName")?.value;
    let companyName = document.getElementById("companyName")?.value;
    let phoneNumber = document.getElementById("borrowerPhoneNumber")?.value;

    let contactMessage = document.getElementById("contactMessage");

    if (!state || !contactName || !companyName || !phoneNumber) {
        contactMessage.textContent = "Error: All contact fields must be filled.";
        contactMessage.style.color = "red";
        return;
    }

    contactMessage.textContent = "Contact Information Submitted Successfully!";
    contactMessage.style.color = "green";
}
