import * as Device from 'expo-device';
import * as Application from 'expo-application';
import { Platform } from 'react-native';
import _constant, { Portal } from '../constants/env';
import CryptoES from 'crypto-es';
import store from '../redux/store';
import moment from 'moment';

const getDeviceId = async () => {
    if (Platform.OS === 'android') {
        return Application.androidId
    } else if (Platform.OS === 'ios' || Platform.OS === 'macos') {
        const id = await Application.getIosIdForVendorAsync()
        return id
    }
}

const getModel = () => {
    if (Platform.OS === 'android') {
        return Device.modelName
    } else if (Platform.OS === 'ios' || Platform.OS === 'macos') {
        const model = Device.modelId
        return model
    }
}


export const getClientInfo = async () => {
    const deviceId = await getDeviceId()
    const model = getModel()
    if (deviceId) {
        return {
            "DeviceId": deviceId,
            "ServiceId": Portal,
            "DeviceInfo": {
                "Model": model,
                "Manufacturer": Device.brand,
                "Name": Device.osBuildId,
                "Version": Device.osVersion,
                "Idiom": {},
                "Platform": {},
            },
            "AppInfo": {
                "Name": Application.applicationName,
                "PackageName": Application.applicationId,
                "Version": Application.nativeApplicationVersion,
                "Build": Application.nativeBuildVersion,
            },
            "DeviceType": Device.osName
        }
    }



}

export const getConstant = (key) => {
    return _constant.key
}

export const encryptEAS = (value) => {
    const key = CryptoES.enc.Base64.parse(_constant.keyEncryptUrl);
    var options = { mode: CryptoES.mode.ECB, padding: CryptoES.pad.Pkcs7, iv: key };
    var encrypted = CryptoES.AES.encrypt(value, key, options);
    return encrypted.toString();
}

export const decryptEAS = (value) => {
    var key = CryptoES.enc.Base64.parse(_constant.keyEncryptUrl);
    var options = { mode: CryptoES.mode.ECB, padding: CryptoES.pad.Pkcs7, iv: key };
    var decrypted = CryptoES.AES.decrypt(value, key, options);
    return decrypted.toString((CryptoES.enc.Utf8));
}

export const formatDate = (date) => {
    return moment(date).format("DD/MM/YYYY hh:mm A")
}