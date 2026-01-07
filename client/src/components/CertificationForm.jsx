import React from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { GripVertical, Trash2, Plus } from 'lucide-react';

const CertificationForm = ({ data, onChange }) => {
  const handleAdd = () => {
    onChange([...data, { name: "", issuer: "", date: "", link: "", _id: Date.now().toString() }]);
  };

  const handleRemove = (index) => {
    const newData = [...data];
    newData.splice(index, 1);
    onChange(newData);
  };

  const handleUpdate = (index, field, value) => {
    const newData = [...data];
    newData[index][field] = value;
    onChange(newData);
  };

  const onDragEnd = (result) => {
    if (!result.destination) return;
    const items = Array.from(data);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    onChange(items);
  };

  return (
    <div className="space-y-6">
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="certs-list">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-4">
              {data.map((item, index) => (
                <Draggable key={item._id} draggableId={item._id} index={index}>
                  {(provided) => (
                    <div ref={provided.innerRef} {...provided.draggableProps} className="bg-white border border-slate-100 rounded-lg p-5 shadow-sm group">
                      <div className="flex items-center gap-3 mb-4">
                        <div {...provided.dragHandleProps} className="cursor-grab text-slate-300 hover:text-amber-500"><GripVertical size={16} /></div>
                        <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 flex-1">Certificate #{index + 1}</h3>
                        <button onClick={() => handleRemove(index)} className="text-slate-300 hover:text-red-500 transition-colors"><Trash2 size={14} /></button>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                            <label className="text-[10px] font-bold uppercase text-slate-400 tracking-wider mb-1 block">Certificate Name</label>
                            <input 
                                type="text" 
                                value={item.name} 
                                onChange={(e) => handleUpdate(index, "name", e.target.value)} 
                                className="w-full bg-slate-50 border border-slate-200 rounded px-3 py-2 text-sm focus:outline-none focus:border-amber-500 transition-colors"
                            />
                        </div>
                        <div>
                            <label className="text-[10px] font-bold uppercase text-slate-400 tracking-wider mb-1 block">Issuer</label>
                            <input 
                                type="text" 
                                placeholder="e.g. Google" 
                                value={item.issuer} 
                                onChange={(e) => handleUpdate(index, "issuer", e.target.value)} 
                                className="w-full bg-slate-50 border border-slate-200 rounded px-3 py-2 text-sm focus:outline-none focus:border-amber-500 transition-colors"
                            />
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                         <div>
                            <label className="text-[10px] font-bold uppercase text-slate-400 tracking-wider mb-1 block">Date</label>
                            <input 
                                type="date" 
                                value={item.date} 
                                onChange={(e) => handleUpdate(index, "date", e.target.value)} 
                                className="w-full bg-slate-50 border border-slate-200 rounded px-3 py-2 text-sm focus:outline-none focus:border-amber-500 transition-colors"
                            />
                        </div>
                        <div>
                            <label className="text-[10px] font-bold uppercase text-slate-400 tracking-wider mb-1 block">Credential Link</label>
                            <input 
                                type="url" 
                                value={item.link} 
                                onChange={(e) => handleUpdate(index, "link", e.target.value)} 
                                className="w-full bg-slate-50 border border-slate-200 rounded px-3 py-2 text-sm focus:outline-none focus:border-amber-500 transition-colors"
                            />
                        </div>
                      </div>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      <button onClick={handleAdd} className="w-full py-3 border-2 border-dashed border-slate-200 rounded-lg text-slate-400 text-xs font-bold uppercase tracking-widest hover:border-amber-500 hover:text-amber-500 transition-all flex items-center justify-center gap-2"><Plus size={16} /> Add Certificate</button>
    </div>
  );
};

export default CertificationForm;