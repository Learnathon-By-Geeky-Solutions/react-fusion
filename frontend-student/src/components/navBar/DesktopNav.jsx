import NavItems from "./navItems";

export default function DesktopNav() {
  return (
    <div className="flex justify-between flex-row bg-background">
      <div>React Fusion</div>
      <div>
        <NavItems></NavItems>
      </div>
    </div>
  );
}
