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
//Create Pet
export const createPet = async (petData: {
  name: string;
  description: string;
  type: string;
  image: string;
  adopted: number;
}) => {
  const response = await instance.post("/pets", petData);
  return response.data;
};
export const deletePet = async (id: number | string) => {
  const response = await instance.delete(`/pets/${id}`);
  return response.data;
};
