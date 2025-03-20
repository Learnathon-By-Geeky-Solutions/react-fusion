import NavItems from "./navItems";

export default function DesktopNav() {
  return (
    <div className="flex justify-between flex-row bg-gray-700 p-6 rounded-t-xl">
      <div>React Fusion</div>
      <div>
        <NavItems></NavItems>
      </div>
    </div>
  );
}
