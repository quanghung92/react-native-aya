import { ScrollView, Text, Image, Pressable } from 'react-native'
import React from 'react'
import { translate } from '../../../../localization/localization';
import { ticketTypes } from '../../../../constants/constant';
import { FlashList } from '@shopify/flash-list';

export default function TicketList() {

    return (
        <FlashList
            data={ticketTypes}
            renderItem={(item) => (
                <Pressable className="flex flex-row items-center gap-2 bg-white rounded-md px-5 py-6 mb-4" >
                    <Image style={{ objectFit: 'contain' }} className="w-6 h-6" source={{ uri: item.item.Icon.uri }} />
                    <Text className="text-gray-900 text-base ml-2">{translate(item.item.TypeName)}</Text>

                </Pressable>
            )}
            keyExtractor={(item) => item.PageId}
            estimatedItemSize={15}
        />

    )
}

