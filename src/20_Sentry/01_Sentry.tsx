import * as Sentry from "@sentry/react-native";
import React from "react";
import { Text, View } from "react-native";

Sentry.init({
  dsn: "https://c60f6326d2de4ea1a2c8cbf91303974e@o1202313.ingest.sentry.io/6327386",
  // Set tracesSampleRate to 1.0 to capture 100% of transactions for performance monitoring.
  // We recommend adjusting this value in production.
  tracesSampleRate: 1.0,
});


function App (){
    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <Text onPress={()=>{
                throw new Error("My first Sentry error!2222");
            }}>throw js error</Text>
            <Text onPress={()=>{
                Sentry.nativeCrash();
            }}>throw native error</Text>
        </View>
    );
}



export default Sentry.wrap(App);
