import React from 'react'
import { View, Text, StyleSheet, ActivityIndicator, TextInput, Button } from 'react-native'
import MapView from 'react-native-maps'
import { Marker } from 'react-native-maps'
import { getAllShops, getShop } from '../API/chesseApi'


class Map extends React.Component {
    constructor(props: any, private searchedText: string) {
        super(props)
        this.searchedText
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

    _searchShop() {
        if (this.searchedText.length === 0) {
            this._loadShops()
        } else {
        this.setState({ shops: [] },
            () => {this._loadShop() })
        }
    }

    _loadShop() {
        if (this.searchedText.length > 0) {
            this.setState({ isLoading: true })
            getShop(this.searchedText).then(data => {
                this.setState({
                    shops: this.state.shops.concat(data.results),
                    isLoading: false
                })
                this.buildMarkers()
            })
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
            this.buildMarkers()
        })
    }

    buildMarkers() {
        const markers: Array<any> = []
        this.state.shops.forEach(shop => {
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
                <View style={styles.search_container}>
                    <TextInput
                        style={styles.textinput}
                        placeholder="Nom de l'échoppe"
                        onChangeText={text => this.searchedText = text}
                        onSubmitEditing={() => this._searchShop()} />
                    <Button title='Rechercher' onPress={() => this._searchShop()} />
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
    search_container: {
        flex: 1,
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
    },
    textinput: {
        marginLeft: 5,
        marginRight: 5,
        height: 50,
        borderColor: '#000001',
        borderWidth: 1,
        paddingLeft: 5
    },
})

export default Map