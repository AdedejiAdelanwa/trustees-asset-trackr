import DashBoardContainer from "../../components/DashboardLayout";
import MainHeader from "../../components/MainHeader";
import SideNav from "../../components/SideNavigation";

export default function Settings(){
    return(
        <section className="main-content w-[80%] right-0 absolute overflow-auto"><h2>Settings </h2>
        <p>Settings content</p>
        </section>
    )
}
Settings.getLayout = function getLayout(page){
    return(
        <DashBoardContainer>
            <MainHeader />
            <SideNav />
            {page}
        </DashBoardContainer>
    )
}