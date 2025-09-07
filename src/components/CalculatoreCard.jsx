import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';

const FlexibleCalculator = ({
  title = "Calculator",
  data = [],
  onDataChange,
  columnConfig = [],
  showDeleteButton = true,
  showAddButton = true,
  addButtonText = "Add Course",
  addButtonDisabled = false,
  result = null,
  resultLabel = "Result",
  onAddRow,
  onDeleteRow
}) => {
  
  const handleInputChange = (rowIndex, fieldKey, value) => {
    if (onDataChange) {
      onDataChange(rowIndex, fieldKey, value);
    }
  };

  const handleAddRow = () => {
    if (onAddRow && !addButtonDisabled) {
      onAddRow();
    }
  };

  const handleDeleteRow = (rowIndex) => {
    if (onDeleteRow && showDeleteButton) {
      onDeleteRow(rowIndex);
    }
  };

  const renderInputField = (row, column, rowIndex) => {
    const value = row[column.key] || '';
    
    if (column.type === 'dropdown') {
      return (
        <select
          value={value}
          onChange={(e) => handleInputChange(rowIndex, column.key, e.target.value)}
          className="w-full px-2 sm:px-3 py-2 sm:py-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs sm:text-sm bg-white"
          disabled={column.disabled}
        >
          <option value="">{column.placeholder || "Select option"}</option>
          {column.options?.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      );
    }

    return (
      <input
        type={column.type || 'text'}
        placeholder={column.placeholder || ''}
        value={value}
        onChange={(e) => handleInputChange(rowIndex, column.key, e.target.value)}
        readOnly={column.readonly}
        className={`w-full px-2 sm:px-3 py-2 sm:py-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs sm:text-sm ${
          column.readonly ? 'bg-gray-50 font-medium' : ''
        } ${column.textAlign === 'center' ? 'text-center' : ''}`}
      />
    );
  };

  const getGridColsClass = (columnsCount) => {
    const gridClasses = {
      1: 'grid-cols-1',
      2: 'grid-cols-1 sm:grid-cols-2', 
      3: 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3',
      4: 'grid-cols-1 sm:grid-cols-2 md:grid-cols-4',
      5: 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5',
      6: 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6',
      7: 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-7',
      8: 'grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-8',
      9: 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-9',
      10: 'grid-cols-1 sm:grid-cols-2 md:grid-cols-5 lg:grid-cols-10',
      11: 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-11',
      12: 'grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-12'
    };
    return gridClasses[columnsCount] || 'grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-12';
  };

  const totalColumns = columnConfig.length;
  const columnsWithDelete = showDeleteButton && data.length > 1 ? totalColumns + 1 : totalColumns;

  return (
    <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
      <div className="p-3 sm:p-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 sm:mb-6 gap-3 sm:gap-0">
          <h3 className="text-lg sm:text-2xl font-bold text-gray-800">{title}</h3>
          {showAddButton && (
            <button
              onClick={handleAddRow}
              disabled={addButtonDisabled}
              className={`flex items-center space-x-2 px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors w-full sm:w-auto justify-center ${
                addButtonDisabled
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-blue-500 text-white hover:bg-blue-600'
              }`}
            >
              <Plus size={14} className="sm:w-4 sm:h-4" />
              <span>{addButtonText}</span>
            </button>
          )}
        </div>

        {/* Header Row */}
        {columnConfig.some(col => col.header) && (
          <div className={`grid ${getGridColsClass(columnsWithDelete)} gap-2 sm:gap-3 items-center mb-3 sm:mb-4`}>
            {columnConfig.map((column, index) => (
              <div key={index} className={`col-span-1`}>
                {column.header && (
                  <div className="text-xs sm:text-sm font-medium text-gray-600 px-2 sm:px-3 py-1 sm:py-2">
                    {column.header}
                  </div>
                )}
              </div>
            ))}
            {showDeleteButton && data.length > 1 && (
              <div className="col-span-1">
                <div className="text-xs sm:text-sm font-medium text-gray-600 px-2 sm:px-3 py-1 sm:py-2 text-center">
                  Delete
                </div>
              </div>
            )}
          </div>
        )}

        {/* Data Rows */}
        <div className="space-y-3 sm:space-y-4">
          {data.map((row, rowIndex) => (
            <div key={rowIndex} className={`grid ${getGridColsClass(columnsWithDelete)} gap-2 sm:gap-3 items-center`}>
              {columnConfig.map((column, columnIndex) => (
                <div key={columnIndex} className={`col-span-1`}>
                  {renderInputField(row, column, rowIndex)}
                </div>
              ))}
              
              {/* Delete Button */}
              {showDeleteButton && data.length > 1 && (
                <div className="col-span-1 flex justify-center">
                  <button
                    onClick={() => handleDeleteRow(rowIndex)}
                    className="p-1.5 sm:p-2 border border-red-500 rounded-full text-red-500 hover:text-red-700 hover:bg-red-50 transition-colors"
                    title="Delete row"
                  >
                    <X size={10} className="sm:w-3 sm:h-3" />
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Result Display */}
        {result !== null && (
          <div className="mt-4 sm:mt-2 flex justify-center sm:justify-end">
            <div className="relative rounded-full p-2 shadow-2xl">
              <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full border-4 sm:border-8 border-gray-200 flex items-center justify-center bg-white">
               {result<=4 ? (<div className="text-center">
                  <div className="text-lg sm:text-2xl font-bold text-gray-800">
                    {typeof result === 'number' ? result.toFixed(1) : result}
                  </div>
                  <div className="text-xs sm:text-sm text-gray-500 font-medium">{resultLabel}</div>
                </div>):
               ( <div className="text-center">
                  <div className="text-sm sm:text-xl font-bold text-red-500">
                    Not Possible
                  </div>
                  <div className="text-xs sm:text-sm text-gray-500 font-medium">exceeding the 4</div>
                </div>)}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FlexibleCalculator;