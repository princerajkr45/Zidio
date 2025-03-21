import { PieChart, Pie, Cell, Tooltip } from 'recharts';
import Sidebar from './Sidebar';
import { Outlet } from 'react-router-dom';
import InputData from './InputData';
import Login from '../pages/Login';
import SignUp from '../pages/SignUp';



export default function Dashboard() {
    return (
        <>
            <div className='flex h-[98vh] gap-4'>
                <div className="w-1/6 border-r-1 border-gray-600 p-4 flex flex-col justify-between">
                    <Sidebar />
                </div>
                <div className=" rounded-xl w-5/6 p-4">
                <Outlet />
                </div>

            </div>
           
        </>
    );
}
