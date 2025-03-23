import React from "react";
import { CircularProgress } from "@mui/material";

export default function Loading({color="#0A0529"}){
    return (
        <CircularProgress 
             size="5rem"
             sx={{color}}
        />
    )
}