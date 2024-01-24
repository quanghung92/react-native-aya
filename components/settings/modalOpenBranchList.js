import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Modal from "react-native-modal";

export default function ModalOpenBranchList(props) {
    const [visible, setVisible] = React.useState(props.showModal);
    const dispatch = useDispatch()
    useEffect(() => {
        setVisible(props.showModal)
    }, [props.showModal])
    const hideModal = () => {
        props.hideModal()
        setVisible(false)
    }
    return (
        <Modal
            isVisible={visible}
            onBackdropPress={() => hideModal()}
            style={styles.view}
        >
            <View><Text>Test</Text></View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    view: {
        justifyContent: 'flex-end',
        margin: 0,
    },
});