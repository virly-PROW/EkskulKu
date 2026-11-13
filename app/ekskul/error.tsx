"use client";

export default function Galat({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div className="py-10 text-center">
      <h2 className="text-xl font-bold">Terjadi kesalahan</h2>
      <p className="mt-2 text-slate-600">{error.message}</p>
      <button
        onClick={reset}
        className="mt-4 rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
      >
        Coba lagi
      </button>
    </div>
  );
}