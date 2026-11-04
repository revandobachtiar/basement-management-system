'use client'

import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card"
import { BuildingComplex, Video, Road } from "lucide-react"

interface CardSummaryProps {
    title: string
    basementTotal: number
    lineTotal: number
    cctvTotal: number
}

export function CardSummary({
    basementTotal = 6,
    lineTotal = 12,
    cctvTotal = 6,
}) {
    const cards = [
        {
            title: "Total Basement",
            value: basementTotal,
            icon: BuildingComplex,
            iconColor: "black",
            
        },
        {
            title: "Total Line",
            value: lineTotal,
            icon: Road,
            iconColor: "black",
        },
        {
            title: "Total CCTV",
            value: cctvTotal,
            icon: Video,
            iconColor: "black",
        }
    ];

    return (
        <div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mx-20 mt-10">
                {cards.map((card, index) => (
                    <Card key={index} className="bg-transparent border-none shadow-none ring-0 outline-0">
                        <CardContent>
                            <div className="place-items-center grid-rows-6 gap-2">
                                <card.icon className={`h-20 w-20 place-items-center ${card.iconColor}`} />
                                <CardTitle className = "text-3xl font-bold text-[#010634]">{card.value}</CardTitle>
                            </div>
                        </CardContent>
                        <CardHeader className="place-items-center">
                            <CardDescription className = "text-lg font-semibold text-[#010634]">{card.title}</CardDescription>
                        </CardHeader>
                        
                    </Card>
                ))}
            </div>
            {/* <div className = "grid grid-cols-1 lg:grid-cols-1 mx-10 mt-5">
                <Card className = "bg-white border-none shadow-none ring-0 outline-0">
                    <CardHeader>
                        <CardTitle className = "text-xl font-bold">Configuration Menu</CardTitle>
                    </CardHeader>
                    
                </Card>
            </div> */}
        </div>
    );
}