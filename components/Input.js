import { View } from "react-native";
import { Text, Input } from "@rneui/base";

function MyInput({ title, ...props }) {
  return (
    <View
      style={{
        backgroundColor: "white",
        marginTop: 6,
        padding: 5,
        borderRadius: 10,
        alignItems: "center",
      }}
    >
      <Text h4={true}>{title}</Text>
      <Input {...props} inputStyle={{ border: 1 }} />
    </View>
  );
}

export default MyInput;
