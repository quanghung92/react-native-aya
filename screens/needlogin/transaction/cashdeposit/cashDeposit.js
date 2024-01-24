import { StyleSheet, Text, View, ScrollView, InteractionManager, KeyboardAvoidingView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Checkbox, RadioButton, SegmentedButtons, Switch, TextInput, ToggleButton, Button } from 'react-native-paper'
import Dropdown from '../../../../components/controls/dropdown';
import { Formik } from 'formik'
import { FlashList } from '@shopify/flash-list';

export default function CashDeposit() {

    const [status, setStatus] = React.useState('checked');
    const [checked, setChecked] = React.useState(false);
    const [isRendered, setRendered] = useState(false);
    useEffect(() => {
        InteractionManager.runAfterInteractions(() => {
            setRendered(true);
        });
    }, []);

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
    const onButtonToggle = value => {
        setStatus(status === 'checked' ? 'unchecked' : 'checked');
    };
    const setValue = () => {
        console.log(`1`, 1);
    }
    const handleSetParamSearch = (a) => {
        console.log(`a`, a);
    }

    // const renderContent = () => (

    // )

    const DATA = [
        null
    ];

    return (
        <FlashList
            data={DATA}
            renderItem={() =>
                <>
                    <Formik
                        initialValues={{ email: '', password: '' }}
                        onSubmit={values => console.log(values)}
                    >
                        {({ handleChange, handleBlur, handleSubmit, values }) => (
                            <>
                                <TextInput
                                    name="email"
                                    placeholder="Email Address"
                                    onChangeText={handleChange('email')}
                                    onBlur={handleBlur('email')}
                                    value={values.email}
                                    keyboardType="email-address"
                                />

                            </>
                        )}
                    </Formik>
                </>
            }
            estimatedItemSize={2}
        />
    )
}
