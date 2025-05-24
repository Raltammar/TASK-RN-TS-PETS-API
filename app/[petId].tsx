import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams, router } from "expo-router";
import instance from "@/api";
import Pet from "@/data/types";
import { useQuery } from "@tanstack/react-query";
import { fetchPetById } from "@/api/pets";

// import pets from "@/data/pets";

const PetDetails = () => {
  const { petId } = useLocalSearchParams();
  const {
    data: pet,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["pet", petId],
    queryFn: () => fetchPetById(petId as string),
    enabled: !!petId,
  });

  const handleDelete = async () => {
    try {
      await instance.delete(`/pets/${petId}`);
      Alert.alert("Pet deleted!");
      router.back();
    } catch (error) {
      console.error("Delete error:", error);
      Alert.alert("Error", "Pet could not be deleted");
    }
  };

  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="black" />
      </View>
    );
  }

  if (error || !pet) {
    return (
      <View style={styles.container}>
        <Text style={styles.name}>ERROR</Text>
      </View>
    );
  }
  // amended to include use query
  // const [pet, setPet] = useState<Pet | null>(null);
  // const [error, setError] = useState("");
  // useEffect(() => {
  //   const fetchPet = async () => {
  //     try {
  //       const response = await instance.get(`/pets/${petId}`);
  //       setPet(response.data);
  //     } catch (error) {
  //       console.error("FetchinG PeT error !!", error);
  //       setError("NOt Found");
  //     }
  //   };
  //   if (petId) {
  //     fetchPet();
  //   }
  // }, [petId]);
  // if (error) {
  //   return (
  //     <View>
  //       <Text>ERROR</Text>
  //     </View>
  //   );
  // }
  // if (!pet) {
  //   return (
  //     <View>
  //       <Text>LoaDinG</Text>
  //     </View>
  //   );
  // }
  // //  Delete
  // const handleDelete = async () => {
  //   try {
  //     await instance.delete(`/pets/${petId}`);
  //     Alert.alert("Pet deleted!");
  //     router.back();
  //   } catch (error) {
  //     console.error("Delette error:");
  //     Alert.alert("Error Pets not delleted");
  //   }
  // };
  // if (error) {
  //   return (
  //     <View>
  //       <Text>ERROR</Text>
  //     </View>
  //   );
  // }

  // if (!pet) {
  //   return (
  //     <View>
  //       <Text>Loading...</Text>
  //     </View>
  //   );
  // }

  return (
    <View style={styles.container}>
      <Text style={styles.name}>{pet.name}</Text>
      <Image source={{ uri: pet.image }} style={styles.image} />
      <Text style={styles.description}> {pet.description}</Text>
      <Text style={styles.type}>Type: {pet.type}</Text>

      <View>
        <TouchableOpacity style={styles.button} onPress={handleDelete}>
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
