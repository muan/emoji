# CONTRIBUTING

Thanks for thinking about contributing to this project. :heart_eyes:

## What do you want to do?

#### Add keywords

- Make sure the new word is not already part of the keyword array. For example: in `"hocho": ["cut", "cutlery"]`, `cut` is part of `cutlery`, so by adding `cutlery`, you should remove `cut` from the keyword array.

- Make sure that the format matches all other lines. The rules are the following:
  - Double quote the words:<br>
    :x: `'a'`<br>
    :o: `"a"`

  - A space follwing comma and colon:<br>
    :x: `"horse":["animal","unicorn"],`<br>
    :o: `"horse": ["animal", "unicorn"],`

#### JavaScript changes

The JavaScript is currently compiled from CoffeeScript, so you will need to install and develop in CoffeeScript, then include the compiled JavaScript file in your commits.

#### CSS changes

The CSS is currently compiled from SCSS, so you will need to install and develop in SASS, then include the compiled CSS file in your commits.

## Coding Style

When in doubt, follow https://github.com/styleguide.

## Development

To run emoji locally, grab [Foreman](https://ddollar.github.io/foreman/) and run it from the project root:

`foreman start`

This will do the following:

- Start sass to compile the stylesheets and watch for changes.
- Start coffeescript to compile the javascripts and watch for changes.
- Start WEBrick to serve the site.

Once foreman is running you can visit http://localhost:4001 to view the site.

When you're done, press `ctrl + c` to stop everything.

## Commiting, sending the pull request

- It's preferred that when adding a keyword to one specific emoji, you use that emoji or a relevant emoji as the commit message. For example: [`2a34a84`](https://github.com/muan/emoji/commit/2a34a84576ec1565587bb78ff465844c835819ad)

- Make sure you have a good description in the pull request if your changes contain more than keyword changes. The rules are the following:<br>
  :x: `Update html`<br>
  :o: `Change a typo in the toggle text button`

- Include at least one emoji in your pull request description.
