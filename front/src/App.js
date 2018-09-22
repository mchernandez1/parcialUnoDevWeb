import React, { Component } from 'react';
import './App.css';
import vegaEmbed from 'vega-embed';

class App extends Component {

  constructor (props){
    super(props);
    this.cargaArchivo = this.cargaArchivo.bind(this);
    this.cargaManual = this.cargaManual.bind(this);
  }

  state={
    spec:['Opción 1', 'Opción 2', 'Opción 3'],
    data:{}

  };

  makeGraph(){
    //var dataUno = null;

    // dataUno = this.state.spec.data.name;
   var myData=[
    {"a": "A","b": 28}, {"a": "B","b": 55}, {"a": "C","b": 43},
    {"a": "D","b": 91}, {"a": "E","b": 81}, {"a": "F","b": 53},
    {"a": "G","b": 19}, {"a": "H","b": 87}, {"a": "I","b": 52}
    ];
    var spec = {
      "$schema": "https://vega.github.io/schema/vega-lite/v2.json",
      "description": "A simple bar chart with embedded data.",
      "data": {
       "name": "myData" 
      },
      "mark": {"type": "circle", "clip": true},
      "encoding": {
        "y": {"field": "a", "type": "ordinal"},
        "x": {"field": "b", "type": "quantitative"}
      }
    };
    const embed_opt = {"mode": "vega-lite"};    
    const el = document.getElementById('vis');
    const view = vegaEmbed("#vis", spec, embed_opt)
    .catch(error => console.log("Failure to insert graphic"))
    //.then((res) =>  res.view.insert(dataUno,this.state.data.data).run());
    .then((res) =>  res.view.insert("myData", myData).run());
  };

  cargaArchivo(event){
    try{
      this.divText.value=JSON.stringify(event,null,2);
      const json = this.divTextArchivo.value
      this.setState({data: JSON.parse(json)});
      this.makeGraph();
    }
    catch(err){
      this.setState({data: ""});
    }
  };

  cargaManual(event){
    try{
      const json = this.divTextManual.value
      this.setState({spec: JSON.parse(json)});
      this.makeGraph();
    }
    catch(err){
      console.log(err);
    }
  };

  uploadFile(event) {
         // Your parse code, but not seperated in a function
         try{
          var csvFilePath = event.target.files[0];
          var Papa = require("papaparse/papaparse.min.js");
          Papa.parse(csvFilePath, {
            header: true,
            download: true,
            skipEmptyLines: true,
            complete: this.cargaArchivo
          });
        } catch (err){
          this.warning.current.toggle("fileformat");
    //this checks for file formatting JSON
  }
};

render() {
  return (
    <div className="App">
    
    <textArea
    onChange={this.cargaArchivo}
    cols="40"
    rows="20"
    ref={(div)=>this.divTextArchivo =div}>
    </textArea>

    <textarea
    onChange={this.handleChangeSpec}
    cols="43"
    rows="28"
    ref= {(div) => this.divTextManual = div}
    placeholder="Ingresar un JSON manualmente o oprimir el botón Insertar un JSON aleatorio">
    </textarea>

    <button onClick={()=>{
      var obj = {
        "x":"John",
        "y": {"field":"Also John", "type": "quantitative"}
      };

      this.divTextManual.value=JSON.stringify(obj,null,2);}}>Insertar un JSON aleatorio</button>
      <button className="btn btn-primary" onClick={() =>  this.makeGraph()}>Gráfica Vega</button>

      <input type="file" ref={(input) => this.input = input} name="Add" onChange={this.uploadFile}/>
      <div id="vis"></div>

      </div>

      );
}
}

export default App;
