// fetch function that will fetch data from "https://api.tvmaze.com/shows/527/episodes"
// all code for shows
let allShows = getAllShows();

// calling all functions

createDropDownMenuForShows(allShows);
displayAllShows(allShows);
setup(allShows);

// fetch allEpisodes function

function fetchEpisodes(show) {
  let id = show.id;
  fetch("https://api.tvmaze.com/shows/" + id + "/episodes")
    .then((response) => response.json())
    .then((data) => {
      createDropDownMenuForEpisodes(data);
    });
}

// this function creates drop down menu for shows

function createDropDownMenuForShows(allShows) {
  const selectShowTag = document.getElementById("selectShow");
  allShows.forEach((show) => {
    let option = document.createElement("option");
    option.innerHTML = `${show.name}`;
    option.value = show.name;
    selectShowTag.appendChild(option);
    selectShowTag.addEventListener("change", (event) => {
      let searchInput = document.getElementById("search-field");
      if (event.target.value === show.name) {
        fetchEpisodes(show);
      }
      document.getElementById("results").innerHTML = "";
      document.getElementById("selectMenu").innerHTML = "";
      searchInput.value = event.target.value; // whatever is selected from the dropdown list will be displayed in the input field

      const selected = allShows.filter((show) => {
        return show.name === event.target.value;
      });
      displayAllShows(selected);
      // when the select an episode choice is selected all episodes will be displayed
      if (event.target.value == "") {
        displayAllShows(allShows);
      }
    });
  });
}

//this function displays all shows

function displayShow(show) {
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

  // needs to be tided up
  // genre
  const genreElement = document.createElement("p");
  genreElement.innerHTML = `Genres: ${show.genres}`;
  genreElement.style.color = "red";
  divContainer.appendChild(genreElement);
  //runtime
  const runTimeElement = document.createElement("p");
  runTimeElement.innerHTML = `Runtime: ${show.runtime}`;
  runTimeElement.style.color = "red";
  divContainer.appendChild(runTimeElement);
  // status
  const statusElement = document.createElement("p");
  statusElement.innerHTML = `Status: ${show.status}`;
  statusElement.style.color = "red";
  divContainer.appendChild(statusElement);
  // rating
  const ratingElement = document.createElement("p");
  ratingElement.innerHTML = `Ratings: ${Object.keys(
    show.rating
  )} : ${Object.values(show.rating)}`;
  ratingElement.style.color = "red";
  divContainer.appendChild(ratingElement);

  divContainer.id = "div";
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
    displayAllShows(foundLists);
    document.getElementById(
      "results"
    ).innerHTML = `Displaying ${foundLists.length} / ${array.length}`;
  });
}

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
  allEpisodes.forEach((episode) => {
    let option = document.createElement("option");
    option.innerHTML = `S${episode.season}E${String(episode.number).padStart(
      2,
      "0"
    )} - ${episode.name}`;
    option.value = episode.name;
    selectEpisodeTag.appendChild(option);
    selectEpisodeTag.addEventListener("change", (event) => {
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
