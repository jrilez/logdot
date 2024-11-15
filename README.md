# Logdot

## Features

## Installation

```bash
# Get latest Hugo version 
# (https://github.com/gohugoio/hugo/releases)
justin@dev:~$ wget -O hugo.deb https://github.com/gohugoio/hugo/releases/download/v0.123.6/hugo_0.123.6_linux-amd64.deb
justin@dev:~$ sudo dpkg -i hugo.deb
justin@dev:~$ rm -R hugo.deb
# 'example' is an arbitrary directory, name doesn't matter
justin@dev:~$ hugo new site example
justin@dev:~$ cd example
justin@dev:~/example$ git clone https://github.com/jrilez/logdot.git themes/logdot
# handle your hugo.toml however you want, or:
justin@dev:~/example$ rm -R hugo.toml
justin@dev:~/example$ cp themes/logdot/hugo.toml hugo.toml
justin@dev:~/example$ hugo server
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
justin@dev:~/site$ hugo new posts/hello.md
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

echo "Hello, world!"
{{< /highlight >}}
```

## Credits

- minimal-bootstrap-hugo-theme ([zwbetz-gh](https://github.com/zwbetz-gh/minimal-bootstrap-hugo-theme))
- poison ([lukeorth](https://github.com/lukeorth/poison))
- dillinger.io ([@joemccann](https://twitter.com/joemccann) and [@mrtnbroder](https://twitter.com/mrtnbroder))
