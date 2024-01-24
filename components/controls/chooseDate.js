import { StyleSheet, Text, SafeAreaView, Button, View, Pressable, Platform } from 'react-native'
import React, { useEffect, useState } from 'react'
import DateTimePicker from '@react-native-community/datetimepicker';
import { Icon, Modal, Portal } from 'react-native-paper';
import moment from 'moment';
export default function ChooseDate(props) {
    const [date, setDate] = useState(props.date ? props.date : new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);

    useEffect(() => {
        props.changeDate(date)
    }, [date])

    useEffect(() => {
        setDate(props.date)
    }, [props.date])
    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate;
        setShow(false);
        setDate(currentDate);

    };

    const showDatePicker = () => {
        setShow(true);
    }

    return (
        <>
            <View >
                <View className="mb-4 ">
                    <Text className="text-gray-600 font-medium text-sm mb-2">{props.title ? props.title : 'Date'}</Text>
                    <Pressable onPress={() => showDatePicker()} style={{ borderWidth: 1, borderColor: '#D0D5DD', borderRadius: 8 }} className=" rounded-lg p-3 flex flex-row justify-between">
                        <Text>{moment(date).format("DD/MM/YYYY")}</Text>
                        <Icon
                            source="calendar-month-outline"
                            size={20}
                        />
                    </Pressable>
                </View>
                {
                    show && (
                        <View>
                            {
                                Platform.OS === 'ios' || Platform.OS === 'macos' ?
                                    <View className="absolute left-0 right-0 bottom-0">
                                        <DateTimePicker
                                            maximumDate={props.maxDate ? new Date(props.maxDate) : undefined}
                                            minimumDate={props.minDate ? new Date(props.minDate) : undefined}
                                            value={date}
                                            mode={mode}
                                            is24Hour={props.is24Hour ? true : false}
                                            onChange={onChange}
                                            display="spinner"
                                            dia
                                        />
                                    </View>
                                    : <DateTimePicker
                                        maximumDate={props.maxDate ? new Date(props.maxDate) : undefined}
                                        minimumDate={props.minDate ? new Date(props.minDate) : undefined}
                                        value={date}
                                        mode={mode}
                                        is24Hour={props.is24Hour ? true : false}
                                        onChange={onChange}
                                    />

                            }
                        </View>
                    )
                }

            </View>
        </>
    );
}

const styles = StyleSheet.create({})