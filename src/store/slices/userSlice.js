import {
    createSlice,
    createAsyncThunk,
} from "@reduxjs/toolkit";
import axios from "axios";
import 'react-toastify/dist/ReactToastify.css';
import {extraReducers} from "../reducer/userReducer"

axios.defaults.baseURL = process.env.REACT_APP_APIURL
const user = JSON.parse(localStorage.getItem('user')) ? JSON.parse(localStorage.getItem('user')) : null
console.log("useSlice user:",user)
axios.defaults.headers.common['Authorization'] = `Bearer ${user?.user_authentication}`;
const initialState = {
    status: 'idle', //'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
    user: user,
    terms: null,
    privacy: null,
    dashboard: null,
  
   
}
export const signinUser = createAsyncThunk('admin/login', async (bodyData, { rejectWithValue }) => {
    try {
        const response = await axios.post(`admin/login`, bodyData)
        console.log(response)
        return response.data
    } catch (error) {
        console.log(error)
        return rejectWithValue(error.response)
    }
})

export const dashboard = createAsyncThunk('admin/dashboard-data', async (bodyData = null, { rejectWithValue }) => {
    try {
        const response = await axios.get(`admin/dashboard-data`)
        console.log("Admin dashboard : ",response.data)
        return response.data
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})

// export const recentCampaigns = createAsyncThunk('admin/recentCampaigns', async (bodyData = null, { rejectWithValue }) => {
//     try {
//         const response = await axios.get(`admin/recentCampaigns`)
//         return response.data
//     } catch (error) {
//         return rejectWithValue(error.response.data)
//     }
// })

export const getAllUsers = createAsyncThunk('admin/users', async (bodyData = null, { rejectWithValue }) => {
    try {
        const response = await axios.get(`admin/users`)
        console.log(response.data)
        return response.data
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})

export const getAllTherapists = createAsyncThunk('admin/therapists', async (bodyData = null, { rejectWithValue }) => {
    try {
        const response = await axios.get(`admin/therapists`)
        return response.data
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})

export const getAllCourses = createAsyncThunk('admin/course-list', async (id, { rejectWithValue }) => {
    try {
        const response = await axios.get(`admin/course-list/${id}`)
        return response.data
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})


export const getQuiz = createAsyncThunk('admin/quize-details', async (id, { rejectWithValue }) => {
    try {
        const response = await axios.get(`admin/quize-details/${id}`)
        return response.data
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})

export const getAllSubscribeUsers = createAsyncThunk('admin/subscribe-users', async (bodyData = null, { rejectWithValue }) => {
    try {
        const response = await axios.get(`admin/subscribe-users`)
        return response.data
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})


export const getTransaction = createAsyncThunk('admin/transaction-statics', async (bodyData = null, { rejectWithValue }) => {
    try {
        const response = await axios.get(`admin/transaction-statics`)
        return response.data
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})

export const createNewTutor = createAsyncThunk('admin/add-tutor', async (bodyData, { rejectWithValue }) => {
    try {
        const response = await axios.post(`admin/add-tutor`, bodyData)
        return response
    } catch (error) {
        return rejectWithValue(error.response)
    }
})

export const updateHourlyRate = createAsyncThunk('admin/update-hourly-rate', async (bodyData, { rejectWithValue }) => {
    try {
        const response = await axios.post(`admin/update-hourly-rate`, bodyData)
        return response
    } catch (error) {
        return rejectWithValue(error.response)
    }
})
// export const getMarketPlace = createAsyncThunk('admin/allMarketPlaceAds', async (bodyData = null, { rejectWithValue }) => {
//     try {
//         const response = await axios.get(`admin/allMarketPlaceAds`)
//         return response.data
//     } catch (error) {
//         return rejectWithValue(error.response.data)
//     }
// })

// export const approveDisapproveAd = createAsyncThunk('admin/approveDisapproveAd', async (bodyData, { rejectWithValue }) => {
//     try {
//         const response = await axios.post(`admin/approveDisapproveAd/${bodyData.id}`, bodyData)
//         return response.data
//     } catch (error) {
//         return rejectWithValue(error.response.data)
//     }
// })

// export const getReportedPosts = createAsyncThunk('admin/getReportedPosts', async (bodyData = null, { rejectWithValue }) => {
//     try {
//         const response = await axios.get(`admin/getReportedPosts`)
//         return response.data
//     } catch (error) {
//         return rejectWithValue(error.response.data)
//     }
// })

// export const approveDisapproveReport = createAsyncThunk('admin/approveDisapproveReport', async (bodyData, { rejectWithValue }) => {
//     try {
//         const response = await axios.post(`admin/approveDisapproveReport/${bodyData.id}`, bodyData)
//         return response.data
//     } catch (error) {
//         return rejectWithValue(error.response.data)
//     }
// })

export const deleteAccount = createAsyncThunk('admin/deleteAccount', async (id, { rejectWithValue }) => {
    try {
        const response = await axios.delete(`admin/deleteAccount/${id}`)
        return response.data
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})

export const blockunblock = createAsyncThunk('admin/blockunblock', async (id, { rejectWithValue }) => {
    try {
        const response = await axios.get(`admin/blockunblock/${id}`)
        return response.data
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})

export const updatePassword = createAsyncThunk('admin/updatePassword', async (bodyData, { rejectWithValue }) => {
    try {
        const response = await axios.post(`admin/updatePassword`, bodyData)
        return response.data
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})


export const updateTerms = createAsyncThunk('admin/updateContent/terms_and_conditions', async (bodyData, { rejectWithValue }) => {
    try {
        const response = await axios.post(`admin/updateContent/terms_and_conditions`, bodyData)
        return response.data
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})
export const updatePrivacy = createAsyncThunk('admin/updateContent/privacy_policy', async (bodyData, { rejectWithValue }) => {
    try {
        const response = await axios.post(`admin/updateContent/privacy_policy`, bodyData)
        return response.data
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})
export const notification = createAsyncThunk('admin/unotifications', async (bodyData, { rejectWithValue }) => {
    try {
        const response = await axios.post(`admin/notifications`, bodyData)
        return response.data
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})

export const userLogout = createAsyncThunk('admin/signout', async (bodyData, { rejectWithValue }) => {
    try {
        const response = await axios.post(`admin/signout` ,bodyData)
        return response.data
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})



export const terms = createAsyncThunk('admin/content/terms_and_conditions', async (id, { rejectWithValue }) => {
    try {
        const response = await axios.get(`admin/content/terms_and_conditions`)
        console.log(response.data.data.content)
        return response.data.data
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})
export const privacy = createAsyncThunk('admin/content/privacy_policy', async (id, { rejectWithValue }) => {
    try {
        const response = await axios.get(`admin/content/privacy_policy`)
        console.log(response.data.data.content)
        return response.data.data
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})

// export const addCategory = createAsyncThunk('admin/categories', async (category, { rejectWithValue }) => {
//     try {

//         const response = await axios.post(`admin/categories`, category)
//         return response.data
//     } catch (error) {
//         return rejectWithValue(error.response.data)
//     }
// })


// export const getCategory = createAsyncThunk('admin/allCategories', async (category, { rejectWithValue }) => {
//     try {

//         const response = await axios.get(`/allCategories`)
//         return response.data
//     } catch (error) {
//         return rejectWithValue(error.response.data)
//     }
// })

// export const deleteCategory = createAsyncThunk('admin/deletecategory', async (id, { rejectWithValue }) => {
//     try {
//         const response = await axios.delete(`admin/deletecategory/${id}`)
//         return response.data
//     } catch (error) {
//         return rejectWithValue(error.response.data)
//     }
// })


const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        token: (state) => {
            var user = JSON.parse(localStorage.getItem('user'));
            if (user) {
                state.user = user
            }
        }
    },
    extraReducers
})
export const getUserStatus = (state) => state?.users?.status;
export const getUserError = (state) => state?.users?.error;
export const getUsertoken = (state) => state?.users?.user?.user_authentication;
export const getProfile = (state) => state?.users?.user;
export const getTerms = (state) => state?.users?.terms;
export const getPrivacy = (state) => state?.users?.privacy;
export const getAllCategories = (state) => state?.users?.categories;
export const getAllCharges = (state) => state?.users?.charges;
export const getDashboard = (state) => state?.users?.dashboard;
export const getareaChart = (state) => state?.users?.areaChart;
export const getlineChart = (state) => state?.users?.lineChart;
export const getcampaigns = (state) => state?.users?.campaigns;

export const { token } = userSlice.actions

export default userSlice.reducer