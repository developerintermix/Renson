let countryData = []; // Stores all country data
let filteredData = []; // Stores filtered search results

/**
 * Fetches country data from data.json, initializes the display, 
 * and sets the default filteredData.
 */
function retrieveCountryData() {
    fetch("data.json")
        .then((response) => response.json())
        .then((data) => {
            countryData = data;
            filteredData = data; // Default to displaying all countries initially
            displayCountry(data);
        })
        .catch((error) => console.error("Error fetching country data:", error));
}

/**
 * Renders the given list of countries onto the page.
 * @param {Array} data - Array of country objects.
 */
function displayCountry(data) {
    let container = document.getElementById("countries-components");

    if (!container) {
        console.error("Error: 'countries-components' element not found in DOM.");
        return;
    }

    container.innerHTML = ""; // Clear previous content

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

        // Store selected country in sessionStorage and navigate to details page
        card.addEventListener("click", function () {
            sessionStorage.setItem("selectedCountry", JSON.stringify(country));
            window.location.href = "details.html";
        });

        container.appendChild(card);
    });
}

/**
 * Filters countries based on search input.
 * This function ensures that searches are applied after filtering.
 */
function search() {
    let searchQuery = document.getElementById("search").value.toLowerCase();
    let searchData = filteredData.filter((country) =>
        country.name.toLowerCase().includes(searchQuery)
    );
    displayCountry(searchData);
}

/**
 * Filters countries based on the selected region.
 * Updates filteredData and applies search to maintain results consistency.
 */
function filter() {
    let filterDropdown = document.getElementById("Filter");
    let selectedRegion = filterDropdown.value;

    // Update filteredData based on the selected region
    filteredData = selectedRegion === "All"
        ? countryData
        : countryData.filter((country) => country.region.includes(selectedRegion));

    displayCountry(filteredData);
    search(); // Apply search after filtering
}

/**
 * Resets both the filter and search input fields.
 * Restores the full country list.
 */
function resetFilter() {
    document.getElementById("Filter").value = "All"; // Reset dropdown selection
    document.getElementById("search").value = ""; // Clear search input
    filteredData = countryData; // Reset filtered data
    displayCountry(countryData);
}

/**
 * Initializes the application, sets up event listeners, 
 * and handles dark mode settings.
 */
function initialize() {
    retrieveCountryData();

    document.addEventListener("DOMContentLoaded", function () {
        const darkModeToggle = document.getElementById("theme-mode");
        const body = document.body;

        // Load user's dark mode preference from localStorage
        if (localStorage.getItem("darkMode") === "enabled") {
            body.classList.add("dark");
        }

        // Toggle dark mode and store the preference in localStorage
        darkModeToggle.addEventListener("click", function () {
            body.classList.toggle("dark");
            localStorage.setItem(
                "darkMode",
                body.classList.contains("dark") ? "enabled" : "disabled"
            );
        });
    });
}

/**
 * Loads selected country details on details.html.
 * Retrieves data from sessionStorage and displays relevant details.
 */
function loadCountryDetails() {
    const storedCountry = sessionStorage.getItem("selectedCountry");
    const detailsContainer = document.getElementById("country-details");

    if (!detailsContainer) {
        console.error("Error: 'country-details' element not found in DOM.");
        return;
    }

    if (!storedCountry) {
        detailsContainer.innerHTML = "<p>Country not found.</p>";
        return;
    }

    const country = JSON.parse(storedCountry);

    detailsContainer.innerHTML = `
        <div class="country__flag">
            <img src="${country.flag}" alt="${country.name} Flag">
        </div>
        <div class="country__details-card">
            <div>
                <h2>${country.name}</h2>
            </div>
            <div class="country__info">
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
            <div class="country__border">
                <p><strong>Border Countries:</strong></p>
                ${
                    country.borders && country.borders.length > 0
                        ? country.borders.map((border) => `<button class="country__border-item" data-border="${border}">${border}</button>`).join("")
                        : `<p>No border countries</p>`
                }
            </div>
        </div>`;

    // Add event listeners to border country buttons
    document.querySelectorAll(".country__border-item").forEach((button) => {
        button.addEventListener("click", function () {
            let borderCountryCode = this.getAttribute("data-border");

            // Fetch all country data to find the selected border country
            fetch("data.json")
                .then((response) => response.json())
                .then((allCountries) => {
                    let borderCountry = allCountries.find((c) => c.alpha3Code === borderCountryCode);

                    if (borderCountry) {
                        sessionStorage.setItem("selectedCountry", JSON.stringify(borderCountry));
                        window.location.href = "details.html";
                    } else {
                        console.error("Border country data not found for", borderCountryCode);
                    }
                })
                .catch((error) => console.error("Error fetching country data:", error));
        });
    });
}

/**
 * Navigates back to the previous page.
 */
function goBack() {
    window.history.back();
}

// Load country details only on details.html
if (window.location.pathname.includes("details.html")) {
    window.onload = loadCountryDetails;
}

// Initialize the application
initialize();
