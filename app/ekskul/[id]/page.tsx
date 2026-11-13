import type { Metadata } from "next";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { cookies } from "next/headers";
import { ambilEkskul } from "@/data/ambil";
import { JAM_SESI } from "@/data/ekskul";
import AnggotaEkskul from "@/components/AnggotaEkskul";
import FormDaftar from "@/components/FormDaftar";

export async function generateMetadata({
  params,
}: PageProps<"/ekskul/[id]">): Promise<Metadata> {
  const { id } = await params;
  const item = await ambilEkskul(Number(id));
  return { title: item ? item.nama : "Ekskul tidak ditemukan" };
}

export default async function DetailEkskul({
  params,
}: PageProps<"/ekskul/[id]">) {
  const { id } = await params;
  const item = await ambilEkskul(Number(id));
  if (!item) notFound();
  const toples = await cookies();
  const namaAwal = toples.get("nama")?.value ?? "";
  const kelasAwal = toples.get("kelas")?.value ?? "";

  return (
    <article className="rounded-xl border border-blue-100 bg-white p-6">
      <header className="pb-5">
        <span className="rounded border border-blue-200 bg-blue-50 px-2 py-0.5 text-xs text-blue-700">
          {item.kategori}
        </span>
        <h1 className="mt-2 text-3xl font-bold text-blue-900">{item.nama}</h1>
        <p className="mt-1 text-sm text-slate-500">
          {item.hari} · Sesi {item.sesi} ({JAM_SESI[item.sesi]})
        </p>
        <p className="text-sm text-slate-600">Pembina: {item.pembina}</p>
      </header>

      <FormDaftar ekskulId={item.id} namaAwal={namaAwal} kelasAwal={kelasAwal} />

      <section className="mt-6 border-t border-blue-100 pt-5">
        <h2 className="mb-2 text-lg font-semibold text-blue-900">
          Anggota terdaftar
        </h2>
        <Suspense fallback={<p className="text-sm text-slate-500">Memuat anggota...</p>}>
          <AnggotaEkskul ekskulId={item.id} kuota={item.kuota} />
        </Suspense>
      </section>
    </article>
  );
}