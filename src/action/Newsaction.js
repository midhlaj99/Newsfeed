import axios from 'axios'


export function setNewsData(name, value) {
    return {
        type: 'SET_NEWS_DATA',
        payload: { [name]: value },
    }
}


export function ListAllNews(){
    return function(dispatch){
        dispatch({type:'NEWS_REQUEST_INITIATE'})

        axios.get('https://api.nytimes.com/svc/mostpopular/v2/viewed/1.json?api-key=VAqPW5YIBqPYAAjhNVi5K5VUeOh4fIAZ')
            .then(response => {
                // let data=response.data
                dispatch({ type: 'NEWS_REQUEST_TERMINATE', payload: { NewsArray:response.data ? response.data.results:[]  }})
                
            })
            .catch(err => {
                dispatch({ type: 'NEWS_REQUEST_TERMINATE', payload: { NewsArray:[] }})
            })
    }
}

export function SearchNews(search){
    let keyword=search
    return function(dispatch){
        dispatch({type:'NEWS_REQUEST_INITIATE'})

        axios.get('https://api.nytimes.com/svc/search/v2/articlesearch.json?q='+keyword+'&api-key=VAqPW5YIBqPYAAjhNVi5K5VUeOh4fIAZ')
            .then(response => {
                // let data=response.data
                dispatch({ type: 'NEWS_REQUEST_TERMINATE', payload: { NewsArray:response.data }})
                
            })
            .catch(err => {
                dispatch({ type: 'NEWS_REQUEST_TERMINATE', payload: { NewsArray:[] }})
            })
    }
}
