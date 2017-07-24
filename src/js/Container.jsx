import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

export default class StoryLinkCard extends React.Component {
  constructor(props) {
    super(props)

    let stateVar = {
      fetchingData: true,
      dataJSON: {
        card_data: {},
        configs: {}
      },
      schemaJSON: undefined,
      optionalConfigJSON: {},
      optionalConfigSchemaJSON: undefined
    };

    if (this.props.dataJSON) {
      stateVar.fetchingData = false;
      stateVar.dataJSON = this.props.dataJSON;
    }

    if (this.props.schemaJSON) {
      stateVar.schemaJSON = this.props.schemaJSON;
    }

    if (this.props.optionalConfigJSON) {
      stateVar.optionalConfigJSON = this.props.optionalConfigJSON;
    }

    if (this.props.optionalConfigSchemaJSON) {
      stateVar.optionalConfigSchemaJSON = this.props.optionalConfigSchemaJSON;
    }

    this.state = stateVar;
  }

  exportData() {
    return document.getElementById('protograph_div').getBoundingClientRect();
  }

  componentDidMount() {
    // get sample json data based on type i.e string or object
    if (this.state.fetchingData){
      axios.all([axios.get(this.props.dataURL), axios.get(this.props.schemaURL), axios.get(this.props.optionalConfigURL), axios.get(this.props.optionalConfigSchemaURL)])
        .then(axios.spread((card, schema, opt_config, opt_config_schema) => {
          this.setState({
            fetchingData: false,
            dataJSON: {
              card_data: card.data,
              configs: opt_config.data
            },
            schemaJSON: schema.data,
            optionalConfigJSON: opt_config.data,
            optionalConfigSchemaJSON: opt_config_schema.data
          });
        }));
    }
  }

  getScreenSize() {
    let w = window,
      d = document,
      e = d.documentElement,
      g = d.getElementsByTagName('body')[0],
      width = w.innerWidth || e.clientWidth || g.clientWidth,
      height = w.innerHeight|| e.clientHeight|| g.clientHeight;

    return {
      width: width,
      height: height
    };
  }

  renderLaptop() {
    if (this.state.schemaJSON === undefined ){
      return(<div>Loading</div>)
    } else {
      const data = this.state.dataJSON.card_data;
      let styles = {
        width: "100%"
      }
      return (
        <div id="protograph_div" className = "protograph_card_div" style = {styles}>
          <a href={data.data.url} target="_blank" className="storylink-url"><div>
            {data.data.image !== '' ? <div className="storylink-cover-img">
              <img src={data.data.image} width="100%"/>
            </div> : '' }
            <div className="storylink-title">{data.data.title}</div>
            <div className="storylink-description">{data.data.description}</div>
            <div className="storylink-date">{data.data.date}</div>
          </div></a>
        </div>
      )
    }
  }

  renderMobile() {
    if (this.state.schemaJSON === undefined ){
      return(<div>Loading</div>)
    } else {
      const data = this.state.dataJSON.card_data;
      let styles = {
        width: "300px"
      }
      return (
        <div id="protograph_div" className = "protograph_card_div" style = {styles}>
          <a href={data.data.url} target="_blank" className="storylink-url"><div>
            {data.data.image !== '' ? <div className="storylink-cover-img">
              <img src={data.data.image} width="100%"/>
            </div> : '' }
            <div className="storylink-title">{data.data.title}</div>
            <div className="storylink-description">{data.data.description}</div>
            <div className="storylink-date">{data.data.date}</div>
          </div></a>
        </div>
      )
    }
  }

  renderScreenshot() {
    if (this.state.schemaJSON === undefined ){
      return(<div>Loading</div>)
    } else {
      const data = this.state.dataJSON.card_data;
      return (
          <div id="ProtoScreenshot" className = "protograph_card_div">
            {data.data.image !== '' ? <div className="storylink-cover-img">
              <img src={data.data.image} width="100%"/>
            </div> : '' }
            <div className="storylink-title">{data.data.title}</div>
            <div className="storylink-description">{data.data.description}</div>
            <div className="storylink-date">{data.data.date}</div>
          </div>

      )
    }
  }

  render() {
    switch(this.props.mode) {
      case 'laptop' :
        return this.renderLaptop();
        break;
      case 'mobile' :
        return this.renderMobile();
        break;
      case 'tablet' :
        return this.renderLaptop();
        break;
      case 'screenshot' :
          return this.renderScreenshot();
          break;
    }
  }
}