const statusStyles = {
  active:    "bg-green-100 text-green-700",
  pending:   "bg-yellow-100 text-yellow-700",
  accepted:  "bg-blue-100 text-blue-700",
  confirmed: "bg-green-100 text-green-700",
  completed: "bg-purple-100 text-purple-700",
  rejected:  "bg-red-100 text-red-700",
}

export function StatusBadge({ status }) {
  return (
    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${statusStyles[status] ?? "bg-muted text-muted-foreground"}`}>
      {status}
    </span>
  )
}
