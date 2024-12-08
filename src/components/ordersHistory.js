import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, } from "@/components/ui/table";
const orders = [
    { id: 1, date: "2023-06-01", description: "Concert Ticket", amount: 50 },
    { id: 2, date: "2023-06-15", description: "Movie Ticket", amount: 15 },
    { id: 3, date: "2023-07-01", description: "Sports Event", amount: 75 },
];
export function OrdersHistory() {
    return (_jsxs(Card, { className: "border-sky-100", children: [_jsx(CardHeader, { className: "border-b border-sky-100", children: _jsx(CardTitle, { className: "text-sky-900", children: "Orders History" }) }), _jsx(CardContent, { children: _jsxs(Table, { children: [_jsx(TableHeader, { children: _jsxs(TableRow, { className: "hover:bg-sky-50", children: [_jsx(TableHead, { className: "text-sky-900", children: "Date" }), _jsx(TableHead, { className: "text-sky-900", children: "Description" }), _jsx(TableHead, { className: "text-sky-900", children: "Amount" })] }) }), _jsx(TableBody, { children: orders.map((order) => (_jsxs(TableRow, { className: "hover:bg-sky-50", children: [_jsx(TableCell, { children: order.date }), _jsx(TableCell, { children: order.description }), _jsxs(TableCell, { children: ["$", order.amount] })] }, order.id))) })] }) })] }));
}
