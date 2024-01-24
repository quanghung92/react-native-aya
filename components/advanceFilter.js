import { View, Text, Pressable } from 'react-native'
import React, { useState, useEffect, memo, useCallback } from 'react'
import ChooseDate from './controls/chooseDate'
import { Button, Icon, PaperProvider } from 'react-native-paper'

import ModalShow from './modal';
import Dropdown from './controls/dropdown';
import { useSelector, useDispatch } from 'react-redux';
import { setRequestType, setBookingBranch } from '../redux/reducers/storeData';
import { APIPost } from '../common/apicomm';
import Modal from "react-native-modal";
import { useSafeAreaInsets } from 'react-native-safe-area-context';
export default memo(function AdvanceFilter(props) {
    const { requestType, bookingBranch } = useSelector(state => state.storeData)
    const [showModal, setShowModal] = useState(false)
    const [showFilter, setShowFilter] = useState(props.showFilter)
    const [failedMess, setFailedMess] = useState('')
    const [statusData] = useState([
        {
            status: 'A',
            statusStr: 'active'

        },
        {
            status: 'E',
            statusStr: 'expired'

        },
        {
            status: 'C',
            statusStr: 'completed'

        },
        {
            status: 'F',
            statusStr: 'failed'

        },
        {
            status: 'I',
            statusStr: 'inprocess'

        },
        {
            status: 'U',
            statusStr: 'cancel'

        }


    ])
    const insets = useSafeAreaInsets();
    const dispatch = useDispatch()
    const fetchData = useCallback(async () => {
        try {
            if (requestType.length === 0) {
                const result = await APIPost('ctmrequesttype/cbb', {}, handleGetRequestTypeSuccess, handleGetRequestTypeFailed);
                handleGetRequestTypeSuccess(result);
            }

            if (bookingBranch.length === 0) {
                const result = await APIPost('branchinbank/cbb', {}, handleGetBookingBranchSuccess, handleGetBookingBranchFailed);
                handleGetBookingBranchSuccess(result);
            }
        } catch (error) {
            console.log(error);
        }
    }, [bookingBranch.length, requestType.length]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);


    const handleGetBookingBranchSuccess = (result) => {

        dispatch(setBookingBranch(result.data))
    }

    const handleGetBookingBranchFailed = (err) => {
        setFailedMess(err.ErrorDesc)
        setShowModal(true)
    }

    const handleGetRequestTypeSuccess = (result) => {
        dispatch(setRequestType(result.data))
    }

    const handleGetRequestTypeFailed = (err) => {
        setFailedMess(err.ErrorDesc)
        setShowModal(true)
    }


    const hideModal = () => {
        setShowModal(false)
    }


    const handleShowModal = () => {
        setShowFilter(false)
        props.closeFilter(false)
    }
    return (

        <Modal
            isVisible={props.showFilter}
            backdropOpacity={1}
            backdropColor='#FFFFFF'
            backdropTransitionOutTiming={0}
            animationIn={'fadeInRight'}
            animationOut={'fadeOutRight'}

        >

            <View style={{ paddingTop: insets.top }} className="flex-1 ">
                <View className="flex w-full flex-row  items-center justify-center mb-6">
                    <Text className="text-gray-900 text-lg font-medium">Advance filter</Text>
                    <Pressable android_ripple={{ color: 'rgba(0, 0,0,.2)', foreground: true }} onPress={handleShowModal} className="absolute  right-0 top-0"><Icon
                        source="close"
                        size={30}
                    /></Pressable>
                </View>
                <View >
                    <ChooseDate
                        title="From date"
                        date={props.paramSearch.fromDate}
                        changeDate={(data) => props.getFromDate(data)}
                    />
                    <ChooseDate
                        title="To date"
                        date={props.paramSearch.toDate}
                        changeDate={(data) => props.getTodate(data)}
                    />
                    <Dropdown
                        dataDropdown={statusData}
                        idDropdown={props.paramSearch.status}
                        nameDropdown={props.paramSearch.statusName}
                        hanleChooseDropdown={(name, id) => props.handleSetParamSearch('status', name, id)}
                        label="statusStr" id='status' title="Status" placeHodler='Choose status'
                        estimatedItemSize={8}
                    />
                    <Dropdown
                        idDropdown={props.paramSearch.requestType}
                        nameDropdown={props.paramSearch.RequestTypeName}
                        dataDropdown={requestType}
                        hanleChooseDropdown={(name, id) => props.handleSetParamSearch('requestType', name, id)}
                        label="TypeName" id='TypeId'
                        title="Request type"
                        placeHodler='Choose one'
                        estimatedItemSize={8}
                    />
                    <Dropdown
                        idDropdown={props.paramSearch.bookingBranch}
                        nameDropdown={props.paramSearch.bookingBranchName}
                        dataDropdown={bookingBranch}
                        hanleChooseDropdown={(id, name) => props.handleSetParamSearch('bookingBranch', id, name)}
                        label="BranchName"
                        id='BranchCode'
                        title="Booked branch"
                        placeHodler='Choose one' estimatedItemSize={200} />


                    {
                        showModal && (
                            <ModalShow showModal={showModal} hideModal={hideModal} Failed={failedMess} />
                        )
                    }
                </View>
                <View className="flex flex-row justify-between w-full mt-8 absolute bottom-0">
                    <Button onPress={() => props.handleClearAllData()} style={{ borderColor: '#D32D2F' }} mode='outlined' className="border-red-500 flex-1 mr-2 rounded-lg" ><Text className="text-Primary">Clear All</Text></Button>
                    <Button onPress={() => props.handleApplySearch('needReset')} mode='contained' className="bg-Primary flex-1 ml-2 rounded-lg"><Text className="text-white">Apply</Text></Button>
                </View>
            </View>
        </Modal>
    )
})
