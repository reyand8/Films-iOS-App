import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, Dimensions, TextInput, TouchableOpacity,
    ScrollView, TouchableWithoutFeedback, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { XMarkIcon } from 'react-native-heroicons/outline';
import { debounce } from 'lodash';
import tw from 'twrnc';
import { useNavigation } from '@react-navigation/native';
import { useQuery } from "@apollo/client";

import Loading from '../components/Loading';
import { FILMS_BY_SEARCH_QUERY } from "../gqlClient/queries/queries";

const { width, height } = Dimensions.get('window');

export default function SearchScreen() {
    const navigation = useNavigation();
    const [searchQuery, setSearchQuery] = useState('');
    const [result, setResult] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const {
        data: searchData,
        loading: searchLoading,
        error: searchError } = useQuery(FILMS_BY_SEARCH_QUERY, {
        variables: {
            search: {
                query: searchQuery,
                include_adult: false,
                language: "en-US",
                page: 1,
            },
        },
        skip: searchQuery.length < 3,
    });

    useEffect(() => {
        if (searchData) {
            setResult(searchData?.filmsBySearchQuery?.results || []);
        }
    }, [searchData]);

    useEffect(() => {
        setLoading(searchLoading);
    }, [searchLoading]);

    useEffect(() => {
        setError(!!searchError);
    }, [searchError]);

    const handleSearch = (value) => {
        setSearchQuery(value);
    };

    const handleTextDebounce = useCallback(debounce(handleSearch, 400), []);

    return (
        <SafeAreaView style={tw`bg-neutral-800 flex-1`}>
            <View style={tw`mx-4 mb-3 flex-row justify-between items-center border border-neutral-500 rounded-full`}>
                <TextInput
                    onChangeText={handleTextDebounce}
                    placeholder="Search Film"
                    placeholderTextColor="lightgray"
                    style={tw`pb-1 pl-6 flex-1 text-base font-semibold text-white tracking-wider`}
                />
                <TouchableOpacity
                    onPress={() => navigation.navigate('Home')}
                    style={tw`rounded-full p-3 m-1 bg-neutral-500`}>
                    <XMarkIcon size="25" color="white" />
                </TouchableOpacity>
            </View>
            {
                loading ? <Loading /> : (
                    result.length > 0 ? (
                        <ScrollView
                            showsVerticalScrollIndicator={false}
                            contentContainerStyle={tw`px-4`}
                            style={tw`space-y-3`}>
                            <Text style={tw`text-white font-semibold ml-1`}>
                                Results ({result.length})
                            </Text>
                            <View style={tw`flex-row justify-between flex-wrap`}>
                                {
                                    result.map((item, index) => (
                                        <TouchableWithoutFeedback
                                            key={index}
                                            onPress={() => navigation.push('Film', item)}>
                                            <View style={tw`space-y-2 mb-4`}>
                                                <Image
                                                    source={{ uri: item.image }}
                                                    style={tw`rounded-3xl`}
                                                    width={width * 0.44}
                                                    height={height * 0.3}
                                                />
                                                <Text style={tw`text-gray-300 ml-1`}>
                                                    {
                                                        item?.title.length > 22
                                                            ? item?.title.slice(0, 22) + '...'
                                                            : item?.title
                                                    }
                                                </Text>
                                            </View>
                                        </TouchableWithoutFeedback>
                                    ))
                                }
                            </View>
                        </ScrollView>
                    ) : (
                        <View style={tw`flex-col justify-center items-center`}>
                            <Image
                                source={require('../assets/images/filmTime.png')}
                                style={tw`h-96 w-96`}
                            />
                            <Text style={tw`text-neutral-400 text-xl`}>
                                Explore the world of cinema!
                            </Text>
                        </View>
                    )
                )
            }
        </SafeAreaView>
    );
}