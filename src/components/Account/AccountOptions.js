import { View } from "react-native";
import { Icon, ListItem } from "@rneui/base";

export function AccountOptions(props) {
  const options = getMenuOptions();
  return (
    <View>
      {options.map((option, index) => (
        <ListItem key={index} bottomDivider={true} onPress={option.onPress}>
          <Icon name={option.iconNameLeft} size={24} color={option.iconColorLeft} />
          <ListItem.Content>
            <ListItem.Title>{option.title}</ListItem.Title>
          </ListItem.Content>
          <Icon name={option.iconNameRight} size={24} color={option.iconColorRight} />
        </ListItem>
      ))}
    </View>
  );
}

function getMenuOptions() {
  return [
    {
      title: "Change Names",
      iconType: "material-community",
      iconNameLeft: "account-circle",
      iconColorLeft: "#ccc",
      iconNameRight: "chevron-right",
      iconColorRight: "#ccc",
      onPress: () => {
        console.log("Change Names");
      },
    },
    {
      title: "Change Email",
      iconType: "material-community",
      iconNameLeft: "email",
      iconColorLeft: "#ccc",
      iconNameRight: "chevron-right",
      iconColorRight: "#ccc",
      onPress: () => {
        console.log("Change email");
      },
    },
    {
      title: "Change Password",
      iconType: "material-community",
      iconNameLeft: "lock-reset",
      iconColorLeft: "#ccc",
      iconNameRight: "chevron-right",
      iconColorRight: "#ccc",
      onPress: () => {
        console.log("Change password");
      },
    },
  ];
}
