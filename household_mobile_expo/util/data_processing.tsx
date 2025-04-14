import { Expense } from "./../type/types";
export const calculateCategoryPercentages = (data: Expense[]) => {
    const total = data.reduce((sum, expense) => sum + expense.amount, 0);
    const percentages: { [category: string]: number } = {};
    data.forEach((expense) => {
      percentages[expense.category] = (percentages[expense.category] || 0) + (expense.amount / total) * 100;
    });
    return percentages;
  };
  
 export const calculateMonthlyTotals = (data: Expense[]) => {
    const totals: { [month: string]: number } = {};
    data.forEach((expense) => {
      const month = new Date(expense.date).toLocaleDateString("en-US", { year: "numeric", month: "2-digit" });
      totals[month] = (totals[month] || 0) + expense.amount;
    });
  
    const sortedTotals = Object.entries(totals)
      .sort(([monthA], [monthB]) => new Date(monthA).getTime() - new Date(monthB).getTime()) // 日付順にソート
      .map(([month, total]) => ({ month, total }));
  
    return sortedTotals;
  };
  