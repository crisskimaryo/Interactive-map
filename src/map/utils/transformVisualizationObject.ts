import * as _ from 'lodash';
import { VisualizationObject } from '../models/visualization-object.model';
import { MapConfiguration } from '../models/map-configuration.model';
import { Layer } from '../models/layer.model';

export function transformVisualizationObject(visualizationObject) {
  let visObject = {};
  console.log(visualizationObject);
  const mapConfiguration: MapConfiguration = _.pick(visualizationObject, [
    'id',
    'name',
    'subtitle',
    'latitude',
    'longitude',
    'basemap',
    'zoom'
  ]);

  const layers: string[] = [];
  let Layers: Layer[] = [];

  visualizationObject.mapViews.forEach(mapview => {
    const layer = _.pick(mapview, [
      'id',
      'name',
      'displayName',
      'opacity',
      'hidden',
      'layer'
    ]);
    layers.push(mapview.id);
    const layerOptions = _.pick(mapview, [
      'eventClustering',
      'eventPointRadius',
      'radiusHigh',
      'radiusLow'
    ]);
    const legendProperties = _.pick(mapview, [
      'colorLow',
      'colorHigh',
      'colorScale',
      'classes'
    ]);
    const displaySettings = _.pick(mapview, [
      'labelFontColor',
      'labelFontSize',
      'labelFontStyle',
      'labelFontWeight',
      'labels',
      'hideTitle',
      'hideSubtitle'
    ]);
    const dataSelections = _.pick(mapview, [
      'config',
      'parentLevel',
      'completedOnly',
      'translations',
      'interpretations',
      'program',
      'programName',
      'columns',
      'rows',
      'filters',
      'aggregationType'
    ]);
    const layerObj = {
      ...layer,
      layerOptions,
      legendProperties,
      displaySettings,
      dataSelections
    };
    Layers = [...Layers, layerObj];
  });
  visObject = {
    ...this.visObject,
    mapConfiguration,
    layers
  };
  return {
    visObject,
    Layers
  };
}