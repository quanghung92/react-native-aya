import { Text, View, Image, Pressable, Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { getConstant } from '../common/common';
import { APIPost } from '../common/apicomm';
import { setMenu } from '../redux/reducers/menu';
import { setRequestList } from '../redux/reducers/storeData';
import { menuIcon } from '../constants/menuIcon';
import { translate } from '../localization/localization';
import { Skeleton } from 'moti/skeleton';

export default function Menu(props) {
    const { menuData } = useSelector(state => state.menu)
    const [MenuData, setmenuData] = useState(menuData)
    const { navigation } = props
    const dispatch = useDispatch()
    useEffect(() => {
        async function getMenu() {
            try {
                await APIPost('loadmenu', {
                    portalId: getConstant('Portal')
                }, handleSuccess, handleFailed)
            } catch (error) {
                console.log(error)
            }
        }
        if (menuData.length === 0) {
            getMenu()
        }
    }, [menuData, dispatch])

    const handleSuccess = (response) => {
        setmenuData(response.data)
        dispatch(setMenu(response.data))
    }

    const handleFailed = (err) => {
        console.log(err)
    }

    const getMenuIcon = (icon) => {
        let iconMenu = null
        for (const key in menuIcon) {
            {
                if (icon === key) {
                    iconMenu = menuIcon[key]
                }

            }
        }
        return iconMenu
    }
    const changeRoute = (name) => {
        navigation.navigate(name)
        dispatch(setRequestList({
            requestData: [],
            reloadRequestData: true,
            canLoadMore: false
        }))
    }

    const skeltonOption = {
        colorMode: 'light',
        backgroundColor: '#D4D4D4'
    }
    const skeleton = () => {
        return Array.from({ length: 5 }).map((_, i) => (

            <Skeleton.Group key={i}>
                <View className="flex-col items-center justify-center w-1/3 mb-6 px-2">
                    <View className="text-center">
                        <Skeleton {...skeltonOption} width={32} height={24}></Skeleton>
                    </View>

                    <View className="mt-3 text-center mx-auto">
                        <Skeleton {...skeltonOption} width={'100%'} height={20}></Skeleton>
                    </View>
                </View>
            </Skeleton.Group>

        ))
    }
    const menuItem = (child) => {
        return (

            child.map((v) => (

                <Pressable android_ripple={{ color: 'rgba(0, 0,0,.2)', foreground: true }} onPress={() => changeRoute(v.name)} key={v.name} className="flex-col items-center w-1/3 mb-6 p-2 rounded-md overflow-hidden">
                    <Image
                        style={{ objectFit: 'contain' }}
                        className="w-8 h-6"
                        source={getMenuIcon(v.icon)}
                    />
                    <Text className="mt-3 text-gray-900 font-medium text-sm text-center">{translate(v.name)}</Text>
                </Pressable>

            ))


        )
    }
    return (
        <View>
            {
                MenuData.length === 0 ?
                    <View>
                        <Skeleton {...skeltonOption} width={200} height={30}></Skeleton>
                        <View className="flex-row  mt-4 mb-5 flex-wrap">
                            {
                                skeleton()
                            }
                        </View>
                    </View>

                    : MenuData.map((v, index) => {
                        return (
                            <View key={index}  >
                                <Text className="uppercase font-semibold text-sm">{v.name}</Text>
                                <View className="flex-row  mt-4 mb-5 flex-wrap">
                                    {menuItem(v._children)}
                                </View>

                            </View>
                        )
                    })
            }
        </View>
    )
}
