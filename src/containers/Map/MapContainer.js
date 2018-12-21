import React,{Component} from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import Geocode from "react-geocode";
class MapContainer extends Component {
    constructor(props){
        super(props);
        this.getlatidude();
    }

    state ={
        coordinates:{
            lat: 48.8583, 
            lng: 2.2944,
            
        }
    }

    
    getlatidude = () =>
    {
        Geocode.setApiKey("AIzaSyDXh0YSOq5UDmkZaVS66_K5IEP1v9R3mf4");
        Geocode.fromAddress(this.props.address).then(
            response => {
              const { lat, lng } = response.results[0].geometry.location;
              const cord = {lat:parseFloat(lat),lng:parseFloat(lng)};
              
             this.setState({coordinates:cord});
            
            },
            error => {
                console.log("error");
              console.error(error);
            }
          );
    }

    componentDidUpdate(){
       this.getlatidude();
    }

    render(){
        const style = {
            width: '35%',
            height: '100%',
            position: 'relative'
          }
        return(
            <Map 
            google={this.props.google}
             zoom={14}
             style={style} 
             initialCenter={{ lat: this.state.coordinates.lat, lng: this.state.coordinates.lng }}
             center={{ lat: this.state.coordinates.lat, lng: this.state.coordinates.lng }}>
         
                <Marker 
                onClick={this.onMarkerClick}
                name={'Current location'}
                position={ {lat: this.state.coordinates.lat, lng: this.state.coordinates.lng } }/>
         
                <InfoWindow onClose={this.onInfoWindowClose}>
                  
                </InfoWindow>
              </Map>
        );
    }

}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyDXh0YSOq5UDmkZaVS66_K5IEP1v9R3mf4'
  })(MapContainer);