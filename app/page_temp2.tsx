"use client";

import { Button } from "../components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "../components/ui/select";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "../components/ui/table";
import { useState } from "react";

export default function Home() {
  const [incomeStreams, setIncomeStreams] = useState([
    { id: 1, name: "Salary", amount: 3000, type: "fixed" },
    { id: 2, name: "Freelance", amount: 500, type: "variable" }
  ]);

  const [expenseStreams, setExpenseStreams] = useState([
    { id: 1, name: "Rent", amount: 1000, type: "fixed" },
    { id: 2, name: "Groceries", amount: 300, type: "variable" }
  ]);

  const totalIncome = incomeStreams.reduce((sum, stream) => sum + stream.amount, 0);
  const totalExpenses = expenseStreams.reduce((sum, stream) => sum + stream.amount, 0);
  const netIncome = totalIncome - totalExpenses;

  const addIncomeStream = () => {
    const newStream = {
      id: incomeStreams.length + 1,
      name: "New Income",
      amount: 0,
      type: "fixed"
    };
    setIncomeStreams([...incomeStreams, newStream]);
  };

  const addExpenseStream = () => {
    const newStream = {
      id: expenseStreams.length + 1,
      name: "New Expense",
      amount: 0,
      type: "fixed"
    };
    setExpenseStreams([...expenseStreams, newStream]);
  };

  return (
    <div className="container mx-auto px-4 py-8">
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
          <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
            <span className="text-gray-500">Chart Placeholder</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
