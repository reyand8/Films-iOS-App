import { View, Text, Image, ScrollView, TouchableOpacity, Platform } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useRoute, useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeftIcon } from 'react-native-heroicons/outline';
import { HeartIcon } from 'react-native-heroicons/solid';
import { useQuery } from "@apollo/client";
import tw from 'twrnc';

import { styles, theme } from '../theme';
import Loading from '../components/Loading';
import { PERSON_DETAILS, PERSON_FILMS_CREDITS } from "../gqlClient/queries/queries";
import FilmList from "../components/FilmList";

const ios = Platform.OS === "ios";
const topMargin = ios ? '' : ' my-3';

export default function PersonScreen() {
    const { params: item } = useRoute();
    const navigation = useNavigation();
    const paramId = +item.id;
    const [isFavourite, toggleFavourite] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [personDetails, setPersonDetails] = useState([]);
    const [personFilms, setPersonFilms] = useState([]);

    const {
        data: personDetailsData,
        loading: personDetailsLoading,
        error: personDetailsError
    } = useQuery(PERSON_DETAILS, {
        variables: { id: paramId }
    });

    const {
        data: personFilmsData,
        loading: personFilmsLoading,
        error: personFilmsError
    } = useQuery(PERSON_FILMS_CREDITS, {
        variables: { id: paramId }
    });

    useEffect(() => {
        if (personDetailsData) {
            setPersonDetails(personDetailsData?.personDetails);
        }
        if (personFilmsData) {
            setPersonFilms(personFilmsData?.personFilms?.cast);
        }
    }, [personDetailsData, personFilmsData]);

    useEffect(() => {
        setLoading(personDetailsLoading || personFilmsLoading);
    }, [personDetailsLoading, personFilmsLoading]);

    useEffect(() => {
        setError(!!(personDetailsError || personFilmsError));
    }, [personDetailsError, personFilmsError]);

    return (
        <ScrollView
            style={tw`flex-1 bg-neutral-900`}
            contentContainerStyle={tw`pb-5`}
        >
            <SafeAreaView style={tw`flex-row justify-between items-center mx-4 z-10 ${topMargin}`}>
                <TouchableOpacity style={tw`rounded-xl p-1 ${styles.background}`} onPress={() => navigation.goBack()}>
                    <ChevronLeftIcon size={28} strokeWidth={2.5} color="white" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => toggleFavourite(!isFavourite)}>
                    <HeartIcon size={35} color={isFavourite ? theme.background : "white"} />
                </TouchableOpacity>
            </SafeAreaView>
            {
                loading ? <Loading /> : (
                    <View>
                        <View style={tw`flex-row justify-center`}>
                            <View style={tw`items-center rounded-full overflow-hidden h-72 w-72 border-2 border-neutral-500`}>
                                <Image
                                    source={{ uri: personDetails.profilePath }}
                                    style={tw`h-full w-full`}
                                    resizeMode="cover"
                                />
                            </View>
                        </View>
                        <View style={tw`mt-6`}>
                            <Text style={tw`text-3xl text-white font-bold text-center`}>
                                {personDetails?.name}
                            </Text>
                            <Text style={tw`text-neutral-500 text-base text-center`}>
                                {personDetails?.placeOfBirth}
                            </Text>
                        </View>
                        <View style={tw`mx-3 p-4 mt-6 flex-row justify-between items-center bg-neutral-700 rounded-full`}>
                            <View style={tw`border-r-2 border-r-neutral-400 px-2 items-center`}>
                                <Text style={tw`text-white font-semibold`}>Gender</Text>
                                <Text style={tw`text-neutral-300 text-sm`}>
                                    {personDetails?.gender === 1 ? 'Female' : 'Male'}
                                </Text>
                            </View>
                            <View style={tw`border-r-2 border-r-neutral-400 px-2 items-center`}>
                                <Text style={tw`text-white font-semibold`}>Birthday</Text>
                                <Text style={tw`text-neutral-300 text-sm`}>
                                    {personDetails?.birthday}
                                </Text>
                            </View>
                            <View style={tw`px-2 items-center`}>
                                <Text style={tw`text-white font-semibold`}>Popularity</Text>
                                <Text style={tw`text-neutral-300 text-sm`}>
                                    {personDetails?.popularity?.toFixed(2)} %
                                </Text>
                            </View>
                        </View>
                        <View style={tw`my-6 mx-4`}>
                            <Text style={tw`text-white text-lg`}>Biography</Text>
                            <Text style={tw`text-neutral-400`}>
                                {personDetails?.biography || 'N/A'}
                            </Text>
                        </View>
                        <FilmList title="Films" hideSeeAll={true} data={personFilms} />
                    </View>
                )
            }
        </ScrollView>
    );
}
