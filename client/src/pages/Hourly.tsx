import React, { useState } from "react";
import { useQuery, gql } from "@apollo/client";
import { JsonViewer } from "@textea/json-viewer";
import { FileUploader } from "react-drag-drop-files";
import Papa from "papaparse";
import { Grid, Paper } from "@mui/material";

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

function DisplayCosmos() {
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

interface CsvProps {
  csvData: string | null;
}

function DisplayCsv({ csvData }: CsvProps) {
  return (
    <Paper elevation={2} sx={{ height: "400px", overflow: "auto" }}>
      <JsonViewer value={csvData} defaultInspectDepth={2} />
    </Paper>
  );
}

function Hourly() {
  const [file, setFile] = useState(null);
  const handleChange = (file: any) => {
    // Passing file data (event.target.files[0]) to parse using Papa.parse
    Papa.parse(file[0], {
      header: true,
      skipEmptyLines: true,
      complete: function (results: any) {
        console.log(results.data);
        setFile(results.data);
      },
    });
  };

  return (
    <div>
      <Grid container direction="row" spacing={2}>
        <Grid item xs={12}>
          <Grid container justifyContent="center">
            <h2>Hourly Utilization</h2>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid container justifyContent="center">
            <FileUploader multiple={true} handleChange={handleChange} name="file" types={fileTypes} />
          </Grid>
        </Grid>
        <Grid item xs={6}>
          <h2>CosmosDB</h2>
          <DisplayCosmos />
        </Grid>
        <Grid item xs={6}>
          <h2>CSV</h2>
          <DisplayCsv csvData={file} />
        </Grid>
      </Grid>
    </div>
  );
}

export default Hourly;
