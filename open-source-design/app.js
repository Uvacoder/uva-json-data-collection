/**
 * @author Gregory Wolanski <opensource@gregorywolanski.com>
 * @version 0.0.1
 */

const buildUrl = require("build-url");
const fetch = require("node-fetch");
const fs = require("fs");
const moment = require("moment");
const now = require("performance-now");
const Promise = require("bluebird");

const GITHUB_USERNAME = process.env.GITHUB_USERNAME;

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

const GITHUB_RESULTS_PER_PAGE = 100;
// 100 is the max value according to https://developer.github.com/v3/search/
// GitHub Search API provides up to 1,000 results for each search

const TAGS = ["design", "ux", "ui"];

const LAST_YEAR = moment()
    .subtract(1, "year")
    .format("YYYY-MM-DD");

const start = now();

class OpenSourceDesign500List {
    constructor() {
        if (typeof GITHUB_USERNAME === "undefined" || typeof GITHUB_TOKEN === "undefined") {
            console.log(
                "usage: GITHUB_USERNAME=x GITHUB_TOKEN=y node app.js\n\nexample: GITHUB_USERNAME=gregorywolanski GITHUB_TOKEN=0x938b817e295e3af1c50aa81f293571566eb78c node app.js\n\nPlease define GITHUB_USERNAME and GITHUB_TOKEN.\n\nGet the username here: https://github.com\n\nGet the token here: https://github.com/settings/tokens"
            );
        } else {
            this.repositories = [];

            this.counters = {
                repositories: 0,
                issues: {
                    all: 0
                }
            };

            TAGS.map(tag => {
                this.counters.issues[tag] = {
                    fetched: 0
                };
            });

            this.fetchOptions = {
                headers: {
                    Accept: "application/vnd.github.v3+json",
                    Authorization:
                        "Basic " +
                        new Buffer(unescape(encodeURIComponent(`${GITHUB_USERNAME}:${GITHUB_TOKEN}`))).toString(
                            "base64"
                        ),
                    "User-Agent": "node.js"
                }
            };

            this.getSearchResults()
                .then(this.getRepositoriesDetails.bind(this))
                .then(this.sortData.bind(this))
                .then(this.saveData.bind(this))
                .then(this.showStats.bind(this))
                .then(this.showList.bind(this));
        }
    }

    buildGitHubURL({ tag, updated = `>${LAST_YEAR}` }) {
        const url = buildUrl("https://api.github.com", {
            path: "search/issues",
            queryParams: {
                q: `in:issues label:${tag} state:open updated:${updated} sort:updated`,
                per_page: GITHUB_RESULTS_PER_PAGE
            }
        });

        return url;
    }

    getSearchResults() {
        return Promise.map(
            TAGS,
            function(tag) {
                console.log(`Looking for issues tagged “${tag}”…`);

                return this.getSearchResultsPage(this.buildGitHubURL({ tag }), tag);
            }.bind(this),
            { concurrency: 1 } // To fit GitHub Search API rate limit
        );
    }

    getSearchResultsPage(url, tag) {
        let next;

        return fetch(url, this.fetchOptions)
            .then(function(response) {
                let links = {};

                let link = response.headers.get("Link");

                if (link) {
                    link.replace(/<([^>]*)>;\s*rel="([\w]*)"/g, function(m, uri, type) {
                        links[type] = uri;
                    });

                    next = links["next"];

                    if (url === links["last"]) {
                        next = undefined;
                    }
                }

                return response.json();
            })
            .then(
                function(json) {
                    const issues = json.items;

                    let repositories = this.repositories;

                    for (let i = 0; i < issues.length; i++) {
                        const { id, repository_url } = issues[i];

                        const repositoryIndex = repositories.findIndex(function(repository) {
                            if (repository.url === repository_url) {
                                return true;
                            }

                            return false;
                        });

                        const repositoryAlreadyAdded = repositoryIndex !== -1;

                        let issueIndex;

                        if (repositoryAlreadyAdded) {
                            issueIndex = repositories[repositoryIndex].issues.findIndex(function(issue) {
                                if (issue.id === id) {
                                    return true;
                                }

                                return false;
                            });
                        }

                        const issueAlreadyAdded = issueIndex !== -1;

                        const shouldAddIssue =
                            !repositoryAlreadyAdded || (repositoryAlreadyAdded && !issueAlreadyAdded);

                        if (typeof this.counters.issues[tag].total === "undefined") {
                            this.counters.issues[tag].total = json.total_count;
                        }

                        this.counters.issues[tag].fetched++;

                        if (shouldAddIssue) {
                            this.counters.issues.all++;

                            console.log(`Processing issue #${this.counters.issues.all}…`);

                            let issue = {
                                id
                            };

                            if (repositoryAlreadyAdded) {
                                repositories[repositoryIndex].issues.push(issue);
                            } else {
                                let repository = {};

                                repository.url = repository_url;
                                repository.issues = [];
                                repository.issues.push(issue);

                                repositories.push(repository);
                            }
                        }
                    }

                    this.repositories = repositories;

                    if (next && this.counters.issues[tag].fetched <= 900) {
                        // Delay to fit GitHub Search API rate limit
                        // https://developer.github.com/v3/search/

                        return Promise.delay(2000).then(
                            function() {
                                return this.getSearchResultsPage(next, tag);
                            }.bind(this)
                        );
                    } else {
                        if (this.counters.issues[tag].fetched < this.counters.issues[tag].total) {
                            const latestIssueIndex = issues.length - 1;

                            const latestIssue = issues[latestIssueIndex];

                            const latestIssueLastUpdate = latestIssue.updated_at;

                            const latestIssueLastUpdateFormatted = moment(latestIssueLastUpdate).format("YYYY-MM-DD");

                            return Promise.delay(2000).then(
                                function() {
                                    return this.getSearchResultsPage(
                                        this.buildGitHubURL({
                                            tag,
                                            updated: `${LAST_YEAR}..${latestIssueLastUpdateFormatted}`
                                        }),
                                        tag
                                    );
                                }.bind(this)
                            );
                        }
                    }
                }.bind(this)
            );
    }

    getRepositoriesDetails() {
        console.log(`${this.counters.issues.all} issues from ${this.repositories.length} repositories processed`);

        console.log("Looking for repository details…");

        let repositoriesURLs = this.repositories.map(function(repository) {
            return repository.url;
        });

        return Promise.map(
            repositoriesURLs,
            function(url, index) {
                return fetch(url, this.fetchOptions)
                    .then(function(response) {
                        return response.json();
                    })
                    .then(
                        function(json) {
                            const { id, full_name, url, html_url, stargazers_count } = json;

                            let repositories = Array.from(this.repositories);

                            const repositoryIndex = repositories.findIndex(function(repository) {
                                if (repository.url === url) {
                                    return true;
                                }

                                return false;
                            });

                            this.counters.repositories++;

                            console.log(
                                `Fetching details of repository #${this.counters.repositories}/${this.repositories
                                    .length} ${full_name}…`
                            );

                            if (repositories[repositoryIndex]) {
                                repositories[repositoryIndex].name = full_name;
                                repositories[repositoryIndex].url = html_url;
                                repositories[repositoryIndex].stars = stargazers_count;

                                this.repositories = repositories;
                            }
                        }.bind(this)
                    )
                    .then(function() {
                        // Delay to fit GitHub Search API rate limit
                        // https://developer.github.com/v3/search/
                        return Promise.delay(2000);
                    });
            }.bind(this),
            { concurrency: 1 } // To fit GitHub Search API rate limit
        );
    }

    sortData() {
        console.log("Sorting data…");

        let repositories = Array.from(this.repositories);

        repositories = repositories.sort((a, b) => {
            return b.stars - a.stars;
        });

        this.repositories = repositories;

        return Promise.resolve();
    }

    saveData() {
        return fs.writeFile("data.json", JSON.stringify(this.repositories), e => {
            if (e) throw e;

            return Promise.resolve();
        });
    }

    showStats() {
        const executionTimeInMiliseconds = now().toFixed(0) - start.toFixed(0);

        const executionTimeHumanized = moment.duration(parseInt(executionTimeInMiliseconds)).humanize();

        console.log(`Execution time: ${executionTimeHumanized}`);

        return Promise.resolve();
    }

    showList() {
        console.log("");
        console.log("Open Source Design 500");
        console.log("~~~~~~~~~~~~~~~~~~~~~~");

        for (let i = 0; i < 500; i++) {
            if (this.repositories[i]) {
                console.log(`${i + 1}. ${this.repositories[i]["name"]} ・${this.repositories[i]["stars"]} stars`);
            }
        }

        console.log("");
    }
}

new OpenSourceDesign500List();
