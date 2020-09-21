import React from 'react'
import './PortofolioMe.scss'
import { ReactComponent as AvatarIcon} from '../../images/Avatar.svg'
const PortolioMe = (props) => {
    return (
        <div className="portofolio-me">
            <div className="title">
                Front-end & Back-end Developer
            </div>
            <div className="about">
                I manage data and code beautifully simple things, and I love what I do.
            </div>
            <div className="mt-8">
                <AvatarIcon/>
            </div>
        </div>
    )
}

export default React.memo(PortolioMe)