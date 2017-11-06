/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import axios from 'axios'
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './App.css';
import './App.css';

class Home extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      disable: false,
      ticker: '',
      target: '',
      stopLoss: '',
      pairs: ['BTC-1ST', 'BTC-2GIVE', 'BTC-ABY', 'BTC-ADA', 'BTC-ADT', 'BTC-ADX', 'BTC-AEON', 'BTC-AGRS', 'BTC-AMP', 'BTC-ANT', 'BTC-APX', 'BTC-ARDR', 'BTC-ARK', 'BTC-AUR', 'BTC-BAT', 'BTC-BAY', 'BTC-BCC', 'BTC-BCY', 'BTC-BITB', 'BTC-BLITZ', 'BTC-BLK', 'BTC-BLOCK', 'BTC-BNT', 'BTC-BRK', 'BTC-BRX', 'BTC-BSD', 'BTC-BTCD', 'BTC-BTS', 'BTC-BURST', 'BTC-BYC', 'BTC-CANN', 'BTC-CFI', 'BTC-CLAM', 'BTC-CLOAK', 'BTC-CLUB', 'BTC-COVAL', 'BTC-CPC', 'BTC-CRB', 'BTC-CRW', 'BTC-CURE', 'BTC-CVC', 'BTC-DASH', 'BTC-DCR', 'BTC-DCT', 'BTC-DGB', 'BTC-DGD', 'BTC-DMD', 'BTC-DNT', 'BTC-DOGE', 'BTC-DOPE', 'BTC-DTB', 'BTC-DYN', 'BTC-EBST', 'BTC-EDG', 'BTC-EFL', 'BTC-EGC', 'BTC-EMC', 'BTC-EMC2', 'BTC-ENRG', 'BTC-ERC', 'BTC-ETC', 'BTC-ETH', 'BTC-EXCL', 'BTC-EXP', 'BTC-FAIR', 'BTC-FCT', 'BTC-FLDC', 'BTC-FLO', 'BTC-FTC', 'BTC-FUN', 'BTC-GAM', 'BTC-GAME', 'BTC-GBG', 'BTC-GBYTE', 'BTC-GCR', 'BTC-GEO', 'BTC-GLD', 'BTC-GNO', 'BTC-GNT', 'BTC-GOLOS', 'BTC-GRC', 'BTC-GRS', 'BTC-GUP', 'BTC-HMQ', 'BTC-INCNT', 'BTC-INFX', 'BTC-IOC', 'BTC-ION', 'BTC-IOP', 'BTC-KMD', 'BTC-KORE', 'BTC-LBC', 'BTC-LGD', 'BTC-LMC', 'BTC-LSK', 'BTC-LTC', 'BTC-LUN', 'BTC-MAID', 'BTC-MANA', 'BTC-MCO', 'BTC-MEME', 'BTC-MLN', 'BTC-MONA', 'BTC-MTL', 'BTC-MUE', 'BTC-MUSIC', 'BTC-MYST', 'BTC-NAV', 'BTC-NBT', 'BTC-NEO', 'BTC-NEOS', 'BTC-NLG', 'BTC-NMR', 'BTC-NXC', 'BTC-NXS', 'BTC-NXT', 'BTC-OK', 'BTC-OMG', 'BTC-OMNI', 'BTC-PART', 'BTC-PAY', 'BTC-PDC', 'BTC-PINK', 'BTC-PIVX', 'BTC-PKB', 'BTC-POT', 'BTC-PPC', 'BTC-PTC', 'BTC-PTOY', 'BTC-QRL', 'BTC-QTUM', 'BTC-QWARK', 'BTC-RADS', 'BTC-RBY', 'BTC-RDD', 'BTC-REP', 'BTC-RISE', 'BTC-RLC', 'BTC-SAFEX', 'BTC-SALT', 'BTC-SBD', 'BTC-SC', 'BTC-SEQ', 'BTC-SHIFT', 'BTC-SIB', 'BTC-SLR', 'BTC-SLS', 'BTC-SNGLS', 'BTC-SNRG', 'BTC-SNT', 'BTC-SPHR', 'BTC-SPR', 'BTC-START', 'BTC-STEEM', 'BTC-STORJ', 'BTC-STRAT', 'BTC-SWIFT', 'BTC-SWT', 'BTC-SYNX', 'BTC-SYS', 'BTC-THC', 'BTC-TIME', 'BTC-TIX', 'BTC-TKN', 'BTC-TKS', 'BTC-TRIG', 'BTC-TRST', 'BTC-TRUST', 'BTC-TX', 'BTC-UBQ', 'BTC-UNB', 'BTC-VIA', 'BTC-VOX', 'BTC-VRC', 'BTC-VRM', 'BTC-VTC', 'BTC-VTR', 'BTC-WAVES', 'BTC-WINGS', 'BTC-XAUR', 'BTC-XCP', 'BTC-XDN', 'BTC-XEL', 'BTC-XEM', 'BTC-XLM', 'BTC-XMG', 'BTC-XMR', 'BTC-XMY', 'BTC-XRP', 'BTC-XST', 'BTC-XVC', 'BTC-XVG', 'BTC-XWC', 'BTC-XZC', 'BTC-ZCL', 'BTC-ZEC', 'BTC-ZEN']
    };
  }

  submitCall(e) {
    e.preventDefault();
    if(this.state.disabled) { return false; }
    if(isNaN(e.target[2].value)) {
      alert('Target given is not a number');
      return false;
    }
    if(isNaN(e.target[3].value)) {
      alert('Stop Loss given is not a number');
      return false;
    }
    const confirm = window.confirm("Is this correct: \nExchage: Bittrex" + "\nTicker: " + this.state.ticker + "\nTarget: " + this.state.target + "\nStop Loss: " + this.state.stopLoss);
    if(confirm) {
      const passwordPrompt = window.prompt("Enter your password: ", "")
      this.setState({
        disabled: true
      })
      axios.post('/call',{
        exchange: 'bittrex',
        ticker: this.state.ticker,
        target: this.state.target,
        stopLoss: this.state.stopLoss,
        password: passwordPrompt
      })
        .then((response) => {
          alert('Call has been logged successfully')
          this.setState({
            disabled: false,
            ticker: '',
            target: '',
            stopLoss: ''
          })
        })
        .catch((error) => {
          alert('Call failed')
          this.setState({
            disabled: false,
            ticker: '',
            target: '',
            stopLoss: ''
          })
        });
    }
  }

  submitUser(e) {
    e.preventDefault();
    if(this.state.disabledUser) { return false; }
    const confirm = window.confirm("Is this correct: \nUsername: " + this.state.username);
    if(confirm) {
      const passwordPrompt = window.prompt("Enter your password: ", "")
      this.setState({
        disabledUser: true
      })
      axios.post('/user',{
        username: this.state.username,
        password: passwordPrompt
      })
        .then((response) => {
          alert('User has been created successfully with password: \n' + response.data.password)
          this.setState({
            disabledUser: false,
            username: ''
          })
        })
        .catch((error) => {
          alert('User creation failed')
          this.setState({
            disabledUser: false,
            username: ''
          })
        });
    }
  }

  render() {
    return (
      <div className={s.root}>
        <div className={s.container}>
        <h1>Calls</h1>
        <div className="container-fluid container">
          <div className="row">
            <form className="col-md-12 form" onSubmit={this.submitCall.bind(this)}>
              <div className="form-group row">
                <label htmlFor="exchange-input" className="col-2 col-form-label">Exchange</label>
                <div className="col-12">
                  <div className="radio" style={{marginLeft: '12px'}}>
                    <label><input type="radio" name="bittrex" checked readOnly/>Bittrex</label>
                  </div>
                </div>
              </div>
              <div className="form-group row">
                <div className="dropdown">
                <label htmlFor="ticker-input" className="col-2 col-form-label">Ticker</label>< br/>
                  <button className="btn btn-default dropdown-toggle" type="button" id="menu1" data-toggle="dropdown">{this.state.ticker || 'Pick trading pair'}&nbsp;<span className="caret"></span></button>
                  <ul className="dropdown-menu" role="menu" aria-labelledby="menu1" style={{height: '270px', overflowY: 'scroll'}}>
                    {
                      this.state.pairs.map((pair, i) => {
                        return <li role="presentation" key={i}><a role="menuitem" tabIndex="-1" href="#" onClick={() => {this.setState({ticker: pair})}}>{pair}</a></li>
                      })
                    }
                  </ul>
                </div>
              </div>
              <div className="form-group row">
                <label htmlFor="target-input" className="col-2 col-form-label">Target</label>
                <div className="col-4">
                  <input className="col-4 form-control" onChange={(e) => {this.setState({target: e.target.value})}} value={this.state.target} type="text" placeholder='Target, (e.g. 1.2, 100, 0.003)' id="target-input" />
                </div>
              </div>
              <div className="form-group row">
                <label htmlFor="stop-loss-input" className="col-2 col-form-label">Stop Loss</label>
                <div className="col-4">
                  <input className="col-4 form-control" onChange={(e) => {this.setState({stopLoss: e.target.value})}} value={this.state.stopLoss} type="text" placeholder='Stop Loss, (e.g. 1.2, 100, 0.003)' id="stop-loss-input" />
                </div>
              </div>
              <div className="form-group row">
                <button type="submit" className="btn btn-primary" disabled={this.state.disabled}>Submit Call</button>
              </div>
            </form>
          </div>
        </div>
        <h1>Users</h1>
          <div className="container-fluid container">
            <div className="row">
              <form className="col-md-12 form" onSubmit={this.submitUser.bind(this)}>
                <div className="form-group row">
                  <label htmlFor="target-input" className="col-2 col-form-label">Username</label>
                  <div className="col-4">
                    <input className="col-4 form-control" onChange={(e) => {this.setState({username: e.target.value})}} value={this.state.username} type="text" placeholder='Username, (e.g. Magpie)' id="username-input" />
                  </div>
                </div>
                <div className="form-group row">
                  <button type="submit" className="btn btn-success" disabled={this.state.disabledUser}>Create User</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
