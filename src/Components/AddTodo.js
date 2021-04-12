import React, {useState} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledForm = styled.form`
  text-align: center;
  margin: 50px auto;
`
const StyledWrapper = styled.div`
  margin: 0 auto;
  border-radius: 15px;
  height: 40px;
  width: 400px;
  border: 1px solid #333;
  display: flex;
  overflow: hidden;
  * {
      border: none;
      &:focus {
      }
  }
  input {
      width: 80%;
  }
`
const StyledButton = styled.button`
  width: 20%;
  cursor: pointer;
`

function AddToDo ({onCreate}) {
  const [value, setValue] = useState('');

  const submitter = (event) => {
    event.preventDefault();

    if(value.trim()) {
        onCreate(value);
        setValue('');
    }
  };

  return (
    <StyledForm onSubmit={submitter}>
        <StyledWrapper>
            <input calue={value} onChange={event => setValue(event.target.value)}/>
            <StyledButton type='submit'>Add todo</StyledButton>
        </StyledWrapper>
    </StyledForm>
  );
};

AddToDo.propTypes = {
    onCreate: PropTypes.func.isRequired
}

export default AddToDo;