import { View, Text, Image } from "react-native";
import React from "react";
import styles from "./styles";
import { AntDesign } from "@expo/vector-icons";

const PortfolioAssetsItems = ({ assetItem }) => {
  const {
    id,
    open,
    name,
    priceBought,
    percentageChange,
    boughtAssetQuantity,
    symbol,
  } = assetItem;

  const isChangePositive = () => percentageChange >= 0;

  const renderHoldings = () => (boughtAssetQuantity * open).toFixed(2);

  return (
    <View style={styles.coinContainer}>

      <View>
        <Text style={styles.title}>{symbol}</Text>
        <Text style={styles.ticker}></Text>
      </View>
      <View style={{ marginLeft: "auto", alignItems: "flex-end" }}>
        <Text style={styles.title}>{open}</Text>
        <View style={{ flexDirection: "row" }}>
          <AntDesign
             name={isChangePositive() ? "caretup" : "caretdown"}
            size={14}
            color={isChangePositive() ? "#80dd6d" : "#b60033"}
            style={{ alignSelf: "center", marginRight: 5 }}
          />
          <Text
            style={{
              color: isChangePositive() ? "#80dd6d" : "#b60033",
              fontWeight: "700",
            }}
          >
           {percentageChange?.toFixed(2)}
          </Text>
        </View>
      </View>
      <View style={styles.quantityContainer}>
        <Text style={styles.title}>{renderHoldings()}</Text>
        <Text style={styles.ticker}>
         {boughtAssetQuantity}
        </Text>
      </View>
    </View>
  );
};

export default PortfolioAssetsItems;
