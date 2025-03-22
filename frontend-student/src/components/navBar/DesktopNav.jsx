import NavItems from "./navItems";

export default function DesktopNav() {
  return (
    <div className="w-full bg-gray-700 m-0 py-4">
      <div className="max-w-[1280px] mx-auto flex justify-between flex-row content-center items-center">
        <div className="text-3xl font-bold text-amber-100 uppercase tracking-wide">
          EduNexus
        </div>
        <div>
          <NavItems></NavItems>
        </div>
      </div>
    </div>
  );
}
