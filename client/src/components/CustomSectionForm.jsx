import React from 'react';
import { Plus, Trash2 } from 'lucide-react';

const CustomSectionForm = ({ data = { title: "Activities", items: [] }, onChange }) => {
  const items = data.items || [];

  const handleUpdateTitle = (val) => {
    onChange({ ...data, title: val });
  };

  const handleAddItem = () => {
    const newItems = [...items, { name: "", description: "", _id: Date.now().toString() }];
    onChange({ ...data, items: newItems });
  };

  const handleUpdateItem = (index, field, val) => {
    const newItems = [...items];
    newItems[index][field] = val;
    onChange({ ...data, items: newItems });
  };

  const handleRemoveItem = (index) => {
    const newItems = [...items];
    newItems.splice(index, 1);
    onChange({ ...data, items: newItems });
  };

  return (
    <div className="space-y-6">
      <div className="bg-amber-50 p-4 rounded-lg border border-amber-100">
        <label className="text-[10px] font-bold uppercase text-amber-600 tracking-wider mb-1 block">Section Title</label>
        <input 
          type="text" 
          value={data.title} 
          onChange={(e) => handleUpdateTitle(e.target.value)} 
          className="w-full bg-white border border-amber-200 rounded px-3 py-2 text-sm font-bold focus:outline-none focus:border-amber-500"
          placeholder="e.g. Languages, Volunteer, Awards"
        />
      </div>

      <div className="space-y-3">
        {items.map((item, index) => (
          <div key={index} className="flex gap-3 items-start bg-white p-3 rounded border border-slate-100">
             <div className="flex-1 space-y-2">
                <input 
                  type="text" 
                  placeholder="Item Name (e.g. English)" 
                  value={item.name} 
                  onChange={(e) => handleUpdateItem(index, 'name', e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded px-3 py-1.5 text-sm focus:outline-none focus:border-amber-500"
                />
                <input 
                  type="text" 
                  placeholder="Details (e.g. Native Speaker)" 
                  value={item.description} 
                  onChange={(e) => handleUpdateItem(index, 'description', e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded px-3 py-1.5 text-xs focus:outline-none focus:border-amber-500"
                />
             </div>
             <button onClick={() => handleRemoveItem(index)} className="text-slate-300 hover:text-red-500 mt-2 transition-colors"><Trash2 size={14} /></button>
          </div>
        ))}
      </div>

      <button onClick={handleAddItem} className="w-full py-3 border-2 border-dashed border-slate-200 rounded-lg text-slate-400 text-xs font-bold uppercase tracking-widest hover:border-amber-500 hover:text-amber-500 transition-all flex items-center justify-center gap-2"><Plus size={16} /> Add Item</button>
    </div>
  );
};

export default CustomSectionForm;