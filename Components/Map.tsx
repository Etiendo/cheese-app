import React from 'react'
import { View, Text, StyleSheet, Dimensions } from 'react-native'
import MapView from 'react-native-maps'


class Map extends React.Component {

    componentDidMount() {
        this._buildMap()
    }

    _buildMap() {
        console.log('Build map')
    }

    render() {
        return (
            <View style={styles.main_container}>
                <View style={styles.text_container}>
                    <Text>Trouvez votre échoppe !</Text>
                </View>
                <View style={styles.map_container}>
                    <MapView style={styles.map_style} />
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
})

export default Map