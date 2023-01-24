export default function Home() {
  return (
    <>
      {/* create a black box in the center of this page with two buttons in it */}
      {/* one button will be "create a summ" and the other will be "join a summ" */}
      <div>
        <div className="flex flex-col items-center justify-center min-h-screen py-2 border-b-2 bg-blue-light">
          <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
            <h1 className="text-6xl font-bold">
              Welcome to{" "}
              <a className="text-blue-400">
                Summ
              </a>
            </h1>
            <div className="flex flex-row">
              <button className="bg-emerald-500 text-white font-bold py-5 px-5 rounded underline m-2">
                Create a Summ
              </button>
              <button className="bg-blue-400 text-white font-bold py-5 px-3 rounded m-2 px-2">
                Join a Summ
              </button>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
