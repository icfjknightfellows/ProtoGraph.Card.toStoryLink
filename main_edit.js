import React from 'react';
import ReactDOM from 'react-dom';
import EditStoryLinkCard from './src/js/EditContainer.jsx';

ProtoGraph.Card.toStoryLink.prototype.getData = function (data) {
  return this.containerInstance.exportData();
}

ProtoGraph.Card.toStoryLink.prototype.renderSEO = function (data) {
  this.renderMode = 'SEO';
  return this.containerInstance.renderSEO();
}

ProtoGraph.Card.toStoryLink.prototype.renderEdit = function (onPublishCallback) {
  this.mode = 'edit';
  this.onPublishCallback = onPublishCallback;
  ReactDOM.render(
    <EditStoryLinkCard
      dataURL={this.options.data_url}
      schemaURL={this.options.schema_url}
      optionalConfigURL={this.options.configuration_url}
      optionalConfigSchemaURL={this.options.configuration_schema_url}
      onPublishCallback={this.onPublishCallback}
      mode={this.mode}
      ref={(e) => {
        this.containerInstance = this.containerInstance || e;
      }}/>,
    this.options.selector);
}