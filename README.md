## MangaHunter API

MangaHunter API, a nodejs/express RESTful API that parses, stores and serves manga/comic metadata

## Project Status

This project is currently in development. The API is built to work with an additional client app that consumes resources 
see []().

## Installation and Setup Instructions

Clone down this repository. You will need `node` and `yarn` installed globally on your machine.  

Installation:

`yarn`  

To Run Lint (eslint):  

`yarn lint`  

To Run Test Suite:  

`yarn test`  

To Start Server:

`yarn start`  


## Reflection

This was actually a personal project I wanted to work on since long time with the goal of putting into practice all the 
knowledge I have gathered as a software engineering student all while working on something that I enjoy doing in spare 
time which is reading manga.

This project is the part of the MangaHunter toolchain that parses manga metadata from connectors/sources, caches them 
in a database and serves the data to a client app. 

One of the main challenges I ran into was Authentication. This lead me to spend a few days on a research spike into 
OAuth, Auth0, and two-factor authentication using Firebase or other third parties. Due to project time constraints, 
I had to table authentication and focus more on data visualization from parts of the API that weren't restricted to 
authenticated users.

The technologies used in this project's implementation are `Nodejs`/`Express` and `Typescript` as well as some of 
NPM packages that facilitates some tasks. To minimize boilerplate and package-hell, I try to manually implement utils 
and test them first, if the scope of implementation grows wider, and a lot of edge cases come to surface then I try to 
pick a minimalistic battle-tested package to make the task easier all while learning the possible weak points and issues 
that might arise 

One of the main goals of this project is to manage to see and touch on the various project development steps and phases,
from planning, development, testing, CI/CD to deployment. I will try to maintain a Trello board updated on all the 
tasks `TODO`/`DONE`...etc.


#### Guiding questions
  - What was the context for this project? (ie: was this a side project? was this for Turing? was this for an experiment?)
  - What did you set out to build?
  - Why was this project challenging and therefore a really good learning experience?
  - What were some unexpected obstacles?
  - What tools did you use to implement this project?
      - This might seem obvious because you are IN this codebase, but to all other humans now is the time to talk about 
      why you chose webpack instead of create react app, or D3, or vanilla JS instead of a framework etc. Brag about your 
      choices and justify them here.
