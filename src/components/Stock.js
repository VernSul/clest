import React from 'react';
import TradingViewWidget from 'react-tradingview-widget';
import Stats from './Stats'


const Stock = (props) => {
    const data = props.stockData;

    let position = (((data.lastPrice-data.low)/(data.high-data.low))-0.50)*100;
    let style = {left: position.toString()+'%'};

    return (
        
        <div className="Stock">
        <ul><button onClick={props.changeDetailMode}>Back</button><span>{data.name}. ({data.symbol})</span></ul>
        <table>
          <tbody>
            <tr>
              <td>{data.lastPrice}</td>
              <td>{data.tradeTimestamp}</td>
              <td id="hl">{data.low}<div id="bar"><span id="dot" style={style}>&#183;</span></div>{data.high}</td>
            </tr>
            <tr>
              <th>Price</th>
              <th>Market Time</th>
              <th>Intraday High/Low</th>
            </tr>
          </tbody>
          </table>
          <button onClick={()=>props.changeGraphMode(true)}>Chart</button><button onClick={()=>props.changeGraphMode(false)}>Stat</button>
          {props.graphMode ? <div className="TradingWidget"><TradingViewWidget symbol={"NASDAQ:"+data.symbol} /></div> : <Stats stockData={data}/>}

        </div>
    )
}

export default Stock;