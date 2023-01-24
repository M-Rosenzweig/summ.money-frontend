import { ConnectButton } from "web3uikit";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav id="globalVibes" className="p-5 border-b-2 flex flex-row justify-between items-center">
      <h1 className="py-4 px-4 font-bold text-3xl text-blue-light">Summ</h1>
      <div className="flex flex-row items-center">
        <Link href="/">
          <a className="mr-4 p-6">My Summs</a>
        </Link>
        <Link href="/sell-nft">
          <a className="mr-4 p-6">Account</a>
        </Link>
        <ConnectButton moralisAuth={false} />
      </div>
    </nav>
  );
}
