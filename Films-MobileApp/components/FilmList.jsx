import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, TouchableWithoutFeedback, Image, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import tw from 'twrnc';

let { width, height } = Dimensions.get('window');

export default function FilmList({ title, data }) {
    const navigation = useNavigation();
    return (
        <View style={tw`mb-1`}>
            <View style={tw`mx-1 flex-row justify-between items-center my-1`}>
                <Text style={tw`text-white text-xl`}>{title}</Text>
                <TouchableOpacity>
                    <Text style={tw`text-amber-500 text-lg`}>See All</Text>
                </TouchableOpacity>
            </View>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={tw`px-4`}
            >
                {data.map((item, index) => (
                    <TouchableWithoutFeedback key={index} onPress={() => navigation.push("Film", item)}>
                        <View style={tw`mb-2 mr-1`}>
                            <Image
                                source={{ uri: item.image || item.posterPath }}
                                style={[
                                    tw`rounded-2xl`,
                                    {
                                        width: width * 0.33,
                                        height: height * 0.22,
                                    },
                                ]}
                            />
                            <Text style={tw`text-gray-400 ml-1`}>
                                {item.title.length > 14 ? item.title.slice(0, 14) + '...' : item.title}
                            </Text>
                        </View>
                    </TouchableWithoutFeedback>
                ))}
            </ScrollView>
        </View>
    );
}