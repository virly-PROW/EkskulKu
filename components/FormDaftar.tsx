"use client";
import { useActionState } from "react";
import { daftarEkskul, type HasilDaftar } from "@/app/actions";

export default function FormDaftar({
  ekskulId,
  namaAwal,
  kelasAwal,
}: {
  ekskulId: number;
  namaAwal: string;
  kelasAwal: string;
}) {
  const awal: HasilDaftar = {
    berhasil: false,
    pesan: "",
    galat: {},
    isian: { nama: namaAwal, kelas: kelasAwal },
  };
  const [hasil, kirim, sedangKirim] = useActionState(daftarEkskul, awal);

  const input =
    "block w-full rounded-md border border-blue-200 px-3 py-2 text-sm outline-none " +
    "focus:border-blue-500 focus:ring-1 focus:ring-blue-500";

  return (
    <form action={kirim} className="mt-6 space-y-4 border-t border-blue-100 pt-5">
      <h2 className="text-lg font-semibold text-blue-900">Daftar ekskul ini</h2>
      <input type="hidden" name="ekskulId" value={ekskulId} />

      <div className="space-y-1">
        <label htmlFor="nama" className="block text-sm text-slate-700">
          Nama
        </label>
        <input
          id="nama"
          name="nama"
          defaultValue={hasil.isian.nama}
          placeholder="Nama lengkap"
          className={input}
        />
        {hasil.galat.nama && <p className="text-sm text-red-600">{hasil.galat.nama}</p>}
      </div>

      <div className="space-y-1">
        <label htmlFor="kelas" className="block text-sm text-slate-700">
          Kelas
        </label>
        <input
          id="kelas"
          name="kelas"
          defaultValue={hasil.isian.kelas}
          placeholder="mis. XI TKJ 1"
          className={input}
        />
        {hasil.galat.kelas && <p className="text-sm text-red-600">{hasil.galat.kelas}</p>}
      </div>

      {hasil.pesan && (
        <p className={`text-sm ${hasil.berhasil ? "text-green-700" : "text-red-600"}`}>
          {hasil.pesan}
        </p>
      )}

      <button
        disabled={sedangKirim}
        className="rounded-md bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700 disabled:opacity-50"
      >
        {sedangKirim ? "Memproses..." : "Daftar"}
      </button>
    </form>
  );
}