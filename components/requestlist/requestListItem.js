import { Pressable, StyleSheet, View } from 'react-native'
import React, { useState, useEffect, memo, useMemo } from 'react'
import { ActivityIndicator, Icon, Text } from 'react-native-paper'
import { formatDate } from '../../common/common';
import { statusClasses } from '../../constants/constant';
import { translate } from '../../localization/localization';
import { Skeleton } from 'moti/skeleton';
export default memo(function RequestListItem(props) {
    const [showContent, setShowContent] = useState(true);
    const getStatus = (id, type) => {
        const status = statusClasses.find(v => v.statusKey === id)
        if (type === 'title') {
            return status ? status.statusTitle : id
        } else if (type === 'bg') {
            return status ? status.statusBGClass : ''
        } else if (type === 'color') {
            return status ? status.statusTextClass : ''
        }
    }

    const skeletonProps = {
        colorMode: 'light',
        transition: {
            type: 'timing',
            duration: 250
        },
        backgroundColor: '#D4D4D4'
    }

    const skeleton = () => {
        return (
            <View className="mb-3 mt-4">
                {/* <Skeleton.Group show={true}>
                    <View className="flex justify-between items-center flex-row mb-2">
                        <Skeleton width={200} height={30} {...skeletonProps} ></Skeleton>
                        <Skeleton width={100} height={30} {...skeletonProps}></Skeleton>
                    </View>
                    <View>
                        <View className="flex justify-between items-end flex-row mb-2">
                            <Skeleton width={200} height={60} {...skeletonProps} ></Skeleton>
                            <View className="flex justify-between flex-row">
                                <View className="mr-1"><Skeleton width={30} height={20} {...skeletonProps}></Skeleton></View>
                                <Skeleton width={30} height={20} {...skeletonProps}></Skeleton>
                            </View>
                        </View>
                    </View>
                    
                </Skeleton.Group> */}
                <ActivityIndicator />
            </View>
        )

    }

    return (
        <View>
            {
                props.requestItems ? (

                    <View className="mb-3 pb-3  ">
                        <View className="flex justify-between items-center flex-row mb-2">
                            <Text className="font-semibold capitalize">{translate(props.requestItems.RequestName || '')} </Text>

                            <View className={`${getStatus(props.requestItems.Status, 'bg')} p-1 rounded`}>
                                <Text className={`${getStatus(props.requestItems.Status, 'color')} text-center`}>{translate(getStatus(props.requestItems.Status, 'title') || '')}</Text>

                            </View>

                        </View>
                        <View>

                            <View className="flex flex-row gap-2 mb-2">
                                <Text>{translate('requestid')}</Text>
                                <Text>{props.requestItems.RequestId || ''}</Text>
                            </View>


                            <View className="flex flex-row items-center justify-between">

                                <View>
                                    <View className="flex flex-row gap-2 mb-2">
                                        <Text>{translate('bookingbranch')}</Text>
                                        <Text>{props.requestItems.BookingBranch || ''}</Text>
                                    </View>
                                    <View className="flex flex-row gap-2 mb-2">
                                        <Text>{translate('bookingdate')}</Text>
                                        <Text>{formatDate(props.requestItems.DateTimeAppointment)}</Text>
                                    </View>
                                </View>


                                <View className="flex flex-row gap-1 mb-2">
                                    <Pressable>
                                        <Icon source="qrcode"
                                            size={20} />
                                    </Pressable>
                                    <Pressable>
                                        <Icon source="map-outline"
                                            size={20} />
                                    </Pressable>
                                </View>


                            </View>
                        </View>
                    </View>

                ) : showContent &&
                (
                    skeleton()
                )
            }

        </View>

    )
}
)
