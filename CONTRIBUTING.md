# CONTRIBUTING

Thanks for thinking about contributing to this project. :heart_eyes:

## Adding keywords

- Make sure the new word is not already part of the keyword array. For example: in `"hocho": ["cut", "cutlery"]`, `cut` is part of `cutlery`, so by adding `cutlery`, you should remove `cut` from the keyword array.

- Make sure that the format matches all other lines. The rules are the following:
  - Double quote the words:<br>
    :x: `'a'`<br>
    :o: `"a"`

  - A space follwing comma and colon:<br>
    :x: `"horse":["animal","unicorn"],`<br>
    :o: `"horse": ["animal", "unicorn"],`

## Commiting, sending the PR

- It's preferred if when you are adding a keyword to one specific emoji, use that emoji, or a relevant emoji as the commit message. For example: [`2a34a84`](https://github.com/muan/emoji/commit/2a34a84576ec1565587bb78ff465844c835819ad)

- Make sure you have a good description in the pull request if your changes contain more than keyword changes.<br>
  :x: `Update html`<br>
  :o: `Change a typo in the toggle text button`

- Include at least one emoji in your pull request description.

- There are [tests](https://github.com/muan/emoji/blob/gh-pages/test.js) for `emojis.json`, please do your best to fix the errors if any. You should be able to see your branch's test status on https://travis-ci.org/muan/emoji/pull_requests
