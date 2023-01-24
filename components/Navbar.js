import { ConnectButton } from "web3uikit";
import Link from "next/link";

export default function Navbar() {
  let address = "0x96c5887bcdca480721a38a27386772ee3e9a7401";

  return (
    <nav id="globalVibes" className="p-5 border-b-2 flex flex-row justify-between items-center">
      <Link href={"/"}>
        <h1 className="py-4 px-4 font-bold text-3xl text-blue-light">Summ</h1>
      </Link>
      <div className="flex flex-row items-center">
        <Link
          href={{
            pathname: `/my-sums/${address}/`,
          }}
        >
          <a className="mr-4 p-6">My Summs</a>
        </Link>
        <Link
          href={{
            pathname: `/account/${address}/`,
          }}
        >
          <a className="mr-4 p-6">Account</a>
        </Link>
        <ConnectButton moralisAuth={false} />
      </div>
    </nav>
  );
}
