import React, { useEffect, useState } from 'react';
import { useApp } from '@/AppContext';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { type ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts';

const DashboardPage = () => {
    const { patients, getPatients } = useApp();
    const [loading, setLoading] = useState(false);

    const chartConfig = {
        inquiry: {
            label: "Inquiry",
            color: "var(--chart-3)",
        },
        churned: {
            label: "Churned",
            color: "var(--chart-4)",
        },
        onboarding: {
          label: "Onboarding",
          color: "var(--chart-2)",
        },
        active: {
          label: "Active",
          color: "var(--chart-1)",
        },
      } satisfies ChartConfig


    useEffect(() => {
        const loadPatients = async () => {
            if (patients.length === 0) {
                setLoading(true);
                try {
                    await getPatients();
                } catch (error) {
                    console.error('Failed to fetch patients:', error);
                } finally {
                    setLoading(false);
                }
            }
        };
        
        loadPatients();
    }, [patients.length, getPatients]);

    // Calculate patient status counts
    const statusCounts = patients.reduce((acc, patient) => {
        const status = patient.status.toLowerCase();
        acc[status] = (acc[status] || 0) + 1;
        return acc;
    }, {} as Record<string, number>);

    const activePatients = statusCounts.active || 0;
    const totalPatients = patients.length;

    // Prepare chart data
    const chartData = [
        {
            status: "Active",
            count: statusCounts.active || 0,
            fill: "var(--chart-1)",
        },
        {
            status: "Onboarding",
            count: statusCounts.onboarding || 0,
            fill: "var(--chart-2)",
        },
        {
            status: "Inquiry",
            count: statusCounts.inquiry || 0,
            fill: "var(--chart-3)",
        },
        {
            status: "Churned",
            count: statusCounts.churned || 0,
            fill: "var(--chart-4)",
        },
    ].filter(item => item.count > 0); // Only show statuses that have patients

    if (loading && patients.length === 0) {
        return (
            <div className="flex justify-center items-center h-64">
                <LoadingSpinner size="xl" centered={true} />
            </div>
        );
    }

    return (
        <div className="p-4">
            <div className="flex gap-4">
                <div className="flex gap-2 w-full">
                    <h1 className="text-2xl font-bold">Dashboard</h1>
                </div>
            </div>
            <div className="mt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="border border-gray-200 rounded-lg p-4">
                        <h3 className="text-lg font-semibold mb-2">Total Patients</h3>
                        <p className="text-3xl font-bold text-blue-600">{totalPatients}</p>
                    </div>
                    <div className="border border-gray-200 rounded-lg p-4">
                        <h3 className="text-lg font-semibold mb-2">Active Patients</h3>
                        <p className="text-3xl font-bold text-green-600">{activePatients}</p>
                    </div>
                    <div className="border border-gray-200 rounded-lg p-4">
                        <h3 className="text-lg font-semibold mb-2">Pending Reviews</h3>
                        <p className="text-3xl font-bold text-orange-600">8</p>
                    </div>
                </div>
            </div>
            <div className="mt-8">
                <div className="border border-gray-200 rounded-lg p-6">
                    <h3 className="text-lg font-semibold mb-4">Patient Status Distribution</h3>
                    {chartData.length > 0 ? (
                        <ChartContainer config={chartConfig} className="h-[300px] w-full">
                            <BarChart
                                data={chartData}
                                margin={{
                                    top: 20,
                                    right: 30,
                                    left: 20,
                                    bottom: 5,
                                }}
                            >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis 
                                    dataKey="status"
                                    axisLine={false}
                                    tickLine={false}
                                    className="text-sm"
                                />
                                <YAxis 
                                    axisLine={false}
                                    tickLine={false}
                                    className="text-sm"
                                />
                                <ChartTooltip
                                    content={<ChartTooltipContent />}
                                />
                                <Bar 
                                    dataKey="count" 
                                    radius={[4, 4, 0, 0]}
                                />
                            </BarChart>
                        </ChartContainer>
                    ) : (
                        <div className="flex items-center justify-center h-[300px] text-gray-500">
                            {loading ? (
                                <LoadingSpinner size="lg" />
                            ) : (
                                <p>No patient data available</p>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default DashboardPage; 