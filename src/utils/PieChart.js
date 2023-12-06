import React from 'react'
import { useSelector } from 'react-redux';
import { getPresentedCoupons } from '../store/slices/userSlice';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'; 
ChartJS.register(ArcElement, Tooltip, Legend);
const PieChart = (props) => {
    console.log('props', props?.data)
    // const totalCoupons = useSelector(getPresentedCoupons); 
    const data = {
        labels: [`Appointment Gross Amount`, `Courses Gross Amount`, `Subscription Gross Amount`],
        datasets: [
          {
             data: [props?.data?.transactionDetails?.appointmentsSum, props?.data?.transactionDetails?.coursesSum, props?.data?.transactionDetails?.subscriptionSum],
            backgroundColor: [
              'rgb(0%, 64%, 100%)', 
              'rgb(100%, 83%, 0%)',
              'rgb(100%, 49%, 0%)', 
            ],  
          },
        ],
      };
    return (
        <>
           <Pie data={data} style={{ width: "100%", height: "100%" }} />
        </>
    )
}
export default PieChart