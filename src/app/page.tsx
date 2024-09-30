import Sidebar from "@/components/Sidebar/Sidebar";
import Image from "next/image";

export default function Home() {
  return (
    <div className="text-zinc-200 grid grid-cols-[280px_1fr] h-screen bg-sunny bg-no-repeat bg-cover bg-center">
      <aside className="p-4 border-r border-solid border-white/10 rounded-r-2xl bg-white/10 backdrop-blur-md shadow-md border-zinc-400">
        <Sidebar />
      </aside>

      <main className="bg-transparent p-6 overflow-y-auto">Main Content</main>
    </div>
  );
}
