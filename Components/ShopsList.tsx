import React from 'react'
import { View, Text, StyleSheet, FlatList } from 'react-native'
import { getAllShops } from '../API/chesseApi'

class ShopsList extends React.Component {
    constructor(props: any, private searchedText: string, private page: number, private totalPages: number) {
        super(props)
        this.searchedText
        this.page = 0
        this.totalPages = 0
        this.state = {
            shops: [],
            isLoading: false
        }
        this._loadShops = this._loadShops.bind(this)
    }

    _loadShops() {
        getAllShops(1).then(data => {
            console.log('_loadShops', data)
        })
    }

    componentDidMount() {
        this._loadShops()
    }

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