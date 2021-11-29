import React from 'react'

export default function Container({ children, ...props }) {
    return (
        <div className="formContentUgest">
            <div>
                { children }
            </div>
            <div>
                test
            </div>
        </div>
    )
}
