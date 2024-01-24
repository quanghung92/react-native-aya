import * as Localization from 'expo-localization';
import { I18n } from 'i18n-js';
import LangDetail from '../assets/LangDetail.json'
import { langList } from '../constants/constant';

import store from '../redux/store';

const i18n = new I18n(LangDetail);
i18n.defaultLocale = 'en-US'
// Lấy ngôn ngữ hiện tại từ thiết bị
export const updateLocale = () => {
    const langFromStore = store.getState().storeData.lang;
    i18n.locale = langFromStore;
};
// When a value is missing from a language it'll fallback to another language with the key present.
i18n.enableFallback = true;
// Hàm dịch chuỗi văn bản
export const translate = (key) => {
    const selectedTranslations = i18n.t(key);
    return selectedTranslations ? selectedTranslations : key;
};

export const getCurrentLang = () => {
    const currentLang = langList.find((value) => value.LangId === i18n.locale)
    return currentLang
}

// Lắng nghe sự thay đổi của storeData.lang và cập nhật i18n.locale tương ứng
store.subscribe(() => {
    updateLocale();
});

// Đảm bảo rằng giá trị i18n.locale được cập nhật khi ứng dụng được khởi chạy ban đầu
updateLocale();