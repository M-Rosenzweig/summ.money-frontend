import React from "react";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import Link from "next/link";


function SummCard({shortenedAddress, address}) {

  function handleClick() {
    console.log("hey lets go to the negotiation page (even though a seperate details page would be good.. MVP!!"); 
  }
   
  return (
    <>
      <div id="parentWrap" className="flex flex-wrap">
        <Link href={`/summ-offers/${address}`}>
        <div id="scale-in" className="m-6 min-w-half max-w-xs max-h-fit" onClick={handleClick}>
          <Card className="bg-white p-10">
            <CardContent>
              <Typography className="text-center" variant="h5" component="div">
                {shortenedAddress}
              </Typography>
              <Typography className="text-center" color="text.bold">
                 Opponent
              </Typography>
              <Typography variant="body2">
                {shortenedAddress}
                <br />
              </Typography>
            </CardContent>
          </Card>
        </div>
      </Link>
      </div>
    </>
  );
}

export async function getServerSideProps({ params }) {
  const address = params.address;
  return { props: { address } };
}

export default SummCard;
