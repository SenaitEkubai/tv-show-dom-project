// fetch function that will fetch data from "https://api.tvmaze.com/shows/527/episodes"

// global variables

let episodes;
let allShows = getAllShows();
let result = document.getElementById("results");
let mode = "shows";

const allElementsContainer = document.createElement("div");
const showsContainer = document.createElement("div");
const root = document.getElementById("root");
showsContainer.classList = "shows-container";
allElementsContainer.classList = "bigger-container";

//creating select and search elements of the page

const selectAndSearchDiv = document.createElement("div");
const selectShowElement = document.createElement("select");
const selectEpisodeElement = document.createElement("select");
const searchField = document.createElement("input");
searchField.placeholder = "search for ";
searchField.type = "search";

// result element

const result = document.createElement("p");
selectAndSearchDiv.appendChild(selectShowElement);
selectAndSearchDiv.appendChild(selectEpisodeElement);
selectAndSearchDiv.appendChild(searchField);
selectAndSearchDiv.appendChild(result);

// adding class to elements

selectAndSearchDiv.classList = "selectAndSearchDiv";
selectShowElement.innerHTML = "<option>Select a Show</option>";
selectEpisodeElement.innerHTML = "<option>Select an episode</option>";

// title element

const titleAndFieldsDiv = document.createElement("div");
allElementsContainer.appendChild(titleAndFieldsDiv);
const titleElement = document.createElement("h2");
titleElement.innerHTML = "All Your Shows In One Place";
titleAndFieldsDiv.appendChild(titleElement);
titleAndFieldsDiv.appendChild(selectAndSearchDiv);

// calling all functions

createDropDownMenuForShows(allShows);
displayAllShows(allShows);
result.innerHTML = `Displaying ${allShows.length} / ${allShows.length}`;

// fetch allEpisodes function

function fetchEpisodes(showId) {
  fetch("http://api.tvmaze.com/shows/" + showId + "/episodes")
    .then((response) => response.json())
    .then((data) => {
      episodes = data;
      createDropDownMenuForEpisodes(data);
    })
    .catch((err) => console.error(err));
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
  showsContainer.innerHTML = "";
  displayAllShows(foundLists);
  result.innerHTML = `Displaying ${foundLists.length} / ${allShows.length}`;
}
/*call the search input event listener, filter the array 
    to display the searched episode 
    */
function filterEpisodes(event) {
  let value = event.target.value.toLowerCase();
  let foundLists = episodes.filter((episode) => {
    let toLowerCaseName = episode.name.toLowerCase();
    let toLowerCaseSummary;
    if (episode.summary && episode.name) {
      toLowerCaseSummary = episode.summary.toLowerCase();
      return (
        toLowerCaseName.includes(value) || toLowerCaseSummary.includes(value)
      );
    }
  });
  showsContainer.innerHTML = "";
  displayAllEpisodes(foundLists);
  document.getElementById(
    "results"
  ).innerHTML = `Displaying ${foundLists.length} / ${episodes.length}`;
}

// this function creates drop down menu for shows

function createDropDownMenuForShows(allShows) {
  sorter(allShows);
  allShows.forEach((show) => {
    let option = document.createElement("option");
    option.innerHTML = `${show.name}`;
    option.value = show.id;
    selectShowElement.appendChild(option);
  });

  searchField.addEventListener("input", filterShows);
  selectShowElement.addEventListener("change", (event) => {
    showsContainer.innerHTML = "";
    selectEpisodeElement.innerHTML = "<option>Select an episode</option>";
    //searchField.value = "";
    if (event.target.value == "Select a Show") {
      displayAllShows(allShows);
      result.innerHTML = `Displaying ${allShows.length} / ${allShows.length}`;
    } else {
      let showId = event.target.value;

      if (showId) {
        if (mode == "shows") {
          mode = "episodes";
          searchField.removeEventListener("input", filterShows);
          searchField.addEventListener("input", filterEpisodes);
        }
        fetchEpisodes(showId);
      } else {
        if (mode == "episodes") {
          mode = "shows";
          searchField.removeEventListener("input", filterEpisodes);
          searchField.addEventListener("input", filterShows);
        }
        result.innerHTML = `Displaying ${allShows.length} / ${allShows.length}`;
      }
    }
  });
}

//this function displays all shows

function displayShow(show) {
  const divContainer = document.createElement("div");
  const titleAndImageDiv = document.createElement("div");
  const titleElement = document.createElement("h3");
  const imageElement = document.createElement("img");
  const summaryElement = document.createElement("p");
  // separate div
  const genreRatingStatus = document.createElement("div");
  const genreElement = document.createElement("p");
  const runTimeElement = document.createElement("p");
  const statusElement = document.createElement("p");
  const ratingElement = document.createElement("p");
  // append children
  root.appendChild(allElementsContainer);
  allElementsContainer.appendChild(showsContainer);
  showsContainer.appendChild(divContainer);
  divContainer.appendChild(titleAndImageDiv);
  titleAndImageDiv.appendChild(titleElement);
  titleAndImageDiv.appendChild(imageElement);
  divContainer.appendChild(summaryElement);
  divContainer.appendChild(genreRatingStatus);
  genreRatingStatus.appendChild(genreElement);
  genreRatingStatus.appendChild(runTimeElement);
  genreRatingStatus.appendChild(statusElement);
  genreRatingStatus.appendChild(ratingElement);

  // genre,status,rating and runtime inner content

  genreElement.innerHTML = `Genres:   ${show.genres}`;
  runTimeElement.innerHTML = `Runtime:   ${show.runtime}`;
  statusElement.innerHTML = `Status:   ${show.status}`;

  if (show.rating) {
    ratingElement.innerHTML = `Ratings:   ${Object.keys(
      show.rating
    )} : ${Object.values(show.rating)}`;
  }

  titleElement.innerHTML = `${show.name}`;
  if (show.image == null) {
    imageElement.src = "../Image_coming_soon.png";
  } else {
    imageElement.src = `${show.image.medium}`;
    summaryElement.innerHTML = `${show.summary}`;
  }
}

function sorter(array) {
  array.sort((a, b) => {
    if (a.name < b.name) {
      return -1;
    }
    return 1;
  });
}

// display all shows

function displayAllShows(array) {
  document.getElementById("root").innerHTML = "";
  array.forEach((element) => {
    displayShow(element);
  });
}

/*The display function creates elements and set their inner html */

function display(episode) {
  const divContainer = document.createElement("div");
  const titleAndImageDiv = document.createElement("div");
  const titleElement = document.createElement("h3");
  const imageElement = document.createElement("img");
  const summaryElement = document.createElement("p");
  // separate div
  const genreRatingStatus = document.createElement("div");
  const genreElement = document.createElement("p");
  const runTimeElement = document.createElement("p");
  const statusElement = document.createElement("p");
  const ratingElement = document.createElement("p");
  // append children
  root.appendChild(allElementsContainer);
  allElementsContainer.appendChild(showsContainer);
  showsContainer.appendChild(divContainer);
  divContainer.appendChild(titleAndImageDiv);
  titleAndImageDiv.appendChild(titleElement);
  titleAndImageDiv.appendChild(imageElement);
  divContainer.appendChild(summaryElement);
  divContainer.appendChild(genreRatingStatus);
  genreRatingStatus.appendChild(genreElement);
  genreRatingStatus.appendChild(runTimeElement);
  genreRatingStatus.appendChild(statusElement);
  genreRatingStatus.appendChild(ratingElement);
  // give div a class for better accessibility
  allElementsContainer.classList = "allElementsContainer";
  // inner html
  titleElement.innerHTML = `${episode.name} - S${String(
    episode.season
  ).padStart(2, "0")}E${String(episode.number).padStart(2, "0")} `;
  if (episode.image == null) {
    imageElement.src = "../Image_coming_soon.png";
  } else {
    imageElement.src = `${episode.image.medium}`;
    summaryElement.innerHTML = `${episode.summary}`;
  }
}

/*this function calls the display function  */

function displayAllEpisodes(array) {
  showsContainer.innerHTML = "";
  array.forEach((episode) => {
    display(episode);
  });
}

// create dropdown menu function

function createDropDownMenuForEpisodes(allEpisodes) {
  allEpisodes.forEach((episode) => {
    let option = document.createElement("option");
    option.innerHTML = `S${episode.season}E${String(episode.number).padStart(
      2,
      "0"
    )} - ${episode.name}`;
    option.value = episode.name;
    selectEpisodeElement.appendChild(option);
  });
  displayAllEpisodes(episodes);
  result.innerHTML = `Displaying ${allEpisodes.length} / ${allEpisodes.length}`;
  selectEpisodeElement.addEventListener("change", (event) => {
    showsContainer.innerHTML = "";
    searchField.value = event.target.value; // whatever is selected from the dropdown list will be displayed in the input field
    const selected = episodes.filter((episode) => {
      return episode.name === event.target.value;
    });
    displayAllEpisodes(selected);
    result.innerHTML = `Displaying ${selected.length} / ${allEpisodes.length}`;
    // when the select an episode choice is selected all episodes will be displayed
    if (searchField.value == "") {
      displayAllEpisodes(episodes);
      document.getElementById(
        "results"
      ).innerHTML = `Displaying ${allEpisodes.length} / ${allEpisodes.length}`;
    }
  });
}
