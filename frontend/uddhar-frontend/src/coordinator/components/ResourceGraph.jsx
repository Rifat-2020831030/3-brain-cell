import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer
  } from 'recharts';
  import Proptypes from 'prop-types';
  
  const ResourceGraph = ({ 
    data, 
    lines = [], 
    dateRange = 7,  
    dateOffset = 0  // offset from current date
  }) => {
    // Generate dates for x-axis
    const getDates = () => {
      const dates = [];
      const today = new Date();
      
      for (let i = dateOffset; i < dateOffset + dateRange; i++) {
        const date = new Date(today);
        date.setDate(date.getDate() - i);
        dates.unshift(date.toLocaleDateString());
      }
      return dates;
    };
  
    // Format data for the chart
    const formatData = () => {
      const dates = getDates();
      return dates.map(date => ({
        date,
        ...lines.reduce((acc, line) => ({
          ...acc,
          [line.name]: data[line.name]?.[date] || 0
        }), {})
      }));
    };
  
    return (
      <div className="w-full h-[400px] bg-black p-4 rounded-lg">
        <ResponsiveContainer width="100%" height="100%" >
          <LineChart
            data={formatData()}
            margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#333" />
            <XAxis 
              dataKey="date" 
              stroke="#fff"
              tick={{ fill: '#fff' }}
            />
            <YAxis 
              stroke="#fff"
              tick={{ fill: '#fff' }}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#333',
                border: 'none',
                borderRadius: '4px',
                color: '#fff'
              }}
            />
            <Legend 
              wrapperStyle={{ color: '#fff' }}
            />
            {lines.map((line, index) => (
              <Line
                key={line.name}
                type="monotone"
                dataKey={line.name}
                stroke={line.color || `hsl(${index * 45}, 70%, 50%)`}
                strokeWidth={2}
                dot={{ fill: line.color || `hsl(${index * 45}, 70%, 50%)` }}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
    );
  };

export default ResourceGraph;

ResourceGraph.propTypes = {
  data: Proptypes.object.isRequired,
  lines: Proptypes.arrayOf(
    Proptypes.shape({
      name: Proptypes.string.isRequired,
      color: Proptypes.string
    })
  ),
  dateRange: Proptypes.number,
  dateOffset: Proptypes.number
};