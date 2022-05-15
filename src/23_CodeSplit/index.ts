import App from './views/Main'


function App() {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Discover">
          <Stack.Screen name="Discover"  component={Discover} />
          <Stack.Screen name="Detail" component={Detail} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
  
export default App
