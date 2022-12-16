import React, { useContext } from "react";
import {
  View,
  StyleSheet,
  Image,
  Linking,
  TouchableOpacity,
} from "react-native";
import { Text, Card, Button, Icon } from "@rneui/themed";
import { DataContext } from "../store/DataContext";

function Post({ itemData, onPress }) {
  const { title, text, image, url } = itemData;
  const { deleteItem } = useContext(DataContext);

  let defaultImage =
    "https://user-images.githubusercontent.com/43302778/106805462-7a908400-6645-11eb-958f-cd72b74a17b3.jpg";

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => Linking.openURL(url)}
    >
      <Card>
        <Card.Title>{title}</Card.Title>
        <Card.Divider />
        <Card.Image style={{ padding: 0 }} source={{ uri: image }} />
        <Text style={{ marginBottom: 10, marginTop: 10 }}>{text}</Text>
        <View style={styles.btnContainer}>
          <Button
            onPress={onPress}
            icon={
              <Icon
                name='edit'
                color='#ffffff'
                iconStyle={{ marginRight: 10 }}
              />
            }
            buttonStyle={{
              width: 150,
            }}
            title='Edit'
          />
          <Button
            onPress={() => deleteItem(itemData._id)}
            color='error'
            icon={
              <Icon
                name='delete'
                color='#ffffff'
                iconStyle={{ marginRight: 10 }}
              />
            }
            buttonStyle={{
              width: 150,
            }}
            title='Delete'
          />
        </View>
      </Card>
    </TouchableOpacity>
  );
}

export default Post;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  btnContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
});
