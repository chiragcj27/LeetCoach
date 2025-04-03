import './index.css'

import { createRoot } from 'react-dom/client'
import { StrictMode } from 'react'
import ContentPage from './content/ContentPage'


const root = document.createElement('div')
root.id = 'leetcoach_container'
document.body.append(root)
   

createRoot(root).render(
  <StrictMode>
    <ContentPage/>
  </StrictMode>
)