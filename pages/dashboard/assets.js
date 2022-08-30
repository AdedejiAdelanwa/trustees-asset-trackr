import DashBoardContainer from "../../components/DashboardLayout";
import MainHeader from "../../components/MainHeader";
import SideNav from "../../components/SideNavigation";

export default function Assets(){
    return(
        <section className="main-content w-[80%] right-0 absolute overflow-auto">
         <h2>Assets</h2>
        <p>Assets content</p>
        </section>
    )
}
Assets.getLayout = function getLayout(page){
    return(
        <DashBoardContainer>
            <MainHeader />
            <SideNav />
            {page}
        </DashBoardContainer>
    )
}