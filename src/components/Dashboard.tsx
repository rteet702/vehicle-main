"use client";

import { CookieValueTypes, getCookie, hasCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import LogoutButton from "./small/LogoutButton";

interface IUser {
    id: number;
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    createdAt: string;
    updatedAt: string;
}

interface IVehicle {
    id: number;
    year: number;
    make: string;
    model: string;
    nickname?: string;
    trim?: string;
    mileage: number;
    workOrders: IWorkOrder[];
    createdAt: string;
    updatedAt: string;
}

interface IWorkOrder {
    id: number;
    vehicle: IVehicle;
    description: string;
    complete: boolean;
    createdAt: string;
    updatedAt: string;
}

export default function Dashboard() {
    const [user, setUser] = useState<IUser>();
    const [vehicles, setVehicles] = useState<IVehicle>();
    const [workOrders, setWorkOrders] = useState<IWorkOrder[]>();

    const router = useRouter();

    useEffect(() => {
        const auth = hasCookie("userId");
        if (!auth) {
            return router.push("/");
        }

        const userId = getCookie("userId");
        getUser(userId);
        getVehicles();
        getWorkOrders();
    }, []);

    async function getUser(id: CookieValueTypes) {
        const response = await fetch(`http://localhost:3000/api/users/${id}`);
        if (!response.ok) {
            return;
        }

        const userData = await response.json();
        setUser(userData.user);
    }

    async function getVehicles() {
        const response = await fetch("http://localhost:3000/api/vehicles");
        if (!response.ok) {
            return;
        }
        const vehicleData = await response.json();
        setVehicles(vehicleData.vehicles);
    }

    async function getWorkOrders() {
        const response = await fetch("http://localhost:3000/api/workorders");
        if (!response.ok) {
            return;
        }
        const workOrderData = await response.json();
        setWorkOrders(workOrderData.workOrders);
    }

    return (
        <main className="w-full p-4 bg-white rounded-sm shadow-lg lg:w-2/3">
            <nav className="flex items-center justify-between">
                <h1 className="text-3xl">Hello {user?.firstName}!</h1>
                <ul>
                    <button className="p-4 transition-colors border-b-2 bg-neutral-100 hover:bg-neutral-300">
                        View Vehicles
                    </button>
                    <button className="p-4 transition-colors border-b-2 bg-neutral-100 hover:bg-cyan-300 hover:border-cyan-500">
                        Add Work Order
                    </button>
                    <LogoutButton />
                </ul>
            </nav>
            <section>
                <h2 className="my-2 text-2xl">Pending Work Orders</h2>
                <table className="w-full p-1 border-b-2 rounded-sm border-neutral-200 bg-neutral-200">
                    <thead>
                        <tr>
                            <th>Vehicle</th>
                            <th>Nickname</th>
                            <th>Description</th>
                            <th>Complete?</th>
                            <th>Created At?</th>
                        </tr>
                    </thead>
                    <tbody>
                        {workOrders &&
                            workOrders.map((workOrder) => {
                                const { year, make, model } = workOrder.vehicle;
                                const vehicleText = `${year} ${make} ${model}`;
                                const date = new Date(workOrder.createdAt);
                                const dateString = date.toLocaleDateString();
                                return (
                                    <tr
                                        key={workOrder.id}
                                        className="text-center transition-colors even:bg-neutral-100 odd:bg-cyan-100"
                                    >
                                        <td>{vehicleText}</td>
                                        <td>
                                            {workOrder.vehicle.nickname
                                                ? workOrder.vehicle.nickname
                                                : "None"}
                                        </td>
                                        <td>{workOrder.description}</td>
                                        <td>
                                            {workOrder.complete ? "Yes" : "No"}
                                        </td>
                                        <td>{dateString}</td>
                                    </tr>
                                );
                            })}
                    </tbody>
                </table>
            </section>
        </main>
    );
}
