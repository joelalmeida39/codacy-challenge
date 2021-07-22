import React, { useContext, useEffect, useState, useRef } from 'react';
import { CommitListContext } from '../../Context/CommitListContext';
import './Results.css';
import { useOnScreen } from '../../services/useOnScreen.js';
import { getListCommits } from '../../services/githubService';

const Result = () => {

    const { data, setData } = useContext(CommitListContext);
    const [page, setPage] = useState(1);
    const ref = useRef();
    const loadMore = useOnScreen(ref);

    const renderResults = data.commitList.map((e) => {
        let parse = Date.parse(e.created);
        let date = new Date(parse);
        let finalFormat = `${date.getDate()}-${date.getMonth()}-${date.getUTCFullYear()}`;
        return (
            <div key={e.commit} className="IndividualResult FontResults">
                <img className="Avatar" src={e.picture} alt="" />
                <span className="AuthorResult">{e.author}</span>
                <span className="CommitResult">{e.commit}</span>
                <span className="MessageResult">{e.message}</span>
                <span className="CreatedResult">{finalFormat}</span>
            </div>)

    });

    const renderLastBlock = () => {
        if (data.end) {
            return (<span className="EndLabel">END</span>);
        } else if (data.searchResult) {
            return (<span className="EndLabel">MORE...</span>);
        } else {
            return (<img ref={ref} className="Loading" src="../images/loadingGif.gif" alt="" />);
        }
    }

    useEffect(() => {
        if (loadMore && (data.searchResult === undefined || !data.searchResult)) {
            getListCommits(data.url, page + 1).then(r => {
                let newResults = data.commitList.concat(r.commitList);
                setPage(page + 1);
                setData({
                    url: r.url,
                    erros: r.error,
                    commitList: newResults,
                    requested: r.requested,
                    end: r.end
                });
                if (r.end) setPage(1);
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loadMore]);

    return (
        <div>
            { data.commitList.length !== 0 || data.searchResult ?
                <div className="Results">
                    <span className="AuthorLabel LabelFont">AUTHOR</span>
                    <span className="CommitLabel LabelFont">COMMIT</span>
                    <span className="MessageLabel LabelFont">MESSAGE</span>
                    <span className="CreatedLabel LabelFont">CREATED</span>
                    <div className="ResutlsContent">
                        {renderResults}
                        {renderLastBlock()}
                    </div>

                </div>
                :
                <div>
                    <img className="EmptyResults" src="../images/Group 502.svg" alt="" />
                    {!data.requested ?
                        <span className="BeginLabel">Your commits will show up here</span> :
                        <span className="BeginLabel">We couldn’t get the commits for this repository</span>
                    }
                </div>

            }
        </div>


    )
}

export default Result;