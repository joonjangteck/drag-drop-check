import React, { useState } from "react";
import { useQuery, gql } from "@apollo/client";
import { JsonViewer } from "@textea/json-viewer";
import { FileUploader } from "react-drag-drop-files";
import Papa from "papaparse";
import { Paper } from "@mui/material";

//https://www.npmjs.com/package/react-drag-drop-files
//https://github.com/TexteaInc/json-viewer

const GET_LOCATIONS = gql`
  query Query {
    AccessCosmos
  }
`;

interface Query {
  AccessCosmos: string;
}

const fileTypes = ["CSV"];

function DisplayLocations() {
  const { loading, error, data } = useQuery(GET_LOCATIONS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const jsonData = JSON.parse(data.AccessCosmos);

  return (
    <Paper elevation={2} sx={{ height: "400px", overflow: "auto" }}>
      <JsonViewer value={jsonData} defaultInspectDepth={2} />
    </Paper>
  );
}

function Hourly() {
  const [file, setFile] = useState(null);
  const handleChange = (file: any) => {
    setFile(file);

    console.log(file[0]);

    // Passing file data (event.target.files[0]) to parse using Papa.parse
    Papa.parse(file[0], {
      header: true,
      skipEmptyLines: true,
      complete: function (results) {
        console.log(results.data);
      },
    });
  };

  return (
    <div>
      <h2>Hourly Utilization</h2>
      <FileUploader multiple={true} handleChange={handleChange} name="file" types={fileTypes} />
      <br />
      <DisplayLocations />
    </div>
  );
}

export default Hourly;
