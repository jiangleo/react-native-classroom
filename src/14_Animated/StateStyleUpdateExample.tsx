import { View, Button } from 'react-native';
import React, { useState } from 'react';

function StateStyleUpdateExample(): React.ReactElement {
  const [randomWidth, setRandomWidth] = useState(10);

  const style =  {
      width: randomWidth,
    };

  console.log('---- render ----')

  return (
    <View
      style={{
        marginTop: 100,
        flex: 1,
        flexDirection: 'column',
      }}>
      <View
        style={[
          { width: 100, height: 30, backgroundColor: 'cornflowerblue', marginHorizontal: 30, },
          style,
        ]}
      />
      <Button
        title="切换宽度"
        onPress={() => {
          setRandomWidth(Math.random() * 350)
        }}
      />
    </View>
  );
}

export default StateStyleUpdateExample;
