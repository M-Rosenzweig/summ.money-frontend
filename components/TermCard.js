import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";

function TermCard({ termKey, value, requirementText }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [requirement, setRequirement] = useState("");
  // const [size, setSize] = useState(requirementText ? "smallBox" : "mediumBox");

  // useEffect(() => {
  useEffect(() => {
    if (termKey == "opponent") {
      setDescription("The address of the opponent in this Summ.");
      setRequirement("Must be a valid Ethereum address that is not your own.");
      setTitle("Opponent");
    } else if (termKey == "totalSoftOfferCap") {
      setDescription("The maximum amount of soft offer rounds.");
      setRequirement("The amount of soft offer rounds cannot exceed 10 or be below 0.");
      setTitle("Soft Offer Cap");
    } else if (termKey == "totalFirmOfferCap") {
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
    } else if (termKey == "creator") {
      setDescription("The address of the creator of the negotiation.");
      setTitle("Creator");
    }
  }, [termKey]);

  if (!value) {
    return null;
  }

  let ternaryValue =
    termKey == "opponent" || termKey == "creator"
      ? value.slice(0, 5) + "..." + value.slice(-5)
      : value;
  let ternaryValuePercent =
    termKey == "softRange" || termKey == "firmRange" || termKey == "penaltyPercent"
      ? ternaryValue + "%"
      : ternaryValue;

  return (
    <>
      <div id="parentWrap" className="flex flex-wrap">
        <div id="scale-in" className="m-4 max-w-xs max-h-fit minWidth ">
          <Card className="bg-white p-4">
            <CardContent>
              <Typography className="text-center" variant="h5" component="div">
                {title}
              </Typography>
              <Typography className="text-center font-extrabold" color="text.bold">
                {ternaryValuePercent}
              </Typography>
              <Typography variant="body2">
                {description}
                <br />
                <Typography className="text-red-300 text-xs" variant="body2">
                  {requirementText ? `Requirement: ${requirement}` : null}
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
