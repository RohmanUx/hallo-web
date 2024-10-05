'use client';

import { useEffect, useState } from 'react';
import { TrendingUp } from 'lucide-react';
import { Area, AreaChart, CartesianGrid, XAxis } from 'recharts';
import axios from 'axios';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';

export const description = 'An area chart with gradient fill';

// Chart configuration
const chartConfig = {
  desktop: {
    label: 'Qyt users',
    color: 'hsl(var(--chart-1))',
  },
  userCount: {
    label: 'Total Users',
    color: 'hsl(var(--chart-2))',
  },
} satisfies ChartConfig;

export function Component() {
  const [chartData, setChartData] = useState<any[]>([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    async function fetchTransactionData() {
      try {
        const response = await axios.get(
          'http://localhost:8000/api/transaction/transaction/',
          { headers: { Authorization: `Bearer ${token}` } },
        );
        const transactions = response.data.data;
        // Format the data into the structure expected by AreaChart
        const formattedData = formatTransactionData(transactions);
        setChartData(await formattedData);
      } catch (error) {
        console.error('Error fetching transaction data:', error);
      }
    }

    fetchTransactionData();
  }, []);

  // Function to format the transaction data for the chart
  const formatTransactionData = async (transactions: any[]) => {
    const groupedData: {
      [month: string]: {
        desktop: number;
        mobile: number;
        userCount: Set<number>;
      };
    } = {};

    transactions.forEach((transaction) => {
      const month = new Date(transaction.transactionDate).toLocaleString(
        'default',
        {
          month: 'long',
        },
      );

      if (!groupedData[month]) {
        groupedData[month] = {
          desktop: 0,
          mobile: 0,
          userCount: new Set<number>(),
        };
      }

      // Add the transaction quantity to desktop purchases
      groupedData[month].desktop += transaction.qty;

      // Track unique user IDs
      groupedData[month].userCount.add(transaction.userId);
    });

    // Convert the grouped data into an array suitable for the chart
    return Object.keys(groupedData).map((month) => ({
      month,
      desktop: groupedData[month].desktop, // Total desktop purchases
      mobile: groupedData[month].mobile, // Currently unused
      userCount: groupedData[month].userCount.size, // Number of unique users
    }));
  };

  return (
    <Card className="px-4 sm:px-0 pt-0 h-[800px] bg-purple-50">
      <CardContent className="my-0">
        <CardHeader className="w-full flex flex-col items-center text-center mb-[-200px] text-3xl mt-10">
          <CardTitle className='text-3xl font-medium dark:text-black'>Area Chart - Gradient </CardTitle>
          <CardDescription>Menampilkan jumlah pembelian event per bulan</CardDescription>
        </CardHeader>
        <ChartContainer config={chartConfig}>
          <AreaChart
            data={chartData}
            margin={{
              left: 400,
              right: 400,
              top: 200,
              bottom: 200,
            }}
            className="h-[50vh] sm:h-[65vh]" // Adjust height dynamically
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <defs className="bg-black">
              <linearGradient id="fillDesktop" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-desktop)" stopOpacity={0.8} />
                <stop offset="95%" stopColor="var(--color-desktop)" stopOpacity={0.1} />
              </linearGradient>
              <linearGradient id="fillMobile" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-mobile)" stopOpacity={0.8} />
                <stop offset="95%" stopColor="var(--color-mobile)" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <Area
              dataKey="userCount"
              type="natural"
              fill="url(#fillMobile)"
              fillOpacity={0.4}
              stroke="var(--color-mobile)"
              stackId="b"
            />
            <Area
              dataKey="desktop"
              type="natural"
              fill="url(#fillDesktop)"
              fillOpacity={0.4}
              stroke="var(--color-desktop)"
              stackId="b"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="mt-2 sm:mt-[-160px]">
        <div className="flex w-full text-sm items-center justify-center">
          <div className="gap-2 flex justify-center text-center items-center">
            <div className="flex items-center gap-2 font-medium leading-none">
              Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
            </div>
            <div className="flex items-center gap-2 leading-none text-muted-foreground">
              Januari - Juni 2024
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
