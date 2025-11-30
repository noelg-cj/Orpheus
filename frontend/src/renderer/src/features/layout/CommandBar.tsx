import { useUIStore } from '@renderer/store/ui-store'
import React from 'react'

const CommandBar = () => {
    const { isCommandBarOpen, toggleCommandBar } = useUIStore();
    if (isCommandBarOpen) console.log("HI");
  return (
    <div>CommandBar</div>
  )
}

export default CommandBar