import SideBar from "@/components/sidebar";
import {getCurrentUser} from "@/lib/auth";
import {prisma} from "@/lib/prisma";

export default async function DashboardPage(){
    const user = await getCurrentUser();
    const userId=user.id;

    const totalProducts = await prisma.product.count({where : {userId}});
    const allProducts = await prisma.product.findMany({where:{userId},select:{price:true,quantity:true,createdAt:true}});
    const totalValue = allProducts.reduce((sum,product)=> sum + Number(product.price)*Number(product.quantity),0);
    const lowStock = await prisma.product.count({where:{userId, lowStockAt:{not:null},quantity:{lte:5}}});
    console.log(lowStock);

    return (
        <div className="min-h-screen bg-[#0A0A0B]">
            <SideBar currentPath="/dashboard"/>
        </div>
    );
}