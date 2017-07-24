import React from 'react';
import ReactDOM from 'react-dom';
import StoryLinkCard from './src/js/Container.jsx';

window.ProtoGraph = window.ProtoGraph || {};
window.ProtoGraph.Card = window.ProtoGraph.Card || {};


ProtoGraph.Card.toStoryLink = function () {
  this.cardType = 'StoryLinkCard';
}

ProtoGraph.Card.toStoryLink.prototype.init = function (options) {
  this.options = options;
}

ProtoGraph.Card.toStoryLink.prototype.getData = function (data) {
  return this.containerInstance.exportData();
}

ProtoGraph.Card.toStoryLink.prototype.renderLaptop = function (data) {
  this.mode = 'laptop';
  ReactDOM.render(
    <StoryLinkCard
      dataURL={this.options.data_url}
      schemaURL={this.options.schema_url}
      optionalConfigURL={this.options.configuration_url}
      optionalConfigSchemaURL={this.options.configuration_schema_url}
      mode={this.mode}
      ref={(e) => {
        this.containerInstance = this.containerInstance || e;
      }}/>,
    this.options.selector);
}

ProtoGraph.Card.toStoryLink.prototype.renderMobile = function (data) {
  this.mode = 'mobile';
  ReactDOM.render(
    <StoryLinkCard
      dataURL={this.options.data_url}
      schemaURL={this.options.schema_url}
      optionalConfigURL={this.options.configuration_url}
      optionalConfigSchemaURL={this.options.configuration_schema_url}
      mode={this.mode}
      ref={(e) => {
        this.containerInstance = this.containerInstance || e;
      }}/>,
    this.options.selector);
}

ProtoGraph.Card.toStoryLink.prototype.renderScreenshot = function (data) {
  this.mode = 'screenshot';
  ReactDOM.render(
    <StoryLinkCard
      dataURL={this.options.data_url}
      schemaURL={this.options.schema_url}
      optionalConfigURL={this.options.configuration_url}
      optionalConfigSchemaURL={this.options.configuration_schema_url}
      mode={this.mode}
      ref={(e) => {
        this.containerInstance = this.containerInstance || e;
      }}/>,
    this.options.selector);
}

