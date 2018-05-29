export const citySearch = (value) => ({
    type: "SEARCH",
    value: value
})


export const deleteCard = (index) => ({
    type: "DELETE_CARD",
    index: index
})

export function requestPosts(){
    return {
        type: "REQUEST_POSTS"
    }
}

export function receivePosts(json, value) {
    return {
        type: "RECEIVE_POSTS",
        posts: json,
        value: value,
        receivedAt: Date.now(),

    }
}

export function failurePosts() {
    return {
        type: "FAILURE_POSTS",
    }
}


export function requestPhotos(){
    return {
        type: "REQUEST_PHOTOS"
    }
}

export function receivePhotos(json, value) {
    return {
        type: "RECEIVE_PHOTOS",
        photos: json,
        value: value,
        receivedAt: Date.now(),

    }
}

export function failurePhotos(value) {
    return {
        type: "FAILURE_PHOTOS",
        photos: "http://tutinteresno.com/wp-content/uploads/2015/10/nrgruplxira.jpg",
        value: value,
        receivedAt: Date.now(),

    }
}

export function fetchPosts(value, valueLower) {
    return function (dispatch) {
        dispatch(requestPosts())

        const t = {name:value, key:'ea75f4e5608b77f28ed2e7aacfad09c9'};

        var request = new Request
        ('http://api.openweathermap.org/data/2.5/weather?q='+t.name+'&appid='+t.key, {
          	method: 'GET',
          	mode: 'cors'
        });


        return (

           fetch(request)
               .then(response => {
                   if (response.ok) {
                       dispatch(fetchPhotos(valueLower, value))
                       return response.json()
                   }
                   else
                       alert("Не верно указан город")
               })

               .then((json) => {
                   return dispatch(receivePosts(json, value));
               }

               )


        )


    }
}


export function fetchPhotos(valueLower, value) {
    return function(dispatch) {
        dispatch(requestPhotos())

        var request = new Request
        ('https://api.teleport.org/api/urban_areas/slug:'+valueLower+'/images/', {
            method: 'GET',
            mode: 'cors'
        });

        return(

           fetch(request)
                .then(response => response.json())
                .then(json => dispatch(receivePhotos(json, value)))
                .catch(err => dispatch(failurePhotos(value)) )


        )
    }
}
