import Link from "next/link";

export default function LogoLink() {
  return (
    <Link
      href="/"
      className="flex items-center gap-2">
      <div className="size-12">
        <img
          className="w-full"
          src="/icons/icon-1024x1024.png"
          alt="logo"
        />
      </div>
      <div>Recipe Vault</div>
    </Link>
  );
}
