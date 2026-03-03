import SideBar from "@/components/sidebar";

export default async function DashboardPage(){
    return (
        <div className="min-h-screen bg-[#0A0A0B]">
            <SideBar currentPath="/dashboard"/>
        </div>
    );
}