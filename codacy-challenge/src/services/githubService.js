import { request } from "@octokit/request";

export const getListCommits = async (url, page) => {
    let commitList = [];
    if (!url || url.split('/').length < 2) {
        return {
            url: url,
            error: true,
            commitList: [],
            requested: false
        }
    }

    const splitedUrl = url.split('/');
    const user = splitedUrl[splitedUrl.length - 2];
    const repo = splitedUrl[splitedUrl.length - 1];

    const resp = await request(`GET /repos/${user}/${repo}/commits`, {
        owner: user,
        repo: repo,
        page: page
    }).catch(err => {
        return {
            url: url,
            error: true,
            commitList: [],
            requested: false
        }
    });

    if (resp.status !== 200) {
        return {
            url: url,
            error: true,
            commitList: [],
            requested: false
        }
    } else {
        if (resp.data) {
            resp.data.forEach(e => {
                commitList.push({
                    author: e.commit.author.name,
                    picture: e.author.avatar_url,
                    commit: e.sha.substring(0, 7),
                    message: e.commit.message,
                    created: e.commit.author.date,
                    end: (page === 1 && commitList.length < 30) ? true : false
                });
            });
        }
    }

    return {
        url: url,
        error: false,
        commitList: commitList,
        requested: true,
        end: (commitList.length === 0) ? true : false
    }

}

export const getSearchList = async (url, page, input, commitList) => {
    const splitedUrl = url.split('/');
    const user = splitedUrl[splitedUrl.length - 2];
    const repo = splitedUrl[splitedUrl.length - 1];
    let slicedArr = [];
    let endResults = false;

    const resp = await request(`GET /repos/${user}/${repo}/commits`, {
        owner: user,
        repo: repo,
        page: page,
        per_page: '15'
    }).catch(() => {
        return {
            url: url,
            error: true,
            commitList: [],
            requested: false
        }
    });

    if (resp.status !== 200) {
        return {
            url: url,
            error: true,
            commitList: [],
            requested: false
        }
    } else {
        if (resp.data.length !== 0) {
            resp.data.forEach(e => {

                if (
                    e.commit.author.name.search(input) !== -1 ||
                    e.sha.substring(0, 7).search(input) !== -1 ||
                    e.commit.message.search(input) !== -1
                ) {
                    commitList.push({
                        author: e.commit.author.name,
                        picture: e.author.avatar_url,
                        commit: e.sha.substring(0, 7),
                        message: e.commit.message,
                        created: e.commit.author.date
                    });
                }
            });

            if (commitList.length < 8) {
                return getSearchList(url, page + 1, input, commitList);
            } else {
                slicedArr = commitList.slice(0, 8);
            }
        } else {
            endResults = true;
        }
    }

    if (endResults) {
        return {
            url: url,
            error: false,
            commitList: commitList,
            requested: true,
            end: true,
            searchResult: true
        }
    }

    return {
        url: url,
        error: false,
        commitList: (slicedArr.length !== 0) ? slicedArr : commitList,
        requested: true,
        searchResult: true
    }


}