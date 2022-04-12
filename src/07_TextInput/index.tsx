import React, {useRef, useEffect, useState, Component} from 'react';
import {SafeAreaView, View, Text, TextInput, Alert} from 'react-native';
import type {TextInput as TextInputType} from 'react-native';

export default function App() {
  const ref1 = useRef(null);
  const ref2 = useRef(null);

  useEffect(() => {
    console.log('ref1.current', ref1.current);
    console.log('ref2.current', ref2.current);
  }, []);

  return (
    <SafeAreaView style={{marginHorizontal: 30}}>
      <UncontrolledTextInput1 />
      <UncontrolledTextInput2 />
      <ControlledTextInput />
      <ControlledTextInput2 />
      <ControlledTextInput3 />
      <CompositeComponentMethod ref={ref1} />
      <CompositeComponentMethod2 ref={ref2} />
      <AutoFocusTextInput />
      <AutoNextFocusTextInputs />
    </SafeAreaView>
  );
}

function UncontrolledTextInput1() {
  return (
    <View style={{flexDirection: 'row'}}>
      <Text>非受控1: </Text>
      <TextInput style={{flex: 1, borderBottomWidth: 1}} />
    </View>
  );
}
function UncontrolledTextInput2() {
  const textRef = useRef<string>('');

  return (
    <View style={{flexDirection: 'row'}}>
      <Text>非受控2: </Text>
      <TextInput
        style={{flex: 1, borderBottomWidth: 1}}
        onChangeText={text => {
          textRef.current = text;
        }}
      />
      <Text
        onPress={() => {
          Alert.alert(textRef.current);
        }}>
        可获取文字
      </Text>
    </View>
  );
}

function ControlledTextInput() {
  const [text, setText] = useState<string>('');

  return (
    <View style={{flexDirection: 'row'}}>
      <Text>受控1: </Text>
      <TextInput
        value={text}
        style={{flex: 1, borderBottomWidth: 1}}
        onChangeText={text => {
          setText(text);
        }}
      />
      <Text
        onPress={() => {
          Alert.alert(text);
        }}>
        可获取文字
      </Text>
    </View>
  );
}

function ControlledTextInput2() {
  const [text, setText] = useState<string>('');

  return (
    <View style={{flexDirection: 'row'}}>
      <Text>异步延迟: </Text>
      <TextInput
        value={text}
        style={{flex: 1, borderBottomWidth: 1}}
        onChangeText={text => {
          const time = Date.now();
          // 复杂逻辑，输入文字不卡
          while (Date.now() - time <= 1000) {}
          setText(text);
        }}
      />
      <Text
        onPress={() => {
          Alert.alert(text);
        }}>
        可获取文字
      </Text>
    </View>
  );
}
function ControlledTextInput3() {
  const [text, setText] = useState<string>('');

  return (
    <View style={{flexDirection: 'row'}}>
      <Text>同步延迟: </Text>
      <TextInput
        value={text}
        style={{flex: 1, borderBottomWidth: 1}}
        unstable_onChangeSync={event => {
          const text = event.nativeEvent.text;
          const time = Date.now();
          // 复杂逻辑，输入文字卡
          while (Date.now() - time <= 1000) {}
          setText(text);
        }}
      />
      <Text
        onPress={() => {
          Alert.alert(text);
        }}>
        可获取文字
      </Text>
    </View>
  );
}

class CompositeComponentMethod2 extends Component {
  method() {}

  render() {
    return <Text>CompositeComponentMethod2</Text>;
  }
}

function CompositeComponentMethod() {
  const [text, setText] = useState<string>('');

  return (
    <View style={{flexDirection: 'row'}}>
      <Text>1s延迟: </Text>
      <TextInput
        value={text}
        style={{flex: 1, borderBottomWidth: 1}}
        onChangeText={text => {
          const time = Date.now();
          // 复杂逻辑
          while (Date.now() - time <= 1000) {}
          setText(text);
        }}
      />
      <Text
        onPress={() => {
          Alert.alert(text);
        }}>
        可获取文字
      </Text>
    </View>
  );
}

function AutoFocusTextInput() {
  return (
    <View style={{flexDirection: 'row'}}>
      <Text>自动对焦： </Text>
      <TextInput style={{flex: 1, borderBottomWidth: 1}} autoFocus />
    </View>
  );
}

function AutoNextFocusTextInputs() {
  const ref1 = React.useRef<TextInput>(null);
  const ref2 = React.useRef<TextInput>(null);
  const ref3 = React.useRef<TextInput>(null);

  return (
    <View style={{flexDirection: 'column'}}>
      <TextInput
        ref={ref1}
        style={{borderBottomWidth: 1, height: 30}}
        placeholder="姓名"
        textContentType="name"
        returnKeyType="next"
        onSubmitEditing={() => ref2.current?.focus()}
      />
      <TextInput
        ref={ref2}
        style={{borderBottomWidth: 1, height: 30}}
        placeholder="电话"
        keyboardType="phone-pad"
        returnKeyType="done"
        onSubmitEditing={() => ref3.current?.focus()}
      />
      <TextInput
        ref={ref3}
        style={{borderBottomWidth: 1, height: 30}}
        placeholder="地址"
        returnKeyType="done"
      />
    </View>
  );
}
