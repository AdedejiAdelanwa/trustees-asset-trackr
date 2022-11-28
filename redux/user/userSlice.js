import {createSlice} from "@reduxjs/toolkit";
import { signupUser } from "./userActions";

const initialState = {
    loading: false,
    userInfo: {}, 
    userToken: null,
    error: null,
    success: false, 
  }

  const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {},
    extraReducers: (builder)=>{
        builder.addCase(signupUser.pending, (state, { payload })=>{
            state.loading = true;
            state.error = null; 
        })
        builder.addCase(signupUser.fulfilled, (state, { payload })=>{
            state.loading = false;
            state.error = null;
            state.userInfo = payload

        })
        builder.addCase(signupUser.rejected, (state, { payload })=>{
            state.loading = false;
            state.error = payload;
           

        })
    }
    // extraReducers: {
    //     [signupUser.pending]: (state) => {
    //         state.loading = true;
    //         state.error = null;
    //     },
    //     [signupUser.fulfilled]: (state, { payload} )=>{
    //         state.loading = false;
    //         state.success = true;
    //         state.userInfo = payload;

    //     },
    //     [signupUser.rejected]: (state, { payload })=>{
    //         state.loading = false;
    //         state.error = payload;
           
    //     }

    // }
  })

  export default userSlice.reducer