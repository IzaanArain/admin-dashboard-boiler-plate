import { toast } from 'react-toastify';
import axios from "axios";
import { addCategory, approveDisapproveAd, approveDisapproveReport, blockunblock, blockUnblock, dashboard, deleteAccount, createNewTutor, updateHourlyRate, deleteCategory, getAllBusiness, getAllTutors, getAllUsers, getCategory, getMarketPlace, getReportedPosts, Pp, privacy, recentCampaigns, signinUser, Tc, TcPp, terms, updatePassword, updatePp, updatePrivacy, updateTc, updateTcpp, updateTerms, userLogout, getAllCourses, getAllSubscribeUsers, getTransaction, getQuiz, getAllTherapists, notification } from "../slices/userSlice"
export const extraReducers = (builder) => {
    builder


        // Sign In
        .addCase(signinUser.pending, (state, action) => {
            state.status = 'loading'
        })
        .addCase(signinUser.fulfilled, (state, action) => {
            state.status = 'succeeded'
            toast.success(action.payload.message, {
                position: toast.POSITION.TOP_RIGHT
            });
            localStorage.setItem("user", JSON.stringify(action?.payload?.data));
            state.user = action?.payload?.data
            // console.log("useReduser user:",state.user)
            axios.defaults.headers.common['Authorization'] = `Bearer ${action?.payload?.data?.user_authentication}`;

            state.error = null
        })
        .addCase(signinUser.rejected, (state, action) => {
            state.status = 'failed'
            state.error = action?.payload?.message
            toast.error(action?.payload?.data?.message, {
                position: toast.POSITION.TOP_RIGHT
            });
        })


        // Dashboard
        .addCase(dashboard.pending, (state, action) => {
            state.status = 'loading'
        })
        .addCase(dashboard.fulfilled, (state, action) => {
            state.status = 'succeeded'
            state.error = null
            // console.log('state', action.payload.data)
            state.dashboard = { usersCount: action.payload.data.totalUsers, users: action.payload.data.users, therapists: action.payload.data.therapists, androidCount: action.payload.data.android, iosCount: action.payload.data.ios, }
            state.lineChart = action.payload.data.products
            console.log(state.dashboard)
            state.areaChart = action.payload.data.featured
        })
        .addCase(dashboard.rejected, (state, action) => {
            state.status = 'failed'
            state.error = action.payload.message
        })


        // Recent Campaigns
        // .addCase(recentCampaigns.pending, (state, action) => {
        //     state.status = 'loading'
        // })
        // .addCase(recentCampaigns.fulfilled, (state, action) => {
        //     state.status = 'succeeded'
        //     state.error = null
        //     state.campaigns = action.payload.campaigns
        // })
        // .addCase(recentCampaigns.rejected, (state, action) => {
        //     state.status = 'failed'
        //     state.error = action.payload.message
        // })


        // update Password
        .addCase(updatePassword.pending, (state, action) => {
            state.status = 'loading'
        })
        .addCase(updatePassword.fulfilled, (state, action) => {
            state.status = 'succeeded'
            state.error = null
            toast.success(action.payload.message, {
                position: toast.POSITION.TOP_RIGHT
            });
        })
        .addCase(updatePassword.rejected, (state, action) => {
            state.status = 'failed'
            state.error = action.payload.message
            toast.error(action.payload.message, {
                position: toast.POSITION.TOP_RIGHT
            });
        })


        // Get Users
        .addCase(getAllUsers.pending, (state, action) => {
            state.status = 'loading'
        })
        .addCase(getAllUsers.fulfilled, (state, action) => {
            state.status = 'succeeded'
            state.error = null

        })
        .addCase(getAllUsers.rejected, (state, action) => {
            state.status = 'failed'
            state.error = action.payload.message
        })


        // Get Tutors
        .addCase(getAllTherapists.pending, (state, action) => {
            state.status = 'loading'
        })
        .addCase(getAllTherapists.fulfilled, (state, action) => {
            state.status = 'succeeded'
            state.error = null
        })
        .addCase(getAllTherapists.rejected, (state, action) => {
            state.status = 'failed'
            state.error = action.payload.message
        })


        .addCase(getAllCourses.pending, (state, action) => {
            state.status = 'loading'
        })
        .addCase(getAllCourses.fulfilled, (state, action) => {
            state.status = 'succeeded'
            state.error = null
            // toast.success(action.payload.message, {
            //     position: toast.POSITION.TOP_RIGHT
            // });
        })
        .addCase(getAllCourses.rejected, (state, action) => {
            state.status = 'failed'
            state.error = action.payload.message
            // toast.error(action.payload.message, {
            //     position: toast.POSITION.TOP_RIGHT
            // });
        })
        
        
        .addCase(getQuiz.pending, (state, action) => {
            state.status = 'loading'
        })
        .addCase(getQuiz.fulfilled, (state, action) => {
            state.status = 'succeeded'
            state.error = null
            // toast.success(action.payload.message, {
            //     position: toast.POSITION.TOP_RIGHT
            // });
        })
        .addCase(getQuiz.rejected, (state, action) => {
            state.status = 'failed'
            state.error = action.payload.message
            // toast.error(action.payload.message, {
            //     position: toast.POSITION.TOP_RIGHT
            // });
        })
        
        
        .addCase(getAllSubscribeUsers.pending, (state, action) => {
            state.status = 'loading'
        })
        .addCase(getAllSubscribeUsers.fulfilled, (state, action) => {
            state.status = 'succeeded'
            state.error = null
            // toast.success(action.payload.message, {
            //     position: toast.POSITION.TOP_RIGHT
            // });
        })
        .addCase(getAllSubscribeUsers.rejected, (state, action) => {
            state.status = 'failed'
            state.error = action.payload.message
            // toast.error(action.payload.message, {
            //     position: toast.POSITION.TOP_RIGHT
            // });
        })
        
        
        .addCase(getTransaction.pending, (state, action) => {
            state.status = 'loading'
        })
        .addCase(getTransaction.fulfilled, (state, action) => {
            state.status = 'succeeded'
            state.error = null
            // toast.success(action.payload.message, {
            //     position: toast.POSITION.TOP_RIGHT
            // });
        })
        .addCase(getTransaction.rejected, (state, action) => {
            state.status = 'failed'
            state.error = action.payload.message
            // toast.error(action.payload.message, {
            //     position: toast.POSITION.TOP_RIGHT
            // });
        })


        // add new driver
        .addCase(createNewTutor.pending, (state, action) => {
            state.status = 'loading'
        })
        .addCase(createNewTutor.fulfilled, (state, action) => {
            state.status = 'succeeded'
            state.error = null
            toast.success(action.payload.data.message);

        })
        .addCase(createNewTutor.rejected, (state, action) => {
            state.status = 'failed'
            if (action.payload.status == 401) {
                state.error = action.payload.status
            } else {
                state.error = action.payload.data.message
                toast.error(action.payload.data.message);
            }
        })

                // add new driver
                .addCase(updateHourlyRate.pending, (state, action) => {
                    state.status = 'loading'
                })
                .addCase(updateHourlyRate.fulfilled, (state, action) => {
                    state.status = 'succeeded'
                    state.error = null
                    toast.success(action.payload.data.message);
        
                })
                .addCase(updateHourlyRate.rejected, (state, action) => {
                    state.status = 'failed'
                    if (action.payload.status == 401) {
                        state.error = action.payload.status
                    } else {
                        state.error = action.payload.data.message
                        toast.error(action.payload.data.message);
                    }
                })


        // Get Ads
        // .addCase(getMarketPlace.pending, (state, action) => {
        //     state.status = 'loading'
        // })
        // .addCase(getMarketPlace.fulfilled, (state, action) => {
        //     state.status = 'succeeded'
        //     state.error = null
        // })
        // .addCase(getMarketPlace.rejected, (state, action) => {
        //     state.status = 'failed'
        //     state.error = action.payload.message
        // })

        // Ads Management
        // .addCase(approveDisapproveAd.pending, (state, action) => {
        //     state.status = 'loading'
        // })
        // .addCase(approveDisapproveAd.fulfilled, (state, action) => {
        //     state.status = 'succeeded'
        //     state.error = null
        //     toast.success(action.payload.message, {
        //         position: toast.POSITION.TOP_RIGHT
        //     });
        // })
        // .addCase(approveDisapproveAd.rejected, (state, action) => {
        //     state.status = 'failed'
        //     state.error = action.payload.message
        // })

        // Get Reported Posts
        // .addCase(getReportedPosts.pending, (state, action) => {
        //     state.status = 'loading'
        // })
        // .addCase(getReportedPosts.fulfilled, (state, action) => {
        //     state.status = 'succeeded'
        //     state.error = null
        // })
        // .addCase(getReportedPosts.rejected, (state, action) => {
        //     state.status = 'failed'
        //     state.error = action.payload.message
        // }) 

        // Report Management
        // .addCase(approveDisapproveReport.pending, (state, action) => {
        //     state.status = 'loading'
        // })
        // .addCase(approveDisapproveReport.fulfilled, (state, action) => {
        //     state.status = 'succeeded'
        //     state.error = null
        //     toast.success(action.payload.message, {
        //         position: toast.POSITION.TOP_RIGHT
        //     });
        // })
        // .addCase(approveDisapproveReport.rejected, (state, action) => {
        //     state.status = 'failed'
        //     state.error = action.payload.message
        // })

        // Delete Account
        .addCase(deleteAccount.pending, (state, action) => {
            state.status = 'loading'
        })
        .addCase(deleteAccount.fulfilled, (state, action) => {
            state.status = 'succeeded'
            state.error = null
            toast.success(action.payload.message, {
                position: toast.POSITION.TOP_RIGHT
            });
        })
        .addCase(deleteAccount.rejected, (state, action) => {
            state.status = 'failed'
            state.error = action.payload.message
            toast.error(action.payload.message, {
                position: toast.POSITION.TOP_RIGHT
            });
        })


        // Block unBlock
        .addCase(blockunblock.pending, (state, action) => {
            state.status = 'loading'
        })
        .addCase(blockunblock.fulfilled, (state, action) => {
            state.status = 'succeeded'
            state.error = null
            toast.success(action.payload.message, {
                position: toast.POSITION.TOP_RIGHT
            });
        })
        .addCase(blockunblock.rejected, (state, action) => {
            state.status = 'failed'
            state.error = action.payload.message
            toast.error(action.payload.message, {
                position: toast.POSITION.TOP_RIGHT
            });
        })


        // Log Out
        .addCase(userLogout.pending, (state, action) => {
            state.status = 'loading'
        })
        .addCase(userLogout.fulfilled, (state, action) => {
            toast.success(action.payload.message, {
                position: toast.POSITION.TOP_RIGHT
            });
            localStorage.clear();
            state.status = 'succeeded'
            state.user = null
            state.error = null
            state.TcPp = null
            state.categories = null
            state.dashboard = null
            state.lineChart = null
            state.areaChart = null
            state.charges = null
            state.campaigns = null
        })
        .addCase(userLogout.rejected, (state, action) => {
            toast.error(action.payload.message, {
                position: toast.POSITION.TOP_RIGHT
            });
            state.status = 'failed'
            state.error = action.payload.message
        })


        // Get TcPp
        .addCase(terms.pending, (state, action) => {
            state.status = 'loading'
        })
        .addCase(terms.fulfilled, (state, action) => {
            state.status = 'succeeded'
            state.error = null
            state.terms = action.payload
        })
        .addCase(terms.rejected, (state, action) => {
            state.status = 'failed'
            state.error = action.payload.message
        })
        // Get TcPp
        .addCase(privacy.pending, (state, action) => {
            state.status = 'loading'
        })
        .addCase(privacy.fulfilled, (state, action) => {
            state.status = 'succeeded'
            state.error = null
            state.privacy = action.payload
        })
        .addCase(privacy.rejected, (state, action) => {
            state.status = 'failed'
            state.error = action.payload.message
        })


        // Update TcPp
        .addCase(updateTerms.pending, (state, action) => {
            state.status = 'loading'
        })
        .addCase(updateTerms.fulfilled, (state, action) => {
            state.status = 'succeeded'
            state.error = null
            state.privacy = action.payload
            toast.success(action.payload.message)
        })
        .addCase(updateTerms.rejected, (state, action) => {
            state.status = 'failed'
            state.error = action.payload.message
        })
        // Update TcPp
        .addCase(updatePrivacy.pending, (state, action) => {
            state.status = 'loading'
        })
        .addCase(updatePrivacy.fulfilled, (state, action) => {
            state.status = 'succeeded'
            state.error = null
            state.terms = action.payload
            toast.success(action.payload.message)
        })
        .addCase(updatePrivacy.rejected, (state, action) => {
            state.status = 'failed'
            state.error = action.payload.message
        })
        // Notification
        .addCase(notification.pending, (state, action) => {
            state.status = 'loading'
        })
        .addCase(notification.fulfilled, (state, action) => {
            state.status = 'succeeded'
            state.error = null
            state.terms = action.payload
            toast.success(action.payload.message)
        })
        .addCase(notification.rejected, (state, action) => {
            toast.error(action.payload.message, {
                position: toast.POSITION.TOP_RIGHT
            });
            state.status = 'failed'
            state.error = action.payload.message
        })

    // Add Category
    // .addCase(addCategory.pending, (state, action) => {
    //     state.status = 'loading'
    //     state.error = null
    // })
    // .addCase(addCategory.fulfilled, (state, action) => {
    //     state.status = 'succeeded'
    //     state.error = null
    //     toast.success(action.payload.message, {
    //         position: toast.POSITION.TOP_RIGHT
    //     });
    // })
    // .addCase(addCategory.rejected, (state, action) => {
    //     state.status = 'failed'
    //     state.error = action.payload.message
    //     toast.error(action.payload.message, {
    //         position: toast.POSITION.TOP_RIGHT
    //     });
    // })


    // Get Category
    // .addCase(getCategory.pending, (state, action) => {
    //     state.status = 'loading'
    //     state.error = null
    //     state.categories = null
    // })
    // .addCase(getCategory.fulfilled, (state, action) => {
    //     state.status = 'succeeded'
    //     state.error = null
    //     state.categories = action.payload.categories
    // })
    // .addCase(getCategory.rejected, (state, action) => {
    //     state.status = 'failed'
    //     state.error = action.payload.message
    //     state.categories = null

    // })


    // Delete Category
    // .addCase(deleteCategory.pending, (state, action) => {
    //     state.status = 'loading'
    //     state.error = null

    // })
    // .addCase(deleteCategory.fulfilled, (state, action) => {
    //     state.status = 'succeeded'
    //     state.error = null
    //     toast.success(action.payload.message, {
    //         position: toast.POSITION.TOP_RIGHT
    //     });

    // })
    // .addCase(deleteCategory.rejected, (state, action) => {
    //     state.status = 'failed'
    //     state.error = action.payload.message
    //     state.categories = null

    // })

}