// pages/index.tsx
"use client";
import MathComponent from './components/MathComponent';

const Home = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-xl font-bold mb-4">Math Calculator</h1>
      <MathComponent />
    </div>
  );
};

export default Home;
