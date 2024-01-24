import { Pressable, View, FlatList, Text } from 'react-native'
import React, { useEffect, useState, useMemo } from 'react'
import AdvanceFilter from '../../../../components/advanceFilter'
import { Searchbar, Icon, Button } from 'react-native-paper';
import { isFromDateBeforeToDate } from '../../../../common/validate';
import { setRequestList } from '../../../../redux/reducers/storeData';
import { useSelector, useDispatch } from 'react-redux';
import ModalShow from '../../../../components/modal';
import { APIPost } from '../../../../common/apicomm';
// import { FlashList } from '@shopify/flash-list';
import RequestList from '../../../../components/requestlist/requestList';
export default function RequestManagementList() {

    const dispatch = useDispatch()
    const currentDate = new Date();
    const [inputSeach, setInputSearch] = useState('')
    const [showFilterModal, setShowFilterModal] = useState(false)
    const { requestList } = useSelector(state => state.storeData)
    const [failedMess, setFailedMess] = useState('')
    const [showModal, setShowModal] = useState(false)
    const [fetching, setFetching] = useState(true);
    const [loading, setLoading] = useState(false)
    const [pageIndex, setPageIndex] = useState(1)
    const [paramSearch, setParamSearch] = useState({
        fromDate: new Date(currentDate.getTime() - 60 * 24 * 60 * 60 * 1000),
        toDate: new Date(currentDate.getTime()),
        status: '',
        statusName: '',
        requestType: '',
        RequestTypeName: '',
        bookingBranch: '',
        bookingBranchName: '',
    })

    useEffect(() => {
        if (fetching) {
            if (requestList.requestData.length == 0 || requestList.reloadRequestData) {
                getRequestList()
            }
        }

    }, [fetching])


    const getFromDate = (data) => {
        if (isFromDateBeforeToDate(data, paramSearch.toDate)) {
            setParamSearch({ ...paramSearch, fromDate: data })
        } else {
            setFailedMess('From date must be smaller than To date ')
            setShowModal(true)
        }
    }
    const getTodate = (data) => {
        if (isFromDateBeforeToDate(paramSearch.fromDate, data)) {
            setParamSearch({ ...paramSearch, toDate: data })
        } else {
            setFailedMess('From date must be smaller than To date ')
            setShowModal(true)
        }

    }
    const hideModal = () => {
        setShowModal(false)

    }

    const handleSetParamSearch = (id, nameDropdown, value) => {
        switch (id) {
            case 'status':
                setParamSearch({ ...paramSearch, status: value, statusName: nameDropdown })
                break;
            case 'requestType':
                setParamSearch({ ...paramSearch, requestType: value, RequestTypeName: nameDropdown })
                break;
            case 'bookingBranch':
                setParamSearch({ ...paramSearch, bookingBranch: value, bookingBranchName: nameDropdown })
                break;
            default:
                break;
        }
    }


    const handleApplySearch = async (needReset) => {

        if (needReset === 'needReset') {
            setPageIndex(1)
            dispatch(setRequestList({
                requestData: [],
                reloadRequestData: false,
                canLoadMore: false,

            }))
        }
        setFetching(true)
        if (showFilterModal) {
            setShowFilterModal(false);
        }
    }

    const getRequestList = async () => {
        try {
            const requestData = requestList.requestData;
            const reloadRequestData = requestList.reloadRequestData;
            if (requestData.length === 0 || reloadRequestData) {
                await APIPost('ctmrequest/list', {
                    requestType: paramSearch.requestType,
                    status: paramSearch.status,
                    fromDate: paramSearch.fromDate,
                    toDate: paramSearch.toDate,
                    branchId: paramSearch.bookingBranch,
                    pageSize: '15',
                    pageIndex: pageIndex,
                    typeSearch: 'advancesearch',
                    keySearch: ''
                }, handleGetRequestSuccess, handleGetRequestFailed)
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handleGetRequestSuccess = (result) => {
        setFetching(false)
        setLoading(false)
        dispatch(setRequestList({
            requestData: [...requestList.requestData, ...result.data.data],
            reloadRequestData: false,
            canLoadMore: result.data.data.length < 15 ? false : true
        }))


    }
    const handleGetRequestFailed = (err) => {
        setFetching(false)
        setLoading(false)
        setFailedMess(err.ErrorDesc)
        setShowModal(true)
    }


    const handleClearAllData = () => {
        setParamSearch({
            fromDate: new Date(),
            toDate: new Date(currentDate.getTime() + 24 * 60 * 60 * 1000),
            status: '',
            statusName: '',
            requestType: '',
            RequestTypeName: '',
            bookingBranch: '',
            bookingBranchName: ''
        })
    }
    const onChangeSearch = (text) => {
        setInputSearch(text)
    }
    const showAdvandFilter = () => {
        setShowFilterModal(!showFilterModal)

    }

    const loadMoreData = () => {
        dispatch(setRequestList({
            requestData: undefined,
            reloadRequestData: true,
            canLoadMore: undefined
        }))
        if (requestList.canLoadMore && !fetching) {
            setFetching(true)
            setLoading(true)
            setPageIndex(pageIndex + 1)
        }

    }

    const requestPlaceholderList = useMemo(() => {
        return Array.from({ length: 1 }).map(_ => null)
    }, [])

    const searchComponent = useMemo(() => {
        return (
            <Searchbar
                placeholder="Search"
                onChangeText={onChangeSearch}
                value={inputSeach}
                right={() => (
                    <Pressable android_ripple={{ color: 'rgba(0, 0,0,.2)', foreground: true }} onPress={() => showAdvandFilter()} className="p-2">
                        <Icon
                            source="filter-variant"
                            size={25}
                        />
                    </Pressable>
                )}
                style={{ borderRadius: 10, backgroundColor: 'transparent', borderWidth: 1, borderColor: '#D8DADB' }}
            />
        )
    }, [inputSeach])

    return (

        <View className="flex-1 px-4 py-6 bg-white">
            {searchComponent}
            <AdvanceFilter
                showFilter={showFilterModal}
                closeFilter={showAdvandFilter}
                getFromDate={getFromDate}
                getTodate={getTodate}
                handleSetParamSearch={handleSetParamSearch}
                handleApplySearch={handleApplySearch}
                handleClearAllData={handleClearAllData}
                paramSearch={paramSearch}
            />

            {
                showModal && (
                    <ModalShow showModal={showModal} hideModal={hideModal} Failed={failedMess} />
                )
            }
            <View className="flex-1 mt-7 mb-4">
                <RequestList
                    requestData={requestList.requestData.length > 0 ? requestList.requestData : requestPlaceholderList}
                    loading={loading}
                    loadMoreData={() => loadMoreData()}
                />
            </View>

        </View>
    )
}
