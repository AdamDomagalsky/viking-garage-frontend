import * as React from 'react';
import {
  AutoComplete,
  FontIcon,
} from 'material-ui';
import i from '../i18n';
declare const google: any;

export default class Location extends React.Component<any, any> {
  state = { data: [] };
  dataConfig = { text: 'description', value: 'place_id' }
  statusOk = typeof google !== 'undefined' ? google.maps.places.PlacesServiceStatus.OK : null;
  placesService = typeof google !== 'undefined' ? new google.maps.places.PlacesService(document.createElement('div')) : null;
  selectService = typeof google !== 'undefined' ? new google.maps.places.AutocompleteService() : null;

  onNewRequest = (details, index) => {
    if (this.placesService && details) {
      const placeId = details['place_id'];
      this.placesService.getDetails({ placeId }, (place, status) => {
        if (status === this.statusOk) {
          this.props.filter({
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng()
          });
        }
      })
    }
  }

  onUpdateInput = (input) => {
    if (this.selectService && input) {
      this.selectService.getQueryPredictions({ input }, (predictions, status) => {
        this.setState({
          data: status === this.statusOk
          ? predictions
          : [i('Not found')]
        });
      });
    } else {
      this.setState({ data: [] });
    }
  }

  render() {
    const { appbar } = this.props;
    const leftIcon = appbar ? 'search' : 'location_on';
    const hintText = appbar ? '' : i('Find motorcycles to ride around ...');
    const rightBtn = appbar && (
      <button className="right-btn" onClick={this.props.toggle}>
        <FontIcon className="material-icons">keyboard_arrow_down</FontIcon>
      </button>
    );

    return (
      <div className={`filter ${this.props.appbar ? 'appbar' : ''}`}>
        <FontIcon className="material-icons">{leftIcon}</FontIcon>
        <div className="input">
          <AutoComplete
            id="search-location"
            hintText={hintText}
            maxSearchResults={5}
            openOnFocus={true}
            filter={AutoComplete.noFilter}
            onNewRequest={this.onNewRequest}
            onUpdateInput={this.onUpdateInput}
            dataSource={this.state.data}
            dataSourceConfig={this.dataConfig}
            fullWidth={true}
            hintStyle={{ paddingLeft: 30 }}
          />
          {rightBtn}
        </div>
       </div>
    );
  }
}
