import axios from 'axios';

const baseUrl = `https://localhost:44370/api/Employees`

export const loadEmployees = () => async (dispatch: any) => {

    const {data} = await axios.get(baseUrl);
    
    dispatch({
        type: "GET_EMPLOYEES",
        payload: {
            employeeData: data
        }
    });
}

export const addEmployees = (requestBody: any) => async (dispatch: any) => {

        const {data} = await axios.post(baseUrl, requestBody);        
        dispatch({ 
            type: "ADD_EMPLOYEES",
            payload: {
                 employeeData: data
            }
         });
    
}

export const editEmployees = (requestBody: any, values: any)=> async (dispatch: any) => {
    console.log(values, values.employeeId);
    await axios.put(`${baseUrl}/${values.employeeId}`, values);
    dispatch({
        type: "EDIT_EMPLOYEES",
        payload: {
            employeeData: requestBody
        }
    });

}

export const deleteEmployees = ( filteredData: any,requestBody: any) => async (dispatch: any) => {
    await axios.delete(`${baseUrl}/${requestBody.employeeId}`);
    dispatch({ 
        type: "DELETE_EMPLOYEES",
        payload: {
            employeeData: filteredData
        }
    });
}

