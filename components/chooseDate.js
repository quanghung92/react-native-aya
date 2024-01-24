import { StyleSheet, Text, SafeAreaView, Button, View, Pressable, Platform } from 'react-native'
import React, { useState } from 'react'
import DateTimePicker from '@react-native-community/datetimepicker';
import { Icon, Modal, Portal } from 'react-native-paper';
export default function ChooseDate() {
    const [date, setDate] = useState(new Date(1598051730000));
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const [visible, setVisible] = useState(false);
    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate;
        setShow(false);
        setDate(currentDate);
    };

    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    };

    const showDatepicker = () => {
        showMode('date');
    };

    const showTimepicker = () => {
        showMode('time');
    };

    return (
        <>
            <Button title='Test' onPress={() => setVisible(true)} />
            <Modal visible={visible} onDismiss={() => setVisible(false)} className='px-4 flex-1  bg-white'>
                <Portal>
                    <View className="mb-4 flex-1 ">
                        <Text className="text-gray-600 font-medium text-sm mb-2">From date</Text>
                        <Pressable style={{ borderWidth: 1, borderColor: '#D0D5DD', borderRadius: 8 }} className=" rounded-lg p-3 flex flex-row justify-between">
                            <Text className="text-gray-400">dd/mm/yyyy</Text>
                            <Icon
                                source="calendar-month-outline"
                                size={20}
                            />
                        </Pressable>
                    </View>
                    <View >
                        <Text className="text-gray-600 font-medium text-sm mb-2">To date</Text>
                        <Pressable style={{ borderWidth: 1, borderColor: '#D0D5DD', borderRadius: 8 }} className=" rounded-lg p-3 flex flex-row justify-between">
                            <Text className="text-gray-400">dd/mm/yyyy</Text>
                            <Icon
                                source="calendar-month-outline"
                                size={20}
                            />
                        </Pressable>
                    </View>
                    {/* <View>
                {
                    Platform.OS === 'ios' || Platform.OS === 'macos' ?
                        <View className="absolute left-0 right-0 bottom-0">
                            <DateTimePicker
                                testID="dateTimePicker"
                                value={date}
                                mode={mode}
                                is24Hour={true}
                                onChange={onChange}
                                display="spinner"
                            />
                        </View>
                        : <DateTimePicker
                            testID="dateTimePicker"
                            value={date}
                            mode={mode}
                            is24Hour={true}
                            onChange={onChange}
                        />

                }
            </View> */}
                </Portal>
            </Modal>
        </>
    );
}

const styles = StyleSheet.create({})