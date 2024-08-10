import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useQuery } from "@apollo/client";
import { SafeAreaView, ScrollView, StatusBar, TouchableOpacity,
    View, Platform, Text} from "react-native";
import {
    Bars3CenterLeftIcon,
    MagnifyingGlassIcon
} from "react-native-heroicons/outline";
import tw from "twrnc";

import { FILMS_BY_RATING, FILMS_BY_TRENDING, FILMS_BY_UPCOMING } from "../gqlClient/queries/queries";
import Loading from "../components/Loading";
import FilmList from "../components/FilmList";
import Error from "../components/Error";

const ios = Platform.OS === "ios";


const HomeScreen = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [topRatedFilms, setTopRatedFilms] = useState([]);
    const [upcomingFilms, setUpcomingFilms] = useState([]);
    const [trendingFilms, setTrendingFilms] = useState([]);
    const navigation = useNavigation();

    const {
        data: topRatedData,
        loading: topRatedLoading,
        error: topRatedError
    } = useQuery(FILMS_BY_RATING);
    const {
        data: upcomingData,
        loading: upcomingLoading,
        error: upcomingError
    } = useQuery(FILMS_BY_UPCOMING);
    const {
        data: trendingData,
        loading: trendingLoading,
        error: trendingError
    } = useQuery(FILMS_BY_TRENDING);

    useEffect(() => {
        if (topRatedData) {
            setTopRatedFilms(topRatedData.filmsByRating.results);
        }
        if (upcomingData) {
            setUpcomingFilms(upcomingData.filmsByUpcoming?.results);
        }
        if (trendingData) {
            setTrendingFilms(trendingData.filmsByTrending?.results);
        }
    }, [topRatedData, upcomingData, trendingData]);

    useEffect(() => {
        setLoading(topRatedLoading || upcomingLoading || trendingLoading);
    }, [topRatedLoading, upcomingLoading, trendingLoading]);

    useEffect(() => {
        setError(!!(topRatedError || upcomingError || trendingError));
    }, [topRatedError, upcomingError, trendingError]);

    return (
        <View style={tw`bg-gray-800 flex-1`}>
            <SafeAreaView style={tw`${ios ? 'mb-4' : 'mb-3'}`}>
                <StatusBar style="light" />
                <View style={tw`flex-row justify-between items-center mx-4`}>
                    <Bars3CenterLeftIcon size={"30"} strokeWidth={2} color="white" />
                    <Text style={tw`text-white text-5xl font-bold`}>
                        Films
                    </Text>
                    <TouchableOpacity onPress={() => navigation.navigate("Search")}>
                        <MagnifyingGlassIcon size={30} strokeWidth={2} color="white" />
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
            {error ? (
                <Error/>
            ) : loading ? (
                <Loading />
            ) : (
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={tw`pb-10`}>
                    <FilmList title="Trending" data={trendingFilms} />
                    <FilmList title="Upcoming" data={upcomingFilms} />
                    <FilmList title="Top rated" data={topRatedFilms} />
                </ScrollView>
            )}
        </View>
    );
};

export default HomeScreen;