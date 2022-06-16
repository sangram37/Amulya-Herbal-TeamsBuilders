import React, { Component, useState, useEffect, useMemo, useRef } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
    Alert,
    ScrollView,
    FlatList,
    Pressable,
    Dimensions,
    TextInput,
} from 'react-native';
import WheelOfFortune from 'react-native-wheel-of-fortune';
import { CallApi } from '../../../CallApi';
import GlobalStyles from '../../../Components/GlobalStyle';

import Loader from '../../../Components/Loader';
import ToastMessage from '../../../Components/ToastMessage';
import Colors from '../../../Constants/Colors';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
//redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Imageurl from '../../../Constants/Imageurl';
import { updateCoinNumber } from '../../../Redux/Actions/CoinAction'
//redux
import AsyncStorage from '@react-native-async-storage/async-storage';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { BASE_URL } from '../../../Constants/ApiConstants';
const { width, height } = Dimensions.get('screen');
import LinearGradient from 'react-native-linear-gradient';
import Strings from '../../../Constants/Strings';
const hookOptions = {
    loadOnDismissed: true,
    requestOptions: {
        requestNonPersonalizedAdsOnly: true,
        serverSideVerificationOptions: {
            userId: '123',
        },
    },
};
import {
    FullScreenAdOptions,
    TestIds,
    useRewardedInterstitialAd,
} from '@react-native-admob/admob';
import CountDownModal from '../../../Components/CountDownModal';
const CoinSection = (props) => {
    const [loader, setLoader] = useState(false)
    const [earnlist, setEarnlist] = useState([])
    const [winnerValue, setWinnerValue] = useState(null)
    const [winnerIndex, setWinnerIndex] = useState(null)
    const [started, setStarted] = useState(false)
    const [child, setChild] = useState(null)
    const [checkspin, setCheckSpin] = useState('')
    const [message, setMessage] = useState('')

    const [data, setData] = useState([
        {
            id: 1,
            title: 'Lucky Bonus',
            price: '+10-500',
            image: 'https://picsum.photos/200/300',
            navigation: 'DpList',
        },
        {
            id: 2,
            title: 'Watch video ads',
            price: '+10-500',
            image: 'https://picsum.photos/200/301',
            navigation: 'DpList',
        },
        {
            id: 3,
            title: 'Check in',
            price: '+10-500',
            image: 'https://picsum.photos/200/302',
            navigation: 'DpList',
        },
        {
            id: 4,
            title: 'Recommend Apps',
            price: '+10-500',
            image: 'https://picsum.photos/200/3003',
            navigation: 'DpList',
        },

    ])
    const [query, setQuery] = useState(false)
    const [modalVisible, setModalVisible] = useState(false);
    const [addappid, setAddappid] = useState(TestIds.REWARDED_INTERSTITIAL);
    const { adLoaded, adDismissed, reward, show, adLoadError } =
        useRewardedInterstitialAd(addappid, hookOptions);
    const [participants, setParticipants] = useState([

    ]);

    const returnImage = () => {
        if (props.user) {
            if (props.user.profile_picture) {
                return props.user.profile_picture;
            } else {
                return Imageurl.noimage;
            }
        } else {
            return Imageurl.noimage;
        }
    };
    useEffect(() => {
        getApiData()
        const unsubscribe = props.navigation.addListener('focus', () => {
            //Your refresh code gets here
            getspindata()
            getApiData()
        });
        return () => {
            unsubscribe();
        };


    }, [])

    useEffect(() => {
        if (adDismissed) {
            setModalVisible(false);


        }
    }, [adDismissed]);
    useEffect(() => {
        if (reward) {
            console.log('Reward earned from Rewarded Interstitial Ad: ');
            console.log(reward);
            addreward(reward.amount)
        }
    }, [reward]);
    const addreward = (amount) => {
        setLoader(true)
        let form = JSON.stringify({
            coin: amount,
            user: props.userid,
            section_type: "video_ads"
        });
        return CallApi('POST', 'add/coin/', form).then(res => {
            setLoader(false)
            console.log('res alldata', res);
            if (res.status === 'success') {
                props.updateCoinNumber(res.coin)
            } else {
                console.log('error')
            }
        })
        // return CallApi(
        //     'GET',
        //     `coin-section/`,
        //     '',
        // ).then(res => {
        //     setLoader(false)
        //     console.log('res alldata', res);

        //     try {
        //         setData(res)

        //     } catch (error) {
        //         ToastMessage({
        //             test: error,
        //             type: 'type_info',
        //         });
        //     }
        // });
    }
    useEffect(() => {
        if (adLoadError) {
            const { code, message } = adLoadError;
            console.log(`Ad failed to load with code ${code} - ${message}`);
        }
    }, [adLoadError]);
    const getApiData = () => {
        // setLoader(true)
        // let form = new FormData();
        // form.append('lat', this.props.lat);
        // form.append('long', this.props.long);
        return CallApi(
            'GET',
            `coin-section/`,
            '',
        ).then(res => {
            // setLoader(false)
            console.log('res alldata', res);

            try {
                setData(res)

            } catch (error) {
                ToastMessage({
                    test: error,
                    type: 'type_info',
                });
            }
        });
    };
    const getspindata = () => {
        setLoader(true)
        // let form = new FormData();
        // form.append('lat', this.props.lat);
        // form.append('long', this.props.long);
        return CallApi(
            'GET',
            `daily-checkin/${props.userid}`,
            '',
        ).then(res => {
            console.log('res daly', res);

            try {
                setParticipants(res.spinner_data)
                setCheckSpin(res.status)
                setMessage(res.message)
                setLoader(false)

            } catch (error) {
                setLoader(false)
                ToastMessage({
                    test: error,
                    type: 'type_info',
                });
            }
        });
    }
    const addspinreward = (amount) => {
        setLoader(true)
        let form = JSON.stringify({
            coin: winnerValue,
            user: props.userid,
            section_type: "daily_checkin"
        });
        return CallApi('POST', 'add/coin/', form).then(res => {
            setLoader(false)
            console.log('res alldata', res);
            if (res.status === 'success') {
                props.updateCoinNumber(res.coin)
            } else {
                console.log('error')
            }
        })
        // return CallApi(
        //     'GET',
        //     `coin-section/`,
        //     '',
        // ).then(res => {
        //     setLoader(false)
        //     console.log('res alldata', res);

        //     try {
        //         setData(res)

        //     } catch (error) {
        //         ToastMessage({
        //             test: error,
        //             type: 'type_info',
        //         });
        //     }
        // });
    }
    //   headercomp = () => {
    //     return (
    //       <Text style={styles.headertext}>How to eran monthly this Amount</Text>
    //     );
    //   };

    const wheelOptions = {
        rewards: participants,
        knobSize: 20,
        borderWidth: 5,
        borderColor: '#fff',
        innerRadius: 50,
        duration: 6000,
        backgroundColor: 'transparent',
        textAngle: 'horizontal',
        knobSource: require('../../../Assets/Icons/knob.png'),
        onRef: ref => (setChild(ref)),
    };
    const buttonPress = () => {
        if (checkspin === 'success') {
            console.log(child)
            setStarted(true)
            child._onPress();
        } else {
            ToastMessage({
                test: message,
                type: 'type_info',
            });
        }

    };
    const tryagain = () => {
        if (winnerValue === 'FREE') {
            //without coin run
        } else {
            //with coin run
        }
        setWinnerIndex(null)
        child._tryAgain();
    }
    // console.log(winnerValue, winnerIndex)
    const webViewnavigation = (naviName, url, name) => {
        props.navigation.navigate(naviName, { url: url, name: name });
    };
    const checkadstype = (item) => {
        if (item.section_name === 'Watch Video Ads') {
            setAddappid(item.ads_id);
            setModalVisible(true);
        } else {
            webViewnavigation(
                'WebViewComponent',
                // `https://fastrsrvr.com/list/467856`,
                `https://fastrsrvr.com/list/472948?subid=${props.userid}`,
                `${item.section_name}`,
            )
        }

    }
    useEffect(() => {
        console.log('->>>>>>>>>>>>>>');
        console.log('->>>>>>>>>>>>>>');
        console.log('->>>>>>>>>>>>>>');
        console.log('->>>>>>>>>>>>>>');
        console.log('->>>>>>>>>>>>>>');
        console.log('->>>>>>>>>>>>>>');
        console.log(winnerValue)
        console.log('->>>>>>>>>>>>>>');
        console.log('->>>>>>>>>>>>>>');
        console.log('->>>>>>>>>>>>>>');
        console.log('->>>>>>>>>>>>>>');
        console.log('->>>>>>>>>>>>>>');
        console.log('->>>>>>>>>>>>>>');
        if (winnerValue) {
            addspinreward()
        }
    }, [winnerValue]);

    return (
        <View style={GlobalStyles.container}>
            <View
                style={{
                    backgroundColor: Colors.primary,
                    ...Platform.select({
                        ios: {
                            marginTop: '10%',
                            paddingBottom: 5,
                            paddingTop: 5,
                        },
                        android: {
                            marginTop: 0,
                            paddingVertical: 5,
                        },
                    }),
                    // backgroundColor: 'red',
                }}>
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                    <Pressable
                        style={{
                            flex: 0.25,
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginLeft: 10,
                        }}
                        onPress={() => props.navigation.toggleDrawer()}>
                        <Image
                            style={{
                                height: 40,
                                width: 40,
                                borderRadius: 60,
                                // backgroundColor: '#fff',
                            }}
                            source={{
                                uri: returnImage(),

                                // headers: {Authorization: 'someAuthToken'},
                                // priority: FastImage.priority.high,
                            }}
                        />
                    </Pressable>

                    <Pressable
                        style={{
                            flex: 1.6,
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                        onPress={() => props.navigation.navigate('logonavi')}>
                        <Text style={{ fontWeight: '700', fontSize: 17, color: 'white' }}>
                            {Strings.App_Heading_Name}
                        </Text>
                    </Pressable>

                    <Pressable
                        onPress={() => {
                            props.navigation.navigate('CartList');
                        }}
                        style={{
                            flex: 0.3,
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>
                        <MaterialIcons name="shopping-bag" size={25} color="white" />
                        {props.cartNumber ? (
                            <View
                                style={{
                                    position: 'absolute',
                                    backgroundColor: '#ff8585',
                                    right: 3,
                                    top: 1,
                                    borderRadius: 20,
                                    overflow: 'hidden',
                                    width: 20,
                                    height: 20,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}>
                                <Text
                                    style={{
                                        fontSize: 10,
                                        textAlign: 'center',
                                        color: Colors.white,
                                    }}>
                                    {props.cartNumber}{' '}
                                </Text>
                            </View>
                        ) : null}
                    </Pressable>
                    <Pressable style={{ paddingRight: 5, flexDirection: 'row', marginLeft: 10, alignItems: 'center' }} onPress={() => props.navigation.navigate('Transaction')}>
                        <FontAwesome name="diamond" size={18} color="white" />
                        <Text style={GlobalStyles.cointext}>{props.coin ? props.coin : 0}</Text>
                    </Pressable>
                </View>
            </View>
            {loader ? (
                <Loader />
            ) : (
                <ScrollView style={GlobalStyles.container} showsVerticalScrollIndicator={false}>
                    <View style={{ height: width + 30 }}>
                        <WheelOfFortune
                            options={wheelOptions}
                            getWinner={(value, index) => {
                                setWinnerValue(value);
                                setWinnerIndex(index)
                            }}
                        />
                    </View>
                    {!started && (
                        <View style={styles.startButtonView}  >
                            <TouchableOpacity
                                onPress={() => buttonPress()}
                                style={styles.startButton}>
                                <Text style={styles.startButtonText}>Spin to win!</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                    {winnerIndex != null && (
                        <View style={styles.startButtonView}>
                            {/* <Text style={styles.winnerText}>
                                You win {participants[winnerIndex]}
                            </Text> */}
                            <TouchableOpacity
                                // onPress={() =>
                                //     tryagain()
                                // }
                                style={styles.tryAgainButton}>
                                <Text style={styles.tryAgainText}>TRY AGAIN </Text>
                            </TouchableOpacity>
                        </View>
                    )}
                    <FlatList
                        style={styles.list}
                        contentContainerStyle={styles.listContainer}
                        data={data}
                        horizontal={false}
                        // numColumns={2}
                        keyExtractor={item => {
                            return item.id;
                        }}
                        //   ListHeaderComponent={this.headercomp}
                        showsVerticalScrollIndicator={false}
                        ItemSeparatorComponent={() => {
                            return <View style={styles.separator} />;
                        }}
                        renderItem={post => {
                            const item = post.item;
                            return (
                                <Pressable
                                    // onPress={() => {
                                    //     if (adLoaded) {
                                    //         setModalVisible(true);
                                    //     } else {
                                    //         alert('hiii')
                                    //     }
                                    // }
                                    // }
                                    onPress={() => checkadstype(item)}
                                >
                                    <LinearGradient
                                        start={{ x: 0, y: 0 }}
                                        end={{ x: 1, y: 0 }}
                                        colors={['#9BE4FF', '#A7B5FE', '#A17CEA']}
                                        style={styles.card}
                                        onPress={() =>
                                            props.navigation.navigate('PdfView', {
                                                url: item.description_link,
                                                pagename: 'Earning',
                                            })
                                        }>
                                        <Text style={styles.title}>{item.section_name}</Text>
                                        <Text style={{ ...styles.title, color: Colors.pale_red }}>{item.minmax_point}</Text>
                                    </LinearGradient>
                                </Pressable>
                            );
                        }}
                    />
                    {/* <Pressable
                        // start={{ x: 0, y: 0 }}
                        // end={{ x: 1, y: 0 }}
                        // colors={['#9BE4FF', '#A7B5FE', '#A17CEA']}
                        style={{ ...styles.card, }}
                        onPress={() =>
                            webViewnavigation(
                                'WebViewComponent',
                                // `https://fastrsrvr.com/list/467856`,
                                `https://fastrsrvr.com/list/469421?subid=${props.userid}`,
                                'CPALEAD',
                            )
                        }>
                        <Text style={styles.title}>Cpalead</Text>
                        <Text style={{ ...styles.title, color: Colors.pale_red }}>100 - 1000</Text>
                    </Pressable> */}
                    {modalVisible && (
                        <CountDownModal
                            visible={modalVisible}
                            onCancel={() => {
                                setModalVisible(false);
                                // navigateToSecondScreen();
                            }}
                            onTimeout={show}
                        />
                    )}
                    <View style={{ height: 20 }} />


                </ScrollView>
            )
            }
        </View >
    );
}

const mapStateToProps = state => {
    return {
        cartNumber: state.CartReducer.cartNumber,
        coin: state.CoinReducer.coinNumber,
        userid: state.UserLoginReducer.loginUser,
    };
};

const mapDispatchToProps = dispatch => bindActionCreators({
    updateCoinNumber,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(CoinSection);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 20,
    },
    list: {
        paddingHorizontal: 5,
        backgroundColor: '#E6E6E6',
        paddingTop: 10,
    },
    listContainer: {
        // alignItems: 'center',
    },
    separator: {
        marginTop: 10,
    },
    /******** card **************/
    card: {
        shadowColor: '#00000021',
        shadowOffset: {
            width: 2,
        },
        shadowOpacity: 0.5,
        shadowRadius: 4,
        // marginTop: 10,
        backgroundColor: 'white',
        // flexBasis: '47%',
        // marginHorizontal: 5,
        width: '98%',
        alignSelf: 'center',
        borderRadius: 3,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 10
    },
    title: {
        fontSize: 16,
        alignSelf: 'center',
        padding: 5,
        paddingVertical: 10,
        color: Colors.black,
        fontWeight: 'bold',
    },
    containerParent: {
        flex: 1,
        backgroundColor: Colors.white,
    },
    searchBarContainer: {
        marginHorizontal: 10,
        borderWidth: 0.3,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 0.8,
        borderRadius: 5,
        borderColor: Colors.light_gray,
    },
    inputStyles: {
        height: 40,
        // height: Platform.OS == 'ios' ? 5 : 40,
        // fontFamily: Fonts.Akt_regular,
        fontSize: 14,
        color: Colors.black,
    },
    searchBarViewParent: {
        flexDirection: 'row',
    },
    searchIconView: {
        flex: 0.1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    inputWrapper: {
        flex: 0.8,
    },
    micBtnView: {
        flex: 0.1,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 5,
    },
    cancelView: {
        flex: 0.2,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 10,
    },
    text: {
        fontSize: 14,
        // fontFamily: Fonts.Akt_regular,
        color: Colors.gray,
    },
    headertext: {
        fontSize: 22,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 15,
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#E74C3C'
    },
    startButtonView: {
        position: 'absolute',

        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        width: width,
        height: width + 80,

    },
    startButton: {
        // backgroundColor: 'rgba(0,0,0,.5)',
        marginTop: 0,
        padding: 50,


    },
    startButtonText: {
        fontSize: 10,
        color: '#000',
        fontWeight: 'bold',

    },
    winnerView: {
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
    },

    winnerText: {
        fontSize: 10,
    },
    tryAgainButton: {
        fontWeight: 'bold',
        padding: 50,
        // backgroundColor: 'red'
        // backgroundColor: 'rgba(0,0,0,0.5)',
    },
    tryAgainText: {
        fontSize: 10,
        fontWeight: 'bold',
        color: '#000',
    },
});
