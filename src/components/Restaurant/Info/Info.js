import { Icon, ListItem, Text } from "@rneui/base";
import { styles } from "./Info.styles";
import { Map } from "../../Shared";
import { View } from "react-native";

export function Info(props) {
  const { restaurant } = props;

  const ListInfo = [
    {
      text: restaurant.address,
      iconName: "map-marker",
      iconColorLeft: "#00a680",
      typeIcon: "material-community",
    },
    {
      text: restaurant.phone,
      iconName: "phone",
      iconColorLeft: "#00a680",
      typeIcon: "material-community",
    },
    {
      text: restaurant.email,
      iconName: "email",
      iconColorLeft: "#00a680",
      typeIcon: "material-community",
    },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Info restaurant</Text>
      <Map location={restaurant.location} name={restaurant.name} />
      {ListInfo.map((item, index) => {
        return (
          <ListItem key={index} bottomDivider={true}>
            <Icon type={item.typeIcon} name={item.iconName} size={24} color={item.iconColorLeft} />
            <ListItem.Content>
              <ListItem.Title>{item.text}</ListItem.Title>
            </ListItem.Content>
          </ListItem>
        );
      })}
    </View>
  );
}
