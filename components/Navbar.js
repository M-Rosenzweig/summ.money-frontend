import { ConnectButton } from "web3uikit";
import { useState } from "react";
import Link from "next/link";
import { useMoralis } from "react-moralis";

export default function Navbar() {
  const { isWeb3Enabled, account } = useMoralis();

  const [open, setOpen] = useState(false);

  return (
    <nav id="globalVibes" class="p-5 border-b-2 flex flex-row justify-between items-center">
      <Link href={"/"}>
        <h1 class="py-4 px-4 font-bold text-3xl text-blue-400 cursor-pointer">Summ</h1>
      </Link>
      <div class="hidden md:flex flex-row items-center">
        <Link
          href={{
            pathname: `/my-sums/${account}/`,
          }}
        >
          <a className="mr-4 p-6">My Summs</a>
        </Link>
        <Link
          href={{
            pathname: `/account/${account}/`,
          }}
        >
          <a class="mr-4 p-6">Account</a>
        </Link>
        <ConnectButton moralisAuth={false} />
      </div>
      <div class="md:hidden">
        <button class="p-5" onClick={() => setOpen(!open)}>
          <svg class="fill-current h-6 w-6" viewBox="0 0 24 24">
            <path d="M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z" />
          </svg>
        </button>
      </div>
      {open && (
        <div class="bg-white p-5 absolute right-0 top-20 mt-16">
          <Link
            href={{
              pathname: `/my-sums/${account}/`,
            }}
          >
            <a class="block p-2">My Summs</a>
          </Link>
          <Link
            href={{
              pathname: `/account/${account}/`,
            }}
          >
            <a class="block p-2">Account</a>
          </Link>
          <ConnectButton moralisAuth={false} />
        </div>
      )}
    </nav>
  );
}
