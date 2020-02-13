# ICUC Reporting Assignment

Today you will be creating a graph that will display the number of reactions a 'post' has recieved!

This project uses [Preact](https://preactjs.com/), [D3.js](https://d3js.org/), [Typescript](https://www.typescriptlang.org/), [Jest](https://jestjs.io/) and Sass

The final graph should look something like this:

![Alt text](./src/assets/graph.png?raw=true "Reactions")

### Before you get started

This project uses preact-cli. In order to run this project you must install the preact-cli package from npm. You can find out more about preact-cli [here](https://github.com/preactjs/preact-cli).

To install preact-cli globally use: `npm install -g preact-cli`

To run the dev server use: `npm run dev`

### What we want

1. Create a service that will provide your component(s) with the mock data provided.

2. Recreate the reactions bar graph using d3.js and the provided reaction svgs.

3. Order the bar graph from largest to smallest.

4. Center the graph on the page. (bonus: make the graph dynamically fill the page)

5. Ensure the graph has proper axis titles and increments.

6. Create and structure any stylesheets you may need.

7. Test your code.

That's it!


### Here is the mock data

```
'data': [
    { 'like': 420, 'color': 'blue' },
    { 'love': 269, 'color': 'pink' },
    { 'haha': 326, 'color': 'yellow' },
    { 'wow': 14, 'color': 'orange' },
    { 'sad': 4, 'color': 'lightblue' },
    { 'angry': 6, 'color': 'red' }
]
```

The reactions svg are located in `src/assets/img`
