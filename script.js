const output = document.getElementById("output");
const loading = document.getElementById("loading");
const loadBtn = document.getElementById("loadBtn");
const errorBtn = document.getElementById("errorBtn");

// Load JSON data from the given file
function loadDestination(filename) {
  output.innerHTML = "";
  loading.hidden = false;

  fetch(filename)
    .then(response => {
      if (!response.ok) {
        // Handle HTTP errors
        throw new Error(`HTTP error: ${response.status} (${response.statusText})`);
      }
      return response.json();
    })
    .then(data => {
      loading.hidden = true;
      console.log("Data loaded:", data);

      output.innerHTML = `
        <h2>${data.destination}</h2>
        <p><strong>Visited:</strong> ${data.visited ? "Yes" : "No"}</p>
        <p><strong>Best Time to Visit:</strong> ${data.bestTimeToVisit}</p>

        <p><strong>Top Attractions:</strong></p>
        <ul>
          ${data.attractions.map(attraction => `<li>${attraction}</li>`).join("")}
        </ul>

        <p><strong>Weather by Season:</strong></p>
        <ul>
          ${Object.entries(data.weather).map(([season, info]) => `
            <li>
              <strong>${capitalize(season)}:</strong> 
              ${info.description} (${info.averageHigh} / ${info.averageLow})
            </li>
          `).join("")}
        </ul>
      `;
    })
    .catch(error => {
      loading.hidden = true;
      console.error("Fetch error:", error);

      output.innerHTML = `
        <p style="color: red; font-weight: bold;">
          Failed to load data: ${error.message}
        </p>
        <p>Please check the file name or try again later.</p>
      `;
    });
}

// Capitalize first letter of a string
function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// Event Listeners
loadBtn.addEventListener("click", () => loadDestination("destination.json"));
errorBtn.addEventListener("click", () => loadDestination("missing.json")); // File that doesn't exist