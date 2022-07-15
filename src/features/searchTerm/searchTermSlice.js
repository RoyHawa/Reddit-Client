import {createSlice} from '@reduxjs/toolkit';

//slice,create selectors,reducers,actions
//export all


//payload:searchTerm

const searchTermSlice=createSlice({
    name:'searchTerm',
    initialState:'',
    reducers:{
        search:(state,action)=>{
            //state.filter()
        }
    }
})