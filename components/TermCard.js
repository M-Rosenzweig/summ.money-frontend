import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";

function TermCard({ termKey, value }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [requirement, setRequirement] = useState("");

  // useEffect(() => {
  useEffect(() => {
    if (termKey == "opponent") {
      setDescription("The address you would like to negotiate with.");
      setRequirement("Must be a valid Ethereum address that is not your own.");
      setTitle("Opponent");
    } else if (termKey == "softOfferCap") {
      setDescription("The maximum amount of soft offer rounds.");
      setRequirement("The amount of soft offer rounds cannot exceed 10 or be below 0.");
      setTitle("Soft Offer Cap");
    } else if (termKey == "firmOfferCap") {
      setDescription("The maximum amount of firm offers rounds.");
      setRequirement("The amount of firm offers cannot exceed 10.");
      setTitle("Firm Offer Cap");
    } else if (termKey == "softRange") {
      setDescription("The percentage range difference you can compromise on in soft rounds.");
      setRequirement("Must be greater than 0 and less than 40.");
      setTitle("Soft Range");
    } else if (termKey == "firmRange") {
      setDescription("The percentage range difference you can compromise on in firm rounds.");
      setRequirement("Must be greater than 0 and less than 40.");
      setTitle("Firm Range");
    } else if (termKey == "penaltyPercent") {
      setDescription("The percentage used for penalties in firm round of average number.");
      setRequirement("Must be greater than 0 and less than 20.");
      setTitle("Penalty Percent");
    }
  }, [termKey]);

  if (!value) {
    return null;
  }

  let ternaryValue = termKey == "opponent" ? value.slice(0, 5) + "..." + value.slice(-5) : value;

  return (
    <>
      <div id="parentWrap" className="flex flex-wrap">
        <div id="scale-in" className="m-3 min-w-half max-w-xs max-h-fit">
          <Card className="bg-white p-4">
            <CardContent>
              <Typography className="text-center" variant="h5" component="div">
                {title}
              </Typography>
              <Typography className="text-center" color="text.bold">
                {ternaryValue}
              </Typography>
              <Typography variant="body2">
                {description}
                <br />
                <Typography className="text-red-300 text-xs" variant="body2">
                  {`Requirement: ${requirement}`}
                </Typography>
              </Typography>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}

export default TermCard;
