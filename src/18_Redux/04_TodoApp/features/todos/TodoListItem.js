import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {View, Text, Switch, TextInput, StyleSheet} from 'react-native';
import {Select, Checkbox, CloseIcon} from 'native-base';
import Dot from '../../component/Dot';
// import { ReactComponent as TimesSolid } from './times-solid.svg'

import {availableColors, capitalize} from '../filters/colors';
import {
  todoColorSelected,
  todoDeleted,
  todoToggled,
  selectTodoById,
} from './todosSlice';

// Destructure `props.id`, since we just need the ID value
const TodoListItem = ({id}) => {
  // Call our `selectTodoById` with the state _and_ the ID value
  const todo = useSelector(state => selectTodoById(state, id));
  const {text, completed, color} = todo;

  const dispatch = useDispatch();

  const handleCompletedChanged = () => {
    dispatch(todoToggled(todo.id));
  };

  const handleColorChanged = color => {
    console.log('handleColorChanged', color);
    dispatch(todoColorSelected(todo.id, color));
  };

  const onDelete = () => {
    dispatch(todoDeleted(todo.id));
  };

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        height: 50,
        borderBottomColor: '#ccc',
        borderBottomWidth: StyleSheet.hairlineWidth,
      }}>
      <Switch value={completed} onValueChange={handleCompletedChanged} />
      <Text style={{flex: 1, marginLeft: 10, fontSize: 20}}>{text}</Text>
      <Dot key={id} color={color} checked={true} onPress={handleColorChanged} />
      <Text onPress={onDelete} style={{fontSize: 20}}>
        ❌
      </Text>
    </View>
  );
};

export default TodoListItem;
