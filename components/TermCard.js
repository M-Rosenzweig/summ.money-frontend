import React, { useState } from "react";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";

function TermCard({ key, value }) {
  const [description, setDescription] = useState("");
  const [requirement, setRequirement] = useState("");

  if (!value) {
    return null;
  }

  return (
    <>
      <div id="scale-in" className="m-2">
        <Card className="bg-white p-4">
          <CardContent>
            <Typography variant="h4" component="div">
              {key}
            </Typography>
            <Typography color="text.secondary">{value}</Typography>
            <Typography variant="body2">
              {description}
              <br />
              {requirement}
            </Typography>
          </CardContent>
        </Card>
      </div>
    </>
  );
}

export default TermCard;
