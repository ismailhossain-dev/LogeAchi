import Image from "next/image";
import Link from "next/link";

function Logo() {
  return (
    <div>
      <Link
        href="/"
        className="text-3xl text-white italic flex items-center gap-2"
      >
        <Image
          src="/main-logo.png"
          width={70}
          height={70}
          className="w-[60px] h-[50px]md:w-[80px] md:h-[60px]"
          alt="LogeAchi logo"
        />
      </Link>
    </div>
  );
}

export default Logo;
