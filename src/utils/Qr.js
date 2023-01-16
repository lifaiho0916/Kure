import QrScanner from 'qr-scanner';
import { useEffect, useRef, useState } from "react";
import { Box, Stack, Typography } from "@mui/material";

export default function Qr({ open }) {
  const qr_scanner = useRef(null);
  const qr_scanner_result = useRef(null);
  const [scanner, setScanner] = useState(null)

  function setResult(label, result) {
    console.log(result.data);
    label.textContent = result.data;
  }

  /**
   * After page load, initialize the QR scanner. I had to add it to a useState hook or else the object did not persist.
   * Now, the scanner starts and pauses like it should.
   */
  useEffect(() => {
    if (scanner === null) {
      setScanner(new QrScanner(qr_scanner.current, result => setResult(qr_scanner_result.current, result), {
        // onDecodeError: error => {
        //   camQrResult.textContent = error;
        //   camQrResult.style.color = 'inherit';
        // },
        // calculateScanRegion: video => {
        //   const height = video.videoHeight;
        //   const width = video.videoWidth;
        //   const box_size = height / 2;
        //   return {
        //     x: (width / 2) - (box_size / 2),
        //     y: (height / 2) - (box_size / 2),
        //     width: box_size,
        //     height: box_size
        //   };
        // },
        //maxScansPerSecond: 10,
        highlightScanRegion: true,
        highlightCodeOutline: true,
      }));
    }

    if (scanner) {
      if (open) {
        scanner.start();
      } else {
        scanner.pause();
      }
    }
  }, [open])

  return (
    <Stack direction="column" style={{
      width: "100%",
      marginTop: "20px",
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <video ref={qr_scanner} style={{
        minWidth: "150px",
        maxHeight: "150px",
        objectFit: "cover",
      }}>
        {/*Chrome/ReactJS complain that we need a track element.*/}
        <track src="#" kind="captions" srcLang="en" label="english_captions"/>
      </video>
      <Box>
        <Typography ref={qr_scanner_result} variant={'h6'}
                    sx={{ textDecoration: 'none', width: '100%', padding: '0.2em 1em', color: '#000' }}>
          Waiting for a QR code...
        </Typography>
      </Box>
    </Stack>
  );
}