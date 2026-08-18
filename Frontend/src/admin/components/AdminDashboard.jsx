import React, { useEffect, useState } from "react";
import axios from "axios";
import {
    Users,
    UserRound,
    BriefcaseBusiness,
    ClipboardList,
    CheckCircle2,
    Clock3,
    CircleAlert,
    Activity,
    RefreshCw,
    Building2,
    ArrowUpRight,
    ShieldCheck,
} from "lucide-react";
import AdminNavbar from "../components/AdminNavbar";
import AdminFooter from "../components/AdminFooter";

const AdminDashboard = () => {
    const [admin, setAdmin] = useState(null);

    const [stats, setStats] = useState(null);
    const [owners, setOwners] = useState([]);
    const [members, setMembers] = useState([]);
    const [workspaces, setWorkspaces] = useState([]);
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

    const fetchAdminData = async () => {
        try {
            setRefreshing(true);

            const [
                adminResponse,
                dashboardResponse,
                ownersResponse,
                membersResponse,
                workspacesResponse,
                tasksResponse,
            ] = await Promise.all([
                axios.get(`${import.meta.env.VITE_BACKEND}/admin/currentadmin`, {
                    withCredentials: true,
                }),
                axios.get(`${import.meta.env.VITE_BACKEND}/admin/dashboard`, {
                    withCredentials: true,
                }),
                axios.get(`${import.meta.env.VITE_BACKEND}/admin/owners`, {
                    withCredentials: true,
                }),
                axios.get(`${import.meta.env.VITE_BACKEND}/admin/members`, {
                    withCredentials: true,
                }),
                axios.get(`${import.meta.env.VITE_BACKEND}/admin/workspaces`, {
                    withCredentials: true,
                }),
                axios.get(`${import.meta.env.VITE_BACKEND}/admin/tasks`, {
                    withCredentials: true,
                }),
            ]);

            if (adminResponse.data.success) {
                setAdmin(adminResponse.data.admin);
            }

            if (dashboardResponse.data.success) {
                setStats(dashboardResponse.data.stats);
            }

            if (ownersResponse.data.success) {
                setOwners(ownersResponse.data.owners || []);
            }

            if (membersResponse.data.success) {
                setMembers(membersResponse.data.members || []);
            }

            if (workspacesResponse.data.success) {
                setWorkspaces(workspacesResponse.data.workspaces || []);
            }

            if (tasksResponse.data.success) {
                setTasks(tasksResponse.data.tasks || []);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };

    useEffect(() => {
        fetchAdminData();
    }, []);
    

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50">
                <AdminNavbar />

                <div className="flex min-h-[75vh] items-center justify-center">
                    <div className="text-center">
                        <div className="mx-auto h-9 w-9 animate-spin rounded-full border-2 border-gray-200 border-t-black" />
                        <p className="mt-4 text-sm text-gray-500">
                            Loading admin dashboard...
                        </p>
                    </div>
                </div>

                <AdminFooter />
            </div>
        );
    }

    const totalTasks = stats?.totalTasks || 0;
    const completedTasks = stats?.completedTasks || 0;
    const pendingTasks = stats?.pendingTasks || 0;
    const inProgressTasks = stats?.inProgressTasks || 0;

    const completedPercentage =
        totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

    const pendingPercentage =
        totalTasks > 0 ? Math.round((pendingTasks / totalTasks) * 100) : 0;

    const progressPercentage =
        totalTasks > 0 ? Math.round((inProgressTasks / totalTasks) * 100) : 0;

    return (
        <div className="min-h-screen bg-gray-50">
            <AdminNavbar />

            <main className="mx-auto max-w-7xl px-6 py-8 lg:px-8">
                <div className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
                    <div>
                        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-gray-400">
                            Administration
                        </p>

                        <h1 className="text-3xl font-semibold tracking-tight text-gray-950">
                            Welcome back{admin?.name ? `, ${admin.name}` : ""}
                        </h1>

                        <p className="mt-2 text-sm text-gray-500">
                            Monitor everything happening across One 5 Workspace.
                        </p>
                    </div>

                    <button
                        onClick={fetchAdminData}
                        disabled={refreshing}
                        className="flex w-fit items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:border-gray-300 hover:text-black disabled:opacity-50"
                    >
                        <RefreshCw
                            size={16}
                            className={refreshing ? "animate-spin" : ""}
                        />
                        Refresh
                    </button>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    <StatCard
                        title="Total Owners"
                        value={stats?.totalOwners}
                        icon={UserRound}
                        description="Registered workspace owners"
                    />

                    <StatCard
                        title="Total Members"
                        value={stats?.totalMembers}
                        icon={Users}
                        description="Registered workspace members"
                    />

                    <StatCard
                        title="Workspaces"
                        value={stats?.totalWorkspaces}
                        icon={BriefcaseBusiness}
                        description="Created on the platform"
                    />

                    <StatCard
                        title="Total Tasks"
                        value={stats?.totalTasks}
                        icon={ClipboardList}
                        description="Tasks across all workspaces"
                    />
                </div>

                <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
                    <div className="rounded-2xl border border-gray-200 bg-white p-6 lg:col-span-2">
                        <div className="mb-6 flex items-center justify-between">
                            <div>
                                <h2 className="text-lg font-semibold text-gray-950">
                                    Task Performance
                                </h2>

                                <p className="mt-1 text-sm text-gray-500">
                                    Current task distribution
                                </p>
                            </div>

                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-black text-white">
                                <Activity size={19} />
                            </div>
                        </div>

                        <div className="space-y-6">
                            <ProgressRow
                                title="Completed"
                                value={completedTasks}
                                total={totalTasks}
                                percentage={completedPercentage}
                                icon={CheckCircle2}
                            />

                            <ProgressRow
                                title="In Progress"
                                value={inProgressTasks}
                                total={totalTasks}
                                percentage={progressPercentage}
                                icon={Clock3}
                            />

                            <ProgressRow
                                title="Pending"
                                value={pendingTasks}
                                total={totalTasks}
                                percentage={pendingPercentage}
                                icon={CircleAlert}
                            />
                        </div>
                    </div>

                    <div className="rounded-2xl border border-gray-200 bg-white p-6">
                        <div className="mb-6">
                            <h2 className="text-lg font-semibold text-gray-950">
                                Workspace Status
                            </h2>

                            <p className="mt-1 text-sm text-gray-500">
                                Current workspace activity
                            </p>
                        </div>

                        <div className="space-y-4">
                            <StatusCard
                                title="Active"
                                value={stats?.activeWorkspaces}
                                icon={Activity}
                            />

                            <StatusCard
                                title="Closed"
                                value={stats?.closedWorkspaces}
                                icon={CheckCircle2}
                            />

                            <StatusCard
                                title="Total"
                                value={stats?.totalWorkspaces}
                                icon={Building2}
                            />
                        </div>
                    </div>
                </div>

                <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
                    <div className="rounded-2xl border border-gray-200 bg-white">
                        <SectionHeader
                            title="Recent Owners"
                            description={`${owners.length} owners found`}
                            icon={UserRound}
                        />

                        <div className="divide-y divide-gray-100">
                            {owners.length > 0 ? (
                                owners.slice(0, 5).map((owner) => (
                                    <PersonRow
                                        key={owner._id}
                                        name={owner.fullname || owner.name}
                                        email={owner.email}
                                        photo={owner.photo}
                                        role="Owner"
                                    />
                                ))
                            ) : (
                                <EmptyState text="No owners found" />
                            )}
                        </div>
                    </div>

                    <div className="rounded-2xl border border-gray-200 bg-white">
                        <SectionHeader
                            title="Recent Members"
                            description={`${members.length} members found`}
                            icon={Users}
                        />

                        <div className="divide-y divide-gray-100">
                            {members.length > 0 ? (
                                members.slice(0, 5).map((member) => (
                                    <PersonRow
                                        key={member._id}
                                        name={member.fullname || member.name}
                                        email={member.email}
                                        photo={member.photo}
                                        role="Member"
                                    />
                                ))
                            ) : (
                                <EmptyState text="No members found" />
                            )}
                        </div>
                    </div>
                </div>

                <div className="mt-6 rounded-2xl border border-gray-200 bg-white">
                    <SectionHeader
                        title="Workspaces"
                        description={`${workspaces.length} workspaces found`}
                        icon={BriefcaseBusiness}
                    />

                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[700px]">
                            <thead>
                                <tr className="border-y border-gray-100 bg-gray-50">
                                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-400">
                                        Workspace
                                    </th>

                                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-400">
                                        Owner
                                    </th>

                                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-400">
                                        Members
                                    </th>

                                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-400">
                                        Status
                                    </th>
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-gray-100">
                                {workspaces.length > 0 ? (
                                    workspaces.slice(0, 8).map((workspace) => (
                                        <tr
                                            key={workspace._id}
                                            className="transition hover:bg-gray-50"
                                        >
                                            <td className="px-6 py-4">
                                                <div>
                                                    <p className="text-sm font-semibold text-gray-900">
                                                        {workspace.title || "Untitled Workspace"}
                                                    </p>

                                                    <p className="mt-1 max-w-xs truncate text-xs text-gray-400">
                                                        {workspace.description || "No description"}
                                                    </p>
                                                </div>
                                            </td>

                                            <td className="px-6 py-4">
                                                <p className="text-sm text-gray-700">
                                                    {workspace.owner?.fullname ||
                                                        workspace.owner?.name ||
                                                        "Unknown"}
                                                </p>

                                                <p className="mt-1 text-xs text-gray-400">
                                                    {workspace.owner?.email || "No email"}
                                                </p>
                                            </td>

                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-2 text-sm text-gray-700">
                                                    <Users size={15} />
                                                    {workspace.members?.length || 0}
                                                </div>
                                            </td>

                                            <td className="px-6 py-4">
                                                <StatusBadge
                                                    status={workspace.status}
                                                />
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="4">
                                            <EmptyState text="No workspaces found" />
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="mt-6 rounded-2xl border border-gray-200 bg-white">
                    <SectionHeader
                        title="Recent Tasks"
                        description={`${tasks.length} tasks found`}
                        icon={ClipboardList}
                    />

                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[700px]">
                            <thead>
                                <tr className="border-y border-gray-100 bg-gray-50">
                                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-400">
                                        Task
                                    </th>

                                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-400">
                                        Member
                                    </th>

                                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-400">
                                        Workspace
                                    </th>

                                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-400">
                                        Status
                                    </th>
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-gray-100">
                                {tasks.length > 0 ? (
                                    tasks.slice(0, 8).map((task) => (
                                        <tr
                                            key={task._id}
                                            className="transition hover:bg-gray-50"
                                        >
                                            <td className="px-6 py-4">
                                                <p className="text-sm font-semibold text-gray-900">
                                                    {task.title || "Untitled Task"}
                                                </p>

                                                {task.description && (
                                                    <p className="mt-1 max-w-xs truncate text-xs text-gray-400">
                                                        {task.description}
                                                    </p>
                                                )}
                                            </td>

                                            <td className="px-6 py-4 text-sm text-gray-700">
                                                {task.assignedTo?.fullname ||
                                                    task.member?.fullname ||
                                                    task.assignedTo?.name ||
                                                    "Unassigned"}
                                            </td>

                                            <td className="px-6 py-4 text-sm text-gray-700">
                                                {task.workspace?.title || "Unknown"}
                                            </td>

                                            <td className="px-6 py-4">
                                                <StatusBadge
                                                    status={task.status}
                                                />
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="4">
                                            <EmptyState text="No tasks found" />
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">
                    <SummaryItem
                        label="Owners"
                        value={stats?.totalOwners}
                    />

                    <SummaryItem
                        label="Members"
                        value={stats?.totalMembers}
                    />

                    <SummaryItem
                        label="Workspaces"
                        value={stats?.totalWorkspaces}
                    />

                    <SummaryItem
                        label="Tasks"
                        value={stats?.totalTasks}
                    />
                </div>
            </main>

            <AdminFooter />
        </div>
    );
};

const StatCard = ({
    title,
    value,
    icon: Icon,
    description,
}) => {
    return (
        <div className="rounded-2xl border border-gray-200 bg-white p-5 transition hover:border-gray-300 hover:shadow-sm">
            <div className="flex items-start justify-between">
                <div>
                    <p className="text-sm font-medium text-gray-500">
                        {title}
                    </p>

                    <p className="mt-2 text-3xl font-semibold tracking-tight text-gray-950">
                        {value ?? 0}
                    </p>
                </div>

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-black text-white">
                    <Icon size={19} strokeWidth={1.8} />
                </div>
            </div>

            <p className="mt-4 text-xs text-gray-400">
                {description}
            </p>
        </div>
    );
};

const ProgressRow = ({
    title,
    value,
    percentage,
    icon: Icon,
}) => {
    return (
        <div>
            <div className="mb-2 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Icon
                        size={16}
                        className="text-gray-500"
                    />

                    <span className="text-sm font-medium text-gray-700">
                        {title}
                    </span>
                </div>

                <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-gray-950">
                        {value ?? 0}
                    </span>

                    <span className="text-xs text-gray-400">
                        {percentage}%
                    </span>
                </div>
            </div>

            <div className="h-2 overflow-hidden rounded-full bg-gray-100">
                <div
                    className="h-full rounded-full bg-black transition-all duration-700"
                    style={{
                        width: `${percentage}%`,
                    }}
                />
            </div>
        </div>
    );
};

const StatusCard = ({
    title,
    value,
    icon: Icon,
}) => {
    return (
        <div className="flex items-center justify-between rounded-xl border border-gray-100 bg-gray-50 p-4">
            <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white">
                    <Icon
                        size={17}
                        className="text-gray-600"
                    />
                </div>

                <span className="text-sm font-medium text-gray-600">
                    {title}
                </span>
            </div>

            <span className="text-xl font-semibold text-gray-950">
                {value ?? 0}
            </span>
        </div>
    );
};

const SectionHeader = ({
    title,
    description,
    icon: Icon,
}) => {
    return (
        <div className="flex items-center justify-between p-6">
            <div>
                <h2 className="text-lg font-semibold text-gray-950">
                    {title}
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                    {description}
                </p>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-100">
                <Icon
                    size={19}
                    className="text-gray-700"
                />
            </div>
        </div>
    );
};

const PersonRow = ({
    name,
    email,
    photo,
    role,
}) => {
    return (
        <div className="flex items-center justify-between gap-4 px-6 py-4">
            <div className="flex min-w-0 items-center gap-3">
                <div className="h-10 w-10 shrink-0 overflow-hidden rounded-full bg-gray-100">
                    {photo ? (
                        <img
                            src={photo}
                            alt={name}
                            className="h-full w-full object-cover"
                        />
                    ) : (
                        <div className="flex h-full w-full items-center justify-center text-gray-400">
                            <UserRound size={18} />
                        </div>
                    )}
                </div>

                <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-gray-900">
                        {name || "Unknown User"}
                    </p>

                    <p className="truncate text-xs text-gray-400">
                        {email || "No email"}
                    </p>
                </div>
            </div>

            <span className="shrink-0 rounded-full bg-gray-100 px-3 py-1 text-[11px] font-medium text-gray-600">
                {role}
            </span>
        </div>
    );
};

const StatusBadge = ({ status }) => {
    const normalizedStatus = status || "Unknown";

    const isActive =
        normalizedStatus.toLowerCase() === "active";

    const isCompleted =
        normalizedStatus.toLowerCase() === "completed";

    const isPending =
        normalizedStatus.toLowerCase() === "pending";

    return (
        <span
            className={`inline-flex items-center rounded-full px-3 py-1 text-[11px] font-medium ${isActive || isCompleted
                    ? "bg-gray-900 text-white"
                    : isPending
                        ? "bg-gray-100 text-gray-600"
                        : "bg-gray-100 text-gray-600"
                }`}
        >
            {normalizedStatus}
        </span>
    );
};

const SummaryItem = ({
    label,
    value,
}) => {
    return (
        <div className="rounded-2xl border border-gray-200 bg-white p-5">
            <div className="flex items-center justify-between">
                <p className="text-xs font-medium uppercase tracking-wider text-gray-400">
                    {label}
                </p>

                <ArrowUpRight
                    size={15}
                    className="text-gray-300"
                />
            </div>

            <p className="mt-3 text-2xl font-semibold text-gray-950">
                {value ?? 0}
            </p>
        </div>
    );
};

const EmptyState = ({ text }) => {
    return (
        <div className="flex flex-col items-center justify-center px-6 py-10 text-center">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-100">
                <ShieldCheck
                    size={18}
                    className="text-gray-400"
                />
            </div>

            <p className="mt-3 text-sm text-gray-400">
                {text}
            </p>
        </div>
    );
};

export default AdminDashboard;