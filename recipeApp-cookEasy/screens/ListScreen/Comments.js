import React from "react";
import { View, Image, StyleSheet, FlatList } from "react-native";
import { SingleComment } from "./SingleComment";

export const Comments = ({ comments }) => {
  return (
    <View>
      <FlatList
        data={comments}
        renderItem={({ item }) => <SingleComment {...item} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({});
