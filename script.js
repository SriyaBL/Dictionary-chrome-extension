document.addEventListener('DOMContentLoaded', function () {
    //retrieve the necessary elements from the DOM
    const wordInput = document.getElementById('word-input');
    const searchButton = document.getElementById('search-btn');
    const meaningContainer = document.getElementById('meaning-container');
    const moreInfoBtn = document.getElementById('more-info-btn');
    const additionalInfo = document.getElementById('additional-info');
    let completeInfo = [];

    //event listener for the search button
    searchButton.addEventListener('click', function () {
        let word = wordInput.ariaValueMax.trim();

        if (word !== '') {
            fetchMeaning(word)
                .then(function (data) {
                    completeInfo = data;
                    fillInfo();
                })
                .catch(function (error) {
                    meaningContainer.textContent = 'Failed to retrieve meaning';
                    console.error(error);
                });

        }
    });

    function fetchMeaning(word) {

        return fetch('https://api.dictionaryapi.dev/api/v2/entries/en/' + encodeURIComponent(word))
            .then(function (response) {
                if (!response.ok) {
                    throw new Error('Request failed: ' + response.status);
                }
                return response.json();
            })
            .then(function (data) {
               

                const info = {
                    meanings: data.meanings,
                    phonetics: data.phonetics,
                    origin: data.origin  
                }

                return info;
                
            });
    }

    moreInfoBtn.addEventListener('click', displayAdditionalInfo());

    function displayAdditionalInfo() {

        let addInfoHTML = ``;

        addInfoHTML += `Origin: `



    }

});

