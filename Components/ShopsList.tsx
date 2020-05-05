import React from 'react'
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native'
import { getAllShops } from '../API/chesseApi'

class ShopsList extends React.Component {
    constructor(props: any, private searchedText: string, private page: number, private totalPages: number) {
        super(props)
        this.state = {
            shops: [],
            isLoading: false
        }
        this._loadShops = this._loadShops.bind(this)
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

    componentDidMount() {
        this._loadShops()
    }

    render() {
        return (
            <View style={styles.main_container}>
                <FlatList
                    style={styles.list}
                    data={this.state.shops}
                    keyExtractor={(item: any) => item.id.toString()}
                    renderItem={({ item }) => (<Text>{item.name}</Text>)}
                />

                {this._displayLoading()}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    main_container: {
        flex: 1
    },
    list: {
        flex: 1
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
})

export default ShopsList