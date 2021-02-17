//You can edit ALL of the code here
let allEpisodes;

// let matchedList = document.getElementById("matchedList");
// setup function will load the page with all episodes
function setup() {
  allEpisodes = getAllEpisodes();
  displayAllEpisodes(allEpisodes);
  let searchInput = document.getElementById("search-field");
  searchInput.addEventListener("input", (event) => {
    //allEpisodes = getAllEpisodes();
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
// event listener

window.onload = setup;
