//You can edit ALL of the code here
let allEpisodes;
function setup() {
  allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes);
  // for each function
  allEpisodes.forEach(function (show) {
    // created elements
    let divContainer = document.createElement("div");
    let titleElement = document.createElement("h3");
    let imageElement = document.createElement("img");
    let summaryElement = document.createElement("p");

    // give div a class for better accessibility
    divContainer.classList = "title-image-summary-container";
    imageElement.classList = "episode-image";
    titleElement.classList = "episode-title";
    summaryElement.classList = "episode-summary";
    // contents of elements

    titleElement.innerHTML = `${show.name} - S${String(show.season).padStart(
      2,
      "0"
    )}E${String(show.number).padStart(2, "0")} `;

    imageElement.src = `${show.image.medium}`;
    summaryElement.innerHTML = `${show.summary}`;
    // appending elements
    document.getElementById("root").appendChild(divContainer);
    divContainer.appendChild(titleElement);
    divContainer.appendChild(imageElement);
    divContainer.appendChild(summaryElement);
  });
}

function makePageForEpisodes(episodeList) {
  const rootElem = document.getElementById("root");
  //rootElem.textContent = `Got ${episodeList.length} episode(s)`;
}

// for each episode

window.onload = setup;
