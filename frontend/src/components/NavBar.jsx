import React, { useContext } from 'react'
import Logo from '../assets/icons/logo.svg'
import ProfileIcon from '../assets/icons/profile.svg'
import StoreIcon from '../assets/icons/store.svg'
import DatasetIcon from '../assets/icons/dataset.svg'
import SubIcon from '../assets/icons/sub.svg'
import SettingIcon from '../assets/icons/setting.svg'
import DownloadIcon from '../assets/icons/download.svg'
import { useNavigate } from 'react-router-dom'
import AuthContext from '../context/auth.context'

export default function NavBar() {
    const navigate = useNavigate()

    const navigateTo = (url) => {
        navigate(url)
    }

    const { username } = useContext(AuthContext)

    return (
        <div className="fixed h-full z-20 w-64 background-gray border-r border-gray-500">
           <div className="h-1/2 w-full flex flex-col items-center">
               <img src={Logo} alt="logo" className="p-8"/>
               <div className="w-11/12 h-12 my-2 flex flex-row items-center px-8 rounded-xl cursor-pointer hover:bg-gray-600 text-gray-300 hover:text-white" onClick={() => navigateTo('/profile')}>
                   <img className="mr-2" src={ProfileIcon} alt="profile"/>
                   <h3 className="text-base">Profile page</h3>
               </div>
               <div className="w-11/12 h-12 my-2 flex flex-row items-center px-8 rounded-xl cursor-pointer hover:bg-gray-600 text-gray-300 hover:text-white" onClick={() => navigateTo('/store')}>
                   <img className="mr-2" src={StoreIcon} alt="store"/>
                   <h3 className="text-base">Store</h3>
               </div>
               <div className="w-11/12 h-12 my-2 flex flex-row items-center px-8 rounded-xl cursor-pointer hover:bg-gray-600 text-gray-300 hover:text-white" onClick={() => navigateTo('/upload')}>
                   <img className="mr-2" src={DatasetIcon} alt="dataset"/>
                   <h3 className="text-base">Your datasets</h3>
               </div>
               <div className="w-11/12 h-12 my-2 flex flex-row items-center px-8 rounded-xl cursor-pointer hover:bg-gray-600 text-gray-300 hover:text-white" onClick={() => navigateTo('/subscription')}>
                   <img className="mr-2" src={SubIcon} alt="subs"/>
                   <h3 className="text-base">Subscription</h3>
               </div>
            </div> 
            <div className="h-1/2 w-full flex flex-col items-center justify-end pb-4">
                <div className="w-11/12 h-12 my-2 flex flex-row items-center px-8 rounded-xl cursor-pointer">
                   <img className="mr-2" src={DownloadIcon} alt="profile"/>
                   <h3 className="text-base text-gray-300">Downloads</h3>
                </div>
                <div className="w-11/12 h-12 my-2 flex flex-row items-center px-8 rounded-xl cursor-pointer">
                   <img className="mr-2" src={SettingIcon} alt="profile"/>
                   <h3 className="text-base text-gray-300">Settings</h3>
                </div>
                <div className="w-11/12 h-12 my-2 flex flex-row items-center px-8 rounded-xl cursor-pointer">
                   <img className="mr-2 h-6 w-6 rounded-full overflow-hidden" src="https://upload.wikimedia.org/wikipedia/commons/8/85/Elon_Musk_Royal_Society_%28crop1%29.jpg" alt="profile"/>
                   <h3 className="text-base text-gray-300">{username}</h3>
                </div>
            </div> 
        </div>
    )
}
