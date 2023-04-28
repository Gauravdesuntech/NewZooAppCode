
import { FlatList, Text, View, Image, TouchableOpacity } from 'react-native';
import React from 'react'
import Header from '../components/Header';
import styles from '../configs/Styles';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';

const data = [{
    id: 1,
    fullName: "User",
    avatarUrl: "https://www.admitek.com/wp-content/uploads/2017/04/User.png",
    screen: "ListStaff"
}, {
    id: 2,
    fullName: "Sites",
    avatarUrl: "https://printablefreecoloring.com/drawing/animals/coloring-zoo-12643.jpg",
    screen: "ListSite"
}, {
    id: 3,
    fullName: "Sections",
    avatarUrl: "https://img.freepik.com/free-vector/different-kinds-bird-cartoon-illustration-set-tomtit-robin-starling-woodpecker-sparrow-sitting-tree-branch-isolated-white-background-winter-birds-concept_74855-24087.jpg?w=2000",
    screen: "ListSection"
}, {
    id: 4,
    fullName: "Enclosures",
    avatarUrl: "https://a-z-animals.com/media/2022/06/Lovebirds-on-fence.jpg",
    screen: "EnclosureList"
},{
    id: 5,
    fullName: "Eggs",
    avatarUrl: "https://a-z-animals.com/media/2023/03/iStock-619400680.jpg",
    screen: "EggLists"
},{
    id: 6,
    fullName: "Animals",
    avatarUrl: "https://a-z-animals.com/media/2022/06/row-of-cats-and-dogs-together-on-white-picture-id933909576-1024x614.jpg",
    screen: "AnimalList"
},];

const Module = () => {
    const navigation = useNavigation();
    const isSwitchOn = useSelector((state) => state.darkMode.darkMode);

    return (
        <>
       
            <Header noIcon={true} title={"Module"} backGoesto={true}/>
        <View style={[styles.mainContainer,{backgroundColor : isSwitchOn ? "#1F415B" : "#DAE7DF"}]}>
            <View style={[styles.flatListBox,{backgroundColor : isSwitchOn ? "#1F415B" : "#DAE7DF"}]}>
                <FlatList
                    data={data}
                    numColumns={2}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item }) => <View>
                        <TouchableOpacity onPress={() => navigation.navigate(item.screen)}>
                            <View style={styles.imageBox}>
                                <Image
                                    size={40}
                                    source={{
                                        uri: item.avatarUrl
                                    }}
                                    style={{ height: 170, width: 170, borderRadius: 15 }}
                                    alt={item.fullName}
                                />
                                <View>
                                    <Text style={styles.imageName}>
                                        {item.fullName}
                                    </Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    </View>} keyExtractor={item => item.id} />
            </View>
        </View>
        </>
    )
}
export default Module;
