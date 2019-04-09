# Instructions:
Install the node modules:

```
npm install
```

Run the app:

```
npm run start
```

# Evaluation:

I used the create-react-app module to quickly initiate the project. I started doing some research to fnd the right data provider API. The request parameters are injected in the url to bypass CORS policy restrictions. The market time needs to be reformatted from UTC to a am/pm 12 hours format. To pass the stock data of the detailed view, we just store its index as a reference of its object in the companies array. We used the Trading view React component to display the trading chart.

I spent 4 hours on this exercise. It was a bit tricky to shape the High/Low cursor with different HTML elements. I am not entirely satisfied by my solution which works but is a bit hacky. At the same time I wanted to build it from scratch and not use a front end library. I enjoyed architecting the way the stock data are manipulated and passed through the components. I tried to minimize the amount of data stored in the state. In order to have just one API call per mounting, we need to store the data twice, one in its raw version, one the way it is displayed on the screen. This is useful for the sorting features and date reformating.

I would use Jest and Enzyme to test the React App and mock the browser behaviour.