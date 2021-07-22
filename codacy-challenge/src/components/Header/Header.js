import React, { useContext, useEffect, useState } from 'react';
import './Header.css';
import { getListCommits } from '../../services/githubService.js';
import { CommitListContext } from '../../Context/CommitListContext';

const Header = () => {

    const [url, setUrl] = useState('');
    const [isResutlKO, setResutlKO] = useState(false);
    const { data, setData } = useContext(CommitListContext);

    const loadCommits = async () => {
        let resp = await getListCommits(url, 1);
        setResutlKO(resp.error);
        setData({
            url: resp.url,
            erros: resp.error,
            commitList: resp.commitList,
            requested: resp.requested,
            end: resp.end
        });
    }

    useEffect(() => {
        if (isResutlKO) setUrl('This URL is not Valide!');
    }, [isResutlKO, data])

    const cleanInputOnError = () => {
        if (url === 'This URL is not Valide!') {
            setUrl('');
            setResutlKO(false);
        }
    }

    return (
        <div className="Header">
            <img className="Logo" src="../images/codacy-logo.svg" alt="logo" />
            <span className="UrlSearchLabel">Respository url</span>
            <input onClick={cleanInputOnError} onChange={e => setUrl(e.target.value)} className={isResutlKO ? 'UrlSearchInputError' : 'UrlSearchInput'} placeholder="Add your repository URL here" value={url} />
            <button onClick={loadCommits} className="ButtonLoadCommits">Load commits</button>
        </div>
    )
}

export default Header;