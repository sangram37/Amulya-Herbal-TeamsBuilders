// import { Text, StyleSheet, View } from 'react-native'
// import React, { Component } from 'react'
// import {
//     BannerAd,
//     BannerAdSize,
//     TestIds,
//     GAMBannerAd,
//     InterstitialAd,
//     RewardedAd,
// } from '@react-native-admob/admob';

// class RewardScreen extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             loader: true,
//             name_address: '',
//             section: [
//                 {
//                     id: 0,
//                     title: 'WELLNESS',
//                     image:
//                         'https://askthescientists.com/wp-content/uploads/2017/11/AdobeStock_163967512-1030x687.jpeg',
//                 },
//                 {
//                     id: 1,
//                     title: 'SKIN CARE',
//                     image:
//                         'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZDvQKaVtL3FyDRW6Jkw-J6FdCGO8kDX53BQ&usqp=CAU',
//                 },
//                 {
//                     id: 2,
//                     title: 'COLOR',
//                     image:
//                         'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS76GjIjy9CgL6Zmbxk2lrJmUP5u5Ahj_O4fA&usqp=CAU',
//                 },
//                 {
//                     id: 3,
//                     title: 'PERSONAL CARE',
//                     image:
//                         'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMIwtF5hvFFBAn_wZXpaDw_stLOfJIjFc0vQ&usqp=CAU',
//                 },
//             ],
//             category: [],
//             getoffersection: null,
//             interstitialAd: null,
//             adLoaded: false,
//             Offline: false,
//         };
//         this.banref = React.createRef();
//     }
//     componentDidMount() {
//         this.setState({ interstitialAd: this.createAd() });
//     }
//     createAd() {
//         const ad = RewardedAd.createAd(TestIds.REWARDED_INTERSTITIAL, {
//             loadOnDismissed: true,
//             requestOptions: {
//                 requestNonPersonalizedAdsOnly: true,
//                 keywords: ['fashion', 'clothing'],
//             },
//         });
//         ad.addEventListener('adLoaded', () => {
//             this.setState({ adLoaded: true });
//         });
//         ad.addEventListener('adDismissed', () => {
//             console.log('hiii')
//         });
//         return ad;
//     }
//     componentDidUpdate(prevProps, prevState) {
//         if (this.state.interstitialAd !== prevState.interstitialAd) {
//             this.setState({ adLoaded: false });
//             prevState.interstitialAd?.destroy();
//         }
//     }
//     // componentWillUnmount() {
//     //     this.state.interstitialAd?.destroy();
//     // }
//     render() {
//         return (
//             <View>
//                 <Text onPress={() => {
//                     if (this.state.adLoaded) {
//                         this.state.interstitialAd?.show();
//                     } else {
//                         alert('hii')
//                     }
//                 }}>Reward</Text>
//             </View>
//         )
//     }
// }
// export default RewardScreen

// const styles = StyleSheet.create({})



import React, { useCallback, useEffect, useState } from 'react';
import { Button, View } from 'react-native';
import {
    FullScreenAdOptions,
    TestIds,
    useRewardedInterstitialAd,
} from '@react-native-admob/admob';
import CountDownModal from '../../Components/CountDownModal';

const hookOptions = {
    loadOnDismissed: true,
    requestOptions: {
        requestNonPersonalizedAdsOnly: true,
        serverSideVerificationOptions: {
            userId: '123',
        },
    },
};
const RewardScreen = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const { adLoaded, adDismissed, reward, show, adLoadError } =
        useRewardedInterstitialAd(TestIds.REWARDED_INTERSTITIAL, hookOptions);
    useEffect(() => {
        if (adDismissed) {
            setModalVisible(false);

        }
    }, [adDismissed]);

    useEffect(() => {
        if (reward) {
            console.log('Reward earned from Rewarded Interstitial Ad: ');
            console.log(reward);
        }
    }, [reward]);

    useEffect(() => {
        if (adLoadError) {
            const { code, message } = adLoadError;
            console.log(`Ad failed to load with code ${code} - ${message}`);
        }
    }, [adLoadError]);

    return (
        <>
            <View>
                <Button
                    title="Show Rewarded Interstitial Ad and move to next screen"
                    onPress={() => {
                        if (adLoaded) {
                            setModalVisible(true);
                        } else {
                            alert('hiii')
                        }
                    }}
                />
            </View>
            {modalVisible && (
                <CountDownModal
                    visible={modalVisible}
                    onCancel={() => {
                        setModalVisible(false);
                        navigateToSecondScreen();
                    }}
                    onTimeout={show}
                />
            )}
        </>
    );
};

export default RewardScreen;