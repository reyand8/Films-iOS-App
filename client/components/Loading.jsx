import {View, Dimensions, TouchableOpacity} from 'react-native';
import React from 'react';
import * as Progress from 'react-native-progress';
import {SafeAreaView} from "react-native-safe-area-context";
import {ChevronLeftIcon} from "react-native-heroicons/outline";
import {useNavigation} from "@react-navigation/native";
import tw from 'twrnc';

const { width, height } = Dimensions.get('window');


export default function Loading() {
    const navigation = useNavigation();
    return (
        <View style={[tw`absolute flex-row justify-center items-center`, { height, width }]}>
            <SafeAreaView style={tw`absolute z-20 w-full flex-row justify-between items-center px-4`}>
                <TouchableOpacity style={tw`bg-black rounded-xl p-1`} onPress={() => navigation.goBack()}>
                    <ChevronLeftIcon size={28} strokeWidth={2.5} color="white" />
                </TouchableOpacity>
            </SafeAreaView>
            <Progress.CircleSnail thickness={12} size={160} color={"#eab308"} />
        </View>
    );
}