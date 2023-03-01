import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { useQuery, gql } from '@apollo/client';
import { JsonViewer } from '@textea/json-viewer';
import { FileUploader } from "react-drag-drop-files";


//https://www.npmjs.com/package/react-drag-drop-files
//https://github.com/TexteaInc/json-viewer

const GET_LOCATIONS = gql`
  query Query {
    AccessCosmos
  }
`;

interface Query {
  AccessCosmos: string
}

const fileTypes = ["CSV"];

function DisplayLocations() {
  const { loading, error, data } = useQuery(GET_LOCATIONS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const jsonData = JSON.parse(data.AccessCosmos);

  console.log(jsonData)

  return (
    <div>
      <JsonViewer value={jsonData} />
    </div>
  );
}


function App() {

  const [file, setFile] = useState(null);
  const handleChange = (file: any) => {
    setFile(file);
  };

  return (
    <div>
      <h2>
        Hello WORLD
      </h2>
      <FileUploader
        multiple={true}
        handleChange={handleChange}
        name="file"
        types={fileTypes}
      />
      <br />
      <DisplayLocations />
    </div>
  );
}

export default App;
