import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import instance from "@/api";
import Pet from "@/data/types";

// import pets from "@/data/pets";

const PetDetails = () => {
  const { petId } = useLocalSearchParams();
  const [pet, setPet] = useState<Pet | null>(null);
  const [error, setError] = useState("");
  useEffect(() => {
    const fetchPet = async () => {
      try {
        const response = await instance.get(`/pets/${petId}`);
        setPet(response.data);
      } catch (error) {
        console.error("FetchinG PeT error !!", error);
        setError("NOt Found");
      }
    };
    if (petId) {
      fetchPet();
    }
  }, [petId]);
  if (error) {
    return (
      <View>
        <Text>ERROR</Text>
      </View>
    );
  }
  if (!pet) {
    return (
      <View>
        <Text>LoaDinG</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.name}>{pet.name}</Text>
      <Image source={{ uri: pet.image }} style={styles.image} />
      <Text style={styles.description}> {pet.description}</Text>
      <Text style={styles.type}>Type: {pet.type}</Text>

      <View>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PetDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9e3be",
    padding: 20,
  },
  image: {
    width: "100%",
    height: 300,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
  description: {
    fontSize: 16,
    marginTop: 10,
    textAlign: "center",
  },
  type: {
    fontSize: 16,
    marginTop: 10,
    textAlign: "center",
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
