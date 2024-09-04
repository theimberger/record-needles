import { useEffect, useState } from 'react'

import './App.css'
import { idbDel, idbGet, idbSet } from './utils/indexed-db'
import { ProjectType } from './utils/types'

import imgUrl from './assets/arrow.png'

interface StitchCounterProps {
  returnToProjectSelection: () => void;
  projectData: ProjectType;
}

const StitchCounter = ({ returnToProjectSelection, projectData }: StitchCounterProps) => {
  const [name, setName] = useState('Your Project Name')
  const [rowStitches, setCount] = useState(10)
  const [rows, setRows] = useState<number[]>([]);

  useEffect(() => {
    setName(projectData.name);
    setRows(projectData.rows);
  }, [projectData]);

  const addRow = async () => {
    const newRowArray = [...rows, rowStitches];
    setRows(newRowArray);
    await idbSet({ name, rows: newRowArray });
  }

  const removeRow = async () => {
    const newRowArray = rows.slice(0, -1);
    setRows(newRowArray);
    await idbSet({ name, rows: newRowArray });
  }

  const updateName = async (newName: string) => {
    const existing = await idbGet(name);
    if (existing) {
      await idbDel(name);
    }
    await idbSet({ name: newName, rows });
    setName(newName);
  }

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCount(parseInt(e.target.value));
  }

  let runningStitches = 0;

  return (
    <>
      <header>
        <input
          value={name}
          className='project-name-input'
          onChange={(e) => updateName(e.target.value)}
        />
        <div className='project-controls'>
          <button
            className='project-controls__button-minus'
            onClick={() => setCount(rowStitches - 1)}
          >
            <img src={imgUrl} alt='-' />
          </button>
          <input
            type='text'
            inputMode='decimal'
            value={Number.isNaN(rowStitches) ? '' : rowStitches}
            style={{ width: `${String(rowStitches).length + 1}ch` }}
            onChange={handleNumberChange}
            onBlur={() => Number.isNaN(rowStitches) && setCount(0)}
          />
          <button
            className='project-controls__button-plus'
            onClick={() => setCount(rowStitches + 1)}
          >
            <img src={imgUrl} alt='+' />
          </button>
          <button className='project-controls__button-add-row' onClick={addRow}>Add</button>
        </div>
      </header>
      <main className='main--counter'>
        {rows.map((stitches: number, i: number) => {
          runningStitches += stitches;
          const range = new Array(stitches).fill(0);
          const isLastRow = i === rows.length - 1;
          return (
            <div key={`${i}-stitch-row`} className='stitches-row'>
              <div className='stitches-boxes'>
                { range.map((_, j) => (
                  <div key={`${i}-stitch-${j}`} className='stitch-box' />
                ))}
              </div>
              <div className='stitches-label'>
                #{i + 1} — {stitches}{isLastRow && ` (${runningStitches})`}
                { isLastRow && (
                  <span
                    className='stitches-row__undo'
                    onClick={removeRow}
                  >
                    undo
                  </span>
                ) }
              </div>
            </div>
          )
        })}
      </main>
      <footer>
        <div className='footer-div'>
          for drew <br/>
          ❤️
          <div
            className='footer-back'
            onClick={returnToProjectSelection}
          >{'← projects'}</div>
        </div>
      </footer>
    </>
  )
}

export default StitchCounter
