import { ActivityIndicator, Pressable, StyleSheet, View } from 'react-native'
import React, { useEffect, useState, useRef } from 'react'
import { Text, Button } from 'react-native-paper';
import Modal from "react-native-modal";
import OTPInput from './controls/otpInput';
import ErrorComponent from './errorComponent';
export default function ModalOpt(props) {
    const [visible, setVisible] = React.useState(props.showModalOTP);
    const [minutestDown, setMinutestDown] = useState(null)
    const [secondtDown, setsecondtDown] = useState(null)
    const [showResenOTP, setShowResendOTP] = useState(false)
    const intervalRef = useRef(null);

    const countDown = () => {
        const countDownDate = new Date().getTime() + (60 * props.expiredLifeTime * 1000);
        if (props.expiredLifeTime > 0) {
            intervalRef.current = setInterval(() => {
                const now = new Date().getTime();
                const distance = countDownDate - now;
                const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((distance % (1000 * 60)) / 1000);
                setMinutestDown(minutes);
                setsecondtDown(seconds);
                if (distance <= 0) {

                    props.setCheckResendOTP(false)
                    setMinutestDown(0);
                    setsecondtDown(0);
                    clearInterval(intervalRef.current);
                    setShowResendOTP(true)
                }
            }, 1000);
        }

    }

    useEffect(() => {
        console.log(props.expiredLifeTime, props.checkResendOTP)
        if (props.checkResendOTP === true) {

            countDown()
            setShowResendOTP(false)
        }

        return () => clearInterval(intervalRef.current);
    }, [props.checkResendOTP, props.expiredLifeTime])


    useEffect(() => {
        setVisible(props.showModalOTP)
    }, [props.showModalOTP])


    const hideModalOTP = () => {
        clearInterval(intervalRef.current);
        props.hideOTPModal()
        props.setCheckResendOTP(false)
        setVisible(false)
    }


    String.prototype.replaceAt = function (index, replacement) {
        return this.substring(0, index) + replacement + this.substring(index + replacement.length);
    }
    const handleResendOTP = () => {
        props.reSendOTP()
    }

    const callAPIWithOTP = () => {
        props.calAPIWithOTP()
    }

    return (

        <View>
            <View className="flex-1">
                <Modal
                    isVisible={visible}
                    onBackdropPress={() => hideModalOTP()}
                    animationIn={'fadeIn'}
                    animationOut={'fadeOut'}
                >
                    {
                        props.loading ?

                            <ActivityIndicator size="large" color="#BA0323" />
                            :
                            props.getOTPFail ?
                                <ErrorComponent Failed={props.failMess} hideModal={hideModalOTP} />
                                :
                                <View className="bg-white p-4 rounded-md">
                                    <Text className="font-semibold text-lg text-gray-900 text-center">OTP Verification</Text>
                                    <Text className="text-center font-normal text-sm text-gray-700">Please enter OTP sent to phone number</Text>
                                    <Text className="text-center font-bold text-lg text-gray-900 mb-9 mt-2">{props.phoneNo.replaceAt(3, '****')}</Text>
                                    <OTPInput setOtpNumber={props.setOtpNumber} handleSetOTP={props.handleSetOTP} />
                                    {
                                        showResenOTP ? (

                                            <Pressable onPress={() => handleResendOTP()} className="mt-10 mb-5 text-center w-fit ">
                                                <Text className="text-center p-1">Resend OTP</Text>
                                            </Pressable>

                                        ) : (
                                            <View className='flex flex-row gap-2 mt-10 mb-5 justify-center items-center'>
                                                <Text className="text-center font-normal text-sm  text-gray-500">Expire in</Text>
                                                <Text className="text-orange-600 font-medium"> {minutestDown}:{secondtDown} </Text>
                                            </View>
                                        )
                                    }
                                    <View className="flex flex-row gap-4">

                                        <Button style={{ borderColor: '#D32D2F', borderWidth: 1 }} className="bg-white mt-8 flex-1 rounded-lg h-12 flex justify-center" onPress={() => hideModalOTP()}>
                                            <Text className="text-Primary">Cancel</Text>
                                        </Button>
                                        <Button className="bg-Primary mt-8 flex-1 rounded-lg h-12 flex justify-center" onPress={() => callAPIWithOTP()}>
                                            <Text className="text-white">Confirm</Text>
                                        </Button>
                                    </View>
                                </View>
                    }

                </Modal>
            </View>
        </View>
    )
}
