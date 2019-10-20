import React, { Component } from "react";
import { View, Image, Text } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

export default class LocationSeachPage extends Component {
    constructor(props, state) {
        super(props, state);
    }

    render() {
        return (
            
                <GooglePlacesAutocomplete
                    placeholder='Search'
                    minLength={2} // minimum length of text to search
                    autoFocus={false}
                    returnKeyType={'search'} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
                    listViewDisplayed='auto'    // true/false/undefined
                    fetchDetails={true}
                    renderDescription={row => row.description} // custom description render
                    onPress={(data, details = null) => { // 'details' is provided when fetchDetails = true
                        console.log("data:::", data);
                        console.log("details:::", details);
                        let locationInfo = {
                            locationString: data.description,
                            latitude: details.geometry.location.lat,
                            longitude: details.geometry.location.lng
                        };
                        this.props.navigation.state.params.onGoBack(locationInfo);
                        this.props.navigation.goBack();
                    }}

                    getDefaultValue={() => ''}

                    query={{
                        // available options: https://developers.google.com/places/web-service/autocomplete
                        key: 'AIzaSyAsDx3DB19GW8GnFdCMcDQXzWhya1yiYAo',
                        language: 'en', // language of the results
                       // types: '(cities)' // default: 'geocode'
                    }}

                    styles={{
                        textInputContainer: {
                            width: '100%'
                        },
                        description: {
                            fontWeight: 'bold'
                        },
                        predefinedPlacesDescription: {
                            color: '#1faadb'
                        }
                    }}

                    currentLocation={false} // Will add a 'Current location' button at the top of the predefined places list
                    currentLocationLabel="Current location"
                    nearbyPlacesAPI='GooglePlacesSearch' // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
                    GoogleReverseGeocodingQuery={{
                        // available options for GoogleReverseGeocoding API : https://developers.google.com/maps/documentation/geocoding/intro
                    }}
                    GooglePlacesSearchQuery={{
                        // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
                        rankby: 'distance',
                        types: 'food'
                    }}

                    filterReverseGeocodingByTypes={['locality', 'administrative_area_level_3']} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities
                    //predefinedPlaces={[homePlace, workPlace]}

                    debounce={200} // debounce the requests in ms. Set to 0 to remove debounce. By default 0ms.
                    //renderLeftButton={() => <Image source={require('path/custom/left-icon')} />}
                    //renderRightButton={() => <Text>Custom text after the input</Text>}
                />
            
        )
    }
}