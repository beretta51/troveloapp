# troveloapp

The website of Trovelo, served by GitHub Pages at https://troveloapp.com.

- `index.html`: the home page, with its styles and animations inside.
- `press/`: the press kit page and its downloads.
- `help/`: Trovelo Help.
- `support/`: the support page.
- `privacy/index.html`: generated. Edit `policies/privacy.html` and run `python3 scripts/build_privacy.py`.
- `images/trovelo/`, `fonts/`: shared by every page.
- `404.html`: shown for any address that doesn't exist.
- `site.css`, `site.js`: the menu at the top and the footer, the same on every page. Their markup is repeated in each page, so a change to a link goes in all of them.
- `page.css`: the look of the text pages (support, privacy, 404).

These pages used to live at pinilloslab.com/trovelo, which now forwards here.
