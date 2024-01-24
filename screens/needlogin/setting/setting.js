import { Text, View, Image, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Icon } from 'react-native-paper'
import { useDispatch } from 'react-redux';
import { translate, getCurrentLang } from '../../../localization/localization'
import AsyncStorage from '@react-native-async-storage/async-storage';
import ModalChooseLang from '../../../components/settings/modalChooseLang'
import ModalLogout from '../../../components/settings/modalLogout'
import { Switch } from 'react-native-paper';
import { APIPost } from '../../../common/apicomm'

import ModalOpt from '../../../components/otp'
import ModalShow from '../../../components/modal'
import { setLoadingPage } from '../../../redux/reducers/storeData';
import { encryptEAS } from '../../../common/common';



export default function Setting() {
    const dispatch = useDispatch()
    const [showChooseLang, setShowChooseLang] = useState(false)
    const [showModalLogout, setShowModalLogout] = useState(false)
    const [openFaceId, setOpenFaceId] = useState(false)
    const [expireTime, setExpireTime] = useState('')
    const [phoneNo, setPhoneNo] = useState('')
    const [showOTPModal, setshowOTPModal] = useState(false)
    const [otpNumber, setOTPNumber] = useState('')
    const [checkResendOTP, setCheckResendOTP] = useState(false)
    const [showErrorModal, setShowErrorModal] = useState(false)
    const [failMess, setFailMess] = useState('')
    const [loading, setLoading] = useState(true)
    const [getOTPFail, setGetOTPFail] = useState(false)

    useEffect(() => {
        const getBiometricToken = async () => {
            const token = await AsyncStorage.getItem('bipmetricToken')
            if (!!token) {
                setOpenFaceId(true)
            }
        }
        getBiometricToken()
    }, [])

    const showLanguageChoose = () => {
        setShowChooseLang(!showChooseLang)
    }
    const hideModalLogout = () => {
        setShowModalLogout(!showModalLogout)
    }
    const onToggleSwitchFaceId = () => {
        setOpenFaceId(!openFaceId)
        getOTP()
    }

    // get otp 
    const getOTP = async () => {
        setLoading(true)
        setshowOTPModal(true)
        await APIPost('generate/otp', {
            OTPType: 'FaceId',
        }, handleGetRequestSuccess, handleGetRequestFailed)
    }


    const handleGetRequestSuccess = (result) => {
        setCheckResendOTP(true)
        setExpireTime(result.data.ExpiredLifeTime)
        setPhoneNo(result.data.PhoneNo)
        setCheckResendOTP(true)
        setLoading(false)
    }

    const handleGetRequestFailed = (error) => {
        setLoading(false)
        setFailMess(error.ErrorDesc)
        setGetOTPFail(true)
    }

    // hide otp modal 

    const hideOTPModal = () => {
        setLoading(true)
        setshowOTPModal(false)
        setGetOTPFail(false)
        setCheckResendOTP(false)
        setOpenFaceId(!openFaceId)
    }

    const handelBiometric = async () => {
        if (openFaceId) {
            await enableBiometric()
        } else {
            await disableBiometric()
        }
    }

    // enable biometric 

    const enableBiometric = async () => {
        setLoading(true)
        await APIPost('biometric/enable', {
            Authentication: {
                AuthenType: 'SMSOTP',
                AuthenCode: otpNumber
            }
        }, handleGetRequestEnableSuccess, handleGetRequestEnableFailed)
    }

    const handleGetRequestEnableSuccess = (result) => {
        setLoading(false)
        try {
            AsyncStorage.setItem('bipmetricToken', encryptEAS(result.data.BipmetricToken));
        } catch (error) {
            console.log('err', error)
        }
        setshowOTPModal(false)

    }

    const handleGetRequestEnableFailed = (error) => {
        setLoading(false)
        setFailMess(error.ErrorDesc)
        setShowErrorModal(true)
    }


    // disable biometric 

    const handleDisableSuccess = (obj) => {
        console.log('ss', obj)
        setLoading(false)
        setshowOTPModal(false)
        setOpenFaceId(false)
        AsyncStorage.removeItem('bipmetricToken');
    }

    const handleDisableFailed = (error) => {
        console.log('error', error)
        setLoading(false)
        setOpenFaceId(!openFaceId)
        setFailMess(error.ErrorDesc)
        setShowErrorModal(true)
    }

    const disableBiometric = async () => {
        setLoading(true)
        await APIPost('biometric/disable', {
            Authentication: {
                AuthenType: 'SMSOTP',
                AuthenCode: otpNumber
            }
        }, handleDisableSuccess, handleDisableFailed)
    }

    // hide error modal 

    const hideErrorModal = () => {
        setShowErrorModal(false)
    }
    const openLocation = () => {
        console.log('2');
    }

    return (
        <View className="p-3 flex-1 bg-white">

            <View style={{ borderBottomWidth: 1, borderBottomColor: '#E8E9EC' }}
                className="flex flex-row items-center justify-between   py-4">
                <View className="flex flex-row items-center gap-2">
                    <Image className="w-5 h-5" source={require('../../../assets/faceId.png')} />
                    <Text>{translate('loginbyfaceidtouchid')}</Text>
                </View>
                <Switch color='#D32D2F' value={openFaceId} onValueChange={onToggleSwitchFaceId} />
            </View>

            <Pressable onPress={() => showLanguageChoose()}
                style={{ borderBottomWidth: 1, borderBottomColor: '#E8E9EC' }}
                className="flex flex-row items-center justify-between py-4">
                <View className="flex flex-row items-center gap-2">
                    <Image className="w-4 h-4" source={require('../../../assets/language.png')} />
                    <Text>{translate('changelang')}</Text>
                </View>
                <View className="flex flex-row items-center justify-between">
                    <Image className="w-5 h-5" source={{ uri: getCurrentLang().Image.uri }} />
                    <Icon size={25} source='chevron-right' />
                </View>
            </Pressable>
            <Pressable onPress={() => openLocation()}
                style={{ borderBottomWidth: 1, borderBottomColor: '#E8E9EC' }}
                className="flex flex-row items-center justify-between py-4">
                <View className="flex flex-row items-center gap-x-2">
                    <Icon size={25} color='#101828' source='map-marker-outline' />
                    <Text>{translate('branchlocation')}</Text>
                </View>
                <View className="flex flex-row items-center justify-between">
                    <Icon size={25} source='chevron-right' />
                </View>
            </Pressable>

            <Pressable onPress={() => hideModalLogout()} style={{ borderBottomWidth: 1, borderBottomColor: '#E8E9EC' }}
                className="flex flex-row items-center justify-between py-4">
                <View className="flex flex-row items-center ">
                    <Icon size={20} source='logout' />
                    <Text className="ml-1">{translate('logout')}</Text>
                </View>
                <View className="flex flex-row items-center justify-between">
                    <Icon size={25} source='chevron-right' />
                </View>
            </Pressable>

            <ModalChooseLang showModal={showChooseLang} hideModal={showLanguageChoose} />
            <ModalLogout showModal={showModalLogout} hideModal={hideModalLogout} />
            {
                showErrorModal &&
                <ModalShow showModal={showErrorModal} loading={loading} hideModal={hideErrorModal} Failed={failMess} />
            }

            {
                showOTPModal &&
                <>
                    <ModalOpt
                        reSendOTP={getOTP}
                        handleSetOTP={setOTPNumber}
                        showModalOTP={showOTPModal}
                        hideOTPModal={hideOTPModal}
                        phoneNo={phoneNo}
                        expiredLifeTime={expireTime}
                        checkResendOTP={checkResendOTP}
                        setCheckResendOTP={setCheckResendOTP}
                        calAPIWithOTP={handelBiometric}
                        getOTPFail={getOTPFail}
                        loading={loading}
                        failMess={failMess}
                    />
                </>
            }

        </View>
    )
}
