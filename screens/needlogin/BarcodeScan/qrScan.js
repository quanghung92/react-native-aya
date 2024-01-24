import { StyleSheet, Text, View, Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import { BarCodeScanner } from 'expo-barcode-scanner';
import { translate } from '../../../localization/localization';
import { Button } from 'react-native-paper';
export default function QRScan({ navigation }) {
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);

    useEffect(() => {
        const getBarCodeScannerPermissions = async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        };
        getBarCodeScannerPermissions();
    }, []);

    const handleBarCodeScanned = ({ type, data }) => {
        setScanned(true);
        alert(`Bar code with type ${type} and data ${data} has been scanned!`);
    };

    if (hasPermission === null) {
        return <Text>Requesting for camera permission</Text>;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }

    const goback = () => {
        setScanned(false)
        navigation.goBack()
    }

    return (
        <View style={styles.container}>
            <BarCodeScanner
                ca
                onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                style={styles.camDisplay}
            />
            <View className="px-4 flex flex-row justify-center absolute bottom-8">
                <Button onPress={() => goback()} mode="outlined" className=" w-full " >
                    <Text className="text-white">{translate('cancel1')}</Text>
                </Button>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
    },
    camDisplay: {
        width: Dimensions.get('screen').width * 1.2,
        height: Dimensions.get('screen').height * 1.2,

    }
});