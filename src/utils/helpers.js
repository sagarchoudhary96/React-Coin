import React from 'react'
// Fetch Error 
// response {object}
export const handleResponse = (response) => {
    return response.json().then(json => {
        return response.ok ? json : Promise.reject(json)
    })
}


// render arrow helper
export const renderChangeArrow = (percent) => {
    if (percent > 0) {
        return <span className="percent-raised">{percent}% &uarr;</span>  
    } else if (percent < 0) {
        return <span className="percent-fallen">{percent}% &darr;</span>  
    } else {
        return <span>{percent}</span>
    }
}