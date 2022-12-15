import { useContext, useEffect, useState } from "react";
import { Alert, View } from "react-native";
import { Icon } from "@rneui/themed";
import { DataContext } from "../store/DataContext";
import MyInput from "../components/Input";

const inputs = [
  { id: "text", title: "Text" },
  { id: "title", title: "Title" },
  { id: "image", title: "Image URL" },
  { id: "url", title: "URL" },
];

function AddNewPostScreen({ navigation, route }) {
  const [inputData, setInputData] = useState();
  const { addItem, updateItem } = useContext(DataContext);

  function handleInput(text, title) {
    setInputData((prevState) => {
      return { ...prevState, [title]: text };
    });
  }

  const type = route.params.type;
  const headerTitle = route.params.title;
  const { title, text, image, url, id } = route?.params?.data?.item || {};

  useEffect(() => {
    route.params.data &&
      setInputData((prevState) => {
        return { text, title, image, url };
      });
  }, []);

  function completeEditing() {
    if (
      inputData?.title &&
      inputData?.text &&
      inputData?.image &&
      inputData?.url
    ) {
      if (type === "edit") updateItem({ ...inputData, id });
      if (type === "add") addItem(inputData);
      navigation.navigate("MainScreen");
    } else {
      Alert.alert("Fill all fields");
    }
  }

  navigation.setOptions({
    headerTitle: headerTitle,
    headerLeft: () => (
      <Icon
        name='chevron-back'
        type='ionicon'
        color='black'
        iconStyle={{ marginLeft: 10 }}
        onPress={() => navigation.goBack()}
      />
    ),
    headerRight: () => (
      <Icon
        name='md-checkmark-sharp'
        type='ionicon'
        color='black'
        iconStyle={{ marginRight: 10 }}
        onPress={() => completeEditing()}
      />
    ),
  });

  return (
    <View style={{ justifyContent: "center" }}>
      {inputs.map((item, index) => (
        <MyInput
          key={index}
          title={item.title}
          value={inputData?.[item.id]}
          onChangeText={(text) => handleInput(text, item.id)}
        />
      ))}
    </View>
  );
}

export default AddNewPostScreen;
