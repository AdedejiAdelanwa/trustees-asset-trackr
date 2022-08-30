import DashBoardContainer from "../../components/DashboardLayout";
import MainHeader from "../../components/MainHeader";
import SideNav from "../../components/SideNavigation";

export default function EstatePlans(){
    return(
        <section className="main-content w-[80%] right-0 absolute overflow-auto">
        Estate Plans
        <p>Estate content</p> 
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