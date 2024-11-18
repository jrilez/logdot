+++
title = 'How to install Hugo & configure Logdot'
date = '2024-11-18T01:11:58Z'
draft = false
+++

This guide uses `debian` and is intentionally over simplified/verbose.

## Installing Hugo

- Download the latest version
- Create your site
- Import your theme

There are several ways to install `hugo` on `debian`. The easiest is via the unofficial `apt` repo, but often it's not the latest version. Or, more importantly, not the correct version for the theme you want to use. The latest version is often best, but if you already have a theme in mind, check if they require a specific version

Logdot uses [`0.138.0`](https://github.com/gohugoio/hugo/releases/tag/v0.138.0) as of writing this. 

Determine the version you need [here](https://github.com/gohugoio/hugo/releases), install it, and then delete it (or don't, doesn't matter).

``` sh
$ wget https://github.com/gohugoio/hugo/releases/download/v0.138.0/hugo_0.138.0_linux-amd64.deb
$ sudo dpkg -i *.deb; rm -R *.deb
```

Now when you check your version, you should see something similar

``` sh
$ hugo version
$ hugo v0.138.0-ad82998d54b3f9f8c2741b67356813b55b3134b9 linux/amd64 BuildDate=2024-11-06T11:22:34Z VendorInfo=gohugoio
```

Remember that the files in your root site folder overrides your theme's files, so don't change theme files unless you have a reason, like you're making a custom theme. If you're simply using a theme and editing it, make all your changes in the root site.

Now create your site

``` sh
$ hugo new site example.com
Congratulations! Your new Hugo site was created in /home/user/example.com.

Just a few more steps...

1. Change the current directory to /home/user/example.com.
2. Create or install a theme:
   - Create a new theme with the command "hugo new theme <THEMENAME>"
   - Or, install a theme from https://themes.gohugo.io/
3. Edit hugo.toml, setting the "theme" property to the theme name.
4. Create new content with the command "hugo new content <SECTIONNAME>/<FILENAME>.<FORMAT>".
5. Start the embedded web server with the command "hugo server --buildDrafts".

See documentation at https://gohugo.io/.
```

Switch to your site's directory, clone Logdot and copy the theme's default `hugo.toml` config to your root site

``` sh
$ cd example.com
$ git clone https://github.com/jrilez/logdot.git themes/logdot
$ cp themes/logdot/hugo.toml .
```

Now build your site. The `-D` flag will publish all drafts, so make sure there's nothing you don't want published if it's public facing. Though Logdot has `draft` set to false for most things.

``` sh
$ hugo -D
Start building sites …
hugo v0.138.0-ad82998d54b3f9f8c2741b67356813b55b3134b9 linux/amd64 BuildDate=2024-11-06T11:22:34Z VendorInfo=gohugoio


                   | EN
-------------------+-----
  Pages            | 13
  Paginator pages  |  0
  Non-page files   |  0
  Static files     |  9
  Processed images |  0
  Aliases          |  0
  Cleaned          |  0

Total in 76 ms
```

At this point, you would have to set up something like `nginx` to point to the `public` folder if you wanted your site to be reachable at your public domain, `example.com` in this case. More on that later. For now, just start the development server. This way, we can look at the site and our changes + add content.

``` sh
$ hugo server
Watching for changes in /home/user/example/{archetypes,assets,content,data,i18n,layouts,static,themes}
Watching for config changes in /home/user/example/hugo.toml, /home/user/example/themes/logdot/hugo.toml
Start building sites …
hugo v0.138.0-ad82998d54b3f9f8c2741b67356813b55b3134b9 linux/amd64 BuildDate=2024-11-06T11:22:34Z VendorInfo=gohugoio


                   | EN
-------------------+-----
  Pages            | 13
  Paginator pages  |  0
  Non-page files   |  0
  Static files     |  9
  Processed images |  0
  Aliases          |  0
  Cleaned          |  0

Built in 86 ms
Environment: "development"
Serving pages from disk
Running in Fast Render Mode. For full rebuilds on change: hugo server --disableFastRender
Web Server is available at http://localhost:1313/ (bind address 127.0.0.1)
Press Ctrl+C to stop
```

By default hugo uses port 1313, so now if you open your web browser and go to `https://localhost:1313`, you should see Logdot

## Configure Logdot

- Config break down
- Create your first post
- Edit your about page

### Config breakdown

Many site-wide settings like name, navigation, social media buttons, etc are configured in a themes config file, in Logdot's case it's `hugo.toml`.

I'm only breaking down relevant settings

``` toml
baseURL = 'https://example.org/'
languageCode = 'en-us'
title = 'Log.'

theme = 'logdot'
```

- title
    - This is the page title, it's what you see in the browser tab that's opened to your site. With Logdot, it's concatenated with the content title in `/themes/logdot/layouts/partials/head.html`
- theme
    - This has to match the name of the theme's directory in `themes`

Logdot's nav is setup in the config file

``` toml
[menu]
  [[menu.nav]]
  name = "posts"
  url = "/posts"
  weight = "1"
  [[menu.nav]]
  name = "about"
  url = "/about"
  weight = "2"
```
- name
    - The display name of the link
- url
    - The link's `href` attribute
- weight
    - The order the link is displayed

``` toml
[params]
  name = 'log://'
```

- name
    - The site name displayed in the upper-right corner of the sidebar


The `socials` section is pretty self-explanatory; just uncomment and set the links to your personal social handles. These are tied back to `themes/logdot/layouts/partials/socials.html`. It creates an `.svg` in the shape of the desired logo. **All credit to [lukeorth](https://github.com/lukeorth/poison)**

### Create your first post

``` bash
$ hugo new posts/test.md
```

This creates a new post in your root site content, you can find and edit it at `content/posts/test.md`

The section at the top is called [`front matter`](https://gohugo.io/content-management/front-matter/) and it comes from `themes/logdot/archetypes/posts.md`. 

You can do a lot with `front matter`, but we're going to focus on the basics:
``` toml
title: "Test"
draft: false
```

- title
    - The title is set automatically based on the name of the post's file, i.e if you did

        ```
        hugo new posts/this-is-a-test.md
        ```
    
        Then you'd see `title: This Is a Test`
- draft
    - The draft setting is really based your setup. The important thing to keep in mind is that when you build your site, if you use the `-D` key, it will publish all posts even if their `draft` setting is true. Logdot's `archetypes/posts.md` creates posts with draft set to false by default, so keep that in mind.

### About page

The `about` page already exists by default and is located in `themes/logdot/content/about.md`. But as mentioned earlier, you don't want to directly edit theme files, so create a new version for yourself.

``` sh
$ hugo new about.md
```

Make the changes you'd like, and then rebuild the site and start the development server

``` sh
$ hugo -D; hugo server
```

You should now see any further changes update live with the development server running.

If you'd like need a guide on manually setting up a `hugo` site on your own web server using `nginx`, check out my write [here]().