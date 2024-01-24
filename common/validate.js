import moment from 'moment';

export const isFromDateBeforeToDate = (fromDateStr, toDateStr) => {
    const fromDate = moment(fromDateStr);
    const toDate = moment(toDateStr);

    if (fromDate.isBefore(toDate, 'day')) {
        return true; // Trả về true nếu fromDate nhỏ hơn toDate
    }

    return false; // Trả về false nếu fromDate không nhỏ hơn toDate
}