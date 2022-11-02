window.addEventListener('DOMContentLoaded', () => {
    function getResoursce() {

        addLoader()

        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': '64874b62c0msh774523add9660dfp134e9bjsnd3c372da7708',
                'X-RapidAPI-Host': 'aerodatabox.p.rapidapi.com'
            }
        };

        fetch(`https://aerodatabox.p.rapidapi.com/airports/search/term?q=${inputValue}&limit=10`, options)
            .then(data => data.json())
            .then(data => createCards(data.items))
            .catch(err => console.error(err));
    }

    let inputField = document.querySelector('input');
    let searchButton = document.querySelector('button');
    let inputValue;
    let searchResult = document.querySelector('.search-result');

    searchButton.addEventListener('click', getInputValue);
    inputField.addEventListener('keypress', onEvent);

    function addLoader() {
        let loader = createTagHtml('p', 'loader');
        loader.textContent = 'Loading search results...'
        searchResult.appendChild(loader);
    }

    function getInputValue() {
        searchResult.replaceChildren();
        if (inputField.value.length < 3) {
            createAndPostErrorMessage('Please enter minimum 3 characters for search');
        } else {
            inputValue = inputField.value;
            inputField.value = '';
            return getResoursce(inputValue);
        }
    }

    function onEvent(event) {
        if (event.key === "Enter") {
            event.preventDefault();
            getInputValue();
        }
    }

    function createAndPostErrorMessage(message) {
        let errorMessage = createTagHtml('p', 'error-message');
        errorMessage.innerHTML = message
        searchResult.appendChild(errorMessage);
        return errorMessage;
    }

    function createTagHtml(tagName, className, tagContent) {
        let tag = document.createElement(tagName);
        if (className) {
            tag.className = className;
        }
        if(tagContent) {
            tag.innerHTML = tagContent;
        }
        return tag;
    }

    function createTableHeader() {
        let tableHeader = createTagHtml('div', 'table-head');
        let tableHeadItem1 = createTagHtml('div', 'table-head__item item', 'Airport Name');
        let tableHeadItem2 = createTagHtml('div', 'table-head__item item', 'ICAO');
        let tableHeadItem3 = createTagHtml('div', 'table-head__item item', 'Location');
        let tableHeadItem = createTagHtml('div', 'location','' );
        let tableHeadSubTitle1 = createTagHtml('p', '','Lon' );
        let tableHeadSubTitle2 = createTagHtml('p', '','Lat' );
        let tableHeadSubTitleSpan1 = createTagHtml('span','' ,'gitude' );
        let tableHeadSubTitleSpan2 = createTagHtml('span', '','itude' );

        tableHeadItem3.append( tableHeadItem);
        tableHeader.append(tableHeadItem1, tableHeadItem2, tableHeadItem3);
        tableHeadItem.append(tableHeadSubTitle1, tableHeadSubTitle2);
        tableHeadSubTitle1.append(tableHeadSubTitleSpan1);
        tableHeadSubTitle2.append(tableHeadSubTitleSpan2);

        return tableHeader;

    }

    function createCards(response) {
        searchResult.replaceChildren();
        let airportCards = createTagHtml('div', 'airport-cards');
        if(response.length === 0) {
            createAndPostErrorMessage(`You searched for "${inputValue}". No results found`)
        } else {

            let tableHeader = createTableHeader();
            airportCards.append(tableHeader);

            searchResult.appendChild(airportCards);

            response.forEach(item => {

                let card = createTagHtml('div', 'airport-card');

                card.innerHTML = `
                  <div class="airport-card__item item">
                        ${item.name}
                  </div>
                  <div class="airport-card__item item">
                        ${item.icao}
                  </div>
                  <div class="airport-card__item item">
                        <div class="location">
                            <p>${item.location.lat}</p>
                            <p>${item.location.lon}</p>
                        </div>
                  </div>
            `;
                airportCards.appendChild(card);
            });
        }
    }
});
