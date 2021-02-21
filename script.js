// fetch function that will fetch data from "https://api.tvmaze.com/shows/527/episodes"
// calling fetEpisodes()

fetchEpisodes();

function fetchEpisodes() {
  fetch("https://api.tvmaze.com/shows/527/episodes")
    .then((response) => response.json())
    .then((data) => {
      displayAllEpisodes(data);
      createDropDownMenu(data);
      setup(data);
    });
}
/*This setup function will take an array as a parameter, call the search input event listener, filter the array 
  to display the searched episode 
  */
function setup(array) {
  let searchInput = document.getElementById("search-field");
  searchInput.addEventListener("input", (event) => {
    let value = event.target.value.toLowerCase();
    let foundLists = array.filter((show) => {
      let toLowerCaseName = show.name.toLowerCase();
      let toLowerCaseSummary = show.summary.toLowerCase();

      return (
        toLowerCaseName.includes(value) || toLowerCaseSummary.includes(value)
      );
    });
    displayAllEpisodes(foundLists);
    document.getElementById(
      "results"
    ).innerHTML = `Displaying ${foundLists.length} / ${array.length}`;
  });
}

/*The display function creates elements and set their inner html */

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

/*this function calls the display function  */

function displayAllEpisodes(array) {
  document.getElementById("root").innerHTML = "";
  array.forEach((show) => {
    display(show);
  });
}

// create dropdown menu function

function createDropDownMenu(allEpisodes) {
  const selectTag = document.getElementById("selectMenu");
  allEpisodes.forEach((episode) => {
    let option = document.createElement("option");
    option.innerHTML = `S${episode.season}E${String(episode.number).padStart(
      2,
      "0"
    )} - ${episode.name}`;
    option.value = episode.name;
    selectTag.appendChild(option);
    selectTag.addEventListener("change", (event) => {
      let searchInput = document.getElementById("search-field");
      document.getElementById("results").innerHTML = "";
      searchInput.value = event.target.value; // whatever is selected from the dropdown list will be displayed in the input field
      const selected = allEpisodes.filter((episode) => {
        return episode.name === event.target.value;
      });
      displayAllEpisodes(selected);
      // when the select an episode choice is selected tall episodes will be displayed
      if (event.target.value == "") {
        displayAllEpisodes(allEpisodes);
      }
    });
  });
}
