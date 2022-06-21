import React, { useEffect, useState } from 'react';
// import RNBootSplash from 'react-native-bootsplash';
import { useAppOpenAd, TestIds } from '@react-native-admob/admob';

import { ImageBackground, Image, StatusBar, View, Text } from 'react-native';
import Colors from '../../Constants/Colors';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AppOpenAdExample = ({ onSplashDismissed }) => {
    const [loaded, setLoaded] = useState(false);
    const { adDismissed, adLoadError } = useAppOpenAd('ca-app-pub-6922004427566783/6212263947',
        {
            showOnColdStart: false,
        }
    )


    useEffect(() => {
        const load = async () => {
            setTimeout(() => {
                setLoaded(true);
                // if (value) {
                //     setLoaded(true);
                //     // props.navigation.replace('DrawerContainer');
                // } else {
                //     setLoaded(true);
                //     // props.navigation.replace('Login');
                // }
            }, 4000);
            // await new Promise((resolve) => setTimeout(resolve, 3000));
            // setLoaded(true);
            console.log("check")
        };
        load();
    }, []);
    // useEffect(async () => {
    //     const value = await AsyncStorage.getItem('token');
    //     console.log(value, 'sks', props.loginUserStatus);
    //     setTimeout(() => {
    //         if (value) {
    //             setLoaded(true);
    //             props.navigation.replace('DrawerContainer');
    //         } else {
    //             setLoaded(true);
    //             props.navigation.replace('Login');
    //         }
    //     }, 4000);
    // }, []);
    useEffect(() => {
        async function hide() {
            // await RNBootSplash.hide({ fade: true });
            onSplashDismissed();
            console.log("nocheck")
        }
        if (loaded) {
            hide();
        }
    }, [loaded, adDismissed, adLoadError, onSplashDismissed]);

    return <View style={{ flex: 1, backgroundColor: '#fff' }}>
        <StatusBar translucent backgroundColor="transparent" />

        <View
            style={{
                width: '100%',
                height: '95%',
                backgroundColor: Colors.white,
                alignItems: 'center',
                justifyContent: 'center',
                alignSelf: 'center',
            }}>
            <Image
                source={require('../../Assets/Images/logo1.png')}
                style={{ width: '100%', height: '55%' }}
                resizeMode="cover"
            />
        </View>
        <Text
            style={{
                alignSelf: 'center',
                fontSize: 18,
                fontWeight: '700',
                letterSpacing: 0.5,
            }}>
            @Amulya Herbal
        </Text>
    </View>
        ;
};


const mapStateToProps = state => {
    return {
        loginUserStatus: state.UserLoginReducer.loginUserStatus,
    };
};
const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(AppOpenAdExample);