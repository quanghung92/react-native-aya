
import React, { useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import Login from '../screens/noneedlogin/login';
import { useSelector, useDispatch } from 'react-redux';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import {
    CashDeposit, CashWithDrawal, TicketList, RequestManagementList, TransactinHistory, BillPayment, TransferOwner, TransferOther,
    FilterRequest
} from '../screens/needlogin/index';

import { getClientInfo } from '../common/common';
import { setClientInfo } from '../redux/reducers/clientInfo';

import BottomNavigation from './bottomNavigation';
import { translate } from '../localization/localization';

const Stack = createNativeStackNavigator();


export default function AppNavigation() {
    const lang = useSelector(state => state.storeData.lang);
    const { token } = useSelector(state => state.userReducer)
    const { menuData } = useSelector(state => state.menu)
    const { clientInfo } = useSelector(state => state.clientInfo)
    const dispatch = useDispatch()
    const getMenuLink = (key) => {
        if (key === 'createticket') {
            return TicketList
        } else if (key === 'requestmanagement') {
            return RequestManagementList
        } else if (key === 'cashdeposit') {
            return CashDeposit
        } else if (key === 'cashwithdrawal') {
            return CashWithDrawal
        } else if (key === 'cashwithdrawal') {
            return CashWithDrawal
        } else if (key === 'ibtransactionhistory') {
            return TransactinHistory
        }
        else if (key === 'mbbillpayment') {
            return BillPayment
        } else if (key === 'mbtransferowner') {
            return TransferOwner
        }
        else if (key === 'mbtransferother') {
            return TransferOther
        }

    }
    useEffect(() => {
        const getInfo = async () => {
            try {
                const clientInfo = await getClientInfo();
                dispatch(setClientInfo(clientInfo))
            } catch (error) {
                console.error('Error fetching client info:', error);
            }
        };
        if (Object.keys(clientInfo).length === 0) {
            getInfo();
        }

    }, []);
    if (token) {
        return (
            <NavigationContainer>
                <Stack.Navigator
                    screenOptions={{ animation: 'fade', animationDuration: 10 }}
                >
                    <Stack.Screen name='home' options={{
                        headerShown: false,

                    }} component={BottomNavigation} />
                    {
                        menuData.length > 0 && menuData.map((v) => (
                            v._children.length > 0 && v._children.map((obj) => <Stack.Screen name={obj.name} component={getMenuLink(obj.name)} options={{
                                title: translate(obj.name),
                                headerTitleAlign: 'center'
                            }} />)
                        ))
                    }
                    <Stack.Screen name='FilterRequest' component={FilterRequest} />

                </Stack.Navigator>
            </NavigationContainer>
        )
    } else {
        return (
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen options={{
                        headerShown: false
                    }} name="login" component={Login} />
                </Stack.Navigator>
            </NavigationContainer>
        )
    }

}
