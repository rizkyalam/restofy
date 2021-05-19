import data from '@databases/DATA.json';

const { restaurants } = data;
const index = {
    offset: 0,
    limit: 2,
    length: restaurants.length - 1
}

/**
 * Element for creating list item card of explore data restaurant
 * 
 * @param {*} data passing from data of restaurant
 * @returns string
 */
const elmListCard = (data) => {
    return `
    <div class="list-card">
        <div class="list-card-header">
            <img src="${data.pictureId}" alt="${data.name} from ${data.city}">
        </div>
        <div class="list-card-body">
            <h3 class="list-card-title">${data.name}</h3>
            <h4 class="list-card-location">
                <i class="fas fa-map-marker-alt"></i>
                <span>${data.city}</span>
            </h4>
            <h5 class="list-card-rating">
                <i class="fas fa-star"></i>
                <span>${data.rating}</span>
            </h5>
            <p class="list-card-text">${data.description}</p>
        </div>
    </div>`;
}

/**
 * Show list data restaurant per items
 */
const showListData = () => {
    const list = document.querySelector('.explore-list');

    for (let i = index.offset; i <= index.limit; i++) {
        list.innerHTML += elmListCard(restaurants[i]);
        
        if (i === index.limit) {
            index.offset = i >= index.length ? i : ++i;
        }
    }    
}

/**
 * Logic for add more items data restaurant when load more button is clicked
 */
const addMoreItemsData = () => {
    if (index.offset < index.length) {
        if ( index.limit < index.length) {
            let tmpLimit = index.limit + 3;
            let total = tmpLimit - index.length;

            index.limit = total === 1 || total === 2 ? tmpLimit - total : tmpLimit;
    
            showListData();
        }
    }
}

const loadMoreData = () => {
    const button = document.querySelector('.explore-more--btn');

    button.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();

        addMoreItemsData();
                
        // deleting button with parent element
        if (index.offset === index.length) {
            document.querySelector('.explore-more').remove();
        } 
    });
}

const loadExplore = () => {   
    showListData();
    loadMoreData();
}

export default loadExplore();