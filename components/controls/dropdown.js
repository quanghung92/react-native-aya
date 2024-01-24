import { Pressable, StyleSheet, Text, View, Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Icon } from 'react-native-paper';
import { FlashList } from "@shopify/flash-list";
import Modal from "react-native-modal";
export default function Dropdown(props) {
    const [textChoose, setTextChoose] = useState(props.nameDropdown)
    const [showListChoose, setShowListChoose] = useState(false)
    const [idChoose, setIdChoose] = useState(props.idDropdown)

    useEffect(() => {
        props.hanleChooseDropdown(textChoose, idChoose)
    }, [idChoose])

    useEffect(() => {
        setTextChoose(props.nameDropdown)
    }, [props.nameDropdown])

    const handleShowListChoose = () => {
        setShowListChoose(!showListChoose)
    }
    const chooseItem = (value, id) => {
        setTextChoose(value)
        setIdChoose(id)
        handleShowListChoose()
    }
    return (
        <View className='mb-4'>
            <Text className="text-gray-600 font-medium text-sm mb-2" >{props.title ? props.title : 'dropdown'}</Text>

            <Pressable onPress={() => handleShowListChoose()}>
                <View style={{ borderWidth: 1, borderColor: '#D0D5DD' }} className="flex flex-row justify-between rounded-lg h-12 items-center p-3">
                    <Text className="capitalize" style={{ color: textChoose ? '#1B1B1B' : '#98A2B3' }}>{textChoose || props.placeHodler}</Text>
                    <Icon
                        source="chevron-down"
                        size={20}
                    />
                </View>

                <Modal
                    isVisible={showListChoose}
                    onBackdropPress={() => handleShowListChoose()}
                    style={styles.view}
                >
                    <View style={{ minHeight: 300 }} className="bg-white p-2 py-4 max-h-96">
                        {
                            !!props.dataDropdown && props.dataDropdown.length > 0 && (
                                <FlashList
                                    data={props.dataDropdown}
                                    renderItem={({ item }) => (
                                        <View>
                                            <View className="pb-5" key={item[props.id]}>
                                                <Pressable onPress={() => chooseItem(item[props.label], item[props.id])}><Text className="capitalize">{item[props.label]}</Text></Pressable>
                                            </View>
                                        </View>
                                    )}
                                    estimatedItemSize={props.estimatedItemSize}
                                />

                            )
                        }


                    </View>
                </Modal>




            </Pressable>
        </View >
    )
}

const styles = StyleSheet.create({
    view: {
        justifyContent: 'flex-end',
        margin: 0,
    },
});