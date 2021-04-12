import React from 'react';
import PropTypes from 'prop-types';
import ToDoItem from './ToDoItem'
import styled from 'styled-components';

const StyledToDos = styled.div`
  width: 70%;
  margin: 0 auto 50px;
`

function ToDos(props) {
  return (
    <StyledToDos>
      { 
        props.toDoData.map(el => 
          <ToDoItem todo={el} completed={el.completed}/>
        )
      }
    </StyledToDos>
  );
};

ToDos.propTypes = {
  toDoData: PropTypes.arrayOf(PropTypes.object).isRequired
}

export default ToDos;