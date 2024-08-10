import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import tw from 'twrnc';

export default function Cast({ navigation, cast }) {
    return (
        <View style={tw`my-6`}>
            <Text style={tw`text-white text-lg mx-4 mb-5`}>Top Cast</Text>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={tw`px-4`}
            >
                {
                    cast && cast.map((person, index) => (
                        <TouchableOpacity
                            key={index}
                            onPress={() => navigation.navigate('Person', person)}
                            style={tw`mr-4 items-center`}
                        >
                            <View>
                                <Image
                                    style={tw`h-24 w-20 rounded-lg`}
                                    source={{ uri: person?.profilePath }}
                                />
                            </View>
                            <Text style={tw`text-white text-xs mt-1`}>
                                {person?.name.length > 10 ? person?.name.slice(0, 10) + '...' : person?.name}
                            </Text>
                        </TouchableOpacity>
                    ))
                }
            </ScrollView>
        </View>
    );
};