import { UPDATE_DRAWER} from "state/reducers/appReducer";

export const updateDrawer = (data) => {
    return { type: UPDATE_DRAWER, payload: data}
}