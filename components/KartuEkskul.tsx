import Link from "next/link";
import { JAM_SESI, type Ekskul } from "@/data/ekskul";

export default function KartuEkskul({
  item,
  terdaftar,
}: {
  item: Ekskul;
  terdaftar: number;
}) {
  const sisa = item.kuota - terdaftar;
  const penuh = sisa <= 0;
  const persen = Math.min(100, Math.round((terdaftar / item.kuota) * 100));

  return (
    <div className="rounded-xl border bg-white p-4 shadow-sm transition hover:shadow-md">
      <span className="rounded bg-blue-100 px-2 py-0.5 text-xs text-blue-700">
        {item.kategori}
      </span>

      <h3 className="mt-2 text-lg font-semibold">{item.nama}</h3>
      <p className="text-sm text-slate-500">
        {item.hari} · Sesi {item.sesi} ({JAM_SESI[item.sesi]})
      </p>
      <p className="text-sm text-slate-500">Pembina: {item.pembina}</p>

      <div className="mt-3">
        <div className="h-2 w-full overflow-hidden rounded bg-slate-200">
          <div
            className={penuh ? "h-2 bg-red-500" : "h-2 bg-green-500"}
            style={{ width: `${persen}%` }}
          />
        </div>
        <p
          className={
            penuh
              ? "mt-1 text-sm font-medium text-red-600"
              : "mt-1 text-sm text-green-700"
          }
        >
          {penuh ? "Penuh" : `Sisa ${sisa} dari ${item.kuota} tempat`}
        </p>
      </div>

      <Link
        href={`/ekskul/${item.id}`}
        className="mt-3 inline-block rounded bg-blue-600 px-3 py-1.5 text-sm text-white hover:bg-blue-700"
      >
        Lihat detail
      </Link>
    </div>
  );
}