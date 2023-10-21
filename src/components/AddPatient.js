import React, { useState, useEffect } from "react";
import {
  Box,
  Input,
  FormControl,
  Grid,
  InputLabel,
  Button,
} from "@mui/material";
import { customAlphabet } from "nanoid";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Search from "./Search";
import { useSearchContext } from "../SearchContext";
import dayjs from "dayjs";

const AddPatient = ({ isSearchable, isEditable }) => {
  const generateID = customAlphabet("0123456789", 5);
  const [formData, setFormData] = useState({
    patientId: `PAT-${generateID()}`,
    patientName: "",
    location: "",
    age: "",
    phone: "",
    address: "",
    prescription: "",
    dose: "",
    visitDate: null,
    nextDate: null,
    physicianId: "",
    physicianName: "",
    physicianPhone: "",
    bill: "",
  });
  const { searchValue } = useSearchContext();
  const [data, setData] = useState();
  const [index, setIndex] = useState();
  const handleChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  const getData = async () => {
    try {
      const res = await fetch(
        "https://sheet.best/api/sheets/c15b43af-74da-4f11-a5f1-8d843053e5be"
      );
      const data = await res.json();
      let foundPatient;
      let foundPatientIndex;
      for (let i = 0; i < data.length; i++) {
        if (data[i].patientId === searchValue) {
          foundPatient = data[i];
          foundPatientIndex = i;
          break;
        }
      }

      setData(foundPatient);
      setIndex(foundPatientIndex);
    } catch (error) {}
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let URL = "https://sheet.best/api/sheets/c15b43af-74da-4f11-a5f1-8d843053e5be";
    let requestMethod = "POST";
    let patientData = formData;
    if (isSearchable && isEditable) {
      URL = `${URL}/${index}`;
      requestMethod = "PUT";
      patientData = { ...formData };
      for (const key in patientData) {
        if (!patientData[key] && data && data[key] !== undefined) {
          patientData[key] = data[key];
        }
      }
    }
    try {
      const res = await fetch(URL, {
        method: requestMethod,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(patientData),
      });
      if (res.ok) {
        setFormData({
          patientId: `PAT-${generateID()}`,
          patientName: "",
          location: "",
          age: "",
          phone: "",
          address: "",
          prescription: "",
          dose: "",
          visitDate: null,
          nextDate: null,
          physicianId: "",
          physicianName: "",
          physicianPhone: "",
          bill: "",
        });
        if (isEditable) {
          setData();
        }
      }
    } catch (error) {}
  };

  useEffect(() => {
    getData();
  }, [isSearchable, isEditable, searchValue]);
  return (
    <Box m={2}>
      {isSearchable && <Search />}
      <br />
      <form className="form">
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel htmlFor="patient-id">Patient ID</InputLabel>
                <Input
                  id="patient-id"
                  color="secondary"
                  value={
                    isSearchable && searchValue !== "" && data !== undefined
                      ? data.patientId
                      : formData.patientId
                  }
                  disabled
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel htmlFor="patient-name">
                  Patient Name (First, Last Name)
                </InputLabel>
                <Input
                  id="patient-name"
                  color="secondary"
                  value={
                    isSearchable &&
                    searchValue !== "" &&
                    data !== undefined &&
                    formData.patientName === ""
                      ? data.patientName
                      : formData.patientName
                  }
                  onChange={(e) => handleChange("patientName", e.target.value)}
                  required
                  disabled={isSearchable && !isEditable}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel htmlFor="location">Location</InputLabel>
                <Input
                  id="location"
                  color="secondary"
                  value={
                    isSearchable &&
                    searchValue !== "" &&
                    data !== undefined &&
                    formData.location === ""
                      ? data.location
                      : formData.location
                  }
                  onChange={(e) => handleChange("location", e.target.value)}
                  disabled={isSearchable && !isEditable}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel htmlFor="age">Age</InputLabel>
                <Input
                  id="age"
                  color="secondary"
                  value={
                    isSearchable &&
                    searchValue !== "" &&
                    data !== undefined &&
                    formData.age === ""
                      ? data.age
                      : formData.age
                  }
                  onChange={(e) => handleChange("age", e.target.value)}
                  disabled={isSearchable && !isEditable}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel htmlFor="phone">Phone</InputLabel>
                <Input
                  id="phone"
                  color="secondary"
                  value={
                    isSearchable &&
                    searchValue !== "" &&
                    data !== undefined &&
                    formData.phone === ""
                      ? data.phone
                      : formData.phone
                  }
                  onChange={(e) => handleChange("phone", e.target.value)}
                  disabled={isSearchable && !isEditable}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel htmlFor="address">Address</InputLabel>
                <Input
                  id="address"
                  color="secondary"
                  value={
                    isSearchable &&
                    searchValue !== "" &&
                    data !== undefined &&
                    formData.address === ""
                      ? data.address
                      : formData.address
                  }
                  onChange={(e) => handleChange("address", e.target.value)}
                  disabled={isSearchable && !isEditable}
                />
              </FormControl>
            </Grid>
          </Grid>
          <Box my={3}></Box>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel htmlFor="prescription">Prescription</InputLabel>
                <Input
                  id="prescription"
                  color="secondary"
                  value={
                    isSearchable &&
                    searchValue !== "" &&
                    data !== undefined &&
                    formData.prescription === ""
                      ? data.prescription
                      : formData.prescription
                  }
                  onChange={(e) => handleChange("prescription", e.target.value)}
                  disabled={isSearchable && !isEditable}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel htmlFor="dose">Dose</InputLabel>
                <Input
                  id="dose"
                  color="secondary"
                  value={
                    isSearchable &&
                    searchValue !== "" &&
                    data !== undefined &&
                    formData.dose === ""
                      ? data.dose
                      : formData.dose
                  }
                  onChange={(e) => handleChange("dose", e.target.value)}
                  disabled={isSearchable && !isEditable}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <DatePicker
                  label="Visit Date"
                  value={
                    isSearchable && searchValue !== "" && data !== undefined
                      ? dayjs(new Date(data.visitDate))
                      : formData.visitDate
                  }
                  minDate={!isSearchable ? dayjs(new Date()) : null}
                  onChange={(date) => handleChange("visitDate", date)}
                  disabled={isSearchable && !isEditable}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <DatePicker
                  label="Next Date"
                  value={
                    isSearchable && searchValue !== "" && data !== undefined
                      ? dayjs(new Date(data.nextDate))
                      : formData.nextDate
                  }
                  minDate={formData.visitDate}
                  onChange={(date) => handleChange("nextDate", date)}
                  disabled={isSearchable && !isEditable}
                />
              </FormControl>
            </Grid>
          </Grid>
          <Box my={3}></Box>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel htmlFor="physician-id">Physician ID</InputLabel>
                <Input
                  id="physician-id"
                  color="secondary"
                  value={
                    isSearchable &&
                    searchValue !== "" &&
                    data !== undefined &&
                    formData.physicianId === ""
                      ? data.physicianId
                      : formData.physicianId
                  }
                  onChange={(e) => handleChange("physicianId", e.target.value)}
                  disabled={isSearchable && !isEditable}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel htmlFor="physician-name">
                  Physician Name (First, Last Name)
                </InputLabel>
                <Input
                  id="physician-name"
                  color="secondary"
                  value={
                    isSearchable &&
                    searchValue !== "" &&
                    data !== undefined &&
                    formData.physicianName === ""
                      ? data.physicianName
                      : formData.physicianName
                  }
                  onChange={(e) =>
                    handleChange("physicianName", e.target.value)
                  }
                  disabled={isSearchable && !isEditable}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel htmlFor="physician-phone">Phone</InputLabel>
                <Input
                  id="physician-phone"
                  color="secondary"
                  value={
                    isSearchable &&
                    searchValue !== "" &&
                    data !== undefined &&
                    formData.physicianPhone === ""
                      ? data.physicianPhone
                      : formData.physicianPhone
                  }
                  onChange={(e) =>
                    handleChange("physicianPhone", e.target.value)
                  }
                  disabled={isSearchable && !isEditable}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel htmlFor="bill">Bill</InputLabel>
                <Input
                  id="bill"
                  color="secondary"
                  value={
                    isSearchable &&
                    searchValue !== "" &&
                    data !== undefined &&
                    formData.bill === ""
                      ? data.bill
                      : formData.bill
                  }
                  onChange={(e) => handleChange("bill", e.target.value)}
                  disabled={isSearchable && !isEditable}
                />
              </FormControl>
            </Grid>
          </Grid>
          <Box my={3}></Box>
          {isEditable && (
            <Button variant="contained" color="primary" onClick={handleSubmit}>
              Submit
            </Button>
          )}
        </LocalizationProvider>
      </form>
    </Box>
  );
};

export default AddPatient;
