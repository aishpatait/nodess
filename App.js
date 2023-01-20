import './App.css';
import axios from 'axios';

function App() {
  const GetStudent=()=>{
    axios.get("http://localhost:4000/getStudents").then(res=>{
      console.log(res)
    })
  }


  return (
    <div>
          <h1>Welcome </h1>
           
            <button onClick={GetStudent}>Get Student</button>
          
    </div>
  );
}

export default App;
