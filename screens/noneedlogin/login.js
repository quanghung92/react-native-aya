import { StyleSheet, Text, View, Image, SafeAreaView, Keyboard } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ImageBackground } from 'react-native'
import { TextInput, Button, PaperProvider } from 'react-native-paper'
import { Pressable } from 'react-native'
import { useSelector, useDispatch } from 'react-redux';
import { setUser, setUserLoading, setTokenUser } from '../../redux/reducers/userReducer'
import axios from 'axios';
import * as Crypto from 'expo-crypto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { encryptEAS, decryptEAS } from '../../common/common'
import { APIPost } from '../../common/apicomm'
import * as LocalAuthentication from 'expo-local-authentication';
import PasswordInput from '../../components/controls/passwordInput'
import ModalShow from '../../components/modal'
import ModalOpt from '../../components/otp'

import { translate } from '../../localization/localization'
import { setLoadingPage } from '../../redux/reducers/storeData'

export default function Login() {
    const dispatch = useDispatch()
    const { userData } = useSelector(state => state.userReducer)
    const [userName, setUserName] = useState('')
    const [passWordCrypto, setPassWordCrypto] = useState('')
    const [showModal, setShowModal] = useState(false)
    const [loginFailed, setLoginFailed] = useState('')
    const [OTPNumber, setOPTNumber] = useState('')
    const [showModalOTP, setShowModalOTP] = useState(false)
    const [ExpiredLifeTime, setExpiredLifeTime] = useState(null)
    const [checkResendOTP, setCheckResendOTP] = useState(false)
    const [userInfo, setUserInfo] = useState('')
    const [biometricToken, setBiometricToken] = useState('')
    const [fetchData, setFetchData] = useState(false)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const getUserData = async () => {
            try {
                const userData = await AsyncStorage.getItem('userData');
                const userName = await AsyncStorage.getItem('userName');
                const tokenBiometric = await AsyncStorage.getItem('bipmetricToken');
                if (userData && userName) {
                    setUserInfo(JSON.parse(decryptEAS(userData)));
                    setUserName(JSON.parse(decryptEAS(userName)))
                }
                if (tokenBiometric) {
                    setBiometricToken(decryptEAS(tokenBiometric))
                }
            } catch (error) {
                console.error('Error retrieving user data:', error);
            }
            setFetchData(true)
        };
        getUserData();
    }, []);

    const login = async () => {
        setLoading(true)
        setShowModal(true)
        Keyboard.dismiss()
        try {
            await APIPost('internal/token', {
                LoginName: userName,
                Password: passWordCrypto
            }, handleLoginSuccess, handleLoginFaile)
        } catch (error) {
            console.log(error)
        }
    }

    const calAPIWithOTP = async () => {
        setLoading(true)
        setShowModal(true)
        Keyboard.dismiss()
        try {
            await APIPost('internal/token', {
                LoginName: userName,
                Password: passWordCrypto,
                Authentication: {
                    AuthenType: 'SMSOTP',
                    AuthenCode: OTPNumber,
                }
            }, handleLoginSuccess, handleLoginFaile)
        } catch (error) {
            console.log(error)
        }
    }

    const reSendOTP = async () => {
        setLoading(true)
        setShowModal(true)
        try {
            await APIPost('resend/otp', {
                username: userName,
            }, resendSuccess, handleResendFaile)
        } catch (error) {
            console.log(error)
        }
    }

    const resendSuccess = (dataResend) => {
        setShowModal(false)
        const { data } = dataResend
        setCheckResendOTP(true)
        setExpiredLifeTime(data.ExpiredLifeTime)
    }

    const handleResendFaile = (error) => {
        setLoading(false)
        setShowModal(true)
        setLoginFailed(error.ReasonDesc)
    }
    const handleLoginSuccess = async (dataUser) => {
        setLoading(false)
        setShowModal(false)
        const { data } = dataUser
        if (data.needOTP === 'True') {
            dispatch(setUser(data))
            setCheckResendOTP(true)
            setExpiredLifeTime(data.ExpiredLifeTime)
            setShowModalOTP(true)
        } else {
            axios.defaults.headers.common['Authorization'] = `Bearer ${data.access_token}`
            dispatch(setTokenUser(data.access_token))
            try {
                await AsyncStorage.setItem('userData', encryptEAS(JSON.stringify(data)));
                await AsyncStorage.setItem('userName', encryptEAS(JSON.stringify(userName)));
            } catch (e) {
                console.log(e)
            }

        }
    }

    const hideOTPModal = () => {
        setShowModalOTP(false)
    }
    const handleSetOTP = (value) => {
        setOPTNumber(value)
    }

    const handleLoginFaile = (error) => {
        setLoading(false)
        setLoginFailed(error.ReasonDesc)
    }

    const handelSetPassWord = async (password, pw) => {
        setPassWordCrypto(pw)
    }

    const hideModal = () => {
        setShowModal(false)
    }

    const openBiometric = async () => {
        if (!biometricToken) {
            setLoginFailed(translate('invalid_biometrictoken'))
            setLoading(false)
            setShowModal(true)
            return
        }

        const compatible = await LocalAuthentication.hasHardwareAsync()
        if (compatible) {
            const auth = LocalAuthentication.authenticateAsync()
            auth.then(async result => {
                if (result.success) {
                    const pw = await Crypto.digestStringAsync(
                        Crypto.CryptoDigestAlgorithm.SHA256, 'MB'
                    )
                    setLoading(true)
                    setShowModal(true)
                    try {
                        APIPost('internal/token', {
                            LoginName: userName,
                            BiometricToken: biometricToken,
                            Password: pw
                        }, handleLoginSuccess, handleLoginBiometricFail)
                    } catch (error) {

                        console.log(error)
                    }
                } else {
                    setLoginFailed(result.warning)
                    setLoading(false)
                }
            })
        } else {
            setLoginFailed(translate('loginbybiometricisdisable'))
            setShowModal(true)
        }
    }

    const handleLoginBiometricFail = (error) => {
        setLoading(false)
        setLoginFailed(error.DataResponse.ErrorDetail)

    }

    const loginAnotherOne = async () => {
        try {
            await AsyncStorage.removeItem('userData');
            await AsyncStorage.removeItem('userName');
            await AsyncStorage.removeItem('bipmetricToken');

            setUserInfo('');
            setUserName('')
            setBiometricToken('')
        } catch (error) {
            console.log(error)
        }

    }

    return (
        <>
            {
                fetchData &&
                <PaperProvider>
                    <ImageBackground className="w-full  h-full" source={require('../../assets/bg.png')}>

                        <SafeAreaView >
                            <View className="mx-auto pb-13 pt-9">
                                <Image
                                    source={require('../../assets/logo.png')}
                                />
                            </View>
                            <View className="p-4">


                                <View className="bg-white/90 rounded-3xl p-4">

                                    {
                                        userInfo ?


                                            <View>
                                                <Text className="uppercase font-bold">{translate('hello')} {userInfo.fullName}</Text>
                                                <Text className="text-sm font-normal text-gray-700 mt-2">{translate('logintoaccessyouraccount')}</Text>
                                            </View> :
                                            <View>
                                                <Text className="font-bold text-xl mb-1">{translate('welcome')}</Text>
                                                <Text className="text-sm font-normal text-gray-700">{translate('logintoaccessyouraccount')}</Text>
                                            </View>


                                    }
                                    <View className="mt-6">
                                        {
                                            userInfo ? '' :
                                                <TextInput
                                                    className="mb-5"
                                                    label={translate('username')}
                                                    mode='outlined' value={userName}
                                                    onChangeText={userName => setUserName(userName)}
                                                />
                                        }


                                        <PasswordInput handelSetPassWord={handelSetPassWord} />

                                        <View className='justify-end flex flex-row mt-2'>
                                            <Pressable onPress={() => console.log('Chuyển qua màn forgot')}>
                                                <Text className="text-blue-600">{translate('forgotpassword')}?</Text>
                                            </Pressable>
                                        </View>
                                        {
                                            userInfo &&
                                            <Pressable onPress={() => openBiometric()} className="flex flex-row items-center justify-center mt-11">
                                                <Image source={require('../../assets/faceId.png')} />
                                                <Text className="ml-2">{translate('logintouchandface')}</Text>
                                            </Pressable>
                                        }
                                        <View className="mt-6">
                                            <Button onPress={() => login()} className="bg-Primary h-13 flex justify-center rounded-lg" mode='contained'>Login</Button>
                                        </View>
                                        {
                                            userInfo ?
                                                <Pressable onPress={() => loginAnotherOne()} className="my-5">
                                                    <Text className="text-center text-blue-600 font-medium text-xs">{translate('logintoanotherone')}</Text>
                                                </Pressable>
                                                :
                                                <View className="flex flex-row justify-center mt-5">
                                                    <Text className="text-gray-800 font-medium">{translate('donothaveanaccount')}</Text>
                                                    <Pressable><Text className="text-blue-600 font-medium">{translate('register')}</Text></Pressable>
                                                </View>
                                        }

                                    </View>
                                </View>


                            </View>

                        </SafeAreaView>

                        {
                            showModal && (
                                <ModalShow showModal={showModal} hideModal={hideModal} Failed={loginFailed} loading={loading} />
                            )
                        }

                        {
                            showModalOTP && (
                                <ModalOpt
                                    reSendOTP={reSendOTP}
                                    handleSetOTP={handleSetOTP}
                                    showModalOTP={showModalOTP}
                                    hideOTPModal={hideOTPModal}
                                    phoneNo={userData.phoneNo}
                                    expiredLifeTime={ExpiredLifeTime}
                                    checkResendOTP={checkResendOTP}
                                    setCheckResendOTP={setCheckResendOTP}
                                    calAPIWithOTP={calAPIWithOTP}
                                />
                            )
                        }

                    </ImageBackground>
                </PaperProvider>
            }

        </>
    )
}

const styles = StyleSheet.create({})