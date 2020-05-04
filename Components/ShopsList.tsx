import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

class ShopsList extends React.Component {
    render() {
        return (
            <View style={styles.main_container}>
                <Text>Shops list works !</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    main_container: {
        flex: 1
    }
})

export default ShopsList