import React from 'react';
import {View, Dimensions, Image, TouchableOpacity} from 'react-native';
import {SafeAreaView} from "react-native-safe-area-context";
import {ChevronLeftIcon} from "react-native-heroicons/outline";
import {useNavigation} from "@react-navigation/native";
import tw from 'twrnc';

import error from "../assets/images/error.png"

const { width, height } = Dimensions.get('window');


export default function Error() {
    const navigation = useNavigation();
    return (
        <View style={[tw`absolute flex-row justify-center items-center`, { height, width }]}>
            <SafeAreaView style={tw`absolute z-20 w-full flex-row justify-between items-center px-4`}>
                <TouchableOpacity style={tw`bg-black rounded-xl p-1`} onPress={() => navigation.goBack()}>
                    <ChevronLeftIcon size={28} strokeWidth={2.5} color="white" />
                </TouchableOpacity>
            </SafeAreaView>
            <Image source={error}/>
        </View>
    );
}