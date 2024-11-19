// search.js
document.addEventListener('DOMContentLoaded', function () {
    const queryParam = new URLSearchParams(window.location.search).get('q');
    const clearButton = document.getElementById('clear-search');
    const searchInput = document.getElementById('search');
    const searchForm = document.getElementById('search-form');
    const resultsContainer = document.getElementById('search-results');

    fetch('/index.json')
        .then(response => response.json())
        .then(data => {
            const fuse = new Fuse(data, {
                keys: ['title', 'content'],
                threshold: 0.3,
            });
            
            clearButton.addEventListener('click', function () {
                searchInput.value = '';
                resultsContainer.innerHTML = '';
                searchInput.focus();
            });

            searchInput.addEventListener('keydown', function (event) {
                if (event.key === 'Escape') {
                    searchInput.value = '';
                    resultsContainer.innerHTML = '';
                    searchInput.focus();
                }
            });

            searchForm.addEventListener('submit', function (event) {
                event.preventDefault();
                const query = searchInput.value.trim();
                if (query) {
                    window.location.href = `/search?q=${encodeURIComponent(query)}`;
                }
            });
        })
        .catch(error => console.error('Error fetching search index:', error));
});
