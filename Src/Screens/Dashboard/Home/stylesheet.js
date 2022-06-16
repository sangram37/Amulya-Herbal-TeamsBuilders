import { StyleSheet, Dimensions } from "react-native";
import Colors from "../../../Constants/Colors";
import Fonts from "../../../Constants/Fonts";
const { width, height } = Dimensions.get('screen');
export const styles = StyleSheet.create({
    indicator: {
        flexDirection: 'row',
        width: width,
        justifyContent: 'center',
        position: 'absolute',
        bottom: 12,
    },
    inicator_circle: {
        height: 8,
        width: 8,
        backgroundColor: '#ccc',
        margin: 4,
        borderRadius: 4,

    },
    banner: {
        height: height / 5.5,
        // width: width,
        alignSelf: 'center',
        marginBottom: 5,

    },
    image: {
        height: 150,
        width: width,
        // resizeMode: 'cover',
    },
    title: {
        fontSize: 16,
        marginLeft: '5%',
        padding: 10,
        paddingTop: 15,
        paddingBottom: 0,

    },
    title_des: {
        fontSize: 15,
        marginLeft: '5%',
        paddingHorizontal: 10,
        paddingTop: 5,
        color: Colors.light_dark,
        paddingBottom: 15,

        // fontWeight: '500'
        letterSpacing: .8
    },
    brandimage: {
        width: 150, height: 90, alignSelf: 'center'
    },
    textstyle: {
        padding: 15,
        fontSize: 14,

    },
    titleproduct: {
        textAlign: 'center',
        paddingTop: 15,
        width: '98%',
        height: 80,

        lineHeight: 18

    },
    price: {
        fontSize: 18,

        textAlign: 'center'

    },
    imageprodect: { width: width / 3, height: 130, },
    pressable: { alignItems: 'center', width: width / 2.2, padding: 10, height: 250, },
    newarrival: {
        textAlign: 'center',
        fontSize: 17,

        width: 150,
        letterSpacing: .8
    }

});