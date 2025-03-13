import React from "react";
import { FiMaximize2, FiMinimize2, FiX } from "react-icons/fi";
import { ResizableBox } from "react-resizable";

const componentTypes = {
  TEXT: "Text Block",
  IMAGE: "Image Gallery",
  CHART: "Simple Chart",
  TODO: "Todo List",
  WEATHER: "Weather Widget"
};

const SimpleBox = ({ id, content, onRemove, onMinimize, isMinimized }) => {
  return (
    <div
      className="bg-white rounded-lg shadow-lg transition-all duration-300"
      style={{ minHeight: isMinimized ? "60px" : "200px" }}
    >
      <div className="p-4 border-b border-gray-200 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <h3 className="font-medium text-gray-800">{content.type}</h3>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => onMinimize(id)}
            className="p-1 hover:bg-gray-100 rounded"
          >
            {isMinimized ? <FiMaximize2 /> : <FiMinimize2 />}
          </button>
          <button
            onClick={() => onRemove(id)}
            className="p-1 hover:bg-gray-100 rounded text-red-500"
          >
            <FiX />
          </button>
        </div>
      </div>
      {!isMinimized && (
        <ResizableBox
          width={200}
          height={200}
          minConstraints={[200, 200]}
          maxConstraints={[400, 400]}
          className="p-4 overflow-auto"
        >
          <ComponentRenderer type={content.type} />
        </ResizableBox>
      )}
    </div>
  );
};

const ComponentRenderer = ({ type }) => {
  switch (type) {
    case componentTypes.TEXT:
      return <div className="prose"><p>Sample text content...</p></div>;
    case componentTypes.IMAGE:
      return (
        <div className="grid grid-cols-2 gap-2">
          <img src="https://images.unsplash.com/photo-1461988320302-91bde64fc8e4" alt="Gallery 1" className="rounded" />
          <img src="https://images.unsplash.com/photo-1461988320302-91bde64fc8e4" alt="Gallery 2" className="rounded" />
        </div>
      );
    case componentTypes.CHART:
      return <div className="h-40 bg-gray-100 rounded flex items-center justify-center">Chart Placeholder</div>;
    case componentTypes.TODO:
      return (
        <ul className="space-y-2">
          <li className="flex items-center gap-2">
            <input type="checkbox" className="rounded" />
            <span>Sample todo item</span>
          </li>
        </ul>
      );
    case componentTypes.WEATHER:
      return (
        <div className="text-center">
          <div className="text-4xl">🌤️</div>
          <div className="mt-2">23°C</div>
        </div>
      );
    default:
      return null;
  }
};

const Dashboard = () => {
  const [boxes, setBoxes] = React.useState([
    { id: 1, type: componentTypes.TEXT },
    { id: 2, type: componentTypes.IMAGE },
    { id: 3, type: componentTypes.CHART },
    { id: 4, type: componentTypes.TODO },
    { id: 5, type: componentTypes.WEATHER }
  ]);
  const [minimizedBoxes, setMinimizedBoxes] = React.useState(new Set());

  const removeBox = (id) => {
    setBoxes(boxes.filter(box => box.id !== id));
    setMinimizedBoxes(prev => {
      const newSet = new Set(prev);
      newSet.delete(id);
      return newSet;
    });
  };

  const toggleMinimize = (id) => {
    setMinimizedBoxes(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {boxes.map(box => (
          <SimpleBox
            key={box.id}
            id={box.id}
            content={{ type: box.type }}
            onRemove={removeBox}
            onMinimize={toggleMinimize}
            isMinimized={minimizedBoxes.has(box.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;