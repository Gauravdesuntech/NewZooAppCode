import { Entypo } from '@expo/vector-icons'
import React from 'react'
import { Text, View } from 'react-native'
import { FlatList } from 'react-native'
import { Avatar, Card } from 'react-native-paper'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
export default function DemoCard({ data, isSwitchOn }) {
    return (

        <FlatList
            data={data}
            // contentContainerStyle={{flex:1,marginBottom:200,backgroundColor:"green"}}
            renderItem={(item) => (
                <Card style={{ marginBottom:hp(2.5)}}>
                    <Card.Title
                        title="Paradise"
                        subtitle="2 day ago"
                        left={(props) => (
                            <Avatar.Text
                                size={44}
                                label="P"
                                backgroundColor="#E93353"
                                color="white"
                            />
                        )}
                        titleStyle={{
                            fontWeight: "200",
                            fontSize: hp(2),
                        }}
                        subtitleStyle={{
                            fontWeight: "400",
                            fontSize: hp(1.5),
                            marginTop: hp(-0.8)
                        }}
                    />
                    <Entypo name="dots-three-vertical" size={wp(5)}
                        style={{ color: "#717970", position: 'absolute', right: wp(5), top: hp(3.5) }}
                    />

                    <Card.Cover
                        source={{
                            uri: "https://s3-alpha-sig.figma.com/img/a286/40e4/3317dd20f61f3297f1e52b6f579ec2b4?Expires=1681084800&Signature=ddo47FxeNofZJHEUdEPTRGDBIumdLuuqzSGfkjRM06-0~1sYq~yz~te7Xpx3JfXRvXU2Oa~LhrNUBKA2wgol1ePB5lRH6f7LeXV9Kc1N4g7AvkTLqaWYgxBMzkzZ2-EcEDCmiOZU3M-sM-9aA8I5W8OCTXifCFIwUs1LcKeWNegrAbNrHNixiAvDioyYeiEDTLHGx92bJ-yISWWStk1cLcOJm4X3J~7y5naIU1OkNjmUVdBxrEGEvPQ6DHvzMw9MHTcqd3bu7gZLzoGNrsSEDiYRa6WVZayD0AaV2MKEEUPCW~M3Sy4UAqyGpuz44u5ETGup3FGZTI70OoZdamUhNQ__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4 ",
                        }}
                    />
                    <Card.Content style={{}}>
                        <Text
                            style={{
                                color: isSwitchOn ? "white" : "black",
                                margin: hp(1),
                                fontWeight: "300",
                                fontSize: hp(2),
                            }}
                        >
                            Today we have a new scarlet macaw added to our Paradise Macaw
                            section
                        </Text>
                    </Card.Content>
                </Card>
            )}
        />
    )
}
