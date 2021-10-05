export const UPDATE_DRAWER = "UPDATE_DRAWER"
export const TOGGLE_THEME = "TOGGLE_THEME"

export const initialApp = {

    //THEME
    themeSetting: 'dark',
    darkTheme: {
        body: 'black',
        fontColor: 'white',
        backgroundColor: 'rgb(33, 43, 54)',
        bgHover: '#2A343F',
        colors: {
            green: '#408e36',
            red: '#f72e2f'
        }
    },
    lightTheme: {
        body: '#fff',
        fontColor: 'black'
    },
    theme: function(){
        if(this.themeSetting === 'dark'){
            return this.darkTheme
        }
        else return this.lightTheme
    },

    //DRAWER
    drawer: false
}

export const appReducer = (state, action) => {
    switch(action.type) {
        case TOGGLE_THEME:
            return {
                ...state,
                themeSetting: action.payload
            };
        case UPDATE_DRAWER:
            return {
                ...state,
                drawer: action.payload
            };
        default:
            return state;
    }
}