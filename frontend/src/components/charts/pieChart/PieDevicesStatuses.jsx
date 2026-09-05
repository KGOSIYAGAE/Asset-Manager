import { getPercentage } from "../../../utils/getValueInPercentage";

// Color mapping for known statuses - add more as needed
const STATUS_COLORS = {
  Available: { hex: "#16a34a", bg: "bg-green-600" },
  Assigned: { hex: "#ea580c", bg: "bg-orange-600" },
  Loaned: { hex: "#2563eb", bg: "bg-blue-600" },
  Reserved: { hex: "#9333ea", bg: "bg-purple-600" },
  "Reserved for students": { hex: "#c026d3", bg: "bg-fuchsia-600" },
  Maintenance: { hex: "#9333ea", bg: "bg-purple-600" },
  Stolen: { hex: "#dc2626", bg: "bg-red-600" },
  Sold: { hex: "#64748b", bg: "bg-slate-500" },
  Disposed: { hex: "#78716c", bg: "bg-stone-500" },
  Retired: { hex: "#a8a29e", bg: "bg-stone-400" },
  "Written Off": { hex: "#1e293b", bg: "bg-slate-800" },
};

const DEFAULT_COLOR = { hex: "#94a3b8", bg: "bg-slate-400" };

function PieDevicesStatuses({ devicesByStatus }) {
  const totalDevices = devicesByStatus?.reduce((sum, d) => sum + Number(d.total), 0);

  // Build conic-gradient stops dynamically
  let cumulative = 0;
  const gradientStops = devicesByStatus?.map((item) => {
    const color = STATUS_COLORS[item.status]?.hex ?? DEFAULT_COLOR.hex;
    const start = cumulative;
    const percentage = totalDevices ? (Number(item.total) / totalDevices) * 100 : 0;
    cumulative += percentage;
    return `${color} ${start}% ${cumulative}%`;
  });

  const conicGradient = gradientStops?.length ? `conic-gradient(${gradientStops.join(", ")})` : "conic-gradient(#e2e8f0 0% 100%)"; // fallback grey ring when no data

  return (
    <div>
      <div className="w-[100%] h-[100%] flex items-center justify-between">
        <div className="w-48 h-48 rounded-full flex items-center justify-center" style={{ background: conicGradient }}>
          <div className="w-32 h-32 flex-col bg-white rounded-full flex items-center justify-center">
            <span className="font-bold">{totalDevices}</span>
            <span className="text-sm">Total</span>
          </div>
        </div>

        <div className="h-[180px] flex flex-col gap-5 justify-evenly text-sm overflow-y-auto">
          {devicesByStatus?.map((item) => {
            const color = STATUS_COLORS[item.status]?.bg ?? DEFAULT_COLOR.bg;
            return (
              <div key={item.status} className=" flex items-center justify-between gap-3">
                <div className={`${color} p-2 rounded-full`}></div>
                <span className="text-sm">{item.status}</span>
                <span>{item.total}</span>
                <span className="text-slate-500">{getPercentage(item.total, totalDevices)}%</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default PieDevicesStatuses;

{
  /**/
}
