import { View, Text, ScrollView, TouchableOpacity, Dimensions, Platform, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useRoute, useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeftIcon } from 'react-native-heroicons/outline';
import { HeartIcon } from 'react-native-heroicons/solid';
import { LinearGradient } from 'expo-linear-gradient';
import { useQuery } from "@apollo/client";
import tw from 'twrnc';

import { theme } from '../theme';
import FilmList from '../components/FilmList';
import Loading from '../components/Loading';
import {
    FILM_BY_CREDITS,
    FILMS_BY_ID_QUERY,
    SIMILAR_FILMS
} from "../gqlClient/queries/queries";
import Cast from "../components/Cast";
import Error from "../components/Error";

const { width, height } = Dimensions.get('window');
const ios = Platform.OS === "ios";
const topMargin = ios ? '' : 'mt-4';

export default function FilmScreen() {
    const { params: item } = useRoute();
    const navigation = useNavigation();
    const paramId = +item.id;
    const [isFavourite, toggleFavourite] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [details, setDetails] = useState([]);
    const [credits, setCredits] = useState([]);
    const [similar, setSimilar] = useState([]);

    const {
        data: filmDetailsData,
        loading: filmDetailsLoading,
        error: filmDetailsError
    } = useQuery(FILMS_BY_ID_QUERY, {
        variables: { ids: paramId }
    });

    const {
        data: creditsData,
        loading: creditsLoading,
        error: creditsError
    } = useQuery(FILM_BY_CREDITS, {
        variables: { ids: paramId }
    });

    const {
        data: similarData,
        loading: similarLoading,
        error: similarError
    } = useQuery(SIMILAR_FILMS, {
        variables: { id: paramId }
    });

    useEffect(() => {
        if (filmDetailsData) {
            setDetails(filmDetailsData.filmsById[0]);
        }
        if (creditsData) {
            setCredits(creditsData.filmCredits?.cast);
        }
        if (similarData) {
            setSimilar(similarData.filmsSimilar?.results);
        }
    }, [filmDetailsData, creditsData, similarData]);

    useEffect(() => {
        setLoading(filmDetailsLoading || similarLoading || creditsLoading);
    }, [filmDetailsLoading, similarLoading, creditsLoading]);

    useEffect(() => {
        setError(!!(filmDetailsError || creditsError || similarError));
    }, [filmDetailsError, creditsError, similarError]);

    return (
        <ScrollView
            contentContainerStyle={tw`pb-5`}
            style={tw`flex-1 bg-neutral-900`}
        >
            {error ? (
                <Error/>
            ) : loading ? (
                <Loading />
            ) : (
                <View style={tw`w-full`}>
                    <SafeAreaView style={tw`absolute z-20 w-full flex-row justify-between items-center px-4 ${topMargin}`}>
                        <TouchableOpacity style={tw`bg-black rounded-xl p-1`} onPress={() => navigation.goBack()}>
                            <ChevronLeftIcon size={28} strokeWidth={2.5} color="white" />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => toggleFavourite(!isFavourite)}>
                            <HeartIcon size={35} color={isFavourite ? theme.background : "white"} />
                        </TouchableOpacity>
                    </SafeAreaView>
                    <View>
                        <Image
                            source={{ uri: details.image }}
                            style={tw`w-full h-[${height * 0.55}px]`}
                        />
                        <LinearGradient
                            colors={['transparent', 'rgba(23, 23, 23, 0.8)', 'rgba(23, 23, 23, 1)']}
                            style={tw`w-full h-[${height * 0.40}px] absolute bottom-0`}
                            start={{ x: 0.5, y: 0 }}
                            end={{ x: 0.5, y: 1 }}
                        />
                    </View>
                    <View style={tw`mt-[-${height * 0.09}px]`} className="space-y-3">
                        <Text style={tw`text-white text-center text-3xl font-bold tracking-wider`}>
                            {details.title}
                        </Text>
                        {details.id ? (
                            <Text style={tw`text-neutral-400 font-semibold text-base text-center`}>
                                {details.releaseDate} • {details?.runtime} min
                            </Text>
                        ) : null}
                        <View style={tw`flex-row justify-center mx-4`}>
                            {details?.genres?.map((genre, index) => {
                                let showDot = index + 1 !== details.genres.length;
                                return (
                                    <Text key={index} style={tw`text-neutral-400 font-semibold text-base text-center`}>
                                        {genre?.name} {showDot ? '• ' : null}
                                    </Text>
                                );
                            })}
                        </View>
                        <Text style={tw`text-neutral-400 mx-4 text-base tracking-wide`}>
                            {details?.overview}
                        </Text>
                    </View>
                    {credits.length > 0 && <Cast navigation={navigation} cast={credits} />}
                    {similar.length > 0 && <FilmList title="Similar Movies" hideSeeAll={true} data={similar} />}
                </View>
            )}
        </ScrollView>
    );
}