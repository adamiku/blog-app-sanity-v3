import Image from "next/image";

function Logo(props: any) {
  const { renderDefault, title } = props;
  return (
    <div>
      <Image
        className="rounded-full object-cover"
        height={50}
        width={50}
        src="https://png.pngtree.com/png-vector/20220709/ourmid/pngtree-businessman-user-avatar-wearing-suit-with-red-tie-png-image_5809521.png"
        alt="logo"
      />
    </div>
  );
}

export default Logo;
