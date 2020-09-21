import React from 'react'
import SortPageContent from './SortPageContent'
import SortPageHeader from './SortPageHeader'

const SortPage = (props) => {
    return (
        <div className="sort-container">
            <SortPageHeader/>
            <SortPageContent/>
        </div>
    )
}

export default React.memo(SortPage)