import { useState } from 'react'
import StitchCounter from './StitchCounter'
import ProjectSelection from './ProjectSelection'
import { ProjectType } from './utils/types'
import './App.css'

const App = () => {
  const [selectedProject, setSelectedProject] = useState<null | ProjectType>(null);
  const returnToSelection = () => setSelectedProject(null);
  return (
    <>
      { selectedProject ? (
        <StitchCounter
          projectData={selectedProject}
          returnToProjectSelection={returnToSelection}
        />
      ) : (
        <ProjectSelection
          setSelectedProject={setSelectedProject}
        />
      ) }
    </>
  )
}

export default App
