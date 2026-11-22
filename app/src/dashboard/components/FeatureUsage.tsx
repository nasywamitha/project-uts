export default function FeatureUsage({ features }: { features: any[] }) {
  return (
    <div className="min-w-0 bg-white p-4 sm:p-5 rounded-2xl border border-gray-200 shadow-xs">
      <h3 className="font-bold text-gray-800">Penggunaan Fitur</h3>
      <p className="text-xs text-gray-400 mb-4">Fitur yang paling sering digunakan</p>
      <div className="space-y-3">
        {features.map((item) => (
          <div key={item.name}>
            <div className="flex justify-between text-xs font-medium mb-1">
              <span className="flex items-center gap-1.5 text-gray-700">
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }}></span>
                {item.name}
              </span>
              <span className="text-gray-800 font-semibold">{item.percentage}%</span>
            </div>
            <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
              <div className="h-full rounded-full" style={{ width: `${item.percentage}%`, backgroundColor: item.color }}></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}