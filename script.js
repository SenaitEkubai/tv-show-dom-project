//You can edit ALL of the code here
let allEpisodes;
function setup() {
  allEpisodes = getAllEpisodes();
  displayAllEpisodes(allEpisodes);
  let searchInput = document.getElementById("search-field");
  searchInput.addEventListener("input", (event) => {
    let value = event.target.value.toLowerCase();
    let foundLists = allEpisodes.filter((show) => {
      let toLowerCaseName = show.name.toLowerCase();
      let toLowerCaseSummary = show.summary.toLowerCase();

      return (
        toLowerCaseName.includes(value) || toLowerCaseSummary.includes(value)
      );
    });

    document.getElementById(
      "results"
    ).innerHTML = `Displaying ${foundLists.length} / ${allEpisodes.length}`;
    displayAllEpisodes(foundLists);
  });
  createDropDownMenu();
}
// this function will create the elements and append them to the root element
function display(show) {
  const divContainer = document.createElement("div");
  const titleElement = document.createElement("h3");
  const imageElement = document.createElement("img");
  const summaryElement = document.createElement("p");
  // appending elements to the page
  document.getElementById("root").appendChild(divContainer);
  divContainer.appendChild(titleElement);
  divContainer.appendChild(imageElement);
  divContainer.appendChild(summaryElement);
  // give div a class for better accessibility
  divContainer.classList = "title-image-summary-container";
  imageElement.classList = "episode-image";
  titleElement.classList = "episode-title";
  summaryElement.classList = "episode-summary";
  divContainer.id = "div";
  // inner html
  titleElement.innerHTML = `${show.name} - S${String(show.season).padStart(
    2,
    "0"
  )}E${String(show.number).padStart(2, "0")} `;
  imageElement.src = `${show.image.medium}`;
  summaryElement.innerHTML = `${show.summary}`;
}
// this function will display all episodes
function displayAllEpisodes(array) {
  document.getElementById("root").innerHTML = "";
  array.forEach((show) => {
    display(show);
  });
}

// dropdown menu
function createDropDownMenu(allEpisodes) {
  allEpisodes = getAllEpisodes();
  const selectTag = document.getElementById("selectMenu");
  allEpisodes.forEach((episode) => {
    let option = document.createElement("option");
    option.innerHTML = `S${episode.season}E${String(episode.number).padStart(
      2,
      "0"
    )} - ${episode.name}`;
    selectTag.appendChild(option);
    selectTag.addEventListener("change", () => {
      window.location.href = option.value = `${episode.url}`;
    });
  });
}

// display selected episode
window.onload = setup;
