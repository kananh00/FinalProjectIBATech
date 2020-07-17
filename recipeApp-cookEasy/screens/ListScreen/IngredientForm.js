import React, { useState, useEffect } from "react";
import { StyleSheet, View, Dimensions, Alert } from "react-native";

import { CustomField } from "../../components/CustomField";
import { RadioGroup } from "../../components/RadioGroup";
import { widthByPercent } from "../../utils/widthByPercent";
import { CustomBtn } from "../../components/CustomBtn";
import { COLORS } from "../../styles/color";

const COUNT_TYPES = ["kg", "pack", "litre", "glass"];
const fieldInitialState = {
  title: "",
  count: 1,
  unit: COUNT_TYPES[5],
};

export const IngredientForm = ({
  addHandler,
  singeIngredientEditState,
  updateIngredientHandler,
  finishSingleIngredientEdit,
}) => {
  // Form data handle
  const [fields, setFields] = useState(fieldInitialState);
  const fieldChangeHandler = (name, value) => {
    setFields((fields) => ({
      ...fields,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (singeIngredientEditState.status) {
      setFields(singeIngredientEditState.ingredient);
    }
  }, [singeIngredientEditState]);

  const validateForm = () => {
    if (fields.title.trim() === "") {
      Alert.alert("Name is empty", "Name is required field");
      return false;
    } else if (fields.count.trim() === "") {
      Alert.alert("Count is empty", "You should write count");
      return false;
    }
    return true;
  };

  const onCancelPress = () => {
    finishSingleIngredientEdit();
    setFields(fieldInitialState);
  };

  const onUpdateSubmit = () => {
    if (validateForm()) {
      updateIngredientHandler({ ingredient: fields });
      onCancelPress();
    }
  };

  const onAddSubmit = () => {
    if (validateForm()) {
      addHandler({ ingredient: fields });
      setFields(fieldInitialState);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <CustomField
          value={fields.title}
          onChangeText={(value) => fieldChangeHandler("title", value)}
          title="ingredient name"
          contentContainerStyle={{ width: widthByPercent(75, 3) }}
        />
        <CustomField
          keyboardType={"number-pad"}
          value={fields.count}
          onChangeText={(value) => fieldChangeHandler("count", value)}
          title="count"
          contentContainerStyle={{ width: widthByPercent(25, 3) }}
        />
      </View>
      <RadioGroup
        value={fields.unit}
        onValueChange={(value) => fieldChangeHandler("unit", value)}
        contentContainerStyle={styles.types}
        options={COUNT_TYPES}
      />

      {singeIngredientEditState.status ? (
        <View style={styles.row}>
          <CustomBtn
            title="Cancel"
            width={widthByPercent(50, 3)}
            style={styles.cancel}
            onPress={onCancelPress}
          />
          <CustomBtn
            title="Update"
            width={widthByPercent(50, 3)}
            onPress={onUpdateSubmit}
          />
        </View>
      ) : (
        <View style={styles.btnWrapper}>
          <CustomBtn title="Add to ingredients" onPress={onAddSubmit} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingBottom: 21,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  types: {
    marginVertical: 14,
  },
  cancel: {
    opacity: 0.6,
  },
});
