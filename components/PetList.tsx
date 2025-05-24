import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import Pet from "@/data/types";

import PetItem from "./PetItem";
import instance from "@/api";
import { useQuery } from "@tanstack/react-query";
import { fetchPets } from "@/api/pets";

const PetList = () => {
  const [search, setSearch] = useState("");
  const [type, setType] = useState("");
  // const [displayPets, setDisplayPets] = useState<Pet[]>([]);
  //fetch all pets
  const {
    data: pets = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["pets"],
    queryFn: fetchPets,
  });

  if (isLoading) return <Text>Loading...</Text>;
  if (error) return <Text>Failed to fetch pets</Text>;

  // useEffect(() => {
  //   const fetchPets = async () => {
  //     try {
  //       const response = await instance.get("/pets");
  //       setDisplayPets(response.data);
  //     } catch (error) {
  //       console.error("Unable to fetch pets", error);
  //     }
  //   };
  //   fetchPets();
  // }, []);
  const filteredPets = pets
    .filter((pet) => pet.name.toLowerCase().includes(search.toLowerCase()))
    .filter((pet) => pet.type.toLowerCase().includes(type.toLowerCase()))
    .map((pet) => (
      <PetItem
        key={pet.id}
        pet={pet}
        displayPets={pets}
        setDisplayPets={() => {}}
      />
    ));

  // const petList = displayPets
  //   .filter((pet) => pet.name.toLowerCase().includes(search.toLowerCase()))
  //   .filter((pet) => pet.type.toLowerCase().includes(type.toLowerCase()))
  //   .map((pet) => (
  //     <PetItem
  //       key={pet.id}
  //       pet={pet}
  //       setDisplayPets={setDisplayPets}
  //       displayPets={displayPets}
  //     />
  // ));
  return (
    <ScrollView
      contentContainerStyle={styles.container}
      style={styles.containerStyle}
    >
      {/* Search Input */}
      <TextInput
        placeholder="Search for a pet"
        style={styles.searchInput}
        onChangeText={(value) => setSearch(value)}
      />

      {/* Filter by type */}
      <ScrollView horizontal contentContainerStyle={styles.filterContainer}>
        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => setType("")}
        >
          <Text>All</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => setType("Cat")}
        >
          <Text>Cat</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => setType("Dog")}
        >
          <Text>Dog</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => setType("Rabbit")}
        >
          <Text>Rabbit</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Pet List */}
      {filteredPets}
    </ScrollView>
  );
};

export default PetList;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  containerStyle: {
    backgroundColor: "#f9e3be",
    paddingRight: 20,
    paddingLeft: 20,
    paddingBottom: 20,
  },
  searchInput: {
    width: "100%",
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    backgroundColor: "#fff",
    borderColor: "#000",
  },
  filterTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  filterContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginBottom: 10,
  },
  filterButton: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    width: "20%",
    justifyContent: "center",
    alignItems: "center",
  },
});
