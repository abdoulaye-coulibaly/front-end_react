import React from 'react'
import CreatePost from './CreatePost'
import RecuPost from './RecuPost'

export default function ComponentPost({id,delet}) {
  return (
    <>
    <div>
          <CreatePost id={id} delet={delet}/>
      </div>
      <div>
            <RecuPost id={id} delet={delet} />
        </div>
    </>
  )
}
