import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { QuestionType, formattedDate } from "../../utils";
import FlexBetween from "../../components/Flexbetween";
import { Controller, useForm } from "react-hook-form";
import { WarningAmberRounded } from "@mui/icons-material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

function FormPage({
  formObject,
  forms,
  section,
  nextHandler,
  previousHandler,
  submitHandler,
  currentIndex,
  totalLength,
}) {
  let isNonMobile = useMediaQuery("(min-width:1040px)");

  function generateFormHook(questions) {
    let defaultValues = {};
    questions.forEach((question) => {
      if (question.type === QuestionType.CHECKBOX) {
        defaultValues[`${question._id}`] = [];
      } else {
        defaultValues[`${question._id}`] = "";
      }
    });
    return defaultValues;
  }

  const {
    handleSubmit,
    register,
    reset,
    getValues,
    setValue,
    trigger,
    formState: { errors },
    control,
  } = useForm({ defaultValues: formObject });




  useEffect(() => {
    console.log("the forms are ", forms, "the current index is ", currentIndex);
    console.log("the form keys and values", getValues());
  }, [currentIndex]);

  const onSubmit = (data) => {
    console.log(data);
    console.log(
      "the current index ",
      currentIndex,
      "the totallength ",
      totalLength - 1
    );
    if (currentIndex === totalLength - 1) {
      submitHandler(data, reset);
    } else {
      nextHandler(data);
    }
  };

  return (
    <>
      <Box
        sx={{
          marginTop: 3,
          padding: "1.5rem",
          backgroundColor: "white",
          display: "flex",
          alignItems: "center",
          width: isNonMobile ? "40%" : "100%",
          borderTop: 10,
          borderTopColor: "rgb(103, 58, 183)",
          borderTopLeftRadius: 8,
          borderTopRightRadius: 8,
          textAlign: "left",
        }}
      >
        <Box sx={{ width: "100%" }}>
          <Typography
            sx={{ color: "black", fontWeight: "bolder", fontSize: "3em" }}
          >
            {section.title}
          </Typography>
          <Typography sx={{ marginY: 2.5, color: "black", fontSize: "1.5em" }}>
            {section.description}
          </Typography>
        </Box>
      </Box>
      <Box sx={{ width: isNonMobile ? "40%" : "100%" }}>
        <form noValidate onSubmit={handleSubmit(onSubmit)}>
          {section.questions.map((question) => (
            <>
              <Box
                sx={{
                  padding: "1.5rem",
                  backgroundColor: "white",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "start",
                  width: "100%",
                  border: "2px thin grey",
                  borderRadius: 2,
                  textAlign: "left",
                  marginY: 3,
                  boxShadow: !!errors[`${question._id}`]
                    ? "0 0 2px red"
                    : "0 0 2px grey",
                }}
              >
                <Typography sx={{ color: "black", fontSize: "1.5em" }}>
                  {question.text}{" "}
                  {question.isRequired && <span sx={{ color: "red" }}>*</span>}
                </Typography>
                {question.type === QuestionType.DATE && (
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <Controller
                      rules={
                        question.isRequired
                          ? { required: "This is Required Field" }
                          : undefined
                      }
                      name={`${question._id}`}
                      control={control}
                      defaultValue={null}
                      render={({ field }) => (
                        <DatePicker
                          {...field}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              error={!!errors[`${question._id}`]}
                            />
                          )}
                        />
                      )}
                    />
                    {/* <DatePicker
                    {...register("service_date", {
                      required: "Service date is required"
                    })}
                    error={Boolean(errors.service_date)}
                    helperText={errors.service_date?.message}
                    label="Service Date"
                    fullWidth
                    onChange={(event) => {
                      setValue("service_date", formattedDate(event))
                    }}
                  /> */}
                  </LocalizationProvider>
                )}
                {question.isQuestion ? (
                  question.type === QuestionType.SINGLELINE ||
                  question.type === QuestionType.PARAGRAPH ? (
                    <TextField
                      key={`${question._id}`}
                      placeholder="Your Answer"
                      multiline
                      fullWidth
                      error={!!errors[`${question._id}`]}
                      {...register(
                        `${question._id}`,
                        question.isRequired
                          ? { required: "This is Required Field" }
                          : undefined
                      )}
                      sx={{
                        marginY: 2,
                        "& .MuiInput-underline:before": {
                          borderBottomColor: "grey",
                        },
                      }}
                      variant="standard"
                    />
                  ) : (
                    <Box sx={{ marginY: 2, width: "100%" }}>
                      {question.type === QuestionType.RADIO && (
                        <>
                          <FormControl>
                            <Controller
                              defaultValue=""
                              key={`${question._id}`}
                              rules={
                                question.isRequired
                                  ? { required: "This is Required Field" }
                                  : undefined
                              }
                              name={`${question._id}`} // The name of the field in the form data
                              control={control}
                              render={({ field }) => (
                                <RadioGroup
                                  key={`${question._id}`}
                                  defaultValue=""
                                  {...field}
                                >
                                  {question.options.map((option) => (
                                    <FormControlLabel
                                      key={option}
                                      value={option}
                                      control={<Radio />}
                                      label={option}
                                    />
                                  ))}
                                </RadioGroup>
                              )}
                            />
                          </FormControl>
                        </>
                      )}
                      {question.type === QuestionType.DROPDOWN && (
                        <FormControl sx={{ m: 1, width: "40%" }}>
                          <Controller
                            defaultValue=""
                            rules={
                              question.isRequired
                                ? { required: "This is Required Field" }
                                : undefined
                            }
                            render={({ field }) => (
                              <Select key={`${question._id}`} {...field}>
                                {question.options.map((option) => (
                                  <MenuItem key={option} value={option}>
                                    {option}
                                  </MenuItem>
                                ))}
                              </Select>
                            )}
                            control={control}
                            name={`${question._id}`}
                          />
                        </FormControl>
                      )}
                      {question.type === QuestionType.CHECKBOX && (
                        <FormGroup key={`${question._id}`}>
                          {question.options.map((option) => (
                            <FormControlLabel
                              label={option}
                              control={
                                <Controller
                                  control={control}
                                  defaultValue=""
                                  key={`${question._id}`}
                                  rules={
                                    question.isRequired
                                      ? { required: "This is Required Field" }
                                      : undefined
                                  }
                                  name={`${question._id}`} // The name of the field in the form data
                                  render={({ __ }) => (
                                    <Checkbox
                                      checked={getValues(
                                        `${question._id}`
                                      )?.includes(option)}
                                      onChange={() => {
                                        let previousCheckState = getValues(
                                          `${question._id}`
                                        );
                                        console.log(
                                          "the previous state is ",
                                          previousCheckState
                                        );
                                        if (!previousCheckState) {
                                          setValue(`${question._id}`, [option]);
                                        } else if (
                                          previousCheckState?.includes(option)
                                        ) {
                                          let myArray =
                                            previousCheckState?.filter(
                                              (p) => p !== option
                                            );
                                          setValue(`${question._id}`, myArray);
                                        } else {
                                          setValue(`${question._id}`, [
                                            ...previousCheckState,
                                            option,
                                          ]);
                                        }
                                        trigger(`${question._id}`);
                                      }}
                                    />
                                  )}
                                />
                              }
                            />
                          ))}
                        </FormGroup>
                      )}
                    </Box>
                  )
                ) : (
                  question.video?.id ? <span style={{margin:"8px 0px 0px 0px"}}><iframe title={`${question.video.id}`} height="315" src={`https://www.youtube.com/embed/${question.video.id}`} frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></span>  :
                  <Typography sx={{ color: "black", fontSize: "1em" }}>
                    {question.description}
                  </Typography>
                )}
                {question.isQuestion && !!errors[`${question._id}`] && (
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      marginTop: 2,
                      gap: 1,
                    }}
                  >
                    <WarningAmberRounded sx={{ color: "red" }} />
                    <Typography sx={{ color: "red" }}>
                      This is a required question
                    </Typography>
                  </Box>
                )}
              </Box>
            </>
          ))}
          <FlexBetween sx={{ width: "100%", marginBottom: 5 }}>
            <FlexBetween sx={{ gap: 2 }}>
              {totalLength > 1 && currentIndex !== totalLength - 1 && (
                <Button
                  type="submit"
                  sx={{
                    backgroundColor: "white",
                    color: "rgb(103, 58, 183)",
                    fontWeight: "bold",
                  }}
                >
                  Next
                </Button>
              )}
              {currentIndex > 0 && (
                <Button
                  onClick={() => {
                    previousHandler();
                  }}
                  sx={{
                    backgroundColor: "rgb(103, 58, 183)",
                    color: "white",
                    fontWeight: "bold",
                  }}
                >
                  Previous
                </Button>
              )}
              {totalLength - 1 === currentIndex && (
                <Button
                  type={totalLength - 1 === currentIndex ? "submit" : undefined}
                  sx={{
                    backgroundColor: "rgb(103, 58, 183)",
                    color: "white",
                    fontWeight: "bold",
                  }}
                >
                  Submit
                </Button>
              )}
            </FlexBetween>
            <Button
              onClick={() => {
                reset(formObject);
              }}
              sx={{ color: "rgb(103, 58, 183)", fontWeight: "bold" }}
            >
              clear form
            </Button>
          </FlexBetween>
        </form>
      </Box>
    </>
  );
}

export default FormPage;
