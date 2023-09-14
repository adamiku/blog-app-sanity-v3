import Image from "next/image";
import Link from "next/link";

function Header() {
  return (
    <header className="flex items-center justify-between space-x-2 font-bold px-10 py-5">
      <div className="flex items-center space-x-2">
        <Link href="/">
          <Image
            className="rounded-full"
            src="https://cdn.iconscout.com/icon/free/png-256/free-avatar-371-456323.png"
            width={50}
            height={50}
            alt="Logo"
          />
        </Link>
        <h1>New brand</h1>
      </div>
      <div className="">
        <Link
          href="/"
          className="px-5 py-3 text-sm md:text-base bg-gray-900 text-brandYellow flex items-center rounded-full text-center"
        >
          Sign up to the uni of code
        </Link>
      </div>
    </header>
  );
}

export default Header;
