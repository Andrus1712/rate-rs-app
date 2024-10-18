import { Avatar, Icon, ListItem, SearchBar, Text } from "@rneui/base";
import { useEffect, useState } from "react";
import { Loading } from "../components";
import { collection, endAt, limit, onSnapshot, orderBy, query, startAt } from "firebase/firestore";
import { db, screen } from "../utils";
import { FlatList, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

const SearchScreen = () => {
  const [searchText, setSearchText] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const navigation = useNavigation();

  useEffect(() => {
    if (searchText !== "") {
      setIsLoading(true);

      (async () => {
        const q = query(
          collection(db, "restaurants"),
          orderBy("name"),
          startAt(searchText),
          endAt(`${searchText}|uf8ff`),
          limit(20)
        );

        onSnapshot(q, snapshot => {
          const array = [];
          for (const doc of snapshot.docs) {
            array.push(doc.data());
          }
          setSearchResult(array);
          setIsLoading(false);
        });
      })();
    }
    return () => {
      setSearchResult([]);
    };
  }, [searchText]);

  const goToRestaurant = data => {
    navigation.navigate(screen.restaurant.tab, {
      screen: screen.restaurant.show,
      params: {
        name: data.name,
        id: data.id,
      },
    });
  };
  return (
    <View
      style={{
        flexDirection: "column",
      }}>
      <SearchBar
        placeholder={"Search restaurant"}
        value={searchText}
        onChangeText={text => setSearchText(text)}
      />
      <View>
        {searchResult.length > 0 ? (
          <FlatList
            data={searchResult}
            keyExtractor={item => item.id}
            renderItem={({ item, index }) => (
              <ListItem bottomDivider={true} onPress={() => goToRestaurant(item)}>
                <Avatar source={{ uri: item.images[0] }} rounded={true} />
                <ListItem.Content>
                  <ListItem.Title>{item.name}</ListItem.Title>
                </ListItem.Content>
                <Icon name={"chevron-right"} type={"material-community"} />
              </ListItem>
            )}
          />
        ) : (
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              height: "94%",
            }}>
            {isLoading && <Loading show={true} text={"Loading results"} progress={0} />}
            {searchText === "" ? <Text>Finds your restaurants</Text> : null}
            {searchResult.length === 0 && searchText !== "" && !isLoading ? (
              <Text>No results found.</Text>
            ) : null}
          </View>
        )}
      </View>
    </View>
  );
};

export default SearchScreen;
