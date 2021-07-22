import React, { useContext } from 'react';
import './Search.css';
import { CommitListContext } from '../../Context/CommitListContext'
import { getSearchList } from '../../services/githubService';

const Search = () => {

    const { data, setData } = useContext(CommitListContext);

    const search = async (value) => {

        if (value.length >= 3) {
            const resp = await getSearchList(data.url, 1, value, []);
            setData({
                url: resp.url,
                erros: resp.error,
                commitList: resp.commitList,
                requested: resp.requested,
                end: resp.end,
                searchResult: resp.searchResult
            });
        }

    }

    return (
        <div className="Search">
            <span className="ComListLabel">Commits List</span>
            {(data.commitList.length !== 0 || data.searchResult) &&
                <div>
                    <span className="SearchLabel">Search</span>
                    <input onChange={e => search(e.target.value)} className="SearchInput" placeholder="Search" />
                </div>
            }

        </div>
    )
}

export default Search;