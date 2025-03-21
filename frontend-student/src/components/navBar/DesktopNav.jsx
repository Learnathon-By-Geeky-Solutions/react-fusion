import NavItems from "./navItems";

export default function DesktopNav() {
  return (
    <div className="flex justify-between flex-row bg-gray-700 p-6 content-center items-center">
      <div class="text-3xl font-bold text-amber-100 uppercase tracking-wide">
        EduNexus
      </div>
      <div>
        <NavItems></NavItems>
      </div>
    </div>
  );
}
