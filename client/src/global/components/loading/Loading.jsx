import React from 'react'
import { Vortex } from 'react-loader-spinner'
function Loading() {
    return (
        <Vortex
            visible={true}
            height="80"
            width="80"
            ariaLabel="vortex-loading"
            wrapperStyle={{}}
            wrapperClass="vortex-wrapper"
            colors={['black', 'black', 'black', 'black', 'black', 'black']}
        />
    )
}

export default Loading