let contryData = [];
fetch("data.json")
.then((response)=>response.json())
.then((data)=>{
   contryData = data;
   displaycontry(data)
})
function displaycontry(data) {
   let container = document.getElementById("countries-components");
   container.innerHTML = "";

   data.forEach((country) => {
       let card = document.createElement("div");
       card.classList.add("country-card");
       card.innerHTML = `
           <img src="${country.flag}" alt="${country.name} Flag">
           <div class="card-info">
               <h3 class="country-name">${country.name}</h3>
               <p><strong>Population:</strong> ${country.population.toLocaleString()}</p>
               <p><strong>Region:</strong> ${country.region}</p>
               <p><strong>Capital:</strong> ${country.capital}</p>
           </div>
       `;

       // ** Store in `sessionStorage` & Redirect**
       card.addEventListener("click", function () {
           sessionStorage.setItem("selectedCountry", JSON.stringify(country));
           window.location.href = "detalis.html"; // Redirect to details page
       });

       container.appendChild(card);
   });
}

function search() {
   let query = document.getElementById("search");
   let search = query.value.toLowerCase();
   let searchdata = contryData.filter(country => 
       country.name.toLowerCase().includes(search)
   );
   displaycontry(searchdata);
}

function filter(){
   let fquery = document.getElementById("Filter")
   let filter = fquery.value
   let filterdata = contryData.filter(country=>
      country.region.includes(filter)
   );
   displaycontry(filterdata);
}

document.addEventListener("DOMContentLoaded", function () {
    const darkModeToggle = document.getElementById("theme-mode");
    const body = document.body;

    // Check for saved user preference in localStorage
    if (localStorage.getItem("darkMode") === "enabled") {
        body.classList.add("dark");
    }

    darkModeToggle.addEventListener("click", function () {
        body.classList.toggle("dark");

        // Save user preference in localStorage
        if (body.classList.contains("dark")) {
            localStorage.setItem("darkMode", "enabled");
        } else {
            localStorage.setItem("darkMode", "disabled");
        }
    });
});