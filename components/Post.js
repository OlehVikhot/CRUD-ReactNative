import React, { useContext } from "react";
import { View, StyleSheet, Image } from "react-native";
import { Text, Card, Button, Icon } from "@rneui/themed";
import { DataContext } from "../store/DataContext";

function Post({ itemData, onPress }) {
  const { title, text, image, url } = itemData;
  const { deleteItem } = useContext(DataContext);

  return (
    <View style={styles.container}>
      <Card>
        <Card.Title>{title}</Card.Title>
        <Card.Divider />
        <Card.Image
          style={{ padding: 0 }}
          source={{
            uri: "https://awildgeographer.files.wordpress.com/2015/02/john_muir_glacier.jpg",
          }}
        />
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
            onPress={() => deleteItem(itemData.id)}
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
    </View>
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
