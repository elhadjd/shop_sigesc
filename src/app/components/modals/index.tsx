import React from 'react'

export default function DrawerModal({children}:{children: React.JSX.Element}) {
  return (
    <div className="relative z-50" aria-labelledby="modal-title" role="dialog" aria-modal="true">
    
        <div className="fixed top-0 inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            {children}
            </div>
        </div>
    </div>
  )
}
