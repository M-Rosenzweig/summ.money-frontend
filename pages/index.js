import Link from "next/link";
import { useEffect } from "react";
import { useMoralis } from "react-moralis";
// useWeb3Contract moralis... to interact with contract.

export default function Home() {
  const { isWeb3Enabled, account } = useMoralis();

  // console.log(account);
  // console.log(isWeb3Enabled ? "Web3 is enabled" : "Web3 is not enabled");

  return (
    <>
      <div>
        <div className="flex flex-col items-center min-h-screen py-2 border-b-2 bg-blue-light">
          <main className="flex flex-col items-center w-full flex-1 px-20 text-center mb-12 h-10">
            <h1  className="mt-16 text-6xl font-bold">
              Welcome to <span className="text-blue-400 ">Summ</span>
            </h1>

            {/* <h1 id="Jerry" className=" mt-16 text-6xl font-bold">
              Welcome to{" "}
              <p className="text-blue-400">
                Summ
              </p>
            </h1> */}
            <div className="flex flex-row">
              <Link
                href={{
                  pathname: `/create-Summ-terms/${account}`,
                }}
              >
                <button id="scale-in" className="bg-emerald-500 text-white font-bold py-5 px-5 rounded mt-8 mr-3 ">
                  Create a Summ
                </button>
              </Link>

              <button id="scale-in" className="bg-blue-400 text-white font-bold py-5 px-5 rounded mt-8 ml-3">
                Join a Summ
              </button>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
