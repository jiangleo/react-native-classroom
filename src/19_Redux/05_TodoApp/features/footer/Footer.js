import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {View, Text, TextInput, StyleSheet} from 'react-native';
import Button from '../../component/Button';
import Dot from '../../component/Dot';
import {statusMap} from '../filters/filtersSlice'

import {availableColors, capitalize} from '../filters/colors';
import {
  StatusFilters,
  colorFilterChanged,
  statusFilterChanged,
} from '../filters/filtersSlice';
import {
  completedTodosCleared,
  allTodosCompleted,
  selectTodos,
} from '../todos/todosSlice';


const RemainingTodos = ({count}) => {
  return (
    <View style={styles.box}>
      <Text style={styles.text}>{count} 个待完成事项</Text>
    </View>
  );
};

const StatusFilter = ({value: status, onChange}) => {
  const renderedFilters = Object.keys(StatusFilters).map(key => {
    const value = StatusFilters[key];
    const handleClick = () => onChange(value);

    return <Button key={value} style={{width: 100}} title={statusMap[value]} onPress={handleClick} />;
  });

  return (
    <View style={styles.box}>
      {renderedFilters}
    </View>
  );
};

const ColorFilters = ({value: colors, onChange}) => {
  const renderedColors = availableColors.map(color => {
    const checked = colors.includes(color);
    const handleChange = () => {
      const changeType = checked ? 'removed' : 'added';
      onChange(color, changeType);
    };

    return (
      <Dot
        key={color}
        color={color}
        checked={checked}
        onPress={handleChange}
        title={capitalize(color)}
      />
    );
  });

  return <View style={styles.box}>{renderedColors}</View>;
};

const Footer = () => {
  const dispatch = useDispatch();

  const todosRemaining = useSelector(state => {
    const uncompletedTodos = selectTodos(state).filter(todo => !todo.completed);
    return uncompletedTodos.length;
  });

  const {status, colors} = useSelector(state => state.filters);

  const onMarkCompletedClicked = () => dispatch(allTodosCompleted());
  const onClearCompletedClicked = () => dispatch(completedTodosCleared());

  const onColorChange = (color, changeType) =>
    dispatch(colorFilterChanged(color, changeType));

  const onStatusChange = status => dispatch(statusFilterChanged(status));

  return (
    <View>
      <RemainingTodos count={todosRemaining} />
      <View style={styles.box}>
        <Button
          onPress={onMarkCompletedClicked}
          style={{width: 120}}
          title="全部完成"
        />
        <Button
          onPress={onClearCompletedClicked}
          style={{width: 120}}
          title="删除已完成"
        />
      </View>
      <StatusFilter value={status} onChange={onStatusChange} />
      <ColorFilters value={colors} onChange={onColorChange} />
    </View>
  );
};

const styles = StyleSheet.create({
  box: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#ccc',
    marginTop: 40,
  },
  text: {
    fontSize: 24,
    color: 'rgb(112, 76, 182)',
  },
  button: {
    width: 100,
    marginVertical: 10,
    marginHorizontal: 10,
    borderWidth: 2,
    borderColor: 'rgb(112, 76, 182)',
    paddingHorizontal: 12,
    paddingVertical: 4,
    backgroundColor: 'rgba(112, 76, 182, 0.1)',
    borderRadius: 2,
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 18,
    color: 'rgb(112, 76, 182)',
  },
  textInput: {
    fontSize: 24,
    marginTop: 40,
    marginBottom: 20,
    marginHorizontal: 10,
    paddingVertical: 4,
    borderBottomWidth: 1,
    borderBottomColor: 'rgb(112, 76, 182)',
    width: 100,
    borderRadius: 2,
    textAlign: 'center',
  },
});

export default Footer;
