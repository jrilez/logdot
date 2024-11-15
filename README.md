# Logdot

Intentionally over-verbose.
<!-- ## Features -->

## Installation

```shell
# Get latest Hugo version 
# (https://github.com/gohugoio/hugo/releases)
$ wget https://github.com/gohugoio/hugo/releases/download/v0.123.6/hugo_0.123.6_linux-amd64.deb
$ sudo dpkg -i *.deb; rm -R *.deb

# 'example' is an arbitrary directory, pick whatever you want
$ hugo new site example
$ cd example
$ git clone https://github.com/jrilez/logdot.git themes/logdot

# configure hugo.toml manually or use default site:
$ cp themes/logdot/hugo.toml .
```

## Build your site
```
# if you DON'T want to include drafts, do not add the -D key
$ hugo -D
```

To view the site, start the local development server
```
$ hugo server
Watching for changes in /example/{archetypes,assets,content,data,i18n,layouts,static,themes}
Watching for config changes in /example/hugo.toml, /home/justin/log.riley.work/themes/Logdot/hugo.toml
Start building sites …
hugo v0.138.0 linux/amd64 BuildDate=2024-11-06T11:22:34Z VendorInfo=gohugoio


                   | EN
-------------------+-----
  Pages            | 11
  Paginator pages  |  0
  Non-page files   |  0
  Static files     |  9
  Processed images |  0
  Aliases          |  0
  Cleaned          |  0

Built in 61 ms
Environment: "development"
Serving pages from disk
Running in Fast Render Mode. For full rebuilds on change: hugo server --disableFastRender
Web Server is available at http://localhost:1313/ (bind address 127.0.0.1)
Press Ctrl+C to stop
```

If you're installing/running hugo somewhere besides your localhost, you'll need an SSH tunnel
in order to access the remote host as local
```bash
ssh -L 1313:localhost:1313 user@ip_address
```
Now you should be able to open a browser to https://localhost:1313 and see your site.

## Configuration

#### Add content
To add content to your site, start by adding a new post
```bash
$ hugo new posts/hello.md
```
This will create a new post in `/example/content/posts/` called `hello.md`. By default, that post
will be a draft.

Sidenote: when you run `hugo -D`, it builds your site and includes drafts. So any posts that you didn't manually set `draft` to `false`, will still show.


[Here's some
markdown syntax references](https://dillinger.io/)

#### About
The About page will be the theme's default until you edit it. Copy the about page to your site from the theme:
```
$ cp -r themes/logdot/content/about content
```

To make a custom About page, edit `/example/content/about/_index.md`. I used [`_index`](https://gohugo.io/content-management/organization/#index-pages-_indexmd) so that it doesn't use the `single.html` template. 

Make sure to build your site when you're ready to publish.

#### Code highlighting 
To add code highlighting to your post, wrap the codeblock in highlight shortcode, where `bash`
is the language you want highlighted. [These are the supported languages](https://github.com/alecthomas/chroma?tab=readme-ov-file#supported-languages) 
for Hugo's built-in use of Chroma.
```
{{< highlight "bash" >}}
#!/bin/bash

echo "hello"
{{< /highlight >}}
```

## Credits

- minimal-bootstrap-hugo-theme ([zwbetz-gh](https://github.com/zwbetz-gh/minimal-bootstrap-hugo-theme))
- poison ([lukeorth](https://github.com/lukeorth/poison))
- dillinger.io ([@joemccann](https://twitter.com/joemccann) and [@mrtnbroder](https://twitter.com/mrtnbroder))
