# CONTRIBUTING

Thanks for thinking about contributing to this project. :heart_eyes:

## What do you want to do?

#### JavaScript changes

Change the files in `/javascripts`.

#### CSS changes

The CSS is currently compiled from SCSS, so you will need to install and develop in SASS, then include the compiled CSS file in your commits.

## Coding Style

When in doubt, follow https://github.com/styleguide.

## Development

To run emoji locally, grab [Foreman](https://ddollar.github.io/foreman/) and run it from the project root:

`foreman start`

This will do the following:

- Start sass to compile the stylesheets and watch for changes.
- Start WEBrick to serve the site.

Once foreman is running you can visit http://localhost:4001 to view the site.

When you're done, press `ctrl + c` to stop everything.

## Commiting, sending the pull request

- Make sure you have a good description in the pull request if your changes contain more than keyword changes.<br>
  :x: `Update html`<br>
  :o: `Change a typo in the toggle text button`

- Include at least one emoji in your pull request description.
