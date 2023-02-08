import React, {useState, useEffect} from 'react'; 
import initializeAndExportSummTermsInstance from "../../../constants/specificSummTerms.js";

function summOffers({address}) {

  let summTermsInstance; 
  const [status, setStatus] = useState("");
  const [summary, setSummary] = useState({
    creator: "",
    opponent: "",
    totalSoftOfferCap: "",
    totalFirmOfferCap: "",
    softRange: "",
    firmRange: "",
    penaltyPercent: "",
    termsStatus: "",
  });

  useEffect(() => {
    getSummTermsInstance(address); 
  },[status])

  async function getSummTermsInstance(address) {
    summTermsInstance = await initializeAndExportSummTermsInstance(address); 
    // console.log("summTermsInstance", summTermsInstance);
    findOutStatusAndGetSummary(summTermsInstance);
  }

  async function findOutStatusAndGetSummary(summTermsInstance) {
    const contractStatus = await summTermsInstance.termsStatus();
    setStatus(contractStatus); 

    const summaryData = await summTermsInstance.getSummary();
    console.log("summaryData", summaryData);
    console.log("summary1", summaryData[0]);
    console.log("summary2", summaryData[1]);
    console.log("summary3", summaryData[2]);
    console.log("summary4", summaryData[3]);
    console.log("summary5", summaryData[4]);
   setSummary({
      creator: summaryData[0],
      opponent: summaryData[1],
      totalSoftOfferCap: summaryData[2],
      totalFirmOfferCap: summaryData[3],
      softRange: summaryData[4],
      firmRange: summaryData[5],
      penaltyPercent: summaryData[6],
      termsStatus: summaryData[7],
    });
    getInfo(); 
  }

  function getInfo() {
    // console.log("status", status);
    console.log("summary", summary);
  }

  return (
    <>
        <div>
            <h1>Summ Offers page. where the negotiation happens</h1>
        </div>

    </>
  )
}

export async function getServerSideProps({ params }) {
  const address = params.address;
  return { props: { address } };
}

export default summOffers