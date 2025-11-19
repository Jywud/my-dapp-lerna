'use client'

import useStore from '@/store'
import Button from '@mui/material/Button';

export default function Page() {
  const bears = useStore((state) => state.bears)
  const increase = useStore((state) => state.increase)
  return (
    <div>
      <h1>Zustand Example</h1>
      <p>Number of bears: {bears}</p>
      <Button variant="contained" size='small' onClick={() => increase(1)}>Increase</Button>
    </div>
  )
}