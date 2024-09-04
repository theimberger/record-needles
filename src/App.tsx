import React, { useState } from 'react'
import StitchCounter from './StitchCounter'
import ProjectSelection from './ProjectSelection'
import './App.css'

const App = () => {
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <>
      { selectedProject ? (
        <StitchCounter projectData={selectedProject} />
      ) : (
        <ProjectSelection setSelectedProject={setSelectedProject} />
      ) }
    </>
  )
}

export default App
