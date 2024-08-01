import NavLinks from "./nav-links";
import NavLogin from "./nav-login";
import NavLogo from "./nav-logo";
import NavTheme from "./nav-theme";

export default function NavHeader() {
  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-10">
        <NavLogo />
        <NavLinks />
        <div className="ml-auto flex items-center space-x-4">
          <NavTheme />
          <NavLogin />
        </div>
      </div>
    </div>
  );
}
