export const ActionList = [
    "LOGIN",
    "LOGOUT", 
    "UPDATE_USER",
    "START_MAP",
    "REMOVE_MAP", 
    "CREATE_BUILDING",
    "OPEN_BUILDING",
    "CLOSE_BUILDING",
    "UPDATE_BUILDING",
    "DELETE_BUILDING",
    "UPLOAD_MODEL",
    "START_MODEL",
    "DELETE_MODEL",
    "EXPLODE_MODEL",
] as const;

type ActionListType = typeof ActionList;

export type ActionType = ActionListType[number];

export interface Action {
    type: ActionType;
    payload?: any;
}