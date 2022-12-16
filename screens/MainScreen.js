import { useContext, useEffect, useRef } from "react";

import { FlatList, View } from "react-native";
import { Button, Icon } from "@rneui/base";
import { DataContext } from "../store/DataContext";
import Post from "../components/Post";

const MainScreen = ({ navigation }) => {
  useEffect(() => {
    navigation.setOptions({
      headerTitle: "Posts",
      headerLeft: () => (
        <Icon
          name='refresh'
          color='black'
          iconStyle={{ marginLeft: 10 }}
          onPress={() => uploadItems()}
        />
      ),
      headerRight: () => (
        <Icon
          name='add'
          color='black'
          iconStyle={{ marginRight: 10 }}
          onPress={() =>
            navigation.navigate("AddNewPostScreen", {
              type: "add",
              title: "Add new post",
            })
          }
        />
      ),
    });
  }, []);

  const { error, loading, items, uploadItems } = useContext(DataContext);

  useEffect(() => {
    uploadItems();
  }, []);

  return (
    <>
      {error && (
        <View>
          <Button color='error'>Error</Button>
        </View>
      )}
      {!error && loading && (
        <View
          style={{
            height: "100%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Button title='Solid' type='solid' loading />
        </View>
      )}
      {!error && !loading && (
        <FlatList
          data={items}
          renderItem={({ item }) => (
            <Post
              itemData={item}
              onPress={() =>
                navigation.navigate("AddNewPostScreen", {
                  type: "edit",
                  title: "Edit post",
                  data: { item },
                })
              }
            />
          )}
          keyExtractor={(item) => item._id}
        />
      )}
    </>
  );
};

export default MainScreen;
