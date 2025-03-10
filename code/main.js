let countryData = []; // Fixed typo: "contryData" to "countryData"
let filteredData = []; // Store filtered results

function retrieveCountryData() {
    fetch("data.json")
    .then((response) => response.json())
    .then((data) => {
        countryData = data;
        filteredData = data; // Initially, filteredData is the full dataset
        displayCountry(data);
    });
}

/**
 * Displays the information for a country.
 * 
 * @param {Array} data 
 * 
 * @return {void}
 */
function displayCountry(data) {
    let container = document.getElementById("countries-components");
    if (!container) {
        console.error("Error: 'countries-components' element not found in DOM.");
        return;
    }
 
    container.innerHTML = "";
 
    data.forEach((country) => {
        let card = document.createElement("div");
        card.classList.add("country-card");
        card.innerHTML = `
            <img src="${country.flag}" alt="${country.name} Flag">
            <div class="card-info">
                <h3 class="country-name">${country.name}</h3>
                <p><strong>Population:</strong> ${country.population ? country.population.toLocaleString() : "N/A"}</p>
                <p><strong>Region:</strong> ${country.region || "N/A"}</p>
                <p><strong>Capital:</strong> ${country.capital || "N/A"}</p>
            </div>
        `;
 
        // Store in `sessionStorage` & Redirect
        card.addEventListener("click", function () {
            sessionStorage.setItem("selectedCountry", JSON.stringify(country));
            window.location.href = "details.html"; // Redirect to details page
        });
 
        container.appendChild(card);
    });
 }
 

// Function for the search bar
function search() {
   let searchQuery = document.getElementById("search").value.toLowerCase();
   let searchData = filteredData.filter(country => 
       country.name.toLowerCase().includes(searchQuery)
   );
   displayCountry(searchData);
}

// Function for filtering by region
function filter() {
   let filterDropdown = document.getElementById("Filter");
   let selectedRegion = filterDropdown.value;

   if (selectedRegion === "All") {
       filteredData = countryData; // Reset to all data
   } else {
       filteredData = countryData.filter(country => country.region.includes(selectedRegion));
   }

   displayCountry(filteredData);
   search(); // Apply search within the filtered data
}

// Function to reset filter and search
function resetFilter() {
    document.getElementById("Filter").value = "All"; // Reset dropdown
    document.getElementById("search").value = ""; // Clear search
    filteredData = countryData; // Reset filter
    displayCountry(countryData);
}

// Initialize function
function initialize() {
    retrieveCountryData();

    document.addEventListener("DOMContentLoaded", function () {
        const darkModeToggle = document.getElementById("theme-mode");
        const body = document.body;
    
        // Check for saved user preference in localStorage
        if (localStorage.getItem("darkMode") === "enabled") {
            body.classList.add("dark");
        }
    
        darkModeToggle.addEventListener("click", function () {
            body.classList.toggle("dark");
    
            body.classList.contains("dark") 
            ? localStorage.setItem("darkMode", "enabled")
            : localStorage.setItem("darkMode", "disabled")
        });
    });
}

// Function to load country details on details.html
function loadCountryDetails() {
    const countryData = sessionStorage.getItem("selectedCountry");
    const detailsContainer = document.getElementById("country-details");

    if (!detailsContainer) {
        console.error("Error: 'country-details' element not found in DOM.");
        return;
    }

    if (!detailsContainer) {
        console.warn("Retrying: 'country-details' element not found.");
        setTimeout(loadCountryDetails, 50); // Try again after 50ms
        return;
    }

    if (!countryData) {
        detailsContainer.innerHTML = "<p>Country not found.</p>";
        return;
    }

    const country = JSON.parse(countryData);

    detailsContainer.innerHTML = `
        <div class="country-flag">
            <img src="${country.flag}" alt="${country.name} Flag">
        </div>
        <div class='country-details-card'>
            <div>
                <h2>${country.name}</h2>
            </div>
            <div class="country-info">
                <div>
                    <p><strong>Native Name:</strong> ${country.nativeName || "N/A"}</p>
                    <p><strong>Population:</strong> ${country.population ? country.population.toLocaleString() : "N/A"}</p>
                    <p><strong>Sub Region:</strong> ${country.subregion || "N/A"}</p>
                    <p><strong>Capital:</strong> ${country.capital || "N/A"}</p>
                    <p><strong>Region:</strong> ${country.region || "N/A"}</p>
                </div>
                <div>
                    <p><strong>Top Level Domain:</strong> ${country.topLevelDomain || "N/A"}</p>
                    <p><strong>Currency:</strong> ${country.currencies ? country.currencies.map((c) => c.code).join(", ") : "N/A"}</p>
                    <p><strong>Languages:</strong> ${country.languages ? country.languages.map((c) => c.name).join(", ") : "N/A"}</p>
                </div>
            </div>
            <div class="border-countries">
                <p><strong>Border Countries:</strong></p>
                ${
                    country.borders && country.borders.length > 0
                        ? country.borders.map((border) => `<span class="border-box">${border}</span>`).join("")
                        : `<p>No border countries</p>`
                }
            </div>
        </div>`;
}

// Function to go back to the previous page
function goBack() {
    window.history.back();
}

// Ensure functions run only on the correct page
if (window.location.pathname.includes("details.html")) {
    window.onload = loadCountryDetails;
}


initialize();
