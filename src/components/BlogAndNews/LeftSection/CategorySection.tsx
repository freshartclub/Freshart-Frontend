import { useState } from 'react';

const categories = ["All", "Electronic Devices", "Computer & Laptop", "Computer Accessories", "SmartPhone", "HeadPhone", "Mobile Accessories", "Gaming Concole","Camera & Photo"];

const CategorySection = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");

  return (
    <div className="p-4 border mt-5 rounded-lg">
      <h2 className="text-lg font-bold mb-4">Category</h2>
      <ul>
        {categories.map(category => (
          <li key={category} className="mb-2">
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="category"
                value={category}
                checked={selectedCategory === category}
                onChange={() => setSelectedCategory(category)}
                className="form-radio h-4 w-4 text-orange-500 border-gray-300 focus:ring-orange-500"
              />
              <span className="ml-2">{category}</span>
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CategorySection;
