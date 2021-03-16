interface IState{
    employeeData: Array<any>;
}

interface IAction {
    type: string;
    payload: {
        employeeData: Array<any>;
    }
}

const initialState : IState = {
    employeeData: []
};

const employeeReducer = (state=initialState, action:IAction) => {

switch (action.type){
    case "GET_EMPLOYEES":
        return {
            ...state,
            employeeData: action.payload.employeeData
        }
    case "ADD_EMPLOYEES":
        return {
            ...state,
            employeeData: state.employeeData.concat(action.payload.employeeData)
        }

    case "EDIT_EMPLOYEES":
        return {
            ...state,
            employeeData: action.payload.employeeData
        }
    case 'DELETE_EMPLOYEES':
        return{
            employeeData: action.payload.employeeData
        }
        
        default:
            return {
                ...state
            }
    }
}

export default employeeReducer;