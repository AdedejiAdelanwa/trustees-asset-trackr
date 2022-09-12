import DashBoardContainer from "../../components/DashboardLayout";
import MainHeader from "../../components/MainHeader";
import SideNav from "../../components/SideNavigation";
import {BiSearchAlt2} from "react-icons/bi"

export default function EstatePlans(){
    return(
        <section className="main-content text-black bg-white w-[80%] h-[90vh] p-[3rem] right-0 absolute overflow-auto">
       <div className="flex items-center justify-between">
       <h2 className="text-[2.8rem] font-bold">My Estate Plans </h2>
        <BiSearchAlt2 fontSize={"2rem"} className="cursor-pointer" />
       </div>
        </section>
    )
}
EstatePlans.getLayout = function getLayout(page){
    return(
        <DashBoardContainer>
            <MainHeader />
            <SideNav />
            {page}
        </DashBoardContainer>
    )
}