import type { Metadata } from "next";
import Link from "next/link";
import { cookies } from "next/headers";
import { ekskul, pendaftar, JAM_SESI } from "@/data/ekskul";
import { batalkan } from "@/app/actions";

export const metadata: Metadata = { title: "Ekskul Saya" };

const sama = (a: string, b: string) =>
  a.trim().toLowerCase() === b.trim().toLowerCase();

export default async function EkskulSaya() {
  const toples = await cookies();
  const nama = toples.get("nama")?.value ?? "";
  const kelas = toples.get("kelas")?.value ?? "";

  return (
    <section className="rounded-xl border border-blue-100 bg-white p-6">
      <h1 className="text-2xl font-bold text-blue-900">Ekskul saya</h1>
      <Isi nama={nama} kelas={kelas} />
    </section>
  );
}

function Isi({ nama, kelas }: { nama: string; kelas: string }) {
  if (!nama || !kelas) {
    return (
      <p className="mt-4 text-slate-600">
        Kamu belum mendaftar apa pun.{" "}
        <Link href="/ekskul" className="text-blue-600 hover:underline">
          Lihat daftar ekskul
        </Link>
      </p>
    );
  }

  const milikku = pendaftar
    .filter((p) => sama(p.nama, nama) && sama(p.kelas, kelas))
    .map((p) => ({ p, e: ekskul.find((e) => e.id === p.ekskulId) }))
    .filter((x): x is { p: (typeof pendaftar)[number]; e: (typeof ekskul)[number] } => !!x.e);

  return (
    <>
      <p className="mt-1 text-sm text-slate-500">
        {nama} · {kelas} · {milikku.length} ekskul diikuti
      </p>

      {milikku.length === 0 ? (
        <p className="mt-6 border-t border-blue-100 pt-5 text-slate-600">
          Belum ada ekskul yang diikuti.
        </p>
      ) : (
        <ul className="mt-5 border-t border-blue-100">
          {milikku.map(({ p, e }) => (
            <li
              key={p.nomor}
              className="flex items-center justify-between gap-4 border-b border-blue-100 py-3"
            >
              <div>
                <Link
                  href={`/ekskul/${e.id}`}
                  className="font-medium text-blue-700 hover:underline"
                >
                  {e.nama}
                </Link>
                <p className="text-sm text-slate-500">
                  {e.hari} · Sesi {e.sesi} ({JAM_SESI[e.sesi]})
                </p>
              </div>

              <form action={batalkan}>
                <input type="hidden" name="nomor" value={p.nomor} />
                <button className="rounded-md border border-red-200 px-3 py-1.5 text-sm text-red-700 hover:bg-red-50">
                  Batalkan
                </button>
              </form>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}