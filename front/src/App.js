import React, { Component } from 'react';
import './App.css';
import vegaEmbed from "vega-embed";

class App extends Component {

  constructor (props){
    super(props);

    this.state={
      spec:['Opción 1', 'Opción 2', 'Opción 3']
    }
  }
        
  render() {
    return (
      <div className="App">

      <div id="vis"></div>

      <textArea
      cols="40"
      rows="20"
      ref={(div)=>this.divText =div}>textArea espacio
      </textArea>

      <button onClick={()=>{
        var obj = {
          "x":"John",
          "y": {"field":"Also John", "type": "quantitative"}
        };

        this.divText.value=JSON.stringify(obj,null,2);}}>Cambialo</button>
      
        </div>

        );
      }
    }

    export default App;
