export default function Memuat() {
    return (
        <div> 
            <div className="mb-4 h-8 w-48 animate-pulse rounded bg-slate-200"/>
            <div className="grid gap-4 sm: grid-cols-2 lg: gris-cols-3">
                {[1, 2,, 3, 4, 5, 6]. map((i) => (<div key={i} className="h-44 animate-pulse rounded-xl bg-slate-200"/>))}
            </div>
        </div>
    )
}