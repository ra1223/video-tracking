# Video Tracking App

I was given the task to create a full stack application that'd be able to add videos and get relevant information about them. The frontend uses `react.js` and the backend uses `node.js` while use `Typescript`.

### Instructions to get setup

Have the pre-requisite node.js and npm install: https://nodejs.org/en/download/

After having `node.js` and `npm` installed, clone the repo to your computer and change into the repo directory:

```text
git clone https://github.com/Raul-Alvarez/video-tracking.git
cd message-board
```

Install all the dependecies:

```text
npm run install:all
```

Run the app:

```text
npm run dev
```

Go to http://localhost:3000 to get started

If you want to remove all builds and node_modules, run:

```text
npm run clean:all
```

### Notes on the structure of the app

The entry point for the frontend would be in `src/client/src/App.tsx`.

The entry point for the backend would be in `src/server/src/index.ts`.