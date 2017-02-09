import * as React from 'react';
import {
  AutoComplete,
  FontIcon,
} from 'material-ui';

declare const config: any;
declare const google: any;

export default class Location extends React.Component<any, any> {

  public service: any;
  public filter: any;

  constructor(props) {
    super(props);
    this.state = {
      data: [],
      load: false,
    };
    this.filter = props.filter;
    this.initMap = this.initMap.bind(this);
    this.displayData = this.displayData.bind(this);
    this.onNewRequest = this.onNewRequest.bind(this);
    this.onUpdateInput = this.onUpdateInput.bind(this);
  }

  public componentDidMount() {
    // in case of re-creating component we do not need another script
    if (document.getElementById('google-maps-script')) {
      this.initMap();
      return;
    }
    if (typeof window !== 'undefined') {
      const API_KEY = config.GOOGLE_MAP_API;
      window['initMap'] = this.initMap;
      let script = document.createElement('script');
      script.id = 'google-maps-script';
      script.type = 'text/javascript';
      script.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}&libraries=places&callback=initMap`;
      document.body.appendChild(script);
    }
  }

  public initMap() {
    this.service = new google.maps.places.AutocompleteService();
    this.setState({load: true});
  }

  public displayData(predictions, status) {
    const data = status != google.maps.places.PlacesServiceStatus.OK
      ? ['Not found']
      : predictions.map(p => p.description);
    this.setState({data});
  }

  public onNewRequest(chosenRequest: string, index: number) {
    this.filter(chosenRequest);
  }

  public onUpdateInput(text: string) {
    if (this.state.load && text !== '') {
      this.service.getQueryPredictions({input: text}, this.displayData)
    } else {
      this.setState({data: []});
    }
  }

  public render() {
    // return (<div>No co jest kurwa</div>);

    return (
      <div className="location">
        <FontIcon className="material-icons">location_on</FontIcon>
        <div className="filter">
          <AutoComplete
            hintText="Gran Canaria"
            maxSearchResults={5}
            openOnFocus={true}
            filter={AutoComplete.noFilter}
            onNewRequest={this.onNewRequest}
            onUpdateInput={this.onUpdateInput}
            dataSource={this.state.data}
            fullWidth={true}
          />
        </div>
      </div>);
  }
}
