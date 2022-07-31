const root = document.getElementById('root');
let characters = loadCharacters();
let arr = characters ? characters : [];

function searchCharacter(id) {
    const url = `https://rickandmortyapi.com/api/character/${id}`;
    fetch(url)
        .then((res) => {
            if (res.ok) {
                return res.json();
            } else {
                alert('Character not found');
                throw new Error('Character not found');
            }
        })
        .then((data) => {
            const characters = [data];
            let contains = containsObject(arr, data);
            if (!contains) {
                arr.push(data);
                storeCharacters(arr);
                renderResults(characters);
            } else {
                alert('Character is already in list');
            }
        })
        .catch((error) => {
            console.log(error);
        });
}

function loadMore(e) {
    e.preventDefault();
    document
        .getElementsByClassName('col-hidden')
        .slice(0, 3)
        .classList.remove('col-hidden');
    renderResults;
}

function storeCharacters(characters) {
    return localStorage.setItem('char', JSON.stringify(characters));
}

function loadCharacters() {
    return JSON.parse(localStorage.getItem('char'));
}

function containsObject(arr, data) {
    let result = arr.some((element) => {
        if (element.id === data.id) {
            return true;
        } else {
            return false;
        }
    });
    return result;
}

function removeCharacter(char) {
    let permisiionToRemove = confirm('Delete character?');
    if (permisiionToRemove) {
        for (let i = 0; i < arr.length; i++) {
            if (arr[i] === char) {
                arr.splice(i, 1);
            }
        }
        storeCharacters(arr);
        document.getElementById(`item_${char.id}`).remove();
    }
}

function showLoadMoreBtn(arr) {
    if (arr.length >= 5) {
        document.querySelector('.load-more').style.display = 'block';
    }
}

function renderResults(characters) {
    const container = document.getElementById('characters-wrap');
    characters.forEach((character) => {
        const item = document.createElement('div');
        item.className = 'char-item';
        item.classListadd = 'col col-hidden';
        item.id = `item_${character.id}`;
        item.innerHTML = `<div class="char-img">
                <img
                    src="${character.image}"
                />
            </div>
            <h3>${character.name}</h3>
            <p>${character.species}</p>
            <button id='remove_${character.id}'>Remove</button>`;
        container.prepend(item);
        showLoadMoreBtn(arr);
        const removeBtn = document.getElementById(`remove_${character.id}`);
        removeBtn.onclick = () => {
            removeCharacter(character);
        };
    });
}

window.onload = () => {
    renderResults(arr);
    const searchInput = document.getElementById('search-input');
    const searchBtn = document.getElementById('search-btn');
    searchBtn.onclick = () => {
        searchCharacter(searchInput.value);
    };
    const loadMoreBtn = document.querySelector('load-more');
    loadMoreBtn.onclick = () => {
        loadMore();
    };
};

/* Under character list I can see a Load More button if searched characters more
than five. When I click Load More button there should be displayed another five characters and autoscroll to the bottom of the page. */
