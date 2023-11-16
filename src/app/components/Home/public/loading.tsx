import React from 'react'

export default function Loading() {
  return (
    <div className='flex justify-center items-center w-full'>
        <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="45" fill="none" stroke="#4c6696" stroke-width="8">
            <animate attributeName="r" from="10" to="45" dur="0.8s" begin="0s" repeatCount="indefinite" />
        </circle>
        </svg>
        {/* <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="40" fill="none" stroke="#0073e6" stroke-width="8">
            <animate attributeName="r" from="20" to="40" dur="1s" begin="0s" repeatCount="indefinite" />
        </circle>
        <circle cx="50" cy="50" r="20" fill="none" stroke="#ff6347" stroke-width="8">
            <animate attributeName="r" from="40" to="20" dur="1s" begin="0s" repeatCount="indefinite" />
        </circle>
        </svg> */}

    </div>
  )
}
