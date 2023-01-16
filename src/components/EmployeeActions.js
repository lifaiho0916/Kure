import * as React from 'react';
import Fab from '@mui/material/Fab';
import { Stack } from "@mui/material";
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';
import SwitchAccountIcon from '@mui/icons-material/SwitchAccount';
import QrDialog from './QrScannerDialog'
import {useState} from "react";

export default function EmployeeActions() {
  const [openPopup, setOpenPopup] = useState(false)

  return (
    <Stack sx={{ '& > :not(style)': { m: 1 } }} style={{ position: "fixed", top:"225px" }}>
      <Fab aria-label="add">
        <QrCodeScannerIcon  onClick={() => setOpenPopup(true)}/>
      </Fab>
      <Fab aria-label="switch">
        <SwitchAccountIcon/>
      </Fab>

      <QrDialog
        openPopup = {openPopup}
        setOpenPopup = {setOpenPopup}
        />

    </Stack>
  );
}