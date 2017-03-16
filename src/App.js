import React, { Component } from 'react';
import './App.css';


const isalphacharacter = function(char) {  
  const letter = /^[a-zA-Z]$/;
  const m = char.match(letter);
  if(m && m.length===1) return true;
  else return false;
}

const charsBeforeTheStartingAlphabet = function(char) {
  const lowercaseletter = /^[a-z]$/;
  const uppercaseletter = /^[A-Z]$/;
  const mu = char.match(uppercaseletter);
  const ml = char.match(lowercaseletter);
  if(ml && ml.length===1) return "a".charCodeAt(0) - 1;
  else if (mu && mu.length===1) return "A".charCodeAt(0) - 1;
  else throw 'Invalid Alphabet. Expecting an alphabet of length=1';
}

const oldToNewCharacter = function(alfa, k){
    const number_chrs_before_start = charsBeforeTheStartingAlphabet(alfa);
    let new_pos = (alfa.charCodeAt(0)-number_chrs_before_start+k)%26;
    new_pos = new_pos !== 0 ? new_pos : 26;
    return String.fromCharCode(new_pos + number_chrs_before_start)
}

const rotateString = function(string, k){
  return string.replace(/[a-zA-Z]/g, m=>isalphacharacter(m) ? oldToNewCharacter(m, k) : m);
}

class App extends Component{
  constructor(props){
    super(props);
    this.state = {
      alfa: "string",
      k: 1,
      result: rotateString("string",1)
    }
    this.handleAlfaChange = this.handleAlfaChange.bind(this);
    this.handleKChange = this.handleKChange.bind(this);
  }
  handleAlfaChange(event) {
    const alfa = event.target.value;
    const k = this.state.k;
    this.setState({
      alfa: alfa,
      result: rotateString(alfa, k)
    });
  }
  handleKChange(event){
    const k = event.target.value;
    const alfa = this.state.alfa;
    this.setState({
      k: k,
      result: rotateString(alfa, k)
    });
  }
  render(){
    return (
      <div>
        <h1>
        Rotate "{this.state.alfa}" (
        <input
          name="alfa"
          type="text"
          value={this.state.alfa}
          onChange={this.handleAlfaChange} />
        ) {this.state.k} times (
        <input
          name="k"
          type="range"
          value={this.state.k}
          onChange={this.handleKChange}
        />
        ) to
        "{this.state.result}"
        </h1>
      </div>
    );
  }
}

export default App;
