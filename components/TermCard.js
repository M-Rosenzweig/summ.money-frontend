import React, {useState} from 'react'
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";

function TermCard() {
  return (
    <>
          <Card className="m-2">
            <CardContent>
              {/* <Typography color="text.secondary" gutterBottom>
                Word of the Day
              </Typography> */}
              <Typography variant="h4" component="div">
                Opponent
              </Typography>
              <Typography color="text.secondary">adjective</Typography>
              <Typography variant="body2">
                well meaning and kindly.
                <br />
                {'"a benevolent smile"'}
              </Typography>
            </CardContent>
          </Card>
    </>
  )
}

export default TermCard