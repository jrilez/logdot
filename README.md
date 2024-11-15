# Logdot

Intentionally over-verbose.
<!-- ## Features -->

## Installation

```bash
# Get latest Hugo version 
# (https://github.com/gohugoio/hugo/releases)
$ wget https://github.com/gohugoio/hugo/releases/download/v0.123.6/hugo_0.123.6_linux-amd64.deb
$ sudo dpkg -i *.deb; rm -R *.deb
# 'example' is an arbitrary directory, pick whatever you want
$ hugo new site example
$ cd example
$ git clone https://github.com/jrilez/logdot.git themes/logdot
# configure hugo.toml manually or use default site:
$ cp themes/logdot/hugo.toml hugo.toml
$ hugo server
# you should be able to see the theme now http://localhost:1313
```

If you're installing/running hugo somewhere besides your localhost, you'll need an SSH tunnel
in order to access the remote host as local
```bash
ssh -L 1313:localhost:1313 user@ip_address
```
Now you should be able to open a browser to https://localhost:1313 and see your site.

## Configuration

#### Add content
To add content to your site, add a new post
```bash
/site$ hugo new posts/hello.md
```
This will create a new post in `/example/content/posts/` called `hello.md`. By default, that post
will be a draft. Open that file, add your content, and change `draft` to `false`. [Here's some
markdown syntax references](https://dillinger.io/)

#### About
To create the `about` page:
```
hugo new about/index.md
```

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
