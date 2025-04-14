import { PieChart } from "react-native-chart-kit";
import { LineChart } from "react-native-chart-kit";
import {Expense} from "@/type/types";
import { calculateCategoryPercentages, calculateMonthlyTotals } from "@/util/data_processing";
import { Dimensions } from "react-native";

export const PieGraph = ({ data }: { data: Expense[] }) => {
  const percentages = calculateCategoryPercentages(data);
  const getRandomColor = (): string => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };
  const chartData = Object.keys(percentages).map((category) => ({
    name: category,
    population: percentages[category],
    color: getRandomColor(), // ランダムで色を生成する関数を作ると便利です
    legendFontColor: "#7F7F7F",
    legendFontSize: 15,
  }));

  return (
    <PieChart
      data={chartData}
      width={Dimensions.get("window").width - 20}
      height={220}
      chartConfig={{
        color: () => "rgba(255, 255, 255, 1)",
        backgroundColor: "#FFFAFA",
      }}
      accessor="population"
      backgroundColor="transparent"
      paddingLeft="15"
    />
  );
};

export const LineGraph = ({ data }: { data: Expense[] }) => {
  const monthlyData = calculateMonthlyTotals(data);
  const chartData = {
    labels: monthlyData.map((item) => item.month),
    datasets: [{ data: monthlyData.map((item) => item.total) }],
  };

  return (
    <LineChart
      data={chartData}
      width={Dimensions.get("window").width - 20}
      height={220}
      chartConfig={{
        backgroundGradientFrom: "#FFA726",
        backgroundGradientTo: "#FF7043",
        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      }}
    />
  );
};
