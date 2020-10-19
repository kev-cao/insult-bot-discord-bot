# insult-bot-discord-bot
A bot that insults people.

## Context
This is the second Discord bot I ever created. It reacts to a triggering command sent in the server, and insults the given name with one of the insults stored in its pool. If this is a potential recruiter looking through my repo, please pardon my French in my code. Some insults are a bit more vulgar than others.

## Features
> !insult name gender
`Name` is the name of the person to insult.

`Gender` should be `m` or `f` to signify male or female, respectively. This helps the bot choose the correct pronoun.

## How to Use
Run `npm install` to download the required NodeJS libraries.

The code can only be used if a Discord bot is created on Discord's developer website. Once created, create an `auth.json` config file that contains the unique token provided to you by Discord. The `json` file should have a key `token` that maps to the provided token.
