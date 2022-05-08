import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import {View, TextInput, Text} from 'react-native';
import Button  from "../../component/Button";

import { saveNewTodo } from '../todos/todosSlice'

const Header = () => {
  const [text, setText] = useState('')
  const [status, setStatus] = useState('idle')
  const dispatch = useDispatch()

  const handleChange = (text) => setText(text)

  const handleKeyDown = async () => {
    // If the user pressed the Enter key:
    const trimmedText = text.trim()
    if (trimmedText) {
      // Create and dispatch the thunk function itself
      setStatus('loading')
      await dispatch(saveNewTodo(trimmedText))
      // And clear out the text input
      setText('')
      setStatus('idle')
    }
  }

  let isLoading = status === 'loading'
  let placeholder = isLoading ? '' : '你有什么待完成事情呢?'
  let loader = isLoading ? <Text>加载中...</Text> : null

  return (
    <View style={{flexDirection: 'row', alignItems: 'center', marginVertical:20}}>
      <TextInput
        style={{
          flex:1,
          padding: 16,
          fontSize: 18,
          borderBottomColor: 'rgb(112, 76, 182)',
          borderBottomWidth: 1,
          marginRight:20
        }}
        placeholder={placeholder}
        value={text}
        onChangeText={handleChange}
        disabled={isLoading}
      />
      <Button onPress={handleKeyDown} title={isLoading?"加载中...":"添加"}></Button>
    </View>
  )
}

export default Header
