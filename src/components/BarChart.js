import { useContext } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { ExpenseContext } from '../context/ExpenseContext';

// #endregion
const TinyBarChart = () => {

  const { list } = useContext(ExpenseContext)

  const categoryCounts = Array.from(
  list.reduce((map, item) => {
    return map.set(item.category, (map.get(item.category) || 0) + 1);
  }, new Map()),
  ([name, count]) => ({ name, count })
);

  return (
    <div style={{ width: '100%', maxWidth: 600, minWidth: 260 }}>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={categoryCounts} layout="vertical">
          <XAxis type="number" />
          <YAxis dataKey="name" type="category" width={90} />
          <Tooltip />
          <Bar dataKey="count" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TinyBarChart;
