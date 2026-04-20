/* CREATE TASK MODAL
What: popup form to create a new task
*/
import { useState, useEffect} from 'react';
import { createTask } from '../../services/taskService';
import { getProjects } from '../../services/projectService';
import type {Task, Project } from '../../types';
import toast from 'react-hot-toast';

interface CreateTaskModalProps{
    onClose: ()=> void;
    onCreated:(task: Task) => void;
}

function CreateTaskModal({onClose, onCreated}: CreateTaskModalProps){
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [projectId, setProjectId] = useState('');
    const [status, setStatus] = useState<'todo'| 'in-progress' |'done'>('todo');
    const [priority, setPriority] = useState<'low'| 'medium'|'high'>('medium');
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(false);
    const [ loadingProjects, setLoadingProjects] = useState(true);
    

    useEffect(()=>{
        fetchProjects();
    },[]);

    const fetchProjects = async()=>{
        try{
            const data  = await getProjects();
            setProjects(data);
            if(data.length>0){
                setProjectId(data[0]._id|| data[0].id);
            }
        }catch(error){
            toast.error('Failed to load projects');
        }finally{
            setLoadingProjects(false);

        }
    };


    const handleSubmit = async(e: React.FormEvent) =>{
        e.preventDefault();

        if(!title.trim()){
            toast.error('Task title is required');
            return;
        }
        
        if(!projectId){
            toast.error('Please select a project');
            return;
        }

        try{
            setLoading(true);
            const newTask = await createTask({
                title,
                description,
                projectId,
                status,
                priority
            });
            toast.success('Task created!');
            onCreated(newTask);
        }catch(error){
            toast.error('Failed to create task');
        }finally{
            setLoading(false);
        }
    };

    return(
         <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black opacity-50"
        onClick={onClose}
      />

      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative z-10">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-800">Create New Task</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Title */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm mb-1">Task Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Enter task title"
            />
          </div>

          {/* Project Dropdown */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm mb-1">Project</label>
            {loadingProjects ? (
              <div className="text-gray-500 text-sm">Loading projects...</div>
            ) : projects.length === 0 ? (
              <div className="text-red-500 text-sm">No projects found. Create a project first.</div>
            ) : (
              <select
                value={projectId}
                onChange={(e) => setProjectId(e.target.value)}
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                {projects.map((project) => (
                  <option key={project._id || project.id} value={project._id || project.id}>
                    {project.name}
                  </option>
                ))}
              </select>
            )}
          </div>

          {/* Status & Priority Row */}
          <div className="flex gap-4 mb-4">
            {/* Status */}
            <div className="flex-1">
              <label className="block text-gray-700 text-sm mb-1">Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as 'todo' | 'in-progress' | 'done')}
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="todo">To Do</option>
                <option value="in-progress">In Progress</option>
                <option value="done">Done</option>
              </select>
            </div>

            {/* Priority */}
            <div className="flex-1">
              <label className="block text-gray-700 text-sm mb-1">Priority</label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value as 'low' | 'medium' | 'high')}
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="low">🟢 Low</option>
                <option value="medium">🟡 Medium</option>
                <option value="high">🔴 High</option>
              </select>
            </div>
          </div>

          {/* Description */}
          <div className="mb-6">
            <label className="block text-gray-700 text-sm mb-1">Description (optional)</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Enter task description"
              rows={3}
            />
          </div>

          {/* Buttons */}
          <div className="flex gap-3 justify-end">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading || projects.length === 0}
              className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 disabled:bg-purple-300"
            >
              {loading ? 'Creating...' : 'Create Task'}
            </button>
          </div>
        </form>
      </div>
    </div>
    );
}

export default CreateTaskModal;