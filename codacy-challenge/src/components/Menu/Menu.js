import React from 'react';
import './Menu.css';
import MenuItem from './MenuItem/MenuItem';
import MenuItens from './MenuItem/MenuItens.json'

const Menu = () => {
    const labelTeam = '< Team';
    return (
        <div className="Menu">
            <div className="DivTeam">
                <span className="SpanTeam">{labelTeam}</span>
            </div>
            <MenuItem imgSrc={MenuItens.dash.src} label={MenuItens.dash.label} />
            <MenuItem imgSrc={MenuItens.commits.src} label={MenuItens.commits.label} />
            <MenuItem imgSrc={MenuItens.files.src} label={MenuItens.files.label} />
            <MenuItem imgSrc={MenuItens.issues.src} label={MenuItens.issues.label} />
            <div className="BorderBot">
                <MenuItem imgSrc={MenuItens.pullRequests.src} label={MenuItens.pullRequests.label} />
            </div>
            <MenuItem imgSrc={MenuItens.codePatterns.src} label={MenuItens.codePatterns.label} />
            <MenuItem imgSrc={MenuItens.settings.src} label={MenuItens.settings.label} />
        </div>
    )
}

export default Menu;