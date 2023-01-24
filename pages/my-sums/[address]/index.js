import React from "react";

function summs({ address }) {
  const shortenedAddress = address.slice(0, 6) + "..." + address.slice(-6);

  return <div>Summs for {shortenedAddress}</div>;
}

export async function getServerSideProps({ params }) {
  const address = params.address;
  return { props: { address } };
}

export default summs;
