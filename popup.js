//retrieve the necessary elements from the DOM
const wordInput = document.getElementById('word-input');
const searchButton = document.getElementById('search-btn');
const meaningContainer = document.getElementById('meaning-container');
const moreInfoBtn = document.getElementById('more-info-btn');
const additionalInfo = document.getElementById('additional-info');
const clearBtn = document.getElementById('clear-btn');

//event listener for the search button
searchButton.addEventListener('click', function () {
    let word = wordInput.value.trim();

    if (word !== '') {
        fetchMeaning(word)
            .then(function (data) {
                fillMeanings(data.meanings);
                moreInfoBtn.style.display = 'block';
                fillAdditionalInfo(data.origin, data.phonetics);
            })
            .catch(function (error) {
                meaningContainer.textContent = 'Failed to retrieve meaning';
                console.error(error);
            });

    }
});

function fetchMeaning(word) {

    return fetch('https://api.dictionaryapi.dev/api/v2/entries/en/' + word)
        .then(function (response) {
            if(!response.ok) {
                throw new Error('Request failed: ' + response.status);
            }
            return response.json();
        })
        .then(function (data) {
            return data[0];
            //assuming the response is an array with a single object     
        });
}

//function to fill meanings
function fillMeanings(meanings) {

    meaningContainer.innerHTML = '';

    let meaningsHTML = '';

    if(meanings && meanings.length > 0) {
        meanings.forEach(function (meaning) {
            const partOfSpeech = meaning.partOfSpeech;
            const definitions = meaning.definitions;

            meaningsHTML += 
            `<div class="meaning">
            <h3>${partOfSpeech}: </h3>
            `;

            definitions.forEach(function (definition) {
                meaningsHTML += 
                `
                <p>${definition.definition}</p>
                `;
            })

            meaningsHTML += `</div>`;
        });

        meaningContainer.innerHTML = meaningsHTML;
    } else {
        meaningContainer.textContent = 'No meanings found';
    }
}

function fillAdditionalInfo(origin, phonetics) {
    additionalInfo.innerHTML = '';

    let additionalInfoHTML = '';

    //display the origin
    if(origin) {
        additionalInfoHTML += 
        `
        <p>Origin: ${origin}</p>;
        `;
    }

    //display the phonetics
    if(phonetics && phonetics.length > 0) {
        additionalInfoHTML += 
        `Phonetics:`;

        phonetics.forEach(function (phonetic) {
            const text = phonetic.text;
            const audio = phonetic.audio;

            additionalInfoHTML += 
            `<div class="phonetic">`;
            additionalInfoHTML += `<span>${text}</span>`;

            if(audio) {
                additionalInfoHTML +=
                `<audio src="${audio}" controls></audio>`;
            }

            additionalInfoHTML += `</div>`;

        });
    }

    additionalInfo.innerHTML = additionalInfoHTML;
}

moreInfoBtn.addEventListener('click', function () {
    additionalInfo.style.display = 'block';
})

moreInfoBtn.addEventListener('dblclick', function () {
    additionalInfo.style.display = 'none';
})

clearBtn.addEventListener('click', function () {
    wordInput.value = '';
    meaningContainer.innerHTML = '';
    moreInfoBtn.style.display = 'none';
    additionalInfo.innerHTML = '';
    additionalInfo.style.display = 'none';
})



















// moreInfoBtn.addEventListener('click', displayAdditionalInfo);

// function displayAdditionalInfo() {

//     let addInfoHTML = ``;

//     addInfoHTML += `Origin: `;

// }

// function fillInfo() {
    
// }

