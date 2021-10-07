import React from 'react'

const EditButton = (props) => {

    const handleClick = () => {
        console.log(props)
    }

    return (
        <button onClick={handleClick}>
            Edit
        </button>
    )
}

export default EditButton
