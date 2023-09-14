import { ArrowUturnLeftIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

function StudioNavbar(props: any) {
  return (
    <div className="">
      <div className="flex items-center justify-between p-5">
        <Link href="/" className="text-brandYellow flex items-center">
          <ArrowUturnLeftIcon className="h-6 w-6 text-brandYellow mr-2" />
          Go to Website
        </Link>
        <div className="hidden md:flex p-5 rounded-lg justify-center border-2 border-brandYellow">
          <h1 className="font-bold text-[white]">
            Want more info, check this out
          </h1>
          <Link href="/" className="text-brandYellow font-bold ml-2">
            Yoyo
          </Link>
        </div>
      </div>
      <>{props.renderDefault(props)}</>
    </div>
  );
}

export default StudioNavbar;
