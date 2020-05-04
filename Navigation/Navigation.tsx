import React from 'react'
import { StyleSheet, Image } from 'react-native'
import { createStackNavigator } from 'react-navigation-stack'
import { createBottomTabNavigator } from 'react-navigation-tabs'
import { createAppContainer } from 'react-navigation'
import Map from '../Components/Map'
import ShopsList from '../Components/ShopsList'


const MapStackNavigator = createStackNavigator({
    Map: {
        screen: Map,
        navigationOptions: {
            title: 'Carte interactive',
            headerStyle: {
                backgroundColor: 'grey'
            }
        }
    }
})

const ShopsListStackNavigator = createStackNavigator({
    ShopsList: {
        screen: ShopsList,
        navigationOptions: {
            title: 'Liste des échoppes',
            headerStyle: {
                backgroundColor: 'grey'
            }
        }
    }
})

const ShopsTabsNavigator = createBottomTabNavigator(
    {
        Map: {
            screen: MapStackNavigator,
            navigationOptions: {
                tabBarIcon: () => {
                    return <Image
                        source={require('../Images/map_browse_icon.png')}
                        style={styles.icon} />
                }
            }
        },
        ShopsList: {
            screen: ShopsListStackNavigator,
            navigationOptions: {
                tabBarIcon: () => {
                    return <Image
                        source={require('../Images/shop_icon.png')}
                        style={styles.icon} />
                }
            }
        }
    },
    {
        tabBarOptions: {
            activeBackgroundColor: '#DDDDDD',
            inactiveBackgroundColor: '#FFFFFF',
            showIcon: true,
            showLabel: false
        }
    }
)

const styles = StyleSheet.create({
    icon: {
        width: 30,
        height: 30
    }
})

export default createAppContainer(ShopsTabsNavigator)