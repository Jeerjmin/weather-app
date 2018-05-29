const defaultState = {
    data: [],
    photos: []
}


export const DataReducer = (state = defaultState, action) => {
    if (action.type === 'RECEIVE_POSTS') {

        let arrayvar = state.data.slice()
        let doubleCard = arrayvar.filter( x => x.name === action.value )

        if ( (doubleCard.length === 0) && (action.posts) ) {
                arrayvar.push(action.posts)
        }

        else if ((doubleCard.length === 1) && (action.posts)) {
            let index = arrayvar.indexOf(doubleCard[0])
            arrayvar[arrayvar.length] = arrayvar[index]
            arrayvar.splice(index,1)
        }




        return {...state, data: arrayvar}
    }


    if (action.type === 'RECEIVE_PHOTOS') {
        let arrayvar = state.photos.slice()

        let photoarray = {}
        photoarray.name = action.value
        photoarray.photo = action.photos.photos[0].image.web

        let doubleCard = arrayvar.filter( x => x.name === action.value )


        if (doubleCard.length === 0) {
            arrayvar.push(photoarray)
        }

        else if (doubleCard.length === 1)  {
            let index = arrayvar.indexOf(doubleCard[0])
            arrayvar[arrayvar.length] = arrayvar[index]
            arrayvar.splice(index,1)
        }


           return {...state, photos: arrayvar}


    }

    if (action.type === 'FAILURE_PHOTOS') {
        let arrayvar = state.photos.slice()

        let photoarray = {}
        photoarray.name = action.value
        photoarray.photo = action.photos


        let doubleCard = arrayvar.filter( x => x.name === action.value )


        if  (doubleCard.length === 0)     {
            arrayvar.push(photoarray)
        }

        else if (doubleCard.length === 1)  {
            let index = arrayvar.indexOf(doubleCard[0])
            arrayvar[arrayvar.length] = arrayvar[index]
            arrayvar.splice(index,1)
        }

        return {...state, photos: arrayvar}

    }

    if (action.type === 'DELETE_CARD') {

        let arraydata = state.data.slice()
        let arrayphotos = state.photos.slice()

        arraydata.splice(arraydata.length - action.index-1, 1)

        if (arrayphotos[arrayphotos.length - action.index-1]) {
            arrayphotos.splice(arrayphotos.length - action.index - 1, 1)
        }

        return {...state, data: arraydata, photos: arrayphotos}

    }

    return state;
};
