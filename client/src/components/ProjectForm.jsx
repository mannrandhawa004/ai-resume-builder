import React from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { GripVertical, Trash2, Plus } from 'lucide-react';

const ProjectForm = ({ data, onChange, onDragEnd }) => {

  const handleAdd = () => {
    onChange([
      ...data, 
      { 
        name: "", 
        type: "", 
        description: "", 
        link: "", // Added URL Field
        _id: Date.now().toString() 
      }
    ]);
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

  return (
    <div className="space-y-6">
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="projects-list">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-4">
              {data.map((item, index) => (
                <Draggable key={item._id} draggableId={item._id} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      className="bg-white border border-slate-100 rounded-lg p-5 shadow-sm group"
                    >
                      <div className="flex items-center gap-3 mb-4">
                        <div {...provided.dragHandleProps} className="cursor-grab text-slate-300 hover:text-amber-500">
                          <GripVertical size={16} />
                        </div>
                        <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 flex-1">
                          Project #{index + 1}
                        </h3>
                        <button onClick={() => handleRemove(index)} className="text-slate-300 hover:text-red-500 transition-colors">
                          <Trash2 size={14} />
                        </button>
                      </div>

                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                          <label className="text-[10px] font-bold uppercase text-slate-400 tracking-wider mb-1 block">Project Name</label>
                          <input
                            type="text"
                            value={item.name}
                            onChange={(e) => handleUpdate(index, "name", e.target.value)}
                            className="w-full bg-slate-50 border border-slate-200 rounded px-3 py-2 text-sm focus:outline-none focus:border-amber-500 transition-colors"
                            placeholder="e.g. E-Commerce App"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] font-bold uppercase text-slate-400 tracking-wider mb-1 block">Project Type</label>
                          <input
                            type="text"
                            value={item.type}
                            onChange={(e) => handleUpdate(index, "type", e.target.value)}
                            className="w-full bg-slate-50 border border-slate-200 rounded px-3 py-2 text-sm focus:outline-none focus:border-amber-500 transition-colors"
                            placeholder="e.g. Web App / Mobile"
                          />
                        </div>
                      </div>

                      {/* NEW URL FIELD */}
                      <div className="mb-4">
                         <label className="text-[10px] font-bold uppercase text-slate-400 tracking-wider mb-1 block">Project Link</label>
                         <input
                           type="url"
                           value={item.link || ""}
                           onChange={(e) => handleUpdate(index, "link", e.target.value)}
                           className="w-full bg-slate-50 border border-slate-200 rounded px-3 py-2 text-sm focus:outline-none focus:border-amber-500 transition-colors"
                           placeholder="https://github.com/..."
                         />
                      </div>

                      <div>
                        <label className="text-[10px] font-bold uppercase text-slate-400 tracking-wider mb-1 block">Description</label>
                        <textarea
                          rows={3}
                          value={item.description}
                          onChange={(e) => handleUpdate(index, "description", e.target.value)}
                          className="w-full bg-slate-50 border border-slate-200 rounded px-3 py-2 text-sm focus:outline-none focus:border-amber-500 transition-colors resize-none"
                          placeholder="Describe tech stack and key features..."
                        />
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

      <button
        onClick={handleAdd}
        className="w-full py-3 border-2 border-dashed border-slate-200 rounded-lg text-slate-400 text-xs font-bold uppercase tracking-widest hover:border-amber-500 hover:text-amber-500 transition-all flex items-center justify-center gap-2"
      >
        <Plus size={16} /> Add Project
      </button>
    </div>
  );
};

export default ProjectForm;