"use client";

import { useEffect, useMemo, useState } from "react";
import { api } from "@/lib/axios";
import { OrdersToolbar } from "./_components/OrdersToolBar";
import { OrdersTable, OrderRow } from "./_components/OrdersTable";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useAuth } from "@/app/(client)/context/AuthProvider";
import { User } from "lucide-react";
import { useRouter } from "next/navigation";

function inRange(dateISO: string, from?: Date, to?: Date) {
  if (!from && !to) return true;
  const d = new Date(dateISO);
  if (Number.isNaN(d.getTime())) return true;

  const t = d.getTime();
  const a = from ? new Date(from).setHours(0, 0, 0, 0) : -Infinity;
  const b = to ? new Date(to).setHours(23, 59, 59, 999) : Infinity;
  return t >= a && t <= b;
}

export default function Page() {
  const [orders, setOrders] = useState<OrderRow[]>([]);
  const [checkedOrders, setCheckedOrders] = useState<string[]>([]);
  const [checkAll, setCheckAll] = useState(false);

  const [q, setQ] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateRange, setDateRange] = useState<{ from?: Date; to?: Date }>({});

  const [selectedStatus, setSelectedStatus] = useState("");

  const [page, setPage] = useState(1);
  const pageSize = 8;

  const { user, logout, updateAddress } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        if (!token) return;

        const res = await api.get("/orders/all", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setOrders(res.data.orders ?? []);
        console.log(res.data.orders);
      } catch (e) {
        console.error("fetch orders error:", e);
      }
    };

    fetchOrders();
  }, []);

  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase();

    return orders.filter((o) => {
      const items = (o.orderItems ?? []).filter((i) => i.foodId);
      const foodNames = items
        .map((i) => i.foodId?.name)
        .filter(Boolean)
        .join(" ");

      const customer = o.userId?.email ?? o.userId?.username ?? "";
      const address = o.userId?.address ?? "";

      const hay =
        `${customer} ${foodNames} ${address} ${o.status} ${o.totalPrice}`.toLowerCase();

      const okQuery = query ? hay.includes(query) : true;
      const okStatus =
        statusFilter === "all" ? true : o.status === statusFilter;
      const okDate = inRange(o.createdAt, dateRange.from, dateRange.to);

      return okQuery && okStatus && okDate;
    });
  }, [orders, q, statusFilter, dateRange.from, dateRange.to]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const pageOrders = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filtered.slice(start, start + pageSize);
  }, [filtered, page]);

  useEffect(() => {
    setPage(1);
  }, [q, statusFilter, dateRange.from, dateRange.to]);

  useEffect(() => {
    const ids = pageOrders.map((o) => o._id);
    const allChecked =
      ids.length > 0 && ids.every((id) => checkedOrders.includes(id));
    setCheckAll(allChecked);
  }, [pageOrders, checkedOrders]);

  const toggleCheckAll = () => {
    const ids = pageOrders.map((o) => o._id);

    if (checkAll) {
      setCheckedOrders((prev) => prev.filter((id) => !ids.includes(id)));
      setCheckAll(false);
    } else {
      setCheckedOrders((prev) => Array.from(new Set([...prev, ...ids])));
      setCheckAll(true);
    }
  };

  const toggleCheck = (id: string) => {
    setCheckedOrders((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  };

  const bulkSave = async () => {
    if (!selectedStatus || checkedOrders.length === 0) return;

    try {
      const token = localStorage.getItem("accessToken");
      if (!token) return;

      await api.patch(
        "/orders/status",
        { orderIds: checkedOrders, status: selectedStatus },
        { headers: { Authorization: `Bearer ${token}` } },
      );

      setOrders((prev) =>
        prev.map((o) =>
          checkedOrders.includes(o._id) ? { ...o, status: selectedStatus } : o,
        ),
      );

      setCheckedOrders([]);
      setSelectedStatus("");
    } catch (e) {
      console.error("bulk update error:", e);
      alert("Failed to update status");
    }
  };

  const updateSingleStatus = async (orderId: string, status: string) => {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) return;

      await api.patch(
        "/orders/status",
        { orderIds: [orderId], status },
        { headers: { Authorization: `Bearer ${token}` } },
      );

      setOrders((prev) =>
        prev.map((o) => (o._id === orderId ? { ...o, status } : o)),
      );
    } catch (e) {
      console.error("single update error:", e);
      alert("Failed to update status");
    }
  };

  return (
    <div className="min-h-screen bg-secondary p-8">
      <div className="flex justify-end mb-4">
        {user ? (
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" className="rounded-full">
                <img src="/Container (7).png" alt="Logo" />
              </Button>
            </PopoverTrigger>

            <PopoverContent className="w-fit">
              <div className="flex flex-col items-center gap-2">
                <p>{user.username}</p>
                <Button variant="secondary" onClick={logout}>
                  Sign out
                </Button>
              </div>
            </PopoverContent>
          </Popover>
        ) : (
          <Button onClick={() => router.push("/login")}>Login</Button>
        )}
      </div>
      <div className="w-full rounded-xl bg-white border">
        <OrdersToolbar
          total={orders.length}
          filteredCount={filtered.length}
          q={q}
          setQ={setQ}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          dateRange={dateRange}
          setDateRange={setDateRange}
          checkedCount={checkedOrders.length}
          selectedStatus={selectedStatus}
          setSelectedStatus={setSelectedStatus}
          onBulkSave={bulkSave}
        />

        <OrdersTable
          orders={pageOrders}
          page={page}
          pageSize={pageSize}
          totalPages={totalPages}
          setPage={setPage}
          checkAll={checkAll}
          toggleCheckAll={toggleCheckAll}
          checkedOrders={checkedOrders}
          toggleCheck={toggleCheck}
          updateSingleStatus={updateSingleStatus}
        />
      </div>
    </div>
  );
}
