const API_KEY = "c26ee70b-323d-49e5-b39c-b5a17c5a70f0"; 

function loadMatches() {
  fetch(`https://api.cricapi.com/v1/cricScore?apikey=${API_KEY}`)
    .then(response => response.json())
    .then(data => {

      const container = document.getElementById("matches");
      container.innerHTML = "";

      if (!data.data || data.data.length === 0) {
        container.innerHTML = "<p>No matches right now.</p>";
        return;
      }

      data.data.forEach(match => {

        const matchDiv = document.createElement("div");
        matchDiv.className = "match";

        let badge = "";

        if (match.status && match.status.toLowerCase().includes("live")) {
          matchDiv.classList.add("live");
          badge = `<span class="badge">LIVE</span>`;
        }

        if (match.status && 
           (match.status.toLowerCase().includes("won") ||
            match.status.toLowerCase().includes("match over"))) {
          matchDiv.classList.add("completed");
        }

        matchDiv.innerHTML = `
          <h2>${match.name} ${badge}</h2>
          <p><strong>Status:</strong> ${match.status}</p>
          <p><strong>Teams:</strong> ${match.teams ? match.teams.join(" vs ") : ""}</p>
          <p><strong>Venue:</strong> ${match.venue || "N/A"}</p>
          <p><strong>Date:</strong> ${match.dateTimeGMT}</p>
        `;

        container.appendChild(matchDiv);
      });

    })
    .catch(error => {
      console.log(error);
      document.getElementById("matches").innerHTML = "Error loading data.";
    });
}

loadMatches();
setInterval(loadMatches, 30000);
