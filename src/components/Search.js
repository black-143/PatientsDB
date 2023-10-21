import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Autocomplete from "@mui/material/Autocomplete";
import { useSearchContext } from "../SearchContext";

export default function Search() {
  const [patientDetails, setPatientDetails] = useState();
  const { searchValue, handleSearchInputChange } = useSearchContext();
  const getData = async () => {
    try {
      const res = await fetch(
        "https://sheet.best/api/sheets/c15b43af-74da-4f11-a5f1-8d843053e5be"
      );
      const data = await res.json();
      console.log(data);
      setPatientDetails(Object.keys(data).map((key) => data[key]));
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (value) => {
    handleSearchInputChange(value);
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <Stack spacing={2} sx={{ width: 300 }}>
      {patientDetails && (
        <Autocomplete
          freeSolo
          id="free-solo-2-demo"
          disableClearable
          options={patientDetails.map((option) => option.patientId)}
          value={searchValue}
          onChange={(event, value) => handleChange(value)}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Search input"
              InputProps={{
                ...params.InputProps,
                type: "search",
              }}
            />
          )}
        />
      )}
    </Stack>
  );
}
