

import "./spinner.css";

export default function Card({id, title, description}:any) {
  return (
    <div key={id} className="mt-4 p-6 flex flex-col w-64 border rounded-md bg-white">
              <h3 className="text-xl font-semibold">{title}</h3>
              <p className="mt-2 text-gray-600 text-sm">{description}</p>
    </div>
  );
}