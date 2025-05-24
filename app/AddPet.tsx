import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
} from "react-native";
import React, { useState } from "react";
import instance from "@/api";
import { router } from "expo-router";

const AddPet = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("");
  const [image, setImage] = useState("");

  const controlAddPet = async () => {
    await instance.post("/pets", {
      name,
      description,
      type,
      image,
      adopted: 0,
    });
    Alert.alert("Pet added ");
    router.back();
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Your Pet! </Text>
      <TextInput
        placeholder="Name"
        style={styles.input}
        value={name}
        onChangeText={setName}
      />
      <TextInput
        placeholder="Description"
        style={styles.input}
        value={description}
        onChangeText={setDescription}
      />
      <TextInput
        placeholder="Type"
        style={styles.input}
        value={type}
        onChangeText={setType}
      />
      <TextInput
        placeholder="Image"
        style={styles.input}
        value={image}
        onChangeText={setImage}
      />

      <TouchableOpacity style={styles.button} onPress={controlAddPet}>
        <Text style={styles.buttonText}>Add Pet</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AddPet;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9e3be",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    margin: 10,
  },
  input: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 10,
    margin: 10,
  },
  button: {
    backgroundColor: "black",
    padding: 10,
    borderRadius: 10,
    margin: 10,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
  },
});
