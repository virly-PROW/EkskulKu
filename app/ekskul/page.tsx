import type { Metadata } from "next";
import { ambilSemuaEkskul } from "@/data/ambil";
import KatalogEkskul from "@/components/KatalogEkskul";

export const metadata: Metadata = { title: "Daftar Ekskul" };

export default async function DaftarEkskul({
  searchParams,
}: PageProps<"/ekskul">) {
  const sp = await searchParams;
  const semua = await ambilSemuaEkskul();
  return (
    <div>
      <h1 className="mb-4 text-2xl font-bold">Daftar Ekskul</h1>
      <KatalogEkskul semua={semua} sp={sp} />
    </div>
  );
}