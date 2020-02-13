# Saggezza Team Project

Team project by Team20 at Newcastle University for client Saggezza

# Git Workflow

Please follow this guide to setup your Repository correctly, any issues please try and sort them with Google, otherwise please contact Oliver.

## Prerequisites

- [Git](https://git-scm.com/downloads) or Git-bash for Windows
- [VS-Code](https://code.visualstudio.com/download) Ideally
- [Git-flow](https://github.com/nvie/gitflow/wiki/Installation) To help with the Git Workflow

## Setup

Clone the repo with the command, this will create a _directory_ in the current folder you are in

```bash
$ git clone https://git.oliverbutler.uk/olly/CSC2022-Saggezza.git
```

_Note_: This may ask for authentication, either enter your Git username/password or generate an Access [Key](https://docs.gitlab.com/ee/ssh/)

## How it works

![Demo image](<https://wac-cdn.atlassian.com/dam/jcr:2bef0bef-22bc-4485-94b9-a9422f70f11c/02%20(2).svg?cdnVersion=810>)

Instead of a single `master` branch, this workflow uses _two branches_ to record the history of the project. The `master` branch stores the official release history, and the `develop` branch serves as an integration branch for features. It's also convenient to tag all commits in the `master` branch with a version number.

TLDR: Two branches, you can switch between, all modifications occur to the `develop` branch, then you merge changes to `master` when we have made enough progress to warrant updating the `master`.

## Feature Branches

![Feature image](<https://wac-cdn.atlassian.com/dam/jcr:b5259cce-6245-49f2-b89b-9871f9ee3fa4/03%20(2).svg?cdnVersion=810>)

Each new feature should reside in its own branch, which can be [pushed to the central repository](https://www.atlassian.com/git/tutorials/syncing/git-push) for backup/collaboration. But, instead of branching off of `master`, feature branches use `develop` as their parent branch. When a feature is complete, it gets [merged back into develop](https://www.atlassian.com/git/tutorials/using-branches/git-merge). Features should never interact directly with `master`.

Note that feature branches combined with the `develop` branch is, for all intents and purposes, the Feature Branch Workflow. But, the Gitflow Workflow doesn’t stop there.

Feature branches are generally created off to the latest `develop` branch.

### Creating a feature branch

Without Git-flow:

```shell
$ git checkout develop
$ git checkout -b feature_branch
```

With Git-flow:

```shell
$ git flow feature start feature_branch
```

_Note_: "feature_branch" is the name you would choose for a feature.

### Finishing a feature branch

When you’re done with the development work on the feature, the next step is to merge the feature_branch into `develop`.

Without Git-flow:

```shell
$ git checkout develop
$ git merge feature_branch
```

With Git-flow:

```shell
$ git flow feature finish feature_branch
```

## Release Branches

![Release Branches](<https://wac-cdn.atlassian.com/dam/jcr:a9cea7b7-23c3-41a7-a4e0-affa053d9ea7/04%20(1).svg?cdnVersion=810>)

Once `develop` has acquired enough features for a release (or a predetermined release date is approaching), you fork a `release` branch off of `develop`. Creating this branch starts the next release cycle, so no new features can be added after this point—only bug fixes, documentation generation, and other release-oriented tasks should go in this branch. Once it's ready to ship, the `release` branch gets merged into `master` and tagged with a version number. In addition, it should be merged back into `develop`, which may have progressed since the release was initiated.

Using a dedicated branch to prepare releases makes it possible for one team to polish the current release while another team continues working on features for the next release. It also creates well-defined phases of development (e.g., it's easy to say, “This week we're preparing for version 4.0,” and to actually see it in the structure of the repository).

Making `release` branches is another straightforward branching operation. Like feature branches, `release` branches are based on the `develop` branch. A new `release` branch can be created using the following methods.

Without Git-flow:

```shell
$ git checkout develop
$ git checkout -b release/0.1.0
```

With Git-flow:

```shell
$ git flow release start 0.1.0
Switched to a new branch 'release/0.1.0'
```

Once the `release` is ready to ship, it will get merged it into `master` and `develop`, then the `release` branch will be deleted. It’s important to merge back into develop because critical updates may have been added to the `release` branch and they need to be accessible to new features. If your organization stresses code review, this would be an ideal place for a pull request.

To finish a `release` branch, use the following methods:

Without Git-flow:

```shell
$ git checkout master
$ git merge release/0.1.0
```

With Git-flow:

```shell
$ git flow release finish '0.1.0'
```

## The Overall Flow

1. A `develop` branch is created from `master`
2. A `release` branch is created from `develop`
3. Feature branches are created from `develop`
4. When a feature is complete it is merged into the `develop` branch
5. When the `release` branch is done it is merged into `develop` and `master`
6. If an issue in master is detected a hotfix branch is created from `master`
7. Once the `hotfix` is complete it is merged to both `develop` and `master`

## _Things Not To Do_

- Push changes directly to the master branch
- Approve your own pull requests.
- Never commit any keys or private data to the repository; anything you commit stays in the commit history by nature (git is version control). It is very hard to erase things from a git history.
