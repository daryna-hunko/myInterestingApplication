import Context from './context';
import Header from './Components/Header';
import ToDos from './Components/ToDos';
import AddToDo from './Components/AddTodo';
import DatePicker from './Components/DatePicker';
import { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import styled from 'styled-components';

const StyledH1 = styled.div`
  border-bottom: 1px solid #ccc;
  padding: 30px 10px;
  font-size: 1.5rem;
  text-align: center;
  width: 70%;
  margin: 0 auto;
`
const OutputDiv = styled.div`
  height: 25px;
  text-align: center;
  padding: 25px 0;
  border-bottom: 1px solid #000;
`; 

function App() {
  const [toDoState, setToDoState] = useState([]);
  const [tabState, setTabState] = useState('Home');
  const [birthday, setBirthday] = useState(new Date().toISOString().split('T')[0]); // текущая дата как начальное значение
  
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/todos?_limit=15')
      .then(response => response.json())
      .then(todos => {
        setToDoState(todos);
          //setLoading(false)
      })
  }, [])

  const toggleItem = (id) => {
    setToDoState(
      toDoState.map(todo => {
        if (todo.id === id) {
          todo.completed = !todo.completed;
        }
        return todo;
      }
    ));
  }

  const removeToDo = (id) => {
    setToDoState(toDoState.filter(todo => todo.id !== id))
  }

  const addToDo = (title) => {
    setToDoState(
      toDoState.concat([
        {
          title,
          id: Date.now(),
          completed: false
        }
      ])
    )
  }

  const functionsObj = {
    toggleItem: toggleItem,
    removeToDo: removeToDo
  }

  return (
    <Context.Provider value={functionsObj}>
      <div className="App">
        <Router>
          <Header />
            
          {/* A <Switch> looks through its children <Route>s and
              renders the first one that matches the current URL. */}
          <Switch>
            <Route path="/home">
              <StyledH1>Go Out</StyledH1>
            </Route>
            <Route path="/todo">
              <StyledH1>To Do list</StyledH1>
              {toDoState.length ? (
                  <ToDos toDoData={toDoState}  toggleItem={toggleItem}/>
                ) : 
                <p>No todos!</p>
              }
            </Route>
            <Route path="/addtodo">
              <StyledH1>Add To Do</StyledH1>
              <AddToDo onCreate={addToDo}/>
            </Route>
            <Route path="/tcan">
              <StyledH1>Strange dropdown</StyledH1>
              <DatePicker date={birthday} onChange={(data) => setBirthday(data)}/>
              <OutputDiv className="date-picker-output">{birthday}</OutputDiv>
            </Route>
          </Switch>
        </Router>
      </div>
    </Context.Provider>
  );
}

export default App;
