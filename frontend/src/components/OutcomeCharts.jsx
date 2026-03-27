import { ResponsiveContainer, Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from 'recharts';

export default function OutcomeCharts({ analysis }) {
  const data = [
    { subject: 'Financial', A: 80, fullMark: 100 },
    { subject: 'Risk Level', A: 40, fullMark: 100 },
    { subject: 'Career Growth', A: 90, fullMark: 100 },
    { subject: 'Lifestyle', A: 65, fullMark: 100 },
  ];

  return (
    <div className="w-full h-[300px] bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-5 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]">
      <h3 className="text-sm font-semibold tracking-wider text-primary mb-2 text-center uppercase shadow-[0_0_10px_rgba(99,102,241,0.2)]">Outcome Dimensions</h3>
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="65%" data={data}>
          <PolarGrid stroke="rgba(255,255,255,0.1)" />
          <PolarAngleAxis dataKey="subject" tick={{ fill: '#94a3b8', fontSize: 12, fontWeight: 500 }} />
          <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
          <Radar name="Path" dataKey="A" stroke="#6366f1" strokeWidth={2} fill="#6366f1" fillOpacity={0.2} />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}
