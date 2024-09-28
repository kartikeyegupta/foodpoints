// components/MathComponent.tsx
import { useState } from 'react';

const MathComponent = () => {
  const [inputValue, setInputValue] = useState<number | string>('');
  const [dropdownValue, setDropdownValue] = useState<string>('add');
  const [result, setResult] = useState<number | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value === '' ? '' : parseFloat(value));
  };

  const handleDropdownChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setDropdownValue(e.target.value);
  };

  const handleButtonClick = () => {
    if (typeof inputValue !== 'number' || isNaN(inputValue)) {
      alert('Please enter a valid number');
      return;
    }

    let calculatedResult = 0;

    switch (dropdownValue) {
      case 'add':
        calculatedResult = inputValue + 10; // Example operation
        break;
      case 'subtract':
        calculatedResult = inputValue - 10;
        break;
      case 'multiply':
        calculatedResult = inputValue * 10;
        break;
      case 'divide':
        calculatedResult = inputValue / 10;
        break;
      default:
        break;
    }

    setResult(calculatedResult);
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <input
        type="number"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Enter your current food Plan"
        className="border p-2 mb-2 w-full"
      />
      <select
        value={dropdownValue}
        onChange={handleDropdownChange}
        className="border p-2 mb-2 w-full"
      >
        <option value="add">Add 10</option>
        <option value="subtract">Subtract 10</option>
        <option value="multiply">Multiply by 10</option>
        <option value="divide">Divide by 10</option>
      </select>
      <button
        onClick={handleButtonClick}
        className="bg-blue-500 text-white py-2 px-4 rounded w-full"
      >
        Calculate
      </button>
      {result !== null && <div className="mt-4">Result: {result}</div>}
    </div>
  );
};

export default MathComponent;
