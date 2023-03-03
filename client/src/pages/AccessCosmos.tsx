import { useState } from "react";
import { useLazyQuery, gql } from "@apollo/client";
import { JsonViewer } from "@textea/json-viewer";
import { FileUploader } from "react-drag-drop-files";
import Papa from "papaparse";
import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import { DateTime } from "luxon";

//https://www.npmjs.com/package/react-drag-drop-files
//https://github.com/TexteaInc/json-viewer

const GET_COSMOS = gql`
  query Query($cosmosContainer: String, $queryCommand: String) {
    AccessCosmos(cosmosContainer: $cosmosContainer, queryCommand: $queryCommand)
  }
`;


const fileTypes = ["CSV"];
interface dataProps {
  inJsonData: string | null;
  loading? : boolean;
}


function DisplayCosmos({inJsonData, loading}: dataProps) {

  const jsonData = inJsonData ? JSON.parse(inJsonData) : null;

  return (
    <Paper elevation={2} sx={{ height: "400px", overflow: "auto" }}>
       {loading ? "Loading..." : <JsonViewer value={jsonData} defaultInspectDepth={2} />}
    </Paper>
  );
}

function DisplayCsv({ inJsonData }: dataProps) {
  return (
    <Paper elevation={2} sx={{ height: "400px", overflow: "auto" }}>
      <JsonViewer value={inJsonData} defaultInspectDepth={2} />
    </Paper>
  );
}

function AccessCosmos() {
  const [file, setFile] = useState(null);
  const [unixTime, setUnixTime] = useState("");
  const [cosmosContainer, setCosmosContainer] = useState("");
  const [queryCommand, setQueryCommand] = useState("SELECT * FROM c ORDER BY c._ts DESC OFFSET 0 LIMIT 24")
  const [getCosmos, { loading }] = useLazyQuery(GET_COSMOS);
  const [cosmosData, setCosmosData] = useState("");


  const handleCosmosChange = (event: SelectChangeEvent) => {
    setCosmosContainer(event.target.value);
  };

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

  async function handlePost() {
    const { data } = await getCosmos({
      variables: {
        cosmosContainer: cosmosContainer,
        queryCommand: queryCommand
      }
    })
    setCosmosData(data?.AccessCosmos);
    console.log(data);
  } 

  let local = "";
  let utc = "";
  if (unixTime) {
    const unixDateTime = DateTime.fromSeconds(Number(unixTime));
    local = unixDateTime.toLocaleString(DateTime.DATETIME_SHORT_WITH_SECONDS);
    utc = unixDateTime.toUTC().toLocaleString(DateTime.DATETIME_SHORT_WITH_SECONDS);
  }

  return (
    <div>
      <Grid container direction="row" spacing={2}>
        <Grid item xs={4}>
          <FormControl fullWidth>
            <InputLabel>Choose CosmosDB Container</InputLabel>
            <Select label="Choose CosmosDB Container" onChange={handleCosmosChange} value={cosmosContainer}>
              <MenuItem value={"cdc2eh_leases"}>cdc2eh_leases</MenuItem>
              <MenuItem value={"container-pro-hvc-bo-dashboard"}>container-pro-hvc-bo-dashboard</MenuItem>
              <MenuItem value={"container-pro-hvc-bo-hour-utilization"}>container-pro-hvc-bo-hour-utilization</MenuItem>
              <MenuItem value={"container-pro-hvc-bo-minute-utilization"}>
                container-pro-hvc-bo-minute-utilization
              </MenuItem>
              <MenuItem value={"container-pro-hvc-bo-recommendation"}>container-pro-hvc-bo-recommendation</MenuItem>
              <MenuItem value={"container-pro-hvc-bo-report-blend"}>container-pro-hvc-bo-report-blend</MenuItem>
              <MenuItem value={"container-pro-hvc-bo-report-height"}>container-pro-hvc-bo-report-height</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={6}>
          <TextField
            label={"Query Command"}
            value={queryCommand}
            onChange={
              (val) => {
                setQueryCommand(val.target.value)
              }
            }
            fullWidth
          />
        </Grid>
        <Grid item xs={2}>
          <Button variant="contained" sx={{ height: 1 }} onClick={handlePost} disabled={queryCommand == "" || cosmosContainer == ""}>
            Get Data
          </Button>
        </Grid>

        <Grid item xs={5}>
          <Grid container direction="row">
            <Grid item>
              <TextField
                label={"Unix To Timestamp"}
                onChange={(val) => {
                  setUnixTime(val.target.value);
                  console.log(unixTime);
                }}
              />
            </Grid>
            <Grid sx={{ml:1,}}>
              <Paper sx={{p: 1, background: 'lightgrey', width: "240px"}}>
              <Grid item>Local: {local}</Grid>
              <Grid item sx={{ ml: 0.8 }}>
                UTC: {utc}
              </Grid>
              </Paper>
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={4}>
          <Grid container justifyContent="center" direction="column">
            <Grid item>
              <FileUploader multiple={true} handleChange={handleChange} name="file" types={fileTypes} />
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={6}>
          <h2>CSV</h2>
          <DisplayCsv inJsonData={file} />
        </Grid>
        <Grid item xs={6}>
          <h2>CosmosDB</h2>
           <DisplayCosmos inJsonData={cosmosData} loading={loading}/>
        </Grid>
        {/* <Grid item xs={12}>
          <h2>Test Results</h2>
          <Paper sx={{ height: 500 }} elevation={2}>
            <Grid container padding={3}>
              INSERT TEST RESULT HERE
            </Grid>
          </Paper>
        </Grid> */}
      </Grid>
    </div>
  );
}

export default AccessCosmos;
