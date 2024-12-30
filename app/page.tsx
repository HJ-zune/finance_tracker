"use client";

import { Button } from "../components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "../components/ui/select";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "../components/ui/table";
import { useState, useEffect, useMemo } from "react";
import { Trash2, Moon, Sun, Palette } from "lucide-react";
import { useTheme } from "next-themes";
import { Popover, PopoverTrigger, PopoverContent } from "../components/ui/popover";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

export default function Home() {
  const { theme, setTheme } = useTheme();
  
  useEffect(() => {
    setTheme("dark");
    document.documentElement.classList.add("dark");
  }, [setTheme]);

  const [incomeStreams, setIncomeStreams] = useState([
    { id: crypto.randomUUID(), name: "Salary", amount: 3000, type: "fixed", color: "#FF0000" },
    { id: crypto.randomUUID(), name: "Freelance", amount: 500, type: "variable", color: "#00FF00" }
  ]);

  const [expenseStreams, setExpenseStreams] = useState([
    { id: crypto.randomUUID(), name: "Rent", amount: 1000, type: "fixed", color: "#0000FF" },
    { id: crypto.randomUUID(), name: "Groceries", amount: 300, type: "variable", color: "#FFFF00" }
  ]);

  const totalIncome = incomeStreams.reduce((sum, stream) => sum + stream.amount, 0);
  const totalExpenses = expenseStreams.reduce((sum, stream) => sum + stream.amount, 0);
  const netIncome = totalIncome - totalExpenses;

  const addIncomeStream = () => {
    const newStream = {
      id: crypto.randomUUID(),
      name: "New Income",
      amount: 0,
      type: "fixed",
      color: "#FF0000"
    };
    setIncomeStreams([...incomeStreams, newStream]);
  };

  const addExpenseStream = () => {
    const newStream = {
      id: crypto.randomUUID(),
      name: "New Expense",
      amount: 0,
      type: "fixed",
      color: "#0000FF"
    };
    setExpenseStreams([...expenseStreams, newStream]);
  };

  const barChartData = useMemo(() => 
    expenseStreams.map(stream => ({
      ...stream,
      fill: stream.color
    }))
  , [expenseStreams]);

  return (
    <div className={theme === "dark" ? "dark" : ""}>
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-end mb-4">
          <Button
            variant="outline"
            size="icon"
            onClick={() => {
              const newTheme = theme === "dark" ? "light" : "dark";
              setTheme(newTheme);
              document.documentElement.classList.toggle("dark", newTheme === "dark");
            }}
          >
            {theme === "light" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
          </Button>
        </div>
        <h1 className="text-3xl font-bold mb-8">Finance Tracker</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Income Streams</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Type</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {incomeStreams.map((stream) => (
                    <TableRow key={stream.id}>
                      <TableCell>
                        <Input
                          value={stream.name}
                          onChange={(e) => {
                            const updatedStreams = incomeStreams.map((s) =>
                              s.id === stream.id ? { ...s, name: e.target.value } : s
                            );
                            setIncomeStreams(updatedStreams);
                          }}
                        />
                      </TableCell>
                      <TableCell>
                        <Input
                          type="number"
                          value={stream.amount}
                          onChange={(e) => {
                            const updatedStreams = incomeStreams.map((s) =>
                              s.id === stream.id ? { ...s, amount: Number(e.target.value) } : s
                            );
                            setIncomeStreams(updatedStreams);
                          }}
                        />
                      </TableCell>
                      <TableCell>
                        <Select
                          value={stream.type}
                          onValueChange={(value) => {
                            const updatedStreams = incomeStreams.map((s) =>
                              s.id === stream.id ? { ...s, type: value } : s
                            );
                            setIncomeStreams(updatedStreams);
                          }}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="fixed">Fixed</SelectItem>
                            <SelectItem value="variable">Variable</SelectItem>
                          </SelectContent>
                        </Select>
                      </TableCell>
                      <TableCell className="w-10">
                        <div className="flex gap-2">
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="hover:bg-gray-100 dark:hover:bg-gray-700"
                                title="Select color"
                              >
                                <Palette className="h-4 w-4" />
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-40 p-2 grid grid-cols-5 gap-1">
                              {['#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF', '#00FFFF', '#FFA500', '#800080', '#008000', '#000080'].map(color => (
                                <button
                                  key={color}
                                  className="w-6 h-6 rounded-full border"
                                  style={{ backgroundColor: color }}
                                  title={`Select ${color}`}
                                  onClick={() => {
                                    const updatedStreams = incomeStreams.map(s =>
                                      s.id === stream.id ? { ...s, color } : s
                                    );
                                    setIncomeStreams(updatedStreams);
                                  }}
                                />
                              ))}
                            </PopoverContent>
                          </Popover>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="hover:bg-gray-100 dark:hover:bg-gray-700"
                            title="Delete stream"
                            onClick={() => {
                              setIncomeStreams(incomeStreams.filter(s => s.id !== stream.id));
                            }}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <Button className="mt-4" onClick={addIncomeStream}>
                Add Income Stream
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Expense Streams</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Type</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {expenseStreams.map((stream) => (
                    <TableRow key={stream.id}>
                      <TableCell>
                        <Input
                          value={stream.name}
                          onChange={(e) => {
                            const updatedStreams = expenseStreams.map((s) =>
                              s.id === stream.id ? { ...s, name: e.target.value } : s
                            );
                            setExpenseStreams(updatedStreams);
                          }}
                        />
                      </TableCell>
                      <TableCell>
                        <Input
                          type="number"
                          value={stream.amount}
                          onChange={(e) => {
                            const updatedStreams = expenseStreams.map((s) =>
                              s.id === stream.id ? { ...s, amount: Number(e.target.value) } : s
                            );
                            setExpenseStreams(updatedStreams);
                          }}
                        />
                      </TableCell>
                      <TableCell>
                        <Select
                          value={stream.type}
                          onValueChange={(value) => {
                            const updatedStreams = expenseStreams.map((s) =>
                              s.id === stream.id ? { ...s, type: value } : s
                            );
                            setExpenseStreams(updatedStreams);
                          }}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="fixed">Fixed</SelectItem>
                            <SelectItem value="variable">Variable</SelectItem>
                          </SelectContent>
                        </Select>
                      </TableCell>
                      <TableCell className="w-10">
                        <div className="flex gap-2">
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="hover:bg-gray-100 dark:hover:bg-gray-700"
                                title="Select color"
                              >
                                <Palette className="h-4 w-4" />
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-40 p-2 grid grid-cols-5 gap-1">
                              {['#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF', '#00FFFF', '#FFA500', '#800080', '#008000', '#000080'].map(color => (
                                <button
                                  key={color}
                                  className="w-6 h-6 rounded-full border"
                                  style={{ backgroundColor: color }}
                                  title={`Select ${color}`}
                                  onClick={() => {
                                    const updatedStreams = expenseStreams.map(s =>
                                      s.id === stream.id ? { ...s, color } : s
                                    );
                                    setExpenseStreams(updatedStreams);
                                  }}
                                />
                              ))}
                            </PopoverContent>
                          </Popover>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="hover:bg-gray-100 dark:hover:bg-gray-700"
                            title="Delete stream"
                            onClick={() => {
                              setExpenseStreams(expenseStreams.filter(s => s.id !== stream.id));
                            }}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <Button className="mt-4" onClick={addExpenseStream}>
                Add Expense Stream
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Total Income</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${totalIncome}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Total Expenses</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${totalExpenses}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Net Income</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${netIncome}</div>
            </CardContent>
          </Card>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Financial Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="h-64">
                <PieChart width={400} height={300}>
                  <Pie
                    data={incomeStreams}
                    dataKey="amount"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    fill="#8884d8"
                    label
                  >
                    {incomeStreams.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color || `#${Math.floor(Math.random()*16777215).toString(16)}`} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </div>
              <div className="h-64">
                <BarChart
                  width={400}
                  height={300}
                  data={barChartData}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="amount" fill="fill" />
                </BarChart>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
