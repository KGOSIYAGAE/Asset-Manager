import { getPercentage } from "../../../utils/getValueInPercentage";

// Color mapping for known statuses - add more as needed
const SEGMENT_COLORS = {
  issued_to_students: { hex: "#2563eb", bg: "bg-blue-600", label: "Issued to Students" },
  issued_to_staff: { hex: "#16a34a", bg: "bg-green-600", label: "Issued to Staff" },
  loaned_to_students: { hex: "#f59e0b", bg: "bg-amber-500", label: "Loaned to Students" },
  loaned_to_staff: { hex: "#9333ea", bg: "bg-purple-600", label: "Loaned to Staff" },
};

function PieDevicesIssuedLoanedUsers({ deviceAssignedLoanedByUser }) {
  const segments = Object.keys(SEGMENT_COLORS).map((key) => ({
    key,
    total: Number(deviceAssignedLoanedByUser?.[key] ?? 0),
    ...SEGMENT_COLORS[key],
  }));

  const totalDevices = segments?.reduce((sum, s) => sum + s.total, 0);

  // Build conic-gradient stops dynamically
  let cumulative = 0;
  const gradientStops = segments?.map((s) => {
    const start = cumulative;
    const percentage = totalDevices ? (s.total / totalDevices) * 100 : 0;
    cumulative += percentage;
    return `${s.hex} ${start}% ${cumulative}%`;
  });

  const conicGradient = totalDevices ? `conic-gradient(${gradientStops.join(", ")})` : "conic-gradient(#e2e8f0 0% 100%)";
  return (
    <div className="w-[100%] h-[100%] flex items-center justify-between">
      <div className="w-48 h-48 rounded-full flex items-center justify-center" style={{ background: conicGradient }}>
        <div className="w-32 h-32 flex-col bg-white rounded-full flex items-center justify-center">
          <span className="font-bold">{totalDevices}</span>
          <span className="text-sm">Total</span>
        </div>
      </div>

      <div className="flex flex-col gap-5 justify-evenly text-sm">
        {segments?.map((s) => (
          <div key={s.key} className="flex items-center justify-between gap-3">
            <div className={`${s.bg} p-2 rounded-full`}></div>
            <span className="text-sm">{s.label}</span>
            <span>{s.total}</span>
            <span className="text-slate-500">{getPercentage(s.total, totalDevices)}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PieDevicesIssuedLoanedUsers;

{
  /**/
}
