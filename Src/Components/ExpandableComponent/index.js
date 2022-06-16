import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Pressable
} from 'react-native';
import React, { useEffect, useState } from 'react'
import { COLORS } from '../../colors';
import GlobalStyles from '../GlobalStyle';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Colors from '../../Constants/Colors';
import Fonts from '../../Constants/Fonts';
export default ExpandableComponent = ({ item, onClickFunction, navigation }) => {

    const [layoutHeight, setLayoutHeight] = useState(0);

    useEffect(() => {
        if (item.isExpanded) {
            setLayoutHeight(null);
        } else {
            setLayoutHeight(0);
        }
    }, [item.isExpanded]);

    return (
        <View style={{ backgroundColor: '#FFFFFF', }}>
            {/*Header of the Expandable List Item*/}
            <Pressable
                activeOpacity={0.8}
                onPress={onClickFunction}
                style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginRight: 15, paddingLeft: 5, }}
            >
                <Text style={styles.headerText}>{item.category}</Text>
                {item.isExpanded ? <AntDesign
                    name="caretdown"
                    style={{ fontSize: 12, color: Colors.black }}
                /> : <AntDesign
                    name="caretright"
                    style={{ fontSize: 12, color: Colors.black }}
                />}
            </Pressable>
            <View style={GlobalStyles.divider} />
            <View
                style={{
                    height: layoutHeight,
                    // padding: 5,
                    overflow: 'hidden',
                    // paddingLeft: 5,
                    // backgroundColor: Colors.light
                    backgroundColor: '#F5F5F5',

                    // backgroundColor:'lightgray'
                }}>
                {/*Content under the header of the Expandable List Item*/}
                {item.subcategory.map((item, key) => (
                    <TouchableOpacity
                        key={key}
                        style={styles.content}
                        onPress={() => navigation.navigate('ProductList', { item })}>
                        <Text style={styles.text}>
                            {item.name}
                        </Text>
                        <View style={GlobalStyles.divider} />
                    </TouchableOpacity>
                ))}

            </View>
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    titleText: {
        flex: 1,
        fontSize: 22,
        // fontWeight: 'bold',
        // fontFamily: Fonts.Akt_bold,
    },

    headerText: {
        fontWeight: '500',
        color: '#000',
        // fontFamily: 'OpenSans',
        //   backgroundColor:'red',

        padding: 10,
        fontSize: 15,
        // fontFamily: Fonts.Akt_regular,
        fontWeight: '500',
        letterSpacing: .8

    },
    separator: {
        height: 0.5,
        backgroundColor: '#808080',
        width: '95%',
        marginLeft: 16,
        marginRight: 16,
    },
    text: {
        fontSize: 14,
        color: '#000',
        paddingRight: 10, marginHorizontal: 15,
        paddingVertical: 10,
        // fontFamily: Fonts.Akt_regular,
        fontWeight: '400',
        letterSpacing: .5
    },
    content: {
        backgroundColor: '#F5F5F5'
    },
});

