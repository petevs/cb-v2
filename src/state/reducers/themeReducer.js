export const UPDATE_DRAWER = "UPDATE_DRAWER"
export const TOGGLE_THEME = "TOGGLE_THEME"

export const initialTheme = {

    //THEME
    themeSetting: 'dark',
    darkTheme: {
        body: '#161C24',
        fontColor: 'white',
        backgroundColor: 'rgb(33, 43, 54)',
        bgHover: '#2A343F',
        iconHover: '#21252E',
        colors: {
            green: '#408e36',
            red: '#f72e2f'
        }
    },
    lightTheme: {
        body: '#fff',
        fontColor: 'rgb(99, 115, 129)',
        backgroundColor: '#fff',
        bgHover: '#F7F7F8',
        iconHover: '#21252E',
        colors: {
            green: '#408e36',
            red: '#f72e2f'
        }
    },
    theme: function(){
        if(this.themeSetting === 'dark'){
            return this.darkTheme
        }
        else return this.lightTheme
    },

    //DRAWER
    drawer: false,

}

export const themeReducer = (state, action) => {
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