import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated'
import 'react-native-gesture-handler'
import AppNavigation from './navigation/appNavigation';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import 'expo-dev-client';
import ModalLoading from './components/modalLoading';

import { Provider } from 'react-redux'
import store from './redux/store';

export default function App() {
  return (

    <Provider store={store}>
      <StatusBar
        backgroundColor={"#FFFFFF"}
        barStyle={"dark-content"}
      />
      <SafeAreaProvider>
        <AppNavigation />
        <ModalLoading />
      </SafeAreaProvider>
    </Provider>
  );
}


