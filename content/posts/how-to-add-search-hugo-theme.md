---
title: "How to add Search to your Hugo theme"
date: 2024-11-19T03:47:03Z
draft: false
layout: "posts"
---

First, add this to your `hugo.toml` config. When you build your site, this will generate a JSON version of the homepage in the root site `public` directory as `index.json`:

``` toml
# hugo.toml
[outputs]
home = ["JSON"]
```

Then, configure what aspects of your site are outputted to `public/index.json` by creating `layouts/index.json` in your theme. For Logdot, it only outputs the `title` and `url`.

``` toml
# layouts/index.json
{{- $.Scratch.Add "index" slice -}}
{{- range .Site.RegularPages -}}
  {{- if eq .Section "posts" -}}
    {{- $.Scratch.Add "index" (dict "title" .Title "url" .Permalink) -}}
  {{- end -}}
{{- end -}}
{{- $.Scratch.Get "index" | jsonify -}}
```

Now build your site with `hugo -D` and you should have `public/index.json` in your root site.

Create the `/search` page to render your search results

``` md
<!-- content/search/_index.md -->
+++
title = 'results'
draft = false
+++
```

Create the search form as a reusable partial component.

``` html
<div class="search-wrapper">
    <form action='{{ with .GetPage "/search" }}{{.Permalink}}{{end}}' method="get" id="search-form" role="search" aria-label="Site Search">
        <div class="search-input-wrapper">
            <input 
                type="text" 
                id="search" 
                placeholder="search..." 
                autocomplete="off" 
                aria-label="Search input" 
            />
            <button type="button" id="clear-search" aria-label="Clear search">
                &times;
            </button>
        </div>
    </form>
    <div id="search-results" class="search-results"></div>
</div>
```

Call it throughout your site with 
```
{{ partial "search.html" . }}
```

Logdot uses it in `layouts/_default/list.html`.

Now we have to create the `/search` page template (different from the `/search` page itself from above) to render our search results.

```html
<!-- layouts/search/list.html -->
 {{ define "main" }}
    {{ partial "search.html" . }}
    <div id="search-results" class="search-results"></div>
    <script src="/js/search-results.js"></script>
{{ end }}
```

This defines `/search`'s `main` block, invokes the `search.html` partial and then renders the search results.

Next we need to define the scripts for handling the search inquiry and rendering the results. Create two files in your themes `static` folder:

`search.js`
```js
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
```

and `search-results.js`:
```js
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
                            <a href="${result.item.url}">
                                <h2>|--${result.item.title}</h2>
                            </a>
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
```

Finally, add the `fusejs` and `search` script to your themes `layouts/partials/head.html` file

```html
<script src="/js/search.js"></script>
<script src="https://cdn.jsdelivr.net/npm/fuse.js/dist/fuse.min.js"></script>
```

For good measure, rebuild your site and test your search functionality.