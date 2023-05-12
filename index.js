let searchInputEl = document.getElementById('searchInput');
let spinnerEl = document.getElementById('spinner');
let searchResults = document.getElementById('searchResults');

function createAndAppendCards(result) {
    let searchResultCard = document.createElement('div');
    searchResultCard.classList.add("result-item");
    searchResults.appendChild(searchResultCard);

    let titleEl = document.createElement('a');
    titleEl.href = result.link;
    titleEl.target = "_blank";
    titleEl.textContent = result.title;
    titleEl.classList.add('result-title');
    searchResultCard.appendChild(titleEl);

    let titleBreakEl = document.createElement('br');
    searchResultCard.appendChild(titleBreakEl);

    let linkEl = document.createElement('a');
    linkEl.href = result.link;
    linkEl.target = "_blank";
    linkEl.textContent = result.link;
    linkEl.classList.add('result-url');
    searchResultCard.appendChild(linkEl);

    let linkBreakEl = document.createElement('br');
    searchResultCard.appendChild(linkBreakEl);

    let descriptionEl = document.createElement('p');
    descriptionEl.textContent = result.description;
    descriptionEl.classList.add('link-description');
    searchResultCard.appendChild(descriptionEl);
}


function searchWiki(event) {
    if (event.key === "Enter") {
        spinnerEl.classList.toggle('d-none');

        let userInput = searchInputEl.value;
        let requestUrl = "https://apis.ccbp.in/wiki-search?search=" + userInput;

        let requestOptions = {
            method: "GET"
        };

        fetch(requestUrl, requestOptions)
            .then(function(response) {
                return response.json();
            })
            .then(function(jsonData) {
                let searchResultsArr = jsonData.search_results;
                spinnerEl.classList.toggle('d-none');
                for (let result of searchResultsArr) {
                    createAndAppendCards(result);
                    console.log(result);
                }
            });
    }
}

searchInputEl.addEventListener('keydown', searchWiki);