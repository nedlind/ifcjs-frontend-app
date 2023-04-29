export type ActionType = 
// User Auth
    | "LOGIN" 
    | "LOGOUT" 
    | "UPDATE_USER"
    // Map
    | "START_MAP" 
    | "REMOVE_MAP" 
    | "CREATE_BUILDING"
    //Building
    | "OPEN_BUILDING"
    | "CLOSE_BUILDING";

export interface Action {
    type: ActionType;
    payload?: any;
}