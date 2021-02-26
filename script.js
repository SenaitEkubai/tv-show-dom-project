// fetch function that will fetch data from "https://api.tvmaze.com/shows/527/episodes"
// all code for shows
let episodes;
let allShows = getAllShows();
let mode = "shows";

// calling all functions

createDropDownMenuForShows(allShows);
displayAllShows(allShows);

// fetch allEpisodes function

function fetchEpisodes(showId) {
  fetch("https://api.tvmaze.com/shows/" + showId + "/episodes")
    .then((response) => response.json())
    .then((data) => {
      episodes = data;
      createDropDownMenuForEpisodes(data);
    });
}

// filter shows function

function filterShows(event) {
  let value = event.target.value.toLowerCase();
  let foundLists = allShows.filter((show) => {
    let toLowerCaseName = show.name.toLowerCase();
    let toLowerCaseSummary = show.summary.toLowerCase();

    return (
      toLowerCaseName.includes(value) || toLowerCaseSummary.includes(value)
    );
  });
  displayAllShows(foundLists);
  document.getElementById(
    "results"
  ).innerHTML = `Displaying ${foundLists.length} / ${allShows.length}`;
}
/*call the search input event listener, filter the array 
  to display the searched episode 
  */
function filterEpisodes(event) {
  let value = event.target.value.toLowerCase();

  let foundLists = episodes.filter((episode) => {
    let toLowerCaseName = episode.name.toLowerCase();
    let toLowerCaseSummary = episode.summary.toLowerCase();

    return (
      toLowerCaseName.includes(value) || toLowerCaseSummary.includes(value)
    );
  });
  displayAllEpisodes(foundLists);
  document.getElementById(
    "results"
  ).innerHTML = `Displaying ${foundLists.length} / ${episodes.length}`;
}

// this function creates drop down menu for shows

function createDropDownMenuForShows(allShows) {
  const selectShowTag = document.getElementById("selectShow");
  allShows.forEach((show) => {
    let option = document.createElement("option");
    option.innerHTML = `${show.name}`;
    option.value = show.id;
    selectShowTag.appendChild(option);
  });
  let searchInput = document.getElementById("search-field");
  searchInput.addEventListener("input", filterShows);
  selectShowTag.addEventListener("change", (event) => {
    searchInput.value = "";
    let showId = event.target.value;
    if (showId) {
      if (mode == "shows") {
        mode = "episodes";
        searchInput.removeEventListener("input", filterShows);
        searchInput.addEventListener("input", filterEpisodes);
      }
      fetchEpisodes(showId);
    } else {
      if (mode == "episodes") {
        mode = "shows";
        searchInput.removeEventListener("input", filterEpisodes);
        searchInput.addEventListener("input", filterShows);
      }
      displayAllShows(allShows);
    }
  });
}

//this function displays all shows

function displayShow(show) {
  const divContainer = document.createElement("div");
  const titleElement = document.createElement("h3");
  const imageElement = document.createElement("img");
  const summaryElement = document.createElement("p");
  const genreRatingStatus = document.createElement("div");
  // appending elements to the page
  document.getElementById("root").appendChild(divContainer);
  divContainer.appendChild(titleElement);
  divContainer.appendChild(imageElement);
  divContainer.appendChild(summaryElement);
  divContainer.appendChild(genreRatingStatus);
  // give div a class for better accessibility
  divContainer.classList = "title-image-summary-container";
  imageElement.classList = "episode-image";
  titleElement.classList = "episode-title";
  summaryElement.classList = "episode-summary";
  genreRatingStatus.classList = "genre-rating-status";

  // needs to be tided up
  // genre
  const genreElement = document.createElement("p");
  genreElement.innerHTML = `Genres:   ${show.genres}`;
  genreRatingStatus.appendChild(genreElement);
  //runtime
  const runTimeElement = document.createElement("p");
  runTimeElement.innerHTML = `Runtime:   ${show.runtime}`;
  genreRatingStatus.appendChild(runTimeElement);
  // status
  const statusElement = document.createElement("p");
  statusElement.innerHTML = `Status:   ${show.status}`;
  genreRatingStatus.appendChild(statusElement);
  // rating
  if (show.rating) {
    const ratingElement = document.createElement("p");
    ratingElement.innerHTML = `Ratings:   ${Object.keys(
      show.rating
    )} : ${Object.values(show.rating)}`;
    genreRatingStatus.appendChild(ratingElement);
  }

  // create other div
  // inner html
  titleElement.innerHTML = `${show.name}`;
  if (show.image == null) {
    imageElement.src = "../Image_coming_soon.png";
  } else {
    imageElement.src = `${show.image.medium}`;
    summaryElement.innerHTML = `${show.summary}`;
  }
}
// display all shows
function displayAllShows(array) {
  document.getElementById("root").innerHTML = "";
  array.forEach((element) => {
    displayShow(element);
  });
}
// end of shows

/*The display function creates elements and set their inner html */

function display(episode) {
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
  titleElement.innerHTML = `${episode.name} - S${String(
    episode.season
  ).padStart(2, "0")}E${String(episode.number).padStart(2, "0")} `;
  imageElement.src = `${episode.image.medium}`;
  summaryElement.innerHTML = `${episode.summary}`;
}

/*this function calls the display function  */

function displayAllEpisodes(array) {
  document.getElementById("root").innerHTML = "";
  array.forEach((episode) => {
    display(episode);
  });
}

// create dropdown menu function

function createDropDownMenuForEpisodes(allEpisodes) {
  const selectEpisodeTag = document.getElementById("selectMenu");
  selectEpisodeTag.innerHTML = "";
  allEpisodes.forEach((episode) => {
    let option = document.createElement("option");
    option.innerHTML = `S${episode.season}E${String(episode.number).padStart(
      2,
      "0"
    )} - ${episode.name}`;
    option.value = episode.name;
    selectEpisodeTag.appendChild(option);
  });
  displayAllEpisodes(episodes);
  selectEpisodeTag.addEventListener("change", (event) => {
    let searchInput = document.getElementById("search-field");
    document.getElementById("results").innerHTML = "";
    searchInput.value = event.target.value; // whatever is selected from the dropdown list will be displayed in the input field
    const selected = episodes.filter((episode) => {
      return episode.name === event.target.value;
    });
    displayAllEpisodes(selected);
    // when the select an episode choice is selected tall episodes will be displayed
    if (event.target.value == "") {
      displayAllEpisodes(episodes);
    }
  });
}
