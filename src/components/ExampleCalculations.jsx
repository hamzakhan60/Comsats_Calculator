import React from 'react';

export const ExampleCalculations = ({ 
  title, 
  columns, 
  rows, 
  className = "",
  tableClassName = "w-full",
  headerRowClassName = "bg-gray-50",
  bodyRowClassName = "",
  cellClassName = "py-4 px-6 text-sm"
}) => {
  return (
    <div className={`max-w-7xl mx-auto px-6 py-8 ${className}`}>
      <div className="bg-white rounded-2xl shadow-2xl p-8">
        {title && (
          <h3 className="text-2xl font-bold text-gray-900 mb-6">{title}</h3>
        )}
        <div className="overflow-x-auto">
          <table className={tableClassName}>
            {/* Table Header */}
            {columns && columns.length > 0 && (
              <thead>
                <tr className={headerRowClassName}>
                  {columns.map((column, index) => (
                    <th 
                      key={index}
                      className={`font-bold text-gray-700 ${column.headerClassName || 'text-left py-4 px-6'}`}
                      style={column.headerStyle}
                    >
                      {column.title}
                    </th>
                  ))}
                </tr>
              </thead>
            )}
            
            {/* Table Body */}
            <tbody className="divide-y divide-gray-200">
              {rows.map((row, rowIndex) => (
                <tr 
                  key={rowIndex} 
                  className={`${bodyRowClassName} ${row.rowClassName || ''}`}
                  style={row.rowStyle}
                >
                  {row.cells.map((cell, cellIndex) => (
                    <td 
                      key={cellIndex}
                      className={`${cellClassName} ${cell.className || ''}`}
                      style={cell.style}
                    >
                      {cell.content}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// Example usage component to show how to use the generic table
const ExampleUsage = () => {
  // Define columns
  const columns = [
    { 
      title: 'Step', 
      headerClassName: 'text-left py-4 px-6 font-bold text-gray-700' 
    },
    { 
      title: 'Description', 
      headerClassName: 'text-left py-4 px-6 font-bold text-gray-700' 
    },
    { 
      title: 'Calculation', 
      headerClassName: 'text-left py-4 px-6 font-bold text-gray-700' 
    },
    { 
      title: 'Result', 
      headerClassName: 'text-right py-4 px-6 font-bold text-gray-700' 
    }
  ];

  // Define rows
  const rows = [
    {
      cells: [
        { content: '1' },
        { content: 'NTS Score' },
        { content: '(140/200) × 50', className: 'font-mono' },
        { content: '35.00%', className: 'font-semibold text-right text-blue-600' }
      ]
    },
    {
      cells: [
        { content: '2' },
        { content: 'Matric Score' },
        { content: '(850/1100) × 10', className: 'font-mono' },
        { content: '7.73%', className: 'font-semibold text-right text-green-600' }
      ]
    },
    {
      cells: [
        { content: '3' },
        { content: 'FSC Score' },
        { content: '(900/1100) × 40', className: 'font-mono' },
        { content: '32.73%', className: 'font-semibold text-right text-purple-600' }
      ]
    },
    {
      rowClassName: 'bg-gray-50',
      cells: [
        { content: '4', className: 'font-bold' },
        { content: 'Total Aggregate', className: 'font-bold' },
        { content: '35.00 + 7.73 + 32.73', className: 'font-mono' },
        { content: '75.46%', className: 'font-bold text-right text-gray-900' }
      ]
    }
  ];

  return (
    <ExampleCalculations
      title="Example Calculation"
      columns={columns}
      rows={rows}
    />
  );
};


