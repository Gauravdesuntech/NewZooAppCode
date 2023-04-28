// Name: Ganesh Aher 
// Date:24 April
// work: Add FlatList

import { View, Text, StyleSheet, FlatList, RefreshControl } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import ListComponent from '../../components/ListComponent';
import Loader from '../../components/Loader';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import Header from '../../components/Header';
import moment from 'moment';
import { getAnimalList } from '../../services/AnimalService';
import FloatingButton from '../../components/FloatingButton';
import Card from '../../components/CustomCard';
import AnimalListCard from '../../components/AnimalListCard';
import { capitalize } from '../../utils/Utils';
import { log } from 'react-native-reanimated';

const AnimalList = (props) => {

  const navigation = useNavigation()

  const [eggList, setEggList] = useState([])
  const [isLoading, setIsLoding] = useState(false);
  const user_id = useSelector((state) => state.UserAuth.userDetails.user_id);
  const zooID = useSelector((state) => state.UserAuth.zoo_id);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getData();
    });
    return unsubscribe;
  }, [navigation])

  const getData = () => {
    setIsLoding(true)

    let obj = {
      zoo_id: zooID,
    }

    getAnimalList(obj).then((res) => {
      // console.log("RESPONSE FROM EGG LIST API.........................", res.data);
      setEggList(res.data)
      console.log('res.data>>>>>>>>>>>>>>>>>>>>>>>', res.data);
    }).finally(() => {
      setIsLoding(false)
      console.log("ok========++");
    })

  }
  // const InnerList = ({ item }) => {

  //   const {
  //     animal_id, local_id, taxonomy_id, complete_name, vernacular_name,
  //     enclosure_is_movable, enclosure_is_walkable, enclosure_environment, enclosure_type_id, enclosure_type,
  //     enclosure_id, user_enclosure_name
  //   } = item.item;

  //   return (
  // <View style={{ flex: 1, }}>

  //         <View style={{ flexDirection: 'row' }}>
  //         <Text>Common Name : </Text>
  //         <Text style={styles.idNumber}>{capitalize(vernacular_name)}</Text>
  //       </View>


  //       <View style={styles.header}>

  //         <View style={styles.innerHeader}>
  //           <Text>Animal Id:</Text>
  //           <Text style={styles.idNumber}>{`#${animal_id}`}</Text>
  //         </View>
  //       </View>

  //       <View style={{ flexDirection: 'row' }}>
  //         <Text>local_id :</Text>
  //         <Text style={styles.idNumber}>{local_id}</Text>
  //       </View>

  //       <View style={{ flexDirection: 'row' }}>
  //         <Text>User Enclosure Name:</Text>
  //         <Text style={styles.idNumber}>{user_enclosure_name}</Text>
  //       </View>       
  //     </View>

  //   )

  // }
// console.log(">>>>>>>>>>>>>>>>>>>....",eggList)

  return (
    <View style={{ flex: 1 }}>

      <Header noIcon={true} title={'Animal List'} />
      <Loader visible={isLoading} />
      <View style={{ flex: 1 }}>
        <View style={styles.container}>

          <FlatList
            data={eggList}
            
            renderItem={({ item }) =>
               
              <AnimalListCard

                title={capitalize(item.vernacular_name)}

                subtitle=
                {
                  item.local_id == "" || item.local_id == null ? "Animal Id: " + item.animal_id : "Local Id: " + item.local_id
                }

                UserEnclosureName={"Enclosure: " + item.user_enclosure_name}


                onPress={() => navigation.navigate('AnimalsDetails', {animal_id : item.animal_id })}

              />

            }
            keyExtractor={item => item.animal_id}
            refreshControl={<RefreshControl refreshing={isLoading} onRefresh={getData}/>}
          />
          <FloatingButton
            icon="plus-circle-outline"
            backgroundColor="#eeeeee"
            borderWidth={0}
            borderColor="#aaaaaa"
            borderRadius={50}
            linkTo=""
            floaterStyle={{ height: 60, width: 60 }}
            onPress={() => navigation.navigate("AnimalAddDynamicForm")}
          />

        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#ccc"
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  innerHeader: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  idNumber: {
    marginLeft: 3,
    fontWeight: '500'
  },
  shadow: {
    shadowOffset: {
      height: 10,
      width: 5
    },
    shadowColor: 'rgba(0,0,0,1)',
    shadowOpacity: 1,
    backgroundColor: 'rgba(0,0,0,0.2)'
  },

})

export default AnimalList;

