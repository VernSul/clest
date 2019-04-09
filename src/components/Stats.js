import React from 'react';

const Stats = (props) => {
    return (
        <div className="Stats">
            <ul><b>Year High: </b>{props.stockData.fiftyTwoWkHigh}</ul>
            <ul><b>Year Low: </b>{props.stockData.fiftyTwoWkLow}</ul>
            <ul><b>Volume: </b>{props.stockData.volume}</ul>
            <ul><b>Average Daily Volume: </b>{props.stockData.avgVolume}</ul>
            <ul><b>Shares Outstanding: </b>{props.stockData.sharesOutstanding}</ul>
            <ul><b>Annual Dividend Rate: </b>{props.stockData.dividendRateAnnual}</ul>
        </div>

    )
};

export default Stats