import { createSlice } from '@reduxjs/toolkit'
const initialState = {
    upComming: [],
    ticketList: [],
    ticketLoading: false,
    cprik: '',
    cpubk: '',
    requestType: [],
    bookingBranch: [],
    requestList: {
        requestData: [],
        reloadRequestData: false,
        canLoadMore: false
    },
    lang: 'en-US',
    loading: false
}

export const storeDataSlice = createSlice({
    name: 'storeData',
    initialState,
    reducers: {
        setUpComming: (state, actions) => {
            state.upComming = actions.payload;
        },
        setTicketList: (state, actions) => {
            state.ticketList = actions.payload;
        },
        setLoadingTicket: (state, actions) => {
            state.ticketLoading = actions.payload;
        },
        setRequestType: (state, actions) => {
            state.requestType = actions.payload;
        },
        setBookingBranch: (state, actions) => {
            state.bookingBranch = actions.payload;
        },

        setRequestList: (state, actions) => {
            const { requestData, reloadRequestData, canLoadMore } = actions.payload;
            state.requestList = {
                ...state.requestList, // Sao chép tất cả các thuộc tính từ requestList cũ
                requestData: requestData !== undefined ? requestData : state.requestList.requestData, // Thay đổi requestData nếu được cung cấp, ngược lại giữ nguyên giá trị cũ
                reloadRequestData: reloadRequestData !== undefined ? reloadRequestData : state.requestList.reloadRequestData, // Thay đổi reloadRequestData nếu được cung cấp, ngược lại giữ nguyên giá trị cũ
                canLoadMore: canLoadMore !== undefined ? canLoadMore : state.requestList.canLoadMore
            };
        },

        setLoadingPage: (state, actions) => {
            state.loading = actions.payload;
        },

        setLang: (state, actions) => {
            state.lang = actions.payload;
        },
    },
})

// Action creators are generated for each case reducer function
export const { setUpComming, setTicketList, setLoadingTicket, setRequestType, setBookingBranch, setRequestList, setLang, setLoadingPage } = storeDataSlice.actions

export default storeDataSlice.reducer