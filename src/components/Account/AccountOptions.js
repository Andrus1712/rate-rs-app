import { View } from "react-native";
import { Icon, ListItem } from "@rneui/base";
import { useState } from "react";
import { Modal } from "../Shared/Modal";
import { ChangeDisplayNameForm } from "./ChangeDisplayNameForm";
import { ChangeEmailForm } from "./ChangeEmailForm";
import { ChangePasswordForm } from "./ChangePasswordFrom/ChangePasswordForm";

export function AccountOptions(props) {
  const { onReload } = props;

  const [showModal, setShowModal] = useState(false);
  const [renderComponent, setRenderComponent] = useState(null);

  const onCloseOpenModal = () => {
    setShowModal(prev => !prev);
  };

  const selectedComponent = key => {
    if (key === "displayName") {
      setRenderComponent(<ChangeDisplayNameForm onClose={onCloseOpenModal} onReload={onReload} />);
    }
    if (key === "displayEmail") {
      setRenderComponent(<ChangeEmailForm onClose={onCloseOpenModal} onReload={onReload} />);
    }
    if (key === "displayPassword") {
      setRenderComponent(<ChangePasswordForm onClose={onCloseOpenModal} />);
    }

    onCloseOpenModal();
  };

  const options = getMenuOptions(selectedComponent);
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
      <Modal show={showModal} close={onCloseOpenModal}>
        {renderComponent}
      </Modal>
    </View>
  );
}

function getMenuOptions(selectedComponent) {
  return [
    {
      title: "Change Names",
      iconType: "material-community",
      iconNameLeft: "account-circle",
      iconColorLeft: "#ccc",
      iconNameRight: "chevron-right",
      iconColorRight: "#ccc",
      onPress: () => selectedComponent("displayName"),
    },
    {
      title: "Change Email",
      iconType: "material-community",
      iconNameLeft: "email",
      iconColorLeft: "#ccc",
      iconNameRight: "chevron-right",
      iconColorRight: "#ccc",
      onPress: () => selectedComponent("displayEmail"),
    },
    {
      title: "Change Password",
      iconType: "material-community",
      iconNameLeft: "lock-reset",
      iconColorLeft: "#ccc",
      iconNameRight: "chevron-right",
      iconColorRight: "#ccc",
      onPress: () => selectedComponent("displayPassword"),
    },
  ];
}
