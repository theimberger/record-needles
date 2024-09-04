import { useEffect, useState } from 'react'

import './App.css'
import { idbDel, idbGet, idbSet, idbAll } from './utils/indexed-db'
import { ProjectType } from './utils/types'

interface ProjectSelectionProps {
  setSelectedProject: (project: ProjectType) => void;
}

const ProjectSelection = ({ setSelectedProject }: ProjectSelectionProps) => {
  const [name, setName] = useState('')
  const [projectList, setProjectList] = useState<ProjectType[]>([]);

  useEffect(() => {
    const asyncEffect = async () => {
      const projects = await idbAll();
      if (projects.length) {
        setProjectList(projects);
      }
    };
    asyncEffect();
  }, []);

  const handleNewProject = async () => {
    const newProject = { name, rows: [] };

    const existing = await idbGet(name);
    if (existing) {
      await idbDel(name);
    }

    await idbSet({ name, rows: [] });
    setSelectedProject(newProject);
  }

  return (
    <>
      <header />
      <main className='main--selector'>
        <p>Create a new one or select an existing one.</p>
        <div>
          <form>
            <input
              placeholder='Project Name'
              value={name}
              onChange={ (e) => setName(e.target.value) }
            />
            <button onClick={handleNewProject}>Create</button>
          </form>
        </div>
        <div>
          {projectList.length > 0 && <h3>Existing Projects</h3>}
          <ul className='project-selection__list'>
            {projectList.map((project) => (
              <li key={project.name} onClick={() => setSelectedProject(project)}>
                {project.name}
              </li>
            ))}
          </ul>
        </div>
      </main>
      <footer>
        <div className='footer-div'>
          for drew <br/>
          ❤️
        </div>
      </footer>
    </>
  )
}

export default ProjectSelection
