import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Home, Setting, QRScan } from '../screens/needlogin/index'
import { Image, Text, View } from 'react-native'
import { Icon } from 'react-native-paper';
import { translate } from '../localization/localization';
import { useSelector } from 'react-redux';
import { LinearGradient } from 'expo-linear-gradient';
const Tab = createBottomTabNavigator();

export default function BottomNavigation() {
    const lang = useSelector(state => state.storeData.lang);
    return (
        <Tab.Navigator>
            <Tab.Screen name="Home" options={{
                headerTitle: () => (
                    <Image style={{ width: 200, height: 40, objectFit: 'contain', margin: 'auto' }}
                        source={require('../assets/logo.png')}
                    />
                ),
                headerTitleAlign: 'center',
                headerStyle: { height: 110 },
                tabBarIcon: ({ focused }) => (
                    <Icon color={focused ? '#D32D2F' : '#475467'} source='home' size={30} />
                ),
                tabBarActiveTintColor: '#D32D2F',
                tabBarInactiveTintColor: '#475467',
                tabBarLabel: (focused, color) => (
                    <Text style={{ color: focused.focused ? '#D32D2F' : color, fontSize: 10 }}>{translate('home')}</Text>
                )
            }} component={Home} />
            <Tab.Screen name="QRScan" options={{
                headerShown: false,
                headerStyle: { height: 110 },
                tabBarStyle: { display: 'none' },
                unmountOnBlur: true,
                tabBarIcon: ({ focused }) => (
                    <LinearGradient colors={['#F04647', '#C22324']} style={{ position: 'absolute', top: -20, padding: 10, borderRadius: 50, overflow: 'hidden' }}>
                        <Image width={20} source={require('../assets/ScanQR.png')} />

                    </LinearGradient>
                ),
                tabBarActiveTintColor: '#D32D2F',
                tabBarInactiveTintColor: '#475467',
                tabBarLabel: (focused, color) => (
                    <Text style={{ color: focused.focused ? '#D32D2F' : color, fontSize: 10 }}>{translate('scanqr')}</Text>
                )
            }} component={QRScan} />
            <Tab.Screen name="Setting" options={{
                headerTitle: 'Setting',
                headerTitleAlign: 'center',
                headerStyle: { height: 110 },
                tabBarIcon: ({ focused }) => (
                    <Icon color={focused ? '#D32D2F' : '#475467'} source='cog-outline' size={30} />
                ),
                tabBarActiveTintColor: '#D32D2F',
                tabBarInactiveTintColor: '#475467',
                tabBarLabel: (focused, color) => (
                    <Text style={{ color: focused.focused ? '#D32D2F' : color, fontSize: 10 }}>{translate('setting')}</Text>
                )
            }} component={Setting} />

        </Tab.Navigator>
    );
}