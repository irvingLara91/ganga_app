import React, { useEffect } from "react";
import { LogBox, StyleSheet, StatusBar, View } from "react-native";
import { NativeBaseProvider } from "native-base";
import { Provider } from "react-redux";
import generateStore from "./app/redux/store";
import Layout from "./app/containers/Layout";
import { auth, db } from "./app/dataBase/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, onSnapshot } from "firebase/firestore";

const store = generateStore();

export default function App() {
  useEffect(() => {
    LogBox.ignoreAllLogs();
    try {
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          const userRef = doc(db, "users", user.email);
          onSnapshot(userRef, async (doc) => {
            if (doc.exists()) {
              console.log(doc.data());
              console.log("UserActive");
            }
          });
        } else {
          console.log("User not Active");
        }
      });
    } catch (error) {
      console.log(error);
    }
  }, []);
  return (
    <Provider store={store}>
      <NativeBaseProvider>
        <StatusBar
          animated={true}
          backgroundColor={"#e94d4d"}
          barStyle={"light-content"}
        />
        <View style={{ flex: 1 }}>
          <Layout />
        </View>
      </NativeBaseProvider>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
