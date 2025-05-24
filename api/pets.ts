import { View, Text } from "react-native";
import instance from ".";
import React from "react";
import Pet from "@/data/types";

// Fetch ALL pets
export const fetchPets = async (): Promise<Pet[]> => {
  const response = await instance.get("/pets");
  return response.data;
};

// Fetch One pet
export const fetchPetById = async (id: string | number): Promise<Pet> => {
  const response = await instance.get(`/pets/${id}`);
  return response.data;
};
