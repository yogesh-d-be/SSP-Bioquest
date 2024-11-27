import React, { useEffect, useState } from "react";
import ReactECharts from "echarts-for-react";
import { FaThList, FaFolder,FaBox, FaShoppingCart,FaEnvelope, FaPhone } from 'react-icons/fa';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement } from 'chart.js';
import { adminDashboardData } from "../../services/services";
import { message } from "antd";
import FormatDate from "../../utility/dateAndTime";

ChartJS.register(Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement);

const InfoCard = ({bgColor, icon, title, count }) => {
    return(
        <div className="w-80 h-36 bg-gray-200 shadow-2xl rounded-2xl mt-10 relative flex justify-end">
        <div className={`w-16 h-16 rounded-lg shadow-lg left-6 bottom-24 absolute ${bgColor} flex justify-center items-center`}>
         
           {icon}
            
        </div>
        <div className="flex flex-col gap-2 mx-6 mt-6">
            <p className="font-bold text-gray-400 text-xl">{title}</p>
            <p className="font-bold  text-2xl absolute right-6 top-14">{count}</p>
            </div>
    </div>
    )
}




// const ChartComponent = () => {
//   const data = {
//     labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5'],
//     datasets: [
//       {
//         label: 'User Contacts',
//         data: [100, 150, 120, 180, 250],
//         fill: false,
//         borderColor: 'rgb(75, 192, 192)',
//         tension: 0.1,
//       },
//     ],
//   };

//   const options = {
//     responsive: true, // Enables responsiveness
//     maintainAspectRatio: false, // Allows chart resizing
//   };

//   return <div style={{ position: 'relative', height: '400px',width:'900px'  }}><Line data={data} options={options} /></div>;
// };



const Dashboard = () => {

  const [data, setData] = useState([]);
  useEffect(()=>{
    fetchDashboardData();
  },[])

  const fetchDashboardData = async() => {
    try {
      const response = await adminDashboardData();
      // console.log("list dashboard data",response.data)
      if(response.data.success){
       setData(response.data.data);
      }
    } catch (error) {
      message.error(error?.response?.data?.message);
    }
  }

  const cardsData = [
    {
      bgColor: "bg-blue-500",
      icon: <FaFolder className="text-3xl text-white" />,
      title: "Category",
      count: String(data.mainCategoryCount).padStart(2, "0")
    },
    {
      bgColor: "bg-green-500",
      icon: <FaShoppingCart className="text-3xl text-white" />,
      title: "Products",
      count: String(data.productCount).padStart(2, "0")
    },
    {
      bgColor: "bg-red-500",
      icon: <FaPhone className="text-3xl text-white" />,
      title: "Contact",
      count: String(data.userContactUsCount).padStart(2, "0")
    }
  ]

  const option = {
    xAxis: {
      type: "category",
      data: Array.isArray(data?.formattedResults)? data?.formattedResults.map((item, i) => FormatDate(item.start) || "NA"):[], // Ensure category exists
      axisLabel: {
        color: "#fff", // Customize the axis label color
      },
    },
    yAxis: {
      type: "value",
      axisLabel: {
        color: "#fff", // Customize the axis label color
      },
    },
    tooltip: {
      trigger: "axis",
    },
    series: [
      {
        data:  Array.isArray(data?.formattedResults)? data?.formattedResults.map((item) =>( item.count )|| 0): [], // Ensure orderCount exists
        type: "bar",
        itemStyle: {
          color: "#fff", // Customize bar color
          borderRadius: [5, 5, 0, 0], // Rounded corners on top
        },
        barWidth: "10%", // Adjust bar width
      },
    ],
    backgroundColor: "#131C3A", // Background color
    grid: {
      top: "10%",
      bottom: "10%",
      left: "5%",
      right: "5%",
      containLabel: true,
    },
  };

 

    return (
       <div className="max-h-screen">
        <div className="flex justify-around">
      {cardsData.map((card, index) => (
        <InfoCard key={index} {...card} />
      ))

      }
        </div>
        <div className="mt-32 flex justify-center">

        {/* <ChartComponent/> */}
        
        <ReactECharts
        option={option}
        style={{ height: "250px", width: "100%" ,}}
      />
        </div>
       </div>
    );
};

export default Dashboard;
