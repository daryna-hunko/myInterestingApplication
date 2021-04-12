import React, {useContext} from 'react';
import Context from '../context';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledDiv = styled.div`
  padding: 10px 0 10px 10px;
  border-bottom: 1px solid #ccc;
  &.done {
      text-decoration: line-through;
      div div:first-child {
        color: green;
      }
    
  }
`
const StyledControlContainer = styled.div`
  float: right;
`
const StyledControl = styled.div`
  padding: 0 10px;
  color: red;
  font-weight: 700;
  display: inline-block;
  cursor: pointer;
`
function ToDoItem({todo, completed}) {
    const {toggleItem, removeToDo} = useContext(Context);

    let style;
    completed ? style = "done": style = "";
    return (
        <StyledDiv key={todo.id} className={style}>
            {todo.title}
            <StyledControlContainer>
              <StyledControl onClick={() => toggleItem(todo.id)}>DONE</StyledControl>
              <StyledControl onClick={removeToDo.bind(null, todo.id)}>DELETE</StyledControl>
            </StyledControlContainer>
        </StyledDiv>
    )
}
ToDoItem.propTypes = {
    todo: PropTypes.object.isRequired
}

export default ToDoItem;