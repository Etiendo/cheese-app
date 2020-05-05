import React from 'react'
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native'
import MapView from 'react-native-maps'
import { Marker } from 'react-native-maps'
import { getAllShops } from '../API/chesseApi'


class Map extends React.Component {
    constructor(props: any, private searchedText: string, private page: number, private totalPages: number) {
        super(props)
        this.state = {
            shops: [],
            region: {
                latitude: 48.8534,
                longitude: 2.3488,
                latitudeDelta: 0.15,
                longitudeDelta: 0.2
            },
            markers: [],
            isLoading: false
        }
    }

    _loadShops() {
        this.setState({
            isLoading: true
        })
        getAllShops().then(data => {
            this.setState({
                shops: data.results,
                isLoading: false
            })
            this.buildMarkers(this.state.shops)
        })
    }

    buildMarkers(shopList: Array<any>) {
        const markers: Array<any> = []
        shopList.forEach(shop => {
            const marker = {
                title: null,
                coordinate: {}
            }
            marker.title = shop.name
            marker.coordinate = {
                latitude: shop.latitude,
                longitude: shop.longitude
            }
            markers.push(marker)
        })
        this.setState({
            markers: markers
        })
    }

    _displayLoading() {
        if (this.state.isLoading) {
            return (
                <View style={styles.loading_container}>
                    <ActivityIndicator size='large' />
                </View>
            )
        }
    }

    _displayMap() {
        if (this.state.markers) {
            return (
                <MapView
                    style={styles.map_style}
                    region={this.state.region}>
                    {this.state.markers.map((marker: any, index: number) => {
                        return (
                            <Marker
                                key={index}
                                coordinate={marker.coordinate}
                                title={marker.title} />
                        )
                    })}
                </MapView>
            )    
        } else {
            return (
                <Text>Points d'intérêts non chargés...</Text>
            )
        }
        
    }

    componentDidMount() {
        this._loadShops()
    }

    render() {
        return (
            <View style={styles.main_container}>
                <View style={styles.text_container}>
                    <Text>Trouvez votre échoppe !</Text>
                </View>
                <View style={styles.map_container}>
                    {this._displayMap()}
                    {this._displayLoading()}
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    main_container: {
        flex: 1,
    },
    text_container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    map_container: {
        flex: 4,
        alignItems: 'center',
        justifyContent: 'center'
    },
    map_style: {
        ...StyleSheet.absoluteFillObject,
    },
    loading_container: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 10,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
    }
})

export default Map