import { StyleSheet, FlatList, View, ActivityIndicator } from 'react-native'
import React from 'react'
import RequestListItem from './requestListItem'
export default function RequestList(props) {
    const renderLoad = () => {
        return (
            <View>
                <ActivityIndicator size='large' color='#aaa' />
            </View>
        )
    }
    const loadMore = () => {
        props.loadMoreData()
    }
    return (
        <View>
            <FlatList
                data={props.requestData}
                renderItem={({ item }) => (
                    <>
                        <RequestListItem requestItems={item} />
                    </>
                )}
                keyExtractor={(item, index) => item ? item.RequestId : index}
                ItemSeparatorComponent={() => <View className="border-b border-b-gray-200"></View>}
                initialNumToRender={1}
                showsVerticalScrollIndicator={false}
                ListFooterComponent={props.loading && renderLoad}

                onEndReached={() => loadMore()}
                onEndReachedThreshold={0.5}

            />
        </View>
    )
}

const styles = StyleSheet.create({})