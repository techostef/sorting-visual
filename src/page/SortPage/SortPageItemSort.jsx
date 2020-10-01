import React from 'react'

const SortPageItemSort = props => {
    return (
        <div 
            id={`#sort-item-${props.index}`} 
            className={`item ${props.sortingWhenRunning} ${props.swappingWhenRunning} ${props.sorted}`} 
            style={{height: `${(props.item * 2)}px`}}>
                {/* {props.item} */}
        </div>
    )
}

export default React.memo(SortPageItemSort)