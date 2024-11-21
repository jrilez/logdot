// search-results.js
document.addEventListener('DOMContentLoaded', function () {
    const queryParam = new URLSearchParams(window.location.search).get('q');
    const resultsContainer = document.getElementById('search-results');

    if (queryParam) {
        fetch('/index.json')
            .then(response => response.json())
            .then(data => {
                const fuse = new Fuse(data, {
                    keys: ['title', 'content'],
                    threshold: 0.3,
                });

                const results = fuse.search(queryParam);
                if (results.length > 0) {
                    results.forEach(result => {
                        const item = document.createElement('div');
                        item.classList.add('search-result');
                        item.innerHTML = `
                            <div class="page-titles">
                                <a href="${result.item.url}">
                                    |--${result.item.title}
                                </a>
                            </div>
                        `;
                        resultsContainer.appendChild(item);
                    });
                } 
                
                else {
                    resultsContainer.innerHTML = 'No results found.';
                }
            })
        .catch(error => console.error('Error fetching search index:', error));
    }
});