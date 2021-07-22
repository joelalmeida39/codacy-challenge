import './App.css';
import { useState } from 'react';
import Header from './components/Header/Header';
import Menu from './components/Menu/Menu';
import Search from './components/Search/Search';
import { CommitListContext } from './Context/CommitListContext';
import Result from './components/Results/Results';

function App() {
  const [data, setData] = useState({
    error: false,
    commitList: []
  });

  return (
    <div className="App">
      <CommitListContext.Provider value={{data, setData}}>
        <Header/>
        <div className="Body">
          <Menu/>
          <Search/>
          <Result/>
        </div>
      </CommitListContext.Provider>
    </div>
  );
}

export default App;
