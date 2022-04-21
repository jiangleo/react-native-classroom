import React from 'react';
import { ScrollView, View } from 'react-native';

import NormalGrid from './NormalGrid'
import CustomGrid from './CustomGrid';
import TextGrid from './TextGrid';


export default function DatePickerDemos(  ) {
    return (
        <ScrollView >
            <View style={{height: 50}} />
            <NormalGrid />
            <View style={{height: 50}} />
            <CustomGrid />
            <View style={{height: 50}} />
            <TextGrid />
        </ScrollView>
    )
}