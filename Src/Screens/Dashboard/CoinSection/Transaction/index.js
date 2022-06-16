import { View, Text, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import BackHeader from '../../../../Components/Header/BackHeader';
import GlobalStyles from '../../../../Components/GlobalStyle';
//redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { updateCoinNumber } from '../../../../Redux/Actions/CoinAction'
import { CallApi } from '../../../../CallApi';
import Loader from '../../../../Components/Loader';
import moment from 'moment';
//redux
// { name: 'sangram keshari samanta dhgwyfyfuwchvgchcchhggbbhjbhjbhhb bjhbjhjbhjbhjbbhbjnbbjhjbhbhjjhbbhbjhbjbbbjhbh ', coin: 100, date: '19 Feb 2022' }, { name: 'sangram keshari samanta ', coin: 100, date: '19 Feb 2022' }, { name: 'sangram keshari samanta ', coin: 100, date: '19 Feb 2022' }
const Transaction = (props) => {
    const [data, setData] = useState([])
    const [loader, setLoader] = useState(false)
    const [reward, setReward] = useState([])
    useEffect(() => {
        coinhistory();
        coinfilterhistory()
    }, [])
    const coinhistory = (amount) => {
        setLoader(true)
        // let form = JSON.stringify({
        //     coin: amount,
        //     user: props.userid,
        //     section_type: "video_ads"
        // });
        // ${ props.userid }
        try {
            return CallApi('GET', `coin-history?user=${props.userid}`, '').then(res => {
                setLoader(false)
                setData(res)
                console.log('res alldata', res);
                // if (res.status === 'success') {

                // } else {
                //     console.log('error')
                // }
            })
        } catch (error) {
            setLoader(false)
        }


    }
    const coinfilterhistory = (amount) => {
        setLoader(true)
        // let form = JSON.stringify({
        //     coin: amount,
        //     user: props.userid,
        //     section_type: "video_ads"
        // });
        // ${ props.userid }
        try {
            return CallApi('GET', `coin-data?user=1`, '').then(res => {
                setLoader(false)
                setReward(res)
                console.log('res', res);
                // if (res.status === 'success') {

                // } else {
                //     console.log('error')
                // }
            })
        } catch (error) {
            setLoader(false)
        }


    }
    const renderItem = ({ item }) => (
        <View style={{ alignSelf: 'center', width: '100%', }}>
            <View style={{ width: '95%', alignSelf: 'center', paddingTop: 5 }}>
                <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between' }}>
                    <Text style={{ width: '82%', fontSize: 15, color: 'rgba(0,0,0,0.6)', letterSpacing: .5 }} numberOfLines={1}>{item.info}</Text>
                    <Text style={{ width: '15%', fontSize: 15, color: item.type === 'debit' ? 'red' : 'green', letterSpacing: .5, paddingTop: 2 }}>{item.type === 'debit' ? `- ${item.coin}` : `+ ${item.coin}`}</Text>
                </View>
                <Text style={{ fontSize: 12, color: 'rgba(0,0,0,0.4)', fontWeight: '700', letterSpacing: .8 }}>credited on {moment(item.created_at).format("Do MMM YYYY")}</Text>
            </View>
            <View style={{ borderBottomWidth: .5, paddingVertical: 5, borderBottomColor: 'rgba(0,0,0,0.2)' }} />

        </View>

    );
    // const itemseparate = () => {
    //     return (

    //     )
    // }
    const ListHeaderComponent = () => {
        return (
            <View style={{ marginLeft: 10, marginBottom: 15 }}>
                {reward?.map((item) => {
                    return (
                        <View >
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={{ width: '82%', fontSize: 15, color: 'rgba(0,0,0,0.8)', letterSpacing: .5 }}>Earn coin from {item.section_type}</Text>
                                <Text style={{ fontSize: 18, color: 'rgba(0,0,0,0.8)', fontWeight: '700', letterSpacing: .8, color: 'green' }}>+ {item.coin}</Text>
                            </View>
                            <View style={{ borderBottomWidth: .5, paddingVertical: 5, borderBottomColor: 'rgba(0,0,0,0.2)' }} />
                        </View>
                    )
                })}



            </View>
        )
    }

    return (
        <View style={GlobalStyles.container}>
            <BackHeader
                navigation={props.navigation}
                title={'Coin Balance'}
                cartnumber={props.cartNumber}
                coin={props.coin}
            />
            {loader ? (
                <Loader />
            ) : (
                <FlatList
                    data={data}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                    ListHeaderComponent={ListHeaderComponent}
                // ItemSeparatorComponent={itemseparate}
                />)}

        </View>
    )
}


const mapStateToProps = state => {
    return {
        cartNumber: state.CartReducer.cartNumber,
        userid: state.UserLoginReducer.loginUser,
        coin: state.CoinReducer.coinNumber,

    };
};

const mapDispatchToProps = dispatch =>
    bindActionCreators({ updateCoinNumber }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Transaction);



