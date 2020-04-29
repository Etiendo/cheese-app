import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

class Map extends React.Component {
    render() {
        return (
            <View style={styles.main_container}>
                <View style={styles.text_container}>
                    <Text>Trouvez votre échoppe !</Text>
                </View>
                <View style={styles.map_container}>
                    <Text>Carte à venir prochainement ! </Text>
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
        backgroundColor: 'red',
        alignItems: 'center',
        justifyContent: 'center'
    }
})

export default Map