import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import RNBootSplash from 'react-native-bootsplash';
import { useAppOpenAd, TestIds } from '@react-native-admob/admob';




const AppOpenAdExample = ({ onSplashDismissed }) => {
    const [loaded, setLoaded] = useState(false);
    const { adDismissed, adLoadError } = useAppOpenAd('ca-app-pub-6922004427566783/6212263947',
        {
            showOnColdStart: true,
        }
    )


    useEffect(() => {
        const load = async () => {
            await new Promise((resolve) => setTimeout(resolve, 3000));
            setLoaded(true);
        };
        load();
    }, []);

    useEffect(() => {
        async function hide() {
            // await RNBootSplash.hide({ fade: true });
            onSplashDismissed();
        }
        if (loaded && (adDismissed || adLoadError)) {
            hide();
        }
    }, [loaded, adDismissed, adLoadError, onSplashDismissed]);

    return <View />
        ;
};

export default AppOpenAdExample;