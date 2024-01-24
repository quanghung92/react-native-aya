import { Text, View, StyleSheet, Image, Pressable } from 'react-native'
import React, { useEffect } from 'react'
import Modal from "react-native-modal";
import { langList } from '../../constants/constant';
import { useSelector, useDispatch } from 'react-redux';
import { getCurrentLang } from '../../localization/localization';
import { setLang } from '../../redux/reducers/storeData';

export default function ModalChooseLang(props) {
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
        dispatch(setLang(key))
    }
    return (
        <Modal
            isVisible={visible}
            onBackdropPress={() => hideModal()}
            style={styles.view}
        >
            <View style={{ minHeight: 150 }} className="bg-white p-2 py-4 max-h-96">

                {
                    langList.map(v => (
                        <Pressable onPress={() => changeLangModal(v.LangId)} key={v.LangId} className="flex flex-row items-center gap-3 mb-5">
                            <Image className="h-5 w-5" source={{ uri: v.Image.uri }} />
                            <Text>{v.LangName}</Text>
                            {
                                getCurrentLang().LangId === v.LangId && (
                                    <Image className="absolute right-0 top-0" source={require('../../assets/mark.png')} />
                                )
                            }
                        </Pressable>
                    ))
                }
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    view: {
        justifyContent: 'flex-end',
        margin: 0,
    },
});