import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import LottieView from 'lottie-react-native';
import Modal from "react-native-modal";
import { useSelector } from 'react-redux';

export default function ModalLoading() {
    const { loading } = useSelector(state => state.storeData)
    return (
        <Modal
            animationIn={'fadeIn'}
            animationOut={'fadeOut'}
            animationOutTiming={0}
            isVisible={loading}
        >
            <LottieView source={require('../assets/loading.json')} autoPlay loop />
        </Modal>

    )
}

const styles = StyleSheet.create({})