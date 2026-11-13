import { cookies } from "next/headers";
import {ambilAnggota} from "@/data/ambil";

export default async function AnggotaEkskul({
  ekskulId,
  kuota,
}: {
  ekskulId: number;
  kuota: number;
}) {
  const anggota = await ambilAnggota(ekskulId);
  const namaSaya = (await cookies()).get("nama")?.value ?? "";

  return (
    <div>
      <p className="mb-2 text-sm text-slate-600">
        {anggota.length} dari {kuota} tempat terisi
      </p>
      {anggota.length === 0 ? (
        <p className="text-slate-500">Belum ada anggota.</p>
      ) : (
        <ul className="space-y-1">
          {anggota.map((a) => (
            <li key={a.nomor}>
              {a.nama} · {a.kelas}
              {namaSaya && a.nama === namaSaya && (
                <span className="ml-2 rounded bg-green-100 px-2 py-0.5 text-xs font-medium text-green-700">
                  Kamu
                </span>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
