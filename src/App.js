import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import Stock from './components/Stock';

class App extends Component {
  constructor(props){
    super(props);

    this.state = {
      companies: [],
      detailMode: false,
      graphMode: true,
      displayed: []
    }
  }

  //Search function triggered when the user starts typing.

  search = (e) => {
    let displayed = [];
    let pref = e.target.value.toLowerCase();
    this.state.companies.forEach(x => {
      if(x.symbol.toLowerCase().startsWith(pref) || x.name.toLowerCase().startsWith(pref)) displayed.push(x);
    })
    this.setState( {displayed} )

  }


  //Inside the detailed view: Switch between chart view and stats view
  changeGraphMode = (bool) => {
    console.log(bool)
    this.setState( {graphMode:bool} )
  }

  //Switch between detailed view and global view.
  //Because setState is aynchronous changeDetailMode is declared as a callback of clickHandler.

  //Gather the right data for the detailed view.
  clickHandler = (i) => {
    this.setState( {indexStock: i}, this.changeDetailMode)
  }

  changeDetailMode = () => {
      this.setState( {detailMode:!this.state.detailMode} )
    }

  //setState() in componentDidMount triggers an extra rendering but update before the screen shows the intermediary state (companies:[])
  async componentDidMount(){

    let resp = await axios.post('https://marketdata.websol.barchart.com/getQuote.json?apikey=984abe30de21f4fb5c7e8431eca49950&symbols=AAPL%2CGOOG%2CTSLA%2CFB%2CNFLX%2CMSFT%2CAMZN&fields=fiftyTwoWkHigh%2CfiftyTwoWkLow%2CsharesOutstanding%2CdividendRateAnnual%2CavgVolume');
    let companies = resp.data.results.map(x =>{
      x.tradeTimestamp = this.reformatTime(x.tradeTimestamp);
      x.marketCap = x.sharesOutstanding * x.lastPrice
      return x;
    });
    this.setState( {companies, displayed: companies} );
  }

  //Sort Stocks after different criteria
  sort = (e) => {
    let criteria = e.target.value;
    let displayed = this.state.companies.sort((a, b)=>{
      return b[criteria] - a[criteria]
    });
    this.setState( {displayed} );

  }

  //Reformat UTC date into EST am/pm

  reformatTime = (date) => {
    date = new Date(date);
    let hours = date.getHours() + 1;
    let minutes = JSON.stringify(date).slice(18,20);
    if(hours > 12){
      hours = hours - 13;
      return hours+' : '+minutes+' pm EST'
    } else {
      return hours-1 +' : '+minutes+' am EST'
    }

  }

  render() {
    let companiesDisplayed = this.state.displayed.map((x, i) => {

      // Dynamic styling for the H/L cursor
      let position = (((x.lastPrice-x.low)/(x.high-x.low))-0.50)*100;
      let style = {left: position.toString()+'%'};

      return (
        <div key={x.name} id={i} className="Company" onClick={(e) => this.clickHandler(i)}>
        <table>
          <tbody>
            <tr>
              <th>Symbol</th>
              <th>Price</th>
              <th>Market Time</th>
              <th>Intraday High/Low</th>
            </tr>
            <tr>
              <td>{x.symbol}</td>
              <td>{x.lastPrice}</td>
              <td>{x.tradeTimestamp}</td>
              {/* High/Low cursor */}
              <td id="hl">{x.low}<div id="bar"><span id="dot" style={style}>&#183;</span></div>{x.high}</td>
            </tr>
          </tbody>
          </table>
        </div>
      )
    })

    return (
      <div className="App">
        <div className="Header">
          <input placeholder="Search..." onChange={this.search}></input>
        </div>

        <select className="Sort" onClick={this.sort}>
          <option value="percentChange">Gainer</option>
          <option value="marketCap">Market Cap</option>
          <option valule="volume">Volume</option>
          <option value="dividendRateAnnual">Dividend Rate</option>
        </select>
        {this.state.detailMode ? <Stock stockData={this.state.companies[this.state.indexStock]} graphMode={this.state.graphMode} setState={this.setState} changeGraphMode={this.changeGraphMode} changeDetailMode={this.changeDetailMode}/>: companiesDisplayed}
      </div>
    );
  }
}

export default App;
