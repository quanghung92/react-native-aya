import { Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import Modal from "react-native-modal";
import { useSelector, useDispatch } from 'react-redux';
import { translate } from '../../localization/localization';
import { Button } from 'react-native-paper';
import { setTokenUser } from '../../redux/reducers/userReducer';

export default function ModalLogout(props) {
    const [visible, setVisible] = React.useState(props.showModal);
    const dispatch = useDispatch()
    useEffect(() => {
        setVisible(props.showModal)
    }, [props.showModal])
    const hideModal = () => {
        props.hideModal()
        setVisible(false)
    }

    const changeLangModal = (key) => {
        hideModal()
    }
    const logout = () => {
        hideModal()
        setTimeout(() => {
            dispatch(setTokenUser(''))
        }, 500)

    }
    return (
        <Modal
            isVisible={visible}
            onBackdropPress={() => hideModal()}
        >
            <View style={{ minHeight: 150 }} className="bg-white p-2 py-4 rounded-lg">
                <Text className="text-center font-bold text-xl">{translate('logout')}</Text>
                <Text className="text-center text-base mt-3">{translate('areyousureyouwanttologout')}</Text>
                <View className=" mt-5 flex flex-row gap-x-2">
                    <View className=" flex-1">
                        <Button
                            onPress={() => changeLangModal()} style={{ borderColor: '#D32D2F' }}
                            mode='outlined'
                            contentStyle={{ height: 50 }}
                            className=" border-Primary w-full " >
                            <Text className="text-Primary w-full">{translate('no')}</Text>
                        </Button>
                    </View>

                    <View className="flex-1">
                        <Button onPress={() => logout()}
                            mode='contained'
                            contentStyle={{ height: 50 }}
                            className=" w-full bg-Primary">
                            <Text className="w-full">{translate('yes')}</Text>
                        </Button>
                    </View>
                </View>
            </View>
        </Modal>
    )
}
