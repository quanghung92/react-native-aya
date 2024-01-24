import { Image, View } from 'react-native'
import { Text, Button } from 'react-native-paper';
import React from 'react'

export default function ErrorComponent(props) {
    const hideModal = () => {
        props.hideModal()
    }


    return (
        <View className="bg-white p-4 rounded-xl">
            <View className="flex flex-row justify-center mb-2 ">
                <Image className="w-13 h-13 object-contain"
                    source={require('../assets/faile.png')}
                />
            </View>
            <Text className="font-semibold text-lg text-gray-900 text-center">Failed</Text>
            <Text className="text-center font-normal text-sm">{props.Failed ? props.Failed : ''}</Text>
            <Button className="bg-Primary mt-8 rounded-lg h-12 flex justify-center" onPress={() => hideModal()}>
                <Text className="text-white">OK</Text>
            </Button>
        </View>
    )
}
