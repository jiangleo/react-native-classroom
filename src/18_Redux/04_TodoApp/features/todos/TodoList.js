import React from 'react'
import { useSelector } from 'react-redux'
import {View, Text, TextInput} from 'react-native';

import TodoListItem from './TodoListItem'

import { selectFilteredTodoIds } from './todosSlice'

const TodoList = () => {
  const todoIds = useSelector(selectFilteredTodoIds)
  const loadingStatus = useSelector((state) => state.todos.status)

  if (loadingStatus === 'loading') {
    return (
      <Text>加载中...</Text>
    )
  }

  const renderedListItems = todoIds.map((todoId) => {
    return <TodoListItem key={todoId} id={todoId} />
  })

  return <View>{renderedListItems}</View>
}

export default TodoList
