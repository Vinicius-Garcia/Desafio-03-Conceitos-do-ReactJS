import React, {useState,useEffect} from "react";
import api from "../src/services/api";
import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([])
  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data);
    })
  },[])

  async function handleAddRepository() {
    const response = await api.post('repositories',{
      title: `Novo projeto ${Date.now()}`,
      url: "github.com/Vinicius-Garcia",
      techs: ["React, React Native"]
    })
    const repostiorie = response.data;

    setRepositories([...repositories, repostiorie]);
  }

  async function handleRemoveRepository(id) {
    await api.delete (`repositories/${id}`)

    setRepositories(repositories.filter(repositorie => repositorie.id !== id))
    }

  return (
    <div>
      <ul data-testid="repository-list">
        
          {repositories.map(repositorie =><li key={repositorie.id}>{repositorie.title} 
        <button onClick={() => handleRemoveRepository(repositorie.id)}>
            Remover
          </button></li>)}

          
       
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
