# Open Source Design 500

The little script behind the [Open Source Design 500](https://medium.freecodecamp.org/open-source-design-500-d6c29a689812) list.

## How It Works

This script builds a list of public GitHub repositories that have open issues labeled `ux`, `ui`, or `design` from the last 12 months, orders the repositories by the number of GitHub stars, takes the first 500, prints the list in the console, and saves the data in a JSON file. 

## Installation

This project uses [node](http://nodejs.org) and [npm](https://npmjs.com). Go check them out if you don't have them locally installed.

```sh
git clone https://github.com/gregorywolanski/open-source-design-500
cd open-source-design-500
npm install
```

## Usage

```sh
GITHUB_USERNAME=x GITHUB_TOKEN=y node app.js
```

Example:

```sh
GITHUB_USERNAME=gregorywolanski GITHUB_TOKEN=0x938b817e295e3af1c50aa81f293571566eb78c node app.js
```

Get the username here: [https://github.com](https://github.com)

Get the token here: [https://github.com/settings/tokens](https://github.com/settings/tokens)

The script prints the current Open Source Design 500 list to the console and saves the data behind it to a `data.json` file.

Warning: It takes around 3 hours to extract the data from GitHub due to the limits of the GitHub API. 

## Built With

- [bluebird](https://github.com/petkaantonov/bluebird/) – A promise library
- [build-url](https://github.com/steverydz/build-url) – A library that builds a URL, including it's path, query parameters and fragment identifier
- [moment](https://github.com/moment/moment/) – A date library 
- [node-fetch](https://github.com/bitinn/node-fetch) – `window.fetch` for Node.js
- [performance-now](https://github.com/braveg1rl/performance-now) – `window.performance` for Node.js
- [prettier](https://github.com/prettier/prettier) – An opinionated code formatter

## Author

[Gregory Wolanski](https://www.gregorywolanski.com)

## License

MIT

See ``LICENSE`` for more information.
