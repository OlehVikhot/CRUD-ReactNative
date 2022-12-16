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

function validURL(str) {
  var regex =
    /(?:https?):\/\/(\w+:?\w*)?(\S+)(:\d+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/;
  if (!regex.test(str)) {
    return false;
  } else {
    return true;
  }
}

function AddNewPostScreen({ navigation, route }) {
  const [inputData, setInputData] = useState({
    title: "",
    text: "",
    image: "",
    url: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

  const { addItem, updateItem } = useContext(DataContext);

  const type = route.params.type;
  const headerTitle = route.params.title;
  const { title, text, image, url, _id } = route?.params?.data?.item || {};

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

  useEffect(() => {
    route.params.data &&
      setInputData((prevState) => {
        return { text, title, image, url };
      });
  }, []);

  function handleInput(text, title) {
    setInputData((prevState) => {
      return { ...prevState, [title]: text };
    });
  }

  function completeEditing() {
    if (
      !inputData?.title ||
      !inputData?.text ||
      !inputData?.image ||
      !inputData?.url
    )
      return setErrorMessage("Fill the input");

    if (!validURL(inputData.image) && !validURL(inputData.url)) {
      return alert("Check info, Wrong URL");
    }

    if (type === "edit") updateItem({ ...inputData, _id });
    if (type === "add") addItem(inputData);
    navigation.navigate("MainScreen");
  }

  return (
    <View style={{ justifyContent: "center" }}>
      {inputs.map((item, index) => (
        <MyInput
          errorStyle={{ color: "red" }}
          errorMessage={inputData[item.id] ? "" : errorMessage}
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
